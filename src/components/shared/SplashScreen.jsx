import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUPLE, ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

function GoldMandalaRing() {
  const petals = 12;
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 240, height: 240 }} aria-hidden="true">
      {/* Outer ring */}
      <circle cx="120" cy="120" r="110" stroke="rgba(212,168,67,0.25)" strokeWidth="1" strokeDasharray="3 4" />
      <circle cx="120" cy="120" r="100" stroke="rgba(212,168,67,0.4)"  strokeWidth="1.5" />
      {/* Petal motifs */}
      {Array.from({ length: petals }, (_, i) => {
        const a = (i * 360) / petals;
        const rad = (a * Math.PI) / 180;
        const x = 120 + 80 * Math.cos(rad);
        const y = 120 + 80 * Math.sin(rad);
        return (
          <g key={i} transform={`rotate(${a} 120 120)`}>
            <ellipse cx="120" cy="42" rx="6" ry="10" fill="rgba(212,168,67,0.35)" />
            <circle  cx={x}   cy={y}   r="2.5"       fill="rgba(212,168,67,0.5)" />
          </g>
        );
      })}
      {/* Inner lotus */}
      <circle cx="120" cy="120" r="50" stroke="rgba(212,168,67,0.3)" strokeWidth="1" strokeDasharray="2 3" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <path key={a}
          d={`M120 120 Q${120 + 22 * Math.cos((a - 18) * Math.PI / 180)} ${120 + 22 * Math.sin((a - 18) * Math.PI / 180)} ${120 + 34 * Math.cos(a * Math.PI / 180)} ${120 + 34 * Math.sin(a * Math.PI / 180)} Q${120 + 22 * Math.cos((a + 18) * Math.PI / 180)} ${120 + 22 * Math.sin((a + 18) * Math.PI / 180)} 120 120Z`}
          fill="rgba(212,168,67,0.2)"
        />
      ))}
    </svg>
  );
}

export default function SplashScreen({ onEnter }) {
  const [visible, setVisible] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('splash_shown')) {
      setVisible(false);
      onEnter?.();
    }
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
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 90,
            background: 'var(--navy)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Rotating mandala ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', opacity: 0.6 }}
          >
            <GoldMandalaRing />
          </motion.div>

          <motion.div
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.65, ease: 'easeOut' }}
            style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 2rem' }}
          >
            {/* Monogram circle */}
            <div style={{
              width: 130,
              height: 130,
              borderRadius: '50%',
              border: '2px solid rgba(212,168,67,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.75rem',
              background: 'rgba(212,168,67,0.06)',
              boxShadow: '0 0 48px rgba(212,168,67,0.15), inset 0 0 30px rgba(212,168,67,0.05)',
            }}>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '3rem',
                color: '#D4A843',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}>
                {COUPLE.GROOM_NAME[0]}
                <span style={{ color: 'rgba(212,168,67,0.5)', fontSize: '1.8rem', verticalAlign: 'middle', margin: '0 3px' }}>✦</span>
                {COUPLE.BRIDE_NAME[0]}
              </span>
            </div>

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.1rem, 3.5vw, 1.35rem)',
              color: 'rgba(245,236,200,0.9)',
              marginBottom: '0.35rem',
              letterSpacing: '0.12em',
            }}>
              {COUPLE.GROOM_NAME} &amp; {COUPLE.BRIDE_NAME}
            </p>
            <p style={{
              fontFamily: "'Lora', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(0.82rem, 2.2vw, 0.95rem)',
              color: 'rgba(212,168,67,0.65)',
              marginBottom: '2.5rem',
              letterSpacing: '0.04em',
            }}>
              {ENGAGEMENT.DATE_DISPLAY} · {ENGAGEMENT.VENUE_CITY}
            </p>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 8px 28px rgba(212,168,67,0.3)' }}
              whileTap={{ scale: 0.96 }}
              onClick={handleEnter}
              style={{
                padding: '0.85rem 2.4rem',
                background: 'transparent',
                color: '#D4A843',
                border: '1.5px solid rgba(212,168,67,0.6)',
                borderRadius: '50px',
                cursor: 'pointer',
                fontFamily: "'Lora', serif",
                fontSize: '0.95rem',
                letterSpacing: '0.08em',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            >
              {t('tap_to_begin')} 🎵
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
