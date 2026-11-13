import type { Localized } from '~/data/types'

/** Returns a function that picks the current-locale string from a { en, vi } value. */
export function useL() {
  const { locale } = useI18n()
  return (v: Localized) => v[locale.value as keyof Localized] ?? v.en
}
