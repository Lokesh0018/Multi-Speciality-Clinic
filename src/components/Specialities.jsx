import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { specialities } from '../content/clinic'
import { linkProps, whatsappHref } from '../lib/links'
import { SectionHeading } from './ui/primitives'

/**
 * One speciality: a service list on one side, a photo on the other. Each
 * service name is a tab — selecting it swaps the photo to that service's
 * image (crossfade) and updates the caption. The speciality's own photo is
 * shown until a service is chosen.
 */
function Speciality({ s, flip }) {
  const [active, setActive] = useState(-1) // -1 = overview photo
  const [loaded, setLoaded] = useState({})
  const tabs = useRef([])
  const tabsContainerRef = useRef(null)

  const current = active < 0 ? { image: s.image.src, alt: s.image.alt, name: s.title } : s.services[active]
  const slides = [{ key: 'overview', image: s.image.src, alt: s.image.alt }, ...s.services.map((svc, i) => ({ key: String(i), image: svc.image, alt: svc.alt }))]
  const activeKey = active < 0 ? 'overview' : String(active)

  // When a service is active, clicking outside the service buttons resets back to overview photo
  useEffect(() => {
    if (active < 0) return
    const handleOutsideClick = (e) => {
      if (tabsContainerRef.current && !tabsContainerRef.current.contains(e.target)) {
        setActive(-1)
      }
    }
    document.addEventListener('pointerdown', handleOutsideClick)
    return () => document.removeEventListener('pointerdown', handleOutsideClick)
  }, [active])

  // Warm the other service images once the section is on screen
  useEffect(() => {
    if (loaded.warm) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        s.services.forEach((svc) => {
          const img = new Image()
          img.src = svc.image
        })
        setLoaded((l) => ({ ...l, warm: true }))
        io.disconnect()
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(tabs.current[0]?.closest('article'))
    return () => io.disconnect()
  }, [s.services, loaded.warm])

  // Roving tabindex: arrow keys move between services, Home/End jump, Esc resets to overview
  const onKey = (e, i) => {
    if (e.key === 'Escape') {
      setActive(-1)
      return
    }
    const n = s.services.length
    const go = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: n - 1 }[e.key]
    if (go === undefined) return
    e.preventDefault()
    const next = (go + n) % n
    setActive(next)
    tabs.current[next]?.focus()
  }

  const toggleService = (i) => {
    setActive((prev) => (prev === i ? -1 : i))
  }

  const first = s.title.split(' ')[0]
  const enquiry = active < 0 ? `Hello, I would like to enquire about ${s.title.toLowerCase()}.` : `Hello, I would like to enquire about ${current.name} (${s.title}).`

  return (
    <article id={s.id} aria-labelledby={`${s.id}-title`} className="grid scroll-mt-28 gap-8 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8">
      {/* Photo: stacked slides, the active one fades in */}
      <div className={`lg:row-span-2 lg:col-span-7 lg:self-center ${flip ? 'lg:col-start-6' : 'lg:col-start-1'} lg:row-start-1`}>
        <div
          id={`${s.id}-panel`}
          role="tabpanel"
          aria-live="polite"
          aria-labelledby={active < 0 ? `${s.id}-title` : `${s.id}-tab-${active}`}
          className="relative isolate aspect-[5/4] overflow-hidden rounded-[1.75rem] bg-navy-900 shadow-lift ring-1 ring-navy-900/[0.06] lg:aspect-[6/5]"
        >
          {slides.map((slide) => {
            const on = slide.key === activeKey
            return (
              <img
                key={slide.key}
                src={slide.image}
                alt={on ? slide.alt : ''}
                loading="lazy"
                decoding="async"
                aria-hidden={!on}
                className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-cinematic)] motion-reduce:transition-none ${
                  on ? 'z-10 scale-100 opacity-100' : 'z-0 scale-[1.04] opacity-0'
                }`}
              />
            )
          })}
          {/* caption */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent px-6 pb-6 pt-20 text-paper-50">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-blush-300">{active < 0 ? s.kicker : `${s.kicker} · ${String(active + 1).padStart(2, '0')}`}</p>
            <p key={activeKey} className="mt-1 font-display text-2xl font-semibold leading-tight motion-safe:animate-[caption-in_0.6s_var(--ease-cinematic)_both] md:text-3xl">
              {current.name}
            </p>
          </div>
          {/* progress dots */}
          <div aria-hidden="true" className="absolute right-5 top-5 z-20 flex gap-1.5">
            {s.services.map((_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${i === active ? 'w-5 bg-paper-50' : 'w-1.5 bg-paper-50/45'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Intro copy: above the photo on small screens */}
      <div className={`lg:col-span-5 lg:self-end ${flip ? 'lg:col-start-1' : 'lg:col-start-8'} lg:row-start-1 -order-1 lg:order-none`}>
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
      </div>

      {/* Service tabs: directly below the photo on small screens */}
      <div className={`lg:col-span-5 lg:self-start ${flip ? 'lg:col-start-1' : 'lg:col-start-8'} lg:row-start-2`}>
        <div data-reveal>
          <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted">Select a service</p>
          <div ref={tabsContainerRef} role="tablist" aria-label={`${s.title} services`} aria-orientation="vertical" className="grid gap-2 sm:grid-cols-2">
            {s.services.map((svc, i) => {
              const on = i === active
              return (
                <button
                  key={svc.name}
                  ref={(el) => (tabs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`${s.id}-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`${s.id}-panel`}
                  tabIndex={on || (active < 0 && i === 0) ? 0 : -1}
                  onClick={() => toggleService(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`group flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left text-[0.9375rem] font-medium transition-[background-color,border-color,color,box-shadow] duration-200 ${
                    on
                      ? 'border-navy-900 bg-navy-900 text-paper-50 shadow-[0_10px_24px_-12px_rgb(25_45_90/0.6)]'
                      : 'border-navy-900/[0.08] bg-paper-50 text-navy-800 hover:border-crimson-400/50 hover:bg-crimson-100/60 hover:text-navy-900'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid size-6 shrink-0 place-items-center rounded-full text-[0.65rem] font-bold tabular-nums transition-colors duration-200 ${
                      on ? 'bg-crimson-500 text-paper-50' : 'bg-navy-900/[0.06] text-navy-800 group-hover:bg-crimson-500 group-hover:text-paper-50'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 leading-snug">{svc.name}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className={`size-4 shrink-0 transition-[opacity,transform] duration-200 ${on ? 'opacity-100' : 'opacity-0 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100'}`}
                  />
                </button>
              )
            })}
          </div>
        </div>

        <div data-reveal className="mt-9 flex flex-wrap gap-3">
          <a {...linkProps(whatsappHref(enquiry))} className="btn-primary">
            Enquire about {active < 0 ? `${first.toLowerCase()} care` : current.name.toLowerCase()}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  )
}

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
          {specialities.map((s, i) => (
            <Speciality key={s.id} s={s} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
