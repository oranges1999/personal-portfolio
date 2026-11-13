# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A bilingual (EN/VI) static portfolio site for Huy Nguyen with three project case studies and a contact form that writes to a private Google Sheet, deployed to GitHub Pages.

**Architecture:** Nuxt 4 statically generated (`nuxt generate`). All content lives in typed TypeScript data files with `{ en, vi }` strings; UI chrome strings live in i18n locale JSON. The contact form POSTs to a Google Apps Script web app whose URL comes from public runtime config; with no URL the form is not rendered.

**Tech Stack:** Nuxt 4.6, Vue 3, TypeScript, Tailwind CSS 4 (`@tailwindcss/vite`), `@nuxtjs/i18n` 10, `@nuxtjs/color-mode` 4, Vitest 5, Playwright (pre-installed, verification only), GitHub Actions + GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-13-portfolio-website-design.md`

## Global Constraints

- Node `>=22.22.3`. Package manager: npm.
- Base URL in production: `/personal-portfolio/`. Site URL: `https://oranges1999.github.io/personal-portfolio/`.
- Locales: `en` (default, at `/`), `vi` (at `/vi/`). i18n strategy `prefix_except_default`.
- Display name: `Huy Nguyen`. Title: `Full-Stack Developer — Laravel, Vue/Nuxt, Node.js, AI Agents`.
- Contact channels: Upwork `https://www.upwork.com/freelancers/~012cdccc4a8d9ffcf7`, GitHub `https://github.com/oranges1999`, email `nhuhuy1999@gmail.com`.
- Never show: hourly rate, employer name, the `.pen` design tool, invented screenshots/metrics/testimonials.
- Project statuses: `booking-platform` = `completed` (label "Completed · live demo coming soon"); `language-landing` and `ai-report-agent` = `planned`. Planned projects are written in future tense.
- A link or image that is not set is not rendered (no placeholders).
- No template or third-party design; original minimal design, text-first, one accent colour.
- Respect `prefers-reduced-motion`.

## Review Focus

1. A locale is missing a string that the other has → the build's unit tests fail, the site never ships a raw key. (Task 2)
2. Deep link opened directly under the sub-path (`/personal-portfolio/vi/projects/booking-platform/`) → page renders, assets load, nav links stay inside the sub-path. (Task 6)
3. Contact endpoint unset, unreachable, or returning an error → form hidden when unset; on failure the user sees an error and their text is kept. (Task 5)
4. Bot or oversized input to the form/Apps Script → honeypot submissions are dropped silently; fields are length-capped on both sides; cell values starting with `= + - @` are neutralised. (Task 5)
5. Unknown project slug → 404 page, not a blank case study. (Task 4)

---

## File Structure

```
nuxt.config.ts                     modules, i18n, baseURL, runtimeConfig, head defaults
app/app.vue                        <NuxtLayout><NuxtPage/>
app/assets/css/main.css            Tailwind import, theme tokens, dark variant
app/layouts/default.vue            header + slot + footer
app/components/site/               SiteHeader, SiteFooter, LangSwitch, ThemeToggle
app/components/home/               HomeHero, HomeServices, HomeProjects, HomeProcess, HomeStack, HomeAbout, HomeContact
app/components/project/            ProjectCard, StatusBadge
app/components/contact/ContactForm.vue
app/composables/useL.ts            pick the current-locale string from a Localized value
app/data/types.ts                  Localized, Project, Profile types
app/data/profile.ts                services, process, stack, about, contact links
app/data/projects.ts               three projects
app/utils/contact.ts               validateContact, CONTACT_LIMITS
app/pages/index.vue
app/pages/projects/[slug].vue
app/error.vue                      404 page
i18n/locales/en.json, vi.json      UI chrome strings
google-apps-script/contact-form.gs doPost → append row
tests/data.test.ts, tests/locales.test.ts, tests/contact.test.ts
scripts/verify-site.mjs            Playwright checks + screenshots against the generated site
.github/workflows/deploy.yml
README.md
```

### Task 1: Scaffold, layout shell, i18n, theme

**Files:** Create `package.json`, `nuxt.config.ts`, `tsconfig.json`, `.gitignore`, `app/app.vue`, `app/assets/css/main.css`, `app/layouts/default.vue`, `app/components/site/*`, `app/pages/index.vue` (stub), `i18n/locales/{en,vi}.json`, `vitest.config.ts`.

