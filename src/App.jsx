import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Header from './components/Header'
import HeroSection from './components/hero/HeroSection'
import Intro from './components/Intro'
import Specialities from './components/Specialities'
import Journey from './components/Journey'
import Doctors from './components/Doctors'
import Branches from './components/Branches'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MobileActionBar from './components/MobileActionBar'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Motion hooks (all opt-in via data attributes, all disabled under reduced motion):
 *   (the hero owns its own intro timeline — see components/Hero.jsx)
 *   [data-reveal]     fade-up once when scrolled into view
 *   [data-parallax]    gentle vertical drift inside MediaFrame
 */
export default function App() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 36,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          })
        })

        gsap.utils.toArray('[data-parallax]').forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -5 },
            { yPercent: 5, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
          )
        })
      })
    },
    { scope: root },
  )

  return (
    <div ref={root}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-paper-50">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <HeroSection />
        <Intro />
        <Specialities />
        <Journey />
        <Doctors />
        <Branches />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  )
}
