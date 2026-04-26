import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import g1 from '../../assets/gallery_1.webp'
import g2 from '../../assets/gallery_2.webp'
import g3 from '../../assets/gallery_3.webp'
import g4 from '../../assets/gallery_4.webp'
import g5 from '../../assets/gallery_5.webp'
import g6 from '../../assets/gallery_6.webp'
import g7 from '../../assets/gallery_7.webp'

gsap.registerPlugin(ScrollTrigger)

const photos = [
  { src: g1, caption: 'Samarpanam — An offering from the soul.', alt: 'In devotion, every gesture becomes prayer.' },
  { src: g2, caption: 'Nritta in its purest rhythm', alt: 'Every beat held in balance' },
  { src: g3, caption: 'Leap of Devotion', alt: 'In silence, a thousand emotions unfold.' },
  { src: g4, caption: 'Balance. Control. Presence', alt: 'A moment lifted, a feeling offered' },
  { src: g5, caption: 'Abhinaya — where the dancer speaks.', alt: 'What the heart seeks, the hands reveal.' },
  { src: g6, caption: 'Where posture becomes poetry.', alt: 'Every angle tells a story' },
  { src: g7, caption: 'In stillness, the deepest expressions arise', alt: 'With both hands, I offer and surrender.' },
]

export default function Gallery() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      )

      // Staggered cards
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { opacity: 0, scale: 0.88, y: 40 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.07,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="gallery-section py-28 px-6 md:px-12 lg:px-20"
    >
      {/* Header */}
      <div ref={titleRef} className="text-center mb-16">
        <p className="section-label mb-4">Portfolio</p>
        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: 'var(--gold-pale)',
            letterSpacing: '0.03em',
          }}
        >
          The Stage, <em style={{ color: 'var(--gold)' }}>Frozen in Time</em>
        </h2>
        <div className="gold-divider" />
        <p style={{ color: 'rgba(245,230,200,0.5)', fontSize: '0.875rem', maxWidth: '480px', margin: '0 auto' }}>
          Each frame captures a moment of devotion — where the body becomes the temple
          and movement becomes prayer.
        </p>
      </div>

      {/* Grid */}
      <div className="gallery-grid max-w-6xl mx-auto">
        {photos.map(({ src, caption, alt }, i) => (
          <div
            key={i}
            ref={el => itemRefs.current[i] = el}
            className="gallery-item"
            style={{
              minHeight: i === 0 || i === 3 ? '500px' : '240px',
            }}
          >
            <img src={src} alt={alt} loading="lazy" />
            <div className="gallery-overlay">
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: 'var(--gold-pale)',
                  letterSpacing: '0.05em',
                }}
              >
                {caption}
              </p>
            </div>
            <div className="gallery-glow" />
          </div>
        ))}
      </div>
    </section>
  )
}
