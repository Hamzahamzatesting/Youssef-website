import { motion } from 'motion/react';

const NAVY = '#1B1F6B';
const WHITE = '#FFFFFF';

export default function Hero({ onStartProject }: { onStartProject: () => void }) {
  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        minHeight: '100vh',
        backgroundColor: NAVY,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
      }}
    >
      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(${WHITE}06 1px, transparent 1px), linear-gradient(90deg, ${WHITE}06 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'clamp(48px, 8vh, 120px) clamp(20px, 4vw, 60px)',
        width: '100%',
        position: 'relative',
        zIndex: 1,
      }}
      className="hero-grid"
      >
        <div style={{ maxWidth: '720px' }}>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: '"Cunia", sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(48px, 6.5vw, 96px)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: WHITE,
              marginBottom: '32px',
            }}
          >
            Helping<br />
            creatives<br />
            <span style={{ color: `${WHITE}85` }}>stand out.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: 1.7,
              color: `${WHITE}90`,
              maxWidth: '480px',
              marginBottom: '48px',
            }}
          >
            ProdYous is a visual production agency based in Morocco.
            We create cinematic films, photography, and branded content —
            from concept to screen, we craft visuals that speak.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' as const }}
          >
            <a
              href="#work"
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                color: NAVY,
                backgroundColor: WHITE,
                padding: '16px 36px',
                textDecoration: 'none',
                transition: 'opacity 0.2s ease',
                display: 'inline-block',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              View Work
            </a>
            <button
              onClick={onStartProject}
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                color: WHITE,
                backgroundColor: 'transparent',
                padding: '16px 36px',
                border: `1px solid ${WHITE}40`,
                cursor: 'pointer',
                transition: 'border-color 0.2s ease',
                display: 'inline-block',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = WHITE)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = `${WHITE}40`)}
            >
              Start a Project
            </button>
          </motion.div>

          {/* Accounts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-stats"
            style={{ marginTop: '64px', display: 'flex', gap: 'clamp(28px, 4vw, 56px)' }}
          >
            {[
              { label: '+200', sub: 'Clients' },
              { label: '5',    sub: 'Years' },
              { label: '100+', sub: 'Projects' },
            ].map((s, i) => (
              <div
                key={s.label}
                style={i > 0 ? { paddingLeft: 'clamp(28px, 4vw, 56px)', borderLeft: `1px solid ${WHITE}25` } : undefined}
              >
                <p style={{ fontFamily: '"Cunia", sans-serif', fontWeight: 400, fontSize: 'clamp(40px, 5vw, 64px)', color: WHITE, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.label}</p>
                <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '13px', fontWeight: 400, color: `${WHITE}80`, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '10px' }}>{s.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        gap: '8px',
        opacity: 0.4,
      }}>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ width: '1px', height: '48px', backgroundColor: WHITE }}
        />
        <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '10px', color: WHITE, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-section {
            min-height: auto !important;
            padding-top: 80px !important;
          }
          .hero-grid {
            padding-top: 88px !important;
            padding-bottom: 88px !important;
          }
          .hero-stats {
            margin-top: 52px !important;
            gap: 26px !important;
          }
        }
      `}</style>
    </section>
  );
}
