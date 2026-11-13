import { describe, expect, it } from 'vitest'
import { CONTACT_LIMITS, validateContact } from '~/utils/contact'

const ok = { name: 'Ada', email: 'ada@example.com', message: 'Hello there', website: '' }

describe('validateContact', () => {
  it('accepts valid input', () => {
    expect(validateContact(ok)).toEqual({})
  })
  it('requires every field, treating whitespace as empty', () => {
    expect(validateContact({ name: '', email: '  ', message: '\n\t', website: '' }))
      .toEqual({ name: 'required', email: 'required', message: 'required' })
  })
  it.each(['a@b', 'no-at', 'a b@c.com', '@x.com', 'a@.com'])('rejects email %s', (email) => {
    expect(validateContact({ ...ok, email })).toEqual({ email: 'invalid' })
  })
  it.each(['x@y.co', ' padded@mail.example.org '])('accepts email %s', (email) => {
    expect(validateContact({ ...ok, email })).toEqual({})
  })
  it('rejects over-long fields', () => {
    expect(validateContact({
      name: 'n'.repeat(CONTACT_LIMITS.name + 1),
      email: `${'e'.repeat(CONTACT_LIMITS.email)}@x.co`,
      message: 'm'.repeat(CONTACT_LIMITS.message + 1),
      website: '',
    })).toEqual({ name: 'tooLong', email: 'tooLong', message: 'tooLong' })
  })
  it('accepts fields exactly at the limit', () => {
    expect(validateContact({ ...ok, name: 'n'.repeat(CONTACT_LIMITS.name), message: 'm'.repeat(CONTACT_LIMITS.message) })).toEqual({})
  })
})
