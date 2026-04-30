import { useState, type Key } from 'react';
import { motion } from 'motion/react';

const NAVY = '#1B1F6B';
const WHITE = '#FFFFFF';

const works = [
  { src: '/assets/images/work-1.jpg', title: 'Le Jour J', category: 'Wedding Film', span: 'tall' },
  { src: '/assets/images/work-2.jpg', title: 'Ce Regard', category: 'Graduation', span: 'normal' },
  { src: '/assets/images/work-4.jpg', title: 'GITEX Morocco', category: 'Corporate Event', span: 'normal' },
  { src: '/assets/images/work-5.jpg', title: 'Behind The Frame', category: 'BTS', span: 'wide' },
  { src: '/assets/images/work-6.jpg', title: 'Rien Au Hasard', category: 'Film Direction', span: 'normal' },
  { src: '/assets/images/work-7.jpg', title: 'Le Moment Décisif', category: 'Wedding Film', span: 'normal' },
  { src: '/assets/images/work-8.jpg', title: 'AZ Atelier', category: 'Product Film', span: 'normal' },
  { src: '/assets/images/agency-1.jpg', title: 'ProdYous Production', category: 'Agency Work', span: 'tall' },
  { src: '/assets/images/agency-3.jpg', title: "L'Impact", category: 'Cinematic', span: 'normal' },
  { src: '/assets/images/work-10.jpg', title: 'We Came To Create', category: 'Creative Film', span: 'normal' },
  { src: '/assets/images/work-11.jpg', title: '100+ Soutenances', category: 'Graduation Film', span: 'normal' },
  { src: '/assets/images/agency-7.jpg', title: 'Brand Identity', category: 'Commercial', span: 'normal' },
];

type Work = typeof works[0];

interface WorkCardProps { work: Work; index: number; key?: Key; }

function WorkCard({ work, index }: WorkCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: `${NAVY}08`,
        gridRow: work.span === 'tall' ? 'span 2' : 'span 1',
        gridColumn: work.span === 'wide' ? 'span 2' : 'span 1',
        minHeight: work.span === 'tall' ? '480px' : '240px',
      }}
    >
      <img
        src={work.src}
        alt={work.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          transition: 'transform 0.7s ease',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          display: 'block',
          minHeight: 'inherit',
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: NAVY,
        opacity: hovered ? 0.82 : 0,
        transition: 'opacity 0.4s ease',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
      }}>
        <p style={{
          fontFamily: '"Outfit", sans-serif',
          fontSize: '12px',
          fontWeight: 400,
          letterSpacing: '0.18em',
          textTransform: 'uppercase' as const,
          color: `${WHITE}70`,
          transform: hovered ? 'translateY(0)' : 'translateY(12px)',
          transition: 'transform 0.4s ease 0.05s',
        }}>
          {work.category}
        </p>
        <p style={{
          fontFamily: '"Syne", sans-serif',
          fontSize: '24px',
          fontWeight: 700,
          color: WHITE,
          letterSpacing: '-0.01em',
          transform: hovered ? 'translateY(0)' : 'translateY(12px)',
          transition: 'transform 0.4s ease 0.1s',
          textAlign: 'center' as const,
          padding: '0 24px',
        }}>
          {work.title}
        </p>
        <div style={{
          width: '32px',
          height: '1px',
          backgroundColor: WHITE,
          transform: hovered ? 'translateY(0) scaleX(1)' : 'translateY(12px) scaleX(0)',
          transition: 'transform 0.4s ease 0.15s',
        }} />
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <section
      id="work"
      style={{
        backgroundColor: WHITE,
        padding: 'clamp(80px, 10vh, 140px) clamp(20px, 4vw, 60px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 'clamp(48px, 6vh, 80px)',
          flexWrap: 'wrap' as const,
          gap: '24px',
        }}>
          <div>
            <p style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: `${NAVY}50`,
              marginBottom: '16px',
            }}>
              Selected Work
            </p>
            <h2 style={{
              fontFamily: '"Syne", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              color: NAVY,
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}>
              Every frame<br />tells a story.
            </h2>
          </div>
          <a
            href="https://www.instagram.com/youssef_tayibi/"
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: NAVY,
              textDecoration: 'none',
              borderBottom: `1px solid ${NAVY}`,
              paddingBottom: '4px',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            View Instagram ↗
          </a>
        </div>

        <div
          className="portfolio-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: '280px',
            gap: '3px',
          }}
        >
          {works.map((w, i) => <WorkCard key={w.src} work={w} index={i} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
          .portfolio-grid > * { grid-column: span 1 !important; grid-row: span 1 !important; min-height: 260px !important; }
        }
      `}</style>
    </section>
  );
}
