<script setup lang="ts">
import { projects } from '~/data/projects'
const { t } = useI18n()
usePageSeo(() => t('nav.projects'), () => t('pages.projects.seoDescription'))
</script>

<template>
  <div>
    <UiPageHeader :eyebrow="t('pages.projects.eyebrow')" :title="t('home.projectsTitle')" :lead="t('home.projectsNote')" />
    <div class="container-page grid gap-4 py-12 sm:py-16">
      <ProjectCard v-for="(p, i) in projects" :key="p.slug" :project="p" :index="i" data-reveal />
    </div>
    <UiCtaBand />
  </div>
</template>
