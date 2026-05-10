import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ onEnter }) {
  const [visible, setVisible] = useState(true);

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
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 90,
            background: 'linear-gradient(160deg, #FFF8F0 0%, #FDF0E0 40%, #FFF8F0 100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Rotating kolam ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', width: '280px', height: '280px', opacity: 0.15 }}
          >
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {[0,45,90,135,180,225,270,315].map((angle) => (
                <g key={angle} transform={`rotate(${angle} 100 100)`}>
                  <line x1="100" y1="10" x2="100" y2="40" stroke="#8B1A2B" strokeWidth="2"/>
                  <circle cx="100" cy="7" r="4" fill="#D4A843"/>
                  <path d="M100 40 Q85 60 80 80 Q100 70 120 80 Q115 60 100 40Z" fill="#8B1A2B" opacity="0.6"/>
                </g>
              ))}
              <circle cx="100" cy="100" r="50" stroke="#D4A843" strokeWidth="1.5" strokeDasharray="4 3"/>
              <circle cx="100" cy="100" r="65" stroke="#8B1A2B" strokeWidth="1" strokeDasharray="2 4"/>
            </svg>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
          >
            <div style={{
              width: '140px', height: '140px', borderRadius: '50%',
              border: '2px solid #D4A843',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
              background: 'rgba(212,168,67,0.08)',
              boxShadow: '0 0 40px rgba(212,168,67,0.2)',
            }}>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '3.5rem',
                color: '#8B1A2B',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}>
                A<span style={{ color: '#D4A843', fontSize: '2rem', verticalAlign: 'middle', margin: '0 2px' }}>❧</span>J
              </span>
            </div>

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1rem, 3vw, 1.1rem)',
              color: '#6B4E3D',
              marginBottom: '0.5rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              Aditya &amp; Jyoti
            </p>
            <p style={{
              fontFamily: "'Lora', serif",
              fontSize: '0.9rem',
              color: '#8B1A2B',
              marginBottom: '2.5rem',
              opacity: 0.7,
            }}>
              17th June 2026 · Bhubaneswar
            </p>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 6px 24px rgba(139,26,43,0.3)' }}
              whileTap={{ scale: 0.97 }}
              onClick={handleEnter}
              style={{
                padding: '0.9rem 2.5rem',
                background: '#8B1A2B',
                color: '#FFF8F0',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontFamily: "'Lora', serif",
                fontSize: '1rem',
                letterSpacing: '0.05em',
                boxShadow: '0 4px 16px rgba(139,26,43,0.25)',
              }}
            >
              Tap to experience with music 🎵
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
