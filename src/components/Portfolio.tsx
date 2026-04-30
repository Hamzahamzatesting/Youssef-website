import { useState, useEffect, type Key } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const NAVY = '#1B1F6B';
const WHITE = '#FFFFFF';

const works = [
  // ── @youssef_tayibi ────────────────────────────────────────────────
  { src: '/assets/images/work-1.jpg',    title: 'Le Jour J',           category: 'Wedding Film',     caption: "Le jour J, concentre-toi sur l'essentiel. On s'occupe du reste.",                        embedCode: 'DWRz-_Pjn-l',  isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-2.jpg',    title: 'Ce Regard',           category: 'Graduation Film',  caption: 'Ce regard. Cette fierté. 🤍 Avant de défendre son travail…',                             embedCode: 'DWWzi6WCASF',  isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-3.jpg',    title: 'Partager Ensemble',   category: 'Personal',         caption: 'Partager m3a li katmna lih had nhar 🔥 Crédit : @prodyous.ma',                          embedCode: 'DXceayMNxHc',  isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-4.jpg',    title: 'GITEX Morocco',       category: 'Corporate Event',  caption: "GITEX Morocco. Plus qu'un event… une vraie énergie.",                                    embedCode: 'DW4JEavMYRQ',  isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-5.jpg',    title: 'Behind The Frame',    category: 'BTS',              caption: 'Derrière chaque rendu, il y a des choix, des tests… et une vision.',                    embedCode: 'DWrdHJFjr7D',  isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-6.jpg',    title: 'Rien Au Hasard',      category: 'Film Direction',   caption: "Rien n'est laissé au hasard. De la préparation au rendu final.",                        embedCode: 'DWg_Ko6tdRA',  isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-7.jpg',    title: 'Le Moment Décisif',   category: 'Wedding Film',     caption: "Le jour où tout se joue… ce n'est pas le moment d'improviser.",                        embedCode: 'DWKAcZ-N_bo',  isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-8.jpg',    title: 'AZ Atelier',          category: 'Product Film',     caption: 'Chez AZ Atelier, chaque pastilla suit un processus précis.',                           embedCode: 'DUGwWodjeqc',  isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-9.jpg',    title: 'Des Moments',         category: 'Event Coverage',   caption: 'Des moments qui comptent, des souvenirs pour toujours.',                               embedCode: 'DSsAHN1DIQ2',  isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-10.jpg',   title: 'We Came To Create',   category: 'Creative Film',    caption: "We didn't come here to change the past. We came because we care.",                      embedCode: 'DSYMc6CDGzx',  isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-11.jpg',   title: '100+ Soutenances',    category: 'Graduation Film',  caption: 'Hamdoulilah… plus de 100 soutenances filmées, et chaque fois unique.',                  embedCode: 'DRuc-2bjCUx',  isReel: true,  account: 'youssef' },
  { src: '/assets/images/work-12.jpg',   title: 'Produce With Youss',  category: 'Agency Promo',     caption: '🎬 Produce with Youss. From concept to screen — we craft visuals that speak.',          embedCode: 'DRVI1nqjCGW',  isReel: true,  account: 'youssef' },
  // ── @prodyous.ma (unique content) ─────────────────────────────────
  { src: '/assets/images/agency-3.jpg',  title: "L'Impact",            category: 'Cinematic',        caption: "L'impact ne s'improvise pas. Sa portée non plus.",                                       embedCode: 'DV93GDyiDhx',  isReel: true,  account: 'prodyous' },
  { src: '/assets/images/agency-7.jpg',  title: 'Brand Energy',        category: 'Commercial',       caption: 'Derrière chaque marque, il y a une énergie. Une personnalité.',                        embedCode: 'DVwzEuPiCrc',  isReel: true,  account: 'prodyous' },
  { src: '/assets/images/agency-1.jpg',  title: 'La Recherche',        category: 'Documentary',      caption: 'La recherche commence souvent loin des salles de conférence.',                         embedCode: 'DWAaPTFCG6m',  isReel: false, account: 'prodyous' },
  { src: '/assets/images/agency-2.jpg',  title: "L'Expertise",         category: 'Corporate',        caption: "L'expertise ne s'improvise pas. Son image non plus.",                                   embedCode: 'DVmnbl-CFzQ',  isReel: false, account: 'prodyous' },
  { src: '/assets/images/agency-4.jpg',  title: 'Avant La Caméra',     category: 'BTS',              caption: 'Chaque projet commence avant la caméra. Dans la réflexion.',                           embedCode: 'DVw6Pm3CHDt',  isReel: false, account: 'prodyous' },
  { src: '/assets/images/agency-5.jpg',  title: 'Certaines Marques',   category: 'Brand Identity',   caption: "Certaines marques ne cherchent pas simplement à communiquer.",                          embedCode: 'DVw6DZKCNwQ',  isReel: false, account: 'prodyous' },
  { src: '/assets/images/agency-6.jpg',  title: 'Congrès & Conférence', category: 'Medical Event',   caption: 'Un congrès, une conférence, une démonstration médicale — ne so pas laissés au hasard.', embedCode: 'DVmn1p8CJZ0',  isReel: false, account: 'prodyous' },
  { src: '/assets/images/agency-8.jpg',  title: 'Avant Les Résultats', category: 'Vision',           caption: "Avant les résultats, il y a une vision. Avant l'impact, il y a une direction.",        embedCode: 'DV6L2GriMB4',  isReel: false, account: 'prodyous' },
];

type Work = typeof works[0];
type Filter = 'all' | 'videos' | 'photos';
interface WorkCardProps { work: Work; index: number; onOpen: (w: Work) => void; key?: Key; }

function WorkCard({ work, index, onOpen }: WorkCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(work)}
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
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  const embedSrc = `https://www.instagram.com/${work.isReel ? 'reel' : 'p'}/${work.embedCode}/embed/`;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, backgroundColor: `${NAVY}F4`, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(10px)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', maxWidth: '900px', width: '100%' }}
        className="lightbox-inner"
      >
        {/* Embed */}
        <div style={{ flex: '0 0 400px', position: 'relative', background: `${NAVY}60` }} className="lightbox-embed">
          {!loaded && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', minHeight: '500px' }}>
              <div style={{ fontSize: '28px', color: WHITE, marginBottom: '10px' }}>▶</div>
              <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: '13px', color: `${WHITE}60` }}>Loading…</p>
            </div>
          )}
          <iframe
            src={embedSrc}
            width="100%"
            height="560"
            frameBorder={0}
            scrolling="no"
            allowTransparency={true}
            allow="encrypted-media; autoplay"
            style={{ display: 'block', border: 'none', minHeight: '500px' }}
            onLoad={() => setLoaded(true)}
            title={work.title}
          />
        </div>

        {/* Info panel */}
        <div style={{ flex: 1, paddingTop: '8px', minWidth: 0 }} className="lightbox-info">
          <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: '11px', color: `${WHITE}55`, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '10px' }}>
            {work.category} · @{work.account === 'youssef' ? 'youssef_tayibi' : 'prodyous.ma'}
          </p>
          <p style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: '28px', color: WHITE, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '16px' }}>
            {work.title}
          </p>
          <p style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 300, fontSize: '15px', color: `${WHITE}85`, lineHeight: 1.7, marginBottom: '32px' }}>
            {work.caption}
          </p>
          <div style={{ paddingTop: '24px', borderTop: `1px solid ${WHITE}15` }}>
            <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: '12px', color: `${WHITE}45`, letterSpacing: '0.08em' }}>
              {work.isReel ? '▶ Video Reel' : '◼ Photo'} — ProdYous Visual Production
            </p>
          </div>
        </div>
      </motion.div>

      <button
        onClick={onClose}
        style={{ position: 'fixed', top: '20px', right: '20px', background: 'none', border: `1px solid ${WHITE}35`, color: WHITE, width: '44px', height: '44px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        aria-label="Close"
      >✕</button>

      <style>{`
        @media (max-width: 700px) {
          .lightbox-inner { flex-direction: column !important; }
          .lightbox-embed { flex: none !important; width: 100% !important; }
        }
      `}</style>
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
              Click any card to play ▶
            </p>
          </div>

          {/* Masonry grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
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
          button:hover { opacity: 0.85; }
        `}</style>
      </section>

      <AnimatePresence>
        {active && <Lightbox work={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
}
