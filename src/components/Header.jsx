import { useEffect, useRef, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { clinic, nav } from '../content/clinic'
import { linkProps, telHref, whatsappHref } from '../lib/links'
import { WhatsAppIcon } from './ui/primitives'

export function Wordmark({ light = false, compact = false }) {
  return (
    <a href="#top" className="flex cursor-pointer items-center gap-3" aria-label={`${clinic.name} — home`}>
      <span aria-hidden="true" className="grid h-10 w-[3.5rem] shrink-0 place-items-center overflow-hidden md:h-11 md:w-[3.75rem]">
        <img src={clinic.media.logo} alt="" width="356" height="248" className="h-full w-full object-contain" />
      </span>
      <span className="leading-none">
        <span className={`block font-sans text-[1.35rem] font-bold tracking-tight ${light ? 'text-paper-50' : 'text-navy-900'}`}>{clinic.wordmark.primary}</span>
        <span className={`mt-1 block text-[0.72rem] font-semibold ${compact ? 'hidden sm:block' : ''} ${light ? 'text-blush-300' : 'text-crimson-500'}`}>
          {clinic.wordmark.secondary}
        </span>
      </span>
    </a>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#top')
  const [scrolled, setScrolled] = useState(false)
  const menuButton = useRef(null)
  const closeButton = useRef(null)
  const menu = useRef(null)

  const bookHref = whatsappHref()
  const bookExternal = bookHref.startsWith('http')

  // No background until the first scroll; after that it becomes a floating pill
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Highlight the section in view (the hero clears the highlight)
  useEffect(() => {
    const targets = ['#top', ...nav.map((n) => n.href)].map((h) => document.querySelector(h)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit) setActive(`#${hit.target.id}`)
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  // Modal menu: move focus in, make the rest of the page inert, restore on close
  useEffect(() => {
    if (!open) return
    const siblings = [...menu.current.parentElement.children].filter((el) => el !== menu.current)
    siblings.forEach((el) => el.setAttribute('inert', ''))
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      siblings.forEach((el) => el.removeAttribute('inert'))
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      menuButton.current?.focus()
    }
  }, [open])

  const onDark = !scrolled
  // Light focus ring over the hero film; the global crimson ring is too faint on navy
  const ring = onDark ? 'focus-visible:outline-paper-50' : ''

  return (
    <>
      <header
        data-site-header
        className={`fixed inset-x-0 top-0 z-40 transition-[padding] duration-300 ease-[var(--ease-cinematic)] ${scrolled ? 'px-3 pt-3 md:px-5' : 'px-0 pt-0'}`}
      >
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between gap-6 border transition-[height,background-color,border-color,border-radius,box-shadow] duration-300 ease-[var(--ease-cinematic)] ${
            scrolled
              ? 'h-16 rounded-full border-navy-900/[0.08] bg-paper-50/85 pl-4 pr-2 shadow-[0_12px_40px_-16px_rgb(25_45_90/0.35)] backdrop-blur-xl md:pl-5'
              : 'h-[4.5rem] rounded-none border-transparent bg-transparent px-4 md:px-8 xl:px-10'
          }`}
        >
          <Wordmark compact light={onDark} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className={`flex items-center gap-1 rounded-full p-1 transition-colors duration-300 ${onDark ? 'bg-paper-50/[0.06] ring-1 ring-paper-50/[0.12]' : ''}`}>
              {nav.map((item) => {
                const on = active === item.href
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={on ? 'location' : undefined}
                      className={`inline-flex min-h-10 cursor-pointer items-center rounded-full px-4 text-[0.9rem] font-semibold tracking-[0.005em] transition-colors duration-200 ${ring} ${
                        onDark
                          ? on
                            ? 'bg-paper-50 text-navy-900'
                            : 'text-paper-50/85 hover:bg-paper-50/10 hover:text-paper-50'
                          : on
                            ? 'bg-navy-900 text-paper-50'
                            : 'text-navy-800 hover:bg-navy-900/[0.06] hover:text-navy-900'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {clinic.contact.phone && (
              <a
                {...linkProps(telHref())}
                aria-label={`Call the clinic, ${clinic.contact.phoneDisplay}`}
                className={`hidden size-11 cursor-pointer place-items-center rounded-full border transition-colors duration-200 xl:grid ${ring} ${
                  onDark ? 'border-paper-50/30 text-paper-50 hover:bg-paper-50/10' : 'border-navy-900/15 text-navy-900 hover:bg-navy-900/[0.06]'
                }`}
              >
                <Phone className="size-4" aria-hidden="true" />
              </a>
            )}
            <a {...linkProps(bookHref)} className={`btn-primary min-h-11 px-5 text-sm ${ring}`}>
              <WhatsAppIcon className="size-4" />
              <span className="hidden sm:inline">Book Appointment</span>
              <span className="sm:hidden">Book</span>
              {bookExternal && <span className="sr-only"> (opens WhatsApp)</span>}
            </a>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className={`grid size-11 cursor-pointer place-items-center rounded-full border transition-colors duration-200 lg:hidden ${ring} ${
                onDark ? 'border-paper-50/30 text-paper-50 hover:bg-paper-50/10' : 'border-navy-900/15 text-navy-900 hover:bg-navy-900/[0.06]'
              }`}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        ref={menu}
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
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-[radial-gradient(circle,rgb(214_40_53/0.16),transparent_65%)]" />
        <div className="relative flex h-[4.5rem] items-center justify-between px-4">
          <Wordmark light />
          <button
            ref={closeButton}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-paper-50/25 transition-colors duration-200 hover:bg-paper-50/10 focus-visible:outline-paper-50"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile" className="relative flex-1 overflow-y-auto px-6 pt-6">
          <ul>
            {nav.map((item, i) => {
              const on = active === item.href
              return (
                <li
                  key={item.href}
                  style={{ transitionDelay: open ? `${120 + i * 45}ms` : '0ms' }}
                  className={`transition-[opacity,transform] duration-500 ease-[var(--ease-cinematic)] ${open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={on ? 'location' : undefined}
                    className={`flex cursor-pointer items-center gap-4 border-b border-paper-50/10 py-4 font-display text-[2.1rem] leading-tight transition-colors duration-200 hover:text-blush-200 focus-visible:outline-paper-50 ${on ? 'text-blush-200' : ''}`}
                  >
                    <span className="w-6 font-sans text-xs font-semibold tracking-[0.2em] text-blush-300/80">0{i + 1}</span>
                    {item.label}
                    {on && <span aria-hidden="true" className="ml-auto size-2 rounded-full bg-crimson-400" />}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="relative grid grid-cols-2 gap-3 border-t border-paper-50/10 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <a {...linkProps(telHref())} onClick={() => setOpen(false)} className="btn-ghost-light focus-visible:outline-paper-50">
            <Phone className="size-4" aria-hidden="true" /> Call
          </a>
          <a {...linkProps(bookHref)} onClick={() => setOpen(false)} className="btn-primary focus-visible:outline-paper-50">
            <WhatsAppIcon className="size-4" /> WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
