import { BadgeCheck } from 'lucide-react'
import { doctors } from '../content/clinic'
import { MediaFrame, SectionHeading } from './ui/primitives'

export default function Doctors() {
  return (
    <section id="doctors" aria-labelledby="doctors-title" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Our doctors"
          title={<span id="doctors-title">The specialists behind your care.</span>}
          intro="Meet the doctors who lead each speciality. Profiles list only qualifications and registrations verified by the clinic."
        />

        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {doctors.map((d, i) => (
            <li key={i} data-reveal className="card group flex flex-col overflow-hidden p-3">
              <div className="relative">
                <MediaFrame
                  src={d.image.src}
                  alt={d.image.alt}
                  label="Portrait · 4:5"
                  tone={['crimson', 'blush', 'paper'][i % 3]}
                  rounded="rounded-[1.35rem]"
                  className="aspect-[4/5]"
                />
                {/* Stock portraits must never be mistaken for the clinic's doctors */}
                {d.image.sample && (
                  <span className="absolute left-3 top-3 rounded-full bg-paper-50/90 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-navy-800 backdrop-blur-sm">
                    Sample photo
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col px-4 pb-5 pt-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-600">{d.speciality}</p>
                <h3 className="mt-2 font-display text-[2rem] leading-tight">{d.name}</h3>
                <p className="mt-1 text-[0.9375rem] font-medium text-navy-700">{d.qualifications}</p>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">{d.bio}</p>
                <div className="hairline mt-6" />
                <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                  <BadgeCheck className="size-4 shrink-0 text-crimson-600" aria-hidden="true" />
                  <span>
                    <span className="sr-only">Registration: </span>
                    {d.registration}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
