<script setup lang="ts">
import { projects } from '~/data/projects'
const localePath = useLocalePath()
</script>

<template>
  <section class="section">
    <div class="container-page">
      <div class="flex flex-wrap items-end justify-between gap-4" data-reveal>
        <div>
          <p class="eyebrow">{{ $t('nav.projects') }}</p>
          <h2 class="h2">{{ $t('home.projectsTitle') }}</h2>
        </div>
        <NuxtLink :to="localePath('/projects')" class="text-sm font-medium text-accent">{{ $t('home.allProjects') }} <span aria-hidden="true">→</span></NuxtLink>
      </div>
      <div class="mt-10 grid gap-4">
        <ProjectCard v-for="(p, i) in projects" :key="p.slug" :project="p" :index="i" data-reveal />
      </div>
    </div>
  </section>
</template>
