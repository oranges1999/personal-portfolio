<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="flex items-center rounded-lg border border-border p-0.5 text-xs font-medium" role="group" :aria-label="$t('lang.switch')">
    <NuxtLink
      v-for="l in locales"
      :key="l.code"
      :to="switchLocalePath(l.code)"
      :lang="l.code"
      :aria-current="l.code === locale ? 'true' : undefined"
      :title="l.name"
      class="rounded-md px-2 py-1.5 uppercase"
      :class="l.code === locale ? 'bg-fg text-bg' : 'text-muted hover:text-fg'"
    >{{ l.code }}</NuxtLink>
  </div>
</template>
