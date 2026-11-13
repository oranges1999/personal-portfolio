<script setup lang="ts">
import type { Project } from '~/data/types'
defineProps<{ project: Project; index: number }>()
const l = useL()
const localePath = useLocalePath()
</script>

<template>
  <article class="card group relative flex flex-col gap-4 transition-colors hover:border-fg sm:flex-row sm:gap-8 sm:p-8">
    <div class="font-mono text-sm text-muted sm:w-10 sm:pt-1" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</div>
    <div class="min-w-0 flex-1">
      <ProjectStatusBadge :status="project.status" />
      <h3 class="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
        <NuxtLink :to="localePath(`/projects/${project.slug}`)" class="after:absolute after:inset-0">{{ l(project.title) }}</NuxtLink>
      </h3>
      <p class="mt-2 text-muted">{{ l(project.summary) }}</p>
      <ul class="mt-4 flex flex-wrap gap-2">
        <li v-for="s in project.stack.slice(0, 6)" :key="s" class="chip">{{ s }}</li>
      </ul>
      <p class="mt-5 text-sm font-medium text-accent">
        {{ $t('project.readCase') }} <span aria-hidden="true" class="inline-block transition-transform group-hover:translate-x-1">→</span>
      </p>
    </div>
  </article>
</template>
