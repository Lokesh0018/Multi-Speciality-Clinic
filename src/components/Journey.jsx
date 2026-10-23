import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowRight, CalendarCheck, Check, ClipboardList, Clock, MessageCircle, Stethoscope } from 'lucide-react'
import { clinic, journey } from '../content/clinic'
import { linkProps, whatsappHref } from '../lib/links'
import { MediaFrame, SectionHeading, WhatsAppIcon } from './ui/primitives'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** One icon per step, in the order of `journey`. */
const ICONS = [MessageCircle, Stethoscope, ClipboardList, CalendarCheck]

/** ECG trace echoing the heartbeat line in the logo's cross. */
const ECG = 'M0 10 H40 L46 10 L50 3 L55 17 L60 6 L64 10 H120'

/**
 * "Your visit": intro and photo on the left, the four steps as a connected
 * timeline on the right. As the section scrolls through, the rail fills and
 * each step's node lights up when the fill reaches it. Fills one screen from
 * lg up; below lg it stacks and grows naturally. Reduced motion shows the
 * completed path with no scroll animation.
 */
export default function Journey() {
  const root = useRef(null)
  const [current, setCurrent] = useState(-1) // index of the latest step reached

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const steps = q('[data-step]')
      const mm = gsap.matchMedia()

      const fill = q('[data-rail-fill]')[0]
      // Nodes are evenly spaced along the rail, so step i lights once the fill
      // has covered i / (n - 1) of it; the first lights as soon as it begins
      let pinned = false // while pinned, step 1 is lit from the start
      const head = q('[data-rail-head]')[0]
      let last = -2
      const sync = () => {
        const p = gsap.getProperty(fill, 'scaleY')
        let cur = -1
        steps.forEach((el, i) => {
          const on = (i === 0 && pinned) || (p > 0.001 && p >= i / (steps.length - 1) - 0.02)
          el.toggleAttribute('data-on', on)
          if (on) cur = i
        })
        // once the path is complete every step is done, the last one included
        const done = p >= 0.999
        steps.forEach((el, i) => {
          el.toggleAttribute('data-current', i === cur && !done)
          if (i === cur) el.setAttribute('aria-current', 'step')
          else el.removeAttribute('aria-current')
        })
        // glowing dot rides the leading edge of the fill
        gsap.set(head, { y: p * fill.offsetHeight, autoAlpha: p > 0.001 && p < 0.999 ? 1 : 0 })
        if (cur !== last) {
          last = cur
          setCurrent(cur)
        }
      }

      // Desktop: the section pins at the top of the screen and scrolling drives
      // the path through all four steps; the page moves on only after the last
      // one is reached (plus a short hold so it registers).
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
        root.current.setAttribute('data-pinned', '')
        pinned = true
        sync()
        const per = 0.55 // viewport heights of scroll per step
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          onUpdate: sync,
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * per * steps.length)}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        tl.fromTo(fill, { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0.08).to({}, { duration: 0.22 })
        return () => {
          pinned = false
          root.current?.removeAttribute('data-pinned')
        }
      })

      // Smaller screens: the section is taller than the screen, so no pin;
      // the path simply fills as it scrolls past
      mm.add('(prefers-reduced-motion: no-preference) and (max-width: 1023px)', () => {
        gsap.fromTo(fill, { scaleY: 0 }, {
          scaleY: 1,
          ease: 'none',
          onUpdate: sync,
          scrollTrigger: { trigger: q('[data-timeline]')[0], start: 'top 75%', end: 'bottom 55%', scrub: 0.5 },
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(fill, { scaleY: 1 })
        steps.forEach((el) => el.setAttribute('data-on', ''))
        setCurrent(steps.length - 1)
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="visit"
      aria-labelledby="journey-title"
      className="relative isolate overflow-clip bg-navy-900 py-24 text-paper-50 md:py-28 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-[5.5rem] lg:pb-10"
    >
      <div className="grain absolute inset-0 -z-10" />
      <div className="absolute -right-40 top-0 -z-10 size-[40rem] rounded-full bg-[radial-gradient(circle,rgb(214_60_70/0.16),transparent_65%)]" aria-hidden="true" />
      <div className="absolute -bottom-56 -left-40 -z-10 size-[36rem] rounded-full bg-[radial-gradient(circle,rgb(59_91_163/0.35),transparent_65%)]" aria-hidden="true" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.035)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(60%_60%_at_70%_50%,#000,transparent)]" />

      <div className="container-x w-full">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* Intro */}
          <div className="lg:col-span-5">
            <SectionHeading
              tone="dark"
              eyebrow="Your visit"
              title={
                <span id="journey-title" className="lg:text-[clamp(2.2rem,3.3vw,3.25rem)]">
                  A calm, clear path from first message to <em className="text-blush-300">follow-up.</em>
                </span>
              }
              intro="Every visit begins with listening. Here is what to expect when you reach out to us."
            />

            {/* Photo with the opening hours pinned to it */}
            <div data-reveal className="relative mt-8 hidden lg:block">
              <div aria-hidden="true" className="absolute -inset-2 -z-10 rounded-[2rem] border border-paper-50/[0.08]" />
              <MediaFrame
                src={clinic.media.consultation}
                label="Consultation suite"
                alt="Dr. Kimidi Multispeciality Clinic consultation and examination room"
                tone="navy"
                parallax={false}
                className="aspect-[16/9] max-h-[26svh] w-full ring-1 ring-paper-50/10"
              />
              <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-full border border-paper-50/70 bg-paper-50/95 py-2 pl-2 pr-5 text-navy-900 shadow-lift backdrop-blur-md">
                <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-crimson-400 to-crimson-600 text-paper-50">
                  <Clock className="size-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold">Open every day · 9 AM – 9 PM</span>
              </div>
            </div>

            <div data-reveal className="mt-8 flex flex-wrap items-center gap-3 lg:mt-12">
              <a {...linkProps(whatsappHref())} className="btn-primary">
                <WhatsAppIcon className="size-4" /> Start with a message
              </a>
              <a href="#branches" className="group btn-ghost-light">
                Find a branch
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
            {/* hours line for small screens, where the photo is hidden */}
            <p className="mt-6 flex items-center gap-3 text-sm text-paper-200/85 lg:hidden">
              <Clock className="size-4 text-blush-300" aria-hidden="true" />
              Open every day, 9:00 AM – 9:00 PM.
            </p>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-7">
            <div data-reveal className="mb-6 flex items-center gap-4">
              <svg viewBox="0 0 120 20" className="h-5 w-20 shrink-0 overflow-visible" aria-hidden="true">
                <path d={ECG} fill="none" stroke="var(--color-crimson-400)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blush-300">
                Step{' '}
                <span key={current} className="inline-block font-display text-base tracking-normal text-paper-50 motion-safe:animate-[caption-in_0.45s_var(--ease-cinematic)_both]">
                  {String(Math.max(current, 0) + 1).padStart(2, '0')}
                </span>
                <span className="text-paper-50/40"> / {String(journey.length).padStart(2, '0')}</span>
              </p>
              {/* segmented progress */}
              <span aria-hidden="true" className="ml-auto hidden w-40 gap-1.5 sm:flex">
                {journey.map((j, i) => (
                  <span key={j.step} className="h-1 flex-1 overflow-hidden rounded-full bg-paper-50/[0.12]">
                    <span className={`block h-full origin-left rounded-full bg-gradient-to-r from-crimson-400 to-blush-300 transition-transform duration-500 ease-[var(--ease-cinematic)] ${i <= current ? 'scale-x-100' : 'scale-x-0'}`} />
                  </span>
                ))}
              </span>
            </div>

            <ol data-timeline className="relative space-y-3 lg:space-y-4">
              {/* rail: faint track + crimson fill that grows with scroll */}
              <span aria-hidden="true" className="absolute bottom-10 left-[1.6rem] top-10 w-px bg-paper-50/[0.12] md:left-[1.85rem]" />
              <span
                data-rail-fill
                aria-hidden="true"
                className="absolute bottom-10 left-[1.6rem] top-10 w-px origin-top bg-gradient-to-b from-crimson-400 via-crimson-400 to-blush-300 shadow-[0_0_12px_rgb(214_40_53/0.7)] md:left-[1.85rem]"
              />
              <span
                data-rail-head
                aria-hidden="true"
                className="invisible absolute left-[1.6rem] top-10 z-[5] -ml-[5px] -mt-[5px] size-[11px] rounded-full bg-paper-50 shadow-[0_0_0_4px_rgb(214_40_53/0.35),0_0_18px_4px_rgb(214_40_53/0.8)] md:left-[1.85rem]"
              />

              {journey.map((j, i) => {
                const Icon = ICONS[i % ICONS.length]
                return (
                  <li key={j.step} data-step className="group relative grid transition-opacity duration-500 [[data-pinned]_&:not([data-on])]:opacity-40 grid-cols-[3.2rem_1fr] items-center gap-4 md:grid-cols-[3.7rem_1fr] md:gap-6">
                    {/* node */}
                    <span data-node className="relative z-10 grid size-[3.2rem] place-items-center rounded-full bg-navy-900 ring-1 ring-paper-50/20 transition-[box-shadow,background-color] duration-500 group-data-[on]:bg-crimson-500 group-data-[on]:shadow-[0_0_0_6px_rgb(214_40_53/0.18),0_10px_24px_-8px_rgb(214_40_53/0.8)] group-data-[on]:ring-crimson-400 md:size-[3.7rem]">
                      <span className="font-display text-xl font-semibold text-blush-300 transition-colors duration-500 group-data-[on]:text-paper-50 md:text-2xl">
                        {j.step}
                      </span>
                      {/* current step: soft expanding ring */}
                      <span aria-hidden="true" className="absolute inset-0 hidden rounded-full ring-2 ring-crimson-400/70 group-data-[current]:block motion-safe:group-data-[current]:animate-[node-pulse_2.2s_ease-out_infinite]" />
                      {/* completed step: check badge */}
                      <span aria-hidden="true" className="absolute -right-1 -top-1 grid size-5 scale-0 place-items-center rounded-full bg-paper-50 text-crimson-600 shadow-md transition-transform duration-300 ease-[var(--ease-cinematic)] group-data-[on]:group-not-data-[current]:scale-100">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                    </span>

                    {/* card */}
                    <div className="relative overflow-hidden rounded-2xl border border-paper-50/[0.09] bg-paper-50/[0.04] px-5 py-4 transition-[background-color,border-color,transform,box-shadow] duration-500 ease-[var(--ease-cinematic)] group-hover:border-paper-50/20 group-hover:bg-paper-50/[0.07] group-data-[on]:border-paper-50/[0.16] group-data-[current]:border-crimson-400/45 group-data-[current]:bg-paper-50/[0.09] group-data-[current]:shadow-[0_24px_48px_-24px_rgb(0_0_0/0.6)] md:px-6 md:py-5 lg:group-hover:translate-x-1">
                      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-gradient-to-b from-crimson-400 to-blush-300 transition-transform duration-500 ease-[var(--ease-cinematic)] group-data-[on]:scale-y-100" />
                      <div className="flex items-start gap-4 md:items-center md:gap-5">
                        <span className="hidden size-11 shrink-0 place-items-center rounded-xl bg-navy-800 text-blush-300 ring-1 ring-paper-50/15 transition-colors duration-300 group-hover:bg-paper-50 group-hover:text-crimson-600 group-data-[current]:bg-paper-50 group-data-[current]:text-crimson-600 sm:grid">
                          <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display text-[1.6rem] leading-tight xl:text-[1.85rem]">
                            <span className="sr-only">Step {i + 1} of {journey.length}: </span>
                            {j.title}
                          </h3>
                          <p className="mt-1 leading-relaxed text-paper-200/80">{j.body}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
