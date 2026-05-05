import { motion } from 'motion/react';

const NAVY = '#1B1F6B';
const WHITE = '#FFFFFF';

const services = [
  {
    num: '01',
    title: 'Film Direction',
    desc: 'Cinematic storytelling for music videos, commercials, short films, and brand narratives.',
    highlight: 'Youssef_tayibi · @prodyous.ma',
  },
  {
    num: '02',
    title: 'Graduation Films',
    desc: 'Over 100 soutenances and academic events captured with cinematic precision.',
    highlight: '100+ Soutenances Filmed',
  },
  {
    num: '03',
    title: 'Wedding Films',
    desc: 'Le jour J — we handle everything. Timeless wedding stories you will re-watch forever.',
    highlight: 'Le jour J, on s\'occupe du reste',
  },
  {
    num: '04',
    title: 'Corporate Events',
    desc: 'GITEX Morocco, summits, product launches — high-energy coverage for professional gatherings.',
    highlight: 'GITEX Morocco · Summits · Launches',
  },
  {
    num: '05',
    title: 'Photography',
    desc: 'Editorial portraits and commercial photography. Every shot is a deliberate visual decision.',
    highlight: 'Rien n\'est laissé au hasard',
  },
  {
    num: '06',
    title: 'Content Creation',
    desc: 'Short-form social content designed for Instagram and modern brand presence. @prodyous.ma',
    highlight: 'From Concept to Screen',
  },
];

export default function Services() {
  return (
    <section
      id="services"
      style={{
        backgroundColor: NAVY,
        padding: 'clamp(80px, 10vh, 140px) clamp(20px, 4vw, 60px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(48px, 6vh, 80px)' }}>
          <p style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '12px',
            fontWeight: 400,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: `${WHITE}40`,
            marginBottom: '16px',
          }}>
            Expertise
          </p>
          <h2 style={{
            fontFamily: '"Cunia", sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            color: WHITE,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            maxWidth: '640px',
          }}>
            Visual storytelling<br />across every medium.
          </h2>
        </div>

        <div
          className="services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            backgroundColor: `${WHITE}08`,
          }}
        >
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="service-card"
              style={{
                backgroundColor: NAVY,
                padding: 'clamp(32px, 4vw, 48px)',
                borderTop: `1px solid ${WHITE}12`,
                borderLeft: `1px solid ${WHITE}12`,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = `${WHITE}06`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = NAVY;
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <span style={{
                  fontFamily: '"Cunia", sans-serif',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: `${WHITE}25`,
                  letterSpacing: '0.06em',
                }}>
                  {s.num}
                </span>
              </div>
              <h3 style={{
                fontFamily: '"Cunia", sans-serif',
                fontWeight: 400,
                fontSize: '22px',
                color: WHITE,
                letterSpacing: '-0.01em',
                marginBottom: '16px',
                lineHeight: 1.15,
              }}>
                {s.title}
              </h3>
              <p style={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: `${WHITE}85`,
                lineHeight: 1.7,
                marginBottom: '28px',
              }}>
                {s.desc}
              </p>
              <p style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: `${WHITE}50`,
              }}>
                {s.highlight}
              </p>
            </motion.div>
          ))}
        </div>

        <div style={{
          marginTop: '64px',
          paddingTop: '48px',
          borderTop: `1px solid ${WHITE}10`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap' as const,
          gap: '24px',
        }}>
          <p style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 400,
            fontSize: '15px',
            color: `${WHITE}55`,
            maxWidth: '480px',
            lineHeight: 1.7,
          }}>
            "From concept to screen — we craft visuals that speak."
            <br />
            <span style={{ color: `${WHITE}30`, fontSize: '13px' }}>— ProdYous Visual Production Agency</span>
          </p>
          <a
            href="mailto:contact@prodyous.com"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: NAVY,
              backgroundColor: WHITE,
              padding: '16px 36px',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease',
              display: 'inline-block',
              whiteSpace: 'nowrap' as const,
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Book a Session →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
