<script setup lang="ts">
import { profile } from '~/data/profile'
const { contactEndpoint } = useRuntimeConfig().public
const hasForm = computed(() => Boolean(contactEndpoint))
const channels = [
  { label: 'Upwork', text: 'upwork.com/freelancers', href: profile.links.upwork, external: true },
  { label: 'GitHub', text: profile.links.github.replace('https://', ''), href: profile.links.github, external: true },
  { label: 'Email', text: profile.links.email, href: `mailto:${profile.links.email}`, external: false },
]
</script>

<template>
  <section id="contact" class="section">
    <div class="container-page grid gap-10" :class="hasForm ? 'lg:grid-cols-2' : ''">
      <div>
        <p class="eyebrow">{{ $t('home.contactEyebrow') }}</p>
        <h2 class="h2">{{ $t('home.contactTitle') }}</h2>
        <p class="mt-4 max-w-xl text-muted">{{ $t('home.contactLead') }}</p>
        <p v-if="hasForm" class="mt-8 text-sm font-semibold">{{ $t('home.contactOr') }}</p>
        <ul class="mt-4 grid max-w-xl gap-3">
          <li v-for="c in channels" :key="c.label">
            <a
              :href="c.href"
              :target="c.external ? '_blank' : undefined"
              :rel="c.external ? 'noopener' : undefined"
              class="card flex items-center justify-between gap-4 !p-4 transition-colors hover:border-fg"
            >
              <span class="font-medium">{{ c.label }}</span>
              <span class="truncate text-sm text-muted">{{ c.text }}</span>
            </a>
          </li>
        </ul>
      </div>
      <ContactForm v-if="hasForm" :endpoint="contactEndpoint" />
    </div>
  </section>
</template>
