// Local only: runs a real PostgreSQL from .pg/ so no install or account is needed.
// `dev.mjs` starts the API on it; `dev.mjs --test` runs the tests on a throwaway database.
import { spawn } from "node:child_process";
import { existsSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import EmbeddedPostgres from "embedded-postgres";
import { migrate } from "./migrate.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const testing = process.argv.includes("--test");
const dataDir = join(root, testing ? ".pg-test" : ".pg");
const port = testing ? 54330 : 54329;
// Local-only credentials: this server listens on localhost and holds no real data.
const admin = `postgres://postgres:local-dev@localhost:${port}/bingomart`;
const app = `postgres://bingomart_app:local-dev@localhost:${port}/bingomart`;

if (testing) rmSync(dataDir, { recursive: true, force: true });

const db = new EmbeddedPostgres({
  databaseDir: dataDir,
  user: "postgres",
  password: "local-dev",
  port,
  persistent: !testing,
  initdbFlags: ["--encoding=UTF8", "--locale=C"],
  // PG18's I/O workers outlive a hard stop on Windows and keep holding the port.
  postgresFlags: ["-c", "io_method=sync"],
  onLog: () => {},
});

const fresh = !existsSync(join(dataDir, "PG_VERSION"));
if (fresh) await db.initialise();
await db.start();
if (fresh) await db.createDatabase("bingomart");
await migrate(admin, app);

const env = { ...process.env, DATABASE_URL: app, DATABASE_ADMIN_URL: admin };
const args = testing
  ? ["--test", ...readdirSync(join(root, "dist/test")).filter((f) => f.endsWith(".test.js")).map((f) => join(root, "dist/test", f))]
  : [join(root, "dist/main.js")];

const child = spawn(process.execPath, args, { stdio: "inherit", env });
const stop = async (code) => {
  await db.stop().catch(() => {});
  process.exit(code);
};
child.on("exit", (code) => stop(code ?? 0));
process.on("SIGINT", () => child.kill());
process.on("SIGTERM", () => child.kill());
