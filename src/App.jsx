import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Gallery from './components/sections/Gallery'
import Experience from './components/sections/Experience'
import Videos from './components/sections/Videos'
import Contact from './components/sections/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    // Connect Lenis with GSAP ticker
    const rafCb = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(rafCb)
    gsap.ticker.lagSmoothing(0)

    // Update ScrollTrigger on lenis scroll
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(rafCb)
    }
  }, [])

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Experience />
        {/* <Videos /> */}
        <Contact />
      </main>
    </>
  )
}
