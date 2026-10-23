import { ArrowRight, ArrowUpRight, BadgeCheck, GraduationCap, Phone } from 'lucide-react'
import { clinic, doctors } from '../content/clinic'
import { linkProps, telHref, whatsappHref } from '../lib/links'
import { MediaFrame, SectionHeading, WhatsAppIcon } from './ui/primitives'

/** Scalloped seal edge: a 36-point rosette, built once. */
const SEAL_EDGE = (() => {
  const n = 72
  let d = ''
  for (let k = 0; k < n; k++) {
    const r = k % 2 ? 54.5 : 59
    const t = (k / n) * Math.PI * 2 - Math.PI / 2
    d += `${k ? 'L' : 'M'}${(60 + r * Math.cos(t)).toFixed(2)} ${(60 + r * Math.sin(t)).toFixed(2)}`
  }
  return d + 'Z'
})()

/**
 * Founder's seal, straddling the card's top-left corner. A crimson rosette
 * with white lettering turns slowly around a still centre that carries the
 * clinic mark. Tilted at rest; it straightens when the card is hovered and
 * stops turning. No rotation for reduced motion.
 */
function FounderStamp() {
  const ring = 'FOUNDER • CHIEF CONSULTANT • DR. KIMIDI • '
  return (
    <div
      role="img"
      aria-label="Founder and Chief Consultant"
      className="pointer-events-none absolute -left-3 -top-3 z-20 size-[6.25rem] -rotate-12 drop-shadow-[0_14px_18px_rgb(120_10_20/0.35)] transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:rotate-0 group-hover:scale-105 motion-reduce:transition-none md:-left-7 md:-top-7 md:size-[7.5rem]"
    >
      {/* turning layer: rosette edge, bands and lettering */}
      <svg viewBox="0 0 120 120" aria-hidden="true" className="absolute inset-0 h-full w-full motion-safe:animate-[stamp-spin_22s_linear_infinite] group-hover:[animation-play-state:paused]">
        <defs>
          <linearGradient id="seal-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-crimson-400)" />
            <stop offset="0.55" stopColor="var(--color-crimson-500)" />
            <stop offset="1" stopColor="var(--color-crimson-600)" />
          </linearGradient>
          <path id="seal-ring" d="M60 60 m-40.5 0 a40.5 40.5 0 1 1 81 0 a40.5 40.5 0 1 1 -81 0" />
        </defs>
        <path d={SEAL_EDGE} fill="url(#seal-fill)" />
        <circle cx="60" cy="60" r="51.5" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="0.8" />
        <circle cx="60" cy="60" r="49" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="0.6" strokeDasharray="1.2 2.2" />
        <circle cx="60" cy="60" r="36.5" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="0.8" />
        <text fill="#fff" fontSize="8.4" fontWeight="800" letterSpacing="1.6" fontFamily="var(--font-sans)">
          <textPath href="#seal-ring" textLength="252" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </svg>

      {/* still centre: clinic mark on a white medallion */}
      <div aria-hidden="true" className="absolute inset-[30%] grid place-items-center rounded-full bg-paper-50 shadow-[inset_0_0_0_1.5px_var(--color-crimson-500),inset_0_0_0_3.5px_#fff,inset_0_0_0_4.5px_rgb(178_13_24/0.35),0_2px_6px_rgb(0_0_0/0.25)]">
        <img src={clinic.media.logo} alt="" className="h-[64%] w-[64%] object-contain" />
      </div>

      {/* soft gloss across the top-left, like light on embossed foil */}
      <div aria-hidden="true" className="absolute inset-[4%] rounded-full bg-[radial-gradient(60%_50%_at_30%_22%,rgb(255_255_255/0.35),transparent_60%)]" />
    </div>
  )
}

