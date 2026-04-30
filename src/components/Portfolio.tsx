import { useState, useEffect, type Key } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const NAVY = '#1B1F6B';
const WHITE = '#FFFFFF';

const works = [
  {
    src: '/assets/images/work-1.jpg',
    title: 'Le Jour J',
    category: 'Wedding Film',
    caption: 'Le jour J, concentre-toi sur l\'essentiel. On s\'occupe du reste.',
    link: 'https://www.instagram.com/youssef_tayibi/reel/DWRz-_Pjn-l/',
    isReel: true,
  },
  {
    src: '/assets/images/work-2.jpg',
    title: 'Ce Regard',
    category: 'Graduation Film',
    caption: 'Ce regard. Cette fierté. 🤍 Avant de défendre son travail…',
    link: 'https://www.instagram.com/youssef_tayibi/reel/DWWzi6WCASF/',
    isReel: true,
  },
  {
    src: '/assets/images/agency-1.jpg',
    title: 'ProdYous Production',
    category: 'Agency Work',
    caption: 'La recherche commence souvent loin des salles de conférence.',
    link: 'https://www.instagram.com/prodyous.ma/p/DWAaPTFCG6m/',
    isReel: false,
  },
  {
    src: '/assets/images/work-4.jpg',
    title: 'GITEX Morocco',
    category: 'Corporate Event',
    caption: 'GITEX Morocco. Plus qu\'un event… une vraie énergie.',
    link: 'https://www.instagram.com/youssef_tayibi/reel/DW4JEavMYRQ/',
    isReel: true,
  },
  {
    src: '/assets/images/work-5.jpg',
    title: 'Behind The Frame',
    category: 'BTS',
    caption: 'Derrière chaque rendu, il y a des choix, des tests… et une vision.',
    link: 'https://www.instagram.com/youssef_tayibi/reel/DWrdHJFjr7D/',
    isReel: true,
  },
  {
    src: '/assets/images/work-6.jpg',
    title: 'Rien Au Hasard',
    category: 'Film Direction',
    caption: 'Rien n\'est laissé au hasard. De la préparation au rendu final.',
    link: 'https://www.instagram.com/youssef_tayibi/reel/DWg_Ko6tdRA/',
    isReel: true,
  },
  {
    src: '/assets/images/work-7.jpg',
    title: 'Le Moment Décisif',
    category: 'Wedding Film',
    caption: 'Le jour où tout se joue… ce n\'est pas le moment d\'improviser.',
    link: 'https://www.instagram.com/youssef_tayibi/reel/DWKAcZ-N_bo/',
    isReel: true,
  },
  {
    src: '/assets/images/work-8.jpg',
    title: 'AZ Atelier',
    category: 'Product Film',
    caption: 'Chez AZ Atelier, chaque pastilla suit un processus précis.',
    link: 'https://www.instagram.com/youssef_tayibi/reel/DUGwWodjeqc/',
    isReel: true,
  },
  {
    src: '/assets/images/agency-3.jpg',
    title: "L'Impact",
    category: 'Cinematic',
    caption: 'L\'impact ne s\'improvise pas. Sa portée non plus.',
    link: 'https://www.instagram.com/prodyous.ma/reel/DV93GDyiDhx/',
    isReel: true,
  },
  {
    src: '/assets/images/work-10.jpg',
    title: 'We Came To Create',
    category: 'Creative Film',
    caption: 'We didn\'t come here to change the past. We came because we care.',
    link: 'https://www.instagram.com/youssef_tayibi/reel/DSYMc6CDGzx/',
    isReel: true,
  },
  {
    src: '/assets/images/work-11.jpg',
    title: '100+ Soutenances',
    category: 'Graduation Film',
    caption: 'Hamdoulilah… plus de 100 soutenances filmées, et chaque fois c\'est unique.',
    link: 'https://www.instagram.com/youssef_tayibi/reel/DRuc-2bjCUx/',
    isReel: true,
  },
  {
    src: '/assets/images/agency-7.jpg',
    title: 'Brand Energy',
    category: 'Commercial',
    caption: 'Derrière chaque marque, il y a une énergie. Une personnalité.',
    link: 'https://www.instagram.com/prodyous.ma/reel/DVwzEuPiCrc/',
    isReel: true,
  },
];

type Work = typeof works[0];
interface WorkCardProps { work: Work; index: number; onOpen: (w: Work) => void; key?: Key; }

