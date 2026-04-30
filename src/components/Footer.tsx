const NAVY = '#1B1F6B';
const WHITE = '#FFFFFF';

const footerLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { label: 'Instagram — Youssef', href: 'https://www.instagram.com/youssef_tayibi/' },
  { label: 'Instagram — ProdYous', href: 'https://www.instagram.com/prodyous.ma/' },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: NAVY,
        borderTop: `1px solid ${WHITE}08`,
        padding: 'clamp(60px, 8vh, 100px) clamp(20px, 4vw, 60px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Top row */}
        <div
          className="footer-top"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '40px',
            marginBottom: '80px',
            alignItems: 'start',
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <img
                src="/assets/images/logo.jpg"
                alt="ProdYous"
                style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${WHITE}15` }}
              />
              <span style={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 800,
                fontSize: '16px',
                color: WHITE,
                letterSpacing: '0.05em',
              }}>
                PRODYOUS
              </span>
            </div>
            <p style={{
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 300,
              fontSize: '14px',
              color: `${WHITE}75`,
              lineHeight: 1.7,
              maxWidth: '260px',
            }}>
              From concept to screen —<br />we craft visuals that speak.
            </p>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
            <p style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: `${WHITE}30`,
              marginBottom: '8px',
            }}>
              Navigation
            </p>
            {footerLinks.map(l => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  color: `${WHITE}75`,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  width: 'fit-content',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
                onMouseLeave={e => (e.currentTarget.style.color = `${WHITE}75`)}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Social + contact */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
            <p style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: `${WHITE}30`,
              marginBottom: '8px',
            }}>
              Follow
            </p>
            {socialLinks.map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  color: `${WHITE}75`,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  width: 'fit-content',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
                onMouseLeave={e => (e.currentTarget.style.color = `${WHITE}75`)}
              >
                {l.label} ↗
              </a>
            ))}
            <a
              href="mailto:contact@prodyous.com"
              style={{
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: `${WHITE}55`,
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                marginTop: '8px',
                width: 'fit-content',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
              onMouseLeave={e => (e.currentTarget.style.color = `${WHITE}75`)}
            >
              contact@prodyous.com
            </a>
          </div>
        </div>

        {/* Large wordmark */}
        <div style={{
          borderTop: `1px solid ${WHITE}08`,
          paddingTop: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap' as const,
          gap: '16px',
        }}>
          <p style={{
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 300,
            fontSize: '12px',
            color: `${WHITE}50`,
            letterSpacing: '0.08em',
          }}>
            © 2026 Youssef Tayibi · ProdYous Visual Production Agency · Morocco · All Rights Reserved
          </p>
          <p style={{
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 300,
            fontSize: '12px',
            color: `${WHITE}45`,
            letterSpacing: '0.06em',
          }}>
            Filmmaking · Photography · Visual Production
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-top { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
