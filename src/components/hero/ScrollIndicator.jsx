import { ArrowDown } from 'lucide-react'

export default function ScrollIndicator({ target = '#about' }) {
  return (
    <a
      href={target}
      data-scroll-cue
      className="group inline-flex min-h-11 cursor-pointer flex-col items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-paper-50/75 transition-colors hover:text-paper-50"
    >
      <span className="relative flex h-11 w-7 items-start justify-center overflow-hidden rounded-full border-[1.5px] border-paper-50/55 pt-2 transition-colors group-hover:border-paper-50">
        <ArrowDown className="hero-scroll-cue size-3.5" aria-hidden="true" />
      </span>
      Scroll to explore
    </a>
  )
}
