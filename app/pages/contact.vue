<script setup lang="ts">
import { profile } from '~/data/profile'
const { t } = useI18n()
const { contactEndpoint } = useRuntimeConfig().public
const hasForm = computed(() => Boolean(contactEndpoint))
const channels = [
  { label: 'Upwork', text: 'upwork.com/freelancers', href: profile.links.upwork, external: true },
  { label: 'GitHub', text: profile.links.github.replace('https://', ''), href: profile.links.github, external: true },
  { label: 'Email', text: profile.links.email, href: `mailto:${profile.links.email}`, external: false },
]
usePageSeo(() => t('nav.contact'), () => t('pages.contact.seoDescription'))
</script>

<template>
  <div>
    <UiPageHeader :eyebrow="t('pages.contact.eyebrow')" :title="t('home.contactTitle')" :lead="t('home.contactLead')" />
    <div id="contact" class="container-page grid gap-10 py-12 sm:py-16" :class="hasForm ? 'lg:grid-cols-2' : ''">
      <ContactForm v-if="hasForm" :endpoint="contactEndpoint" data-reveal />
      <div data-reveal>
        <p v-if="hasForm" class="text-sm font-semibold">{{ t('home.contactOr') }}</p>
        <ul class="grid max-w-xl gap-3" :class="hasForm ? 'mt-4' : ''">
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
    </div>
  </div>
</template>
