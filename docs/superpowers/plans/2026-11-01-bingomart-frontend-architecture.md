# BingoMart Frontend Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a pnpm + Turborepo monorepo with a BingoMart modular-monolith app running on a contract-first mock API, test-first and documented, with measured proof that the architecture holds.

**Architecture:** `packages/*` (tokens, ui, api-contract, api-mock, api-client, config, test-utils) are imported by `apps/*` (bingo-site, bingomart, docs). Inside `apps/bingomart`, domain modules register through one registry file and are served by one catch-all route. An OpenAPI spec is the contract; MSW is one implementation of it, so a real backend or Prism can replace it with zero module edits.

**Tech Stack:** Next.js 15 (App Router, existing), React 19, Tailwind 4, TypeScript 5.8, pnpm 10 + Turborepo, Vitest + Testing Library, Playwright, MSW + openapi-msw, openapi-typescript + openapi-fetch, TanStack Query, plop, dependency-cruiser, Stryker, Starlight (Astro), Lighthouse CI, Prism.

**Spec:** the task prompt pasted in the 2026-11-01 session (not saved to a file). Its text is reproduced in "Global Constraints" below.

## Global Constraints

- Frontend only, mock API, no backend work, no shop features beyond the catalog example module.
- Dependency rule: `packages ← modules ← app`. No app-to-app imports. No module-to-module imports.
- Adding a category or module adds one registry line and edits no other module.
- One config switch in the API client package selects mock or real; modules never know which is active.
- TDD: failing test first, at the layer named in the task. Docs are written with every change.
- Every ADR lists the rejected alternatives. Micro-frontends only if a written criterion forces it.
- Mock simulates latency, errors, empty states and large lists.
- E2E runs on a throttled low-end mobile profile.
- User docs are written for i18n (Burmese). Developer docs per module and package.
- State anything unverified or skipped. Keep it as small as the proof requires.
- **Repo facts (verified 2026-11-01):** the repo root is currently the Bingo studio site (`bingo-studio`, Next 15.5, Tailwind 4.1.13, `@opennextjs/cloudflare`, npm `package-lock.json`, `wrangler.jsonc` with `nodejs_compat`). Local Node is 22.18.0 but `.node-version` says 22.23.2; pnpm 10.25.0 is installed. The studio's brand tokens are the `@theme` block at the top of `app/globals.css`.
- **Session rule:** commit steps run only after the user has approved committing this work. Until then, stop after the "run to pass" step. Never push.

## Review Focus

Inputs the spec implies but no listed proof exercises; each has its test in the owning task.

1. Zero products in a category: empty state with a path onward, not a blank page (T9).
2. API 500 or slow response: error state with retry, skeleton during latency (T9).
3. 2,000-product category: pages of 24, cursor paging, no giant DOM (T4 handler, T9 list).
4. Burmese product title with no spaces at 360px: no horizontal overflow (T11).
5. Unknown category slug or product id: not-found page, not a crash (T6 resolver, T9).

## File Structure

```
apps/bingo-site/            moved existing studio site (T1)
apps/bingomart/
  src/platform/             module.ts (types), router.ts (resolveRoute), providers
  src/registry.ts           THE registry: one import + one array entry per module
  src/modules/<id>/         manifest.ts, index.ts, components/, categories/ (catalog), __tests__/, docs/
  src/app/[[...path]]/page.tsx   single catch-all route
apps/docs/                  Starlight site; content synced from module docs (generated, gitignored)
packages/config/            tsconfig base, vitest preset, eslint preset
packages/tokens/            bingo.css (extracted @theme), base.css (spacing/type/radius)
packages/ui/                Button, Skeleton, EmptyState, ErrorState
packages/api-contract/      openapi.yaml, generated schema.d.ts
packages/api-mock/          MSW handlers, fixtures, scenarios, browser/node bootstraps
packages/api-client/        createApiClient, config, ApiProvider
packages/test-utils/        renderWithProviders, mswServer
tooling/                    plop generators, docs-gate.mjs, sync-docs.mjs
docs/adr/                   decision records
docs/proofs/                dated evidence log for every "prove it" item
```

