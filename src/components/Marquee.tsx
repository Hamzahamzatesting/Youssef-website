const NAVY = '#1B1F6B';
const WHITE = '#FFFFFF';

const items = [
  'Film Direction',
  '✦',
  'Photography',
  '✦',
  'Corporate Events',
  '✦',
  'Wedding Films',
  '✦',
  'Content Creation',
  '✦',
  'Visual Storytelling',
  '✦',
  'From Concept to Screen',
  '✦',
  'ProdYous · Morocco',
  '✦',
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        backgroundColor: NAVY,
        overflow: 'hidden',
        borderTop: `1px solid ${WHITE}10`,
        borderBottom: `1px solid ${WHITE}10`,
        padding: '20px 0',
      }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: '"Cunia", sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(13px, 1.5vw, 16px)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: item === '✦' ? `${WHITE}40` : WHITE,
              paddingRight: '40px',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
