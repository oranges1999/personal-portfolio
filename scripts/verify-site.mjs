// Serves the generated site under the production sub-path and checks it in a real browser.
// Usage: NUXT_APP_BASE_URL=/personal-portfolio/ npm run generate && npm run verify
import { createServer } from 'node:http'
import { readFile, mkdir } from 'node:fs/promises'
import { existsSync, statSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'
import { createRequire } from 'node:module'

// Playwright is a local tool, not a project dependency: resolve it from the global install.
const { chromium } = createRequire(import.meta.url)('playwright')

const BASE = '/personal-portfolio/'
const ROOT = join(process.cwd(), '.output/public')
const OUT = join(process.cwd(), 'verify-output')
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.txt': 'text/plain' }

const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  if (!path.startsWith(BASE)) { res.writeHead(404).end('outside base'); return }
  let file = join(ROOT, normalize(path.slice(BASE.length)))
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
  if (!existsSync(file)) { // GitHub Pages behaviour: serve 404.html with status 404
    res.writeHead(404, { 'Content-Type': TYPES['.html'] }).end(await readFile(join(ROOT, '404.html')))
    return
  }
  res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' }).end(await readFile(file))
})
await new Promise(r => server.listen(0, r))
const origin = `http://localhost:${server.address().port}`

const failures = []
const fail = (where, msg) => { failures.push(`${where}: ${msg}`); console.log(`  FAIL ${where}: ${msg}`) }
const RAW_KEY = /\b(nav|home|contact|status|footer|project|seo|error|theme|lang)\.[a-zA-Z-]+(\.[a-zA-Z]+)?\b/

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()
const pages = ['', 'vi/', 'projects/booking-platform/', 'vi/projects/ai-report-agent/', 'projects/language-landing/']

for (const width of [375, 1280]) {
  for (const scheme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme, deviceScaleFactor: 1 })
    for (const p of pages) {
      const where = `${p || '/'} @${width} ${scheme}`
      const page = await ctx.newPage()
      const problems = []
      page.on('console', m => m.type() === 'error' && problems.push(`console: ${m.text()}`))
      page.on('pageerror', e => problems.push(`pageerror: ${e.message}`))
      page.on('requestfailed', r => problems.push(`request failed: ${r.url()}`))
      page.on('response', r => r.status() >= 400 && problems.push(`HTTP ${r.status()}: ${r.url()}`))
      const res = await page.goto(origin + BASE + p, { waitUntil: 'networkidle' })
      if (res.status() !== 200) fail(where, `status ${res.status()}`)
      problems.forEach(m => fail(where, m))

      const info = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        h1: document.querySelectorAll('h1').length,
        text: document.body.innerText,
        lang: document.documentElement.lang,
        dark: document.documentElement.classList.contains('dark'),
        hrefs: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
        title: document.title,
      }))
      if (info.overflow > 0) fail(where, `horizontal overflow ${info.overflow}px`)
      if (info.h1 !== 1) fail(where, `expected one h1, found ${info.h1}`)
      if (!info.title) fail(where, 'empty <title>')
      const raw = info.text.match(RAW_KEY)
      if (raw) fail(where, `raw i18n key visible: ${raw[0]}`)
      if (info.lang.slice(0, 2) !== (p.startsWith('vi/') ? 'vi' : 'en')) fail(where, `html lang is "${info.lang}"`)
      if (info.dark !== (scheme === 'dark')) fail(where, `dark class ${info.dark} under ${scheme} scheme`)
      for (const h of info.hrefs) {
        if (h.startsWith('/') && !h.startsWith(BASE)) fail(where, `link escapes base path: ${h}`)
      }
      if (/\.pen\b|\$12/.test(info.text)) fail(where, 'private detail visible')

      const name = `${(p || 'home').replace(/\//g, '_')}-${width}-${scheme}.png`
      await page.screenshot({ path: join(OUT, name), fullPage: true })
      await page.close()
    }
    await ctx.close()
  }
}

// Behaviour checks
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const page = await ctx.newPage()

await page.goto(origin + BASE, { waitUntil: 'networkidle' })
if (await page.locator('#projects article').count() !== 3) fail('home', 'expected three project cards')

await page.goto(origin + BASE + 'projects/booking-platform/', { waitUntil: 'networkidle' })
await page.locator('a[lang="vi"]').click()
await page.waitForURL('**/vi/projects/booking-platform**')
if (!(await page.locator('h1').innerText()).includes('Nền tảng')) fail('lang switch', 'case study did not switch to Vietnamese')
await page.locator('header a', { hasText: 'Dự án' }).first().click()
await page.waitForURL('**/vi**#projects')

