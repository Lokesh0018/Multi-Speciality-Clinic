import { clinic, journey } from '../content/clinic'
import { MediaFrame, SectionHeading } from './ui/primitives'

export default function Journey() {
  return (
    <section aria-labelledby="journey-title" className="relative isolate overflow-hidden bg-navy-900 py-24 text-paper-50 md:py-36">
      <div className="grain absolute inset-0 -z-10" />
      <div className="absolute -right-40 top-0 -z-10 size-[40rem] rounded-full bg-[radial-gradient(circle,rgb(214_60_70/0.12),transparent_65%)]" aria-hidden="true" />
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading
              tone="dark"
              eyebrow="Your visit"
              title={<span id="journey-title">A calm, clear path from first message to follow-up.</span>}
              intro="Every visit begins with listening. Here is what to expect when you reach out to us."
            />
            <MediaFrame src={clinic.media.consultation} label="Consultation · 3:2" alt="Dentist examining a patient (sample image)" tone="navy" className="mt-12 hidden aspect-[3/2] border border-paper-50/10 lg:block" />
          </div>
          <ol className="lg:col-span-7 lg:pt-4">
            {journey.map((j) => (
              <li key={j.step} data-reveal className="group grid grid-cols-[auto_1fr] gap-6 border-t border-paper-50/12 py-9 last:border-b md:gap-10 md:py-11">
                <span className="font-display text-5xl leading-none text-blush-300 md:text-6xl">{j.step}</span>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl">{j.title}</h3>
                  <p className="mt-3 max-w-md text-paper-200/80">{j.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
