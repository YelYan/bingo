import "reflect-metadata";
import { Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { CatalogModule } from "./catalog/catalog.js";
import { DbModule } from "./db.js";
import { IamModule } from "./iam/iam.js";
import { OrdersModule } from "./orders/orders.js";
import { PaymentsModule } from "./payments/payments.js";

@Module({ imports: [DbModule, IamModule, CatalogModule, OrdersModule, PaymentsModule] })
export class AppModule {}

export async function createApp() {
  const app = await NestFactory.create(AppModule, { logger: ["error", "warn"] });
  app.enableShutdownHooks();
  return app;
}

if (process.argv[1]?.replaceAll("\\", "/").endsWith("dist/main.js")) {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set.");
  const app = await createApp();
  // Only the web app's server talks to this API, so it stays on localhost by default.
  const port = Number(process.env.PORT ?? 4000);
  await app.listen(port, process.env.HOST ?? "127.0.0.1");
  console.log(`BingoMart API on http://127.0.0.1:${port}`);
}