await page.goto(origin + BASE, { waitUntil: 'networkidle' })
await page.locator('button[aria-label*="theme"]').click()
if (!(await page.evaluate(() => document.documentElement.classList.contains('dark')))) fail('theme', 'toggle did not enable dark mode')
await page.reload({ waitUntil: 'networkidle' })
if (!(await page.evaluate(() => document.documentElement.classList.contains('dark')))) fail('theme', 'choice not remembered after reload')

const missing = await page.goto(origin + BASE + 'projects/does-not-exist/', { waitUntil: 'networkidle' })
if (missing.status() !== 404) fail('404', `status ${missing.status()}`)
if (await page.locator('[data-error-page]').count() !== 1) fail('404', 'error page not shown for unknown project')
await page.screenshot({ path: join(OUT, '404.png') })

// Contact form (only present when the site was generated with NUXT_PUBLIC_CONTACT_ENDPOINT)
await page.goto(origin + BASE, { waitUntil: 'networkidle' })
if (await page.locator('#contact form').count()) {
  console.log('Checking contact form')
  let posts = []
  let reply = { status: 200, body: '{"ok":true}' }
  await page.route('https://contact.test/**', (route) => {
    posts.push(route.request().postData())
    route.fulfill({ status: reply.status, contentType: 'application/json', headers: { 'Access-Control-Allow-Origin': '*' }, body: reply.body })
  })
  const send = () => page.locator('#contact form button[type=submit]').click()

  await send()
  if (await page.locator('#contact form [id$="-error"]').count() !== 3) fail('form', 'empty submit should show three errors')
  if (posts.length) fail('form', 'invalid form was sent')

  await page.fill('#contact-name', 'Ada')
  await page.fill('#contact-email', 'not-an-email')
  await page.fill('#contact-message', 'Hello')
  await send()
  if (await page.locator('#contact-email-error').count() !== 1) fail('form', 'bad email not flagged')

  // Server failure keeps what the visitor typed
  reply = { status: 200, body: '{"ok":false,"error":"server_error"}' }
  await page.fill('#contact-email', 'ada@example.com')
  await send()
  await page.locator('#contact [role=alert]').waitFor()
  if (await page.inputValue('#contact-message') !== 'Hello') fail('form', 'message lost after failed send')

  // Success
  reply = { status: 200, body: '{"ok":true}' }
  await send()
  await page.locator('#contact [role=status]').waitFor()
  const sent = JSON.parse(posts.at(-1))
  if (sent.name !== 'Ada' || sent.email !== 'ada@example.com' || sent.lang !== 'en') fail('form', `unexpected payload ${posts.at(-1)}`)

  // Honeypot: looks successful, sends nothing
  await page.reload({ waitUntil: 'networkidle' })
  posts = []
  await page.fill('#contact-name', 'Bot'); await page.fill('#contact-email', 'bot@example.com'); await page.fill('#contact-message', 'spam')
  await page.locator('#contact-website').evaluate((el) => { el.value = 'http://spam'; el.dispatchEvent(new Event('input')) })
  await send()
  await page.locator('#contact [role=status]').waitFor()
  if (posts.length) fail('form', 'honeypot submission was sent')
  await page.locator('#contact').screenshot({ path: join(OUT, 'contact-form.png') })
}

// Mobile menu
const m = await browser.newContext({ viewport: { width: 375, height: 800 } })
const mp = await m.newPage()
await mp.goto(origin + BASE, { waitUntil: 'networkidle' })
await mp.locator('button[aria-controls="mobile-nav"]').click()
if (!(await mp.locator('#mobile-nav').isVisible())) fail('mobile', 'menu did not open')
await mp.locator('#mobile-nav a', { hasText: 'Contact' }).click()
await mp.waitForTimeout(800)
if (await mp.locator('#mobile-nav').isVisible()) fail('mobile', 'menu stayed open after navigating')
if (!(await mp.locator('#contact').evaluate(el => { const r = el.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0 }))) fail('mobile', 'contact section not scrolled into view')

await browser.close()
server.close()
console.log(failures.length ? `\n${failures.length} failure(s)` : '\nAll checks passed')
process.exit(failures.length ? 1 : 0)
