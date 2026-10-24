import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronsLeftRight } from 'lucide-react'
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
  const [active, setActiveRaw] = useState(-1) // -1 = overview photo
  const [leaving, setLeaving] = useState(null) // the slide being covered: { key, dir, ba }
  const leaveTimer = useRef(0)
  const [loaded, setLoaded] = useState({})
  const tabs = useRef([])
  const tabsContainerRef = useRef(null)
  const panelRef = useRef(null)
  const knobRef = useRef(null)

  const current = active < 0 ? { image: s.image.src, alt: s.image.alt, name: s.title } : s.services[active]
  const slides = [{ key: 'overview', image: s.image.src, alt: s.image.alt }, ...s.services.map((svc, i) => ({ key: String(i), image: svc.image, alt: svc.alt }))]
  const activeKey = active < 0 ? 'overview' : String(active)
  const before = active < 0 ? null : s.services[active].before

  /*
   * Changing slide: the new photo wipes in over the old one (from the right when
   * moving forward through the list, from the left going back) while settling
   * from a slight zoom; the old photo stays fully opaque underneath and drifts
   * the other way, so there's never a dip to the dark panel. The old slide
   * keeps the before/after split it had, frozen, until it's covered.
   */
  const setActive = (next) => {
    const to = typeof next === 'function' ? next(active) : next
    if (to === active) return
    clearTimeout(leaveTimer.current)
    setLeaving({ key: activeKey, dir: to > active ? 1 : -1, ba: Number(panelRef.current?.style.getPropertyValue('--ba')) || 0 })
    leaveTimer.current = setTimeout(() => setLeaving(null), 900)
    setActiveRaw(to)
  }

  /*
   * Before/after wipe. The panel carries --ba (how much of the "before" photo
   * shows, 0–100) and --ba-dur (how quickly it gets there); --ba is a
   * registered property, so the clip, divider and labels all ease together.
   * data-ba names what is driving it — hover, drag, key, peek, wipe, rest — and
   * shows the divider while set. Written straight to the DOM so pointer moves
   * never re-render.
   *  - mouse: the divider follows the cursor (eased catch-up on enter, tight follow after)
   *  - touch/pen: drag sideways (vertical swipes still scroll), or tap to jump
   *  - keyboard: the handle is a slider; arrows nudge, Page keys jump, Home/End go to the ends
   *  - selecting a service: a one-time peek sweeps the divider in and back as a hint
   */
  const ba = useRef({ mode: '', tracking: false, drag: null, timers: [] })
  const reduceMotion = useRef(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const peeked = useRef(new Set())
  const later = (fn, ms) => ba.current.timers.push(setTimeout(fn, reduceMotion.current ? 0 : ms))
  const clearBaTimers = () => {
    ba.current.timers.forEach(clearTimeout)
    ba.current.timers = []
  }
  const setBa = (pct, ms, mode) => {
    const el = panelRef.current
    if (!el) return
    el.style.setProperty('--ba-dur', `${reduceMotion.current ? 0 : ms}ms`)
    el.style.setProperty('--ba', pct)
    knobRef.current?.setAttribute('aria-valuenow', Math.round(pct))
    knobRef.current?.setAttribute('aria-valuetext', `${Math.round(pct)}% before treatment shown`)
    if (mode === undefined) return
    ba.current.mode = mode
    if (mode) el.dataset.ba = mode
    else delete el.dataset.ba
  }
  // glide back to the "after" photo, then hide the divider
  const settle = (ms) => {
    clearBaTimers()
    setBa(0, ms, 'wipe')
    later(() => setBa(0, 0, ''), ms)
  }
  const pos = () => Number(panelRef.current?.style.getPropertyValue('--ba')) || 0
  const baPct = (e) => {
    const r = panelRef.current.getBoundingClientRect()
    return Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100))
  }
  const onBaEnter = (e) => {
    if (!before || e.pointerType !== 'mouse') return
    clearBaTimers()
    ba.current.tracking = false
    setBa(baPct(e), 650, 'hover')
    later(() => (ba.current.tracking = true), 650)
  }
  const onBaDown = (e) => {
    if (!before || e.pointerType === 'mouse' || e.target.closest('button')) return
    ba.current.drag = { id: e.pointerId, x: e.clientX, y: e.clientY, live: false }
  }
  const onBaMove = (e) => {
    if (!before) return
    const d = ba.current.drag
    if (e.pointerType === 'mouse') {
      const { mode } = ba.current
      if (mode === 'hover') setBa(baPct(e), ba.current.tracking ? 90 : 650)
      else if (mode !== 'wipe') onBaEnter(e) // cursor was already resting here when the service changed
      return
    }
    if (!d || d.id !== e.pointerId) return
    if (!d.live) {
      // only claim the gesture once it is clearly sideways
      const dx = Math.abs(e.clientX - d.x)
      if (dx < 6 || dx < Math.abs(e.clientY - d.y)) return
      d.live = true
      clearBaTimers()
      panelRef.current.setPointerCapture(e.pointerId)
      setBa(baPct(e), 180, 'drag')
      return
    }
    setBa(baPct(e), 40)
  }
  const onBaUp = (e) => {
    const d = ba.current.drag
    if (!d || d.id !== e.pointerId) return
    ba.current.drag = null
    if (e.type === 'pointercancel') return
    clearBaTimers()
    // a drag leaves the divider where it was dropped; a tap jumps it there
    setBa(baPct(e), d.live ? 0 : 550, 'rest')
  }
  const onBaLeave = (e) => {
    if (e.pointerType !== 'mouse' || ba.current.mode !== 'hover') return
    ba.current.tracking = false
    settle(700)
  }
  const onKnobFocus = () => {
    clearBaTimers()
    setBa(pos() > 0 && pos() < 100 ? pos() : 50, 600, 'key')
  }
  const onKnobBlur = () => {
    if (ba.current.mode === 'key') settle(700)
  }
  const onKnobKey = (e) => {
    const p = pos()
    const to = { ArrowLeft: p - 5, ArrowDown: p - 5, ArrowRight: p + 5, ArrowUp: p + 5, PageDown: p - 25, PageUp: p + 25, Home: 0, End: 100 }[e.key]
    if (to === undefined) return
    e.preventDefault()
    e.stopPropagation()
    clearBaTimers()
    setBa(Math.min(100, Math.max(0, to)), 260, 'key')
  }

  // New service: reset the wipe, then peek once so it's clear the photo compares
  useEffect(() => {
    clearBaTimers()
    ba.current.drag = null
    setBa(0, 0, '')
    if (!before || reduceMotion.current || peeked.current.has(activeKey)) return
    peeked.current.add(activeKey)
    later(() => {
      if (ba.current.mode) return
      setBa(50, 1100, 'peek')
      later(() => settle(900), 1500)
    }, 900)
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => (clearBaTimers(), clearTimeout(leaveTimer.current)), [])

  // When a service is active, clicking outside the service buttons (and the photo) resets back to overview photo
  useEffect(() => {
    if (active < 0) return
    const handleOutsideClick = (e) => {
      if (tabsContainerRef.current && !tabsContainerRef.current.contains(e.target) && !panelRef.current?.contains(e.target)) {
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
          ;[svc.image, svc.before?.image].filter(Boolean).forEach((src) => {
            const img = new Image()
            img.src = src
          })
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
      {/* Photo: stacked slides, the active one wipes in over the last */}
      <div className={`lg:row-span-2 lg:col-span-7 lg:self-center ${flip ? 'lg:col-start-6' : 'lg:col-start-1'} lg:row-start-1`}>
        <div
          ref={panelRef}
          id={`${s.id}-panel`}
          role="tabpanel"
          aria-live="polite"
          aria-labelledby={active < 0 ? `${s.id}-title` : `${s.id}-tab-${active}`}
          onPointerEnter={onBaEnter}
          onPointerDown={onBaDown}
          onPointerMove={onBaMove}
          onPointerUp={onBaUp}
          onPointerCancel={onBaUp}
          onPointerLeave={onBaLeave}
          style={{ transition: '--ba var(--ba-dur, 0ms) var(--ease-cinematic)' }}
          className={`group/ba relative isolate overflow-hidden rounded-[1.75rem] bg-navy-900 shadow-lift ring-1 ring-navy-900/[0.06] ${s.frame === 'landscape' ? 'aspect-[4/3]' : 'aspect-[5/4] lg:aspect-[6/5]'} ${before ? 'touch-pan-y select-none [@media(hover:hover)]:cursor-ew-resize' : ''}`}
        >
          {slides.map((slide) => {
            const on = slide.key === activeKey
            const out = !on && leaving?.key === slide.key
            const back = leaving?.dir === -1
            const svcBefore = slide.key === 'overview' ? null : s.services[Number(slide.key)].before
            return (
              <div
                key={slide.key}
                aria-hidden={!on}
                style={out ? { '--ba': leaving.ba } : undefined}
                className={`absolute inset-0 overflow-hidden motion-reduce:animate-none ${
                  on
                    ? `z-[12] ${!leaving ? '' : back ? 'animate-[slide-reveal-prev_0.9s_var(--ease-cinematic)_both]' : 'animate-[slide-reveal-next_0.9s_var(--ease-cinematic)_both]'}`
                    : out
                      ? `z-[11] ${back ? 'animate-[slide-leave-prev_0.9s_var(--ease-cinematic)_both]' : 'animate-[slide-leave-next_0.9s_var(--ease-cinematic)_both]'}`
                      : 'invisible z-0'
                }`}
              >
                <div className={`absolute inset-0 motion-reduce:animate-none ${on && leaving ? 'animate-[slide-settle_1.1s_var(--ease-cinematic)_both]' : ''}`}>
                  <img
                    src={slide.image}
                    alt={on ? slide.alt : ''}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* before/after: the "after" photo is the slide; the aligned "before" photo is clipped open from the left up to --ba */}
                  {svcBefore && (
                    <img
                      src={svcBefore.image}
                      alt={on ? svcBefore.alt : ''}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      style={{ clipPath: 'inset(0 calc(100% - var(--ba) * 1%) 0 0)' }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>
                {/* soft light along the leading edge of the wipe */}
                {on && leaving && (
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 motion-reduce:hidden ${
                      back
                        ? 'bg-[linear-gradient(to_left,rgb(255_255_255/0.28),transparent_7rem)] animate-[slide-edge-prev_0.9s_var(--ease-cinematic)_both]'
                        : 'bg-[linear-gradient(to_right,rgb(255_255_255/0.28),transparent_7rem)] animate-[slide-edge-next_0.9s_var(--ease-cinematic)_both]'
                    }`}
                  />
                )}
              </div>
            )
          })}
          {before && (
            <>
              {/* divider riding the wipe edge, shown whenever something is driving the wipe; each label fades out before it would be pushed off the edge */}
              <div
                style={{ transform: 'translateX(calc(var(--ba) * 1%))' }}
                className="pointer-events-none absolute inset-0 z-[25] opacity-0 transition-opacity duration-300 group-data-ba/ba:opacity-100"
              >
                <div aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 bg-paper-50/90 shadow-[0_0_18px_rgb(255_255_255/0.55)]" />
                <div
                  ref={knobRef}
                  role="slider"
                  tabIndex={0}
                  aria-label={`Compare before and after ${current.name}`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={0}
                  onFocus={onKnobFocus}
                  onBlur={onKnobBlur}
                  onKeyDown={onKnobKey}
                  className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-crimson-400 focus-visible:ring-offset-4 focus-visible:ring-offset-navy-900"
                >
                  <div aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-paper-50 text-navy-900 shadow-lift ring-4 ring-paper-50/25 transition-[scale,box-shadow] duration-200 ease-[var(--ease-cinematic)] group-data-[ba=drag]/ba:scale-110 group-data-[ba=drag]/ba:ring-8 group-data-[ba=peek]/ba:animate-[ba-nudge_1.1s_var(--ease-cinematic)_both]">
                    <ChevronsLeftRight className="size-5" />
                  </div>
                </div>
                <span aria-hidden="true" style={{ opacity: 'clamp(0, (var(--ba) - 16) / 8, 1)' }} className="absolute left-0 top-1/2 -translate-x-[calc(100%+2.25rem)] -translate-y-1/2 rounded-full bg-navy-950/55 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-paper-50 backdrop-blur-md">Before</span>
                <span aria-hidden="true" style={{ opacity: 'clamp(0, (84 - var(--ba)) / 8, 1)' }} className="absolute left-0 top-1/2 translate-x-9 -translate-y-1/2 rounded-full bg-navy-950/55 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-paper-50 backdrop-blur-md">After</span>
              </div>
            </>
          )}
          {/* caption */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent px-6 pb-6 pt-20 text-paper-50">
            <p className="flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-blush-300">
              {active < 0 ? s.kicker : `${s.kicker} · ${String(active + 1).padStart(2, '0')}`}
              {before && (
                <span key={activeKey} className="inline-flex items-center gap-1.5 text-paper-50/80 transition-opacity duration-300 group-data-ba/ba:opacity-0 motion-safe:animate-[caption-in_0.6s_var(--ease-cinematic)_0.2s_backwards]">
                  <ChevronsLeftRight className="size-3.5" />
                  Slide to compare
                </span>
              )}
            </p>
            <p key={activeKey} className="mt-1 font-display text-2xl font-semibold leading-tight motion-safe:animate-[caption-in_0.6s_var(--ease-cinematic)_both] md:text-3xl">
              {current.name}
            </p>
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
          <div ref={tabsContainerRef} role="tablist" aria-label={`${s.title} services`} aria-orientation="vertical" className="grid auto-rows-fr gap-2 sm:grid-cols-2">
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
