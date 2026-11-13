<script setup lang="ts">
import { getProject } from '~/data/projects'

const route = useRoute()
const project = getProject(String(route.params.slug))
if (!project) throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })

const l = useL()
const { t } = useI18n()
const localePath = useLocalePath()
const base = useRuntimeConfig().app.baseURL
const planned = project.status === 'planned'

useSeoMeta({
  title: () => `${l(project.title)} — Huy Nguyen`,
  description: () => l(project.summary),
  ogTitle: () => l(project.title),
  ogDescription: () => l(project.summary),
  ogType: 'article',
})
</script>

<template>
  <article v-if="project" class="container-page py-12 sm:py-16">
    <NuxtLink :to="{ path: localePath('/'), hash: '#projects' }" class="text-sm text-muted hover:text-fg">
      <span aria-hidden="true">←</span> {{ t('project.back') }}
    </NuxtLink>

    <header class="mt-8 max-w-3xl">
      <ProjectStatusBadge :status="project.status" />
      <h1 class="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{{ l(project.title) }}</h1>
      <p class="mt-5 text-lg text-muted">{{ l(project.summary) }}</p>
      <ul class="mt-6 flex flex-wrap gap-2">
        <li v-for="s in project.stack" :key="s" class="chip">{{ s }}</li>
      </ul>
      <div v-if="project.demoUrl || project.repoUrl" class="mt-7 flex flex-wrap gap-3">
        <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" rel="noopener" class="btn btn-primary">{{ t('project.demo') }} <span aria-hidden="true">↗</span></a>
        <a v-if="project.repoUrl" :href="project.repoUrl" target="_blank" rel="noopener" class="btn btn-ghost">{{ t('project.repo') }} <span aria-hidden="true">↗</span></a>
      </div>
      <p v-if="planned || !project.demoUrl" class="mt-7 rounded-lg border border-border bg-surface p-4 text-sm text-muted">
        {{ planned ? t('project.plannedNote') : t('project.completedNote') }}
      </p>
    </header>

    <section v-if="project.screenshots?.length" class="mt-14">
      <h2 class="text-2xl font-semibold tracking-tight">{{ t('project.screenshots') }}</h2>
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <img v-for="s in project.screenshots" :key="s.src" :src="base + s.src" :alt="l(s.alt)" loading="lazy" class="w-full rounded-xl border border-border">
      </div>
    </section>

    <section class="mt-14 max-w-3xl">
      <h2 class="text-2xl font-semibold tracking-tight">{{ t('project.problem') }}</h2>
      <p class="mt-4 text-muted">{{ l(project.problem) }}</p>
    </section>

    <section v-if="project.roles?.length" class="mt-14">
      <h2 class="text-2xl font-semibold tracking-tight">{{ t('project.roles') }}</h2>
      <dl class="mt-6 grid gap-4 sm:grid-cols-2">
        <div v-for="r in project.roles" :key="r.name.en" class="card">
          <dt class="font-semibold">{{ l(r.name) }}</dt>
          <dd class="mt-2 text-sm text-muted">{{ l(r.can) }}</dd>
        </div>
      </dl>
    </section>

    <section class="mt-14">
      <h2 class="text-2xl font-semibold tracking-tight">{{ planned ? t('project.plannedFeatures') : t('project.features') }}</h2>
      <div class="mt-6 grid gap-4 md:grid-cols-2">
        <div v-for="g in project.features" :key="g.title.en" class="card">
          <h3 class="font-semibold">{{ l(g.title) }}</h3>
          <ul class="mt-3 grid gap-2 text-sm text-muted">
            <li v-for="item in g.items" :key="item.en" class="flex gap-3">
              <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span>{{ l(item) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="mt-14 max-w-3xl">
      <h2 class="text-2xl font-semibold tracking-tight">{{ planned ? t('project.plannedHighlights') : t('project.highlights') }}</h2>
      <ol class="mt-6 grid gap-5">
        <li v-for="(h, i) in project.highlights" :key="h.en" class="flex gap-4">
          <span class="font-mono text-sm text-accent" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <p class="text-muted">{{ l(h) }}</p>
        </li>
      </ol>
    </section>

    <aside class="card mt-16 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:p-8">
      <p class="text-xl font-semibold tracking-tight">{{ t('project.cta') }}</p>
      <NuxtLink :to="{ path: localePath('/'), hash: '#contact' }" class="btn btn-primary">{{ t('project.ctaButton') }}</NuxtLink>
    </aside>
  </article>
</template>
