import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { faqs } from '../content/clinic'
import { SectionHeading } from './ui/primitives'

function Item({ q, a, open, onToggle }) {
  const id = useId()
  return (
    <li className="border-b border-navy-900/10">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-6 py-7 text-left font-display text-2xl leading-snug transition-colors duration-200 hover:text-navy-600 md:text-[1.75rem]"
        >
          {q}
          <span
            aria-hidden="true"
            className={`grid size-10 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-cinematic)] ${
              open ? 'rotate-45 border-navy-900 bg-navy-900 text-paper-50' : 'border-navy-900/20'
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
        className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-cinematic)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden" inert={!open ? '' : undefined}>
          <p className="max-w-2xl pb-8 pr-14 text-muted leading-relaxed">{a}</p>
        </div>
      </div>
    </li>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 md:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading eyebrow="Questions" title={<span id="faq-title">Before you visit.</span>} intro="Answers to the questions patients ask us most often." />
          </div>
        </div>
        <ul data-reveal className="border-t border-navy-900/10 lg:col-span-8">
          {faqs.map((f, i) => (
            <Item key={i} {...f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </ul>
      </div>
    </section>
  )
}
