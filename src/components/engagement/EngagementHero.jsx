import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingLanterns from '@/components/shared/FloatingLanterns';
import { COUPLE, TRANSLATIONS, ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

const LANG_SEQUENCE = ['en', 'hi', 'te', 'or'];

function useTypewriter(texts, speed = 80, pause = 1800) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    let timeout;
    if (!deleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setDeleting(true), pause);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), speed / 2);
      } else {
        setDeleting(false);
        setIndex((i) => (i + 1) % texts.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, texts, speed, pause]);

  return displayed;
}

/* ── Jagannath / Odishan Nagara temple — curvilinear shikhara ── */
function JagannathTempleSVG() {
  return (
    <svg viewBox="0 -50 1000 380" preserveAspectRatio="xMidYMax meet" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 900, display: 'block' }}
      aria-label="Jagannath temple"
    >
      <ellipse cx="500" cy="295" rx="360" ry="55" fill="rgba(255,180,80,0.22)" />

      {/* Ambient shadow gradient */}
      <defs>
        <radialGradient id="templeGlow" cx="50%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#FFAA30" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FFAA30" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C58B35" />
          <stop offset="30%" stopColor="#E5C070" />
          <stop offset="70%" stopColor="#F5DCA0" />
          <stop offset="100%" stopColor="#B57A25" />
        </linearGradient>
        <linearGradient id="shikharaGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#964020" />
          <stop offset="40%" stopColor="#B05530" />
          <stop offset="80%" stopColor="#7E331A" />
          <stop offset="100%" stopColor="#4A1E0E" />
        </linearGradient>
        <linearGradient id="stoneShadow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
        </linearGradient>
      </defs>

      <rect x="140" y="40" width="720" height="280" fill="url(#templeGlow)" pointerEvents="none" />

      {/* Base platform (Pitha) with high-detail mouldings and steps */}
      <g id="base-platform">
        <rect x="60" y="300" width="880" height="24" rx="4" fill="#6E2C14" />
        <rect x="60" y="300" width="880" height="24" fill="url(#stoneShadow)" />
        <line x1="60" y1="300" x2="940" y2="300" stroke="#8E3C1B" strokeWidth="2" />
        
        {/* Horizontal frieze lines on base */}
        {[304, 308, 312, 316, 320].map((y, idx) => (
          <line key={idx} x1="64" y1={y} x2="936" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        ))}
        
        <rect x="90" y="285" width="820" height="15" rx="3" fill="#803418" />
        <rect x="90" y="285" width="820" height="15" fill="url(#stoneShadow)" />
        
        <rect x="120" y="272" width="760" height="13" rx="2" fill="#933D1C" />
        <rect x="120" y="272" width="760" height="13" fill="url(#stoneShadow)" />
        
        <rect x="150" y="260" width="700" height="12" rx="2" fill="#A84822" />
        <rect x="150" y="260" width="700" height="12" fill="url(#stoneShadow)" />
      </g>

      {/* Side Shrines (Anga-shikharas) with authentic miniature nagara silhouette */}
      {/* Flanking Left Shikhara */}
      <g id="left-shrine">
        <rect x="180" y="210" width="100" height="50" fill="#933D1C" />
        <rect x="180" y="210" width="100" height="50" fill="url(#stoneShadow)" />
        {/* Curved shikhara tiers for side shrine */}
        <path d="M 180 210 Q 185 185 200 170 L 260 170 Q 275 185 280 210 Z" fill="url(#shikharaGrad)" />
        <path d="M 180 210 Q 185 185 200 170 L 260 170 Q 275 185 280 210 Z" fill="url(#stoneShadow)" />
        
        <path d="M 195 170 Q 198 152 210 142 L 250 142 Q 262 152 265 170 Z" fill="#6E2C14" />
        <path d="M 205 142 Q 212 128 230 124 L 230 124 Q 248 128 255 142 Z" fill="#4A1E0E" />

        {/* Small Amalaka & Kalasha on left shrine */}
        <ellipse cx="230" cy="123" rx="14" ry="4" fill="#A84822" />
        <ellipse cx="230" cy="119" rx="10" ry="3" fill="#D4A843" />
        <circle cx="230" cy="114" r="3.5" fill="#E8C060" />
        <polygon points="230,111 236,108 230,104 228,108" fill="#D4A843" />

        {/* Miniature pilasters/indentations */}
        {[190, 210, 230, 250, 270].map((x) => (
          <line key={x} x1={x} y1="210" x2={x} y2="260" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
        ))}
      </g>

      {/* Flanking Right Shikhara */}
      <g id="right-shrine">
        <rect x="720" y="210" width="100" height="50" fill="#933D1C" />
        <rect x="720" y="210" width="100" height="50" fill="url(#stoneShadow)" />
        {/* Curved shikhara tiers for side shrine */}
        <path d="M 720 210 Q 725 185 740 170 L 800 170 Q 815 185 820 210 Z" fill="url(#shikharaGrad)" />
        <path d="M 720 210 Q 725 185 740 170 L 800 170 Q 815 185 820 210 Z" fill="url(#stoneShadow)" />
        
        <path d="M 735 170 Q 738 152 750 142 L 790 142 Q 802 152 805 170 Z" fill="#6E2C14" />
        <path d="M 745 142 Q 752 128 770 124 L 770 124 Q 788 128 795 142 Z" fill="#4A1E0E" />

        {/* Small Amalaka & Kalasha on right shrine */}
        <ellipse cx="770" cy="123" rx="14" ry="4" fill="#A84822" />
        <ellipse cx="770" cy="119" rx="10" ry="3" fill="#D4A843" />
        <circle cx="770" cy="114" r="3.5" fill="#E8C060" />
        <polygon points="770,111 776,108 770,104 768,108" fill="#D4A843" />

        {/* Miniature pilasters/indentations */}
        {[730, 750, 770, 790, 810].map((x) => (
          <line key={x} x1={x} y1="210" x2={x} y2="260" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
        ))}
      </g>

      {/* Main Shikhara (curvilinear tower) - majestic proportions */}
      <g id="main-shikhara">
        {/* Main central block (Bada) vertical ribs */}
        <rect x="290" y="170" width="420" height="90" fill="url(#shikharaGrad)" />
        <rect x="290" y="170" width="420" height="90" fill="url(#stoneShadow)" />

        {/* Bada architectural pilasters and niche designs */}
        {[310, 330, 350, 370, 390, 410, 430, 450, 470, 490, 510, 520, 530, 550, 570, 590, 610, 630, 650, 670, 690].map((x) => (
          <g key={x}>
            <line x1={x} y1="170" x2={x} y2="260" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
            <line x1={x + 1} y1="170" x2={x + 1} y2="260" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          </g>
        ))}

        {/* Horizontal banding on Bada (Bandhana mouldings) */}
        {[185, 205, 225, 245].map((y) => (
          <line key={y} x1="290" y1={y} x2="710" y2={y} stroke="rgba(0,0,0,0.4)" strokeWidth="2.5" />
        ))}

        {/* Curvilinear Shikhara Tiers (Gandi) - Curving in beautifully */}
        {/* Tier 1 */}
        <path d="M 290 170 Q 295 152 308 145 L 692 145 Q 705 152 710 170 Z" fill="#933D1C" />
        <path d="M 290 170 Q 295 152 308 145 L 692 145 Q 705 152 710 170 Z" fill="url(#stoneShadow)" />
        
        {/* Tier 2 */}
        <path d="M 304 145 Q 310 128 326 122 L 674 122 Q 690 128 696 145 Z" fill="#803418" />
        <path d="M 304 145 Q 310 128 326 122 L 674 122 Q 690 128 696 145 Z" fill="url(#stoneShadow)" />

        {/* Tier 3 */}
        <path d="M 322 122 Q 330 106 348 100 L 652 100 Q 670 106 678 122 Z" fill="#6E2C14" />
        <path d="M 322 122 Q 330 106 348 100 L 652 100 Q 670 106 678 122 Z" fill="url(#stoneShadow)" />

        {/* Tier 4 */}
        <path d="M 342 100 Q 352 86 372 80 L 628 80 Q 648 86 658 100 Z" fill="#5D240F" />
        <path d="M 342 100 Q 352 86 372 80 L 628 80 Q 648 86 658 100 Z" fill="url(#stoneShadow)" />

        {/* Tier 5 */}
        <path d="M 364 80 Q 376 66 398 60 L 602 60 Q 624 66 636 80 Z" fill="#4D1D0B" />
        <path d="M 364 80 Q 376 66 398 60 L 602 60 Q 624 66 636 80 Z" fill="url(#stoneShadow)" />

        {/* Tier 6 */}
        <path d="M 388 60 Q 402 47 426 42 L 574 42 Q 598 47 612 60 Z" fill="#3E1608" />
        <path d="M 388 60 Q 402 47 426 42 L 574 42 Q 598 47 612 60 Z" fill="url(#stoneShadow)" />

        {/* Tier 7 */}
        <path d="M 414 42 Q 428 29 456 25 L 544 25 Q 572 29 586 42 Z" fill="#301005" />
        <path d="M 414 42 Q 428 29 456 25 L 544 25 Q 572 29 586 42 Z" fill="url(#stoneShadow)" />

        {/* Tier 8 - Neck portion (Beki) */}
        <path d="M 444 25 Q 454 16 475 14 L 525 14 Q 546 16 556 25 Z" fill="#1F0A03" />

        {/* Shikhara texture lines - vertical lines running along shikhara curve to depict rock carvings */}
        {[340, 380, 420, 460, 500, 540, 580, 620, 660].map((startPoint) => {
          const offset = startPoint - 500;
          const curveL = `M ${startPoint} 170 Q ${500 + offset * 0.7} 80 ${500 + offset * 0.2} 25`;
          return (
            <path key={startPoint} d={curveL} stroke="rgba(255,180,80,0.08)" strokeWidth="1.5" fill="none" />
          );
        })}
      </g>

      {/* Entrance Archway (Torana) - detailed multilayered gateway */}
      <g id="entrance-gate">
        <path d="M 400 260 L 400 200 Q 500 165 600 200 L 600 260 Z" fill="#5D240F" stroke="#3E1608" strokeWidth="2" />
        <path d="M 415 260 L 415 208 Q 500 178 585 208 L 585 260 Z" fill="#3E1608" />
        <path d="M 430 260 L 430 216 Q 500 190 570 216 L 570 260 Z" fill="#1F0A03" />

        {/* Outer arch carvings (scalloped halo) */}
        <path d="M 380 260 C 380 180, 620 180, 620 260" stroke="#D4A843" strokeWidth="1.5" strokeDasharray="4,6" fill="none" />
        <path d="M 370 260 C 370 170, 630 170, 630 260" stroke="rgba(212,168,67,0.4)" strokeWidth="1" fill="none" />

        {/* Sculpted lotus medallion above gate */}
        <circle cx="500" cy="180" r="10" fill="url(#goldGrad)" />
        <circle cx="500" cy="180" r="6" fill="#1F0A03" />
        <circle cx="500" cy="180" r="3" fill="#FFE070" />

        {/* Gate steps */}
        <rect x="420" y="254" width="160" height="6" rx="1" fill="#803418" />
        <rect x="440" y="248" width="120" height="6" rx="1" fill="#A84822" fillOpacity="0.8" />
      </g>

      {/* Master Crown (Mastaka) - Ribbed Amalaka, Golden Kalasha, Flag */}
      <g id="crown">
        {/* Amalaka - majestic stone cushion with rich horizontal ribs */}
        <ellipse cx="500" cy="13" rx="44" ry="9" fill="#803418" />
        <ellipse cx="500" cy="13" rx="44" ry="9" fill="url(#stoneShadow)" />
        <ellipse cx="500" cy="8" rx="36" ry="8" fill="#A84822" />
        <ellipse cx="500" cy="8" rx="36" ry="8" fill="url(#stoneShadow)" />
        
        {/* Rib markings for Amalaka */}
        {[-36, -24, -12, 0, 12, 24, 36].map((dx) => (
          <path key={dx} d={`M ${500 + dx} 4 Q ${500 + dx * 0.9} 8 ${500 + dx * 0.8} 17`} stroke="#301005" strokeWidth="1.5" />
        ))}

        <ellipse cx="500" cy="1" rx="26" ry="6" fill="#D4A843" />
        
        {/* Kalasha pot */}
        <ellipse cx="500" cy="-6" rx="18" ry="9" fill="url(#goldGrad)" />
        <ellipse cx="500" cy="-14" rx="12" ry="4" fill="#FFE070" />
        <circle cx="500" cy="-18" r="6.5" fill="#FFE070" />
        
        {/* Kalasha staff (Chakra / Trishula) */}
        <line x1="500" y1="-22" x2="500" y2="-45" stroke="#FFE070" strokeWidth="2.5" />
        <circle cx="500" cy="-32" r="7.5" stroke="#D4A843" strokeWidth="2" fill="none" />
        
        {/* Sacred Flag (Dhvaja) - flowing dynamically to the right */}
        <path d="M 500 -45 Q 528 -40 545 -48 Q 532 -33 500 -37 Z" fill="#E5C070" />
        <path d="M 500 -45 Q 528 -40 545 -48 Q 532 -33 500 -37 Z" fill="url(#goldGrad)" fillOpacity="0.7" />
      </g>

      <rect x="0" y="324" width="1000" height="8" fill="rgba(60,20,10,0.35)" />
    </svg>
  );
}

