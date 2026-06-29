<!--
Sync Impact Report
- Version change: 0.1.0 → 1.0.0
- Modified principles: N/A (initial)
- Added sections: 12 articles + Amendment Procedure + Index of Articles
- Removed sections: N/A
- Templates requiring updates: ✅ spec-template.md (scope alignment), ✅ plan-template.md (constitution check), ✅ tasks-template.md (task categorization)
- Follow-up TODOs: None
-->

# Constitution of the MM Pharma Website Project

**Version:** 1.0.0
**Ratification Date:** 2026-06-29
**Last Amended:** 2026-06-29

---

## Index of Articles

| Article | Title |
|---------|-------|
| I | Tech Stack Purity |
| II | Clean Architecture |
| III | Atomic Design Discipline |
| IV | Pixel-Perfect by Token |
| V | Server-First Rendering |
| VI | Privilege Boundary (CRITICAL) |
| VII | SEO Two-Layer (visible + hidden) |
| VIII | Cloudinary for All Media |
| IX | Performance Budget |
| X | i18n + RTL from Day 1 |
| XI | Security Baseline |
| XII | Documentation is Code |

---

## Article I — Tech Stack Purity

### Rule
The frontend stack is fixed and immutable: **Next.js 16 (App Router) + React 19 + TypeScript strict + MUI 6 + Emotion + Mongoose 8 + MongoDB 7 + Cloudinary + Zustand + react-hook-form + Zod + next-intl + DeepSeek API**. No Tailwind CSS, no Redux, no styled-components, no axios, no moment.js. Any new dependency requires a documented justification in the PR description, approved by at least one senior reviewer.

### Why
A fixed stack eliminates decision fatigue, ensures all team members can review any PR, prevents bundle bloat from competing UI libraries, and avoids the common Next.js anti-pattern of mixing Tailwind + MUI (which creates inconsistent theming, conflicting CSS specificity, and duplicate design tokens).

### Verify
```bash
# Check for forbidden dependencies in package.json
grep -E '"tailwindcss|"redux|"styled-components|"axios|"moment"' package.json && echo "FAIL: forbidden dependency found" || echo "PASS"
# Check no Tailwind classes in components
rg -r 'className="[^"]*:(text|bg|border|p|m|flex|grid)-' --include='*.tsx' app/ components/ && echo "FAIL: Tailwind classes found" || echo "PASS"
# Verify MUI is the only UI library
rg '@mui/' package.json | head -5
```

---

## Article II — Clean Architecture

### Rule
The codebase has exactly four layers: **routes** (`app/`), **UI** (`components/`), **server domain** (`lib/server/`), **shared** (`lib/shared/`). Dependencies point inward only. `lib/server/*` files MUST start with `import 'server-only';`. UI code MUST never import Mongoose or access `process.env` directly. Every MongoDB collection MUST have a repository in `lib/server/api/`. Business logic MUST NOT live in route handlers.

### Why
Clean architecture ensures the backend can be lifted into a standalone Node service (Hono/Express/Fastify) later without rewriting the frontend. The `server-only` import is a compile-time guard that prevents accidental leakage of database credentials into client bundles.

### Verify
```bash
# Check server-only import exists on all server files
rg -l 'import' lib/server/ | xargs rg -L 'server-only' && echo "FAIL: missing server-only in lib/server" || echo "PASS: all server files guarded"
# Check no mongoose import outside lib/server
rg 'from ['"'"']mongoose['"'"']' --include='*.ts' app/ components/ --glob='!lib/server/**' && echo "FAIL: mongoose in client code" || echo "PASS"
# Check no process.env in components
rg 'process\.env' components/ --include='*.tsx' && echo "FAIL: process.env in components" || echo "PASS"
# Verify every collection has a repo
ls lib/server/api/*.repo.ts 2>/dev/null | wc -l
```

---

## Article III — Atomic Design Discipline

### Rule
Components MUST live under these directories: `components/ui/atoms/`, `components/ui/molecules/`, `components/ui/organisms/`, `components/sections/`, `components/forms/`, `components/seo/`. Atoms MUST NOT import molecules. Molecules MUST NOT import organisms. Sections compose organisms. Pages compose sections. Components MUST NEVER import raw MUI primitives directly in `app/` — they MUST go through `components/ui/*`.

### Why
Atomic design provides a predictable mental model. A developer new to the project can open `components/ui/atoms/Button.tsx` and know exactly what they'll find. It prevents circular dependencies and makes the component tree visualizable.

