<script setup lang="ts">
const localePath = useLocalePath()
const open = ref(false)
const items = ['services', 'projects', 'about', 'contact'] as const
const route = useRoute()
const routeBaseName = useRouteBaseName()
const current = computed(() => (routeBaseName(route) ?? '').split('-')[0])
watch(() => route.fullPath, () => { open.value = false })
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
    <div class="container-page flex h-16 items-center justify-between gap-4">
      <NuxtLink :to="localePath('/')" class="font-semibold tracking-tight">
        Huy Nguyen<span class="text-accent">.</span>
      </NuxtLink>

      <nav class="hidden md:block" :aria-label="$t('nav.main')">
        <ul class="flex items-center gap-7 text-sm text-muted">
          <li v-for="id in items" :key="id">
            <NuxtLink :to="localePath(`/${id}`)" class="hover:text-fg" :class="current === id ? 'text-fg' : ''" :aria-current="current === id ? 'page' : undefined">{{ $t(`nav.${id}`) }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-1">
        <SiteLangSwitch />
        <SiteThemeToggle />
        <button
          type="button"
          class="grid h-10 w-10 place-items-center rounded-lg hover:bg-surface md:hidden"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          :aria-label="$t('nav.menu')"
          @click="open = !open"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path v-if="!open" d="M4 7h16M4 12h16M4 17h16" />
            <path v-else d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>

    <nav v-show="open" id="mobile-nav" class="border-t border-border md:hidden" :aria-label="$t('nav.main')">
      <ul class="container-page py-2">
        <li v-for="id in items" :key="id">
          <NuxtLink :to="localePath(`/${id}`)" class="block py-3 text-base" :aria-current="current === id ? 'page' : undefined" @click="open = false">{{ $t(`nav.${id}`) }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
