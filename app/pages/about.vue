<script setup lang="ts">
import { profile } from '~/data/profile'
const l = useL()
const { t } = useI18n()
usePageSeo(() => t('nav.about'), () => t('pages.about.seoDescription'))
</script>

<template>
  <div>
    <UiPageHeader :eyebrow="t('pages.about.eyebrow')" :title="t('pages.about.title')" />
    <div class="container-page grid gap-10 py-12 sm:py-16 lg:grid-cols-5">
      <div class="lg:col-span-3">
        <p v-for="(p, i) in profile.about" :key="p.en" class="text-lg" :class="i > 0 ? 'mt-5 text-muted' : ''" data-reveal>{{ l(p) }}</p>
      </div>
      <dl class="card self-start lg:col-span-2" data-reveal>
        <div v-for="(f, i) in profile.facts" :key="f.label.en" :class="i > 0 ? 'mt-4 border-t border-border pt-4' : ''">
          <dt class="font-mono text-xs uppercase tracking-widest text-muted">{{ l(f.label) }}</dt>
          <dd class="mt-1 text-sm">{{ l(f.value) }}</dd>
        </div>
      </dl>
    </div>
    <HomeProcess />
    <HomeStack />
    <UiCtaBand />
  </div>
</template>
