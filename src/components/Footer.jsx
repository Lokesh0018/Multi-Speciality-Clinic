import { Mail, Phone } from 'lucide-react'
import { branches, clinic, nav, specialities } from '../content/clinic'
import { linkProps, telHref, whatsappHref } from '../lib/links'
import { Wordmark } from './Header'
import { WhatsAppIcon } from './ui/primitives'

export default function Footer() {
  return (
    <footer className="pb-28 pt-20 md:pb-12">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark />
            <p className="mt-6 max-w-xs text-muted">{clinic.specialities} care in {clinic.city}.</p>
            <div className="mt-6 flex gap-2">
              <a {...linkProps(whatsappHref())} aria-label="WhatsApp" className="grid size-11 cursor-pointer place-items-center rounded-full border border-navy-900/15 transition-colors hover:bg-navy-900 hover:text-paper-50">
                <WhatsAppIcon className="size-4" />
              </a>
              <a {...linkProps(telHref())} aria-label="Call the clinic" className="grid size-11 cursor-pointer place-items-center rounded-full border border-navy-900/15 transition-colors hover:bg-navy-900 hover:text-paper-50">
                <Phone className="size-4" aria-hidden="true" />
              </a>
              {clinic.contact.email && (
                <a href={`mailto:${clinic.contact.email}`} aria-label={`Email ${clinic.contact.email}`} className="grid size-11 cursor-pointer place-items-center rounded-full border border-navy-900/15 transition-colors hover:bg-navy-900 hover:text-paper-50">
                  <Mail className="size-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
          <FooterCol title="Explore" items={nav.map((n) => ({ label: n.label, href: n.href }))} className="lg:col-span-2" />
          <FooterCol title="Specialities" items={specialities.map((s) => ({ label: s.title, href: `#${s.id}` }))} className="lg:col-span-2" />
          <div className="lg:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-600">Branches</h2>
            <ul className="mt-5 grid gap-6 sm:grid-cols-2">
              {branches.map((b) => (
                <li key={b.id}>
                  <p className="font-display text-xl">{b.name}</p>
                  <p className="mt-1 whitespace-pre-line text-sm text-muted">{b.address}</p>
                  <p className="mt-1 text-sm text-muted">{b.phoneDisplay}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline mt-16" />
        <div className="mt-8 flex flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {clinic.name}. All rights reserved.</p>
          <p className="max-w-xl md:text-right">
            Information on this website is general in nature and is not a substitute for a consultation with a qualified doctor.
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, items, className }) {
  return (
    <nav aria-label={title} className={className}>
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-600">{title}</h2>
      <ul className="mt-5 space-y-1">
        {items.map((i) => (
          <li key={i.href}>
            <a href={i.href} className="inline-flex min-h-10 cursor-pointer items-center text-navy-800 transition-colors hover:text-crimson-600">
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
