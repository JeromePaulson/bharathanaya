import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import ProtectedImage from '../ProtectedImage'
import heroFoot from '../../assets/hero_foot.webp'



// ─── Rhythm Indicator ───
function RhythmBar({ playing }) {
  const bars = 12;
  return (
    <div className="rhythm-bar" aria-label="Rhythm indicator" style={{ display: 'flex', gap: '5px', alignItems: 'flex-end', height: '32px' }}>
      {[...Array(bars)].map((_, i) => {
        // Create an organic feeling rhythm matching ta-ka-di-mi
        const isStrongBeat = i % 4 === 0;
        const baseHeight = isStrongBeat ? 16 : 8;
        const peakHeight = isStrongBeat ? 32 : 20 + (i % 2) * 6;
        
        return (
          <motion.div
            key={i}
            className="rhythm-beat"
            style={{
              width: '3px',
              borderRadius: '2px',
              background: 'linear-gradient(to top, rgba(201,151,59,0.3), var(--gold-light))',
              boxShadow: playing ? '0 0 10px rgba(201,151,59,0.3)' : 'none',
              transformOrigin: 'bottom',
            }}
            animate={
              playing 
                ? { height: [`${baseHeight}px`, `${peakHeight}px`, `${baseHeight}px`], opacity: [0.5, 1, 0.5] }
                : { height: '4px', opacity: 0.3 }
            }
            transition={{
              duration: 1.6, // representing a cycle of 4 beats
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 4) * 0.3 + (i * 0.05), // staggered wave effect
            }}
          />
        )
      })}
    </div>
  )
}

// Static dust particles — reduced to 8 for performance
const DUST_PARTICLES = Array.from({ length: 8 }).map(() => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1,
  baseOpacity: Math.random() * 0.2 + 0.05,
  delay: Math.random() * 10,
  duration: 18 + Math.random() * 12,
  xMove: (Math.random() - 0.5) * 40,
  yMove: -40 - Math.random() * 60
}));

