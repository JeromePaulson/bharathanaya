import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ExternalLink } from 'lucide-react'

const videos = [
  {
    id: 'v1',
    title: 'Pushpanjali — An Offering of Flowers',
    description: 'The sacred opening invocation of Bharatanatyam, rendered with devotion at the Margazhi Mahotsavam 2024.',
    duration: '12:43',
    venue: 'Music Academy, Chennai',
    thumb: 'linear-gradient(135deg, #2A1208 0%, #4A1A0A 50%, #1A0A05 100%)',
    youtubeId: 'dQw4w9WgXcQ', // replace with real IDs
  },
  {
    id: 'v2',
    title: 'Varnam — Sapta Swara',
    description: 'The centrepiece of the Margam — a 45-minute odyssey through the seven swaras of classical music.',
    duration: '44:12',
    venue: 'Edinburgh International Festival',
    thumb: 'linear-gradient(135deg, #1A0A14 0%, #3A1028 50%, #120A1A 100%)',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 'v3',
    title: 'Thillana — Dhanashree',
    description: 'An exhilarating Thillana in the Dhanashree ragam, celebrating rhythm and joy.',
    duration: '08:27',
    venue: 'ICCR, New Delhi',
    thumb: 'linear-gradient(135deg, #0A1A0A 0%, #1A3A10 50%, #0A1205 100%)',
    youtubeId: 'dQw4w9WgXcQ',
  },
]

function VideoPlaceholder({ video, isActive }) {
  return (
    <div
      className="video-placeholder"
      style={{ background: video.thumb }}
    >
      {/* Decorative grid lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(201,151,59,0.03) 60px,rgba(201,151,59,0.03) 61px)',
        pointerEvents: 'none',
      }} />

      {/* Center glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(201,151,59,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Play button */}
      <div className="play-btn" style={{ position: 'relative', zIndex: 2 }}>
        <Play
          size={22}
          fill="rgba(201,151,59,0.8)"
          style={{ color: 'rgba(201,151,59,0.8)', marginLeft: '3px' }}
        />
      </div>

      {/* Duration */}
      <span style={{
        position: 'absolute',
        bottom: 12, right: 14,
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.7rem',
        color: 'rgba(245,230,200,0.5)',
        letterSpacing: '0.1em',
      }}>
        {video.duration}
      </span>

      {/* Live tag */}
      {isActive && (
        <div style={{
          position: 'absolute',
          top: 12, left: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <span style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: 'var(--gold)',
            boxShadow: '0 0 8px var(--gold)',
            display: 'block',
          }} />
          <span className="section-label" style={{ fontSize: '0.55rem' }}>Featured</span>
        </div>
      )}
    </div>
  )
}

export default function Videos() {
  const [activeIdx, setActiveIdx] = useState(0)

  const switchVideo = (idx) => {
    setActiveIdx(idx)
  }

  const active = videos[activeIdx]

  return (
    <section
      id="videos"
      className="video-section py-28 px-6 md:px-12 lg:px-20"
    >
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p className="section-label mb-4">Performances</p>
        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: 'var(--gold-pale)',
            letterSpacing: '0.03em',
          }}
        >
          Watch the <em style={{ color: 'var(--gold)' }}>Dance Live</em>
        </h2>
        <div className="gold-divider" />
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Featured video */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={active.id}
            className="lg:col-span-2 video-card rounded-sm overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <VideoPlaceholder video={active} isActive />

            <div className="p-6">
              <h3
                className="font-serif mb-2"
                style={{ fontSize: '1.5rem', color: 'var(--gold-pale)' }}
              >
                {active.title}
              </h3>
              <p style={{
                fontSize: '0.825rem', color: 'rgba(245,230,200,0.5)',
                fontFamily: 'Inter, sans-serif', lineHeight: 1.7, marginBottom: '1rem'
              }}>
                {active.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="section-label" style={{ fontSize: '0.6rem' }}>
                  {active.venue}
                </span>
                <a
                  href={`https://youtube.com/watch?v=${active.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2"
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--gold)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'color 0.3s',
                  }}
                >
                  Watch Full <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Thumbnails sidebar */}
        <div className="flex flex-col gap-4">
          {videos.map((v, i) => (
            <motion.div
              key={v.id}
              className="video-card rounded-sm overflow-hidden cursor-pointer"
              style={{
                border: i === activeIdx
                  ? '1px solid rgba(201,151,59,0.5)'
                  : '1px solid rgba(201,151,59,0.1)',
                boxShadow: i === activeIdx ? '0 0 20px rgba(201,151,59,0.1)' : 'none',
              }}
              onClick={() => switchVideo(i)}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
            >
              <div style={{ aspectRatio: '16/9', background: v.thumb, position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Play size={18} style={{ color: 'rgba(201,151,59,0.7)' }} />
                </div>
                <span style={{
                  position: 'absolute', bottom: 8, right: 10,
                  fontSize: '0.6rem', color: 'rgba(245,230,200,0.5)',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {v.duration}
                </span>
              </div>
              <div className="p-3">
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '0.9rem',
                  color: i === activeIdx ? 'var(--gold-light)' : 'var(--gold-pale)',
                  lineHeight: 1.3,
                }}>
                  {v.title}
                </p>
                <p className="section-label mt-1" style={{ fontSize: '0.55rem' }}>
                  {v.venue}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
