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

/* ── Jagannath / Odishan Nagara temple silhouette SVG ── */
function JagannathTempleSVG() {
  return (
    <svg
      viewBox="0 0 600 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 680, display: 'block' }}
      aria-label="Jagannath temple silhouette"
      /* PLACEHOLDER — swap src/public/illustrations/jagannath-temple-day.png when ready */
    >
      {/* Warm amber glow behind temple */}
      <ellipse cx="300" cy="300" rx="220" ry="60" fill="rgba(255,180,80,0.18)" />

      {/* Base platform */}
      <rect x="60" y="295" width="480" height="22" rx="3" fill="#C0654A" />
      <rect x="80" y="280" width="440" height="16" rx="2" fill="#A8563B" />

      {/* Side minor shrines */}
      <rect x="80" y="240" width="50" height="42" rx="2" fill="#8B4A30" />
      <path d="M75 240 Q105 200 135 240Z" fill="#7A3F28" />
      <rect x="470" y="240" width="50" height="42" rx="2" fill="#8B4A30" />
      <path d="M465 240 Q495 200 525 240Z" fill="#7A3F28" />

      {/* Main deul (sanctum) body */}
      <rect x="175" y="200" width="250" height="96" rx="4" fill="#9E5535" />

      {/* Deul stepped tiers rising to curvilinear shikhara */}
      <rect x="190" y="175" width="220" height="28" rx="3" fill="#8B4828" />
      <rect x="205" y="152" width="190" height="26" rx="3" fill="#7A3F20" />
      <rect x="218" y="132" width="164" height="23" rx="3" fill="#6D3818" />
      <rect x="230" y="114" width="140" height="21" rx="3" fill="#603210" />
      <rect x="240" y="98"  width="120" height="19" rx="2" fill="#552C0A" />
      <rect x="248" y="84"  width="104" height="17" rx="2" fill="#4A2606" />
      <rect x="256" y="72"  width="88"  height="14" rx="2" fill="#402005" />
      <rect x="263" y="62"  width="74"  height="13" rx="2" fill="#361A04" />
      <rect x="269" y="53"  width="62"  height="12" rx="2" fill="#2C1503" />
      <rect x="274" y="46"  width="52"  height="10" rx="2" fill="#241102" />
      <rect x="278" y="38"  width="44"  height="10" rx="2" fill="#1E0E02" />

      {/* Curvilinear top — the characteristic amalaka + kalasha */}
      <ellipse cx="300" cy="36" rx="22" ry="10" fill="#C0654A" />
      <ellipse cx="300" cy="28" rx="14" ry="9"  fill="#D4A843" />
      <circle  cx="300" cy="20" r="6"            fill="#E8C060" />
      <circle  cx="300" cy="14" r="4"            fill="#F0D68A" />
      {/* Sudarshana chakra flag staff */}
      <line x1="300" y1="14" x2="300" y2="4" stroke="#D4A843" strokeWidth="2" />
      <polygon points="300,4 307,10 300,8 293,10" fill="#D4A843" />

      {/* Carved wall detail lines */}
      {[210, 230, 250, 270, 290, 310, 330, 350, 370, 390].map((x) => (
        <line key={x} x1={x} y1="200" x2={x} y2="296" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      ))}

      {/* Temple entrance arch */}
      <path d="M255 296 L255 248 Q300 220 345 248 L345 296Z" fill="#7A3318" />
      <path d="M265 296 L265 252 Q300 228 335 252 L335 296Z" fill="#5A2510" />

      {/* Ground gradient */}
      <rect x="0" y="316" width="600" height="24" fill="rgba(120,60,30,0.35)" />
    </svg>
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

export default function EngagementHero() {
  const groomNames  = LANG_SEQUENCE.map((l) => TRANSLATIONS.NAMES[l].groom);
  const brideNames  = LANG_SEQUENCE.map((l) => TRANSLATIONS.NAMES[l].bride);
  const typedGroom  = useTypewriter(groomNames, 80, 1800);
  const typedBride  = useTypewriter(brideNames, 80, 1800);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const templeY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <section ref={sectionRef} style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, var(--hero-sky-dark) 0%, var(--hero-sky) 45%, #C8A87A 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '4rem',
      paddingBottom: '3.5rem',
    }}>
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
        <img
          src="/illustrations/jagannath-temple-day.png"
          alt="Jagannath temple"
          style={{ width: '100%', display: 'block', objectFit: 'contain' }}
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
        />
        <div style={{ display: 'none' }}><JagannathTempleSVG /></div>
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
