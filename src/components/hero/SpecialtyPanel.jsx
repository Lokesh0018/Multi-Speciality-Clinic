import { PANEL_ICONS } from './icons'

/**
 * One angled specialty panel. At lg+ the element is clipped to a parallelogram
 * (`--s` = horizontal slant) so the image inside stays unskewed and unzoomed —
 * `object-position` then lands exactly on the subject. Below lg it is an upright card.
 */
export default function SpecialtyPanel({ panel, last = false, onSelect }) {
  const Icon = PANEL_ICONS[panel.icon]
  return (
    <a
      href={`#${panel.id}`}
      data-panel
      onClick={(e) => onSelect?.(e, panel)}
      aria-label={`${panel.label} — view speciality`}
      className={`group relative isolate block h-full cursor-pointer overflow-hidden rounded-2xl border border-paper-50/25 bg-neutral-900 shadow-[0_30px_60px_-30px_rgb(15_29_63/0.8)] lg:rounded-none lg:border-0 lg:[--s:52px] ${last ? 'lg:[clip-path:polygon(var(--s)_0,100%_0,100%_100%,0_100%)]' : 'lg:[clip-path:polygon(var(--s)_0,100%_0,calc(100%-var(--s))_100%,0_100%)]'}`}
    >
      <div data-panel-media className="absolute inset-0">
        <img
          src={panel.src}
          alt=""
          loading="eager"
          decoding="async"
          style={{ objectPosition: panel.position }}
          className="h-full w-full object-cover brightness-[0.92] contrast-[1.04] transition-[filter,transform] duration-700 ease-[var(--ease-cinematic)] group-hover:scale-[1.04] group-hover:brightness-105 group-focus-visible:brightness-105"
        />
        {/* Neutral bottom ramp so the label stays legible; no colour cast on the photo */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(0_0_0/0.35)_72%,rgb(0_0_0/0.7))]" />
      </div>
      {/* One-shot light sweep across the image during the entrance (GSAP moves it) */}
      <div aria-hidden="true" data-panel-sheen className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-paper-50/25 to-transparent mix-blend-screen lg:block" />

      {/* Label, centred in the visible part of the panel near its foot: the next
          panel covers the right of inner panels; the last loses 38px off-screen */}
      <div data-panel-label className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-7 text-center text-paper-50 lg:pb-12 lg:pr-[var(--s)]" style={last ? { paddingRight: 'calc(var(--s)*0.6)' } : undefined}>
        <Icon className="mb-3 size-8 shrink-0 drop-shadow-[0_2px_6px_rgb(0_0_0/0.4)] transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5 lg:size-10" />
        <span className="whitespace-nowrap text-[0.66rem] font-bold uppercase tracking-[0.14em] drop-shadow-[0_2px_6px_rgb(0_0_0/0.5)] lg:text-[0.8rem] lg:tracking-[0.16em] xl:text-[0.95rem] xl:tracking-[0.2em]">{panel.label}</span>
        <span aria-hidden="true" className="mt-3 block h-[3px] w-12 origin-center rounded-full bg-crimson-400 transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:scale-x-[1.6] group-focus-visible:scale-x-[1.6]" />
      </div>
    </a>
  )
}
