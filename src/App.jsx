import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

import { useDisableRightClick } from './hooks/useDisableRightClick'

import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Gallery from './components/sections/Gallery'
import Experience from './components/sections/Experience'
import Videos from './components/sections/Videos'
import Contact from './components/sections/Contact'

export default function App() {
  const lenisRef = useRef(null)
  
  // Enable global content protection
  useDisableRightClick()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.2, // Increased duration for a much smoother, floaty scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85, // Slightly gentler mouse wheel speed
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    
    rafId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
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
