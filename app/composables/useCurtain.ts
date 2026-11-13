import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// The curtain is the 5-column overlay rendered by <SiteCurtain>. It covers the screen on first
// load (intro) and between pages (cover → reveal). Everything here is client-only and is skipped
// entirely when the visitor prefers reduced motion.

const COVER = { duration: 0.5, ease: 'power3.inOut', stagger: 0.06 }
let registered = false

export function prefersReducedMotion() {
  return import.meta.server || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function parts() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }
  return {
    root: document.querySelector<HTMLElement>('[data-curtain]'),
    cols: gsap.utils.toArray<HTMLElement>('[data-curtain-col]'),
    label: document.querySelector<HTMLElement>('[data-curtain-label]'),
    count: document.querySelector<HTMLElement>('[data-curtain-count]'),
  }
}

function setState(state: 'intro' | 'covering' | 'revealing' | 'idle') {
  document.documentElement.dataset.curtainState = state
}

/** Hide every [data-reveal] element under root, then fade each one up as it scrolls into view. */
export function setupReveals(root: ParentNode = document) {
  if (prefersReducedMotion()) return
  parts()
  ScrollTrigger.getAll().forEach(t => t.kill())
  const els = gsap.utils.toArray<HTMLElement>('[data-reveal]', root as Element)
  if (!els.length) return
  gsap.set(els, { autoAlpha: 0, y: 28 })
  ScrollTrigger.batch(els, {
    start: 'top 92%',
    once: true,
    onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, overwrite: true }),
  })
}

/** First visit: columns already cover the screen (see the inline script in nuxt.config). Count up, then open. */
export function playIntro() {
  const html = document.documentElement
  const { root, cols, label, count } = parts()
  const finish = () => {
    html.classList.remove('is-preloading')
    if (root) gsap.set(root, { visibility: 'hidden' })
    setState('idle')
  }
  if (prefersReducedMotion() || !root || !html.classList.contains('is-preloading')) return finish()

  setState('intro')
  gsap.set(root, { visibility: 'visible' })
  gsap.set(cols, { yPercent: 0 })
  const counter = { value: 0 }
  gsap.timeline({ onComplete: finish })
    .to(counter, {
      value: 100,
      duration: 0.9,
      ease: 'power2.inOut',
      onUpdate: () => { if (count) count.textContent = String(Math.round(counter.value)).padStart(3, '0') },
    })
    .to(label, { autoAlpha: 0, y: -16, duration: 0.3, ease: 'power2.in' }, '+=0.1')
    .add(() => { setState('revealing'); setupReveals() })
    .to(cols, { yPercent: -100, ...COVER })
}

/** Leaving a page: columns rise from the bottom until the screen is covered, showing where we are going. */
export function coverPage(text: string, done: () => void) {
  const { root, cols, label, count } = parts()
  if (prefersReducedMotion() || !root) return done()
  setState('covering')
  if (count) count.textContent = ''
  if (label) {
    label.querySelector('[data-curtain-text]')!.textContent = text
    gsap.set(label, { autoAlpha: 0, y: 16 })
  }
  gsap.set(root, { visibility: 'visible' })
  gsap.timeline({ onComplete: done })
    .fromTo(cols, { yPercent: 100 }, { yPercent: 0, ...COVER })
    .to(label, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '-=0.25')
    .add(() => { if (!window.location.hash) window.scrollTo(0, 0) })
}

/** Entering a page: columns continue upwards and uncover it. */
export function revealPage(pageEl: Element, done: () => void) {
  const { root, cols, label } = parts()
  if (prefersReducedMotion() || !root) {
    setState('idle')
    return done()
  }
  gsap.timeline({
    onComplete: () => {
      gsap.set(root, { visibility: 'hidden' })
      setState('idle')
      done()
    },
  })
    .to(label, { autoAlpha: 0, y: -16, duration: 0.25, ease: 'power2.in' }, '+=0.15')
    .add(() => { setState('revealing'); setupReveals(pageEl) })
    .to(cols, { yPercent: -100, ...COVER })
}
