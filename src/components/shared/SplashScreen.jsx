import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUPLE, ENGAGEMENT } from '@/config';

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

  // Manage body scroll locking and initial scroll-to-top
  useEffect(() => {
    window.scrollTo(0, 0);

    if (visible) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [visible]);

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
    // Force scroll to top on entering
    window.scrollTo(0, 0);
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
            position: 'fixed', inset: 0, zIndex: 9999,
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
                fontSize: 'clamp(4.2rem, 13vw, 6.5rem)',
                color: 'var(--burgundy)', lineHeight: 1, textAlign: 'center',
              }}>{COUPLE.GROOM_NAME}</div>

              <div style={{
                fontFamily: "'Lora', serif",
                fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
                color: '#C4572A', letterSpacing: '0.3em',
                textTransform: 'uppercase', margin: '0.5rem 0',
              }}>&amp;</div>

              <div style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(4.2rem, 13vw, 6.5rem)',
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
                backgroundImage: 'url("/textures/cream-paper.png")',
                backgroundBlendMode: 'multiply', // keep the burgundy rich; texture darkens instead of washing it out
                transformOrigin: 'left center',
                position: 'relative',
                boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.3)',
                willChange: 'transform',
              }}
            >
              {/* Delicate Gold Inner Border */}
              <div style={{ position: 'absolute', inset: '12px 6px 12px 12px', border: '1px solid rgba(212,168,67,0.6)', borderRadius: '2px' }} />
              <div style={{ position: 'absolute', inset: '18px 10px 18px 18px', border: '1px solid rgba(212,168,67,0.3)', borderRadius: '2px' }} />
              <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: 2, height: 180, background: 'rgba(212,168,67,0.7)' }} />
            </motion.div>

            {/* Embossed Gold Monogram Wax Seal Medallion */}
            <AnimatePresence>
              {!doorsOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.75, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.65, rotate: 20, filter: 'blur(8px)' }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }} // Overshoot spring for tactile bounce
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    x: '-50%',
                    y: '-50%',
                    zIndex: 30, // Pinned above doors
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Outer Spilled Wax Ring (Organic, imperfect hand-poured fluid edge) */}
                  <div style={{
                    position: 'relative',
                    width: '92px',
                    height: '92px',
                    borderRadius: '52% 48% 51% 49% / 49% 52% 48% 51%',
                    background: 'radial-gradient(circle at 35% 35%, #FFF0D0 0%, #E2B755 25%, #B38628 55%, #7D5712 85%, #4A3105 100%)',
                    boxShadow: `
                      0 10px 30px rgba(0, 0, 0, 0.75), 
                      inset 0 3px 6px rgba(255, 255, 255, 0.5), 
                      inset 0 -4px 8px rgba(0, 0, 0, 0.6),
                      0 0 0 1px rgba(212, 168, 67, 0.2)
                    `,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {/* Inner Stamped Rim (Re-poured/pressed boundary) */}
                    <div style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '50%',
                      border: '1.5px double rgba(162, 118, 19, 0.65)',
                      background: 'radial-gradient(circle at 30% 30%, #FBECC4 0%, #D8A73C 35%, #997017 75%, #634505 100%)',
                      boxShadow: 'inset 0 3px 5px rgba(0,0,0,0.5), 0 1px 2px rgba(255,255,255,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      {/* Auspicious Om Accent at Top of Stamp */}
                      <span style={{
                        position: 'absolute',
                        top: '7px',
                        fontFamily: "'Lora', serif",
                        fontSize: '0.55rem',
                        fontWeight: 'bold',
                        color: 'rgba(58, 13, 24, 0.85)',
                        textShadow: '0.5px 0.5px 0px rgba(255,255,255,0.2)',
                        opacity: 0.95,
                        letterSpacing: '0.1em',
                      }}>
                        ॐ
                      </span>

                      {/* Stamped Initials - embossed/pressed deep into the gold wax */}
                      <span style={{
                        fontFamily: "'Great Vibes', cursive",
                        fontSize: '2.1rem',
                        fontWeight: 'bold',
                        color: '#340812', // Rich deeply-recessed burgundy color
                        textShadow: `
                          -0.75px -0.75px 1px rgba(0, 0, 0, 0.8), 
                          0.75px 0.75px 1px rgba(255, 255, 255, 0.25)
                        `, // High-fidelity embossing shadow map
                        marginTop: '3px',
                        letterSpacing: '-0.03em',
                        userSelect: 'none',
                      }}>
                        A&J
                      </span>

                      {/* Inner Accent Ring */}
                      <div style={{
                        position: 'absolute',
                        inset: '4px',
                        borderRadius: '50%',
                        border: '0.5px solid rgba(255, 255, 255, 0.08)',
                        pointerEvents: 'none',
                      }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: doorsOpen ? 86 : 0 }}
              transition={{ duration: 1.35, ease: [0.4, 0, 0.15, 1] }}
              style={{
                width: '50%', height: '100%',
                background: 'var(--burgundy-dark)',
                backgroundImage: 'url("/textures/cream-paper.png")',
                backgroundBlendMode: 'multiply', // keep the burgundy rich; texture darkens instead of washing it out
                transformOrigin: 'right center',
                position: 'relative',
                boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.3)',
                willChange: 'transform',
              }}
            >
              {/* Delicate Gold Inner Border */}
              <div style={{ position: 'absolute', inset: '12px 12px 12px 6px', border: '1px solid rgba(212,168,67,0.6)', borderRadius: '2px' }} />
              <div style={{ position: 'absolute', inset: '18px 18px 18px 10px', border: '1px solid rgba(212,168,67,0.3)', borderRadius: '2px' }} />
              <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 2, height: 180, background: 'rgba(212,168,67,0.7)' }} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