function SunArc({ phase }) {
  return (
    <div style={{
      position: 'absolute',
      top: '12%', left: 0,
      width: 36, height: 36,
      borderRadius: '50%',
      background: phase === 'sunrise'
        ? 'radial-gradient(circle, #FFE070 30%, #FFAA30 70%, transparent 100%)'
        : 'radial-gradient(circle, #FFD060 30%, #E07040 70%, transparent 100%)',
      boxShadow: phase === 'sunrise'
        ? '0 0 28px 12px rgba(255,200,80,0.4)'
        : '0 0 28px 12px rgba(220,100,60,0.35)',
      animation: 'sunArc 80s linear infinite',
      pointerEvents: 'none',
      zIndex: 1,
    }} />
  );
}

/* ── Terracotta scalloped arch band ── */
function TerracottaArchBand() {
  const archCount = 10;
  const w = 600;
  const archW = w / archCount;
  const archH = 28;

  const d = Array.from({ length: archCount }, (_, i) => {
    const x = i * archW;
    return `M${x} ${archH} Q${x + archW / 2} 0 ${x + archW} ${archH}`;
  }).join(' ') + ` L${w} ${archH} L${w} ${archH + 8} L0 ${archH + 8} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${archH + 8}`}
      preserveAspectRatio="none"
      style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 40, display: 'block' }}
    >
      <path d={d} fill="#C0654A" />
    </svg>
  );
}

