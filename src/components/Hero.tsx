import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const NAVY = '#1B1F6B';
const WHITE = '#FFFFFF';

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!imgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      imgRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      id="hero"
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
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}
      className="hero-grid"
      >
        {/* Left — Text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: `${WHITE}80`,
              marginBottom: '28px',
            }}
          >
            Filmmaker · Photographer · Morocco
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: '"Syne", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(48px, 6.5vw, 96px)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: WHITE,
              marginBottom: '32px',
            }}
          >
            Helping<br />
            creatives<br />
            <span style={{ color: `${WHITE}60` }}>stand out.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 300,
              fontSize: '15px',
              lineHeight: 1.7,
              color: `${WHITE}70`,
              maxWidth: '420px',
              marginBottom: '48px',
            }}
          >
            Youssef Tayibi — filmmaker and photographer based in Morocco.
            Founder of ProdYous Visual Production Agency.
            From concept to screen, we craft visuals that speak.
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
                fontFamily: '"Outfit", sans-serif',
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
            <a
              href="mailto:contact@prodyous.com"
              style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                color: WHITE,
                backgroundColor: 'transparent',
                padding: '16px 36px',
                textDecoration: 'none',
                border: `1px solid ${WHITE}40`,
                transition: 'border-color 0.2s ease',
                display: 'inline-block',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = WHITE)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = `${WHITE}40`)}
            >
              Start a Project
            </a>
          </motion.div>

          {/* Accounts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ marginTop: '64px', display: 'flex', gap: '32px' }}
          >
            {[
              { label: '2,440', sub: 'Followers' },
              { label: '29', sub: 'Posts' },
              { label: '100+', sub: 'Soutenances' },
            ].map(s => (
              <div key={s.label}>
                <p style={{ fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: '28px', color: WHITE, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.label}</p>
                <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: '11px', color: `${WHITE}50`, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '6px' }}>{s.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Image mosaic */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ position: 'relative', height: 'clamp(480px, 70vh, 720px)' }}
        >
          {/* Large portrait */}
          <div
            ref={imgRef}
            style={{
              position: 'absolute',
              inset: 0,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: '5%',
              width: '65%',
              height: '80%',
              overflow: 'hidden',
            }}>
              <img
                src="/assets/images/work-10.jpg"
                alt="Cinematic work by Youssef Tayibi"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: `${NAVY}30` }} />
            </div>

            <div style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '48%',
              height: '55%',
              overflow: 'hidden',
              border: `3px solid ${NAVY}`,
            }}>
              <img
                src="/assets/images/work-1.jpg"
                alt="Wedding film by ProdYous"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: `${NAVY}20` }} />
            </div>

            <div style={{
              position: 'absolute',
              bottom: '5%',
              left: 0,
              width: '30%',
              height: '30%',
              overflow: 'hidden',
              border: `2px solid ${WHITE}20`,
            }}>
              <img
                src="/assets/images/work-4.jpg"
                alt="Corporate event coverage"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Profile badge */}
          <div style={{
            position: 'absolute',
            top: '24px',
            right: '0',
            backgroundColor: WHITE,
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 2,
          }}>
            <img
              src="/assets/images/youssef-profile.jpg"
              alt="Youssef Tayibi"
              style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <p style={{ fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: '13px', color: NAVY, lineHeight: 1 }}>@youssef_tayibi</p>
              <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: '11px', color: `${NAVY}60`, marginTop: '3px', letterSpacing: '0.06em' }}>Instagram</p>
            </div>
          </div>

          {/* Agency tag */}
          <div style={{
            position: 'absolute',
            bottom: '28%',
            left: '32%',
            backgroundColor: NAVY,
            border: `1px solid ${WHITE}20`,
            padding: '10px 16px',
            zIndex: 2,
          }}>
            <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: '11px', color: WHITE, letterSpacing: '0.12em', textTransform: 'uppercase' }}>@prodyous.ma</p>
          </div>
        </motion.div>
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
        <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: '10px', color: WHITE, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
