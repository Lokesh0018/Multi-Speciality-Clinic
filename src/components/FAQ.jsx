import { useId, useState } from 'react'
import { MessageCircleQuestion, Phone, Plus } from 'lucide-react'
import { faqs } from '../content/clinic'
import { linkProps, telHref, whatsappHref } from '../lib/links'
import { SectionHeading, WhatsAppIcon } from './ui/primitives'

/** ECG trace echoing the heartbeat line in the logo's cross. */
const ECG = 'M0 10 H40 L46 10 L50 3 L55 17 L60 6 L64 10 H120'

function Item({ q, a, index, open, onToggle }) {
  const id = useId()
  return (
    <li
      className={`group relative overflow-hidden rounded-2xl border transition-[background-color,border-color,box-shadow] duration-500 ease-[var(--ease-cinematic)] ${
        open
          ? 'border-crimson-300/50 bg-paper-50 shadow-lift'
          : 'border-navy-900/[0.08] bg-paper-50/60 hover:border-navy-900/15 hover:bg-paper-50'
      }`}
    >
      {/* crimson accent along the left edge of the open item */}
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-1 origin-top bg-gradient-to-b from-crimson-400 to-crimson-600 transition-transform duration-500 ease-[var(--ease-cinematic)] motion-reduce:transition-none ${open ? 'scale-y-100' : 'scale-y-0'}`}
      />
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-crimson-500 md:gap-6 md:px-7 md:py-6"
        >
          <span
            aria-hidden="true"
            className={`w-8 shrink-0 font-display text-xl font-semibold tabular-nums transition-colors duration-300 md:text-2xl ${open ? 'text-crimson-500' : 'text-blush-400'}`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`flex-1 font-display text-[1.35rem] leading-snug transition-colors duration-200 md:text-[1.6rem] ${open ? 'text-navy-900' : 'text-navy-800 group-hover:text-navy-900'}`}>
            {q}
          </span>
          <span
            aria-hidden="true"
            className={`grid size-10 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-500 ease-[var(--ease-cinematic)] ${
              open
                ? 'rotate-45 border-crimson-500 bg-crimson-500 text-paper-50 shadow-[0_8px_18px_-8px_rgb(214_40_53/0.9)]'
                : 'border-navy-900/15 text-navy-800 group-hover:border-crimson-400 group-hover:text-crimson-600'
            }`}
          >
            <Plus className="size-4" />
          </span>
        </button>
      </h3>
      {/* grid-rows trick: smooth height without measuring */}
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-cinematic)] motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden" inert={!open ? '' : undefined}>
          <p
            className={`max-w-2xl pb-6 pl-[4.25rem] pr-6 leading-relaxed text-muted transition-[opacity,transform] duration-500 ease-[var(--ease-cinematic)] md:pb-7 md:pl-[5.75rem] md:pr-20 ${
              open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
            }`}
          >
            {a}
          </p>
        </div>
      </div>
    </li>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative isolate overflow-hidden bg-paper-100 py-24 md:py-32">
      <div aria-hidden="true" className="absolute -right-48 top-10 -z-10 size-[40rem] rounded-full bg-[radial-gradient(circle,rgb(59_91_163/0.1),transparent_65%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(rgb(25_45_90/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(25_45_90/0.05)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(50%_50%_at_25%_30%,#000,transparent)]" />

      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
        {/* Intro + help card, pinned while the questions scroll */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="Questions"
              title={
                <span id="faq-title">
                  Before you <em className="text-crimson-600">visit.</em>
                </span>
              }
              intro="Answers to the questions patients ask us most often."
            />
            <svg viewBox="0 0 120 20" className="mt-6 h-5 w-28 overflow-visible" aria-hidden="true">
              <path d={ECG} fill="none" stroke="var(--color-crimson-400)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div data-reveal className="relative isolate mt-8 overflow-hidden rounded-[1.75rem] bg-navy-900 p-6 text-paper-50 shadow-lift md:p-7">
              <div aria-hidden="true" className="absolute -right-16 -top-16 -z-10 size-56 rounded-full bg-[radial-gradient(circle,rgb(214_60_70/0.35),transparent_65%)]" />
              <div aria-hidden="true" className="grain absolute inset-0 -z-10" />
              <span className="grid size-11 place-items-center rounded-xl bg-paper-50/10 text-blush-300 ring-1 ring-paper-50/15">
                <MessageCircleQuestion className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-5 font-display text-[1.65rem] leading-tight">Still have a question?</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-paper-200/80">Message the clinic and the team will help you before your visit.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a {...linkProps(whatsappHref('Hello, I have a question before my visit.'))} className="btn-primary min-h-11 px-5 text-sm">
                  <WhatsAppIcon className="size-4" /> Ask on WhatsApp
                </a>
                <a {...linkProps(telHref())} className="btn-ghost-light min-h-11 px-5 text-sm">
                  <Phone className="size-4" aria-hidden="true" /> Call
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="lg:col-span-7 xl:col-span-8">
          <p data-reveal className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {faqs.length} questions
          </p>
          <ul data-reveal className="space-y-3">
            {faqs.map((f, i) => (
              <Item key={i} {...f} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
