# Personal portfolio

Bilingual (English / Vietnamese) portfolio site for Huy Nguyen, full-stack developer.
Static site, deployed to GitHub Pages.

**Stack:** Nuxt 4 · Vue 3 · TypeScript · Tailwind CSS 4 · GSAP · `@nuxtjs/i18n` · Vitest · GitHub Actions

## Run locally

Requires Node 22.22+.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000. English is at `/`, Vietnamese at `/vi`.

## Edit the content

| What | Where |
| --- | --- |
| Intro, services, how I work, tech stack, about, contact links | `app/data/profile.ts` |
| Projects and their case studies | `app/data/projects.ts` |
| Buttons, headings and other interface text | `i18n/locales/en.json`, `i18n/locales/vi.json` |

Every piece of content is a `{ en, vi }` pair. `npm test` fails if one language is missing.

**Add a screenshot, demo link or repo link to a project:** put images in `public/projects/<slug>/`,
then set `screenshots`, `demoUrl` or `repoUrl` on the project in `app/data/projects.ts`.
Anything left unset is simply not shown.

**Change a project's status:** set `status` to `completed`, `in-progress` or `planned`.

## Pages and animation

Five pages (Home, Services, Projects, About, Contact) plus one case study per project.

- `app/composables/useCurtain.ts` holds all GSAP code: the first-visit preloader, the
  five-column curtain between pages, and the fade-up of content as it scrolls into view.
- Add `data-reveal` to any element to have it fade up when it enters the viewport.
- Visitors who prefer reduced motion get no preloader and no animation.

## Test

```bash
npm test
```

Browser check of the generated site (needs Playwright installed globally):

```bash
NUXT_APP_BASE_URL=/personal-portfolio/ npm run generate
```

```bash
npm run verify
```

Screenshots are written to `verify-output/`.

## Deploy

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The site is served at `https://<owner>.github.io/<repo>/`.

## Contact form → Google Sheet

The contact form posts to a Google Apps Script web app, which appends a row to a private
Google Sheet. The form is hidden until an endpoint is configured.

1. Open the spreadsheet → **Extensions → Apps Script**.
2. Paste in `google-apps-script/contact-form.gs` and save.
3. **Deploy → New deployment → Web app**, with *Execute as: Me* and *Who has access: Anyone*.
4. Copy the web app URL (ends in `/exec`).
5. In this repository: **Settings → Secrets and variables → Actions → Variables**, add
   `CONTACT_ENDPOINT` with that URL, then re-run the deploy workflow.

To try the form locally, put `NUXT_PUBLIC_CONTACT_ENDPOINT=<url>` in a `.env` file.

The sheet stays private: the script runs as its owner, so visitors can add a row but cannot
read anything. Spam protection is a honeypot field plus length limits on both sides.