### Verify
```bash
# Check atoms don't import molecules/ organisms
rg 'from ['"'"']@/components/ui/molecules' components/ui/atoms/ && echo "FAIL: atom imports molecule" || echo "PASS"
rg 'from ['"'"']@/components/ui/organisms' components/ui/molecules/ && echo "FAIL: molecule imports organism" || echo "PASS"
# Check no direct MUI imports in app/
rg 'from ['"'"']@mui' --include='*.tsx' app/ && echo "FAIL: raw MUI in app/" || echo "PASS: all MUI via components/ui"
```

---

## Article IV — Pixel-Perfect by Token

### Rule
Every visual property MUST come from a token defined in `theme/` or `design-system.md`. No hex colors outside `theme/palette.ts`. No magic spacing numbers — use `theme.spacing(n)` or MUI `sx` with theme-aware values. Every length MUST be a multiple of 4. Every inter-component gap MUST be a multiple of 8. Container max-width is 1280px (1440px for hero only).

### Why
The 4-pt grid is a fundamental design principle that ensures visual harmony across all breakpoints. Tokens guarantee that changing a single value in the theme propagates everywhere. Magic numbers are the #1 cause of visual inconsistency.

### Verify
```bash
# Check for hard-coded hex colors outside theme
rg '#[0-9a-fA-F]{6}' components/ app/ --include='*.{tsx,ts}' --glob='!theme/**' | rg -v 'rgba|transparent|currentColor|inherit' && echo "FAIL: hard-coded hex" || echo "PASS"
# Check for spacing values not divisible by 4
rg '(padding|margin|gap)[:]\s*[0-9]+' --include='*.tsx' components/ app/ | rg -v '(0|4|8|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96|100|104|108|112|116|120|124|128)px' && echo "FAIL: non-4-pt spacing" || echo "PASS"
# Check container widths
rg 'maxWidth.*[0-9]+' theme/ --include='*.ts' | grep -vE '1280|1440' && echo "FAIL: non-standard container width" || echo "PASS"
```

---

## Article V — Server-First Rendering

### Rule
Default to Server Components. Add `'use client'` ONLY at the leaf that needs interactivity. No `useEffect` for data fetching. Use SSG/ISR for static and slow-changing content (home, products, blog). Use SSR for personalized pages (account, cart, search). API routes MUST be `dynamic = 'force-dynamic'` by default unless explicitly cacheable.

### Why
Server Components are the foundational performance optimization of the Next.js App Router. They render zero JavaScript for static content, ship smaller bundles, and eliminate the client-server waterfall. Each `'use client'` directive is a deliberate decision that comes with a JS bundle cost.

### Verify
```bash
# Check for useEffect data fetching patterns
rg 'useEffect.*fetch|useEffect.*axios' --include='*.tsx' && echo "FAIL: useEffect for fetching" || echo "PASS"
# Verify page files are server components (no 'use client')
head -1 app/\[locale\]/\(public\)/page.tsx | grep 'use client' && echo "FAIL: public page is client" || echo "PASS: public page is server"
# Check dynamic exports in API routes
rg 'export const dynamic' app/api/ --include='*.ts' | grep -v 'force-dynamic' && echo "FAIL: non-dynamic API route" || echo "PASS"
```

---

## Article VI — Privilege Boundary (CRITICAL)

### Rule
Anonymous users CAN browse, search, and add-to-cart (session cart). Anonymous users CANNOT view cart, view orders, view articles, post comments — these trigger a **silent redirect** to `/auth/signin?next=<path>`. The privilege matrix in `llms.txt §8` is law. Enforced BOTH client-side (button disable + redirect) and server-side (route guard in `lib/server/auth/guards.ts`).

### Why
This is the single most violated rule in pharma e-commerce sites. Showing a login modal on cart view creates a poor UX. The silent redirect (URL changes, no modal) is the industry best practice. Server-side enforcement prevents bypass via curl/Postman.

### Verify
```bash
# Check for modal-style auth prompts
rg 'dialog|modal|popup' --include='*.tsx' components/auth/ && echo "CHECK: verify these are not login modals" || echo "PASS: no auth modals"
# Verify guard exists for each privileged route
rg 'requireAuth' lib/server/auth/guards.ts && echo "PASS: guard exists" 
# Verify the redirect URL pattern
rg 'redirect.*signin.*next' lib/server/auth/ && echo "PASS: silent redirect pattern"
```

