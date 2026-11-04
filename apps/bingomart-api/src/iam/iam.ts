import {
  Body,
  type CanActivate,
  ConflictException,
  Controller,
  createParamDecorator,
  type ExecutionContext,
  Get,
  HttpCode,
  Injectable,
  Module,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { z } from "zod";
import { Db } from "../db.js";
import { mmk, normalizePhone, parse, phone } from "../validation.js";

const scryptAsync = promisify(scrypt) as (password: string, salt: string, keylen: number) => Promise<Buffer>;

const SESSION_DAYS = 30;
const MAX_FAILED_LOGINS = 5;
const LOCK_MINUTES = 15;
const RESERVED_SLUGS = new Set(["admin", "api", "www", "seller", "app", "bingo", "bingomart"]);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${(await scryptAsync(password, salt, 64)).toString("hex")}`;
}

async function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  return timingSafeEqual(Buffer.from(hash, "hex"), await scryptAsync(password, salt, 64));
}

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

const paymentAccounts = z
  .array(z.object({ provider: z.string().trim().min(1).max(40), name: z.string().trim().min(1).max(100), number: z.string().trim().min(3).max(40) }))
  .max(10);

const signupSchema = z.object({
  shopName: z.string().trim().min(2).max(100),
  slug: z.string().trim().toLowerCase().regex(/^[a-z0-9](?:[a-z0-9-]{1,28})[a-z0-9]$/),
  phone,
  password: z.string().min(8).max(200),
  deliveryFeeMmk: mmk.default(0),
  paymentAccounts: paymentAccounts.default([]),
});

const loginSchema = z.object({ phone: z.string().max(30), password: z.string().max(200) });

const settingsSchema = z.object({ shopName: z.string().trim().min(2).max(100), deliveryFeeMmk: mmk, paymentAccounts });

export type Seller = { userId: string; shopId: string };

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly db: Db) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = /^Bearer (.+)$/.exec(request.headers.authorization ?? "")?.[1];
    if (!token) throw new UnauthorizedException({ code: "NOT_SIGNED_IN" });
    const { rows } = await this.db.query(
      "SELECT user_id, shop_id FROM sessions WHERE token_hash = $1 AND expires_at > now()",
      [sha256(token)],
    );
    if (!rows[0]) throw new UnauthorizedException({ code: "NOT_SIGNED_IN" });
    request.seller = { userId: rows[0].user_id, shopId: rows[0].shop_id } satisfies Seller;
    return true;
  }
}

export const CurrentSeller = createParamDecorator(
  (_: unknown, context: ExecutionContext): Seller => context.switchToHttp().getRequest().seller,
);

@Injectable()
export class IamService {
  constructor(private readonly db: Db) {}

  private async newSession(userId: string, shopId: string) {
    const token = randomBytes(32).toString("base64url");
    await this.db.query(
      `INSERT INTO sessions (token_hash, user_id, shop_id, expires_at) VALUES ($1, $2, $3, now() + make_interval(days => $4))`,
      [sha256(token), userId, shopId, SESSION_DAYS],
    );
    return token;
  }

  async signup(input: z.infer<typeof signupSchema>) {
    if (RESERVED_SLUGS.has(input.slug)) throw new ConflictException({ code: "SLUG_TAKEN" });
    const passwordHash = await hashPassword(input.password);
    try {
      const { rows } = await this.db.query(
        `WITH shop AS (
           INSERT INTO shops (slug, name, delivery_fee_mmk, payment_accounts) VALUES ($1, $2, $3, $4) RETURNING id
         )
         INSERT INTO users (shop_id, phone, password_hash) SELECT id, $5, $6 FROM shop RETURNING id, shop_id`,
        [input.slug, input.shopName, input.deliveryFeeMmk, JSON.stringify(input.paymentAccounts), input.phone, passwordHash],
      );
      return { token: await this.newSession(rows[0].id, rows[0].shop_id) };
    } catch (err: any) {
      if (err.code === "23505") {
        throw new ConflictException({ code: err.constraint === "shops_slug_key" ? "SLUG_TAKEN" : "PHONE_TAKEN" });
      }
      throw err;
    }
  }

  async login(input: z.infer<typeof loginSchema>) {
    const number = normalizePhone(input.phone);
    const { rows } = number
      ? await this.db.query("SELECT id, shop_id, password_hash, locked_until FROM users WHERE phone = $1", [number])
      : { rows: [] as any[] };
    const user = rows[0];
    if (user?.locked_until && new Date(user.locked_until) > new Date()) {
      throw new UnauthorizedException({ code: "LOCKED" });
    }
    if (!user || !(await verifyPassword(input.password, user.password_hash))) {
      if (user) {
        await this.db.query(
          `UPDATE users SET
             locked_until = CASE WHEN failed_logins + 1 >= $2 THEN now() + make_interval(mins => $3) END,
             failed_logins = CASE WHEN failed_logins + 1 >= $2 THEN 0 ELSE failed_logins + 1 END
           WHERE id = $1`,
          [user.id, MAX_FAILED_LOGINS, LOCK_MINUTES],
        );
      }
      throw new UnauthorizedException({ code: "BAD_LOGIN" });
    }
    await this.db.query("UPDATE users SET failed_logins = 0, locked_until = NULL WHERE id = $1", [user.id]);
    return { token: await this.newSession(user.id, user.shop_id) };
  }

  shop(shopId: string) {
    return this.db.query(
      "SELECT id, slug, name, delivery_fee_mmk AS \"deliveryFeeMmk\", payment_accounts AS \"paymentAccounts\" FROM shops WHERE id = $1",
      [shopId],
    ).then((r) => r.rows[0]);
  }

  async updateSettings(shopId: string, input: z.infer<typeof settingsSchema>) {
    await this.db.withShop(shopId, (tx) =>
      tx.query("UPDATE shops SET name = $1, delivery_fee_mmk = $2, payment_accounts = $3 WHERE id = $4", [
        input.shopName,
        input.deliveryFeeMmk,
        JSON.stringify(input.paymentAccounts),
        shopId,
      ]),
    );
    return this.shop(shopId);
  }
}

@Controller()
export class IamController {
  constructor(private readonly iam: IamService) {}

  @Post("auth/signup")
  signup(@Body() body: unknown) {
    return this.iam.signup(parse(signupSchema, body));
  }

  @Post("auth/login")
  @HttpCode(200)
  login(@Body() body: unknown) {
    return this.iam.login(parse(loginSchema, body));
  }

  @Get("seller/shop")
  @UseGuards(SessionGuard)
  shop(@CurrentSeller() seller: Seller) {
    return this.iam.shop(seller.shopId);
  }

  @Patch("seller/shop")
  @UseGuards(SessionGuard)
  update(@CurrentSeller() seller: Seller, @Body() body: unknown) {
    return this.iam.updateSettings(seller.shopId, parse(settingsSchema, body));
  }
}

@Module({ controllers: [IamController], providers: [IamService, SessionGuard], exports: [SessionGuard] })
export class IamModule {}
