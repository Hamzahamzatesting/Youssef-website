import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const NAVY = '#1B1F6B';
const WHITE = '#FFFFFF';

const navLinks = [
  { name: 'Work', href: '#work' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          backgroundColor: scrolled ? WHITE : 'transparent',
          borderBottom: scrolled ? `1px solid ${NAVY}18` : 'none',
          transition: 'background-color 0.4s ease',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 60px)',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img
              src="/assets/images/logo.jpg"
              alt="ProdYous"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: `2px solid ${scrolled ? NAVY : WHITE}40`,
                transition: 'border-color 0.4s ease',
              }}
            />
            <span style={{
              fontFamily: '"Cunia", sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              color: scrolled ? NAVY : WHITE,
              letterSpacing: '0.05em',
              transition: 'color 0.4s ease',
            }}>
              PRODYOUS
            </span>
          </a>

          <div id="desk-nav" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 400,
                  fontSize: '13px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: scrolled ? NAVY : WHITE,
                  textDecoration: 'none',
                  opacity: 0.75,
                  transition: 'opacity 0.2s ease, color 0.4s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.75')}
              >
                {link.name}
              </a>
            ))}
            <a
              href="mailto:contact@prodyous.com"
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                color: scrolled ? WHITE : NAVY,
                backgroundColor: scrolled ? NAVY : WHITE,
                padding: '11px 24px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              Start a Project
            </a>
          </div>

          <button
            id="ham-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'none',
              flexDirection: 'column' as const,
              gap: '5px',
              padding: '6px',
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                backgroundColor: scrolled ? NAVY : WHITE,
                transition: 'all 0.3s ease',
                transform:
                  menuOpen && i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)' :
                  menuOpen && i === 1 ? 'scaleX(0)' :
                  menuOpen && i === 2 ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
              }} />
            ))}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ backgroundColor: NAVY, overflow: 'hidden' }}
            >
              <div style={{ padding: '48px clamp(20px,4vw,60px)', display: 'flex', flexDirection: 'column' as const, gap: '28px' }}>
                {navLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: '"Cunia", sans-serif',
                      fontWeight: 400,
                      fontSize: 'clamp(32px, 8vw, 48px)',
                      color: WHITE,
                      textDecoration: 'none',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {link.name}
                  </a>
                ))}
                <div style={{ marginTop: '16px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                  <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    contact@prodyous.com
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          #desk-nav { display: none !important; }
          #ham-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