---

## Article VII — SEO Two-Layer (visible + hidden)

### Rule
Every page MUST render visible SEO (title, meta, H1, OG, Twitter, JSON-LD, canonical, hreflang) AND a hidden SEO block generated by DeepSeek API. The hidden block MUST be wrapped in `.visually-hidden`, sanitized, cached at the edge, and regenerated daily or on-demand. A fallback block MUST ship even when DeepSeek is down.

### Why
The hidden SEO block is MM Pharma's competitive advantage for AI search (Google SGE, Perplexity, ChatGPT Search, Claude Search). These AI crawlers consume semantic HTML blocks as primary signal. The fallback ensures zero-dependency on DeepSeek uptime.

### Verify
```bash
# Check hidden SEO component exists and is used
rg '<HiddenSEO' app/ --include='*.tsx' | wc -l
# Verify visually-hidden CSS
rg 'visually-hidden' --include='*.css' --include='*.tsx' && echo "PASS: visually-hidden exists"
# Check for SEO metadata in pages
rg 'generateMetadata' app/\[locale\]/ --include='*.tsx' | wc -l
```

---

## Article VIII — Cloudinary for All Media

### Rule
Product images, lifestyle shots, technical sheets (PDFs), OpenGraph images, and blog hero images ALL live on Cloudinary under `mm-pharma/<scope>/<asset>`. Use `next/image` with explicit `width`/`height` everywhere. Always append `f_auto,q_auto` to every image URL. Use `e_blur:2000,q_auto:low,w_30` for placeholder. Serve PDFs via Cloudinary's `fl_attachment` flag with secure URLs.

### Why
Cloudinary provides automatic format negotiation (WebP/AVIF), responsive `srcset`, CDN delivery at the edge, and transformation pipelines. Self-hosting product images would increase TTFB, require manual format conversion, and lack CDN caching.

### Verify
```bash
# Check all images use next/image
rg '<img' --include='*.tsx' components/ app/ && echo "WARN: raw <img> tags found" || echo "PASS: all images via next/image"
# Check Cloudinary URL format
rg 'res\.cloudinary\.com' components/ app/ --include='*.tsx' | head -10
# Verify f_auto,q_auto in Cloudinary URLs
rg 'f_auto' --include='*.ts' lib/ && echo "PASS: auto format"
```

---

## Article IX — Performance Budget

### Rule
LCP < 1.5 s · INP < 100 ms · CLS < 0.05 · TTFB < 200 ms · initial JS < 90 KB gzip. Bundle analyzer MUST run in CI. Lighthouse CI MUST run in CI. Failing the budget blocks merge. Below-fold components MUST use `dynamic(() => import(...), { ssr: false })` if interactive, or just `dynamic()` if heavy.

### Why
Core Web Vitals are Google ranking signals. MM Pharma's B2B buyers are often on slow connections (Morocco, West Africa). Every kilobyte matters. The hard limits ensure the site works on 3G connections.

### Verify
```bash
# Check bundle analyzer config
rg '@next/bundle-analyzer' next.config.ts && echo "PASS" || echo "FAIL: bundle analyzer missing"
# Check dynamic imports pattern
rg 'dynamic\(\(\) => import' components/sections/ --include='*.tsx' | wc -l
# Verify no heavy synchronous imports
rg 'from ['"'"']@mui/x-data-grid['"'"']' --include='*.tsx' app/ && echo "FAIL: direct DataGrid import" || echo "PASS"
```

---

## Article X — i18n + RTL from Day 1

### Rule
Default locale is `fr-MA`. Supported locales: `fr-MA`, `ar-MA`, `en-US`. All routes use `app/[locale]/...`. All translation keys live in `messages/<locale>.json` — no inline French in components. RTL MUST be enabled automatically for `ar-MA` via MUI `direction: 'rtl'`. Every component MUST be tested in `dir="rtl"`.

### Why
Adding i18n after building pages is a costly refactor. The Moroccan market requires French (primary) and Arabic (RTL). English is the export fallback. RTL support is legally required for Arabic content and affects layout, margins, and icon positioning.