**Interfaces — Produces:**
- npm scripts: `dev`, `generate`, `preview`, `test` (`vitest run`), `verify` (`node scripts/verify-site.mjs`).
- `runtimeConfig.public.contactEndpoint: string` (env `NUXT_PUBLIC_CONTACT_ENDPOINT`, default `''`), `runtimeConfig.public.siteUrl`.
- `app.baseURL` from env `NUXT_APP_BASE_URL` (default `/`).
- Tailwind tokens: `--color-accent`, `--color-bg`, `--color-fg`, `--color-muted`, `--color-border`; dark mode via class `dark` on `<html>` (`@custom-variant dark`), color-mode `classSuffix: ''`.
- Locale keys: `nav.{services,projects,about,contact}`, `theme.toggle`, `lang.switch`, `footer.*`.

- [ ] Step 1: `npm init`, install the stack at the versions above, write config.
- [ ] Step 2: Header with anchor nav (`/#services` etc. via `localePath`), `LangSwitch` (uses `switchLocalePath`), `ThemeToggle`; footer. Mobile: nav collapses into a menu button under 768px.
- [ ] Step 3: Run `NUXT_APP_BASE_URL=/personal-portfolio/ npm run generate`. Expected: exits 0; `.output/public/index.html` and `.output/public/vi/index.html` exist.
- [ ] Step 4: Commit.

### Task 2: Content data and consistency tests

**Files:** Create `app/data/types.ts`, `app/data/profile.ts`, `app/data/projects.ts`, `app/composables/useL.ts`, `tests/data.test.ts`, `tests/locales.test.ts`.

**Interfaces — Produces:**
```ts
type Localized = { en: string; vi: string }
type ProjectStatus = 'completed' | 'in-progress' | 'planned'
interface Project {
  slug: string; title: Localized; summary: Localized; status: ProjectStatus
  stack: string[]; problem: Localized
  roles?: { name: Localized; can: Localized }[]
  features: { title: Localized; items: Localized[] }[]
  highlights: Localized[]
  screenshots?: { src: string; alt: Localized }[]
  demoUrl?: string; repoUrl?: string
}
export const projects: Project[]            // slugs: booking-platform, language-landing, ai-report-agent
export function getProject(slug: string): Project | undefined
export const profile: { name; title: Localized; intro: Localized; services: {title; body}[]; process: Localized[]; stack: {group: Localized; items: string[]}[]; about: Localized[]; links: { upwork; github; email } }
export function useL(): (v: Localized) => string
```

- [ ] Step 1: Write failing tests:
  - `data.test.ts`: slugs equal the three above and are unique; every `Localized` found by walking `projects` and `profile` has non-empty `en` and `vi`; `booking-platform.status === 'completed'`, other two `'planned'`; serialised data does not match `/\.pen|\$12|pen\.dev/i`.
  - `locales.test.ts`: flattened key sets of `en.json` and `vi.json` are equal; no empty values.
- [ ] Step 2: `npm test` → FAIL (modules missing).
- [ ] Step 3: Write the data from the spec doc and the Upwork profile (services: Laravel/PHP, Vue/Nuxt + Tailwind, Node.js, AI agents & automation, Databases & DevOps; process: the four "How I work" points). Vietnamese written natively, not word-for-word.
- [ ] Step 4: `npm test` → PASS. Commit.

### Task 3: Home page

**Files:** Create `app/components/home/*`, `app/components/project/{ProjectCard,StatusBadge}.vue`; modify `app/pages/index.vue`, locale JSON.

**Interfaces — Consumes:** `profile`, `projects`, `useL`. **Produces:** section ids `services`, `projects`, `process`, `stack`, `about`, `contact`; `<ProjectCard :project>` links to `localePath('/projects/' + slug)`; `<StatusBadge :status>` reads `status.{completed,in-progress,planned}` locale keys.

- [ ] Step 1: Build sections in the order of the spec's sketch. Hero CTAs: "View projects" → `#projects`, "Hire me on Upwork" → Upwork link (`target=_blank rel=noopener`).
- [ ] Step 2: `HomeContact` shows the three links; leaves a slot for the form (Task 5).
- [ ] Step 3: Generate and check with a throwaway Playwright run that `/` and `/vi/` each contain three project cards and one `h1`. Commit.

### Task 4: Case study pages and 404

**Files:** Create `app/pages/projects/[slug].vue`, `app/error.vue`; modify `nuxt.config.ts` (prerender routes for all slugs in both locales, if the crawler does not find them).

- [ ] Step 1: Page renders title, status badge, stack chips, problem, roles table (if any), feature groups, highlights, screenshots (if any), demo/repo buttons (if any), back link to `/#projects`. `getProject` miss → `throw createError({ statusCode: 404 })`.
- [ ] Step 2: Generate. Expected: `.output/public/projects/<slug>/index.html` and `.output/public/vi/projects/<slug>/index.html` exist for all three slugs; `.output/public/404.html` exists. Commit.

