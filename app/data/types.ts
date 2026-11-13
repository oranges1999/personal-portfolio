export type Localized = { en: string; vi: string }
export type ProjectStatus = 'completed' | 'in-progress' | 'planned'

export interface Project {
  slug: string
  title: Localized
  summary: Localized
  status: ProjectStatus
  stack: string[]
  problem: Localized
  roles?: { name: Localized; can: Localized }[]
  features: { title: Localized; items: Localized[] }[]
  highlights: Localized[]
  /** Paths under /public, e.g. "projects/booking/calendar.png". Omit until real screenshots exist. */
  screenshots?: { src: string; alt: Localized }[]
  demoUrl?: string
  repoUrl?: string
}

export interface Profile {
  name: string
  title: Localized
  intro: Localized
  services: { id: string; title: Localized; body: Localized; points: Localized[]; tools: string[] }[]
  process: { title: Localized; body: Localized }[]
  stack: { group: Localized; items: string[] }[]
  about: Localized[]
  facts: { label: Localized; value: Localized }[]
  links: { upwork: string; github: string; email: string }
}
