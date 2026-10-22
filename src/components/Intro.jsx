import { clinic, trustPoints } from '../content/clinic'
import { MediaFrame } from './ui/primitives'

export default function Intro() {
  return (
    <>
      {/* Trust strip */}
      <section aria-label="At a glance" className="border-b border-navy-900/[0.07] bg-paper-50">
        <div className="container-x">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((t, i) => (
              <div
                key={i}
                data-reveal
                className={`py-8 md:py-10 ${i % 2 ? 'pl-5 md:pl-8' : 'pr-5 md:pr-8'} ${i > 1 ? 'border-t border-navy-900/[0.07] lg:border-t-0' : ''} ${i > 0 ? 'lg:border-l lg:border-navy-900/[0.07] lg:pl-8' : ''} ${i % 2 ? 'border-l border-navy-900/[0.07]' : ''}`}
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-600">{t.label}</dt>
                <dd className="mt-2 font-display text-4xl leading-none text-navy-900 md:text-5xl">{t.value}</dd>
                <dd className="mt-3 text-sm text-muted">{t.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Editorial introduction */}
      <section id="about" className="py-24 md:py-36">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="relative lg:col-span-6">
            <MediaFrame src={clinic.media.intro.main} label="Clinic interior · 4:5" alt="Calm, modern clinic treatment room (sample image)" tone="paper" className="aspect-[4/5] shadow-lift" />
            <MediaFrame
              src={clinic.media.intro.detail}
              label="Detail · 1:1"
              alt="Dentist attending to a patient (sample image)"
              tone="crimson"
              className="absolute -bottom-10 -right-4 hidden aspect-square w-[42%] border-8 border-paper-100 shadow-lift md:block lg:-right-10"
              rounded="rounded-[1.5rem]"
            />
          </div>
          <div className="lg:col-span-6">
            <div data-reveal>
              <p className="eyebrow text-crimson-600">The clinic</p>
              <h2 className="display-lg mt-5 text-balance">
                One clinic. Three disciplines. <em className="text-crimson-600">A single standard of care.</em>
              </h2>
            </div>
            <div data-reveal className="mt-8 space-y-5 lede max-w-xl">
              <p>
                Dr. Kimidi Multispeciality Clinic brings skin, hair and dental care together, so patients in Visakhapatnam can find the right specialist in one familiar place.
              </p>
              <p className="rounded-2xl border border-dashed border-crimson-400/70 bg-crimson-100/50 p-5 text-base text-navy-700">
                [Clinic story — replace with approved copy: how the clinic began, its philosophy of care, and what patients can expect at their first visit.]
              </p>
            </div>
            <div data-reveal className="hairline mt-12 max-w-xl" />
            <blockquote data-reveal className="mt-8 max-w-xl font-display text-2xl italic leading-snug text-navy-800">
              “[Optional approved message from the founding doctor.]”
              <footer className="mt-4 font-sans text-sm not-italic font-semibold tracking-wide text-crimson-600">— [Doctor name], [Title]</footer>
            </blockquote>
          </div>
        </div>
      </section>
    </>
  )
}
