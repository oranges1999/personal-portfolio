<script setup lang="ts">
import { profile } from '~/data/profile'
const l = useL()
const localePath = useLocalePath()
</script>

<template>
  <section class="section">
    <div class="container-page">
      <div class="flex flex-wrap items-end justify-between gap-4" data-reveal>
        <div>
          <p class="eyebrow">{{ $t('nav.services') }}</p>
          <h2 class="h2">{{ $t('home.servicesTitle') }}</h2>
        </div>
        <NuxtLink :to="localePath('/services')" class="text-sm font-medium text-accent">{{ $t('home.allServices') }} <span aria-hidden="true">→</span></NuxtLink>
      </div>
      <ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="s in profile.services" :key="s.id" data-reveal>
          <NuxtLink :to="{ path: localePath('/services'), hash: `#${s.id}` }" class="card block h-full transition-colors hover:border-fg">
            <h3 class="font-semibold">{{ l(s.title) }}</h3>
            <p class="mt-2 text-sm text-muted">{{ l(s.body) }}</p>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>
