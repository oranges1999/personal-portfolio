<script setup lang="ts">
import type { ProjectStatus } from '~/data/types'
defineProps<{ status: ProjectStatus }>()
</script>

<template>
  <span
    class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
    :class="status === 'planned' ? 'border-border text-muted' : 'border-transparent bg-accent-soft text-accent'"
  >
    <span class="h-1.5 w-1.5 rounded-full" :class="status === 'planned' ? 'bg-muted' : 'bg-accent'" aria-hidden="true" />
    {{ $t(`status.${status}`) }}
  </span>
</template>
