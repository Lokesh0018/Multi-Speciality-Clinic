import { ArrowDown, ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import { hero } from '../../content/clinic'
import { linkProps, whatsappHref } from '../../lib/links'

/** ECG trace echoing the heartbeat line in the logo's cross. */
const ECG = 'M0 10 H150 L158 10 L163 2 L169 18 L175 5 L180 10 H340'

export default function HeroContent() {
  return (
    <div data-hero-content className="relative z-10 max-w-[34rem] text-paper-50 lg:max-w-[44%] xl:max-w-[38rem]">
      <p data-eyebrow className="text-[0.82rem] font-semibold uppercase tracking-[0.45em] text-paper-50/90">{hero.eyebrow}</p>
      <svg data-hero-ecg viewBox="0 0 340 20" className="mt-4 h-5 w-[24rem] max-w-full overflow-visible drop-shadow-[0_0_8px_rgb(214_40_53/0.7)]" aria-hidden="true">
        <path data-ecg d={ECG} fill="none" stroke="var(--color-crimson-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <h1 className="mt-6 font-sans text-[clamp(2.6rem,5.6vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em] lg:mt-7 [text-shadow:0_2px_24px_rgb(15_29_63/0.45)]">
        {hero.headline.map((line) => (
          <span key={line} className="block overflow-hidden pb-[0.06em]">
            <span data-headline-line className="block">
              {line.split(' ').map((w, j, arr) => (
                <span key={j} className={w === hero.accentWord ? 'text-crimson-400 [text-shadow:0_0_28px_rgb(214_40_53/0.45)]' : ''}>
                  {w}
                  {j < arr.length - 1 && ' '}
                </span>
              ))}
            </span>
          </span>
        ))}
      </h1>

      <p data-hero-copy className="mt-6 max-w-[30rem] text-pretty text-[1.05rem] leading-[1.65] text-paper-50/85 md:text-lg xl:text-xl">
        {hero.copy}
      </p>

      {/* Wraps so the secondary CTA drops below instead of running into the panels (lg–xl column is ~415px) */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <a data-hero-cta {...linkProps(whatsappHref())} className="group btn-primary min-h-[3.5rem] px-7 text-base shadow-[0_14px_36px_-12px_rgb(178_13_24/0.75)] hover:shadow-[0_16px_40px_-10px_rgb(178_13_24/0.85)]">
          <CalendarDays className="size-5" aria-hidden="true" />
          {hero.primaryCta}
          <ArrowRight className="size-4 transition-transform duration-300 ease-[var(--ease-cinematic)] group-hover:translate-x-1" aria-hidden="true" />
        </a>
        <a data-hero-cta href={hero.secondaryHref} className="group btn-ghost-light min-h-[3.5rem] border-paper-50/50 bg-paper-50/[0.06] px-7 text-base backdrop-blur-sm hover:bg-paper-50/[0.14]">
          <ArrowDown className="size-5 transition-transform duration-300 ease-[var(--ease-cinematic)] group-hover:translate-y-0.5" aria-hidden="true" />
          {hero.secondaryCta}
        </a>
      </div>

      <p data-hero-location className="mt-8 flex items-center gap-2 text-[0.95rem] text-paper-50/80">
        <MapPin className="size-[18px] text-paper-50" aria-hidden="true" />
        {hero.location}
      </p>
    </div>
  )
}
