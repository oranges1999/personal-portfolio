<script setup lang="ts">
const { t } = useI18n()
useSeoMeta({
  title: () => t('seo.homeTitle'),
  description: () => t('seo.homeDescription'),
  ogTitle: () => t('seo.homeTitle'),
  ogDescription: () => t('seo.homeDescription'),
  ogType: 'website',
})
</script>

<template>
  <div>
    <HomeHero />
    <HomeServices />
    <HomeProjects />
    <HomeProcess />
    <HomeStack />
    <HomeAbout />
    <HomeContact />
  </div>
</template>