const SKY_SUNRISE = 'linear-gradient(180deg, #FF8C42 0%, #FFB347 28%, #FFD37A 55%, #A8C8E8 100%)';
const SKY_SUNSET  = 'linear-gradient(180deg, #1E0A3C 0%, #7A1830 28%, #C45050 55%, #E8905A 100%)';

const GROOM_NAMES = LANG_SEQUENCE.map((l) => TRANSLATIONS.NAMES[l].groom);
const BRIDE_NAMES = LANG_SEQUENCE.map((l) => TRANSLATIONS.NAMES[l].bride);

export default function EngagementHero() {
  const { t } = useLanguage();
  const typedGroom  = useTypewriter(GROOM_NAMES, 80, 1800);
  const typedBride  = useTypewriter(BRIDE_NAMES, 80, 1800);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const templeY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  const [skyPhase, setSkyPhase] = useState('sunrise');
  useEffect(() => {
    const timer = setInterval(() => {
      setSkyPhase(p => p === 'sunrise' ? 'sunset' : 'sunrise');
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={sectionRef} style={{
      minHeight: '100vh',
      background: skyPhase === 'sunrise' ? SKY_SUNRISE : SKY_SUNSET,
      transition: 'background 8s ease-in-out',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '4rem',
      paddingBottom: '3.5rem',
    }}>
      <SunArc phase={skyPhase} />
      <FloatingLanterns count={16} />

      {/* Names overlay */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: '0 1.5rem',
        marginBottom: '1.5rem',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <p style={{
            fontFamily: "'Lora', serif",
            fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)',
            color: 'rgba(245,236,200,0.75)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: '0.6rem',
          }}>
            ✦ Together They Begin ✦
          </p>

          {/* GROOM */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3rem, 9vw, 6rem)',
            color: '#FFF8F0',
            lineHeight: 1.05,
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
            minHeight: '1.1em',
          }}>
            {typedGroom}
            <span style={{ borderRight: '3px solid #D4A843', marginLeft: 2, animation: 'cursorBlink 1s step-end infinite' }} />
          </h1>

          {/* WEDS */}
          <p style={{
            fontFamily: "'Lora', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)',
            color: '#D4A843',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            margin: '0.4rem 0',
          }}>
            {t('weds')}
          </p>

          {/* BRIDE */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3rem, 9vw, 6rem)',
            color: '#FFF8F0',
            lineHeight: 1.05,
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
            minHeight: '1.1em',
          }}>
            {typedBride}
            <span style={{ borderRight: '3px solid #D4A843', marginLeft: 2, animation: 'cursorBlink 1s step-end infinite' }} />
          </h1>

          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(0.85rem, 2vw, 1.05rem)',
            color: 'rgba(240,214,138,0.9)',
            letterSpacing: '0.06em',
            marginTop: '1rem',
          }}>
            {ENGAGEMENT.DATE_DISPLAY} · {ENGAGEMENT.VENUE_NAME}, {ENGAGEMENT.VENUE_CITY}
          </p>
        </motion.div>
      </div>

      {/* Temple illustration — parallax at 40% scroll speed */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 800,
          padding: '0 1rem',
          overflow: 'hidden',
          y: templeY,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 70%, transparent 100%)',
        }}
      >
        <JagannathTempleSVG />
      </motion.div>

      {/* Scroll chevron */}
      <motion.div
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '1rem',
          color: '#D4A843',
          fontSize: '1.6rem',
        }}
        aria-hidden="true"
      >
        ↓
      </motion.div>

      {/* Terracotta arch transition */}
      <TerracottaArchBand />
    </section>
  );
}