function WorkCard({ work, index, onOpen }: WorkCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(work)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        breakInside: 'avoid',
        marginBottom: '3px',
        display: 'block',
      }}
    >
      <img
        src={work.src}
        alt={work.title}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          transition: 'transform 0.6s ease',
          transform: hovered ? 'scale(1.03)' : 'scale(1)',
        }}
        loading="lazy"
      />

      {/* Reel badge */}
      {work.isReel && (
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          backgroundColor: `${NAVY}CC`,
          padding: '4px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}>
          <span style={{ fontSize: '10px', color: WHITE }}>▶</span>
          <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '10px', color: WHITE, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Reel</span>
        </div>
      )}

      {/* Hover overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: NAVY,
        opacity: hovered ? 0.88 : 0,
        transition: 'opacity 0.35s ease',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '24px',
      }}>
        <p style={{
          fontFamily: '"Outfit", sans-serif',
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '0.18em',
          textTransform: 'uppercase' as const,
          color: `${WHITE}70`,
          transform: hovered ? 'translateY(0)' : 'translateY(10px)',
          transition: 'transform 0.35s ease 0.05s',
        }}>
          {work.category}
        </p>
        <p style={{
          fontFamily: '"Syne", sans-serif',
          fontSize: '20px',
          fontWeight: 700,
          color: WHITE,
          letterSpacing: '-0.01em',
          textAlign: 'center' as const,
          transform: hovered ? 'translateY(0)' : 'translateY(10px)',
          transition: 'transform 0.35s ease 0.1s',
        }}>
          {work.title}
        </p>
        <div style={{
          marginTop: '8px',
          padding: '8px 20px',
          border: `1px solid ${WHITE}50`,
          transform: hovered ? 'translateY(0)' : 'translateY(10px)',
          transition: 'transform 0.35s ease 0.15s',
        }}>
          <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '11px', color: WHITE, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {work.isReel ? '▶ Watch Reel' : 'View Photo'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Lightbox({ work, onClose }: { work: Work; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: `${NAVY}F0`,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          backdropFilter: 'blur(8px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
          style={{
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            gap: '24px',
            maxWidth: '580px',
            width: '100%',
          }}
        >
          {/* Image — natural size, never cropped */}
          <div style={{ position: 'relative', width: '100%', maxHeight: '72vh', overflow: 'hidden' }}>
            <img
              src={work.src}
              alt={work.title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '72vh',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>

          {/* Meta + CTA */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' as const }}>
            <div>
              <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: '11px', color: `${WHITE}50`, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>
                {work.category}
              </p>
              <p style={{ fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: '22px', color: WHITE, letterSpacing: '-0.01em', marginBottom: '8px' }}>
                {work.title}
              </p>
              <p style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 300, fontSize: '13px', color: `${WHITE}65`, lineHeight: 1.6, maxWidth: '320px' }}>
                {work.caption}
              </p>
            </div>
            <a
              href={work.link}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                color: NAVY,
                backgroundColor: WHITE,
                padding: '14px 28px',
                textDecoration: 'none',
                whiteSpace: 'nowrap' as const,
                display: 'inline-block',
                flexShrink: 0,
              }}
            >
              {work.isReel ? '▶ Watch on Instagram' : 'View on Instagram'}
            </a>
          </div>
        </motion.div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            background: 'none',
            border: `1px solid ${WHITE}30`,
            color: WHITE,
            width: '44px',
            height: '44px',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Close"
        >
          ✕
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState<Work | null>(null);

  return (
    <>
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
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' as const }}>
              <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '12px', color: `${NAVY}40`, letterSpacing: '0.08em' }}>
                ▶ Click any card to watch
              </span>
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
                }}
              >
                View Instagram ↗
              </a>
            </div>
          </div>

          {/* Masonry columns — natural image heights, nothing cropped */}
          <div
            className="portfolio-masonry"
            style={{
              columns: 4,
              columnGap: '3px',
            }}
          >
            {works.map((w, i) => (
              <WorkCard key={w.src} work={w} index={i} onOpen={setActive} />
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .portfolio-masonry { columns: 3 !important; }
          }
          @media (max-width: 700px) {
            .portfolio-masonry { columns: 2 !important; }
          }
          @media (max-width: 420px) {
            .portfolio-masonry { columns: 1 !important; }
          }
        `}</style>
      </section>

      {active && <Lightbox work={active} onClose={() => setActive(null)} />}
    </>
  );
}
