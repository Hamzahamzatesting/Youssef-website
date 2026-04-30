import { useState, useEffect, type Key } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const NAVY = '#1B1F6B';
const WHITE = '#FFFFFF';

const works = [
  // ── @youssef_tayibi ────────────────────────────────────────────────
  { src: '/assets/images/work-1.jpg',    instagramUrl: 'https://www.instagram.com/reel/DWRz-_Pjn-l/', title: 'Le Jour J',           category: 'Wedding Film',     caption: "Le jour J, concentre-toi sur l'essentiel. On s'occupe du reste.",               isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-2.jpg',    instagramUrl: 'https://www.instagram.com/reel/DWWzi6WCASF/', title: 'Ce Regard',           category: 'Graduation Film',  caption: 'Ce regard. Cette fierté. 🤍 Avant de défendre son travail…',                    isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-3.jpg',    instagramUrl: 'https://www.instagram.com/reel/DXceayMNxHc/', title: 'Partager Ensemble',   category: 'Personal',         caption: 'Partager m3a li katmna lih had nhar 🔥 Crédit : @prodyous.ma',                 isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-4.jpg',    instagramUrl: 'https://www.instagram.com/reel/DW4JEavMYRQ/', title: 'GITEX Morocco',       category: 'Corporate Event',  caption: "GITEX Morocco. Plus qu'un event… une vraie énergie.",                           isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-5.jpg',    instagramUrl: 'https://www.instagram.com/reel/DWrdHJFjr7D/', title: 'Behind The Frame',    category: 'BTS',              caption: 'Derrière chaque rendu, il y a des choix, des tests… et une vision.',           isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-6.jpg',    instagramUrl: 'https://www.instagram.com/reel/DWg_Ko6tdRA/', title: 'Rien Au Hasard',      category: 'Film Direction',   caption: "Rien n'est laissé au hasard. De la préparation au rendu final.",               isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-7.jpg',    instagramUrl: 'https://www.instagram.com/reel/DWKAcZ-N_bo/', title: 'Le Moment Décisif',   category: 'Wedding Film',     caption: "Le jour où tout se joue… ce n'est pas le moment d'improviser.",               isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-8.jpg',    instagramUrl: 'https://www.instagram.com/reel/DUGwWodjeqc/', title: 'AZ Atelier',          category: 'Product Film',     caption: 'Chez AZ Atelier, chaque pastilla suit un processus précis.',                  isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-9.jpg',    instagramUrl: 'https://www.instagram.com/reel/DSsAHN1DIQ2/', title: 'Des Moments',         category: 'Event Coverage',   caption: 'Des moments qui comptent, des souvenirs pour toujours.',                      isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-10.jpg',   instagramUrl: 'https://www.instagram.com/reel/DSYMc6CDGzx/', title: 'We Came To Create',   category: 'Creative Film',    caption: "We didn't come here to change the past. We came because we care.",             isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-11.jpg',   instagramUrl: 'https://www.instagram.com/reel/DRuc-2bjCUx/', title: '100+ Soutenances',    category: 'Graduation Film',  caption: 'Hamdoulilah… plus de 100 soutenances filmées, et chaque fois unique.',         isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-12.jpg',   instagramUrl: 'https://www.instagram.com/reel/DRVI1nqjCGW/', title: 'Produce With Youss',  category: 'Agency Promo',     caption: '🎬 Produce with Youss. From concept to screen — we craft visuals that speak.', isReel: true,  account: 'youssef' },
  // ── @prodyous.ma (unique content) ─────────────────────────────────
  { src: '/assets/images/agency-3.jpg',  instagramUrl: 'https://www.instagram.com/reel/DV93GDyiDhx/', title: "L'Impact",            category: 'Cinematic',        caption: "L'impact ne s'improvise pas. Sa portée non plus.",                                      isReel: true,  account: 'prodyous' },
  { src: '/assets/images/agency-7.jpg',  instagramUrl: 'https://www.instagram.com/reel/DVwzEuPiCrc/', title: 'Brand Energy',        category: 'Commercial',       caption: 'Derrière chaque marque, il y a une énergie. Une personnalité.',                       isReel: true,  account: 'prodyous' },
  { src: '/assets/images/agency-1.jpg',  title: 'La Recherche',        category: 'Documentary',      caption: 'La recherche commence souvent loin des salles de conférence.',                         isReel: false, account: 'prodyous' },
  { src: '/assets/images/agency-2.jpg',  title: "L'Expertise",         category: 'Corporate',        caption: "L'expertise ne s'improvise pas. Son image non plus.",                                   isReel: false, account: 'prodyous' },
  { src: '/assets/images/agency-4.jpg',  title: 'Avant La Caméra',     category: 'BTS',              caption: 'Chaque projet commence avant la caméra. Dans la réflexion.',                           isReel: false, account: 'prodyous' },
  { src: '/assets/images/agency-5.jpg',  title: 'Certaines Marques',   category: 'Brand Identity',   caption: "Certaines marques ne cherchent pas simplement à communiquer.",                          isReel: false, account: 'prodyous' },
  { src: '/assets/images/agency-6.jpg',  title: 'Congrès & Conférence', category: 'Medical Event',   caption: 'Un congrès, une conférence, une démonstration médicale — ne sont pas laissés au hasard.', isReel: false, account: 'prodyous' },
  { src: '/assets/images/agency-8.jpg',  title: 'Avant Les Résultats', category: 'Vision',           caption: "Avant les résultats, il y a une vision. Avant l'impact, il y a une direction.",          isReel: false, account: 'prodyous' },
];

type Work = typeof works[0];
type Filter = 'all' | 'videos' | 'photos';
interface WorkCardProps { work: Work; index: number; onOpen: (w: Work) => void; key?: Key; }

function WorkCard({ work, index, onOpen }: WorkCardProps) {
  const [hovered, setHovered] = useState(false);
  const handleClick = () => {
    if (work.isReel && work.instagramUrl) {
      window.open(work.instagramUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    onOpen(work);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.3, delay: (index % 4) * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', breakInside: 'avoid', marginBottom: '3px', display: 'block' }}
    >
      <img
        src={work.src}
        alt={work.title}
        loading="lazy"
        style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.6s ease', transform: hovered ? 'scale(1.03)' : 'scale(1)' }}
      />
      {/* Badge */}
      <div style={{
        position: 'absolute', top: '10px', left: '10px',
        backgroundColor: `${NAVY}E0`, padding: '4px 10px',
        display: 'flex', alignItems: 'center', gap: '5px',
      }}>
        <span style={{ fontSize: '9px', color: WHITE }}>{work.isReel ? '▶' : '◼'}</span>
        <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '10px', color: WHITE, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {work.isReel ? 'Reel' : 'Photo'}
        </span>
      </div>
      {/* Account badge */}
      <div style={{
        position: 'absolute', top: '10px', right: '10px',
        backgroundColor: `${NAVY}CC`, padding: '4px 10px',
      }}>
        <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '9px', color: `${WHITE}90`, letterSpacing: '0.08em' }}>
          @{work.account === 'youssef' ? 'youssef_tayibi' : 'prodyous.ma'}
        </span>
      </div>
      {/* Hover overlay */}
      <div style={{
        position: 'absolute', inset: 0, backgroundColor: NAVY,
        opacity: hovered ? 0.9 : 0, transition: 'opacity 0.3s ease',
        display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '20px',
      }}>
        <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: `${WHITE}80`, transform: hovered ? 'translateY(0)' : 'translateY(8px)', transition: 'transform 0.3s ease 0.04s' }}>
          {work.category}
        </p>
        <p style={{ fontFamily: '"Syne", sans-serif', fontSize: '18px', fontWeight: 700, color: WHITE, textAlign: 'center' as const, transform: hovered ? 'translateY(0)' : 'translateY(8px)', transition: 'transform 0.3s ease 0.09s' }}>
          {work.title}
        </p>
        <div style={{ padding: '7px 18px', border: `1px solid ${WHITE}55`, transform: hovered ? 'translateY(0)' : 'translateY(8px)', transition: 'transform 0.3s ease 0.14s' }}>
          <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '11px', color: WHITE, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {work.isReel ? '▶ Play Reel' : '◼ View Photo'}
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
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, backgroundColor: `${NAVY}F8`, zIndex: 1000,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '60px 20px 20px', backdropFilter: 'blur(12px)', overflowY: 'auto',
      }}
      >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        className="lightbox-panel lightbox-panel-photo"
        style={{
          display: 'flex',
          flexDirection: 'column' as const,
          alignItems: 'center',
          width: '100%',
          maxWidth: 'min(1120px, calc(100vw - 40px))',
        }}
      >
        {/* Media */}
        <div
          className="lightbox-photo-frame"
          style={{
            width: '100%',
            maxHeight: 'calc(100vh - 230px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: `${NAVY}35`,
            overflow: 'hidden',
          }}
        >
          <img
            src={work.src}
            alt={work.title}
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: 'calc(100vh - 230px)',
              display: 'block',
            }}
          />
        </div>

        {/* Info strip */}
        <div style={{ width: '100%', backgroundColor: NAVY, padding: '24px 28px', borderTop: `1px solid ${WHITE}15` }}>
          <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: `${WHITE}65`, marginBottom: '8px' }}>
            {work.category} · @{work.account === 'youssef' ? 'youssef_tayibi' : 'prodyous.ma'}
          </p>
          <p style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: '22px', color: WHITE, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '10px' }}>
            {work.title}
          </p>
          <p style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 300, fontSize: '14px', color: `${WHITE}85`, lineHeight: 1.65 }}>
            {work.caption}
          </p>
        </div>
      </motion.div>

      <button
        onClick={onClose}
        style={{
          position: 'fixed', top: '20px', right: '20px', background: 'none',
          border: `1px solid ${WHITE}35`, color: WHITE, width: '44px', height: '44px',
          cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        aria-label="Close"
      >✕</button>
    </motion.div>
  );
}

