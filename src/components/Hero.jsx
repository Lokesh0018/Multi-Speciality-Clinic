import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Pause, Phone, Play } from 'lucide-react'
import { clinic, specialities } from '../content/clinic'
import { linkProps, telHref, whatsappHref } from '../lib/links'
import { WhatsAppIcon } from './ui/primitives'

const lines = ['Considered care', 'for skin, hair', '& your smile.']

export default function Hero() {
  const video = useRef(null)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(true)
  const { webm, mp4, poster } = clinic.media.heroVideo

  // Respect reduced motion: hold the poster frame instead of autoplaying.
  useEffect(() => {
    const v = video.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause()
      setPlaying(false)
    } else {
      v.play().catch(() => setPlaying(false))
    }
  }, [])

  const toggle = () => {
    const v = video.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <section id="top" aria-label="Introduction" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-950 text-paper-50">
      {/* Media layer */}
      <div data-hero-media className="absolute inset-0 -z-10 will-change-transform">
        {/* Fallback scene — visible until a video loads */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_20%,var(--color-navy-600)_0%,var(--color-navy-800)_45%,var(--color-navy-950)_100%)]">
          <div className="hero-fallback-light absolute right-[-10%] top-[-10%] size-[70vmax] rounded-full bg-[radial-gradient(circle,rgb(214_60_70/0.35),transparent_60%)] blur-2xl" />
          <div className="hero-fallback-light absolute bottom-[-20%] left-[-10%] size-[60vmax] rounded-full bg-[radial-gradient(circle,rgb(96_134_214/0.25),transparent_60%)] blur-2xl [animation-delay:-9s]" />
          {poster && <img src={poster} alt="" fetchpriority="high" className="absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-luminosity" />}
        </div>
        <video
          ref={video}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ${ready ? 'opacity-100' : 'opacity-0'}`}
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster || undefined}
          onLoadedData={() => setReady(true)}
          aria-hidden="true"
        >
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </video>
        {/* Cinematic grade for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/55 via-navy-950/20 to-navy-950/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 via-transparent to-transparent" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="container-x flex flex-1 flex-col justify-end pb-10 pt-36 md:pb-14">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p data-hero-fade className="eyebrow text-blush-300">
              {clinic.specialities} — {clinic.city}
            </p>
            <h1 className="display-xl mt-6 text-paper-50">
              {lines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <span data-hero-line className={`inline-block ${i === 1 ? 'italic text-blush-200' : ''}`}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <p data-hero-fade className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-paper-200/85">
              A multispeciality clinic bringing skin, hair and dental care together under one roof — with branches in PM Palem and MVP Colony.
            </p>
            <div data-hero-fade className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a {...linkProps(whatsappHref())} className="btn-light">
                <WhatsAppIcon /> Book on WhatsApp
              </a>
              <a {...linkProps(telHref())} className="btn-ghost-light">
                <Phone className="size-[18px]" aria-hidden="true" /> Call {clinic.contact.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Speciality shortcuts — fast service discovery */}
          <nav data-hero-fade aria-label="Specialities" className="lg:col-span-4">
            <ul className="divide-y divide-paper-50/12 overflow-hidden rounded-3xl border border-paper-50/12 bg-navy-950/35 backdrop-blur-md">
              {specialities.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="group flex cursor-pointer items-center gap-4 px-5 py-4 transition-colors duration-300 hover:bg-paper-50/[0.06]">
                    <span className="text-xs font-semibold tracking-[0.18em] text-blush-300">{s.index}</span>
                    <span className="flex-1">
                      <span className="block font-display text-2xl leading-tight">{s.title}</span>
                      <span className="block text-xs uppercase tracking-[0.18em] text-paper-200/65">{s.kicker}</span>
                    </span>
                    <ArrowUpRight className="size-5 text-paper-200/60 transition-colors duration-300 group-hover:text-blush-200" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div data-hero-fade className="mt-12 flex items-center justify-between border-t border-paper-50/12 pt-6 text-xs uppercase tracking-[0.2em] text-paper-200/70">
          <a href="#about" className="inline-flex min-h-11 cursor-pointer items-center gap-3 transition-colors hover:text-paper-50">
            <ArrowDown className="size-4" aria-hidden="true" /> Discover the clinic
          </a>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? 'Pause background video' : 'Play background video'}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-3 transition-colors hover:text-paper-50"
          >
            {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
            <span className="hidden sm:inline">{playing ? 'Pause film' : 'Play film'}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
