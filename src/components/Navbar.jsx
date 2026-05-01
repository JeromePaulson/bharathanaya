import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Experience', href: '#experience' },
  // { label: 'Videos', href: '#videos' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)

    // Entrance animation
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    )

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-8 py-5"
        style={{
          background: scrolled || mobileMenuOpen
            ? 'rgba(10,10,10,0.92)'
            : 'transparent',
          backdropFilter: scrolled || mobileMenuOpen ? 'blur(12px)' : 'none',
          borderBottom: scrolled || mobileMenuOpen ? '1px solid rgba(201,151,59,0.1)' : '1px solid transparent',
          transition: 'background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease',
        }}
      >
        {/* Logo */}
        <a href="#" className="flex flex-col" onClick={(e) => handleNav(e, 'body')}>
          <span className="font-serif text-xl text-gold-light tracking-wide leading-none" style={{ color: 'var(--gold-light)' }}>
            Devika
          </span>
          <span className="section-label" style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}>
            Ajithkumar
          </span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="nav-link" onClick={(e) => handleNav(e, href)}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:block btn-gold text-xs py-3 px-6"
          onClick={(e) => handleNav(e, '#contact')}
          style={{ fontSize: '0.65rem', padding: '10px 22px' }}
        >
          Book Performance
        </a>

        {/* Mobile menu icon */}
        <button 
          className="md:hidden flex flex-col gap-1.5 p-2 relative z-[70]" 
          aria-label="Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span 
            className="block w-6 h-px bg-gold-light transition-transform duration-300 origin-center" 
            style={{ 
              background: 'var(--gold-light)',
              transform: mobileMenuOpen ? 'translateY(7px) rotate(45deg)' : 'none'
            }} 
          />
          <span 
            className="block w-4 h-px bg-gold-light transition-opacity duration-300" 
            style={{ 
              background: 'var(--gold-light)',
              opacity: mobileMenuOpen ? 0 : 1
            }} 
          />
          <span 
            className="block w-6 h-px bg-gold-light transition-transform duration-300 origin-center" 
            style={{ 
              background: 'var(--gold-light)',
              transform: mobileMenuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none'
            }} 
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className="md:hidden fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-500 ease-in-out"
        style={{
          background: 'var(--black)',
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          visibility: mobileMenuOpen ? 'visible' : 'hidden'
        }}
      >
        <ul className="flex flex-col items-center gap-8">
          {navItems.map(({ label, href }) => (
            <li key={label}>
              <a 
                href={href} 
                className="font-serif text-3xl" 
                onClick={(e) => handleNav(e, href)}
                style={{ 
                  color: 'var(--gold-pale)',
                  letterSpacing: '0.05em' 
                }}
              >
                {label}
              </a>
            </li>
          ))}
          <li className="mt-8">
            <a
              href="#contact"
              className="btn-gold"
              onClick={(e) => handleNav(e, '#contact')}
            >
              Book Performance
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
