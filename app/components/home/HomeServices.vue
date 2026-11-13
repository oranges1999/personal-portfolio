<script setup lang="ts">
import { profile } from '~/data/profile'
const l = useL()
</script>

<template>
  <section id="services" class="section">
    <div class="container-page">
      <p class="eyebrow">{{ $t('home.servicesEyebrow') }}</p>
      <h2 class="h2">{{ $t('home.servicesTitle') }}</h2>
      <ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="s in profile.services" :key="s.title.en" class="card">
          <h3 class="font-semibold">{{ l(s.title) }}</h3>
          <p class="mt-2 text-sm text-muted">{{ l(s.body) }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
