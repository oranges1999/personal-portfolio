// Keep these limits in sync with google-apps-script/contact-form.gs
export const CONTACT_LIMITS = { name: 100, email: 200, message: 4000 } as const

export type ContactInput = { name: string; email: string; message: string; /** honeypot */ website: string }
export type ContactError = 'required' | 'invalid' | 'tooLong'
export type ContactErrors = Partial<Record<'name' | 'email' | 'message', ContactError>>

const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {}
  for (const field of ['name', 'email', 'message'] as const) {
    const value = input[field].trim()
    if (!value) errors[field] = 'required'
    else if (value.length > CONTACT_LIMITS[field]) errors[field] = 'tooLong'
    else if (field === 'email' && !EMAIL.test(value)) errors[field] = 'invalid'
  }
  return errors
}
