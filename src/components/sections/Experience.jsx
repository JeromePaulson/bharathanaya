import { motion } from 'framer-motion'
import { Award, Star, MapPin, Calendar } from 'lucide-react'

const events = [
  {
    year: '2026',
    title: 'Kalasamdhyotsavam',
    venue: 'Changampuzha Park, Kochi',
    type: 'group performance',
    description: 'A mesmerizing performance of Bharatanatyam, showcasing the classical dance form\'s grace and storytelling.',
    award: false,
  },
  {
    year: '2025',
    title: 'Kalamandalam',
    venue: 'Mookambika Temple, Kollur',
    type: ' group performance',
    description: 'A mesmerizing performance of Bharatanatyam, dedicated to Goddess Mookambika',
    award: false,
  },
  {
    year: '2025',
    title: 'Margazhi',
    venue: 'Guruvayoor Temple Auditorium',
    type: 'Arangettam',
    description: 'Arangettam in Bharatanatyam. In the presence of Deity of Lord Sri Krishna of Guruvayoor',
    award: false,
  }
]

const typeColors = {
  performance: 'var(--maroon-light)',
  award: 'var(--gold)',
  training: '#4A6FA5',
}

const typeLabels = {
  performance: 'Performance',
  award: 'Award',
  training: 'Training',
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="experience-section py-28 px-6 md:px-12 lg:px-20"
    >
      {/* Header */}
      <motion.div 
        className="text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p className="section-label mb-4">Journey</p>
        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: 'var(--gold-pale)',
            letterSpacing: '0.03em',
          }}
        >
          A Legacy Written<br />
          <em style={{ color: 'var(--gold)' }}>in Rhythm</em>
        </h2>
        <div className="gold-divider" />
      </motion.div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto relative" style={{ minHeight: '600px' }}>
        <motion.div 
          className="timeline-line" 
          initial={{ scaleY: 0, transformOrigin: 'top center' }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        <div className="flex flex-col gap-12">
          {events.map((event, i) => {
            const isLeft = i % 2 === 0
            return (
              <div
                key={i}
                className="relative flex"
                style={{
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                }}
              >
                <motion.div
                  className="timeline-card p-7 rounded-sm"
                  style={{
                    width: 'min(45%, 380px)',
                    marginLeft: isLeft ? 0 : 'auto',
                    marginRight: isLeft ? 'auto' : 0,
                  }}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.85, delay: i * 0.1, ease: "easeOut" }}
                >
                  {/* Year */}
                  <p
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '2.5rem',
                      fontWeight: 300,
                      color: 'rgba(201,151,59,0.25)',
                      lineHeight: 1,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {event.year}
                  </p>

                  {/* Type badge */}
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="section-label"
                      style={{
                        fontSize: '0.6rem',
                        color: typeColors[event.type],
                        borderBottom: `1px solid ${typeColors[event.type]}`,
                        paddingBottom: '2px',
                      }}
                    >
                      {typeLabels[event.type]}
                    </span>
                    {event.award && (
                      <Award size={14} style={{ color: 'var(--gold)' }} />
                    )}
                  </div>

                  <h3
                    className="font-serif mb-2"
                    style={{
                      fontSize: '1.3rem',
                      color: 'var(--gold-pale)',
                    }}
                  >
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-4" style={{ color: 'rgba(245,230,200,0.4)' }}>
                    <MapPin size={11} />
                    <span style={{ fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}>
                      {event.venue}
                    </span>
                  </div>

                  <p style={{
                    fontSize: '0.825rem',
                    color: 'rgba(245,230,200,0.55)',
                    lineHeight: 1.7,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                  }}>
                    {event.description}
                  </p>
                </motion.div>

                {/* Timeline dot */}
                <div
                  className="timeline-dot"
                  style={{
                    left: isLeft ? 'auto' : '50%',
                    right: isLeft ? '50%' : 'auto',
                    transform: isLeft
                      ? 'translateX(50%) translateY(-50%)'
                      : 'translateX(-50%) translateY(-50%)',
                    top: '50%',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
