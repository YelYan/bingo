# Baseline (pre-move)

Command: `npm run typecheck && npm run build` at repo root, before any move. Exit 0.

```

> bingo-studio@1.0.0 typecheck
> tsc --noEmit


> bingo-studio@1.0.0 build
> next build

   ▲ Next.js 15.5.23

   Creating an optimized production build ...
 ✓ Compiled successfully in 76s
   Linting and checking validity of types ...
   Collecting page data ...
   Generating static pages (0/24) ...
 ✓ Generating static pages (24/24)
   Finalizing page optimization ...
   Collecting build traces ...

Route (app)                                 Size  First Load JS
┌ ○ /                                    1.61 kB         113 kB
├ ○ /_not-found                            136 B         103 kB
├ ○ /about                                 581 B         107 kB
├ ○ /contact                             3.22 kB         109 kB
├ ○ /icon.svg                                0 B            0 B
├ ○ /opengraph-image                       136 B         103 kB
├ ○ /pricing                               136 B         103 kB
├ ○ /privacy                               580 B         107 kB
├ ○ /robots.txt                            136 B         103 kB
├ ○ /services                              592 B         112 kB
├ ○ /sitemap.xml                           136 B         103 kB
├ ○ /tools                                 581 B         107 kB
├ ○ /tools/promptnest                    3.65 kB         110 kB
├ ○ /tools/rankview                      3.28 kB         109 kB
├ ○ /tools/sitecheckr                    3.11 kB         109 kB
├ ○ /work                                2.91 kB         114 kB
└ ● /work/[slug]                           592 B         112 kB
    ├ /work/archform
    ├ /work/zippybooks
    ├ /work/premium-seaman-service
    └ [+3 more paths]
+ First Load JS shared by all             103 kB
  ├ chunks/255-87552e6e05b8e3aa.js       46.4 kB
  ├ chunks/4bd1b696-c023c6e3521b1417.js  54.2 kB
  └ other shared chunks (total)          1.99 kB


○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML (uses generateStaticParams)

```

# After move (pnpm --filter bingo-site)
typecheck and build pass; route list identical to baseline (same 17 routes + 6 work slugs; only chunk hashes/sizes differ by bytes).
`opennextjs-cloudflare build` exits 1: "Next.js version 15.5.23 is not supported by the Next.js team" (needs --dangerouslyUseUnsupportedNextVersion; not run). Not verified at baseline either.
