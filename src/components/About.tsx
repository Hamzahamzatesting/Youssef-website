import { motion } from 'motion/react';

const NAVY = '#1B1F6B';
const WHITE = '#FFFFFF';

const highlights = [
  { label: 'Graduation 🧑‍🎓', count: '100+' },
  { label: 'Corporate 💼', count: 'Events' },
  { label: 'Content Creation 🤳', count: 'Social' },
  { label: 'Avis Clients 😍', count: '★★★★★' },
  { label: 'Wedding', count: 'Films' },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        backgroundColor: WHITE,
        padding: 'clamp(80px, 10vh, 140px) clamp(20px, 4vw, 60px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(40px, 6vw, 100px)',
            alignItems: 'start',
          }}
        >
          {/* Left — Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              aspectRatio: '3/4',
              overflow: 'hidden',
              position: 'relative',
            }}>
              <img
                src="/assets/images/work-3.jpg"
                alt="Youssef Tayibi at work"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: `${NAVY}15` }} />
            </div>

            <div style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-20px',
              width: '45%',
              aspectRatio: '1',
              overflow: 'hidden',
              border: `4px solid ${WHITE}`,
            }}>
              <img
                src="/assets/images/youssef-profile.jpg"
                alt="Youssef Tayibi"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            <div style={{
              position: 'absolute',
              top: '24px',
              left: '-16px',
              backgroundColor: NAVY,
              padding: '16px 20px',
            }}>
              <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '11px', color: `${WHITE}80`, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Morocco
              </p>
              <p style={{ fontFamily: '"Cunia", sans-serif', fontWeight: 400, fontSize: '18px', color: WHITE, letterSpacing: '-0.01em', marginTop: '4px' }}>
                ProdYous
              </p>
            </div>
          </motion.div>

          {/* Right — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            style={{ paddingTop: 'clamp(16px, 4vw, 48px)' }}
          >
            <p style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: `${NAVY}70`,
              marginBottom: '20px',
            }}>
              Our Story
            </p>

            <h2 style={{
              fontFamily: '"Cunia", sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              color: NAVY,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: '32px',
            }}>
              Crafting cinematic<br />narratives in the<br />heart of Morocco.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '20px', marginBottom: '40px' }}>
              <p style={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: 1.75,
                color: `${NAVY}85`,
              }}>
                Youssef Tayibi is a filmmaker and photographer based in Morocco, and the founder of ProdYous Visual Production Agency.
                With a sharp editorial eye and a cinematic approach, he helps brands, creatives, and individuals stand out in a saturated visual landscape.
              </p>
              <p style={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: 1.75,
                color: `${NAVY}70`,
              }}>
                From wedding films to corporate events, from graduation ceremonies to brand commercials — every project is treated as an opportunity to push the frame further.
                Nothing is left to chance. From preparation to final delivery.
              </p>
            </div>

            {/* Highlights from Instagram */}
            <div style={{ marginBottom: '40px' }}>
              <p style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '12px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: `${NAVY}65`,
                marginBottom: '16px',
              }}>
                Specialties
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px' }}>
                {highlights.map(h => (
                  <div
                    key={h.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: `1px solid ${NAVY}15`,
                      padding: '8px 14px',
                    }}
                  >
                    <span style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '13px', color: `${NAVY}85` }}>{h.label}</span>
                    <span style={{ fontFamily: '"Cunia", sans-serif', fontSize: '11px', fontWeight: 400, color: NAVY }}>{h.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '32px' }}>
              <a
                href="#contact"
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: NAVY,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${NAVY}`,
                  paddingBottom: '4px',
                }}
              >
                Start a Project →
              </a>
              <a
                href="#work"
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: `${NAVY}70`,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${NAVY}30`,
                  paddingBottom: '4px',
                }}
              >
                View Work →
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
