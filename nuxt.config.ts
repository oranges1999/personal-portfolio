const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://oranges1999.github.io/personal-portfolio'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  ssr: true,
  devtools: { enabled: false },
  modules: ['@nuxtjs/i18n', '@nuxtjs/color-mode'],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [(await import('@tailwindcss/vite')).default()] },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      // Show the preloader before first paint. If the app never boots, uncover the page anyway.
      script: [{
        tagPosition: 'head',
        innerHTML: "(function(d){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('is-preloading');setTimeout(function(){if(!d.dataset.curtainState)d.classList.remove('is-preloading')},5000)})(document.documentElement)",
      }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: `${process.env.NUXT_APP_BASE_URL || '/'}favicon.svg` }],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl,
      // URL of the deployed Google Apps Script web app. Empty = contact form hidden.
      contactEndpoint: '',
    },
  },

  colorMode: { classSuffix: '', preference: 'system', fallback: 'light' },

  i18n: {
    baseUrl: siteUrl,
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'vi', language: 'vi-VN', name: 'Tiếng Việt', file: 'vi.json' },
    ],
  },

  nitro: {
    prerender: { crawlLinks: true, routes: ['/', '/vi', '/404.html'] },
  },
})
