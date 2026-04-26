import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current

    const onMove = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.05, ease: 'none' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.18, ease: 'power2.out' })
    }

    const onEnter = () => dot.classList.add('hovering')
    const onLeave = () => dot.classList.remove('hovering')

    window.addEventListener('mousemove', onMove)

    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    // Hide on mobile
    if ('ontouchstart' in window) {
      dot.style.display = 'none'
      ring.style.display = 'none'
    }

    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="custom-cursor" />
      <div ref={ringRef} className="cursor-trail" />
    </>
  )
}
