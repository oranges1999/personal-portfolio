<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <section class="section">
    <div class="container-page">
      <div class="card flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center sm:p-10" data-reveal>
        <div>
          <h2 class="text-2xl font-semibold tracking-tight sm:text-3xl">{{ $t('home.ctaTitle') }}</h2>
          <p class="mt-2 text-muted">{{ $t('home.ctaLead') }}</p>
        </div>
        <NuxtLink :to="localePath('/contact')" class="btn btn-primary shrink-0">{{ $t('home.ctaButton') }}</NuxtLink>
      </div>
    </div>
  </section>
</template>
