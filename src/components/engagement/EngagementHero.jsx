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
  const rawTemple = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

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
        paddingTop: '6vh', // Balances the visual weight without hardcoding bottom padding
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
            fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)',
            color: 'rgba(245,236,200,0.85)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}
        >
          ✦ Together They Begin ✦
        </motion.p>

        {/* The Glassmorphic Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{
            background: 'rgba(20, 5, 10, 0.45)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(212, 168, 67, 0.25)',
            borderRadius: '100px',
            padding: '0.5rem 1.25rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            marginBottom: '2.5rem',
          }}
        >
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)',
            color: 'rgba(245,236,200,0.95)',
            letterSpacing: '0.08em',
            margin: 0,
            textAlign: 'center'
          }}>
            {ENGAGEMENT.DATE_DISPLAY} <span style={{ color: '#D4A843', margin: '0 6px', fontWeight: 'bold' }}>·</span> {ENGAGEMENT.VENUE_NAME}, {ENGAGEMENT.VENUE_CITY}
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
              fontSize: 'clamp(2.5rem, 10vw, 5rem)',
              color: '#FFF8F0',
              lineHeight: 1.1,
              fontWeight: 400,
              textShadow: '0 2px 12px rgba(0,0,0,0.15)', 
            }}>
              {currentGroom}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.25rem 0' }}>
              <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.6))' }} />
              <p style={{
                fontFamily: "'Lora', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)',
                color: '#D4A843',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                margin: 0,
              }}>
                {t('weds')}
              </p>
              <div style={{ width: '40px', height: '1px', background: 'linear-gradient(270deg, transparent, rgba(212,168,67,0.6))' }} />
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 10vw, 5rem)',
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
        {/* Elegant glowing SVG Down Chevron stack above temple */}
        <motion.button
          onClick={() => {
            const nextSection = document.getElementById('section-events');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
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
            gap: '4px',
            marginBottom: '0.75rem',
            filter: 'drop-shadow(0 2px 8px rgba(212, 168, 67, 0.4))',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          aria-label="Scroll to next section"
        >
          <span style={{
            fontFamily: "'Lora', serif",
            fontSize: '0.625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.24em',
            color: 'rgba(245,236,200,0.7)',
            marginBottom: '4px'
          }}>
            {t('scrollDiscover') || 'Scroll to Discover'}
          </span>
          <svg 
            width="22" 
            height="22" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.75" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ opacity: 0.8 }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.button>

        <JagannathTempleSVG />
      </motion.div>

    </section>
  );
}
