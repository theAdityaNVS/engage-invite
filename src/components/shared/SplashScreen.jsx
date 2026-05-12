import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUPLE, ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

const LANGUAGES = [
  { code: 'en', label: 'English', script: 'A'  },
  { code: 'hi', label: 'हिंदी',   script: 'अ'  },
  { code: 'te', label: 'తెలుగు',  script: 'అ'  },
  { code: 'or', label: 'ଓଡ଼ିଆ',   script: 'ଅ'  },
];

function ChakraLayer() {
  return (
    <g>
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i * 15) * Math.PI / 180;
        return (
          <line key={i}
            x1="200" y1="200"
            x2={200 + 185 * Math.cos(a)} y2={200 + 185 * Math.sin(a)}
            stroke="#D4A843" strokeWidth="0.8" opacity="0.65"
          />
        );
      })}
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i * 15) * Math.PI / 180;
        return (
          <circle key={i}
            cx={200 + 185 * Math.cos(a)} cy={200 + 185 * Math.sin(a)}
            r="4" fill="#D4A843" opacity="0.6"
          />
        );
      })}
      {[60, 100, 140, 185].map((r, i) => (
        <circle key={i} cx="200" cy="200" r={r}
          stroke="#D4A843" strokeWidth="0.6" fill="none" opacity="0.25" />
      ))}
      <circle cx="200" cy="200" r="14" fill="#D4A843" opacity="0.45" />
      <circle cx="200" cy="200" r="6"  fill="#D4A843" opacity="0.75" />
    </g>
  );
}

function RangoliLayer() {
  const rings = [
    { n: 16, r: 160, rx: 10, ry: 26 },
    { n: 12, r: 110, rx:  8, ry: 20 },
    { n:  8, r:  65, rx:  6, ry: 15 },
  ];
  return (
    <g>
      {rings.map(({ n, r, rx, ry }, ri) =>
        Array.from({ length: n }, (_, i) => {
          const a = (i * (360 / n)) * Math.PI / 180;
          const px = 200 + r * Math.cos(a);
          const py = 200 + r * Math.sin(a);
          return (
            <ellipse key={`${ri}-${i}`}
              cx={px} cy={py} rx={rx} ry={ry}
              transform={`rotate(${i * (360 / n)} ${px} ${py})`}
              fill="#D4A843" opacity={0.5 - ri * 0.08}
            />
          );
        })
      )}
      <circle cx="200" cy="200" r="18" fill="#D4A843" opacity="0.5" />
    </g>
  );
}

function LotusLayer() {
  return (
    <g>
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30) * Math.PI / 180;
        const px = 200 + 140 * Math.cos(a);
        const py = 200 + 140 * Math.sin(a);
        return (
          <ellipse key={i}
            cx={px} cy={py} rx="16" ry="48"
            transform={`rotate(${i * 30} ${px} ${py})`}
            fill="#D4A843" opacity="0.35"
          />
        );
      })}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45 + 22.5) * Math.PI / 180;
        const px = 200 + 80 * Math.cos(a);
        const py = 200 + 80 * Math.sin(a);
        return (
          <ellipse key={i}
            cx={px} cy={py} rx="12" ry="34"
            transform={`rotate(${i * 45 + 22.5} ${px} ${py})`}
            fill="#D4A843" opacity="0.5"
          />
        );
      })}
      <circle cx="200" cy="200" r="22" fill="#D4A843" opacity="0.55" />
      <circle cx="200" cy="200" r="10" fill="#E8C060" opacity="0.7" />
    </g>
  );
}

const ORBITAL_SEED = (i, o) => ((i * 137 + o * 31) % 100) / 100;

function OrbitalParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      type: i < 6 ? 'steady' : i < 10 ? 'escape' : 'arrive',
      orbitR: 90 + (i % 4) * 25,
      duration: 8 + ORBITAL_SEED(i, 0) * 8,
      delay: ORBITAL_SEED(i, 1) * 12,
    }))
  , []);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {particles.map((p) => (
        <div key={p.id} style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: 5, height: 5,
          marginTop: -2.5, marginLeft: -2.5,
          borderRadius: '50%',
          background: '#D4A843',
          '--orbit-r': `${p.orbitR}px`,
          animation: `${p.type === 'steady' ? 'orbitSteady' : p.type === 'escape' ? 'orbitEscape' : 'orbitArrive'} ${p.duration}s ${p.delay}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

function MorphingMandala({ visible }) {
  const [layerIdx, setLayerIdx] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      setLayerIdx((i) => (i + 1) % 3);
    }, 9000);
    return () => clearInterval(timer);
  }, [visible]);

  const layers = [ChakraLayer, RangoliLayer, LotusLayer];

  return (
    <div style={{
      position: 'absolute',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'clamp(280px, 65vw, 420px)',
      height: 'clamp(280px, 65vw, 420px)',
      opacity: 0.3,
      pointerEvents: 'none',
    }}>
      <svg
        viewBox="0 0 400 400"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', animation: 'orbitSteady 60s linear infinite' }}
        aria-hidden="true"
      >
        {layers.map((Layer, idx) => (
          <g key={idx} style={{
            opacity: idx === layerIdx ? 1 : 0,
            transition: 'opacity 2.5s ease-in-out',
          }}>
            <Layer />
          </g>
        ))}
      </svg>
      <OrbitalParticles />
    </div>
  );
}

function DoorOrnamentation({ side }) {
  const isLeft = side === 'left';
  const knobX = isLeft ? 168 : 32;

  return (
    <svg
      viewBox="0 0 200 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <rect x="8" y="8" width="184" height="544" stroke="rgba(212,168,67,0.55)" strokeWidth="1.5" fill="none" />
      <rect x="14" y="14" width="172" height="532" stroke="rgba(212,168,67,0.22)" strokeWidth="0.75" fill="none" />
      <path d="M 8,90 Q 100,18 192,90" stroke="rgba(212,168,67,0.6)" strokeWidth="1.5" fill="rgba(212,168,67,0.05)" />
      <rect x="22" y="100" width="156" height="148" rx="5" stroke="rgba(212,168,67,0.3)" strokeWidth="1" fill="rgba(212,168,67,0.04)" />
      {[[22,100],[178,100],[22,248],[178,248]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill="rgba(212,168,67,0.45)" />
      ))}
      <path d="M100 112 L114 174 L100 236 L86 174 Z" stroke="rgba(212,168,67,0.3)" strokeWidth="1" fill="rgba(212,168,67,0.08)" />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i * 36) * Math.PI / 180;
        const px = 100 + 33 * Math.cos(a);
        const py = 308 + 33 * Math.sin(a);
        return (
          <ellipse key={i} cx={px} cy={py} rx="9" ry="20"
            transform={`rotate(${i * 36} ${px} ${py})`}
            fill="rgba(212,168,67,0.32)"
          />
        );
      })}
      {Array.from({ length: 7 }, (_, i) => {
        const a = (i * (360/7) + 26) * Math.PI / 180;
        const px = 100 + 17 * Math.cos(a);
        const py = 308 + 17 * Math.sin(a);
        return (
          <ellipse key={i} cx={px} cy={py} rx="6" ry="13"
            transform={`rotate(${i * (360/7) + 26} ${px} ${py})`}
            fill="rgba(212,168,67,0.45)"
          />
        );
      })}
      <circle cx="100" cy="308" r="11" fill="rgba(212,168,67,0.5)" />
      <circle cx="100" cy="308" r="5.5" fill="rgba(212,168,67,0.75)" />
      <circle cx={knobX} cy="308" r="11" stroke="rgba(212,168,67,0.65)" strokeWidth="2" fill="rgba(212,168,67,0.08)" />
      <circle cx={knobX} cy="308" r="4.5" fill="rgba(212,168,67,0.6)" />
      <rect x="22" y="370" width="156" height="152" rx="5" stroke="rgba(212,168,67,0.3)" strokeWidth="1" fill="rgba(212,168,67,0.04)" />
      {[[22,370],[178,370],[22,522],[178,522]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill="rgba(212,168,67,0.45)" />
      ))}
      <path d="M100 382 L114 446 L100 510 L86 446 Z" stroke="rgba(212,168,67,0.3)" strokeWidth="1" fill="rgba(212,168,67,0.08)" />
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1={22 + i * 24} y1="268" x2={22} y2={268 + i * 24}
          stroke="rgba(212,168,67,0.12)" strokeWidth="1"
        />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1={178 - i * 24} y1="268" x2={178} y2={268 + i * 24}
          stroke="rgba(212,168,67,0.12)" strokeWidth="1"
        />
      ))}
      {[130, 200, 380, 450].map((y, i) => (
        <g key={i}>
          <circle cx={isLeft ? 20 : 180} cy={y} r="5.5" fill="rgba(212,168,67,0.35)" />
          <circle cx={isLeft ? 20 : 180} cy={y} r="2.5" fill="rgba(212,168,67,0.65)" />
        </g>
      ))}
    </svg>
  );
}

export default function SplashScreen({ onEnter }) {
  const [visible, setVisible] = useState(true);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [langSelected, setLangSelected] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const { t, setLang, hasStoredLang } = useLanguage();

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('splash_shown')) {
      setVisible(false);
      onEnter?.();
      return;
    }
    const skipLang = hasStoredLang;
    const t1 = setTimeout(() => setDoorsOpen(true), 650);
    const t2 = setTimeout(() => {
      if (skipLang) {
        setShowButton(true);
      } else {
        setShowLang(true);
      }
    }, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [hasStoredLang]);

  useEffect(() => {
    if (!showLang || langSelected) return;
    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          handleLangSelect('en');
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showLang, langSelected]);

  const handleLangSelect = (code) => {
    setLang(code);
    setLangSelected(true);
    setShowLang(false);
    setTimeout(() => setShowButton(true), 600);
  };

  const handleEnter = () => {
    sessionStorage.setItem('splash_shown', '1');
    setVisible(false);
    onEnter?.();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 90,
            background: '#120A04',
            overflow: 'hidden',
          }}
        >
          {/* Parchment interior */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 38%, #FDF6E0 0%, #F4E4B5 55%, #E8CFA0 100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
          }}>
            <MorphingMandala visible={doorsOpen} />

            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%' }}>
              <div style={{
                fontFamily: "'Lora', serif",
                fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
                color: 'rgba(139,34,64,0.4)',
                marginBottom: '0.3rem',
              }}>ॐ</div>

              <div style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(2.8rem, 8.5vw, 5.2rem)',
                color: '#8B2240', lineHeight: 1, textAlign: 'center',
              }}>{COUPLE.GROOM_NAME}</div>

              <div style={{
                fontFamily: "'Lora', serif",
                fontSize: 'clamp(0.65rem, 1.8vw, 0.8rem)',
                color: '#C4572A', letterSpacing: '0.3em',
                textTransform: 'uppercase', margin: '0.35rem 0',
              }}>&amp;</div>

              <div style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(2.8rem, 8.5vw, 5.2rem)',
                color: '#8B2240', lineHeight: 1, textAlign: 'center',
                marginBottom: '1.2rem',
              }}>{COUPLE.BRIDE_NAME}</div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.9rem', justifyContent: 'center' }}>
                <div style={{ width: 55, height: 1, background: 'rgba(196,87,42,0.45)' }} />
                <span style={{ color: '#D4A843', fontSize: '0.55rem' }}>✦</span>
                <div style={{ width: 55, height: 1, background: 'rgba(196,87,42,0.45)' }} />
              </div>

              <p style={{
                fontFamily: "'Lora', serif", fontStyle: 'italic',
                fontSize: 'clamp(0.78rem, 1.8vw, 0.92rem)',
                color: 'rgba(45,24,16,0.52)', letterSpacing: '0.05em',
                marginBottom: '1.8rem', textAlign: 'center',
              }}>
                {ENGAGEMENT.DATE_DISPLAY} · {ENGAGEMENT.VENUE_CITY}
              </p>

              {/* Language buttons */}
              <AnimatePresence>
                {showLang && !langSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, x: -80, y: 80 }}
                    transition={{ duration: 0.5 }}
                    style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}
                  >
                    {LANGUAGES.map((l) => (
                      <motion.button
                        key={l.code}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => handleLangSelect(l.code)}
                        style={{
                          padding: '0.55rem 1.1rem',
                          background: 'rgba(139,34,64,0.08)',
                          border: '1px solid rgba(139,34,64,0.35)',
                          cursor: 'pointer',
                          fontFamily: "'Lora', serif",
                          fontSize: '0.85rem',
                          color: '#8B2240',
                          borderRadius: '4px',
                          letterSpacing: '0.04em',
                        }}
                      >
                        <span style={{ fontFamily: 'serif', marginRight: '0.35rem', fontSize: '1.1rem' }}>{l.script}</span>
                        {l.label}
                      </motion.button>
                    ))}
                    <div style={{ width: '100%', textAlign: 'center', marginTop: '0.4rem' }}>
                      <span style={{ fontFamily: "'Lora', serif", fontSize: '0.72rem', color: 'rgba(45,24,16,0.4)' }}>
                        Auto-selecting English in {countdown}s
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tap to open button */}
              <AnimatePresence>
                {showButton && (
                  <motion.button
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(139,34,64,0.28)' }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleEnter}
                    style={{
                      padding: '0.82rem 2.8rem',
                      background: '#8B2240', color: '#FDF6E0',
                      border: 'none', cursor: 'pointer',
                      fontFamily: "'Lora', serif",
                      fontSize: '0.82rem', letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 18px rgba(139,34,64,0.22)',
                      position: 'relative', zIndex: 10,
                    }}
                  >
                    Tap to open
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Temple doors with 3D perspective swing */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex',
            perspective: 1300,
            perspectiveOrigin: '50% 45%',
          }}>
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: doorsOpen ? -86 : 0 }}
              transition={{ duration: 1.35, ease: [0.4, 0, 0.15, 1] }}
              style={{
                width: '50%', height: '100%',
                background: 'linear-gradient(to right, #2E1006 0%, #5C2410 35%, #7A3018 65%, #5C2410 100%)',
                transformOrigin: 'left center',
                borderRight: '3px solid rgba(212,168,67,0.5)',
                position: 'relative',
                boxShadow: 'inset -10px 0 30px rgba(0,0,0,0.5)',
              }}
            >
              <DoorOrnamentation side="left" />
            </motion.div>

            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: doorsOpen ? 86 : 0 }}
              transition={{ duration: 1.35, ease: [0.4, 0, 0.15, 1] }}
              style={{
                width: '50%', height: '100%',
                background: 'linear-gradient(to left, #2E1006 0%, #5C2410 35%, #7A3018 65%, #5C2410 100%)',
                transformOrigin: 'right center',
                borderLeft: '3px solid rgba(212,168,67,0.5)',
                position: 'relative',
                boxShadow: 'inset 10px 0 30px rgba(0,0,0,0.5)',
              }}
            >
              <DoorOrnamentation side="right" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
