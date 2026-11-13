<script setup lang="ts">
import { projects } from '~/data/projects'
</script>

<template>
  <section id="projects" class="section">
    <div class="container-page">
      <p class="eyebrow">{{ $t('home.projectsEyebrow') }}</p>
      <h2 class="h2">{{ $t('home.projectsTitle') }}</h2>
      <p class="mt-4 max-w-2xl text-muted">{{ $t('home.projectsNote') }}</p>
      <div class="mt-10 grid gap-4">
        <ProjectCard v-for="(p, i) in projects" :key="p.slug" :project="p" :index="i" />
      </div>
    </div>
  </section>
</template>