---

### Task 1: Convert to pnpm workspace and move the studio site

**Files:**
- Move: all studio files (`app/`, `components/`, `lib/`, `public/`, `types/`, `next.config.ts`, `open-next.config.ts`, `postcss.config.mjs`, `wrangler.jsonc`, `tsconfig.json`, `package.json`) → `apps/bingo-site/`
- Create: `pnpm-workspace.yaml`, `turbo.json`, root `package.json`, `docs/adr/0001-monorepo-layout.md`
- Delete: root `package-lock.json` (replaced by `pnpm-lock.yaml` via `pnpm import`)

**Interfaces:**
- Produces: workspace globs `apps/*`, `packages/*`; root scripts `build`, `test`, `typecheck`, `lint` delegating to `turbo run`.

- [ ] **Step 0: Stop and get the user's OK.** This moves the deployed site. Tell them the Cloudflare project's root directory and build command must be changed to `apps/bingo-site` in the dashboard afterwards; that change cannot be verified from here.
- [ ] **Step 1: Baseline.** Run `npm run typecheck && npm run build` at the root. Expected: both pass. Record in `docs/proofs/baseline.md`. If they already fail, stop and report.
- [ ] **Step 2: Move and convert.** `git mv` the listed files into `apps/bingo-site/`; run `pnpm import` from the old lockfile inside that app, then `pnpm install` at root. Keep root `.node-version`.
- [ ] **Step 3: Verify.** Run `pnpm --filter bingo-site typecheck`, `pnpm --filter bingo-site build`, and `pnpm --filter bingo-site exec opennextjs-cloudflare build`. Expected: all pass, same route list as the baseline build.
- [ ] **Step 4: Write ADR 0001.** Chosen: monorepo in this repo, studio site becomes `apps/bingo-site`. Rejected: separate repo per app (no shared packages without publishing); leave site at root (root package would be an app and a workspace root at once).
- [ ] **Step 5: Commit** — `chore: convert to pnpm workspace, move studio site to apps/bingo-site`.

---

### Task 2: Shared config, tokens, UI seed

**Files:**
- Create: `packages/config/{tsconfig.base.json,vitest.preset.ts}`, `packages/tokens/src/{bingo.css,base.css}`, `packages/ui/src/{button,skeleton,empty-state,error-state}.tsx`, `packages/ui/src/__tests__/*.test.tsx`, `packages/ui/docs/developer.md`
- Modify: `apps/bingo-site/app/globals.css` (import `@bingo/tokens/bingo.css` instead of the inline `@theme` block)

**Interfaces:**
- Produces: `Button(props: { variant?: 'primary'|'ghost'; ...ButtonHTMLAttributes })`, `Skeleton(props: { className?: string })`, `EmptyState(props: { title: string; action?: { label: string; href: string } })`, `ErrorState(props: { message: string; onRetry: () => void })`.

- [ ] **Step 1: Failing tests** in `packages/ui/src/__tests__/`: `empty-state.test.tsx` — "renders title and a link when action is given"; `error-state.test.tsx` — "calls onRetry when the retry button is clicked" (`expect(onRetry).toHaveBeenCalledTimes(1)`); `skeleton.test.tsx` — "has role=status and aria-busy".
- [ ] **Step 2: Run** `pnpm --filter @bingo/ui test`. Expected: FAIL, modules not found.
- [ ] **Step 3: Implement** the four components against the interfaces above. `Button` may restyle the studio's existing `components/ui.tsx` `ButtonLink` look; do not import from `apps/*`.
- [ ] **Step 4: Extract tokens.** Move the `@theme` block from `apps/bingo-site/app/globals.css` verbatim into `packages/tokens/src/bingo.css`; `base.css` holds only app-neutral spacing, type scale and radius. Run `pnpm --filter bingo-site build`; expected: pass with no visual token change (diff the compiled CSS custom properties).
- [ ] **Step 5: Run** `pnpm --filter @bingo/ui test`. Expected: PASS.
- [ ] **Step 6: Docs.** Fill `packages/ui/docs/developer.md` (what each component is for, props, how to add one) and `packages/tokens/docs/developer.md` (what is shared vs per-brand).
- [ ] **Step 7: Commit** — `feat: add shared config, tokens and ui seed`.

