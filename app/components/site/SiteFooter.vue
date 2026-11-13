<script setup lang="ts">
import { profile } from '~/data/profile'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border">
    <div class="container-page flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
      <p>© {{ year }} {{ profile.name }}. {{ $t('footer.built') }}</p>
      <ul class="flex gap-5">
        <li><a :href="profile.links.upwork" target="_blank" rel="noopener" class="hover:text-fg">Upwork</a></li>
        <li><a :href="profile.links.github" target="_blank" rel="noopener" class="hover:text-fg">GitHub</a></li>
        <li><a :href="`mailto:${profile.links.email}`" class="hover:text-fg">Email</a></li>
      </ul>
    </div>
  </footer>
</template>
