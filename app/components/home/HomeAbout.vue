<script setup lang="ts">
import { profile } from '~/data/profile'
const l = useL()
</script>

<template>
  <section id="about" class="section">
    <div class="container-page grid gap-10 lg:grid-cols-5">
      <div class="lg:col-span-3">
        <p class="eyebrow">{{ $t('home.aboutEyebrow') }}</p>
        <h2 class="h2">{{ $t('home.aboutTitle') }}</h2>
        <p v-for="p in profile.about" :key="p.en" class="mt-5 text-muted">{{ l(p) }}</p>
      </div>
      <dl class="card self-start lg:col-span-2">
        <div v-for="(f, i) in profile.facts" :key="f.label.en" :class="i > 0 ? 'mt-4 border-t border-border pt-4' : ''">
          <dt class="font-mono text-xs uppercase tracking-widest text-muted">{{ l(f.label) }}</dt>
          <dd class="mt-1 text-sm">{{ l(f.value) }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