### Verify
```bash
# Check all three locale files exist
ls messages/fr-MA.json messages/ar-MA.json messages/en-US.json && echo "PASS: all locales" || echo "FAIL: missing locales"
# Check for inline French text
rg '[àéèêëîïôùûüçÀÉÈÊËÎÏÔÙÛÜÇ]' --include='*.tsx' components/ app/ | grep -v 'messages' | grep -v 'import' && echo "WARN: possible inline French" || echo "PASS: no inline French"
# Check RTL handling
rg 'dir.*rtl|direction.*rtl' --include='*.tsx' components/ app/ | head -5
```

---

## Article XI — Security Baseline

### Rule
Zod validation on EVERY API input (client + server). Secrets in `process.env` ONLY via `lib/env.ts`. CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy MUST be configured in `next.config.ts`. Rate-limit `/api/auth/*` and `/api/upload/*` with Upstash. CSRF token + honeypot + hCaptcha on signup. Sentry on both server and client. No secrets in logs.

### Why
MM Pharma handles order data, user PII, and Cloudinary credentials. A single leak of `DEEPSEEK_API_KEY` or `MONGO_URI` would be catastrophic. Rate limiting prevents brute-force attacks on auth. Zod validation at every boundary prevents injection.

### Verify
```bash
# Check env validation exists
rg 'z\.object' lib/env.ts && echo "PASS: env validation" || echo "FAIL: missing env validation"
# Check CSP in next.config
rg 'Content-Security-Policy' next.config.ts && echo "PASS: CSP" || echo "FAIL: missing CSP"
# Check rate limiting
rg 'ratelimit|rateLimit' middleware.ts lib/ --include='*.ts' && echo "PASS: rate limit" || echo "FAIL: missing rate limit"
# Check Sentry config
ls sentry*.config.ts 2>/dev/null && echo "PASS: Sentry configured"
```

---

## Article XII — Documentation is Code

### Rule
Every prompt in `/specs/*` produces a runnable artifact. Every component in `components/ui/` MUST export a JSDoc block with `@example`. Every repository method MUST export a JSDoc block with input/output examples. Every schema in `lib/shared/schemas/` MUST have a Zod comment explaining intent. Every env var in `lib/env.ts` MUST have a one-line description. The README at repo root MUST list every script, every env var, and every architectural decision.

### Why
Documentation decays unless it's treated as code. JSDoc blocks on components serve as living documentation that is always in sync with the code. New team members can learn the API surface from JSDoc without reading implementation files.

### Verify
```bash
# Check JSDoc on components
rg '/\*\*' components/ui/atoms/ components/ui/molecules/ --include='*.tsx' | head -20
# Check repo README exists and has required sections
rg '## (Scripts|Environment|Architecture)' README.md && echo "PASS" || echo "FAIL: missing README sections"
# Check env.ts has descriptions
rg '//.*description|/\*\*.*\n.*[A-Z]' lib/env.ts | head -10
```

---

## Amendment Procedure

### Purpose
The constitution defines non-negotiable principles. Amendments must be rare, deliberate, and reviewed by multiple senior team members.

### Process

1. **Proposal**: Any team member may propose an amendment by writing an Architecture Decision Record (ADR) in `.specify/memory/adr/<date>-<title>.md`.

2. **Review**: The amendment requires approval from at least two senior reviewers (one of which MUST be the project lead or tech lead). The ADR must include:
   - The exact wording change (old → new)
   - Rationale (why the constitution must change, not just a workaround)
   - Impact analysis (which principles cascade, which prompts need regeneration)
   - Migration plan if the amendment affects already-generated code

3. **Vote**: The ADR is shared with the team. 72-hour minimum review window. Silent consent after 72h with no objections.

4. **Adoption**: The constitution file is updated with the new version number (MAJOR bump for any principle removal/contradiction, MINOR for additions, PATCH for clarifications). The Sync Impact Report is updated. All affected templates and prompts are regenerated.

5. **Notification**: The team is notified via Slack/Discord with a link to the ADR and the diff.

### Versioning
- **MAJOR**: Backward-incompatible governance/principle removals or redefinitions.
- **MINOR**: New principle/section added or materially expanded guidance.
- **PATCH**: Clarifications, wording, typo fixes, non-semantic refinements.

### Compliance Review
Constitution compliance is checked at two points:
1. **Pre-merge**: Every PR is reviewed against the constitution. PRs that violate MUST principles are rejected.
2. **Quarterly**: The full project is audited against the constitution. Violations are filed as issues with proposed remediation.

---

*This constitution was generated by the Speckit workflow for the MM Pharma website project. It reflects the non-negotiable principles derived from the project's requirements, technology choices, and business context.*
