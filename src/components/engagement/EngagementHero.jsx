import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import FloatingLanterns from '@/components/shared/FloatingLanterns';
import { TRANSLATIONS, ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

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

/* ── Jagannath / Odishan Nagara temple — curvilinear shikhara ── */
function JagannathTempleSVG() {
  return (
    <svg viewBox="0 -50 1000 380" preserveAspectRatio="xMidYMax meet" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 900, display: 'block', margin: '0 auto' }}
      aria-label="Jagannath temple"
    >
      <ellipse cx="500" cy="295" rx="360" ry="55" fill="rgba(255,180,80,0.22)" />

      <defs>
        <style>
          {`
            @keyframes flagFlutter {
              0% { transform: rotate(0deg) skewY(0deg); }
              100% { transform: rotate(-5deg) skewY(-8deg); }
            }
          `}
        </style>

        <radialGradient id="templeGlow" cx="50%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#FFAA30" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FFAA30" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C58B35" />
          <stop offset="30%" stopColor="#E5C070" />
          <stop offset="70%" stopColor="#F5DCA0" />
          <stop offset="100%" stopColor="#B57A25" />
        </linearGradient>
        <linearGradient id="shikharaGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#964020" />
          <stop offset="40%" stopColor="#B05530" />
          <stop offset="80%" stopColor="#7E331A" />
          <stop offset="100%" stopColor="#4A1E0E" />
        </linearGradient>
        <linearGradient id="stoneShadow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
        </linearGradient>
      </defs>

      <rect x="140" y="40" width="720" height="280" fill="url(#templeGlow)" pointerEvents="none" />

      <g id="base-platform">
        <rect x="60" y="300" width="880" height="24" rx="4" fill="#6E2C14" />
        <rect x="60" y="300" width="880" height="24" fill="url(#stoneShadow)" />
        <line x1="60" y1="300" x2="940" y2="300" stroke="#8E3C1B" strokeWidth="2" />
        {[304, 308, 312, 316, 320].map((y, idx) => (
          <line key={idx} x1="64" y1={y} x2="936" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        ))}
        <rect x="90" y="285" width="820" height="15" rx="3" fill="#803418" />
        <rect x="90" y="285" width="820" height="15" fill="url(#stoneShadow)" />
        <rect x="120" y="272" width="760" height="13" rx="2" fill="#933D1C" />
        <rect x="120" y="272" width="760" height="13" fill="url(#stoneShadow)" />
        <rect x="150" y="260" width="700" height="12" rx="2" fill="#A84822" />
        <rect x="150" y="260" width="700" height="12" fill="url(#stoneShadow)" />
      </g>

      <g id="left-shrine">
        <rect x="180" y="210" width="100" height="50" fill="#933D1C" />
        <rect x="180" y="210" width="100" height="50" fill="url(#stoneShadow)" />
        <path d="M 180 210 Q 185 185 200 170 L 260 170 Q 275 185 280 210 Z" fill="url(#shikharaGrad)" />
        <path d="M 180 210 Q 185 185 200 170 L 260 170 Q 275 185 280 210 Z" fill="url(#stoneShadow)" />
        <path d="M 195 170 Q 198 152 210 142 L 250 142 Q 262 152 265 170 Z" fill="#6E2C14" />
        <path d="M 205 142 Q 212 128 230 124 L 230 124 Q 248 128 255 142 Z" fill="#4A1E0E" />
        <ellipse cx="230" cy="123" rx="14" ry="4" fill="#A84822" />
        <ellipse cx="230" cy="119" rx="10" ry="3" fill="#D4A843" />
        <circle cx="230" cy="114" r="3.5" fill="#E8C060" />
        <polygon points="230,111 236,108 230,104 228,108" fill="#D4A843" />
        {[190, 210, 230, 250, 270].map((x) => (
          <line key={x} x1={x} y1="210" x2={x} y2="260" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
        ))}
      </g>

      <g id="right-shrine">
        <rect x="720" y="210" width="100" height="50" fill="#933D1C" />
        <rect x="720" y="210" width="100" height="50" fill="url(#stoneShadow)" />
        <path d="M 720 210 Q 725 185 740 170 L 800 170 Q 815 185 820 210 Z" fill="url(#shikharaGrad)" />
        <path d="M 720 210 Q 725 185 740 170 L 800 170 Q 815 185 820 210 Z" fill="url(#stoneShadow)" />
        <path d="M 735 170 Q 738 152 750 142 L 790 142 Q 802 152 805 170 Z" fill="#6E2C14" />
        <path d="M 745 142 Q 752 128 770 124 L 770 124 Q 788 128 795 142 Z" fill="#4A1E0E" />
        <ellipse cx="770" cy="123" rx="14" ry="4" fill="#A84822" />
        <ellipse cx="770" cy="119" rx="10" ry="3" fill="#D4A843" />
        <circle cx="770" cy="114" r="3.5" fill="#E8C060" />
        <polygon points="770,111 776,108 770,104 768,108" fill="#D4A843" />
        {[730, 750, 770, 790, 810].map((x) => (
          <line key={x} x1={x} y1="210" x2={x} y2="260" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
        ))}
      </g>

      <g id="main-shikhara">
        <rect x="290" y="170" width="420" height="90" fill="url(#shikharaGrad)" />
        <rect x="290" y="170" width="420" height="90" fill="url(#stoneShadow)" />
        {[310, 330, 350, 370, 390, 410, 430, 450, 470, 490, 510, 520, 530, 550, 570, 590, 610, 630, 650, 670, 690].map((x) => (
          <g key={x}>
            <line x1={x} y1="170" x2={x} y2="260" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
            <line x1={x + 1} y1="170" x2={x + 1} y2="260" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          </g>
        ))}
        {[185, 205, 225, 245].map((y) => (
          <line key={y} x1="290" y1={y} x2="710" y2={y} stroke="rgba(0,0,0,0.4)" strokeWidth="2.5" />
        ))}
        <path d="M 290 170 Q 295 152 308 145 L 692 145 Q 705 152 710 170 Z" fill="#933D1C" />
        <path d="M 290 170 Q 295 152 308 145 L 692 145 Q 705 152 710 170 Z" fill="url(#stoneShadow)" />
        <path d="M 304 145 Q 310 128 326 122 L 674 122 Q 690 128 696 145 Z" fill="#803418" />
        <path d="M 304 145 Q 310 128 326 122 L 674 122 Q 690 128 696 145 Z" fill="url(#stoneShadow)" />
        <path d="M 322 122 Q 330 106 348 100 L 652 100 Q 670 106 678 122 Z" fill="#6E2C14" />
        <path d="M 322 122 Q 330 106 348 100 L 652 100 Q 670 106 678 122 Z" fill="url(#stoneShadow)" />
        <path d="M 342 100 Q 352 86 372 80 L 628 80 Q 648 86 658 100 Z" fill="#5D240F" />
        <path d="M 342 100 Q 352 86 372 80 L 628 80 Q 648 86 658 100 Z" fill="url(#stoneShadow)" />
        <path d="M 364 80 Q 376 66 398 60 L 602 60 Q 624 66 636 80 Z" fill="#4D1D0B" />
        <path d="M 364 80 Q 376 66 398 60 L 602 60 Q 624 66 636 80 Z" fill="url(#stoneShadow)" />
        <path d="M 388 60 Q 402 47 426 42 L 574 42 Q 598 47 612 60 Z" fill="#3E1608" />
        <path d="M 388 60 Q 402 47 426 42 L 574 42 Q 598 47 612 60 Z" fill="url(#stoneShadow)" />
        <path d="M 414 42 Q 428 29 456 25 L 544 25 Q 572 29 586 42 Z" fill="#301005" />
        <path d="M 414 42 Q 428 29 456 25 L 544 25 Q 572 29 586 42 Z" fill="url(#stoneShadow)" />
        <path d="M 444 25 Q 454 16 475 14 L 525 14 Q 546 16 556 25 Z" fill="#1F0A03" />
        {[340, 380, 420, 460, 500, 540, 580, 620, 660].map((startPoint) => {
          const offset = startPoint - 500;
          const curveL = `M ${startPoint} 170 Q ${500 + offset * 0.7} 80 ${500 + offset * 0.2} 25`;
          return (
            <path key={startPoint} d={curveL} stroke="rgba(255,180,80,0.08)" strokeWidth="1.5" fill="none" />
          );
        })}
      </g>

      <g id="entrance-gate">
        <path d="M 400 260 L 400 200 Q 500 165 600 200 L 600 260 Z" fill="#5D240F" stroke="#3E1608" strokeWidth="2" />
        <path d="M 415 260 L 415 208 Q 500 178 585 208 L 585 260 Z" fill="#3E1608" />
        <path d="M 430 260 L 430 216 Q 500 190 570 216 L 570 260 Z" fill="#1F0A03" />
        <path d="M 380 260 C 380 180, 620 180, 620 260" stroke="#D4A843" strokeWidth="1.5" strokeDasharray="4,6" fill="none" />
        <path d="M 370 260 C 370 170, 630 170, 630 260" stroke="rgba(212,168,67,0.4)" strokeWidth="1" fill="none" />
        <circle cx="500" cy="180" r="10" fill="url(#goldGrad)" />
        <circle cx="500" cy="180" r="6" fill="#1F0A03" />
        <circle cx="500" cy="180" r="3" fill="#FFE070" />
        <rect x="420" y="254" width="160" height="6" rx="1" fill="#803418" />
        <rect x="440" y="248" width="120" height="6" rx="1" fill="#A84822" fillOpacity="0.8" />
      </g>

      <g id="crown">
        <ellipse cx="500" cy="13" rx="44" ry="9" fill="#803418" />
        <ellipse cx="500" cy="13" rx="44" ry="9" fill="url(#stoneShadow)" />
        <ellipse cx="500" cy="8" rx="36" ry="8" fill="#A84822" />
        <ellipse cx="500" cy="8" rx="36" ry="8" fill="url(#stoneShadow)" />
        {[-36, -24, -12, 0, 12, 24, 36].map((dx) => (
          <path key={dx} d={`M ${500 + dx} 4 Q ${500 + dx * 0.9} 8 ${500 + dx * 0.8} 17`} stroke="#301005" strokeWidth="1.5" />
        ))}
        <ellipse cx="500" cy="1" rx="26" ry="6" fill="#D4A843" />
        <ellipse cx="500" cy="-6" rx="18" ry="9" fill="url(#goldGrad)" />
        <ellipse cx="500" cy="-14" rx="12" ry="4" fill="#FFE070" />
        <circle cx="500" cy="-18" r="6.5" fill="#FFE070" />
        <line x1="500" y1="-22" x2="500" y2="-45" stroke="#FFE070" strokeWidth="2.5" />
        <circle cx="500" cy="-32" r="7.5" stroke="#D4A843" strokeWidth="2" fill="none" />
        <path d="M 500 -45 Q 528 -40 545 -48 Q 532 -33 500 -37 Z" fill="#E5C070" />
        <path d="M 500 -45 Q 528 -40 545 -48 Q 532 -33 500 -37 Z" fill="url(#goldGrad)" fillOpacity="0.7" />

        {/* The Neelachakra */}
        <circle cx="500" cy="-60" r="14" stroke="#FFE070" strokeWidth="2.5" fill="none" />
        <circle cx="500" cy="-60" r="3.5" fill="#FFE070" />
        <path d="M 500 -74 L 500 -46 M 486 -60 L 514 -60 M 490 -70 L 510 -50 M 490 -50 L 510 -70" stroke="#D4A843" strokeWidth="1.5" />
        <line x1="500" y1="-46" x2="500" y2="-32" stroke="#FFE070" strokeWidth="2.5" />

        {/* Patita Paban Bana (The Flag) */}
        <g style={{ transformOrigin: '500px -74px', animation: 'flagFlutter 2s ease-in-out infinite alternate' }}>
          <path d="M 500 -74 Q 525 -80 545 -65 Q 525 -60 500 -65 Z" fill="#D43030" />
          <path d="M 500 -65 Q 520 -70 535 -55 Q 515 -50 500 -55 Z" fill="#E5C070" />
        </g>
      </g>

      <rect x="0" y="324" width="1000" height="8" fill="rgba(60,20,10,0.35)" />


    </svg>
  );
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
        background: 'radial-gradient(ellipse 85% 65% at 50% 100%, rgba(212,168,67,0.45) 0%, rgba(176,48,32,0.25) 45%, transparent 100%)',
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
            width: '280px',
            height: '280px',
            background: 'radial-gradient(circle, rgba(212,168,67,0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: -1
          }}
        />

        {/* The Glassmorphic Pill - Moved ABOVE "Together They Begin" */}
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
            marginBottom: '2rem',
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
              fontSize: 'clamp(3.5rem, 12vw, 5rem)',
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
              fontSize: 'clamp(3.5rem, 12vw, 5rem)',
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
          marginBottom: '-2px' // Hides subpixel gaps
        }}
      >
        {/* Down Chevron - Stacks above temple naturally */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            color: 'rgba(212,168,67,0.7)',
            fontSize: '1.4rem',
            marginBottom: '1rem',
          }}
          aria-hidden="true"
        >
          ↓
        </motion.div>

        <JagannathTempleSVG />
      </motion.div>

    </section>
  );
}
