import { ArrowUpRight, Clock, MapPin, Navigation, Phone } from 'lucide-react'
import { branches, clinic } from '../content/clinic'
import { linkProps, mapHref, telHref, whatsappHref } from '../lib/links'
import { MediaFrame, SectionHeading, WhatsAppIcon } from './ui/primitives'

/** ECG trace echoing the heartbeat line in the logo's cross. */
const ECG = 'M0 10 H40 L46 10 L50 3 L55 17 L60 6 L64 10 H120'

export default function Branches() {
  return (
    <section id="branches" aria-labelledby="branches-title" className="relative isolate overflow-hidden bg-paper-200/60 py-24 md:py-32">
      {/* soft brand washes and faint grid, matching the other light sections */}
      <div aria-hidden="true" className="absolute -right-48 -top-40 -z-10 size-[42rem] rounded-full bg-[radial-gradient(circle,rgb(59_91_163/0.12),transparent_65%)]" />
      <div aria-hidden="true" className="absolute -bottom-56 -left-40 -z-10 size-[38rem] rounded-full bg-[radial-gradient(circle,rgb(214_40_53/0.07),transparent_65%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(rgb(25_45_90/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(25_45_90/0.05)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(55%_45%_at_50%_20%,#000,transparent)]" />

      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <SectionHeading
              eyebrow="Branches"
              title={
                <span id="branches-title">
                  Two addresses in <em className="text-crimson-600">Visakhapatnam.</em>
                </span>
              }
            />
            <svg viewBox="0 0 120 20" className="mt-5 h-5 w-28 overflow-visible" aria-hidden="true">
              <path d={ECG} fill="none" stroke="var(--color-crimson-400)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p data-reveal className="lede max-w-sm lg:pb-2">
            Visit whichever branch is closest. Please confirm doctor availability at your chosen branch when you enquire.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:mt-16 lg:grid-cols-2 lg:gap-8">
          {branches.map((b, i) => {
            const wa = whatsappHref(`Hello, I would like to book an appointment at the ${b.name} branch.`, b.whatsapp || clinic.contact.whatsapp)
            return (
              <article
                key={b.id}
                id={b.id}
                data-reveal
                aria-labelledby={`${b.id}-title`}
                className="card group scroll-mt-28 flex flex-col overflow-hidden p-3 transition-[box-shadow,border-color,translate] duration-500 ease-[var(--ease-cinematic)] hover:-translate-y-1 hover:border-crimson-300/50 hover:shadow-lift focus-within:shadow-lift motion-reduce:hover:translate-y-0"
              >
                {/* Photo with the branch name laid over it */}
                <div className="relative">
                  <MediaFrame
                    src={b.image.src}
                    alt={b.image.alt}
                    label={b.image.label}
                    tone={i ? 'blush' : 'crimson'}
                    rounded="rounded-[1.35rem]"
                    className="aspect-[16/10] [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-[var(--ease-cinematic)] group-hover:[&_img]:scale-[1.05] motion-reduce:[&_img]:transition-none"
                  />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.35rem] bg-gradient-to-t from-navy-950/85 via-navy-950/20 via-55% to-transparent" />

                  {/* numbered pin */}
                  <span aria-hidden="true" className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-paper-50/95 py-1.5 pl-1.5 pr-3.5 shadow-soft backdrop-blur-sm">
                    <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-crimson-400 to-crimson-600 text-paper-50">
                      <MapPin className="size-3.5" />
                    </span>
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-navy-900">Branch 0{i + 1}</span>
                  </span>

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-paper-50 md:p-7">
                    <div>
                      <h3 id={`${b.id}-title`} className="font-display text-4xl leading-none md:text-5xl">
                        {b.name}
                      </h3>
                      <p className="mt-2 flex items-center gap-2 text-sm font-medium text-paper-50/85">
                        <span aria-hidden="true" className="h-px w-6 bg-crimson-400" />
                        {b.city}
                      </p>
                    </div>
                    <a
                      {...linkProps(mapHref(b))}
                      aria-label={`Open ${b.name} branch in Google Maps`}
                      className="grid size-12 shrink-0 cursor-pointer place-items-center rounded-full border border-paper-50/40 bg-paper-50/10 text-paper-50 backdrop-blur-md transition-colors duration-300 hover:bg-paper-50 hover:text-crimson-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper-50"
                    >
                      <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-2 pb-2 pt-5 md:px-4 md:pt-6">
                  {/* Address & hours as icon tiles */}
                  <dl className="grid gap-3 sm:grid-cols-2">
                    <div className="flex gap-3.5 rounded-2xl border border-navy-900/[0.07] bg-paper-100/70 p-4">
                      <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-xl bg-crimson-100 text-crimson-600 ring-1 ring-crimson-200/70 transition-colors duration-300 group-hover:bg-crimson-500 group-hover:text-paper-50">
                        <MapPin className="size-[18px]" />
                      </span>
                      <div className="min-w-0">
                        <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy-900">Address</dt>
                        <dd className="mt-1.5 whitespace-pre-line text-[0.9375rem] leading-relaxed text-muted">{b.address}</dd>
                      </div>
                    </div>
                    <div className="flex gap-3.5 rounded-2xl border border-navy-900/[0.07] bg-paper-100/70 p-4">
                      <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-xl bg-crimson-100 text-crimson-600 ring-1 ring-crimson-200/70 transition-colors duration-300 group-hover:bg-crimson-500 group-hover:text-paper-50">
                        <Clock className="size-[18px]" />
                      </span>
                      <div className="min-w-0">
                        <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy-900">Hours</dt>
                        {b.hours.map((h, k) => (
                          <dd key={k} className="mt-1.5 flex flex-wrap justify-between gap-x-3 text-[0.9375rem] text-muted">
                            <span className="font-medium text-navy-800">{h.days}</span>
                            <span>{h.time}</span>
                          </dd>
                        ))}
                      </div>
                    </div>
                  </dl>

                  {/* Actions: WhatsApp leads, call and directions as a pair */}
                  <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
                    <a {...linkProps(wa)} className="btn-primary col-span-2 px-4">
                      <WhatsAppIcon className="size-4" /> Book at {b.name} on WhatsApp
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
