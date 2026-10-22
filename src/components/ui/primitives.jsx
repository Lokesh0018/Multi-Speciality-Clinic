import { ImageIcon } from 'lucide-react'

/** Simple Icons — WhatsApp (brand mark, 24×24). */
export function WhatsAppIcon({ className = 'size-[18px]' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

const TONES = {
  crimson: 'from-crimson-200 via-crimson-100 to-paper-200 text-navy-700',
  blush: 'from-blush-200 via-blush-100 to-paper-200 text-navy-700',
  navy: 'from-navy-700 via-navy-800 to-navy-950 text-blush-200',
  paper: 'from-paper-200 via-paper-100 to-crimson-100 text-navy-700',
}

/**
 * Photography frame. Renders the image when `src` is set, otherwise an
 * on-brand placeholder describing the shot required. The inner layer is
 * oversized and tagged `data-parallax` for the GSAP scroll drift.
 */
export function MediaFrame({ src, alt = '', label, tone = 'crimson', className = '', rounded = 'rounded-[1.75rem]', parallax = true }) {
  return (
    <div className={`relative isolate overflow-hidden ${rounded} ${className}`}>
      <div data-parallax={parallax ? '' : undefined} className="absolute inset-x-0 -inset-y-[8%]">
        {src ? (
          <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        ) : (
          <div role="img" aria-label={alt || label} className={`grain relative h-full w-full bg-gradient-to-br ${TONES[tone]}`}>
            <div className="absolute -right-1/4 -top-1/4 size-[80%] rounded-full bg-paper-50/25 blur-3xl" />
          </div>
        )}
      </div>
      {!src && label && (
        <div className={`pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm ${tone === 'navy' ? 'bg-paper-50/10 text-blush-200' : 'bg-paper-50/70 text-navy-700'}`}>
          <ImageIcon className="size-3.5" aria-hidden="true" />
          {label}
        </div>
      )}
    </div>
  )
}

export function SectionHeading({ eyebrow, title, intro, align = 'left', tone = 'light', className = '' }) {
  const center = align === 'center'
  const dark = tone === 'dark'
  return (
    <div data-reveal className={`${center ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${dark ? 'text-blush-300' : 'text-crimson-600'}`}>{eyebrow}</p>}
      <h2 className={`display-lg mt-5 text-balance ${dark ? 'text-paper-50' : 'text-navy-900'}`}>{title}</h2>
      {intro && <p className={`mt-6 text-pretty ${dark ? 'text-paper-200/80 text-lg leading-relaxed' : 'lede'}`}>{intro}</p>}
    </div>
  )
}
