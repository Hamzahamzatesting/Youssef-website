import { motion } from 'motion/react';

const NAVY = '#1B1F6B';
const WHITE = '#FFFFFF';

const stats = [
  { value: '100+', label: 'Graduations Filmed', note: 'Hamdoulilah' },
  { value: '5+', label: 'Years of Experience', note: 'Since 2019' },
  { value: '2,440', label: 'Instagram Followers', note: '@youssef_tayibi' },
];

export default function Stats() {
  return (
    <section
      id="stats"
      style={{
        backgroundColor: WHITE,
        padding: 'clamp(60px, 8vh, 100px) clamp(20px, 4vw, 60px)',
        borderBottom: `1px solid ${NAVY}10`,
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          backgroundColor: `${NAVY}10`,
        }}
        className="stats-grid"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                backgroundColor: WHITE,
                padding: 'clamp(40px, 5vh, 60px) clamp(24px, 3vw, 48px)',
              }}
            >
              <p style={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(48px, 5vw, 80px)',
                color: NAVY,
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}>
                {s.value}
              </p>
              <p style={{
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 400,
                fontSize: '15px',
                color: NAVY,
                marginTop: '12px',
                lineHeight: 1.4,
              }}>
                {s.label}
              </p>
              <p style={{
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 300,
                fontSize: '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: `${NAVY}50`,
                marginTop: '8px',
              }}>
                {s.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