// ─── Hero Background Classical Patterns (desktop only) ───
function HeroBackground() {
  return (
    <div className="hidden lg:block absolute inset-0 pointer-events-none z-[2] overflow-hidden">

      {/* ── Top tala border ── */}
      <motion.svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1440 60"
        fill="none"
        stroke="rgba(201,151,59,0.35)"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <line x1="0" y1="8" x2="1440" y2="8" />
        {Array.from({ length: 72 }).map((_, i) => (
          <path key={i} d={`M${i * 20} 20 L${i * 20 + 10} 30 L${i * 20 + 20} 20 L${i * 20 + 10} 10 Z`} />
        ))}
        <line x1="0" y1="40" x2="1440" y2="40" strokeDasharray="4 8" />
      </motion.svg>

      {/* ── Bottom tala border ── */}
      <motion.svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 60"
        fill="none"
        stroke="rgba(201,151,59,0.30)"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
      >
        <line x1="0" y1="52" x2="1440" y2="52" />
        {Array.from({ length: 72 }).map((_, i) => (
          <path key={i} d={`M${i * 20} 40 L${i * 20 + 10} 30 L${i * 20 + 20} 40 L${i * 20 + 10} 50 Z`} />
        ))}
        <line x1="0" y1="20" x2="1440" y2="20" strokeDasharray="4 8" />
      </motion.svg>

      {/* ── Corner Rangoli — Top Left ── */}
      <motion.svg
        className="absolute top-0 left-0 w-[320px] h-[320px]"
        viewBox="0 0 200 200"
        fill="none"
        stroke="rgba(201,151,59,0.35)"
        strokeWidth="1"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M0 0 Q100 0 100 100 Q100 0 200 0" />
        <path d="M0 0 Q80 0 80 80 Q80 0 160 0" strokeDasharray="3 5" />
        {[...Array(8)].map((_, i) => (
          <path key={i} d="M0 0 L60 0 Q30 30 0 60 Z" transform={`rotate(${i * 10} 0 0)`} />
        ))}
        <circle cx="0" cy="0" r="30" strokeDasharray="4 6" />
        <circle cx="0" cy="0" r="60" strokeDasharray="2 7" />
        {[...Array(6)].map((_, i) => (
          <path key={i} d="M0 0 L90 10" transform={`rotate(${i * 15} 0 0)`} />
        ))}
      </motion.svg>

      {/* ── Corner Rangoli — Top Right ── */}
      <motion.svg
        className="absolute top-0 right-0 w-[320px] h-[320px]"
        viewBox="0 0 200 200"
        fill="none"
        stroke="rgba(201,151,59,0.35)"
        strokeWidth="1"
        style={{ transform: 'scaleX(-1)' }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <path d="M0 0 Q100 0 100 100 Q100 0 200 0" />
        <path d="M0 0 Q80 0 80 80 Q80 0 160 0" strokeDasharray="3 5" />
        {[...Array(8)].map((_, i) => (
          <path key={i} d="M0 0 L60 0 Q30 30 0 60 Z" transform={`rotate(${i * 10} 0 0)`} />
        ))}
        <circle cx="0" cy="0" r="30" strokeDasharray="4 6" />
        <circle cx="0" cy="0" r="60" strokeDasharray="2 7" />
        {[...Array(6)].map((_, i) => (
          <path key={i} d="M0 0 L90 10" transform={`rotate(${i * 15} 0 0)`} />
        ))}
      </motion.svg>

      {/* ── Corner Rangoli — Bottom Left ── */}
      <motion.svg
        className="absolute bottom-0 left-0 w-[240px] h-[240px]"
        viewBox="0 0 200 200"
        fill="none"
        stroke="rgba(201,151,59,0.28)"
        strokeWidth="1"
        style={{ transform: 'scaleY(-1)' }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <path d="M0 0 Q100 0 100 100 Q100 0 200 0" />
        <path d="M0 0 Q80 0 80 80 Q80 0 160 0" strokeDasharray="3 5" />
        {[...Array(6)].map((_, i) => (
          <path key={i} d="M0 0 L70 0 Q35 35 0 70 Z" transform={`rotate(${i * 12} 0 0)`} />
        ))}
        <circle cx="0" cy="0" r="40" strokeDasharray="4 5" />
      </motion.svg>

      {/* ── Corner Rangoli — Bottom Right ── */}
      <motion.svg
        className="absolute bottom-0 right-0 w-[240px] h-[240px]"
        viewBox="0 0 200 200"
        fill="none"
        stroke="rgba(201,151,59,0.28)"
        strokeWidth="1"
        style={{ transform: 'scale(-1,-1)' }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      >
        <path d="M0 0 Q100 0 100 100 Q100 0 200 0" />
        <path d="M0 0 Q80 0 80 80 Q80 0 160 0" strokeDasharray="3 5" />
        {[...Array(6)].map((_, i) => (
          <path key={i} d="M0 0 L70 0 Q35 35 0 70 Z" transform={`rotate(${i * 12} 0 0)`} />
        ))}
        <circle cx="0" cy="0" r="40" strokeDasharray="4 5" />
      </motion.svg>

      {/* ── Central halo ring ── */}
      <motion.svg
        className="absolute top-1/2 left-1/2 w-[700px] h-[700px]"
        style={{ marginLeft: '-350px', marginTop: '-350px' }}
        viewBox="0 0 500 500"
        fill="none"
        stroke="rgba(201,151,59,0.22)"
        strokeWidth="1"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="250" cy="250" r="245" strokeDasharray="6 12" />
        {[...Array(24)].map((_, i) => (
          <line key={i} x1="250" y1="10" x2="250" y2="45" transform={`rotate(${i * 15} 250 250)`} />
        ))}
        {[...Array(12)].map((_, i) => (
          <path key={i} d="M250 100 Q260 75 250 60 Q240 75 250 100" transform={`rotate(${i * 30} 250 250)`} />
        ))}
        <circle cx="250" cy="250" r="190" strokeDasharray="2 8" />
      </motion.svg>

      {/* ── Temple pillar columns ── */}
      {[0, 1].map((side) => (
        <motion.svg
          key={side}
          className={`absolute top-0 bottom-0 h-full w-[80px] ${side === 0 ? 'left-[160px]' : 'right-[160px]'}`}
          viewBox="0 0 80 900"
          fill="none"
          stroke="rgba(201,151,59,0.22)"
          strokeWidth="1"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 9 + side * 2, repeat: Infinity, ease: 'easeInOut', delay: side }}
        >
          <line x1="40" y1="0" x2="40" y2="900" />
          {Array.from({ length: 18 }).map((_, i) => (
            <circle key={i} cx="40" cy={i * 50 + 25} r="5" strokeDasharray="2 2" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <path key={i} d={`M20 ${i * 100 + 50} L40 ${i * 100 + 68} L60 ${i * 100 + 50}`} />
          ))}
        </motion.svg>
      ))}

      {/* ── Mid horizontal frieze ── */}
      <motion.svg
        className="absolute left-0 w-full"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
        viewBox="0 0 1440 40"
        fill="none"
        stroke="rgba(201,151,59,0.25)"
        strokeWidth="1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        {Array.from({ length: 72 }).map((_, i) => (
          <g key={i} transform={`translate(${i * 20}, 20)`}>
            <path d="M10 18 Q10 8 10 4 Q10 8 10 18" />
            <path d="M10 16 Q6 10 6 4 Q10 8 10 16" />
            <path d="M10 16 Q14 10 14 4 Q10 8 10 16" />
            <circle cx="10" cy="20" r="2" />
          </g>
        ))}
        <line x1="0" y1="2" x2="1440" y2="2" strokeDasharray="2 6" />
        <line x1="0" y1="38" x2="1440" y2="38" strokeDasharray="2 6" />
      </motion.svg>

      {/* ── Inner lotus chains — Left ── */}
      <motion.svg
        className="absolute top-0 bottom-0 left-[244px] h-full w-[60px]"
        viewBox="0 0 60 900"
        fill="none"
        stroke="rgba(201,151,59,0.20)"
        strokeWidth="1"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <g key={i} transform={`translate(30, ${i * 60 + 30})`}>
            <circle cx="0" cy="0" r="12" strokeDasharray="2 3" />
            {[...Array(8)].map((_, j) => (
              <path key={j} d="M0 -12 Q4 -6 0 0 Q-4 -6 0 -12" transform={`rotate(${j * 45})`} />
            ))}
            <circle cx="0" cy="0" r="4" />
          </g>
        ))}
      </motion.svg>

      {/* ── Inner lotus chains — Right ── */}
      <motion.svg
        className="absolute top-0 bottom-0 right-[244px] h-full w-[60px]"
        viewBox="0 0 60 900"
        fill="none"
        stroke="rgba(201,151,59,0.20)"
        strokeWidth="1"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <g key={i} transform={`translate(30, ${i * 60 + 30})`}>
            <circle cx="0" cy="0" r="12" strokeDasharray="2 3" />
            {[...Array(8)].map((_, j) => (
              <path key={j} d="M0 -12 Q4 -6 0 0 Q-4 -6 0 -12" transform={`rotate(${j * 45})`} />
            ))}
            <circle cx="0" cy="0" r="4" />
          </g>
        ))}
      </motion.svg>

      {/* ── Concentric square rangoli (floor center) ── */}
      <motion.svg
        className="absolute left-1/2 w-[480px] h-[480px]"
        style={{ bottom: '5%', marginLeft: '-240px' }}
        viewBox="0 0 300 300"
        fill="none"
        stroke="rgba(201,151,59,0.22)"
        strokeWidth="1"
        animate={{ rotate: [0, 90], opacity: [0.5, 0.9, 0.5] }}
        transition={{
          rotate: { duration: 180, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 10, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        {[140, 120, 100, 80, 60, 40, 20].map((r, i) => (
          <rect key={i} x={150 - r} y={150 - r} width={r * 2} height={r * 2}
            transform={`rotate(${i * 7} 150 150)`}
            strokeDasharray={i % 2 === 0 ? '5 7' : '2 4'}
          />
        ))}
        {[[10,10],[290,10],[10,290],[290,290]].map(([cx, cy], i) => (
          <g key={i} transform={`translate(${cx},${cy})`}>
            <circle cx="0" cy="0" r="10" strokeDasharray="2 3" />
            <path d="M0 -10 Q5 -5 0 0 Q-5 -5 0 -10" />
          </g>
        ))}
      </motion.svg>

      {/* ── Starburst lotus (upper center) ── */}
      <motion.svg
        className="absolute top-[6%] left-1/2 w-[300px] h-[300px]"
        style={{ marginLeft: '-150px' }}
        viewBox="0 0 200 200"
        fill="none"
        stroke="rgba(201,151,59,0.28)"
        strokeWidth="1"
        animate={{ rotate: [0, -360], opacity: [0.5, 1, 0.5] }}
        transition={{
          rotate: { duration: 100, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }
        }}
      >
        {[...Array(24)].map((_, i) => (
          <line key={i} x1="100" y1="100" x2="100" y2="10"
            transform={`rotate(${i * 15} 100 100)`}
            strokeOpacity={i % 3 === 0 ? 1 : 0.5}
          />
        ))}
        <circle cx="100" cy="100" r="80" strokeDasharray="3 6" />
        <circle cx="100" cy="100" r="55" />
        {[...Array(8)].map((_, i) => (
          <path key={i} d="M100 75 Q108 60 100 50 Q92 60 100 75" transform={`rotate(${i * 45} 100 100)`} />
        ))}
        <circle cx="100" cy="100" r="20" strokeDasharray="2 4" />
        <circle cx="100" cy="100" r="8" />
      </motion.svg>

      {/* ── Ghungroo clusters ── */}
      {[
        { left: '18%', top: '30%' }, { left: '82%', top: '30%' },
        { left: '12%', top: '65%' }, { left: '88%', top: '65%' },
        { left: '25%', top: '80%' }, { left: '75%', top: '80%' },
      ].map((pos, gi) => (
        <motion.svg
          key={gi}
          className="absolute w-[90px] h-[50px]"
          style={{ left: pos.left, top: pos.top, transform: 'translate(-50%,-50%)' }}
          viewBox="0 0 90 50"
          fill="none"
          stroke="rgba(201,151,59,0.30)"
          strokeWidth="1.2"
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 6 + gi, repeat: Infinity, ease: 'easeInOut', delay: gi * 0.8 }}
        >
          {[...Array(7)].map((_, j) => (
            <circle key={j} cx={10 + j * 12} cy="30" r="5" />
          ))}
          <line x1="10" y1="25" x2="82" y2="25" />
          {[20, 45, 70].map((x, k) => (
            <circle key={k} cx={x} cy="12" r="2.5" fill="rgba(201,151,59,0.4)" stroke="none" />
          ))}
        </motion.svg>
      ))}

    </div>
  )
}

