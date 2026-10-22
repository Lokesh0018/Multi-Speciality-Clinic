import { ArrowRight } from 'lucide-react'
import { specialities } from '../content/clinic'
import { linkProps, whatsappHref } from '../lib/links'
import { MediaFrame, SectionHeading } from './ui/primitives'

export default function Specialities() {
  return (
    <section id="specialities" aria-labelledby="specialities-title" className="bg-paper-50 py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Specialities"
            title={<span id="specialities-title">Three areas of care, each given its full attention.</span>}
          />
          <p data-reveal className="lede max-w-sm lg:pb-2">
            Choose a speciality to learn more, or simply tell us your concern and we will guide you to the right consultation.
          </p>
        </div>

        <div className="mt-20 space-y-24 md:space-y-36">
          {specialities.map((s, i) => {
            const flip = i % 2 === 1
            return (
              <article key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
                  <MediaFrame src={s.image.src} alt={s.image.alt} label={s.image.label} tone={s.tone} className="aspect-[4/5] shadow-lift sm:aspect-[5/4] lg:aspect-[6/5]" />
                </div>
                <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
                  <div data-reveal className="flex items-baseline gap-5">
                    <span className="font-display text-7xl leading-none text-blush-400 md:text-8xl" aria-hidden="true">
                      {s.index}
                    </span>
                    <span className="eyebrow text-crimson-600">{s.kicker}</span>
                  </div>
                  <h3 id={`${s.id}-title`} data-reveal className="display-md mt-6">
                    {s.title}
                  </h3>
                  <p data-reveal className="lede mt-5">
                    {s.summary}
                  </p>
                  <ul data-reveal className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-navy-900/[0.08] bg-navy-900/[0.08] sm:grid-cols-2" aria-label={`${s.title} services`}>
                    {s.services.map((svc, j) => (
                      <li key={j} className="flex items-center gap-3 bg-paper-50 px-4 py-3.5 text-[0.9375rem] text-navy-800">
                        <span className="size-1.5 shrink-0 rounded-full bg-crimson-500" aria-hidden="true" />
                        {svc}
                      </li>
                    ))}
                  </ul>
                  <div data-reveal className="mt-9 flex flex-wrap gap-3">
                    <a {...linkProps(whatsappHref(`Hello, I would like to enquire about ${s.title.toLowerCase()}.`))} className="btn-primary">
                      Enquire about {s.title.split(' ')[0].toLowerCase()} care
                      <ArrowRight className="size-4" aria-hidden="true" />
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
