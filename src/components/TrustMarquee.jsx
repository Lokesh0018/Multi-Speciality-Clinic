import { Clock, MapPin, MessageCircle, Stethoscope } from 'lucide-react'
import { trustPoints } from '../content/clinic'

const ICONS = { specialities: Stethoscope, branches: MapPin, hours: Clock, contact: MessageCircle }

/** Small medical cross echoing the logo, used as the item separator. */
function Cross() {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" className="mx-9 size-3 shrink-0 text-crimson-400 md:mx-12 motion-reduce:hidden">
      <path d="M4.5 0h3v4.5H12v3H7.5V12h-3V7.5H0v-3h4.5z" fill="currentColor" />
    </svg>
  )
}

function Items({ hidden = false }) {
  return (
    <ul aria-hidden={hidden || undefined} className={`flex shrink-0 items-center ${hidden ? 'motion-reduce:hidden' : 'motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-12 motion-reduce:gap-y-6'}`}>
      {trustPoints.map((t) => {
        const Icon = ICONS[t.icon]
        return (
          // Cross trails every item so the two copies tile seamlessly
          <li key={t.title} className="flex shrink-0 items-center">
            <div className="group flex items-center gap-4">
              {/* Flat fills only: a gradient background can't transition, which left the
                  white hover icon sitting on a pale chip. Colour is set on the icon itself. */}
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-crimson-100 ring-1 ring-crimson-200/80 transition-[background-color,box-shadow] duration-300 group-hover:bg-crimson-500 group-hover:shadow-[0_10px_24px_-10px_rgb(178_13_24/0.6)] group-hover:ring-crimson-500">
                <Icon className="size-5 text-crimson-600 transition-colors duration-300 group-hover:text-paper-50" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="whitespace-nowrap">
                <span className="block font-display text-[1.5rem] font-semibold leading-none text-navy-900 transition-colors duration-300 group-hover:text-crimson-600">{t.title}</span>
                <span className="mt-1.5 block text-[0.875rem] leading-none text-muted">{t.detail}</span>
              </span>
            </div>
            <Cross />
          </li>
        )
      })}
    </ul>
  )
}

/**
 * Infinite marquee of clinic facts on a white band. The list renders twice and
 * the track slides by -50%, so the loop has no seam. Pauses on hover; with
 * reduced motion it becomes a static, wrapped row.
 */
export default function TrustMarquee() {
  return (
    <section aria-label="Clinic highlights" className="marquee relative border-b border-navy-900/[0.08] bg-paper-50">
      <div className="overflow-hidden py-7 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] md:py-9 motion-reduce:[mask-image:none]">
        <div className="marquee-track flex w-max motion-reduce:w-full motion-reduce:justify-center motion-reduce:px-5" style={{ '--marquee-speed': '60s' }}>
          <Items />
          <Items hidden />
        </div>
      </div>
    </section>
  )
}
