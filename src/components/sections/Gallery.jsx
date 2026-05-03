import { useState, useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ProtectedImage from '../ProtectedImage'

import g1 from '../../assets/devika_ajithkumar_gallery_1.webp'
import g2 from '../../assets/devika_ajithkumar_gallery_2.webp'
import g3 from '../../assets/devika_ajithkumar_gallery_3.webp'
import g4 from '../../assets/devika_ajithkumar_gallery_4.webp'
import g5 from '../../assets/devika_ajithkumar_gallery_5.webp'
import g6 from '../../assets/devika_ajithkumar_gallery_6.webp'
import g7 from '../../assets/devika_ajithkumar_gallery_7.webp'
import g10 from '../../assets/devika_ajithkumar_gallery_10.webp'
import g11 from '../../assets/devika_ajithkumar_gallery_11.webp'
import g12 from '../../assets/devika_ajithkumar_gallery_12.webp'
import g13 from '../../assets/devika_ajithkumar_gallery_13.webp'
import g14 from '../../assets/devika_ajithkumar_gallery_14.webp'


const photos = [
  { src: g2, caption: 'Nritta in its purest rhythm', alt: 'Every beat held in balance' },
  { src: g7, caption: 'In stillness, the deepest expressions arise', alt: 'With both hands, I offer and surrender.' },
  { src: g1, caption: 'Samarpanam — An offering from the soul.', alt: 'In devotion, every gesture becomes prayer.' },
  { src: g3, caption: 'Leap of Devotion', alt: 'In silence, a thousand emotions unfold.' },
  { src: g5, caption: 'Abhinaya — where the dancer speaks.', alt: 'What the heart seeks, the hands reveal.' },
  { src: g6, caption: 'Where posture becomes poetry.', alt: 'Every angle tells a story' },
  { src: g4, caption: 'Balance. Control. Presence', alt: 'A moment lifted, a feeling offered' },
  { src: g12, caption: 'The strength of tradition.', alt: 'A grounded stance.' },
  { src: g13, caption: 'Expressions of the soul.', alt: 'Facial expressions conveying the story.' },
  { src: g11, caption: 'Focus and discipline.', alt: 'Eyes tracing the movement.' },
  { src: g10, caption: 'Rhythm of the anklets.', alt: 'Ghungroo adorning the feet.' },
  { src: g14, caption: 'A timeless art.', alt: 'A beautiful silhouette.' },
]

/**
 * Compute inline transform styles for each coverflow item
 * based on its distance from the active center index.
 */
function getItemStyle(index, activeIndex) {
  const diff = index - activeIndex
  const absDiff = Math.abs(diff)
  const sign = diff < 0 ? -1 : 1

  if (diff === 0) {
    // Center / Active — no rotation, full clarity, sits in front
    return {
      transform: 'rotateY(0deg) translateX(0px) translateZ(var(--coverflow-active-z, 80px)) scale(1.15)',
      zIndex: 20,
      opacity: 1,
      filter: 'none',
    }
  }

  // Side items: pushed far enough so they never overlap center card
  const rotateY = sign * -50
  const translateX = `calc(${sign} * (var(--coverflow-spread, 300px) + ${absDiff - 1} * var(--coverflow-gap, 110px)))`
  const translateZ = `calc(var(--coverflow-z-base, -100px) + ${absDiff - 1} * var(--coverflow-z-gap, -60px))`
  const scale = Math.max(0.45, 0.78 - (absDiff - 1) * 0.1)
  const opacity = Math.max(0.12, 1 - absDiff * 0.28)
  const blur = Math.min(5, absDiff * 1.8)
  const brightness = Math.max(0.3, 0.7 - (absDiff - 1) * 0.15)

  return {
    transform: `rotateY(${rotateY}deg) translateX(${translateX}) translateZ(${translateZ}) scale(${scale})`,
    zIndex: 10 - absDiff,
    opacity,
    filter: `blur(${blur}px) brightness(${brightness})`,
  }
}

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(Math.floor(photos.length / 2))
  const [clickedIndex, setClickedIndex] = useState(null)
  const touchRef = useRef({ startX: 0, startY: 0 })
  const sectionRef = useRef(null)

  const goTo = useCallback((index) => {
    setActiveIndex(Math.max(0, Math.min(photos.length - 1, index)))
    setClickedIndex(null)
  }, [])

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goPrev, goNext])

  // Touch/swipe gestures
  const handleTouchStart = (e) => {
    touchRef.current.startX = e.touches[0].clientX
    touchRef.current.startY = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchRef.current.startX
    const dy = e.changedTouches[0].clientY - touchRef.current.startY
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx > 0) goPrev()
      else goNext()
    }
  }

  const handleItemClick = (index) => {
    if (index === activeIndex) {
      setClickedIndex(clickedIndex === index ? null : index)
    } else {
      setClickedIndex(null)
      goTo(index)
    }
  }

  return (
    <section
      id="gallery"
      className="coverflow-section"
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient stage lighting */}
      <div className="coverflow-spotlight" />

      {/* Header */}
      <motion.div 
        className="text-center coverflow-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
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
      </motion.div>

      {/* 3D Coverflow Stage */}
      <div className="coverflow-viewport">
        <div className="coverflow-stage">
          {photos.map(({ src, caption, alt }, i) => {
            const itemStyle = getItemStyle(i, activeIndex)
            const isActive = i === activeIndex
            const showCaption = isActive || clickedIndex === i

            return (
              <div
                key={i}
                className={`coverflow-item${isActive ? ' coverflow-item--active' : ''}`}
                style={{
                  transform: itemStyle.transform,
                  zIndex: itemStyle.zIndex,
                  opacity: itemStyle.opacity,
                  filter: itemStyle.filter,
                }}
                onClick={() => handleItemClick(i)}
                role="button"
                tabIndex={0}
                aria-label={`View image: ${alt}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleItemClick(i)
                }}
              >
                <motion.div 
                  className="coverflow-image-wrap"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                >
                  <ProtectedImage
                    src={src}
                    alt={alt}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </motion.div>

                {/* Reflection */}
                <motion.div 
                  className="coverflow-reflection" 
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.25 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.08 + 0.2, ease: "easeOut" }}
                >
                  <img src={src} alt="" draggable={false} loading="lazy" />
                </motion.div>

                {/* Caption overlay */}
                <div className={`coverflow-caption ${showCaption ? 'visible' : ''}`}>
                  <span className="coverflow-caption-text">{caption}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Glass floor line */}
        <div className="coverflow-floor" aria-hidden="true" />
      </div>

      {/* Navigation arrows */}
      <div className="coverflow-nav">
        <button 
          className="coverflow-arrow coverflow-arrow-prev"
          onClick={goPrev}
          disabled={activeIndex === 0}
          aria-label="Previous image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button 
          className="coverflow-arrow coverflow-arrow-next"
          onClick={goNext}
          disabled={activeIndex === photos.length - 1}
          aria-label="Next image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>

      {/* Indicator dots */}
      <div className="coverflow-dots">
        {photos.map((_, i) => (
          <button
            key={i}
            className={`coverflow-dot ${i === activeIndex ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
