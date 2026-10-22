import { clinic } from '../content/clinic'

const FALLBACK = '#contact'

export const DEFAULT_MESSAGE = `Hello ${clinic.name}, I would like to enquire about an appointment.`

/** wa.me link; falls back to the contact section until a number is configured. */
export function whatsappHref(message = DEFAULT_MESSAGE, number = clinic.contact.whatsapp) {
  if (!number) return FALLBACK
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function telHref(number = clinic.contact.phone) {
  return number ? `tel:${number}` : FALLBACK
}

export function mapHref(branch) {
  if (branch.mapUrl) return branch.mapUrl
  const q = `${clinic.name} ${branch.name} ${branch.city}`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
}

/** External links open in a new tab; in-page fallbacks don't. */
export function linkProps(href) {
  return href.startsWith('http') ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href }
}
