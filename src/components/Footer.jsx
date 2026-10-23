import { Mail, Phone } from 'lucide-react'
import { branches, clinic, nav, specialities } from '../content/clinic'
import { linkProps, telHref, whatsappHref } from '../lib/links'
import { Wordmark } from './Header'
import { WhatsAppIcon } from './ui/primitives'

/**
 * Heart-rate trace across the footer: six beats over a 1440-wide strip. Each
 * beat is a flat baseline broken by a sharp, straight-edged QRS spike: a small
 * Q dip, a tall R peak, a deep S trough, then back to baseline.
 */
const BEATS = (() => {
  let d = 'M0 60'
  for (let x0 = 0; x0 < 1440; x0 += 240) {
    d += ` L${x0 + 96} 60 L${x0 + 102} 68 L${x0 + 110} 12 L${x0 + 118} 86 L${x0 + 125} 60 L${x0 + 240} 60`
  }
  return d
})()

/**
 * Footer background: faint ECG graph paper plus a heart-rate line. The trace
 * is drawn faintly in full; a bright glowing pulse sweeps along it like a
 * monitor. Reduced motion keeps only the static trace.
 */
function HeartbeatBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* ECG paper */}
      <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgb(214_40_53/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(214_40_53/0.06)_1px,transparent_1px),linear-gradient(rgb(214_40_53/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(214_40_53/0.035)_1px,transparent_1px)] [background-size:80px_80px,80px_80px,16px_16px,16px_16px] [mask-image:radial-gradient(70%_70%_at_50%_55%,#000,transparent)]" />
      {/* trace */}
      <svg viewBox="0 0 1440 120" preserveAspectRatio="xMidYMid slice" className="absolute inset-x-0 top-[46%] h-32 w-full -translate-y-1/2 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] md:h-40">
        <path d={BEATS} fill="none" stroke="var(--color-crimson-500)" strokeOpacity="0.14" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <path
          d={BEATS}
          pathLength="1000"
          fill="none"
          stroke="var(--color-crimson-500)"
          strokeOpacity="0.75"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray="110 890"
          className="hidden drop-shadow-[0_0_6px_rgb(214_40_53/0.8)] motion-safe:inline motion-safe:animate-[ecg-sweep_6s_linear_infinite]"
        />
      </svg>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden pb-28 pt-20 md:pb-12">
      <HeartbeatBackdrop />
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
