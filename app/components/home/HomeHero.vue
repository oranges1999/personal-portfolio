<script setup lang="ts">
import { profile } from '~/data/profile'
const l = useL()
const [role, focus] = [computed(() => l(profile.title).split(' — ')[0]), computed(() => l(profile.title).split(' — ')[1])]
</script>

<template>
  <section class="container-page py-20 sm:py-28">
    <p class="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
      <span class="h-2 w-2 rounded-full bg-green-600" aria-hidden="true" />{{ $t('home.availability') }}
    </p>
    <h1 class="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
      {{ role }}<span class="text-accent">.</span>
      <span class="mt-3 block text-2xl font-normal text-muted sm:text-3xl">{{ focus }}</span>
    </h1>
    <p class="mt-6 max-w-2xl text-lg text-muted">{{ l(profile.intro) }}</p>
    <div class="mt-9 flex flex-wrap gap-3">
      <a href="#projects" class="btn btn-primary">{{ $t('home.viewProjects') }}</a>
      <a :href="profile.links.upwork" target="_blank" rel="noopener" class="btn btn-ghost">{{ $t('home.hireUpwork') }} <span aria-hidden="true">↗</span></a>
    </div>
  </section>
</template>
