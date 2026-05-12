import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingLanterns from '@/components/shared/FloatingLanterns';
import { COUPLE, TRANSLATIONS, ENGAGEMENT } from '@/config';

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
    <svg viewBox="0 0 1000 320" preserveAspectRatio="xMidYMax meet" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 900, display: 'block' }}
      aria-label="Jagannath temple"
    >
      <ellipse cx="500" cy="295" rx="340" ry="55" fill="rgba(255,180,80,0.18)" />

      {/* Base platform */}
      <rect x="80"  y="288" width="840" height="20" rx="3" fill="#9A4A28" />
      <rect x="110" y="275" width="780" height="14" rx="2" fill="#8B4020" />
      <rect x="140" y="265" width="720" height="12" rx="2" fill="#7A3618" />

      {/* Main deul body */}
      <rect x="260" y="185" width="480" height="82" rx="4" fill="#A05030" />
      {[300,340,380,420,460,500,540,580,620,660,700].map(x => (
        <line key={x} x1={x} y1="185" x2={x} y2="267" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5"/>
      ))}

      {/* Curvilinear shikhara tiers — bezier-curved paths */}
      <path d="M285 185 Q290 178 300 174 L700 174 Q710 178 715 185Z" fill="#965028"/>
      <path d="M298 174 Q305 164 318 159 L682 159 Q695 164 702 174Z" fill="#8A4520"/>
      <path d="M314 159 Q322 147 338 141 L662 141 Q678 147 686 159Z" fill="#7E3E1A"/>
      <path d="M332 141 Q342 127 360 120 L640 120 Q658 127 668 141Z" fill="#723818"/>
      <path d="M353 120 Q364 104 385 96  L615 96  Q636 104 647 120Z" fill="#663214"/>
      <path d="M378 96  Q390 78  414 69  L586 69  Q610 78  622 96Z"  fill="#5A2C10"/>
      <path d="M406 69  Q419 50  446 40  L554 40  Q581 50  594 69Z"  fill="#4E260C"/>
      <path d="M436 40  Q449 22  476 13  L524 13  Q551 22  564 40Z"  fill="#422008"/>
      <path d="M464 13  Q472 4  490 1   L510 1  Q528 4  536 13Z"     fill="#361A04"/>

      {/* Amalaka + Kalasha */}
      <ellipse cx="500" cy="1" rx="38" ry="12" fill="#C0654A" />
      <ellipse cx="500" cy="-8"  rx="20" ry="9"  fill="#D4A843"/>
      <ellipse cx="500" cy="-16" rx="12" ry="7"  fill="#E8C060"/>
      <circle  cx="500" cy="-22" r="5"            fill="#F0D48A"/>
      <line x1="500" y1="-27" x2="500" y2="-36" stroke="#D4A843" strokeWidth="2"/>
      <polygon points="500,-36 506,-31 500,-33 494,-31" fill="#D4A843"/>

      {/* Side shrines — left */}
      <rect x="130" y="220" width="120" height="47" rx="3" fill="#8B4020"/>
      <path d="M135 220 Q145 200 190 195 L245 195 Q250 200 248 220Z" fill="#7A3618"/>
      <path d="M145 195 Q152 182 190 178 L235 178 Q245 182 248 195Z" fill="#6A2E12"/>
      <path d="M155 178 Q165 168 190 163 L228 163 Q240 168 242 178Z" fill="#5A260E"/>
      <ellipse cx="195" cy="162" rx="18" ry="7" fill="#C0654A"/>
      <circle  cx="195" cy="156" r="5"           fill="#D4A843"/>

      {/* Side shrines — right */}
      <rect x="750" y="220" width="120" height="47" rx="3" fill="#8B4020"/>
      <path d="M752 220 Q755 200 800 195 L855 195 Q862 200 865 220Z" fill="#7A3618"/>
      <path d="M758 195 Q762 182 800 178 L848 178 Q858 182 860 195Z" fill="#6A2E12"/>
      <path d="M766 178 Q772 168 800 163 L840 163 Q852 168 854 178Z" fill="#5A260E"/>
      <ellipse cx="810" cy="162" rx="18" ry="7" fill="#C0654A"/>
      <circle  cx="810" cy="156" r="5"           fill="#D4A843"/>

      {/* Entrance arch */}
      <path d="M420 267 L420 224 Q500 196 580 224 L580 267Z" fill="#7A3318"/>
      <path d="M432 267 L432 228 Q500 205 568 228 L568 267Z" fill="#5A2510"/>
      <ellipse cx="500" cy="205" rx="14" ry="10" fill="#C0654A"/>

      <rect x="0" y="308" width="1000" height="12" fill="rgba(100,50,20,0.3)"/>
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

export default function EngagementHero() {
  const groomNames  = LANG_SEQUENCE.map((l) => TRANSLATIONS.NAMES[l].groom);
  const brideNames  = LANG_SEQUENCE.map((l) => TRANSLATIONS.NAMES[l].bride);
  const typedGroom  = useTypewriter(groomNames, 80, 1800);
  const typedBride  = useTypewriter(brideNames, 80, 1800);

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
            Weds
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
          width: '110%',
          left: '-5%',
          maxWidth: 800,
          padding: '0 1rem',
          y: templeY,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 70%, transparent 100%)',
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