### Task 5: Contact form and Apps Script

**Files:** Create `app/utils/contact.ts`, `app/components/contact/ContactForm.vue`, `google-apps-script/contact-form.gs`, `tests/contact.test.ts`; modify `HomeContact.vue`, locale JSON.

**Interfaces — Produces:**
```ts
export const CONTACT_LIMITS = { name: 100, email: 200, message: 4000 }
export type ContactInput = { name: string; email: string; message: string; website: string } // website = honeypot
export type ContactErrors = Partial<Record<'name' | 'email' | 'message', 'required' | 'invalid' | 'tooLong'>>
export function validateContact(input: ContactInput): ContactErrors
```

- [ ] Step 1: Failing tests for `validateContact`: empty fields → `required`; `a@b` and `no-at` → `invalid`; `x@y.co` valid; whitespace-only → `required`; over-limit → `tooLong`; valid input → `{}`.
- [ ] Step 2: Implement; `npm test` → PASS.
- [ ] Step 3: `ContactForm.vue`: labelled fields, visually hidden honeypot `website` (`tabindex=-1`, `autocomplete=off`), inline errors from locale keys `contact.errors.*`, states idle/sending/sent/failed. If honeypot filled: show "sent" without any request. Submit with `fetch(endpoint, { method: 'POST', body: JSON.stringify({...,lang,page}), headers: {'Content-Type': 'text/plain;charset=utf-8'} })` (simple request, no CORS preflight; Apps Script reads `e.postData.contents`). Success = response JSON `{ ok: true }`. On failure keep field values and show `contact.failed` with the email link.
- [ ] Step 4: `HomeContact` renders `<ContactForm>` only when `contactEndpoint` is non-empty.
- [ ] Step 5: `contact-form.gs`: `doPost(e)` parses JSON, drops if `website` non-empty, trims and caps to `CONTACT_LIMITS`, rejects missing fields, prefixes `'` to values starting with `= + - @`, appends `[new Date(), name, email, message, lang, page]` to the first sheet under `LockService`, returns `ContentService` JSON `{ ok: true }` or `{ ok: false, error }`. Header comment: deploy steps (Execute as: Me; Who has access: Anyone).
- [ ] Step 6: Generate with `NUXT_PUBLIC_CONTACT_ENDPOINT` unset → no `<form` in `index.html`; set to a dummy URL → form present. Commit.

### Task 6: SEO, deploy workflow, README, full verification

**Files:** Create `.github/workflows/deploy.yml`, `scripts/verify-site.mjs`, `README.md`, `public/favicon.svg`, `public/robots.txt`, `public/.nojekyll`; modify `nuxt.config.ts`, pages (`useSeoMeta`).

- [ ] Step 1: Per-page title/description/OG in both locales; `useLocaleHead` for `lang` + `hreflang`.
- [ ] Step 2: Workflow: on push to `main` and `workflow_dispatch`; Node 22; `npm ci`, `npm test`, `npm run generate` with `NUXT_APP_BASE_URL=/personal-portfolio/` and `NUXT_PUBLIC_CONTACT_ENDPOINT: ${{ vars.CONTACT_ENDPOINT }}`; `actions/upload-pages-artifact` of `.output/public`; `actions/deploy-pages`. Permissions `pages: write`, `id-token: write`.
- [ ] Step 3: `verify-site.mjs`: serve `.output/public` under `/personal-portfolio/` on a local port; for each of `/`, `/vi/`, `/projects/booking-platform/`, `/vi/projects/ai-report-agent/` at 375 and 1280 wide, light and dark: page status 200, zero console errors, zero failed requests, no horizontal overflow (`scrollWidth <= innerWidth`), no text matching a raw i18n key pattern (`/\b(nav|home|contact|status|footer)\.[a-z]/`); every internal `href` starts with `/personal-portfolio/`; language switch on a case study lands on the same slug in the other locale; unknown slug shows the 404 page. Save screenshots to `verify-output/` (git-ignored). Exit non-zero on any failure.
- [ ] Step 4: README (English): what it is, stack, run locally, how to add a project, how to deploy the Apps Script and set the `CONTACT_ENDPOINT` repository variable, how to enable Pages.
- [ ] Step 5: `npm test && NUXT_APP_BASE_URL=/personal-portfolio/ npm run generate && npm run verify` → all pass. Look at the screenshots and fix visual defects. Commit and push.