---

### Task 3: API contract

**Files:**
- Create: `packages/api-contract/{openapi.yaml,package.json}`, `packages/api-contract/docs/developer.md`, `docs/adr/0002-contract-first-mock.md`
- Generated: `packages/api-contract/src/schema.d.ts`

**Interfaces:**
- Produces operations: `listCategories` `GET /categories` → `{ items: Category[] }`; `listProducts` `GET /products?category&cursor&limit(≤48, default 24)` → `{ items: Product[]; nextCursor: string | null }`; `getProduct` `GET /products/{id}` → `Product`, or `404` `Problem`. `Category = { slug: string; name: string }`. `Product = { id: string; title: string; priceMmk: integer; category: string; imageUrl: string; attributes: Record<string,string|number>; sellerId: string }`. `Problem = { status: integer; title: string }`.

- [ ] **Step 1: Failing check.** Add script `pnpm --filter @bingo/api-contract lint` = `redocly lint openapi.yaml`. With no `openapi.yaml`, run it. Expected: FAIL.
- [ ] **Step 2: Write `openapi.yaml`** with the three operations, one `example` per schema, and the `404` response on `getProduct`. Money is integer kyat (`priceMmk`).
- [ ] **Step 3: Generate types.** Script `generate` = `openapi-typescript openapi.yaml -o src/schema.d.ts`; a `pretypecheck`/`prebuild` hook regenerates. Run lint then generate. Expected: lint 0 errors; `schema.d.ts` exports `paths` with the three paths.
- [ ] **Step 4: ADR 0002.** Chosen: spec first, MSW as one implementation, client-side data fetching for now. Rejected: ad-hoc fixtures shaped by the UI (backend will force rewrites); SSR data fetching now (needs the mock inside the Workers runtime, unverified; consequence: catalog pages are not server-rendered for SEO until a real backend exists).
- [ ] **Step 5: Commit** — `feat: add catalog OpenAPI contract and generated types`.

---

### Task 4: Mock API (MSW, fixtures, scenarios)

**Files:**
- Create: `packages/api-mock/src/{handlers.ts,fixtures.ts,scenarios.ts,browser.ts,node.ts}`, `packages/api-mock/src/__tests__/{contract.test.ts,scenarios.test.ts}`, `packages/api-mock/docs/developer.md`

**Interfaces:**
- Consumes: `paths` from `@bingo/api-contract`.
- Produces: `createHandlers(opts?: { seed?: number }): RequestHandler[]`; `startBrowserMock(): Promise<void>`; `createNodeServer(): SetupServer`; scenario header `x-mock-scenario: 'ok'|'slow'|'error'|'empty'|'large'` (also read from cookie `mock_scenario` for manual dev use). `large` = 2,000 products in one category. `slow` = 1,500 ms delay. `error` = `500` `Problem` on every call. `empty` = `{ items: [], nextCursor: null }`.

