// Applies db/migrations in order, as the admin role, once each.
// The app role (from DATABASE_URL) is created here so it is never a superuser:
// superusers skip row-level rules, which would silently switch off tenant isolation.
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import pg from "pg";

const dir = join(dirname(fileURLToPath(import.meta.url)), "../db/migrations");

export async function migrate(adminUrl, appUrl) {
  const app = new URL(appUrl);
  const client = new pg.Client({ connectionString: adminUrl });
  await client.connect();
  try {
    const { rows: encoding } = await client.query("SHOW server_encoding");
    if (encoding[0].server_encoding !== "UTF8") {
      throw new Error(`Database encoding is ${encoding[0].server_encoding}; Burmese text needs UTF8.`);
    }

    const exists = await client.query("SELECT 1 FROM pg_roles WHERE rolname = $1", [app.username]);
    if (exists.rowCount === 0) {
      const { rows } = await client.query("SELECT format('CREATE ROLE %I LOGIN PASSWORD %L', $1::text, $2::text) AS sql", [
        app.username,
        decodeURIComponent(app.password),
      ]);
      await client.query(rows[0].sql);
    }

    await client.query("CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz DEFAULT now())");
    for (const name of readdirSync(dir).filter((f) => f.endsWith(".sql")).sort()) {
      const done = await client.query("SELECT 1 FROM schema_migrations WHERE name = $1", [name]);
      if (done.rowCount) continue;
      await client.query("BEGIN");
      try {
        await client.query(readFileSync(join(dir, name), "utf8"));
        await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [name]);
        await client.query("COMMIT");
        console.log(`migrated ${name}`);
      } catch (err) {
        await client.query("ROLLBACK");
        throw err;
      }
    }
  } finally {
    await client.end();
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { DATABASE_ADMIN_URL, DATABASE_URL } = process.env;
  if (!DATABASE_ADMIN_URL || !DATABASE_URL) throw new Error("Set DATABASE_ADMIN_URL and DATABASE_URL.");
  await migrate(DATABASE_ADMIN_URL, DATABASE_URL);
}
