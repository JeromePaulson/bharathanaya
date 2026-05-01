import { motion } from 'framer-motion'
import dancerPortrait from '../../assets/devika_ajithkumar_dancer_portrait.webp'

const bioLines = [
  'Born into a lineage of classical artists,',
  'Devika Ajithkumar has dedicated her life',
  'to the ancient art of Bharatanatyam —',
  'a sacred language of gesture, rhythm, and devotion.',
]

const details = [
  { label: 'Lineage', value: 'Kalakshetra Tradition' },
  { label: 'Guru', value: 'RLV Suma Raj Menon' },
  { label: 'Training', value: '3+ years' },
  { label: 'Arangetram', value: 'Guruvayoor Temple, 2025' },
]

export default function About() {
  return (
    <section
      id="about"
      className="about-section py-32 px-6 md:px-16 lg:px-24"
    >
      <div className="temple-texture" />

      {/* Decorative mandala */}
      <svg
        className="mandala-svg"
        style={{
          position: 'absolute',
          top: '50%',
          right: '-200px',
          transform: 'translateY(-50%)',
          width: '600px',
          height: '600px',
        }}
        viewBox="0 0 200 200"
        fill="none"
      >
        {[...Array(12)].map((_, i) => (
          <g key={i} transform={`rotate(${i * 30} 100 100)`}>
            <ellipse cx="100" cy="30" rx="6" ry="20" fill="rgba(201,151,59,0.8)" />
            <circle cx="100" cy="15" r="3" fill="rgba(201,151,59,0.6)" />
          </g>
        ))}
        <circle cx="100" cy="100" r="15" fill="none" stroke="rgba(201,151,59,0.6)" strokeWidth="1" />
        <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(201,151,59,0.3)" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(201,151,59,0.2)" strokeWidth="0.5" />
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image column */}
          <div className="order-2 lg:order-1">
            <motion.div 
              className="about-image-wrap" 
              style={{ maxWidth: '460px' }}
              initial={{ y: 40, opacity: 0, scale: 0.97 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <img
                src={dancerPortrait}
                alt="Devika Ajithkumar – Bharatanatyam dancer"
                className="w-full block"
                style={{
                  aspectRatio: '3/4',
                  objectFit: 'cover',
                  filter: 'contrast(1.05) brightness(0.95)',
                }}
                loading="lazy"
              />
              {/* Corner accents */}
              <div style={{
                position: 'absolute', top: -12, left: -12,
                width: 24, height: 24,
                borderTop: '1px solid var(--gold)',
                borderLeft: '1px solid var(--gold)',
              }} />
              <div style={{
                position: 'absolute', bottom: -12, right: -12,
                width: 24, height: 24,
                borderBottom: '1px solid var(--gold)',
                borderRight: '1px solid var(--gold)',
              }} />
            </motion.div>
          </div>

          {/* Text column */}
          <div className="order-1 lg:order-2">
            <motion.p 
              className="section-label mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              About the Artist
            </motion.p>

            <motion.h2
              className="font-serif mb-2"
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                color: 'var(--gold-pale)',
                letterSpacing: '0.02em',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              A Story Told<br />
              <em style={{ color: 'var(--gold)' }}>in Motion</em>
            </motion.h2>

            <div className="gold-divider" style={{ margin: '1.5rem 0' }} />

            {/* Bio */}
            <div className="mb-10" style={{ lineHeight: 2 }}>
              {bioLines.map((line, i) => (
                <motion.p
                  key={i}
                  style={{
                    fontSize: '1.05rem',
                    color: 'rgba(245,230,200,0.8)',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontStyle: i === 2 ? 'italic' : 'normal',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.18, ease: "easeOut" }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Detail grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              {details.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                >
                  <p className="section-label mb-1" style={{ fontSize: '0.6rem' }}>{label}</p>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--gold-pale)',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                  }}>{value}</p>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <blockquote
              style={{
                marginTop: '2.5rem',
                paddingLeft: '1.5rem',
                borderLeft: '2px solid rgba(201,151,59,0.4)',
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
                fontSize: '1.1rem',
                color: 'rgba(245,230,200,0.6)',
                lineHeight: 1.7,
              }}
            >
              "Dance is not merely movement — it is the prayer the body makes to the universe."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
