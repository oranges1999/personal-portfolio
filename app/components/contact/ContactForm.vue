<script setup lang="ts">
import { profile } from '~/data/profile'
import { CONTACT_LIMITS, validateContact, type ContactErrors } from '~/utils/contact'

const props = defineProps<{ endpoint: string }>()
const { locale } = useI18n()
const route = useRoute()

const form = reactive({ name: '', email: '', message: '', website: '' })
const errors = ref<ContactErrors>({})
const state = ref<'idle' | 'sending' | 'sent' | 'failed'>('idle')
const fields = ['name', 'email', 'message'] as const

async function submit() {
  if (state.value === 'sending') return
  errors.value = validateContact(form)
  const firstInvalid = fields.find(f => errors.value[f])
  if (firstInvalid) {
    document.getElementById(`contact-${firstInvalid}`)?.focus()
    return
  }
  // Honeypot filled: a bot. Pretend it worked and send nothing.
  if (form.website) {
    state.value = 'sent'
    return
  }
  state.value = 'sending'
  try {
    // text/plain keeps this a "simple" request: Apps Script web apps cannot answer a CORS preflight.
    const res = await fetch(props.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        website: form.website,
        lang: locale.value,
        page: route.path,
      }),
    })
    const data = await res.json()
    if (!res.ok || data?.ok !== true) throw new Error(data?.error || `HTTP ${res.status}`)
    state.value = 'sent'
    Object.assign(form, { name: '', email: '', message: '' })
  }
  catch {
    state.value = 'failed' // field values are kept so nothing the visitor typed is lost
  }
}
</script>

<template>
  <div class="card self-start sm:p-8">
    <p v-if="state === 'sent'" role="status" class="rounded-lg bg-accent-soft p-4 text-sm text-accent">{{ $t('contact.sent') }}</p>

    <form v-else novalidate class="grid gap-5" @submit.prevent="submit">
      <div v-for="f in fields" :key="f">
        <label :for="`contact-${f}`" class="text-sm font-medium">{{ $t(`contact.${f}`) }}</label>
        <textarea
          v-if="f === 'message'"
          :id="`contact-${f}`"
          v-model="form[f]"
          rows="6"
          :maxlength="CONTACT_LIMITS[f]"
          :aria-invalid="errors[f] ? 'true' : undefined"
          :aria-describedby="errors[f] ? `contact-${f}-error` : undefined"
          class="mt-2 block w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-base"
        />
        <input
          v-else
          :id="`contact-${f}`"
          v-model="form[f]"
          :type="f === 'email' ? 'email' : 'text'"
          :autocomplete="f"
          :maxlength="CONTACT_LIMITS[f]"
          :aria-invalid="errors[f] ? 'true' : undefined"
          :aria-describedby="errors[f] ? `contact-${f}-error` : undefined"
          class="mt-2 block w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-base"
        >
        <p v-if="errors[f]" :id="`contact-${f}-error`" class="mt-1.5 text-sm text-red-700 dark:text-red-400">{{ $t(`contact.errors.${errors[f]}`) }}</p>
      </div>

      <!-- Honeypot: hidden from people, tempting to bots. -->
      <div class="absolute -left-[9999px]" aria-hidden="true">
        <label for="contact-website">{{ $t('contact.website') }}</label>
        <input id="contact-website" v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off">
      </div>

      <p v-if="state === 'failed'" role="alert" class="rounded-lg border border-red-700/40 p-3 text-sm text-red-700 dark:text-red-400">
        {{ $t('contact.failed') }} <a :href="`mailto:${profile.links.email}`" class="underline">{{ profile.links.email }}</a>.
      </p>

      <button type="submit" class="btn btn-primary justify-self-start disabled:opacity-60" :disabled="state === 'sending'">
        {{ state === 'sending' ? $t('contact.sending') : $t('contact.send') }}
      </button>
    </form>
  </div>
</template>
