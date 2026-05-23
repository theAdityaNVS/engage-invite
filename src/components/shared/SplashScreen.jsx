import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUPLE, ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

const LANGUAGES = [
  { code: 'en', label: 'English', script: 'A'  },
  { code: 'hi', label: 'हिंदी',   script: 'अ'  },
  { code: 'te', label: 'తెలుగు',  script: 'అ'  },
  { code: 'or', label: 'ଓଡ଼ିଆ',   script: 'ଅ'  },
];

// Elegant Lotus watermark layer with slow counter-rotations
function AnimatedWatermark() {
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" style={{
      position: 'absolute', width: '130%', height: '130%', top: '-15%', left: '-15%',
      opacity: 0.08, pointerEvents: 'none'
    }}>
      <g>
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '200px 200px' }}>
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * 30) * Math.PI / 180;
            const px = parseFloat((200 + 140 * Math.cos(a)).toFixed(4));
            const py = parseFloat((200 + 140 * Math.sin(a)).toFixed(4));
            const rotateAngle = i * 30;
            return (
              <ellipse key={i} cx={px} cy={py} rx="16" ry="48"
                transform={`rotate(${rotateAngle} ${px} ${py})`}
                fill="#D4A843"
              />
            );
          })}
        </motion.g>
        <motion.g animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '200px 200px' }}>
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * 45 + 22.5) * Math.PI / 180;
            const px = parseFloat((200 + 80 * Math.cos(a)).toFixed(4));
            const py = parseFloat((200 + 80 * Math.sin(a)).toFixed(4));
            const rotateAngle = i * 45 + 22.5;
            return (
              <ellipse key={i} cx={px} cy={py} rx="12" ry="34"
                transform={`rotate(${rotateAngle} ${px} ${py})`}
                fill="#D4A843"
              />
            );
          })}
        </motion.g>
        <circle cx="200" cy="200" r="22" fill="#D4A843" />
        <circle cx="200" cy="200" r="10" fill="#E8C060" />
      </g>
    </svg>
  );
}

export default function SplashScreen({ onEnter, forceShow = false }) {
  const [visible, setVisible] = useState(true);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!forceShow && typeof window !== 'undefined' && sessionStorage.getItem('splash_shown')) {
      setVisible(false);
      onEnter?.();
      return;
    }
    const t1 = setTimeout(() => setDoorsOpen(true), 650);
    const t2 = setTimeout(() => setShowButton(true), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [forceShow]);

  const handleEnter = () => {
    if (!forceShow) {
      sessionStorage.setItem('splash_shown', '1');
    }
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
            background: 'var(--bg-primary)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
          }}>
            
            {/* The Breathing Halo */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 50%, rgba(212,168,67,0.1) 0%, rgba(139,34,64,0.03) 50%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* The Animated Gold Foil Watermark */}
            <AnimatedWatermark />

            {/* Blurred Pulsating Name Highlight */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                width: '320px', height: '320px',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(212,168,67,0.35) 0%, transparent 60%)',
                filter: 'blur(20px)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />

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
                color: 'var(--burgundy)', lineHeight: 1, textAlign: 'center',
              }}>{COUPLE.GROOM_NAME}</div>

              <div style={{
                fontFamily: "'Lora', serif",
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                color: '#C4572A', letterSpacing: '0.3em',
                textTransform: 'uppercase', margin: '0.5rem 0',
              }}>&amp;</div>

              <div style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(2.8rem, 8.5vw, 5.2rem)',
                color: 'var(--burgundy)', lineHeight: 1, textAlign: 'center',
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
                color: 'rgba(45,24,16,0.65)', letterSpacing: '0.05em',
                marginBottom: '1.8rem', textAlign: 'center',
              }}>
                {ENGAGEMENT.DATE_DISPLAY} · {ENGAGEMENT.VENUE_CITY}
              </p>



              {/* CTA button */}
              <AnimatePresence>
                {showButton && (
                  <motion.button
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ 
                      opacity: 1, y: 0, 
                      scale: [1, 1.04, 1], 
                      boxShadow: [
                        '0 2px 8px rgba(139,34,64,0.15), 0 8px 24px rgba(139,34,64,0.25)', 
                        '0 6px 16px rgba(139,34,64,0.3), 0 16px 36px rgba(139,34,64,0.45)', 
                        '0 2px 8px rgba(139,34,64,0.15), 0 8px 24px rgba(139,34,64,0.25)'
                      ] 
                    }}
                    transition={{ 
                      opacity: { duration: 0.55, ease: 'easeOut' },
                      y: { duration: 0.55, ease: 'easeOut' },
                      scale: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                      boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }
                    }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleEnter}
                    style={{
                      minHeight: '52px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 3.5rem',
                      background: '#8B2240', color: '#FDF6E0',
                      border: 'none', cursor: 'pointer',
                      fontFamily: "'Lora', serif",
                      fontSize: '0.82rem', letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      borderRadius: '4px',
                      position: 'relative', zIndex: 10,
                    }}
                  >
                    YOU ARE INVITED
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Premium Patrika Cardstock Doors */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex',
            perspective: 1300,
            perspectiveOrigin: '50% 45%',
            pointerEvents: 'none',
            zIndex: 20,
          }}>
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: doorsOpen ? -86 : 0 }}
              transition={{ duration: 1.35, ease: [0.4, 0, 0.15, 1] }}
              style={{
                width: '50%', height: '100%',
                background: 'var(--burgundy-dark)', // Deep rich burgundy cardstock
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
                transformOrigin: 'left center',
                position: 'relative',
                boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.3)',
                willChange: 'transform',
              }}
            >
              {/* Delicate Gold Inner Border */}
              <div style={{ position: 'absolute', inset: '12px 6px 12px 12px', border: '1px solid rgba(212,168,67,0.4)', borderRadius: '2px' }} />
              <div style={{ position: 'absolute', inset: '18px 10px 18px 18px', border: '1px solid rgba(212,168,67,0.15)', borderRadius: '2px' }} />
              <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: 2, height: 180, background: 'rgba(212,168,67,0.7)' }} />
            </motion.div>

            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: doorsOpen ? 86 : 0 }}
              transition={{ duration: 1.35, ease: [0.4, 0, 0.15, 1] }}
              style={{
                width: '50%', height: '100%',
                background: 'var(--burgundy-dark)',
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
                transformOrigin: 'right center',
                position: 'relative',
                boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.3)',
                willChange: 'transform',
              }}
            >
              {/* Delicate Gold Inner Border */}
              <div style={{ position: 'absolute', inset: '12px 12px 12px 6px', border: '1px solid rgba(212,168,67,0.4)', borderRadius: '2px' }} />
              <div style={{ position: 'absolute', inset: '18px 18px 18px 10px', border: '1px solid rgba(212,168,67,0.15)', borderRadius: '2px' }} />
              <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 2, height: 180, background: 'rgba(212,168,67,0.7)' }} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