- [ ] **Step 1: Failing tests.** `contract.test.ts` — "every response from every operation validates against openapi.yaml" (loop the operations; validate with `openapi-response-validator`, falling back to Ajv on the spec's schemas if that package is unavailable at install). `scenarios.test.ts` — "empty returns zero items", "error returns 500 with Problem body", "large pages in chunks of 24 and ends with nextCursor null after 84 pages" (2,000 / 24 → 84 pages), "getProduct unknown id returns 404 Problem", "same seed yields same fixtures".
- [ ] **Step 2: Run** `pnpm --filter @bingo/api-mock test`. Expected: FAIL.
- [ ] **Step 3: Implement** handlers typed with `openapi-msw` so a spec drift is a compile error; fixtures from seeded `@faker-js/faker`, including at least one Burmese-titled product with no spaces.
- [ ] **Step 4: Run tests.** Expected: PASS.
- [ ] **Step 5: Docs** `developer.md`: scenario table, how to add an operation.
- [ ] **Step 6: Commit** — `feat: add MSW mock API conforming to the contract`.

---

### Task 5: API client with the one config switch

**Files:**
- Create: `packages/api-client/src/{config.ts,client.ts,provider.tsx,index.ts}`, `packages/api-client/src/__tests__/{config.test.ts,client.test.ts}`, `packages/api-client/docs/developer.md`
- Create: `packages/test-utils/src/{render.tsx,server.ts}`

**Interfaces:**
- Produces: `getApiConfig(env?: Record<string,string|undefined>): { mode: 'mock'|'http'; baseUrl: string }` — reads `NEXT_PUBLIC_API_MODE` (default `'mock'`) and `NEXT_PUBLIC_API_BASE_URL` (default `'/api'`); throws on any other mode value. `createApiClient(cfg?: ApiConfig): Client<paths>` (from `openapi-fetch`). `ApiProvider(props: { children })` — when mode is `mock`, awaits `import('@bingo/api-mock')` then `startBrowserMock()` before rendering children, so production builds with `http` exclude MSW. `renderWithProviders(ui, opts?)` and `mswServer` in test-utils.

- [ ] **Step 1: Failing tests.** `config.test.ts` — "defaults to mock", "http mode reads baseUrl", "unknown mode throws". `client.test.ts` — "listProducts returns typed items from the mock server", "client behaves identically when baseUrl points elsewhere (http mode)" using a second MSW server on another origin.
- [ ] **Step 2: Run** `pnpm --filter @bingo/api-client test`. Expected: FAIL.
- [ ] **Step 3: Implement** per the interfaces. Only `config.ts` reads env vars; grep-check in Step 5.
- [ ] **Step 4: Run tests.** Expected: PASS.
- [ ] **Step 5: Verify the switch is single.** `rg "NEXT_PUBLIC_API" apps packages --glob '!**/__tests__/**' --glob '!**/docs/**'` must match only `packages/api-client/src/config.ts`.
- [ ] **Step 6: Docs and commit** — `feat: add api-client with mock/http switch`.

---

### Task 6: BingoMart app skeleton, module contract, registry

**Files:**
- Create: `apps/bingomart/{package.json,next.config.ts,tsconfig.json}`, `apps/bingomart/src/platform/{module.ts,router.ts,providers.tsx}`, `apps/bingomart/src/registry.ts`, `apps/bingomart/src/app/{layout.tsx,[[...path]]/page.tsx,not-found.tsx}`, `apps/bingomart/src/platform/__tests__/router.test.ts`, `docs/adr/0003-module-system.md`

**Interfaces:**
- Produces in `platform/module.ts`:
  ```ts
  export interface RouteDef { path: string;  // e.g. '/p/:id'
    load: () => Promise<{ default: React.ComponentType<{ params: Record<string,string> }> }>;
    metadata?: (params: Record<string,string>) => import('next').Metadata }
  export interface ModuleManifest { id: string; routes: RouteDef[]; nav?: { label: string; href: string }[] }
  export function defineModule(m: ModuleManifest): ModuleManifest
  ```
- Produces in `platform/router.ts`: `resolveRoute(path: string, modules: ModuleManifest[]): { module: ModuleManifest; route: RouteDef; params: Record<string,string> } | null`. First match wins; duplicate route paths across modules throw at registry load.
- `registry.ts` exports `modules: ModuleManifest[]`.

- [ ] **Step 1: Failing tests** `router.test.ts`: "matches /p/:id and extracts id", "returns null for an unknown path" (Review Focus 5), "throws when two modules declare the same path", "static path beats param path declared later".
- [ ] **Step 2: Run** `pnpm --filter bingomart test`. Expected: FAIL.
- [ ] **Step 3: Implement** `resolveRoute` using `path-to-regexp`. The catch-all page calls `resolveRoute`, `await route.load()`, renders inside `ApiProvider`; `generateMetadata` delegates to `route.metadata`; `null` → `notFound()`.
- [ ] **Step 4: Run tests; run** `pnpm --filter bingomart build`. Expected: PASS, build succeeds with an empty `modules` array.
- [ ] **Step 5: ADR 0003.** Chosen: modular monolith, catch-all route + registry. Rejected: micro-frontends (written criterion not met: one team, one deploy, no independent release need; revisit if a second team ships a BingoMart area on its own cadence); generated per-module route files in `app/` (second touch point on every module add).
- [ ] **Step 6: Commit** — `feat: add bingomart shell, module contract and route registry`.

---

### Task 7: Boundary enforcement

**Files:**
- Create: `.dependency-cruiser.cjs`, `tooling/__tests__/boundaries.test.ts`, `tooling/fixtures/violations/*`
- Modify: root `package.json` (script `check:boundaries` = `depcruise apps packages --config .dependency-cruiser.cjs`)

**Interfaces:**
- Rules (all severity `error`): `packages-not-from-apps`; `no-app-to-app`; `no-module-to-module` (path `modules/A` → `modules/B`); `modules-not-from-platform-or-registry`; `registry-imports-manifest-only` (only `src/registry.ts` may import `modules/*`, and only `modules/<id>/index.ts`); `no-circular`.

- [ ] **Step 1: Failing test** `boundaries.test.ts` — for each rule, copy a fixture file containing one illegal import into a temp location under the matching path, run `depcruise`, assert non-zero exit and the rule name in output; assert clean tree exits 0. Test names: one per rule, e.g. "rejects a module importing another module".
- [ ] **Step 2: Run** `pnpm test -- tooling`. Expected: FAIL (no config).
- [ ] **Step 3: Write `.dependency-cruiser.cjs`** with the six rules.
- [ ] **Step 4: Run.** Expected: PASS; `pnpm check:boundaries` exits 0 on the clean tree.
- [ ] **Step 5: Commit** — `feat: enforce module and package boundaries with dependency-cruiser`.

---

### Task 8: Generators (module, category, app)

**Files:**
- Create: `tooling/plopfile.mjs`, `tooling/templates/module/*`, `tooling/templates/category/*`, `tooling/templates/app/*`, `tooling/__tests__/generators.test.ts`
- Modify: root `package.json` (`gen` = `plop --plopfile tooling/plopfile.mjs`)

**Interfaces:**
- `pnpm gen module <id>` creates `apps/bingomart/src/modules/<id>/{manifest.ts,index.ts,components/,__tests__/<id>.test.tsx,docs/developer.md,docs/user.en.md,docs/user.my.md}` and appends exactly one import and one array entry to `src/registry.ts`. Starts with a failing placeholder test named "<id> module is implemented" so TDD begins red.
- `pnpm gen category <slug>` creates `modules/catalog/categories/<slug>.ts` exporting `category: CategoryDef` and appends one import and one entry to `modules/catalog/categories/registry.ts`. (`CategoryDef` is defined in T9; the generator test runs after T9 Step 3, so this task ships the module and app generators and the category template, and the category generator test is added in T9 Step 5.)
- `pnpm gen app <name>` creates `apps/<name>/` as a minimal Next app with its own `registry.ts`, empty `modules/`, docs folder, `package.json` using `@bingo/*` packages.

- [ ] **Step 1: Failing tests** `generators.test.ts` (run generators into a temp copy of the repo skeleton): "module generator creates source, test and three docs files", "module generator edits only registry.ts outside the new folder" (assert via file diff list), "module generator is idempotent-safe: refuses an existing id", "app generator output passes `check:boundaries` and `tsc --noEmit`".
- [ ] **Step 2: Run.** Expected: FAIL.
- [ ] **Step 3: Implement plop generators and templates.** Registry edit uses an `append` action matched on two marker comments (`// <modules:imports>` and `// <modules:entries>`) added to `registry.ts`.
- [ ] **Step 4: Run.** Expected: PASS.
- [ ] **Step 5: Commit** — `feat: add module, category and app generators`.

---

### Task 9: Catalog example module (test-first, via generator)

**Files:**
- Generate with `pnpm gen module catalog`, then add: `modules/catalog/{components/product-card.tsx,components/product-list.tsx,components/category-nav.tsx,pages/home.tsx,pages/category.tsx,pages/product.tsx,lib/money.ts,categories/{registry.ts,default.ts},hooks/use-products.ts}` and tests beside each.

**Interfaces:**
- Consumes: `createApiClient`, `ApiProvider` (T5); `EmptyState`, `ErrorState`, `Skeleton` (T2); `renderWithProviders`, `mswServer` (T5).
- Produces: manifest routes `/` (home: category list), `/c/:slug` (product list), `/p/:id` (detail). `formatMmk(n: number): string`. `useProducts(category: string): { items: Product[]; isLoading: boolean; error: Error | null; fetchNextPage(): void; hasNextPage: boolean; refetch(): void }` (TanStack `useInfiniteQuery`). `type CategoryDef = { slug: string; filters: { key: string; label: string }[]; renderSpecs?: (p: Product) => React.ReactNode }`; `getCategoryDef(slug: string): CategoryDef` (falls back to `default`).

- [ ] **Step 1: Write failing tests** (red before any implementation; each at its layer):
  - Unit `money.test.ts` — "formatMmk(1500) contains '1,500'".
  - Unit `category-registry.test.ts` — "getCategoryDef returns default for an unregistered slug".
  - Component `product-list.test.tsx` — "shows skeletons while loading (slow scenario)", "shows EmptyState with a link home when the category is empty", "shows ErrorState and refetches on retry (error scenario)", "renders 24 cards then loads 24 more on 'Load more' (large scenario)".
  - Integration `catalog.integration.test.tsx` — "/c/phones lists products from the mock API through the real client", "/p/unknown renders the not-found state, not an exception".
- [ ] **Step 2: Run** `pnpm --filter bingomart test`. Expected: FAIL; record the red output in `docs/proofs/tdd-catalog.md`.
- [ ] **Step 3: Implement** the files above one test at a time (red → green → refactor), keeping every fetch behind `useProducts`/`createApiClient`; no module code mentions MSW or mock mode.
- [ ] **Step 4: Run all** `pnpm --filter bingomart test`. Expected: PASS.
- [ ] **Step 5: Category generator test.** Add test "category generator adds one line to categories/registry.ts and getCategoryDef finds it", run (red), fix templates, run (green).
- [ ] **Step 6: Docs.** Fill `docs/developer.md` (routes, public API, how to add a category with `pnpm gen category`), `docs/user.en.md` (how buyers browse), `docs/user.my.md` (Burmese; mark front-matter `status: needs-review` unless a Burmese speaker has reviewed it).
- [ ] **Step 7: Run** `pnpm check:boundaries`. Expected: exit 0.
- [ ] **Step 8: Commit** — `feat(catalog): add catalog module with category plugins`.

---

### Task 10: Docs site and docs gate

**Files:**
- Create: `apps/docs/{package.json,astro.config.mjs}`, `tooling/sync-docs.mjs`, `tooling/docs-gate.mjs`, `tooling/__tests__/{sync-docs.test.ts,docs-gate.test.ts}`, `docs/developer/{tdd-workflow.md,architecture.md,adding-a-module.md,adding-an-app.md}`, `apps/docs/.gitignore` (generated `src/content/docs/modules/`)

**Interfaces:**
- `sync-docs.mjs`: copies each `modules/<id>/docs/developer.md` and `user.en.md` → `apps/docs/src/content/docs/modules/<id>/`, `user.my.md` → `.../my/modules/<id>/user.md`; also package `docs/developer.md` files and `docs/developer/*.md`. Starlight config: locales `root` (en) and `my`.
- `docs-gate.mjs --base <git-ref>`: exit 1 listing offenders if any file under `modules/<id>/` (excluding `docs/`) changed without a change under `modules/<id>/docs/developer.md`; same for `packages/<p>/src` vs `packages/<p>/docs/developer.md`; also exit 1 if any registered module lacks `user.en.md`.

- [ ] **Step 1: Failing tests.** `docs-gate.test.ts` (temp git repo) — "fails when module source changes without developer.md", "passes when both change", "fails when a registered module has no user.en.md". `sync-docs.test.ts` — "maps user.my.md into the my locale".
- [ ] **Step 2: Run.** Expected: FAIL.
- [ ] **Step 3: Implement** both scripts; write the four `docs/developer/*.md` guides. `architecture.md` holds the bounded-context map (catalog, cart, checkout, orders, account, seller; only catalog built) and a Mermaid C4 container diagram of apps, packages and modules. `tdd-workflow.md` states red/green/refactor and which layer (unit, component, integration, contract, e2e) covers what.
- [ ] **Step 4: Build the site.** `pnpm --filter docs build`. Expected: succeeds; output contains the catalog developer page and the `my/` catalog user page. Burmese UI strings and Pagefind search behaviour for Burmese are unverified; note in the proof log.
- [ ] **Step 5: Run tests.** Expected: PASS.
- [ ] **Step 6: Commit** — `feat: add docs site, doc sync and docs gate`.

---

### Task 11: E2E on a throttled mobile profile

**Files:**
- Create: `apps/bingomart/playwright.config.ts`, `apps/bingomart/e2e/{catalog.spec.ts,burmese-overflow.spec.ts,fixtures/throttle.ts}`

**Interfaces:**
- `fixtures/throttle.ts` exports a Playwright `test` extended so each page uses device `Moto G4`, CDP `Emulation.setCPUThrottlingRate({ rate: 4 })` and `Network.emulateNetworkConditions({ latency: 150, downloadThroughput: 204800, uploadThroughput: 96000, offline: false })` (≈1.6 Mbps down / 750 Kbps up).
- Servers: `next build && next start` on a fixed port with `NEXT_PUBLIC_API_MODE=mock`.

- [ ] **Step 1: Failing specs.** `catalog.spec.ts` — "home → category → product detail shows title and price"; "empty scenario shows the empty state" (cookie `mock_scenario=empty`); "error scenario shows retry and recovers". `burmese-overflow.spec.ts` — "unspaced Burmese title at 360px does not overflow: `document.documentElement.scrollWidth <= clientWidth`" (Review Focus 4).
- [ ] **Step 2: Run** `pnpm --filter bingomart e2e`. Expected: FAIL (red before the config exists / before styles handle wrapping).
- [ ] **Step 3: Implement** config and fix any component styles the overflow spec exposes (`overflow-wrap:anywhere` on card titles).
- [ ] **Step 4: Run.** Expected: PASS. Note in the proof log: E2E runs on Node `next start`, not on the Cloudflare Workers runtime.
- [ ] **Step 5: Commit** — `test(e2e): add throttled mobile journeys`.

---

### Task 12: CI and the proofs

**Files:**
- Create: `.github/workflows/ci.yml`, `apps/bingomart/stryker.config.mjs`, `apps/bingomart/lighthouserc.json`, `docs/proofs/README.md` plus one dated section per proof

**Interfaces:**
- CI jobs: `typecheck`, `test` (unit+integration+contract), `boundaries`, `docs-gate` (`--base origin/main`), `e2e`, `lighthouse`. Workflow is unverified until the repo has a GitHub remote and the user pushes; every gate must also run locally through root scripts.
- `stryker.config.mjs`: `mutate` only `src/modules/catalog/**` (excluding tests), runner `vitest`, `thresholds.break: 60`; report the actual score, do not tune the threshold to pass.
- `lighthouserc.json`: mobile preset, assert `resource-summary:script:size` and `categories:performance`; set the numeric thresholds from the first measured run, record that run, then lock them.

Each proof below is run, and its command output pasted into `docs/proofs/README.md` under a dated heading:

- [ ] **P1 Boundary violation.** Add `import '../orders'`-style cross-module import to the catalog module; run `pnpm check:boundaries`. Expected: non-zero, rule `no-module-to-module` named. Revert.
- [ ] **P2 Docs gate.** Edit only `modules/catalog/components/product-card.tsx`, stage it; run `node tooling/docs-gate.mjs --base HEAD`. Expected: exit 1 naming catalog. Revert.
- [ ] **P3 Mutation.** Run `pnpm --filter bingomart exec stryker run`. Record the score and surviving mutants; write a test for each surviving mutant that is behaviour, or note why it is equivalent.
- [ ] **P4 Swap drill.** Start `prism mock packages/api-contract/openapi.yaml -p 4010`; run the `@bingo/api-client` suite and the E2E journey home → category → product with `NEXT_PUBLIC_API_MODE=http NEXT_PUBLIC_API_BASE_URL=http://localhost:4010`. Prove with `git diff --stat -- apps/bingomart/src/modules` empty. Tests that assert exact fixture values must be scoped to MSW; expect the structure-only assertions to pass on Prism and record any that do not.
- [ ] **P5 Cold-start drill.** Dispatch a fresh subagent given only `docs/developer/*.md` and the docs site output (no repo exploration hints). Task for it: add module `wishlist`, then app `bingo-demo`. Record every path touched outside each new folder. Expected: module → `src/registry.ts` only; app → none beyond `pnpm-lock.yaml`. Remove both afterwards.
- [ ] **P6 Delete test.** `git rm -r` the `wishlist` module and its registry lines (or the catalog copy); run `pnpm build && pnpm test && pnpm check:boundaries`. Expected: all pass.
- [ ] **P7 Budgets.** Run `pnpm --filter bingomart exec lhci autorun`; record Lighthouse mobile scores, script bytes, and Next's "First Load JS" table.
- [ ] **Step 8: Final state.** Fill the "Not verified / skipped" list in `docs/proofs/README.md` (see Self-Review). Commit — `chore: add CI and proof log`.

---

## Self-Review notes

- **Spec coverage:** bounded-context map + C4 diagram — add to `docs/developer/architecture.md` in T10 Step 3 (Mermaid; list six domains, only catalog implemented). Dependency rule T7. Registry T6. Generators T8. API contract + mock + switch T3–T5. Test layers T2–T11, TDD doc T10. Docs system T10, template via T8. Example module T9. All seven proofs T12.
- **Known skips (state in the proof log):** Cloudflare deploy config for `bingomart` and `docs`; Cloudflare dashboard change for the moved site; Workers-runtime behaviour of the mock; SSR/SEO; UI-level i18n of the shop (only docs are Burmese-ready); Burmese doc review by a native speaker; CI run on GitHub; the other five domain modules (cart, checkout, orders, account, seller) exist only on the map.
- **Package names to verify at install:** `openapi-msw`, `openapi-response-validator`, `@stoplight/prism-cli`, `@lhci/cli`. If one is missing, the task names its fallback or stops and reports.
