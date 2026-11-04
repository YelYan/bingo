import { Global, Injectable, Module, type OnModuleDestroy } from "@nestjs/common";
import pg from "pg";

export type Tx = pg.PoolClient;

// A date column stays "2026-11-06". As a JS Date it becomes local midnight,
// and shows as the day before once converted to UTC.
pg.types.setTypeParser(pg.types.builtins.DATE, (value) => value);

@Injectable()
export class Db implements OnModuleDestroy {
  private readonly pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 10 });

  query<R extends pg.QueryResultRow = any>(sql: string, params: unknown[] = []) {
    return this.pool.query<R>(sql, params);
  }

  /** Runs one transaction scoped to a shop; the row-level rules read this setting. */
  async withShop<T>(shopId: string, work: (tx: Tx) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      await client.query("SELECT set_config('app.shop_id', $1, true)", [shopId]);
      const result = await work(client);
      await client.query("COMMIT");
      return result;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  onModuleDestroy() {
    return this.pool.end();
  }
}

@Global()
@Module({ providers: [Db], exports: [Db] })
export class DbModule {}
