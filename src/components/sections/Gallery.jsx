import { motion } from 'framer-motion'
import ProtectedImage from '../ProtectedImage'

import g1 from '../../assets/devika_ajithkumar_gallery_1.webp'
import g2 from '../../assets/devika_ajithkumar_gallery_2.webp'
import g3 from '../../assets/devika_ajithkumar_gallery_3.webp'
import g4 from '../../assets/devika_ajithkumar_gallery_4.webp'
import g5 from '../../assets/devika_ajithkumar_gallery_5.webp'
import g6 from '../../assets/devika_ajithkumar_gallery_6.webp'
import g7 from '../../assets/devika_ajithkumar_gallery_7.webp'
import g8 from '../../assets/devika_ajithkumar_gallery_8.webp'
import g10 from '../../assets/devika_ajithkumar_gallery_10.webp'
import g11 from '../../assets/devika_ajithkumar_gallery_11.webp'
import g12 from '../../assets/devika_ajithkumar_gallery_12.webp'
import g13 from '../../assets/devika_ajithkumar_gallery_13.webp'
import g14 from '../../assets/devika_ajithkumar_gallery_14.webp'


const photos = [
  { src: g10, caption: 'Rhythm of the anklets.', alt: 'Ghungroo adorning the feet.' },
  { src: g2, caption: 'Nritta in its purest rhythm', alt: 'Every beat held in balance' },
  { src: g3, caption: 'Leap of Devotion', alt: 'In silence, a thousand emotions unfold.' },
  { src: g6, caption: 'Where posture becomes poetry.', alt: 'Every angle tells a story' },
  { src: g1, caption: 'Samarpanam — An offering from the soul.', alt: 'In devotion, every gesture becomes prayer.' },
  { src: g14, caption: 'A timeless art.', alt: 'A beautiful silhouette.' },
  { src: g4, caption: 'Balance. Control. Presence', alt: 'A moment lifted, a feeling offered' },
  { src: g13, caption: 'Expressions of the soul.', alt: 'Facial expressions conveying the story.' },
  { src: g12, caption: 'The strength of tradition.', alt: 'A grounded stance.' },
  { src: g7, caption: 'In stillness, the deepest expressions arise', alt: 'With both hands, I offer and surrender.' },
  { src: g8, caption: 'Grace in motion.', alt: 'A captivating pose.' },
  { src: g11, caption: 'Focus and discipline.', alt: 'Eyes tracing the movement.' },
  { src: g5, caption: 'Abhinaya — where the dancer speaks.', alt: 'What the heart seeks, the hands reveal.' },
]

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="gallery-section py-28 px-6 md:px-12 lg:px-20"
    >
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
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

      {/* Grid */}
      <div className="gallery-grid max-w-6xl mx-auto">
        {photos.map(({ src, caption, alt }, i) => (
          <motion.div
            key={i}
            className="gallery-item"
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: i * 0.07, ease: "easeOut" }}
          >
            <ProtectedImage src={src} alt={alt} loading="lazy" />
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
          </motion.div>
        ))}
      </div>
    </section>
  )
}
