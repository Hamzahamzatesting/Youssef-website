import { motion } from 'motion/react';

const NAVY = '#1B1F6B';
const WHITE = '#FFFFFF';

const whatsappReviews = [
  {
    flag: '🇹🇳',
    country: 'Tunisie',
    raw: "Sinn 3aychek 3la kol chy , ton professionnalisme, ta gentillesse , combien j'étais à l'aise avec vous , kif kif tout mes amis partagent le mm avis aussi vous méritez d'être un photographe à l'échelle internationale wlh ❤️⭐😍🙏🙏🙏",
    time: '00:03',
    context: 'Faculté de Médecine Dentaire · Rabat',
  },
  {
    flag: '🇲🇦',
    country: 'Maroc',
    raw: "Vraiment top du top tbarkilah 3lik 3jeebni lvideo bzzf mli bdit ntferej o ana dahka hit vraiment hebliit hit Throughout the video you can really feel the energy the good vibes the happiness Chookraan bzzf youssef ❤️",
    time: '19:08',
    context: 'Faculté de Médecine et de Pharmacie · Rabat',
  },
];

const igReview = {
  username: 'meriembouallam',
  flag: '🇲🇦',
  country: 'Maroc',
  raw: 'Thank you so much for capturing one of the best memories of my life !!!',
  context: 'Université Internationale de Rabat',
  likes: 12,
};

function WhatsAppCard({ r, delay, offsetTop }: { r: typeof whatsappReviews[0]; delay: number; offsetTop: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      style={{ marginTop: offsetTop }}
    >
      <div style={{
        borderRadius: '22px',
        overflow: 'hidden',
        boxShadow: '0 24px 72px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #075E54 0%, #1a7a6e 100%)',
          padding: '13px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '11px',
        }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.12)',
              border: '2px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px',
            }}>{r.flag}</div>
            <div style={{
              position: 'absolute', bottom: 1, right: 1,
              width: 10, height: 10, borderRadius: '50%',
              backgroundColor: '#25D366', border: '2px solid #075E54',
            }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '14px', fontWeight: 700, color: WHITE, lineHeight: 1.2 }}>
              {r.flag} {r.country}
            </p>
            <p style={{
              fontFamily: '"Montserrat", sans-serif', fontSize: '11px',
              color: 'rgba(255,255,255,0.55)', marginTop: '2px',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{r.context}</p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.35)" style={{ flexShrink: 0 }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.527 5.862L.057 23.25a.75.75 0 00.916.916l5.388-1.47A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.528-5.218-1.443l-.374-.222-3.879 1.058 1.059-3.879-.223-.374A9.953 9.953 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
          </svg>
        </div>

        {/* Chat */}
        <div style={{
          backgroundColor: '#E5DDD5',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
          padding: '20px 16px 16px',
        }}>
          <div style={{
            backgroundColor: WHITE,
            borderRadius: '4px 16px 16px 16px',
            padding: '13px 15px 9px',
            maxWidth: '90%',
            boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: -9,
              width: 0, height: 0, borderStyle: 'solid',
              borderWidth: '0 10px 10px 0',
              borderColor: `transparent ${WHITE} transparent transparent`,
            }} />
            <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 'clamp(13px, 1vw, 15px)', color: '#1a1a1a', lineHeight: 1.65 }}>
              {r.raw}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px', marginTop: '7px' }}>
              <span style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '11px', color: '#8696A0' }}>{r.time}</span>
              <span style={{ color: '#53BDEB', fontSize: '13px', lineHeight: 1 }}>✓✓</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          backgroundColor: '#1a1a2e', padding: '13px 18px',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ fontSize: '18px' }}>{r.flag}</span>
          <div>
            <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '12px', fontWeight: 600, color: WHITE, lineHeight: 1 }}>{r.country}</p>
            <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '3px', letterSpacing: '0.05em' }}>
              Message non modifié
            </p>
          </div>
          <span style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginLeft: 'auto', letterSpacing: '0.05em' }}>
            Via WhatsApp
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        backgroundColor: '#0F1456',
        backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(27,31,107,0.8) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(18,140,126,0.12) 0%, transparent 50%)',
        padding: 'clamp(90px, 11vh, 130px) clamp(20px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      <div style={{ maxWidth: '1340px', margin: '0 auto', position: 'relative' }}>

        {/* Heading */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: 'clamp(56px, 8vh, 96px)' }}>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}
            >
              Ils en parlent
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.06 }}
              style={{ fontFamily: '"Cunia", sans-serif', fontSize: 'clamp(34px, 4.5vw, 62px)', color: WHITE, lineHeight: 1, letterSpacing: '-0.02em' }}
            >
              Vrais messages,<br />vrais clients
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.3)', maxWidth: '240px', lineHeight: 1.7, textAlign: 'right' }}
          >
            Messages et commentaires reçus —<br />non modifiés, non filtrés.
          </motion.p>
        </div>

        {/* Top row: 2 WhatsApp cards */}
        <div className="t-grid-top">
          <WhatsAppCard r={whatsappReviews[0]} delay={0} offsetTop={0} />
          <WhatsAppCard r={whatsappReviews[1]} delay={0.15} offsetTop={40} />
        </div>

        {/* Bottom: Instagram comment card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ marginTop: 'clamp(16px, 2.5vw, 36px)' }}
        >
          <div style={{
            borderRadius: '22px',
            overflow: 'hidden',
            boxShadow: '0 24px 72px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
            {/* Instagram header */}
            <div style={{
              background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
              padding: '13px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              {/* Avatar */}
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                padding: '2px',
                flexShrink: 0,
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  backgroundColor: '#1a1a2e',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px',
                }}>
                  🇲🇦
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '13px', fontWeight: 700, color: WHITE, lineHeight: 1.2 }}>
                  @{igReview.username}
                </p>
                <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>
                  a commenté sur le reel · {igReview.context}
                </p>
              </div>

              {/* Instagram icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)" style={{ flexShrink: 0 }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </div>

            {/* Comment body */}
            <div style={{
              backgroundColor: '#1a1d3a',
              padding: '28px 28px 24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366)',
                padding: '2px', flexShrink: 0,
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  backgroundColor: '#252849',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px',
                }}>🇲🇦</div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '13px', fontWeight: 700, color: WHITE }}>
                    {igReview.username}
                  </span>
                  <span style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
                    {igReview.flag} {igReview.country}
                  </span>
                </div>
                <p style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: 'clamp(15px, 1.4vw, 20px)',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.88)',
                  lineHeight: 1.6,
                  letterSpacing: '0.01em',
                }}>
                  {igReview.raw}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '14px' }}>
                  <span style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>
                    ❤️ {igReview.likes} j'aime
                  </span>
                  <span style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Commentaire Instagram · non modifié
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      <style>{`
        .t-grid-top {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(16px, 3vw, 40px);
          align-items: start;
        }
        @media (max-width: 740px) {
          .t-grid-top { grid-template-columns: 1fr !important; }
          .t-grid-top > div { margin-top: 0 !important; }
        }
      `}</style>
    </section>
  );
}
