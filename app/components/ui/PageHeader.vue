<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; lead?: string }>()
</script>

<template>
  <header class="container-page pb-4 pt-16 sm:pt-24">
    <p class="eyebrow" data-reveal>{{ eyebrow }}</p>
    <h1 class="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl" data-reveal>{{ title }}</h1>
    <p v-if="lead" class="mt-6 max-w-2xl text-lg text-muted" data-reveal>{{ lead }}</p>
  </header>
</template>
