<script setup lang="ts">
import { getProject } from '~/data/projects'

const router = useRouter()
const routeBaseName = useRouteBaseName()
const { t, locale } = useI18n()

/** Text shown on the curtain while navigating: the name of the page we are going to. */
function destinationLabel() {
  const route = router.currentRoute.value
  const name = routeBaseName(route) ?? 'index'
  if (name === 'projects-slug') {
    const project = getProject(String(route.params.slug))
    if (project) return project.title[locale.value as 'en' | 'vi']
  }
  const key = { index: 'home', services: 'services', projects: 'projects', about: 'about', contact: 'contact' }[name]
  return key ? t(`nav.${key}`) : 'Huy Nguyen.'
}

const transition = {
  name: 'curtain',
  mode: 'out-in' as const,
  css: false,
  onLeave: (_el: Element, done: () => void) => coverPage(destinationLabel(), done),
  onEnter: (el: Element, done: () => void) => revealPage(el, done),
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage :transition="transition" />
  </NuxtLayout>
</template>
