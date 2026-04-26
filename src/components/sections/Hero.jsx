import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroFoot from '../../assets/hero_foot.png'

gsap.registerPlugin(ScrollTrigger)

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
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const overlayTextRef = useRef(null)
  const scrollHintRef = useRef(null)

  const [beats, setBeats] = useState(false)
  const lastProgressRef = useRef(0)
  const impactTriggeredRef = useRef(false)

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

    // Initial entrance
    gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 40 })
    gsap.set(foot, { y: -30, rotateX: -20, transformPerspective: 800 })

    gsap.to(foot, {
      y: 0, rotateX: 0,
      duration: 1.8, ease: 'power3.out', delay: 0.8
    })

    // Pinned scroll animation
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 0.8,
      onUpdate: (self) => {
        const progress = self.progress

        // Phase 1 (0–0.35): foot lifts and comes down
        if (progress < 0.35) {
          const t = progress / 0.35
          // Foot lifts up (0 → 0.5), then strikes down (0.5 → 1)
          const liftPhase = t < 0.5 ? t * 2 : (1 - t) * 2
          gsap.set(foot, {
            y: -liftPhase * 60,
            rotateX: liftPhase * 15,
            transformPerspective: 800,
          })
        }

        // Impact at progress ~0.35
        if (progress >= 0.33 && progress < 0.38 && !impactTriggeredRef.current) {
          impactTriggeredRef.current = true

          // Ripple effect
          gsap.fromTo(ripple,
            { scale: 0, opacity: 0.8 },
            { scale: 5, opacity: 0, duration: 0.7, ease: 'power2.out' }
          )

          // Particles
          const rect = canvas.getBoundingClientRect()
          const footRect = foot.getBoundingClientRect()
          const cx = footRect.left - rect.left + footRect.width / 2
          const cy = footRect.bottom - rect.top
          spawnParticles(canvas, cx, cy)

          // Beat flash
          setBeats(true)
          setTimeout(() => setBeats(false), 600)

          // Title reveal
          gsap.to(titleRef.current, {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.1
          })
          gsap.to(subtitleRef.current, {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.35
          })
        }

        // Reset for second strike
        if (progress >= 0.38) impactTriggeredRef.current = false

        // Phase 2 (0.45–0.8): second strike, camera pull back
        if (progress >= 0.45 && progress < 0.8) {
          const t = (progress - 0.45) / 0.35
          const liftPhase2 = t < 0.5 ? t * 2 : (1 - t) * 2
          gsap.set(foot, {
            y: -liftPhase2 * 45,
            rotateX: liftPhase2 * 10,
            scale: 1 - liftPhase2 * 0.04,
            transformPerspective: 800,
          })
        }

        // Phase 3 (0.8–1): fade out / transition
        if (progress >= 0.8) {
          const t = (progress - 0.8) / 0.2
          gsap.set(section, { opacity: 1 - t * 0.4 })
        }

        lastProgressRef.current = progress
      }
    })

    // Scroll hint disappears
    gsap.to(scrollHintRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: 'top+=5% top',
        end: 'top+=15% top',
        scrub: true,
      }
    })

    return () => {
      st.kill()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-section"
      style={{ cursor: 'none' }}
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
        <p ref={subtitleRef} className="section-label mb-3" style={{ opacity: 0 }}>
          Classical Bharatanatyam
        </p>
        <h1
          ref={titleRef}
          className="font-serif"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: 'var(--gold-pale)',
            letterSpacing: '0.05em',
            opacity: 0,
            textShadow: '0 0 60px rgba(201,151,59,0.4)',
          }}
        >
          Devika Ajithkumar
        </h1>
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
      <div
        ref={scrollHintRef}
        style={{
          position: 'absolute',
          bottom: '4%',
          right: '6%',
          zIndex: 6,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span className="section-label" style={{ fontSize: '0.6rem', opacity: 0.5 }}>
          Scroll to begin
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(201,151,59,0.6), transparent)',
            animation: 'float 2s ease-in-out infinite',
          }}
        />
      </div>

      {/* Bottom fade to next section */}
      <div className="hero-footer-fade" />
    </section>
  )
}
