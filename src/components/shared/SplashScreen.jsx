import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUPLE, ENGAGEMENT, TRANSLATIONS } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

const LANG_HINTS = [
  { code: 'en', hint: 'Select your language' },
  { code: 'hi', hint: 'भाषा चुनें' },
  { code: 'te', hint: 'భాష ఎంచుకోండి' },
  { code: 'or', hint: 'ଭାଷା ବାଛନ୍ତୁ' },
];

const LANG_CHIPS = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हि' },
  { code: 'te', label: 'తె' },
  { code: 'or', label: 'ଓ' },
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
  const { lang, setLang, hasStoredLang } = useLanguage();
  const names = TRANSLATIONS.NAMES[lang] || TRANSLATIONS.NAMES.en;
  const [visible, setVisible] = useState(true);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [tooltipIndex, setTooltipIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Cycle the language hint tooltip until the user picks a language
  useEffect(() => {
    if (hasInteracted) return;
    const id = setInterval(() => {
      setTooltipIndex((i) => (i + 1) % 4);
    }, 1800);
    return () => clearInterval(id);
  }, [hasInteracted]);

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

  const showHint = !hasInteracted;

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

            {/* Premium Language Selector Pill Container */}
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              zIndex: 10000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.4rem',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(59, 13, 24, 0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(212, 168, 67, 0.35)',
                borderRadius: '9999px',
                padding: '0.3rem 0.5rem',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s ease',
              }}>
                {/* Minimalist Globe Icon */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFEBA7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 0.85, marginLeft: '0.3rem' }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>

                {/* Vertical Divider */}
                <div style={{ width: '1px', height: '14px', background: 'rgba(212, 168, 67, 0.25)', margin: '0 0.1rem' }} />

                {/* Language Chips */}
                <div style={{ display: 'flex', gap: '0.1rem' }}>
                  {LANG_CHIPS.map((chip) => {
                    const active = chip.code === lang;
                    return (
                      <motion.button
                        key={chip.code}
                        onClick={() => { setLang(chip.code); setHasInteracted(true); }}
                        whileHover={{ scale: active ? 1 : 1.1, color: active ? '#3B0D18' : '#FFEBA7' }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          position: 'relative',
                          minWidth: '34px',
                          minHeight: '34px',
                          borderRadius: '50%',
                          border: 'none',
                          cursor: 'pointer',
                          background: 'transparent',
                          color: active ? '#3B0D18' : 'rgba(253, 246, 224, 0.7)',
                          fontFamily: 'var(--font-body)',
                          fontWeight: active ? 700 : 500,
                          fontSize: '0.8rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          outline: 'none',
                          zIndex: 2,
                          transition: 'color 0.2s ease',
                        }}
                        aria-label={`Switch to ${chip.code}`}
                      >
                        {active && (
                          <motion.div
                            layoutId="activeLangIndicator"
                            style={{
                              position: 'absolute',
                              inset: 0,
                              borderRadius: '50%',
                              background: 'radial-gradient(circle at 35% 35%, #FFEBA7 0%, #D4A843 70%, #A47B1E 100%)',
                              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                              zIndex: -1,
                            }}
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span style={{ position: 'relative', zIndex: 3 }}>{chip.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Tooltip hint that cycles and then fades out once selected */}
              <div style={{ height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '0.4rem' }}>
                <AnimatePresence mode="wait">
                  {showHint && (
                    <motion.span
                      key={tooltipIndex}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        color: doorsOpen ? 'rgba(139, 34, 64, 0.7)' : 'rgba(253, 246, 224, 0.65)',
                        textAlign: 'right',
                        fontStyle: 'italic',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {LANG_HINTS[tooltipIndex].hint}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

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
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
                color: 'rgba(139,34,64,0.4)',
                marginBottom: '0.3rem',
              }}>ॐ</div>

              <div style={{
                fontFamily: 'var(--font-script)',
                fontSize: 'clamp(4.2rem, 13vw, 6.5rem)',
                color: 'var(--burgundy)', lineHeight: 1, textAlign: 'center',
              }}>{names.groom}</div>

              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
                color: '#C4572A', letterSpacing: '0.3em',
                textTransform: 'uppercase', margin: '0.5rem 0',
              }}>&amp;</div>

              <div style={{
                fontFamily: 'var(--font-script)',
                fontSize: 'clamp(4.2rem, 13vw, 6.5rem)',
                color: 'var(--burgundy)', lineHeight: 1, textAlign: 'center',
                marginBottom: '1.2rem',
              }}>{names.bride}</div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.9rem', justifyContent: 'center' }}>
                <div style={{ width: 55, height: 1, background: 'rgba(196,87,42,0.45)' }} />
                <span style={{ color: '#D4A843', fontSize: '0.82rem' }}>✦</span>
                <div style={{ width: 55, height: 1, background: 'rgba(196,87,42,0.45)' }} />
              </div>

              <p style={{
                fontFamily: 'var(--font-body)', fontStyle: 'italic',
                fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
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
                      fontFamily: 'var(--font-body)',
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
                boxShadow: 'inset -30px 0 60px rgba(0,0,0,0.45)', // Deeper edge shadow for 3D paper folding look
                willChange: 'transform',
              }}
            >
              {/* Delicate Gold Inner Border */}
              <div style={{ position: 'absolute', inset: '12px 6px 12px 12px', border: '1px solid rgba(212,168,67,0.5)', borderRadius: '2px' }} />
              <div style={{ position: 'absolute', inset: '18px 10px 18px 18px', border: '1px solid rgba(212,168,67,0.25)', borderRadius: '2px' }} />

              {/* Luxury Corner Ornaments (Left Top & Left Bottom) */}
              <div style={{ position: 'absolute', left: '22px', top: '22px', opacity: 0.75, pointerEvents: 'none' }}>
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <path d="M4 4h40M4 4v40" stroke="#D4A843" strokeWidth="1.5" opacity="0.6" />
                  <path d="M8 8h32M8 8v32" stroke="#D4A843" strokeWidth="1" opacity="0.4" />
                  <path d="M4 28c8-1 12-5 16-16m-16 8c5-1 7-3 10-10m-10 18c11-1 15-5 21-21" stroke="#D4A843" strokeWidth="1" opacity="0.8" />
                  <circle cx="16" cy="16" r="2.5" fill="#FFEBA7" />
                </svg>
              </div>
              <div style={{ position: 'absolute', left: '22px', bottom: '22px', transform: 'scaleY(-1)', opacity: 0.75, pointerEvents: 'none' }}>
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <path d="M4 4h40M4 4v40" stroke="#D4A843" strokeWidth="1.5" opacity="0.6" />
                  <path d="M8 8h32M8 8v32" stroke="#D4A843" strokeWidth="1" opacity="0.4" />
                  <path d="M4 28c8-1 12-5 16-16m-16 8c5-1 7-3 10-10m-10 18c11-1 15-5 21-21" stroke="#D4A843" strokeWidth="1" opacity="0.8" />
                  <circle cx="16" cy="16" r="2.5" fill="#FFEBA7" />
                </svg>
              </div>

              {/* Royal Archway Split Halo (Traced Gold Lace) */}
              <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <svg width="70" height="140" viewBox="0 0 70 140" fill="none">
                  <path d="M 0,10 A 60,60 0 0,1 60,70 A 60,60 0 0,1 0,130" stroke="#D4A843" strokeWidth="2" opacity="0.8" />
                  <path d="M 0,20 A 50,50 0 0,1 50,70 A 50,50 0 0,1 0,120" stroke="#D4A843" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
                  {Array.from({ length: 5 }).map((_, idx) => {
                    const angle = -60 + (idx * 30); // distribute evenly
                    const rad = angle * Math.PI / 180;
                    const x = parseFloat((50 * Math.cos(rad)).toFixed(4));
                    const y = parseFloat((70 + 50 * Math.sin(rad)).toFixed(4));
                    return <circle key={idx} cx={x} cy={y} r="2.5" fill="#FFEBA7" stroke="#D4A843" strokeWidth="0.5" />;
                  })}
                </svg>
              </div>

              {/* 3D Fluted Brass Seam Clasp Molding (Left half) */}
              <div style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: '180px',
                background: 'linear-gradient(to right, #705213 0%, #D4A843 35%, #FFEBA7 50%, #B58A2A 65%, #593E05 100%)',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.4)'
              }} />
              <div style={{ position: 'absolute', right: '-3px', top: 'calc(50% - 90px)', transform: 'translateX(-50%)', color: '#FFEBA7', fontSize: '10px', textShadow: '0 1px 2px black', fontWeight: 'bold' }}>✦</div>
              <div style={{ position: 'absolute', right: '-3px', top: 'calc(50% + 80px)', transform: 'translateX(-50%)', color: '#FFEBA7', fontSize: '10px', textShadow: '0 1px 2px black', fontWeight: 'bold' }}>✦</div>
            </motion.div>

            {/* Embossed Gold Monogram Wax Seal Medallion */}
            <AnimatePresence>
              {!doorsOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.7, rotate: 12, filter: 'blur(6px)' }}
                  transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }} // Elegant deceleration curve
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
                  {/* Outer Beveled Luxury Gold Medallion Ring */}
                  <div style={{
                    position: 'relative',
                    width: '92px',
                    height: '92px',
                    borderRadius: '50%', // Geometric perfect circular shape for high luxury feel
                    background: 'radial-gradient(circle at 35% 35%, #FFEBA7 0%, #D4A843 42%, #A47B1E 75%, #593E05 100%)',
                    boxShadow: `
                      0 12px 32px rgba(0, 0, 0, 0.7), 
                      inset 0 2px 4px rgba(255, 255, 255, 0.5), 
                      inset 0 -3px 6px rgba(0, 0, 0, 0.55),
                      0 0 0 1px rgba(212, 168, 67, 0.45)
                    `,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {/* Inner Concentric Coin Rim (Double gold line) */}
                    <div style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '50%',
                      border: '1.5px solid rgba(212, 168, 67, 0.8)',
                      background: 'radial-gradient(circle at 30% 30%, #FFF0D0 0%, #E6C060 35%, #A87E1C 75%, #6E5007 100%)',
                      boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.45), 0 1px 2px rgba(255,255,255,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      {/* Elegant Overlapping Serif Monogram (A & J) */}
                      <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        userSelect: 'none',
                      }}>
                        {/* Letter A (Top-Left, Playfair Display Serif) */}
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.85rem',
                          fontWeight: '600',
                          color: '#3B0D18', // Deep royal burgundy
                          position: 'absolute',
                          left: '16px',
                          top: '11px',
                          lineHeight: 1,
                          textShadow: '1px 1px 0px rgba(255,255,255,0.35)',
                        }}>
                          A
                        </span>

                        {/* Script Ampersand (Centered, overlapping the letters) */}
                        <span style={{
                          fontFamily: 'var(--font-script)',
                          fontSize: '1.6rem',
                          fontWeight: 'bold',
                          color: '#F9E5B3', // Sparkling pale gold
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          zIndex: 3,
                          lineHeight: 1,
                          textShadow: '0 2px 4px rgba(0,0,0,0.45)',
                        }}>
                          &
                        </span>

                        {/* Letter J (Bottom-Right, Playfair Display Serif) */}
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.85rem',
                          fontWeight: '600',
                          color: '#3B0D18', // Deep royal burgundy
                          position: 'absolute',
                          right: '16px',
                          bottom: '11px',
                          lineHeight: 1,
                          textShadow: '1px 1px 0px rgba(255,255,255,0.35)',
                        }}>
                          J
                        </span>
                      </div>

                      {/* Inner Micro Border Accent */}
                      <div style={{
                        position: 'absolute',
                        inset: '3px',
                        borderRadius: '50%',
                        border: '0.5px solid rgba(255, 255, 255, 0.1)',
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
                boxShadow: 'inset 30px 0 60px rgba(0,0,0,0.45)', // Deeper edge shadow for 3D paper folding look
                willChange: 'transform',
              }}
            >
              {/* Delicate Gold Inner Border */}
              <div style={{ position: 'absolute', inset: '12px 12px 12px 6px', border: '1px solid rgba(212,168,67,0.5)', borderRadius: '2px' }} />
              <div style={{ position: 'absolute', inset: '18px 18px 18px 10px', border: '1px solid rgba(212,168,67,0.25)', borderRadius: '2px' }} />

              {/* Luxury Corner Ornaments (Right Top & Right Bottom) */}
              <div style={{ position: 'absolute', right: '22px', top: '22px', transform: 'scaleX(-1)', opacity: 0.75, pointerEvents: 'none' }}>
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <path d="M4 4h40M4 4v40" stroke="#D4A843" strokeWidth="1.5" opacity="0.6" />
                  <path d="M8 8h32M8 8v32" stroke="#D4A843" strokeWidth="1" opacity="0.4" />
                  <path d="M4 28c8-1 12-5 16-16m-16 8c5-1 7-3 10-10m-10 18c11-1 15-5 21-21" stroke="#D4A843" strokeWidth="1" opacity="0.8" />
                  <circle cx="16" cy="16" r="2.5" fill="#FFEBA7" />
                </svg>
              </div>
              <div style={{ position: 'absolute', right: '22px', bottom: '22px', transform: 'scale(-1)', opacity: 0.75, pointerEvents: 'none' }}>
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <path d="M4 4h40M4 4v40" stroke="#D4A843" strokeWidth="1.5" opacity="0.6" />
                  <path d="M8 8h32M8 8v32" stroke="#D4A843" strokeWidth="1" opacity="0.4" />
                  <path d="M4 28c8-1 12-5 16-16m-16 8c5-1 7-3 10-10m-10 18c11-1 15-5 21-21" stroke="#D4A843" strokeWidth="1" opacity="0.8" />
                  <circle cx="16" cy="16" r="2.5" fill="#FFEBA7" />
                </svg>
              </div>

              {/* Royal Archway Split Halo (Traced Gold Lace) */}
              <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%) scaleX(-1)', pointerEvents: 'none' }}>
                <svg width="70" height="140" viewBox="0 0 70 140" fill="none">
                  <path d="M 0,10 A 60,60 0 0,1 60,70 A 60,60 0 0,1 0,130" stroke="#D4A843" strokeWidth="2" opacity="0.8" />
                  <path d="M 0,20 A 50,50 0 0,1 50,70 A 50,50 0 0,1 0,120" stroke="#D4A843" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
                  {Array.from({ length: 5 }).map((_, idx) => {
                    const angle = -60 + (idx * 30);
                    const rad = angle * Math.PI / 180;
                    const x = parseFloat((50 * Math.cos(rad)).toFixed(4));
                    const y = parseFloat((70 + 50 * Math.sin(rad)).toFixed(4));
                    return <circle key={idx} cx={x} cy={y} r="2.5" fill="#FFEBA7" stroke="#D4A843" strokeWidth="0.5" />;
                  })}
                </svg>
              </div>

              {/* 3D Fluted Brass Seam Clasp Molding (Right half) */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: '180px',
                background: 'linear-gradient(to right, #593E05 0%, #B58A2A 35%, #FFEBA7 50%, #D4A843 65%, #705213 100%)',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.4)'
              }} />
              <div style={{ position: 'absolute', left: '-3px', top: 'calc(50% - 90px)', transform: 'translateX(50%)', color: '#FFEBA7', fontSize: '10px', textShadow: '0 1px 2px black', fontWeight: 'bold' }}>✦</div>
              <div style={{ position: 'absolute', left: '-3px', top: 'calc(50% + 80px)', transform: 'translateX(50%)', color: '#FFEBA7', fontSize: '10px', textShadow: '0 1px 2px black', fontWeight: 'bold' }}>✦</div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
