import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

/**
 * Full-bleed background film. The poster is always painted underneath, so the
 * first frame never waits on the video; the video fades in once it can play and
 * stays hidden if autoplay is refused, a source 404s, or motion is reduced.
 */
const HeroVideo = forwardRef(function HeroVideo({ video, className = '', onTimeUpdate }, ref) {
  const el = useRef(null)
  const [state, setState] = useState('loading') // loading | playing | paused | failed

  useImperativeHandle(ref, () => ({
    toggle() {
      const v = el.current
      if (!v || state === 'failed') return
      if (v.paused) v.play().then(() => setState('playing')).catch(() => setState('failed'))
      else {
        v.pause()
        setState('paused')
      }
    },
    get state() {
      return state
    },
  }))

  useEffect(() => {
    const v = el.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.removeAttribute('autoplay')
      v.pause()
      setState('paused')
      return
    }
    const p = v.play()
    if (p) p.then(() => setState('playing')).catch(() => setState('paused'))
  }, [])

  const visible = state === 'playing'

  return (
    <div className={`absolute inset-0 overflow-hidden bg-neutral-950 ${className}`} aria-hidden="true">
      <img src={video.poster} alt="" fetchpriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <video
        ref={el}
        muted
        loop
        playsInline
        preload="metadata"
        poster={video.poster}
        onError={() => setState('failed')}
        onTimeUpdate={onTimeUpdate}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src={video.webm} type="video/webm" media="(min-width: 768px)" />
        <source src={video.mp4Mobile || video.mp4} type="video/mp4" media="(max-width: 767px)" />
        <source src={video.mp4} type="video/mp4" />
      </video>
    </div>
  )
})

export default HeroVideo