export default function Doctors() {
  return (
    <section id="doctors" aria-labelledby="doctors-title" className="relative isolate overflow-hidden bg-paper-100 py-24 md:py-36">
      {/* soft brand wash and faint grid, echoing the About section */}
      <div aria-hidden="true" className="absolute -left-48 top-1/3 -z-10 size-[40rem] rounded-full bg-[radial-gradient(circle,rgb(214_40_53/0.07),transparent_65%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(rgb(25_45_90/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(25_45_90/0.05)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(55%_45%_at_50%_15%,#000,transparent)]" />

      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Our doctors"
            title={
              <span id="doctors-title">
                The specialists behind <em className="text-crimson-600">your care.</em>
              </span>
            }
          />
          <p data-reveal className="lede max-w-sm lg:pb-2">
            Meet the doctors who lead each speciality. Profiles list only qualifications and registrations verified by the clinic.
          </p>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {doctors.map((d, i) => (
            <li
              key={i}
              data-reveal
              className="card group relative flex flex-col p-2.5 transition-[box-shadow,border-color,translate] duration-500 ease-[var(--ease-cinematic)] hover:-translate-y-1 hover:border-crimson-300/50 hover:shadow-lift focus-within:border-crimson-300/50 focus-within:shadow-lift motion-reduce:hover:translate-y-0"
            >
              {d.role?.startsWith('Founder') && <FounderStamp />}
              {/* Portrait; focusable so keyboard and touch users can open the description */}
              <div
                tabIndex={0}
                aria-label={`About ${d.name}`}
                className="relative cursor-pointer rounded-[1.4rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-500"
              >
                <MediaFrame
                  src={d.image.src}
                  alt={d.image.alt}
                  label="Portrait · 4:5"
                  tone={['crimson', 'blush', 'paper'][i % 3]}
                  rounded="rounded-[1.4rem]"
                  className="aspect-[4/5]"
                  parallax={false}
                />
                <span aria-hidden="true" className="absolute right-3 top-3 grid h-9 min-w-9 place-items-center rounded-full bg-paper-50/95 px-2.5 font-display text-lg leading-none text-navy-900 shadow-soft">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-paper-50/95 py-1.5 pl-2.5 pr-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-crimson-600 shadow-soft">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-crimson-500" />
                  {d.speciality}
                </p>
                {/* Description overlay: fades in over the portrait on hover / focus */}
                <div className="absolute inset-0 flex flex-col justify-end overflow-hidden rounded-[1.4rem] bg-gradient-to-t from-navy-950/95 via-navy-950/80 to-navy-950/25 p-5 text-paper-50 opacity-0 transition-opacity duration-500 ease-[var(--ease-cinematic)] group-hover:opacity-100 group-focus-within:opacity-100 md:p-6">
                  <div className="translate-y-4 transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:translate-y-0 group-focus-within:translate-y-0 motion-reduce:translate-y-0 motion-reduce:transition-none">
                    <span aria-hidden="true" className="mb-4 block h-[3px] w-10 rounded-full bg-crimson-500" />
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-blush-300">About</p>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-paper-50/95">{d.bio}</p>
                  </div>
                </div>
                {/* crimson accent draws along the portrait's foot on hover/focus */}
                <span aria-hidden="true" className="absolute inset-x-6 -bottom-px h-[3px] origin-left scale-x-0 rounded-full bg-crimson-500 transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:scale-x-100 group-focus-within:scale-x-100 motion-reduce:transition-none" />
              </div>

              <div className="flex flex-1 flex-col px-4 pb-3 pt-6">
                <h3 className="font-display text-[1.85rem] leading-tight text-navy-900">
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size,color] duration-500 ease-[var(--ease-cinematic)] group-hover:bg-[length:100%_1px] group-hover:text-crimson-600">
                    {d.name}
                  </span>
                </h3>
                {d.role && (
                  <p className="mt-1 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-crimson-600">
                    {d.role}
                  </p>
                )}
                <p className="mt-2 flex flex-1 items-start gap-2 text-[0.9375rem] font-medium text-navy-700">
                  <GraduationCap className="mt-0.5 size-4 shrink-0 text-crimson-500" aria-hidden="true" />
                  {d.qualifications}
                </p>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-navy-900/[0.08] pt-4">
                  <p className="flex min-w-0 items-center gap-2 text-sm text-muted">
                    <BadgeCheck className="size-4 shrink-0 text-crimson-600" aria-hidden="true" />
                    <span className="truncate">
                      <span className="sr-only">Registration: </span>
                      {d.registration}
                    </span>
                  </p>
                  <a
                    {...linkProps(whatsappHref(`Hello, I would like to book a consultation with ${d.name} (${d.speciality}).`))}
                    aria-label={`Book a consultation with ${d.name}`}
                    className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-crimson-100 pl-4 pr-3 text-sm font-semibold text-crimson-600 ring-1 ring-crimson-200/80 transition-colors duration-300 hover:bg-crimson-500 hover:text-paper-50 hover:ring-crimson-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-500 group-hover:bg-crimson-500 group-hover:text-paper-50 group-hover:ring-crimson-500"
                  >
                    Book
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Help band for visitors who don't know which doctor to see */}
        <div data-reveal className="relative isolate mt-12 flex flex-col gap-6 overflow-hidden rounded-[2rem] bg-navy-900 px-7 py-8 text-paper-50 md:flex-row md:items-center md:justify-between md:px-10 lg:mt-16">
          <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-[radial-gradient(circle,rgb(214_60_70/0.3),transparent_65%)]" />
          <div className="grain absolute inset-0 -z-10" />
          <div>
            <p className="font-display text-[1.75rem] leading-tight md:text-3xl">Not sure who to see?</p>
            <p className="mt-2 max-w-md text-paper-200/80">Tell us your concern and we will guide you to the right doctor and branch.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a {...linkProps(whatsappHref())} className="btn-primary">
              <WhatsAppIcon className="size-4" /> Ask on WhatsApp
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a href={telHref()} className="btn-ghost-light">
              <Phone className="size-4" aria-hidden="true" /> Call the clinic
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
