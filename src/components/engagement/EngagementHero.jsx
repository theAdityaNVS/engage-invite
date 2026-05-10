import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPhoto from '@/components/shared/AnimatedPhoto';
import FloatingPetals from '@/components/shared/FloatingPetals';
import { COUPLE, TRANSLATIONS, ENGAGEMENT } from '@/config';

const LANG_SEQUENCE = ['en', 'hi', 'te', 'or'];

function useTypewriter(texts, speed = 80, pause = 1800) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    let timeout;
    if (!deleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setDeleting(true), pause);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), speed / 2);
      } else {
        setDeleting(false);
        setIndex((i) => (i + 1) % texts.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, texts, speed, pause]);

  return displayed;
}

const MOSAIC_SIZES = [
  { gridColumn: '1 / 3', gridRow: '1 / 3', height: '280px' },
  { gridColumn: '3',     gridRow: '1',      height: '130px' },
  { gridColumn: '3',     gridRow: '2',      height: '130px' },
  { gridColumn: '1',     gridRow: '3',      height: '150px' },
  { gridColumn: '2',     gridRow: '3',      height: '150px' },
  { gridColumn: '3',     gridRow: '3',      height: '150px' },
];

export default function EngagementHero() {
  const nameSequence = LANG_SEQUENCE.map(
    (lang) => `${TRANSLATIONS.NAMES[lang].groom} & ${TRANSLATIONS.NAMES[lang].bride}`
  );
  const typedName = useTypewriter(nameSequence);

  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #FDF0E0 0%, #FFF8F0 60%, #FDF0E0 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '4rem',
      paddingBottom: '3rem',
    }}>
      <FloatingPetals count={14} />

      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: '1100px',
        padding: '0 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2.5rem',
      }}>
        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ textAlign: 'center' }}
        >
          <p style={{
            fontFamily: "'Lora', serif",
            fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
            color: '#6B4E3D',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            ✦ Together They Begin ✦
          </p>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            color: '#8B1A2B',
            lineHeight: 1.1,
            minHeight: '1.2em',
            letterSpacing: '-0.01em',
          }}>
            {typedName}
            <span style={{
              borderRight: '3px solid #D4A843',
              marginLeft: '2px',
              animation: 'cursorBlink 1s step-end infinite',
            }} />
          </h1>

          <p style={{
            fontFamily: "'Lora', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
            color: '#6B4E3D',
            marginTop: '1rem',
            marginBottom: '0.5rem',
          }}>
            request the pleasure of your company
          </p>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
            color: '#D4A843',
            letterSpacing: '0.05em',
          }}>
            {ENGAGEMENT.DATE_DISPLAY} · {ENGAGEMENT.VENUE_NAME}, {ENGAGEMENT.VENUE_CITY}
          </p>
        </motion.div>

        {/* Photo mosaic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto',
            gap: '10px',
            width: '100%',
            maxWidth: '700px',
          }}
        >
          {MOSAIC_SIZES.map((s, i) => (
            <div key={i} style={{ gridColumn: s.gridColumn, gridRow: s.gridRow }}>
              <AnimatedPhoto height={s.height} alt={`Couple photo ${i + 1}`} index={i} style={{ width: '100%' }} />
            </div>
          ))}
        </motion.div>

        {/* Scroll chevron */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ marginTop: '0.5rem', color: '#D4A843', fontSize: '1.5rem' }}
          aria-hidden="true"
        >
          ↓
        </motion.div>
      </div>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
