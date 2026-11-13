<script setup lang="ts">
// Markup for the preloader / page-transition overlay. Animation lives in composables/useCurtain.ts.
onMounted(() => playIntro())
</script>

<template>
  <div data-curtain class="curtain" aria-hidden="true">
    <div class="absolute inset-0 flex">
      <div v-for="n in 5" :key="n" data-curtain-col class="h-full flex-1 bg-accent" />
    </div>
    <div data-curtain-label class="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-accent-fg">
      <span data-curtain-text class="text-4xl font-semibold tracking-tight sm:text-6xl">Huy Nguyen.</span>
      <span data-curtain-count class="font-mono text-sm tabular-nums opacity-80">000</span>
    </div>
  </div>
</template>