// ─── Desktop Side Decorations ───
function SideDecorations() {
  const prefersReduced = useReducedMotion()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (prefersReduced) return // skip mouse tracking when reduced motion preferred
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="hidden lg:block absolute inset-0 pointer-events-none z-[1] overflow-hidden">
      
      {/* Glow & Atmosphere: Soft radial gold/orange glow extending into mandalas */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201,151,59,0.06) 0%, rgba(107,15,26,0.03) 40%, transparent 65%)',
          filter: 'blur(40px)',
          mixBlendMode: 'screen'
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Optional Enhancement: Minimal floating gold dust */}
      {DUST_PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: 'var(--gold-light)',
            filter: 'blur(1px)',
            opacity: p.baseOpacity
          }}
          animate={{
            y: [0, p.yMove],
            x: [0, p.xMove],
            opacity: [0, p.baseOpacity * 2, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay
          }}
        />
      ))}

      {/* LEFT SIDE COMPOSITION */}
      <motion.div 
        className="absolute top-0 left-0 bottom-0 w-1/2 flex items-center justify-start"
        animate={{ x: mousePos.x * -15, y: mousePos.y * -15 }}
        transition={{ type: 'spring', stiffness: 40, damping: 25 }}
      >
        <div className="relative w-[150vh] h-[150vh] -left-[50vh] flex items-center justify-center">
          
          {/* Layer 1: Mandala Background */}
          <motion.svg 
            viewBox="0 0 500 500" fill="none" stroke="var(--gold-light)" strokeWidth="0.5" 
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.08, maskImage: 'radial-gradient(circle, black 40%, transparent 75%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 75%)' }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="250" cy="250" r="240" strokeDasharray="4 8" />
            <circle cx="250" cy="250" r="220" />
            {[...Array(32)].map((_, i) => (
              <path key={`L1-1-${i}`} d="M250 120 Q270 70 250 30 Q230 70 250 120" transform={`rotate(${i * (360/32)} 250 250)`} />
            ))}
            <circle cx="250" cy="250" r="130" strokeDasharray="3 6" />
            <circle cx="250" cy="250" r="110" />
            {[...Array(16)].map((_, i) => (
              <path key={`L1-2-${i}`} d="M250 180 Q265 150 250 140 Q235 150 250 180" transform={`rotate(${i * (360/16)} 250 250)`} />
            ))}
          </motion.svg>

          {/* Layer 2: Temple Frame (Gopuram Oval) */}
          <motion.svg 
            viewBox="0 0 400 600" fill="none" stroke="var(--gold-light)" strokeWidth="1" 
            className="absolute w-[80%] h-[90%]"
            style={{ opacity: 0.12 }}
            animate={{ opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M 50 600 L 50 300 C 50 100, 200 50, 200 20 C 200 50, 350 100, 350 300 L 350 600" strokeDasharray="5 5" />
            <path d="M 70 600 L 70 300 C 70 120, 200 80, 200 50 C 200 80, 330 120, 330 300 L 330 600" />
            <circle cx="200" cy="20" r="8" />
            <circle cx="200" cy="50" r="5" />
          </motion.svg>

          {/* Layer 3: Inner Motif (Mudra) */}
          <motion.svg 
            viewBox="0 0 100 100" fill="none" stroke="var(--gold-light)" strokeWidth="1.5" 
            className="absolute w-[20%] h-[20%]"
            style={{ opacity: 0.1 }}
            animate={{ opacity: [0.05, 0.12, 0.05], y: [-2, 2, -2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M40 80 Q30 60 40 40 Q50 20 60 40 Q70 60 60 80 Z" />
            <path d="M35 70 Q20 50 25 30 Q35 10 45 35" />
            <path d="M65 70 Q80 50 75 30 Q65 10 55 35" />
          </motion.svg>

        </div>
      </motion.div>

      {/* RIGHT SIDE COMPOSITION */}
      <motion.div 
        className="absolute top-0 right-0 bottom-0 w-1/2 flex items-center justify-end"
        animate={{ x: mousePos.x * 15, y: mousePos.y * 15 }}
        transition={{ type: 'spring', stiffness: 40, damping: 25 }}
      >
        <div className="relative w-[150vh] h-[150vh] -right-[50vh] flex items-center justify-center">
          
          {/* Layer 1: Mandala Background */}
          <motion.svg 
            viewBox="0 0 500 500" fill="none" stroke="var(--gold-light)" strokeWidth="0.5" 
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.08, maskImage: 'radial-gradient(circle, black 40%, transparent 75%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 75%)' }}
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="250" cy="250" r="240" strokeDasharray="4 8" />
            <circle cx="250" cy="250" r="220" />
            {[...Array(32)].map((_, i) => (
              <path key={`R1-1-${i}`} d="M250 120 Q270 70 250 30 Q230 70 250 120" transform={`rotate(${i * (360/32)} 250 250)`} />
            ))}
            <circle cx="250" cy="250" r="130" strokeDasharray="3 6" />
            <circle cx="250" cy="250" r="110" />
            {[...Array(16)].map((_, i) => (
              <path key={`R1-2-${i}`} d="M250 180 Q265 150 250 140 Q235 150 250 180" transform={`rotate(${i * (360/16)} 250 250)`} />
            ))}
          </motion.svg>

          {/* Layer 2: Temple Frame (Gopuram Oval) */}
          <motion.svg 
            viewBox="0 0 400 600" fill="none" stroke="var(--gold-light)" strokeWidth="1" 
            className="absolute w-[80%] h-[90%]"
            style={{ opacity: 0.12 }}
            animate={{ opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <path d="M 50 600 L 50 300 C 50 100, 200 50, 200 20 C 200 50, 350 100, 350 300 L 350 600" strokeDasharray="5 5" />
            <path d="M 70 600 L 70 300 C 70 120, 200 80, 200 50 C 200 80, 330 120, 330 300 L 330 600" />
            <circle cx="200" cy="20" r="8" />
            <circle cx="200" cy="50" r="5" />
          </motion.svg>

          {/* Layer 3: Inner Motif (Dancer Silhouette) */}
          <motion.svg 
            viewBox="0 0 100 100" fill="none" stroke="var(--gold-light)" strokeWidth="1.5" 
            className="absolute w-[20%] h-[20%]"
            style={{ opacity: 0.1 }}
            animate={{ opacity: [0.05, 0.12, 0.05], y: [2, -2, 2] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >
            <circle cx="50" cy="20" r="6" />
            <path d="M50 26 L50 55 M50 55 L35 75 L20 75 M50 55 L65 75 L80 75 M30 40 Q50 35 70 40 M30 40 L20 20 M70 40 L80 20" />
          </motion.svg>

        </div>
      </motion.div>
    </div>
  )
}

// ─── Audio Toggle Button ───
function AudioToggle({ playing, toggle }) {
  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center relative pointer-events-auto"
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'transparent',
        border: `1px solid rgba(201,151,59,${playing ? 0.6 : 0.2})`,
        boxShadow: playing ? '0 0 20px rgba(201,151,59,0.2)' : 'none',
        transition: 'all 0.5s ease',
        cursor: 'pointer'
      }}
      aria-label={playing ? "Mute audio" : "Play audio"}
    >
      {/* Mini mandala icon */}
      <motion.svg
        viewBox="0 0 40 40"
        fill="none"
        stroke="var(--gold-light)"
        strokeWidth="1"
        style={{ opacity: playing ? 1 : 0.4 }}
        animate={playing ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="20" cy="20" r="12" strokeDasharray="2 3" />
        <circle cx="20" cy="20" r="6" />
        <circle cx="20" cy="20" r="2" fill="var(--gold-light)" />
      </motion.svg>
      {/* Pulse ring when playing */}
      {playing && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: '1px solid var(--gold-light)' }}
          animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
    </button>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const footRef = useRef(null)
  const rippleRef = useRef(null)
  const audioRef = useRef(null)

  const [beats, setBeats] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Hero Parallax (subtle opacity fade, removed 'y' translation which causes massive scroll jank)
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const section = sectionRef.current
    const foot = footRef.current
    const ripple = rippleRef.current

    // Simulate foot strike impact once on mount
    const triggerImpact = () => {
      ripple.animate([
        { transform: 'translateX(-50%) scale(0)', opacity: 0.8 },
        { transform: 'translateX(-50%) scale(5)', opacity: 0 }
      ], { duration: 700, easing: 'ease-out', fill: 'forwards' })

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

    // Audio setup
    const audio = new Audio('/audio/classical.mp3') // Placeholder classical audio
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio

    // Attempt autoplay
    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Fade in smoothly
        let vol = 0;
        const fadeInterval = setInterval(() => {
          if (vol < 0.6) {
            vol += 0.05;
            audio.volume = Math.min(vol, 0.6);
          } else {
            clearInterval(fadeInterval);
          }
        }, 200);
      }).catch(error => {
        // Autoplay blocked by browser
        setAudioPlaying(false)
        console.log("Audio autoplay blocked. Waiting for user interaction.", error);
      })
    }

    return () => {
      animation.cancel()
      audio.pause()
      audio.src = ''
    }
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current) return
    
    if (audioPlaying) {
      // Fade out
      setAudioPlaying(false)
      let vol = audioRef.current.volume;
      const fadeInterval = setInterval(() => {
        if (vol > 0.05) {
          vol -= 0.05;
          audioRef.current.volume = Math.max(vol, 0);
        } else {
          audioRef.current.pause();
          clearInterval(fadeInterval);
        }
      }, 100);
    } else {
      // Fade in
      setAudioPlaying(true)
      audioRef.current.play()
      let vol = audioRef.current.volume;
      const fadeInterval = setInterval(() => {
        if (vol < 0.6) {
          vol += 0.05;
          audioRef.current.volume = Math.min(vol, 0.6);
        } else {
          clearInterval(fadeInterval);
        }
      }, 100);
    }
  }

  return (
    <motion.section
      ref={sectionRef}
      id="home"
      className="hero-section relative"
      style={{ cursor: 'none', opacity, willChange: 'opacity' }}
    >
      <HeroBackground />
      <SideDecorations />

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

      {/* Vignette */}
      <div className="hero-vignette" />

      {/* Main foot image */}
      <motion.div
        ref={footRef}
        className="foot-container relative flex items-center justify-center p-8 md:p-12"
        style={{ willChange: 'transform' }}
        whileHover={{
          rotateX: 6,
          rotateY: -6,
          scale: 1.02,
          transition: { duration: 0.5, ease: "easeOut" }
        }}
      >
        {/* Animated Stylized Frame (Temple inspired blob/glow) */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            background: 'linear-gradient(135deg, rgba(201,151,59,0.08), rgba(107,15,26,0.15))',
            border: '1px solid rgba(201,151,59,0.2)',
            // Removed expensive filter: drop-shadow here since boxShadow provides the glow
          }}
          animate={{
            borderRadius: [
              "40% 60% 70% 30% / 40% 50% 60% 50%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "40% 60% 70% 30% / 40% 50% 60% 50%"
            ],
            boxShadow: [
              "0 0 30px rgba(201,151,59,0.1), inset 0 0 20px rgba(107,15,26,0.2)",
              "0 0 50px rgba(201,151,59,0.25), inset 0 0 40px rgba(107,15,26,0.4)",
              "0 0 30px rgba(201,151,59,0.1), inset 0 0 20px rgba(107,15,26,0.2)"
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Decorative corner motifs */}
        <div style={{ position: 'absolute', top: '15%', left: '15%', width: '30px', height: '30px', borderTop: '2px solid rgba(201,151,59,0.4)', borderLeft: '2px solid rgba(201,151,59,0.4)', borderRadius: '4px 0 0 0' }} />
        <div style={{ position: 'absolute', bottom: '15%', right: '15%', width: '30px', height: '30px', borderBottom: '2px solid rgba(201,151,59,0.4)', borderRight: '2px solid rgba(201,151,59,0.4)', borderRadius: '0 0 4px 0' }} />

        <ProtectedImage
          src={heroFoot}
          alt="Bharatanatyam dancer's ghungroo-adorned foot"
          loading="eager"
          style={{
            width: 'min(460px, 80vw)',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '20px',
            overflow: 'hidden',
            // Reduced to a single drop-shadow for performance during scroll
            filter: 'drop-shadow(0 20px 40px rgba(107,15,26,0.5))',
            userSelect: 'none',
          }}
        />

        {/* Floor ripple ring */}
        <div
          ref={rippleRef}
          className="ripple-ring"
          style={{ width: '120px', height: '12px', opacity: 0, position: 'absolute', bottom: -8 }}
        />

        {/* Floor line */}
        <div
          style={{
            position: 'absolute',
            bottom: -16,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '240px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(201,151,59,0.4), transparent)',
          }}
        />
      </motion.div>

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
        className="protected-text"
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
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: 'clamp(2rem, 5vw, 4.2rem)',
            color: 'var(--gold-pale)',
            letterSpacing: '0.08em',
            textShadow: '0 0 60px rgba(201,151,59,0.4)',
            lineHeight: 1.2,
            fontWeight: 400,
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
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{
          bottom: '6%',
          zIndex: 10,
          gap: '10px',
          pointerEvents: 'none',
        }}
      >
        {/* RhythmBar — hidden on mobile */}
        <div className="hidden sm:block">
          <RhythmBar playing={audioPlaying} />
        </div>

        {/* Toggle + label row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', pointerEvents: 'auto' }}>
             <AudioToggle playing={audioPlaying} toggle={toggleAudio} />
          <p
            className="section-label"
            style={{ fontSize: 'clamp(0.45rem, 1.5vw, 0.6rem)', opacity: 0.5, letterSpacing: '0.2em', whiteSpace: 'nowrap' }}
          >
            TA — KA — DI — MI
          </p>
          <AudioToggle playing={audioPlaying} toggle={toggleAudio} />
        </div>
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
