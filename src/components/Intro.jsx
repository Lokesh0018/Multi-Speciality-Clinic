import { ArrowRight, Building2, MapPin, Stethoscope } from 'lucide-react'
import { about, clinic } from '../content/clinic'
import { linkProps, whatsappHref } from '../lib/links'
import { MediaFrame, WhatsAppIcon } from './ui/primitives'
import TrustMarquee from './TrustMarquee'

/** Factual pillars only — no claims the clinic hasn't verified. */
const pillars = [
  { icon: Stethoscope, title: 'Consultation-led', body: 'Every visit begins with an unhurried conversation.' },
  { icon: Building2, title: 'Three specialities', body: 'Skin, hair and dental care under one roof.' },
  { icon: MapPin, title: 'Two branches', body: 'PM Palem and MVP Colony, Visakhapatnam.' },
]

/** ECG trace echoing the heartbeat line in the logo's cross. */
const ECG = 'M0 10 H40 L46 10 L50 3 L55 17 L60 6 L64 10 H120'

export default function Intro() {
  return (
    <>
      <TrustMarquee />

      {/* Editorial introduction */}
      <section id="about" className="relative isolate overflow-hidden bg-paper-100 py-20 md:py-24 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-[5.5rem] lg:pb-10">
        {/* soft brand wash top-right, faint grid for an editorial feel */}
        <div aria-hidden="true" className="absolute -right-40 -top-40 -z-10 size-[42rem] rounded-full bg-[radial-gradient(circle,rgb(59_91_163/0.14),transparent_65%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(rgb(25_45_90/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(25_45_90/0.05)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(60%_60%_at_50%_40%,#000,transparent)]" />

        <div className="container-x grid w-full items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Photography composition */}
          <div className="relative lg:col-span-6 lg:mx-auto lg:w-[min(100%,50svh)]">
            {/* offset navy frame behind the main image */}
            <div aria-hidden="true" className="absolute -left-4 -top-4 h-[60%] w-[70%] rounded-[2rem] border border-navy-900/10 bg-navy-900/[0.04] md:-left-6 md:-top-6" />
            <MediaFrame
              src={clinic.media.intro.main}
              label="Dr. Kimidi Multispeciality Clinic"
              alt="Dr. Kimidi Multispeciality Clinic interior and consultation room"
              tone="paper"
              className="aspect-[4/5] shadow-lift ring-1 ring-navy-900/[0.06]"
            />
            {/* floating detail image — positioned via a wrapper, since MediaFrame's root is `relative` */}
            <div className="absolute -bottom-6 -right-4 hidden w-[38%] md:block lg:-right-10">
              <MediaFrame
                src={clinic.media.intro.detail}
                label="Clinic care"
                alt="Patient consultation and specialized care at Dr. Kimidi Multispeciality Clinic"
                tone="crimson"
                className="aspect-square border-[6px] border-paper-100 shadow-lift"
                rounded="rounded-[1.5rem]"
              />
            </div>
            {/* floating fact card */}
            <div data-reveal className="absolute -left-3 bottom-10 flex items-center gap-4 rounded-2xl border border-paper-50/70 bg-paper-50/90 px-5 py-4 shadow-lift backdrop-blur-md md:-left-8">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-crimson-400 to-crimson-600 text-paper-50 shadow-[0_8px_18px_-8px_rgb(178_13_24/0.8)]">
                <Stethoscope className="size-5" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-2xl font-semibold text-navy-900">Skin · Hair · Dental</span>
                <span className="mt-0.5 block text-sm text-muted">One clinic, three specialities</span>
              </span>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6">
            <div data-reveal>
              <p className="eyebrow text-crimson-600">{about.eyebrow}</p>
              <svg viewBox="0 0 120 20" className="mt-3 h-5 w-32 overflow-visible" aria-hidden="true">
                <path d={ECG} fill="none" stroke="var(--color-crimson-400)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h2 className="display-md mt-4 text-balance text-navy-900 lg:text-[clamp(2rem,3vw,2.75rem)]">
                {about.headline} <em className="text-crimson-600">{about.headlineAccent}</em>
              </h2>
            </div>

            <div data-reveal className="mt-5 max-w-xl space-y-4">
              <p className="lede lg:text-[1.02rem] lg:leading-relaxed">
                {about.lede}
              </p>
              <p className="border-l-2 border-crimson-400 pl-5 text-base leading-relaxed text-muted">
                {about.story}
              </p>
            </div>

            {/* Pillars */}
            <ul data-reveal className="mt-6 grid gap-3 sm:grid-cols-3">
              {pillars.map(({ icon: Icon, title, body }) => (
                <li key={title} className="group rounded-2xl border border-navy-900/[0.07] bg-paper-50 p-4 shadow-soft transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-cinematic)] hover:-translate-y-0.5 hover:border-crimson-300/60 hover:shadow-lift">
                  <span className="grid size-9 place-items-center rounded-xl bg-crimson-100 text-crimson-600 ring-1 ring-crimson-200/70 transition-colors duration-300 group-hover:bg-crimson-500 group-hover:text-paper-50">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 font-sans text-[0.92rem] font-bold text-navy-900">{title}</h3>
                  <p className="mt-1 text-[0.82rem] leading-snug text-muted">{body}</p>
                </li>
              ))}
            </ul>

            {/* Quote */}
            <blockquote data-reveal className="relative mt-6 max-w-xl pl-8">
              <span aria-hidden="true" className="absolute -left-1 -top-3 font-display text-6xl leading-none text-blush-400/70">“</span>
              <p className="font-display text-xl italic leading-snug text-navy-800 lg:text-[1.35rem]">{about.quote.text}</p>
              <footer className="mt-3 flex items-center gap-3 font-sans text-sm font-semibold tracking-wide text-crimson-600">
                <span aria-hidden="true" className="h-px w-8 bg-crimson-400" />— {about.quote.author}, {about.quote.title}
              </footer>
            </blockquote>

            {/* CTAs */}
            <div data-reveal className="mt-6 flex flex-wrap items-center gap-3">
              <a {...linkProps(whatsappHref())} className="btn-primary">
                <WhatsAppIcon className="size-4" /> Book an appointment
              </a>
              <a href="#doctors" className="btn-outline">
                Meet our doctors <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
