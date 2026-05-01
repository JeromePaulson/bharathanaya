import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import heroFoot from '../../assets/hero_foot.webp'

// ─── Particle System ───
function spawnParticles(canvas, cx, cy) {
  const ctx = canvas.getContext('2d')
  const particles = []
  const count = 28

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8
    const speed = 1.5 + Math.random() * 3.5
    particles.push({
      x: cx, y: cy,
      vx: Math.cos(angle) * speed * (Math.random() * 0.6 + 0.4),
      vy: Math.sin(angle) * speed - Math.random() * 2,
      life: 1,
      decay: 0.02 + Math.random() * 0.03,
      size: 1 + Math.random() * 2.5,
      color: Math.random() > 0.5
        ? `rgba(201,151,59,`
        : `rgba(245,230,200,`,
    })
  }

  let raf
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let alive = false
    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.08 // gravity
      p.life -= p.decay
      if (p.life > 0) {
        alive = true
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${p.life.toFixed(2)})`
        ctx.fill()
      }
    })
    if (alive) raf = requestAnimationFrame(animate)
    else ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  animate()
  return () => cancelAnimationFrame(raf)
}

// ─── Rhythm Indicator ───
function RhythmBar({ beats }) {
  const heights = [10, 16, 24, 18, 12, 20, 28, 14, 10, 22, 30, 16]
  return (
    <div className="rhythm-bar" aria-label="Rhythm indicator">
      {heights.map((h, i) => (
        <div
          key={i}
          className="rhythm-beat"
          style={{
            height: beats ? `${h}px` : '4px',
            opacity: beats ? (0.4 + (i % 4) * 0.15) : 0.2,
            transition: `height ${0.1 + i * 0.02}s ease, opacity 0.15s ease`,
            background: beats
              ? 'linear-gradient(to top, var(--gold), var(--gold-light))'
              : 'var(--gold)',
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const footRef = useRef(null)
  const canvasRef = useRef(null)
  const rippleRef = useRef(null)

  const [beats, setBeats] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Hero Parallax (subtle upward movement and gradual opacity fade)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const section = sectionRef.current
    const foot = footRef.current
    const canvas = canvasRef.current
    const ripple = rippleRef.current

    // Resize canvas
    const resize = () => {
      canvas.width = section.offsetWidth
      canvas.height = section.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Simulate foot strike impact once on mount
    const triggerImpact = () => {
      ripple.animate([
        { transform: 'translateX(-50%) scale(0)', opacity: 0.8 },
        { transform: 'translateX(-50%) scale(5)', opacity: 0 }
      ], { duration: 700, easing: 'ease-out', fill: 'forwards' })

      // Particles
      const rect = canvas.getBoundingClientRect()
      const footRect = foot.getBoundingClientRect()
      const cx = footRect.left - rect.left + footRect.width / 2
      const cy = footRect.bottom - rect.top
      spawnParticles(canvas, cx, cy)

      // Beat flash
      setBeats(true)
      setTimeout(() => setBeats(false), 600)
    }

    // Foot initial entrance drop animation
    const animation = foot.animate([
      { transform: 'translateY(-60px) rotateX(-15deg)', offset: 0 },
      { transform: 'translateY(0) rotateX(0deg)', offset: 1 }
    ], { duration: 800, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', fill: 'both', delay: 200 })
    
    animation.onfinish = () => {
      triggerImpact()
    }

    return () => {
      window.removeEventListener('resize', resize)
      animation.cancel()
    }
  }, [])

  return (
    <motion.section
      ref={sectionRef}
      id="home"
      className="hero-section"
      style={{ cursor: 'none', y, opacity }}
    >
      {/* Stage lighting overlay */}
      <div className="hero-stage-light" />

      {/* Secondary warm light from below */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '50%',
          height: '40%',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(107,15,26,0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Canvas for particles */}
      <canvas ref={canvasRef} className="particle-canvas" />

      {/* Vignette */}
      <div className="hero-vignette" />

      {/* Main foot image */}
      <div
        ref={footRef}
        className="foot-container"
        style={{ willChange: 'transform' }}
      >
        <img
          src={heroFoot}
          alt="Bharatanatyam dancer's ghungroo-adorned foot"
          style={{
            width: 'min(520px, 90vw)',
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 20px 60px rgba(107,15,26,0.6)) drop-shadow(0 0 30px rgba(201,151,59,0.2))',
            userSelect: 'none',
          }}
          draggable={false}
        />

        {/* Floor ripple ring */}
        <div
          ref={rippleRef}
          className="ripple-ring"
          style={{ width: '120px', height: '12px', opacity: 0 }}
        />

        {/* Floor line */}
        <div
          style={{
            position: 'absolute',
            bottom: -16,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(201,151,59,0.4), transparent)',
          }}
        />
      </div>

      {/* Hero Text */}
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 6,
          width: '100%',
          padding: '0 2rem',
        }}
      >
        <motion.p 
          className="section-label mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          Classical Bharatanatyam
        </motion.p>
        <motion.h1
          className="font-serif"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: 'var(--gold-pale)',
            letterSpacing: '0.05em',
            textShadow: '0 0 60px rgba(201,151,59,0.4)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          Devika Ajithkumar
        </motion.h1>
      </div>

      {/* Rhythm indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <RhythmBar beats={beats} />
        <p className="section-label" style={{ fontSize: '0.55rem', opacity: 0.5 }}>
          Ta — Ka — Di — Mi
        </p>
      </div>

      {/* Scroll hint */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '4%',
          right: '6%',
          zIndex: 6,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        {/* <span className="section-label" style={{ fontSize: '0.6rem', opacity: 0.5 }}>
          Scroll to begin
        </span> */}
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(201,151,59,0.6), transparent)',
            animation: 'float 2s ease-in-out infinite',
          }}
        />
      </motion.div>

      {/* Bottom fade to next section */}
      <div className="hero-footer-fade" />
    </motion.section>
  )
}
