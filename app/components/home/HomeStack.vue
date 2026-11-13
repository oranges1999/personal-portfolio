<script setup lang="ts">
import { profile } from '~/data/profile'
const l = useL()
</script>

<template>
  <section id="stack" class="section">
    <div class="container-page">
      <p class="eyebrow">{{ $t('home.stackEyebrow') }}</p>
      <h2 class="h2">{{ $t('home.stackTitle') }}</h2>
      <dl class="mt-10 grid gap-8 sm:grid-cols-2">
        <div v-for="g in profile.stack" :key="g.group.en">
          <dt class="text-sm font-semibold">{{ l(g.group) }}</dt>
          <dd class="mt-3 flex flex-wrap gap-2">
            <span v-for="item in g.items" :key="item" class="chip">{{ item }}</span>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
