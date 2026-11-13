import { describe, expect, it } from 'vitest'
import en from '../i18n/locales/en.json'
import vi from '../i18n/locales/vi.json'

function flatten(o: Record<string, unknown>, prefix = ''): Record<string, string> {
  return Object.entries(o).reduce((acc, [k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object') Object.assign(acc, flatten(v as Record<string, unknown>, key))
    else acc[key] = String(v)
    return acc
  }, {} as Record<string, string>)
}

describe('locale files', () => {
  const e = flatten(en), v = flatten(vi)
  it('have the same keys', () => {
    expect(Object.keys(v).sort()).toEqual(Object.keys(e).sort())
  })
  it('have no empty strings', () => {
    for (const [k, s] of [...Object.entries(e), ...Object.entries(v)]) expect(s.trim(), k).not.toBe('')
  })
})
