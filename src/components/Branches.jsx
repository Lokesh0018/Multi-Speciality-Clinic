import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import { branches, clinic } from '../content/clinic'
import { linkProps, mapHref, telHref, whatsappHref } from '../lib/links'
import { MediaFrame, SectionHeading, WhatsAppIcon } from './ui/primitives'

export default function Branches() {
  return (
    <section id="branches" aria-labelledby="branches-title" className="bg-paper-200/60 py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Branches" title={<span id="branches-title">Two addresses in Visakhapatnam.</span>} />
          <p data-reveal className="lede max-w-sm lg:pb-2">
            Visit whichever branch is closest. Please confirm doctor availability at your chosen branch when you enquire.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {branches.map((b, i) => {
            const wa = whatsappHref(`Hello, I would like to book an appointment at the ${b.name} branch.`, b.whatsapp || clinic.contact.whatsapp)
            return (
              <article key={b.id} data-reveal aria-labelledby={`${b.id}-title`} className="card flex flex-col overflow-hidden p-3">
                <MediaFrame src={b.image.src} alt={b.image.alt} label={b.image.label} tone={i ? 'blush' : 'crimson'} rounded="rounded-[1.35rem]" className="aspect-[16/10]" />
                <div className="flex flex-1 flex-col p-5 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-600">Branch 0{i + 1}</p>
                      <h3 id={`${b.id}-title`} className="mt-2 font-display text-4xl leading-none md:text-5xl">
                        {b.name}
                      </h3>
                      <p className="mt-2 text-muted">{b.city}</p>
                    </div>
                  </div>

                  <dl className="mt-8 grid gap-6 border-t border-navy-900/[0.08] pt-7 sm:grid-cols-2">
                    <div className="flex gap-3">
                      <MapPin className="mt-0.5 size-5 shrink-0 text-crimson-600" aria-hidden="true" />
                      <div>
                        <dt className="text-sm font-semibold">Address</dt>
                        <dd className="mt-1 whitespace-pre-line text-[0.9375rem] text-muted">{b.address}</dd>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Clock className="mt-0.5 size-5 shrink-0 text-crimson-600" aria-hidden="true" />
                      <div>
                        <dt className="text-sm font-semibold">Hours</dt>
                        {b.hours.map((h, k) => (
                          <dd key={k} className="mt-1 text-[0.9375rem] text-muted">
                            {h.days}: {h.time}
                          </dd>
                        ))}
                      </div>
                    </div>
                  </dl>

                  <div className="mt-auto grid gap-3 pt-8 sm:grid-cols-3">
                    <a {...linkProps(wa)} className="btn-primary px-4">
                      <WhatsAppIcon className="size-4" /> WhatsApp
                    </a>
                    <a {...linkProps(telHref(b.phone || clinic.contact.phone))} className="btn-outline px-4" aria-label={`Call ${b.name} branch, ${b.phoneDisplay}`}>
                      <Phone className="size-4" aria-hidden="true" /> Call
                    </a>
                    <a {...linkProps(mapHref(b))} className="btn-outline px-4" aria-label={`Directions to ${b.name} branch (opens Google Maps)`}>
                      <Navigation className="size-4" aria-hidden="true" /> Directions
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
