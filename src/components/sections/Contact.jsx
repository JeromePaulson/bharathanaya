import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Camera, Video, Briefcase, MessageCircle, Send, Mail, Phone, MapPin } from 'lucide-react'
gsap.registerPlugin(ScrollTrigger)

const socials = [
  { icon: Camera, label: 'Instagram', href: 'https://instagram.com/devika_ajithkumar' },
  // { icon: Video, label: 'YouTube', href: 'https://youtube.com' },
  // { icon: Briefcase, label: 'LinkedIn', href: 'https://linkedin.com' },
  // { icon: MessageCircle, label: 'Twitter / X', href: 'https://twitter.com' },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const titleRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.fromTo([formRef.current, infoRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    gsap.fromTo('.success-msg',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-section py-28 px-6 md:px-12 lg:px-20"
    >
      {/* Decorative background text */}
      <p
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(8rem, 20vw, 18rem)',
          fontWeight: 700,
          color: 'rgba(201,151,59,0.03)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          letterSpacing: '-0.05em',
        }}
      >
        Namaskar
      </p>

      {/* Header */}
      <div ref={titleRef} className="text-center mb-16 relative z-10">
        <p className="section-label mb-4">Get in Touch</p>
        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            color: 'var(--gold-pale)',
            letterSpacing: '0.03em',
          }}
        >
          Begin a <em style={{ color: 'var(--gold)' }}>Conversation</em>
        </h2>
        <div className="gold-divider" />
        <p style={{
          color: 'rgba(245,230,200,0.5)',
          fontSize: '0.875rem',
          maxWidth: '440px',
          margin: '0 auto',
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1.8,
        }}>
          Whether for a performance booking, workshop, or collaboration — 
          every journey begins with a single step.
        </p>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-16">

        {/* Form */}
        <div ref={formRef} className="lg:col-span-3">
          {!submitted ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    autoComplete="name"
                  />
                </div>
                <div>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="mb-8">
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="Subject (Performance / Workshop / Other)"
                />
              </div>

              <div className="mb-10">
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  required
                />
              </div>

              <button id="contact-submit" type="submit" className="btn-gold">
                <Send size={14} />
                Send Message
              </button>
            </form>
          ) : (
            <div
              className="success-msg"
              style={{
                padding: '3rem',
                border: '1px solid rgba(201,151,59,0.3)',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: 60, height: 60,
                border: '1px solid var(--gold)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'var(--gold)',
              }}>
                ✓
              </div>
              <h3 className="font-serif mb-3" style={{ fontSize: '1.5rem', color: 'var(--gold-pale)' }}>
                Namaskar! Message Received.
              </h3>
              <p style={{ color: 'rgba(245,230,200,0.5)', fontSize: '0.875rem', fontFamily: 'Inter' }}>
                Thank you for reaching out. I will respond within 2–3 business days.
              </p>
            </div>
          )}
        </div>

        {/* Info sidebar */}
        <div ref={infoRef} className="lg:col-span-2 flex flex-col justify-between">

          <div className="space-y-8">
            {/* Contact details */}
            {[
              { icon: Mail, label: 'Email', value: 'devika@bharatanatyam.art' },
              { icon: Phone, label: 'Phone', value: '+91 92075 XXXXX' },
              { icon: MapPin, label: 'Based in', value: 'Kannur, Kerala, India' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div style={{
                  width: 36, height: 36,
                  border: '1px solid rgba(201,151,59,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold)',
                  flexShrink: 0,
                }}>
                  <Icon size={14} />
                </div>
                <div>
                  <p className="section-label mb-0.5" style={{ fontSize: '0.55rem' }}>{label}</p>
                  <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--gold-pale)',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                  }}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social icons */}
          <div>
            <p className="section-label mb-4" style={{ fontSize: '0.6rem' }}>Follow the Journey</p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="social-link"
                  data-cursor
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: '6rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(201,151,59,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: 'var(--gold)' }}>
          Devika Ajithkumar
        </p>
        <p style={{ fontSize: '0.7rem', color: 'rgba(245,230,200,0.3)', fontFamily: 'Inter, sans-serif' }}>
          © {new Date().getFullYear()} — All rights reserved. Crafted with devotion.
        </p>
      </div>
    </section>
  )
}
