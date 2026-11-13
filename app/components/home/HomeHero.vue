<script setup lang="ts">
import { profile } from '~/data/profile'
const l = useL()
const localePath = useLocalePath()
const role = computed(() => l(profile.title).split(' — ')[0])
const focus = computed(() => l(profile.title).split(' — ')[1])
</script>

<template>
  <section class="container-page py-20 sm:py-32">
    <p class="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted" data-reveal>
      <span class="h-2 w-2 rounded-full bg-green-600" aria-hidden="true" />{{ $t('home.availability') }}
    </p>
    <h1 class="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl" data-reveal>
      {{ role }}<span class="text-accent">.</span>
    </h1>
    <p class="mt-4 text-2xl text-muted sm:text-3xl" data-reveal>{{ focus }}</p>
    <p class="mt-6 max-w-2xl text-lg text-muted" data-reveal>{{ l(profile.intro) }}</p>
    <div class="mt-9 flex flex-wrap gap-3" data-reveal>
      <NuxtLink :to="localePath('/projects')" class="btn btn-primary">{{ $t('home.viewProjects') }}</NuxtLink>
      <a :href="profile.links.upwork" target="_blank" rel="noopener" class="btn btn-ghost">{{ $t('home.hireUpwork') }} <span aria-hidden="true">↗</span></a>
    </div>
  </section>
</template>
