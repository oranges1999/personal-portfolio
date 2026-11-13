<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number } }>()
const { t } = useI18n()
const localePath = useLocalePath()
const notFound = computed(() => props.error?.statusCode === 404)
useHead({ title: () => (notFound.value ? t('error.notFoundTitle') : t('error.genericTitle')) })
</script>

<template>
  <NuxtLayout>
    <div class="container-page py-28 text-center" data-error-page>
      <p class="font-mono text-sm text-accent">{{ error?.statusCode || 500 }}</p>
      <h1 class="mt-3 text-4xl font-semibold tracking-tight">{{ notFound ? t('error.notFoundTitle') : t('error.genericTitle') }}</h1>
      <p v-if="notFound" class="mt-4 text-muted">{{ t('error.notFoundBody') }}</p>
      <a :href="localePath('/')" class="btn btn-primary mt-8">{{ t('error.home') }}</a>
    </div>
  </NuxtLayout>
</template>