const filterBtn = (active: boolean) => ({
  fontFamily: '"Outfit", sans-serif',
  fontSize: '13px',
  fontWeight: 400,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: active ? WHITE : NAVY,
  backgroundColor: active ? NAVY : 'transparent',
  border: `1px solid ${NAVY}`,
  padding: '10px 24px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
});

export default function Portfolio() {
  const [active, setActive] = useState<Work | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = works.filter(w =>
    filter === 'all' ? true : filter === 'videos' ? w.isReel : !w.isReel
  );

  const counts = {
    all: works.length,
    videos: works.filter(w => w.isReel).length,
    photos: works.filter(w => !w.isReel).length,
  };

  return (
    <>
      <section id="work" style={{ backgroundColor: WHITE, padding: 'clamp(80px, 10vh, 140px) clamp(20px, 4vw, 60px)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom: 'clamp(40px, 5vh, 64px)' }}>
            <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: `${NAVY}60`, marginBottom: '16px' }}>
              Selected Work
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap' as const, gap: '24px' }}>
              <h2 style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 4.5vw, 56px)', color: NAVY, letterSpacing: '-0.03em', lineHeight: 1 }}>
                Every frame<br />tells a story.
              </h2>
              <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: '13px', color: `${NAVY}55` }}>
                {counts.all} pieces · {counts.videos} reels · {counts.photos} photos
              </p>
            </div>
          </div>

          {/* Filter bar */}
          <div style={{ display: 'flex', gap: '2px', marginBottom: '40px', flexWrap: 'wrap' as const }}>
            {(['all', 'videos', 'photos'] as Filter[]).map(f => (
              <button key={f} onClick={() => setFilter(f)} style={filterBtn(filter === f)}>
                {f === 'all' ? `All (${counts.all})` : f === 'videos' ? `▶ Reels (${counts.videos})` : `◼ Photos (${counts.photos})`}
              </button>
            ))}
            <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: '12px', color: `${NAVY}45`, display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
              Open any card
            </p>
          </div>

          {/* Masonry grid */}
          <AnimatePresence mode="sync">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="portfolio-masonry"
              style={{ columns: 4, columnGap: '3px' }}
            >
              {filtered.map((w, i) => (
                <WorkCard key={w.src} work={w} index={i} onOpen={setActive} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Account labels */}
          <div style={{ display: 'flex', gap: '32px', marginTop: '40px', paddingTop: '32px', borderTop: `1px solid ${NAVY}10`, flexWrap: 'wrap' as const }}>
            {[
              { label: '@youssef_tayibi', desc: 'Personal account · 12 reels' },
              { label: '@prodyous.ma', desc: 'Agency account · 8 pieces' },
            ].map(a => (
              <div key={a.label}>
                <p style={{ fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: '15px', color: NAVY }}>{a.label}</p>
                <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: '12px', color: `${NAVY}55`, marginTop: '3px' }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) { .portfolio-masonry { columns: 3 !important; } }
          @media (max-width: 700px)  { .portfolio-masonry { columns: 2 !important; } }
          @media (max-width: 420px)  { .portfolio-masonry { columns: 1 !important; } }
          @media (max-width: 520px)  {
            .lightbox-panel {
              max-width: calc(100vw - 24px) !important;
            }
            .lightbox-photo-frame,
            .lightbox-photo-frame img {
              max-height: calc(100vh - 260px) !important;
              max-width: 100% !important;
            }
          }
          button:hover { opacity: 0.85; }
        `}</style>
      </section>

      <AnimatePresence>
        {active && <Lightbox work={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
}
