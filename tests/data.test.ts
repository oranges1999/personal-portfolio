import { describe, expect, it } from 'vitest'
import { projects, getProject } from '~/data/projects'
import { profile } from '~/data/profile'

/** Collect every { en, vi } pair found anywhere inside a value. */
function localizedIn(value: unknown, path = '', out: [string, { en: unknown; vi: unknown }][] = []) {
  if (Array.isArray(value)) value.forEach((v, i) => localizedIn(v, `${path}[${i}]`, out))
  else if (value && typeof value === 'object') {
    const o = value as Record<string, unknown>
    if ('en' in o || 'vi' in o) out.push([path, o as { en: unknown; vi: unknown }])
    else for (const k of Object.keys(o)) localizedIn(o[k], `${path}.${k}`, out)
  }
  return out
}

describe('content data', () => {
  it('has exactly the three projects, with unique slugs', () => {
    expect(projects.map(p => p.slug)).toEqual(['booking-platform', 'language-landing', 'ai-report-agent'])
  })

  it('labels project status truthfully', () => {
    expect(getProject('booking-platform')?.status).toBe('completed')
    expect(getProject('language-landing')?.status).toBe('planned')
    expect(getProject('ai-report-agent')?.status).toBe('planned')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getProject('nope')).toBeUndefined()
  })

  it('has a non-empty en and vi string for every localized value', () => {
    const all = localizedIn({ projects, profile })
    expect(all.length).toBeGreaterThan(50)
    for (const [path, v] of all) {
      expect(typeof v.en === 'string' && v.en.trim().length > 0, `${path}.en`).toBe(true)
      expect(typeof v.vi === 'string' && v.vi.trim().length > 0, `${path}.vi`).toBe(true)
    }
  })

  it('does not leak private details', () => {
    const text = JSON.stringify({ projects, profile })
    expect(text).not.toMatch(/\.pen\b|pen\.dev|\$\s?12\b|outsourcing/i)
  })

  it('only renders optional links that are real URLs', () => {
    for (const p of projects) {
      for (const url of [p.demoUrl, p.repoUrl]) if (url !== undefined) expect(url).toMatch(/^https:\/\//)
    }
    expect(profile.links.email).toBe('nhuhuy1999@gmail.com')
  })
})
