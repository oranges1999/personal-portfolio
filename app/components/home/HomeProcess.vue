<script setup lang="ts">
import { profile } from '~/data/profile'
const l = useL()
</script>

<template>
  <section class="section">
    <div class="container-page">
      <p class="eyebrow" data-reveal>{{ $t('home.processEyebrow') }}</p>
      <h2 class="h2" data-reveal>{{ $t('home.processTitle') }}</h2>
      <ol class="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <li v-for="(p, i) in profile.process" :key="p.title.en" class="flex gap-4" data-reveal>
          <span class="font-mono text-sm text-accent" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <div>
            <h3 class="font-semibold">{{ l(p.title) }}</h3>
            <p class="mt-1 text-sm text-muted">{{ l(p.body) }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
