<script setup lang="ts">
const head = useLocaleHead()
useHead(() => ({
  htmlAttrs: { lang: head.value.htmlAttrs?.lang },
  link: head.value.link,
  meta: head.value.meta,
}))
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 btn btn-primary">{{ $t('nav.skip') }}</a>
    <SiteHeader />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <SiteFooter />
    <SiteCurtain />
  </div>
</template>
