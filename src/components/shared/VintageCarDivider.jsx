import { motion } from 'framer-motion';

/* ── Blue 1960s Mercedes-style sedan ── */
function BlueCar() {
  return (
    <svg viewBox="0 0 320 130" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 320, display: 'block' }} aria-hidden="true">
      {/* Body */}
      <rect x="30" y="68" width="260" height="38" rx="6" fill="#3A7DB8" />
      {/* Cabin */}
      <path d="M80 68 Q90 34 120 30 L200 30 Q230 34 240 68Z" fill="#2E6A9E" />
      {/* Windows */}
      <path d="M90 67 Q95 42 118 38 L155 38 L152 67Z" fill="#A8D4F0" opacity="0.85"/>
      <path d="M160 67 L158 38 L198 38 Q220 42 225 67Z" fill="#A8D4F0" opacity="0.85"/>
      {/* Window divider */}
      <line x1="156" y1="38" x2="156" y2="68" stroke="#2E6A9E" strokeWidth="3"/>
      {/* Wheels */}
      <circle cx="90"  cy="108" r="22" fill="#1A1A1A" />
      <circle cx="90"  cy="108" r="12" fill="#888" />
      <circle cx="90"  cy="108" r="5"  fill="#555" />
      <circle cx="230" cy="108" r="22" fill="#1A1A1A" />
      <circle cx="230" cy="108" r="12" fill="#888" />
      <circle cx="230" cy="108" r="5"  fill="#555" />
      {/* Headlights */}
      <ellipse cx="292" cy="78" rx="8" ry="5" fill="#FFF176" opacity="0.9"/>
      <ellipse cx="28"  cy="78" rx="8" ry="5" fill="#FFF176" opacity="0.7"/>
      {/* Chrome trim */}
      <rect x="30" y="100" width="260" height="4" rx="2" fill="rgba(255,255,255,0.25)" />
      {/* Door line */}
      <line x1="160" y1="68" x2="160" y2="106" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
      {/* Antenna */}
      <line x1="115" y1="30" x2="110" y2="10" stroke="#2E6A9E" strokeWidth="2"/>
    </svg>
  );
}

/* ── Black 1940s sedan ── */
function BlackCar() {
  return (
    <svg viewBox="0 0 320 130" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 320, display: 'block' }} aria-hidden="true">
      {/* Body — bulbous 40s shape */}
      <path d="M20 100 L20 72 Q22 62 40 60 L280 60 Q298 62 300 72 L300 100Z" fill="#222" />
      {/* Running boards */}
      <rect x="60"  y="100" width="50" height="6" rx="2" fill="#333"/>
      <rect x="210" y="100" width="50" height="6" rx="2" fill="#333"/>
      {/* High cabin roof */}
      <path d="M70 60 Q78 28 110 24 L210 24 Q242 28 250 60Z" fill="#1A1A1A" />
      {/* Windows */}
      <path d="M80 59 Q84 34 108 30 L148 30 L145 59Z" fill="#9AB8C8" opacity="0.8"/>
      <path d="M153 59 L151 30 L208 30 Q232 34 240 59Z" fill="#9AB8C8" opacity="0.8"/>
      {/* Window divider */}
      <line x1="149" y1="30" x2="149" y2="60" stroke="#1A1A1A" strokeWidth="3"/>
      {/* Wheels */}
      <circle cx="88"  cy="106" r="24" fill="#111" />
      <circle cx="88"  cy="106" r="13" fill="#666" />
      <circle cx="88"  cy="106" r="5"  fill="#444" />
      <circle cx="232" cy="106" r="24" fill="#111" />
      <circle cx="232" cy="106" r="13" fill="#666" />
      <circle cx="232" cy="106" r="5"  fill="#444" />
      {/* Headlights */}
      <circle cx="302" cy="72" r="7" fill="#FFFDE0" opacity="0.9"/>
      <circle cx="18"  cy="72" r="7" fill="#FFFDE0" opacity="0.7"/>
      {/* Chrome bumper */}
      <rect x="18"  y="98" width="18" height="6" rx="2" fill="#999"/>
      <rect x="284" y="98" width="18" height="6" rx="2" fill="#999"/>
      {/* Hood ornament */}
      <line x1="300" y1="60" x2="310" y2="55" stroke="#999" strokeWidth="1.5"/>
      <circle cx="311" cy="54" r="2" fill="#CCC"/>
    </svg>
  );
}

const CAR_IMAGES = {
  blue: '/illustrations/vintage-car-blue-mercedes.png',
  black: '/illustrations/vintage-car-black-sedan.png',
};
const CAR_FALLBACKS = { blue: BlueCar, black: BlackCar };

function CarIllustration({ color }) {
  const FallbackCar = CAR_FALLBACKS[color] || CAR_FALLBACKS.blue;
  const src = CAR_IMAGES[color];
  return (
    <>
      <img
        src={src}
        alt={`${color} vintage car`}
        style={{ width: '100%', display: 'block', objectFit: 'contain' }}
        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
      />
      <div style={{ display: 'none' }}><FallbackCar /></div>
    </>
  );
}

export default function VintageCarDivider({ color = 'blue', fromColor, toColor }) {
  return (
    <div style={{
      position: 'relative',
      height: 90,
      overflow: 'hidden',
      background: toColor || 'var(--rose)',
    }}>
      {/* Top half keeps previous section color */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '50%',
        background: fromColor || 'var(--teal)',
      }} />

      {/* Car slides in on scroll */}
      <motion.div
        initial={{ x: color === 'black' ? '-60vw' : '60vw' }}
        whileInView={{ x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 280,
          zIndex: 2,
        }}
      >
        <CarIllustration color={color} />
      </motion.div>
    </div>
  );
}
