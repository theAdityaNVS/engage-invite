import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import FloatingLanterns from '@/components/shared/FloatingLanterns';
import { TRANSLATIONS, ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';
import JagannathTempleSVG from './JagannathTempleSVG';

const LANG_SEQUENCE = ['en', 'hi', 'te', 'or'];

/* A premium alternative to typewriter: soft cinematic crossfade cycling */
function useLanguageCycle(interval = 3500) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % LANG_SEQUENCE.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);
  return index;
}

const SKY_TWILIGHT = 'linear-gradient(180deg, #180508 0%, #3D0B18 22%, #8B1A2B 48%, #B03020 68%, #C8601A 84%, #D4A843 100%)';

export default function EngagementHero() {
  const { t } = useLanguage();
  const cycleIndex = useLanguageCycle(3500);
  const currentLang = LANG_SEQUENCE[cycleIndex];
  
  const currentGroom = TRANSLATIONS.NAMES[currentLang]?.groom;
  const currentBride = TRANSLATIONS.NAMES[currentLang]?.bride;

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const rawStars  = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const rawContent = useTransform(scrollYProgress, [0, 1], [0, 60]); 
  const rawTemple = useTransform(scrollYProgress, [0, 1], ['0%', '-3%']);

  const starsY   = useSpring(rawStars,   { stiffness: 85, damping: 20 });
  const contentY = useSpring(rawContent, { stiffness: 100, damping: 15 });
  const templeY  = useSpring(rawTemple,  { stiffness: 60, damping: 15 });

  return (
    <section ref={sectionRef} style={{
      minHeight: '100svh',
      background: SKY_TWILIGHT,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <FloatingLanterns count={12} />

      <motion.div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(1.5px 1.5px at 15% 10%, rgba(255,240,210,0.9) 0%, transparent 100%),
          radial-gradient(1px 1px at 82% 7%, rgba(255,240,210,0.65) 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 47% 5%, rgba(255,240,210,0.75) 0%, transparent 100%),
          radial-gradient(1px 1px at 69% 16%, rgba(255,240,210,0.55) 0%, transparent 100%),
          radial-gradient(1px 1px at 29% 20%, rgba(255,240,210,0.6) 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 91% 23%, rgba(255,240,210,0.8) 0%, transparent 100%),
          radial-gradient(1px 1px at 56% 28%, rgba(255,240,210,0.45) 0%, transparent 100%),
          radial-gradient(1px 1px at 8% 33%, rgba(255,240,210,0.55) 0%, transparent 100%),
          radial-gradient(1px 1px at 38% 14%, rgba(255,240,210,0.5) 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 73% 9%, rgba(255,240,210,0.7) 0%, transparent 100%)
        `,
        pointerEvents: 'none',
        zIndex: 0,
        y: starsY,
      }} />

      <div aria-hidden="true" style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '30vh',
        background: 'radial-gradient(ellipse 85% 65% at 50% 100%, rgba(212,168,67,0.25) 0%, rgba(176,48,32,0.15) 45%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Main Content Block (Centered vertically, holding all text) */}
      <motion.div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        paddingTop: 'clamp(4vh, 8vh, 10vh)', // Fluid padding based on height
        y: contentY,
      }}>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            position: 'absolute',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(212,168,67,0.24) 0%, rgba(212,120,40,0.1) 40%, rgba(139,26,43,0.04) 75%, transparent 100%)',
            pointerEvents: 'none',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: -1
          }}
        />

        {/* "Together They Begin" Header */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            fontFamily: "'Lora', serif",
            fontSize: 'clamp(0.85rem, 2.2vw, 1.05rem)',
            color: 'rgba(245,236,200,0.85)',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            marginBottom: 'clamp(0.75rem, 2.5vh, 1.5rem)',
          }}
        >
          ✦ Together They Begin ✦
        </motion.p>

        {/* The Glassmorphic Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="hero-pill-container"
          role="button"
          tabIndex={0}
          onClick={() => {
            document.getElementById('section-map')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              document.getElementById('section-map')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <p className="hero-pill-text" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)',
            color: 'rgba(245,236,200,0.95)',
            letterSpacing: '0.08em',
            margin: 0,
            textAlign: 'center',
            lineHeight: 1.4,
          }}>
            <span>{ENGAGEMENT.DATE_DISPLAY}</span>
            <span className="hero-pill-dot">·</span>
            <span>{ENGAGEMENT.VENUE_NAME}, {ENGAGEMENT.VENUE_CITY}</span>
          </p>
        </motion.div>

        {/* Dynamic Name Changes with Cinematic Crossfade */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentLang}
            initial={{ opacity: 0, filter: 'blur(8px)', y: 5 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(8px)', y: -5 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3.2rem, 11vw, 5.5rem)',
              color: '#FFF8F0',
              lineHeight: 1.1,
              fontWeight: 400,
              textShadow: '0 2px 12px rgba(0,0,0,0.15)', 
            }}>
              {currentGroom}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: 'clamp(0.75rem, 2.5vh, 1.5rem) 0' }}>
              <div style={{ width: 'clamp(30px, 8vw, 50px)', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.6))' }} />
              <p style={{
                fontFamily: "'Lora', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
                color: '#D4A843',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                margin: 0,
              }}>
                {t('weds')}
              </p>
              <div style={{ width: 'clamp(30px, 8vw, 50px)', height: '1px', background: 'linear-gradient(270deg, transparent, rgba(212,168,67,0.6))' }} />
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3.2rem, 11vw, 5.5rem)',
              color: '#FFF8F0',
              lineHeight: 1.1,
              fontWeight: 400,
              textShadow: '0 2px 12px rgba(0,0,0,0.15)',
            }}>
              {currentBride}
            </h1>
          </motion.div>
        </AnimatePresence>

      </motion.div>

      {/* Bottom Wrapper - Normal Document Flow fixes tablet overlaps */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          zIndex: 2,
          pointerEvents: 'none',
          y: templeY,
          marginTop: 'auto', // Pushes to the bottom natively
        }}
      >
        {/* Elegant glowing Scroll Down Hint Button */}
        <motion.button
          onClick={() => {
            const nextSection = document.getElementById('section-events');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          whileHover={{ scale: 1.05 }}
          style={{
            pointerEvents: 'auto',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '12px',
            color: '#D4A843',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '0.75rem',
            filter: 'drop-shadow(0 2px 10px rgba(212, 168, 67, 0.45))',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          aria-label="Scroll to next section"
        >
          <span style={{
            fontFamily: "'Lora', serif",
            fontSize: 'clamp(0.7rem, 2vw, 0.75rem)',
            textTransform: 'uppercase',
            letterSpacing: '0.28em',
            color: 'rgba(245,236,200,0.85)',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5), 0 0 8px rgba(212, 168, 67, 0.3)',
            marginBottom: '4px',
            transition: 'color 0.3s ease',
          }}>
            {t('scrollDiscover')}
          </span>
          
          {/* Staggered cascading chevrons flowing downwards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '28px',
            position: 'relative',
            width: '40px',
            marginTop: '2px',
          }}>
            {[0, 1, 2].map((i) => (
              <motion.svg
                key={i}
                width="18"
                height="10"
                viewBox="0 0 24 12"
                fill="none"
                stroke="#D4A843"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0, y: -8 }}
                animate={{
                  opacity: [0, 1, 0.7, 0],
                  y: [-8, 2, 12, 20],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: i * 0.45,
                  ease: [0.25, 0.8, 0.25, 1],
                }}
                style={{
                  position: 'absolute',
                  filter: 'drop-shadow(0 1px 4px rgba(212, 168, 67, 0.6))',
                }}
              >
                <polyline points="4 2 12 10 20 2" />
              </motion.svg>
            ))}
          </div>
        </motion.button>

        <JagannathTempleSVG style={{ marginBottom: '-6px' }} />
      </motion.div>

    </section>
  );
}
