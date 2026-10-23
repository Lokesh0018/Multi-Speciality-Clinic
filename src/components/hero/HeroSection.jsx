import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { clinic } from '../../content/clinic'
import HeroVideo from './HeroVideo'
import HeroContent from './HeroContent'
import SpecialtyPanels from './SpecialtyPanels'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * The film is the source clip played forward then reversed. During these
 * seconds of the forward pass only, the hero copy steps aside so the footage
 * reads clearly; it is on screen for the rest of the loop, reverse pass included.
 */
const TEXT_HIDDEN_FROM = 2
const TEXT_HIDDEN_TO = 6

function inHiddenWindow(video) {
  const t = video.currentTime
  return t >= TEXT_HIDDEN_FROM && t < TEXT_HIDDEN_TO
}

/**
 * Layers, back to front:
 *   1. <HeroVideo>  — film + poster
 *   2. neutral legibility shade (uniform below lg, left side only at lg+)
 *   3. <HeroContent> (left)
 *   4. <SpecialtyPanels> — three slanted panels on the right (lg+)
 *
 * All motion lives in one useGSAP scope (auto-reverted on unmount, so Strict
 * Mode never double-plays) and is gated by gsap.matchMedia.
 */
export default function HeroSection({ onSelectSpeciality, play = true }) {
  const root = useRef(null)
  const film = useRef(null)
  const intro = useRef(null) // entrance timeline, started by the `play` effect
  // text cycle: `ready` once the entrance is done; `engaged` while hovered/focused
  const cycle = useRef({ ready: false, engaged: false, hidden: false, video: null, tl: null })

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const q = gsap.utils.selector(root)
      const header = document.querySelector('[data-site-header]')

      // Full sequence: desktop & tablet
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
        const ecg = q('[data-ecg]')[0]
        const len = ecg.getTotalLength()
        gsap.set(ecg, { strokeDasharray: len, strokeDashoffset: len })

        // Built paused: `from` tweens render their start state immediately so
        // nothing flashes early. Started by the `play` effect below.
        const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out', duration: 0.8 } })
        intro.current = tl
        tl.from(header, { y: -24, autoAlpha: 0 }, 0.1)
          .from(q('[data-eyebrow]'), { x: -16, autoAlpha: 0, duration: 0.7 }, 0.45)
          .to(ecg, { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' }, 0.6)
          .from(q('[data-headline-line]'), { yPercent: 105, duration: 1.0, stagger: 0.12, ease: 'power4.out' }, 0.8)
          .from(q('[data-hero-copy]'), { y: 18, autoAlpha: 0 }, 1.35)
          .from(q('[data-hero-cta]'), { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 1.55)
          .from(q('[data-hero-location]'), { y: 10, autoAlpha: 0, duration: 0.6 }, 1.85)
          .from(q('[data-panel]'), { xPercent: 10, autoAlpha: 0, duration: 1.1, stagger: 0.16, ease: 'power4.out' }, 0.9)
          // curtain reveal: each image wipes down from the top while settling from a zoom
          .from(q('[data-panel-media]'), { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.3, stagger: 0.16, ease: 'power4.inOut' }, 0.95)
          .from(q('[data-panel-media]'), { scale: 1.3, duration: 2.2, stagger: 0.16, ease: 'power3.out' }, 0.95)
          .from(q('[data-panel-label]'), { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.12 }, 1.8)
          // a single diagonal light sweep crosses each image once
          .fromTo(q('[data-panel-sheen]'), { xPercent: -120, skewX: -18 }, { xPercent: 320, duration: 1.4, stagger: 0.14, ease: 'power2.inOut' }, 2.0)

        // Recurring light sweep: travels across the three panels in turn, then rests
        tl.add(() => {
          const loop = gsap.timeline({ repeat: -1, repeatDelay: 5.5, delay: 4 })
          q('[data-panel-sheen]').forEach((s, i) => {
            loop.fromTo(s, { xPercent: -120, skewX: -18 }, { xPercent: 320, duration: 1.4, ease: 'power2.inOut' }, i * 0.3)
          })
        })

        // Subtle heartbeat: one soft re-draw every few seconds, no flashing
        tl.add(() => {
          gsap.to(ecg, {
            keyframes: [
              { opacity: 0.55, duration: 0.5 },
              { opacity: 1, duration: 0.5 },
            ],
            repeat: -1,
            repeatDelay: 3.5,
            ease: 'sine.inOut',
          })
        })

        // Scroll-out: content lifts and fades; the panels stay put
        const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to(q('[data-hero-content]'), { yPercent: -14, autoAlpha: 0.2, ease: 'none', scrollTrigger: st })
      })

      // Simplified: mobile & tablet portrait — opacity/short rises only
      mm.add('(prefers-reduced-motion: no-preference) and (max-width: 1023px)', () => {
        const tl = gsap.timeline({ paused: true })
        intro.current = tl
        tl.from(q('[data-ecg]'), { scaleX: 0, transformOrigin: 'left center', duration: 0.8, ease: 'power2.inOut', delay: 0.3 }, 0)
        tl.from([q('[data-eyebrow]'), q('[data-headline-line]'), q('[data-hero-copy]'), q('[data-hero-cta]'), q('[data-hero-location]'), q('[data-panel]')].flat(), {
          y: 14,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: 'power2.out',
          delay: 0.2,
        }, 0)
      })
    },
    { scope: root },
  )

  // Hero copy out / back in, timed to the film
  const animateText = contextSafe((hide) => {
    const c = cycle.current
    const q = gsap.utils.selector(root)
    c.tl?.kill()
    c.hidden = hide
    const lead = q('[data-eyebrow], [data-hero-ecg]')
    const tail = q('[data-hero-cta], [data-hero-location]')
    c.tl = hide
      ? gsap
          .timeline()
          .to(tail, { y: -12, autoAlpha: 0, duration: 0.45, stagger: 0.05, ease: 'power2.in' }, 0)
          .to(q('[data-hero-copy]'), { y: -12, autoAlpha: 0, duration: 0.45, ease: 'power2.in' }, 0.05)
          // -105% alone leaves descenders (the "p" in "Expert") peeking below the
          // mask's top edge at this tight leading, so travel further and fade out
          .to(q('[data-headline-line]'), { yPercent: -140, duration: 0.65, stagger: 0.08, ease: 'power3.in' }, 0.1)
          .to(q('[data-headline-line]'), { autoAlpha: 0, duration: 0.2, stagger: 0.08, ease: 'none' }, 0.55)
          .to(lead, { y: -10, autoAlpha: 0, duration: 0.45, stagger: 0.05, ease: 'power2.in' }, 0.2)
          .to(q('[data-hero-shade]'), { autoAlpha: 0, duration: 1.2, ease: 'power1.inOut' }, 0.2)
      : gsap
          .timeline()
          .to(q('[data-hero-shade]'), { autoAlpha: 1, duration: 1.0, ease: 'power1.inOut' }, 0)
          .fromTo(lead, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out' }, 0.1)
          .fromTo(q('[data-headline-line]'), { yPercent: 105, autoAlpha: 1 }, { yPercent: 0, duration: 0.95, stagger: 0.1, ease: 'power4.out' }, 0.2)
          .fromTo(q('[data-hero-copy]'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }, 0.55)
          .fromTo(tail, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' }, 0.7)
  })

  // Decide whether the copy should be showing; animate only on a change.
  // Never hides under a hovering pointer or keyboard focus.
  const syncText = () => {
    const c = cycle.current
    if (!c.ready || !c.video) return
    const hide = inHiddenWindow(c.video) && !c.engaged
    if (hide !== c.hidden) animateText(hide)
  }

  const onFilmTime = (e) => {
    cycle.current.video = e.currentTarget
    syncText()
  }

  // Start the entrance (play defaults to true) without rebuilding the context;
  // the film-timed text cycle only begins once it has finished
  useEffect(() => {
    const tl = intro.current
    if (!play || !tl) return
    tl.eventCallback('onComplete', () => {
      cycle.current.ready = true
      syncText()
    })
    if (tl.paused()) tl.play()
    // syncText only reads refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play])

  // Hovering or focusing the copy holds it on screen (and brings it back if hidden)
  useEffect(() => {
    const content = root.current?.querySelector('[data-hero-content]')
    if (!content) return
    const engage = (on) => () => {
      cycle.current.engaged = on
      syncText()
    }
    const enter = engage(true)
    const leave = engage(false)
    const blur = (e) => !content.contains(e.relatedTarget) && leave()
    content.addEventListener('pointerenter', enter)
    content.addEventListener('pointerleave', leave)
    content.addEventListener('focusin', enter)
    content.addEventListener('focusout', blur)
    return () => {
      content.removeEventListener('pointerenter', enter)
      content.removeEventListener('pointerleave', leave)
      content.removeEventListener('focusin', enter)
      content.removeEventListener('focusout', blur)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectSpeciality = (e, panel) => {
    if (onSelectSpeciality) {
      e.preventDefault()
      onSelectSpeciality(panel)
    }
  }

  return (
    <section ref={root} id="top" aria-label="Introduction" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-neutral-950 pt-[4.5rem]">
      {/* 1 · film */}
      <HeroVideo ref={film} video={clinic.media.heroVideo} className="-z-20" onTimeUpdate={onFilmTime} />

      {/* 2 · neutral shade for headline legibility, no colour cast (fades with the copy) */}
      <div data-hero-shade aria-hidden="true" className="absolute inset-0 -z-10 bg-black/45 lg:bg-transparent lg:bg-[linear-gradient(92deg,rgb(0_0_0/0.6)_0%,rgb(0_0_0/0.45)_30%,rgb(0_0_0/0.12)_55%,transparent_70%)]" />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      {/* 3 · content */}
      <div className="container-x relative flex flex-1 flex-col justify-center pt-12 pb-16 lg:py-8">
        <HeroContent />
      </div>

      {/* 4 · panels: in flow below lg, pinned to the section's right half at lg+ */}
      <div className="container-x lg:static lg:p-0">
        <SpecialtyPanels onSelect={selectSpeciality} />
      </div>
    </section>
  )
}
