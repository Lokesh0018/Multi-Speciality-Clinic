import { useEffect, useRef, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { clinic, nav } from '../content/clinic'
import { linkProps, telHref, whatsappHref } from '../lib/links'
import { WhatsAppIcon } from './ui/primitives'

export function Wordmark({ light = false }) {
  return (
    <a href="#top" className="group flex cursor-pointer items-center gap-3" aria-label={`${clinic.name} — home`}>
      {/* Logo artwork has a white ground, so it always sits on a white tile */}
      <span
        aria-hidden="true"
        className={`grid h-11 w-[3.75rem] shrink-0 place-items-center rounded-xl bg-paper-50 px-1.5 transition-shadow duration-300 ${light ? 'shadow-[0_6px_20px_-8px_rgb(0_0_0/0.45)]' : 'ring-1 ring-navy-900/10'}`}
      >
        <img src={clinic.media.logo} alt="" width="356" height="248" className="h-full w-full object-contain" />
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[1.45rem] font-semibold tracking-tight ${light ? 'text-paper-50' : 'text-navy-900'}`}>
          {clinic.wordmark.primary}
        </span>
        <span className={`mt-1 block text-[0.6rem] font-semibold uppercase tracking-[0.26em] ${light ? 'text-blush-300' : 'text-crimson-600'}`}>
          {clinic.wordmark.secondary}
        </span>
      </span>
    </a>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuButton = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      menuButton.current?.focus()
    }
  }, [open])

  const light = !scrolled

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-5 md:pt-4">
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between gap-4 rounded-full py-2.5 pl-4 pr-2.5 transition-[background-color,box-shadow,border-color] duration-500 ease-[var(--ease-cinematic)] md:pl-6 ${
            scrolled
              ? 'border border-navy-900/[0.06] bg-paper-50/90 shadow-soft backdrop-blur-xl'
              : 'border border-paper-50/10 bg-navy-950/15 backdrop-blur-md'
          }`}
        >
          <Wordmark light={light} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                      light ? 'text-paper-100/85 hover:bg-paper-50/10 hover:text-paper-50' : 'text-navy-800 hover:bg-navy-900/[0.05]'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              {...linkProps(telHref())}
              className={`hidden min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-200 md:inline-flex ${
                light ? 'text-paper-50 hover:bg-paper-50/10' : 'text-navy-900 hover:bg-navy-900/[0.05]'
              }`}
            >
              <Phone className="size-4" aria-hidden="true" />
              <span>Call</span>
            </a>
            <a
              {...linkProps(whatsappHref())}
              className={`btn min-h-11 px-5 text-sm ${light ? 'bg-paper-50 text-navy-900 hover:bg-blush-100' : 'bg-crimson-500 text-paper-50 hover:bg-crimson-700'}`}
            >
              <WhatsAppIcon className="size-4" />
              <span className="hidden sm:inline">Book on WhatsApp</span>
              <span className="sm:hidden">Book</span>
            </a>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className={`grid size-11 cursor-pointer place-items-center rounded-full transition-colors duration-200 lg:hidden ${
                light ? 'text-paper-50 hover:bg-paper-50/10' : 'text-navy-900 hover:bg-navy-900/[0.05]'
              }`}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open ? '' : undefined}
        className={`fixed inset-0 z-50 flex flex-col bg-navy-950 text-paper-50 transition-[opacity,visibility] duration-500 ease-[var(--ease-cinematic)] lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-6">
          <Wordmark light />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-paper-50/20 transition-colors hover:bg-paper-50/10"
            autoFocus={open}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pt-12">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex cursor-pointer items-baseline gap-4 border-b border-paper-50/10 py-4 font-display text-4xl transition-colors hover:text-blush-200"
                >
                  <span className="font-sans text-xs font-semibold tracking-[0.2em] text-blush-300/80">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid grid-cols-2 gap-3 p-6">
          <a {...linkProps(telHref())} onClick={() => setOpen(false)} className="btn-ghost-light">
            <Phone className="size-4" aria-hidden="true" /> Call
          </a>
          <a {...linkProps(whatsappHref())} onClick={() => setOpen(false)} className="btn-light">
            <WhatsAppIcon className="size-4" /> WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
