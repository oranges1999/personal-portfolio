<script setup lang="ts">
import { profile } from '~/data/profile'
const l = useL()
const { t } = useI18n()
usePageSeo(() => t('nav.services'), () => t('pages.services.seoDescription'))
</script>

<template>
  <div>
    <UiPageHeader :eyebrow="t('pages.services.eyebrow')" :title="t('pages.services.title')" :lead="t('pages.services.lead')" />
    <div class="container-page py-12 sm:py-16">
      <section
        v-for="(s, i) in profile.services"
        :id="s.id"
        :key="s.id"
        class="grid gap-6 border-t border-border py-10 sm:py-14 md:grid-cols-12"
        data-reveal
      >
        <p class="font-mono text-sm text-accent md:col-span-1" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</p>
        <div class="md:col-span-4">
          <h2 class="text-2xl font-semibold tracking-tight sm:text-3xl">{{ l(s.title) }}</h2>
          <ul class="mt-5 flex flex-wrap gap-2">
            <li v-for="tool in s.tools" :key="tool" class="chip">{{ tool }}</li>
          </ul>
        </div>
        <div class="md:col-span-7">
          <p class="text-lg">{{ l(s.body) }}</p>
          <ul class="mt-5 grid gap-3 text-muted">
            <li v-for="p in s.points" :key="p.en" class="flex gap-3">
              <span class="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span>{{ l(p) }}</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
    <UiCtaBand />
  </div>
</template>
