import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUPLE, ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

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
      {/* Outer gold border */}
      <rect x="8" y="8" width="184" height="544" stroke="rgba(212,168,67,0.55)" strokeWidth="1.5" fill="none" />
      <rect x="14" y="14" width="172" height="532" stroke="rgba(212,168,67,0.22)" strokeWidth="0.75" fill="none" />

      {/* Top arch */}
      <path d="M 8,90 Q 100,18 192,90" stroke="rgba(212,168,67,0.6)" strokeWidth="1.5" fill="rgba(212,168,67,0.05)" />

      {/* Upper panel frame */}
      <rect x="22" y="100" width="156" height="148" rx="5" stroke="rgba(212,168,67,0.3)" strokeWidth="1" fill="rgba(212,168,67,0.04)" />
      {[[22,100],[178,100],[22,248],[178,248]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill="rgba(212,168,67,0.45)" />
      ))}
      <path d="M100 112 L114 174 L100 236 L86 174 Z" stroke="rgba(212,168,67,0.3)" strokeWidth="1" fill="rgba(212,168,67,0.08)" />

      {/* Central lotus bloom */}
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i * 36) * Math.PI / 180;
        const px = 100 + 33 * Math.cos(a);
        const py = 308 + 33 * Math.sin(a);
        return (
          <ellipse key={i}
            cx={px} cy={py}
            rx="9" ry="20"
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
          <ellipse key={i}
            cx={px} cy={py}
            rx="6" ry="13"
            transform={`rotate(${i * (360/7) + 26} ${px} ${py})`}
            fill="rgba(212,168,67,0.45)"
          />
        );
      })}
      <circle cx="100" cy="308" r="11" fill="rgba(212,168,67,0.5)" />
      <circle cx="100" cy="308" r="5.5" fill="rgba(212,168,67,0.75)" />

      {/* Door knocker */}
      <circle cx={knobX} cy="308" r="11" stroke="rgba(212,168,67,0.65)" strokeWidth="2" fill="rgba(212,168,67,0.08)" />
      <circle cx={knobX} cy="308" r="4.5" fill="rgba(212,168,67,0.6)" />

      {/* Lower panel frame */}
      <rect x="22" y="370" width="156" height="152" rx="5" stroke="rgba(212,168,67,0.3)" strokeWidth="1" fill="rgba(212,168,67,0.04)" />
      {[[22,370],[178,370],[22,522],[178,522]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill="rgba(212,168,67,0.45)" />
      ))}
      <path d="M100 382 L114 446 L100 510 L86 446 Z" stroke="rgba(212,168,67,0.3)" strokeWidth="1" fill="rgba(212,168,67,0.08)" />

      {/* Diagonal filigree in middle strip */}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i}
          x1={22 + i * 24} y1="268" x2={22} y2={268 + i * 24}
          stroke="rgba(212,168,67,0.12)" strokeWidth="1"
        />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i}
          x1={178 - i * 24} y1="268" x2={178} y2={268 + i * 24}
          stroke="rgba(212,168,67,0.12)" strokeWidth="1"
        />
      ))}

      {/* Side accent dots */}
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
  const [showButton, setShowButton] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('splash_shown')) {
      setVisible(false);
      onEnter?.();
      return;
    }
    const t1 = setTimeout(() => setDoorsOpen(true), 650);
    const t2 = setTimeout(() => setShowButton(true), 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

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
          {/* Warm parchment interior revealed behind doors */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 38%, #FDF6E0 0%, #F4E4B5 55%, #E8CFA0 100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
          }}>
            <div style={{
              fontFamily: "'Lora', serif",
              fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
              color: 'rgba(139,34,64,0.4)',
              marginBottom: '0.3rem',
              letterSpacing: '0.06em',
            }}>ॐ</div>

            <div style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 'clamp(2.8rem, 8.5vw, 5.2rem)',
              color: '#8B2240',
              lineHeight: 1,
              textAlign: 'center',
            }}>
              {COUPLE.GROOM_NAME}
            </div>
            <div style={{
              fontFamily: "'Lora', serif",
              fontSize: 'clamp(0.65rem, 1.8vw, 0.8rem)',
              color: '#C4572A',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              margin: '0.35rem 0',
            }}>&amp;</div>
            <div style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 'clamp(2.8rem, 8.5vw, 5.2rem)',
              color: '#8B2240',
              lineHeight: 1,
              textAlign: 'center',
              marginBottom: '1.4rem',
            }}>
              {COUPLE.BRIDE_NAME}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.9rem' }}>
              <div style={{ width: 55, height: 1, background: 'rgba(196,87,42,0.45)' }} />
              <span style={{ color: '#D4A843', fontSize: '0.55rem' }}>✦</span>
              <div style={{ width: 55, height: 1, background: 'rgba(196,87,42,0.45)' }} />
            </div>

            <p style={{
              fontFamily: "'Lora', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(0.78rem, 1.8vw, 0.92rem)',
              color: 'rgba(45,24,16,0.52)',
              letterSpacing: '0.05em',
              marginBottom: '2.8rem',
              textAlign: 'center',
            }}>
              {ENGAGEMENT.DATE_DISPLAY} · {ENGAGEMENT.VENUE_CITY}
            </p>

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
                    background: '#8B2240',
                    color: '#FDF6E0',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Lora', serif",
                    fontSize: '0.82rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 18px rgba(139,34,64,0.22)',
                  }}
                >
                  {t('tap_to_begin')}
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Temple doors with 3D perspective swing */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex',
            perspective: 1300,
            perspectiveOrigin: '50% 45%',
          }}>
            {/* Left door */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: doorsOpen ? -86 : 0 }}
              transition={{ duration: 1.35, ease: [0.4, 0, 0.15, 1] }}
              style={{
                width: '50%',
                height: '100%',
                background: 'linear-gradient(to right, #2E1006 0%, #5C2410 35%, #7A3018 65%, #5C2410 100%)',
                transformOrigin: 'left center',
                borderRight: '3px solid rgba(212,168,67,0.5)',
                position: 'relative',
                boxShadow: 'inset -10px 0 30px rgba(0,0,0,0.5)',
              }}
            >
              <DoorOrnamentation side="left" />
            </motion.div>

            {/* Right door */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: doorsOpen ? 86 : 0 }}
              transition={{ duration: 1.35, ease: [0.4, 0, 0.15, 1] }}
              style={{
                width: '50%',
                height: '100%',
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
