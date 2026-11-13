/** Sets title, description and Open Graph tags for a page. Accepts getters so they follow the locale. */
export function usePageSeo(title: () => string, description: () => string) {
  const full = () => `${title()} — Huy Nguyen`
  useSeoMeta({ title: full, description, ogTitle: full, ogDescription: description, ogType: 'website' })
}
