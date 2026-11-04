# ADR 0001: Monorepo layout

Status: accepted

## Context
BingoMart needs code shared with the Bingo studio site (packages), and the repo root was the studio site itself.

## Decision
One pnpm + Turborepo monorepo in this repo. The studio site moves to `apps/bingo-site`; workspaces are `apps/*` and `packages/*`. Dependency rule: packages <- modules <- app; no app-to-app imports.

## Rejected
- Separate repo per app: shared packages could not be used without publishing them.
- Leave the site at the root: the root package would be an app and the workspace root at once.

## Consequences
- The Cloudflare Workers Builds project must change its root directory (and build command) to `apps/bingo-site` in the dashboard. The user must do this; it is unverified from here.
- `package-lock.json` replaced by `pnpm-lock.yaml`; commands run via `pnpm --filter bingo-site ...` or root `turbo run` scripts.
- `opennextjs-cloudflare build` refused Next 15.5.23 as unsupported; fixed 2026-11-04 by upgrading to Next 16 rather than passing `--dangerouslyUseUnsupportedNextVersion`. On Windows without symlink rights it still stops at `EPERM symlink`; build on Linux (Workers Builds or WSL).
