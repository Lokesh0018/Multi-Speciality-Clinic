import { ArrowUpRight, BadgeCheck, GraduationCap } from 'lucide-react'
import { doctors } from '../content/clinic'
import { linkProps, whatsappHref } from '../lib/links'
import { MediaFrame, SectionHeading } from './ui/primitives'

export default function Doctors() {
  return (
    <section id="doctors" aria-labelledby="doctors-title" className="relative isolate overflow-hidden bg-paper-100 py-24 md:py-36">
      {/* soft brand wash, echoing the About section */}
      <div aria-hidden="true" className="absolute -left-48 top-1/3 -z-10 size-[40rem] rounded-full bg-[radial-gradient(circle,rgb(214_40_53/0.07),transparent_65%)]" />

      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Our doctors" title={<span id="doctors-title">The specialists behind your care.</span>} />
          <p data-reveal className="lede max-w-sm lg:pb-2">
            Meet the doctors who lead each speciality. Profiles list only qualifications and registrations verified by the clinic.
          </p>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {doctors.map((d, i) => (
            <li
              key={i}
              data-reveal
              className="card group relative flex flex-col overflow-hidden p-2.5 transition-[box-shadow,border-color,translate] duration-500 ease-[var(--ease-cinematic)] hover:-translate-y-1 hover:border-crimson-300/50 hover:shadow-lift motion-reduce:hover:translate-y-0"
            >
              {/* Portrait: slow zoom on hover (transform only, clipped by the frame) */}
              <div className="relative [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-[var(--ease-cinematic)] group-hover:[&_img]:scale-[1.04] motion-reduce:group-hover:[&_img]:scale-100">
                <MediaFrame
                  src={d.image.src}
                  alt={d.image.alt}
                  label="Portrait · 4:5"
                  tone={['crimson', 'blush', 'paper'][i % 3]}
                  rounded="rounded-[1.4rem]"
                  className="aspect-[4/5]"
                />
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 rounded-b-[1.4rem] bg-gradient-to-t from-navy-950/70 to-transparent" />

                {/* Stock portraits must never be mistaken for the clinic's doctors */}
                {d.image.sample && (
                  <span className="absolute left-3 top-3 rounded-full bg-paper-50/90 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-navy-800 backdrop-blur-sm">
                    Sample photo
                  </span>
                )}
                <span aria-hidden="true" className="absolute right-4 top-3 font-display text-3xl leading-none text-paper-50/90 [text-shadow:0_2px_12px_rgb(15_29_63/0.4)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="absolute bottom-4 left-4 rounded-full bg-paper-50 px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-crimson-600 shadow-soft">
                  {d.speciality}
                </p>
              </div>

              <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
                <h3 className="font-display text-[1.85rem] leading-tight text-navy-900 transition-colors duration-300 group-hover:text-crimson-600">{d.name}</h3>
                <p className="mt-2 flex items-start gap-2 text-[0.9375rem] font-medium text-navy-700">
                  <GraduationCap className="mt-0.5 size-4 shrink-0 text-crimson-500" aria-hidden="true" />
                  {d.qualifications}
                </p>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">{d.bio}</p>

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
                    className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-crimson-100 text-crimson-600 ring-1 ring-crimson-200/80 transition-colors duration-300 hover:bg-crimson-500 hover:text-paper-50 hover:ring-crimson-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-500 group-hover:bg-crimson-500 group-hover:text-paper-50 group-hover:ring-crimson-500"
                  >
                    <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
