import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';

/* Gold marigold cluster for card corners */
function FloralAccent({ style }) {
  const getD = (a) => {
    const q1x = (25 + 12 * Math.cos((a - 15) * Math.PI / 180)).toFixed(4);
    const q1y = (25 + 12 * Math.sin((a - 15) * Math.PI / 180)).toFixed(4);
    const endx = (25 + 18 * Math.cos(a * Math.PI / 180)).toFixed(4);
    const endy = (25 + 18 * Math.sin(a * Math.PI / 180)).toFixed(4);
    const q2x = (25 + 12 * Math.cos((a + 15) * Math.PI / 180)).toFixed(4);
    const q2y = (25 + 12 * Math.sin((a + 15) * Math.PI / 180)).toFixed(4);
    return `M25 25 Q${q1x} ${q1y} ${endx} ${endy} Q${q2x} ${q2y} 25 25Z`;
  };

  return (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 44, height: 44, ...style }} aria-hidden="true">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <path
          key={a}
          d={getD(a)}
          fill="rgba(212,168,67,0.75)"
        />
      ))}
      <circle cx="25" cy="25" r="5" fill="#D4A843" />
    </svg>
  );
}

const EVENT_ICONS = {
  'engagement-puja': (
    <svg viewBox="0 0 48 48" fill="none" style={{ width: 42, height: 42 }} aria-hidden="true">
      {/* Diya body in golden lines */}
      <path d="M12 28 C12 36 24 38 36 36 C36 36 38 28 36 26 C34 24 14 24 12 28Z" stroke="#F0D68A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(212,168,67,0.08)"/>
      <path d="M16 28 C16 32 24 34 32 33" stroke="#D4A843" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Floating flame with gradient glow */}
      <defs>
        <radialGradient id="flame-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF8F0" />
          <stop offset="35%" stopColor="#FFC837" />
          <stop offset="70%" stopColor="#FF8008" />
          <stop offset="100%" stopColor="rgba(255,128,8,0)" />
        </radialGradient>
      </defs>
      {/* Aura background */}
      <circle cx="24" cy="14" r="11" fill="url(#flame-glow)" opacity="0.45" />
      {/* Precise Flame vectors */}
      <path d="M24 6 C26 12 29 15 29 19 C29 22 26 24 24 24 C22 24 19 22 19 19 C19 15 22 12 24 6Z" fill="#FFC837" stroke="#FFF8F0" strokeWidth="1" />
      <path d="M24 10 C25 14 27 16 27 19 C27 21 25 22 24 22 C23 22 21 21 21 19 C21 16 23 14 24 10Z" fill="#FF8008" />
    </svg>
  ),
  'ring-ceremony': (
    <svg viewBox="0 0 48 48" fill="none" style={{ width: 42, height: 42 }} aria-hidden="true">
      {/* Left Ring (offset behind) */}
      <circle cx="20" cy="26" r="10" stroke="rgba(212,168,67,0.5)" strokeWidth="1.8" />
      <circle cx="20" cy="26" r="7" stroke="rgba(212,168,67,0.3)" strokeWidth="1" />
      {/* Right Ring (offset front) */}
      <circle cx="28" cy="22" r="10" stroke="#F0D68A" strokeWidth="2.5" />
      <circle cx="28" cy="22" r="7" stroke="#D4A843" strokeWidth="1.2" />
      {/* Diamond bezel setting */}
      <path d="M28 12 L30 9 L28 6 L26 9 Z" fill="#FFF8F0" />
      {/* Diamond shine star */}
      <path d="M28 3 L29 7 L33 8 L29 9 L28 13 L27 9 L23 8 L27 7 Z" fill="#FFF8F0" opacity="0.95" />
      <circle cx="28" cy="8" r="1.5" fill="#FFF" />
    </svg>
  ),
  'family-lunch': (
    <svg viewBox="0 0 48 48" fill="none" style={{ width: 42, height: 42 }} aria-hidden="true">
      {/* Plate rim */}
      <circle cx="24" cy="26" r="16" stroke="#F0D68A" strokeWidth="2.5" fill="rgba(212,168,67,0.06)" />
      <circle cx="24" cy="26" r="14.5" stroke="#D4A843" strokeWidth="1" />
      {/* Small bowls (katoris) inside */}
      <circle cx="16" cy="20" r="3.5" stroke="#F0D68A" strokeWidth="1.5" fill="rgba(212,168,67,0.1)" />
      <circle cx="24" cy="16" r="3.5" stroke="#F0D68A" strokeWidth="1.5" fill="rgba(212,168,67,0.1)" />
      <circle cx="32" cy="20" r="3.5" stroke="#F0D68A" strokeWidth="1.5" fill="rgba(212,168,67,0.1)" />
      {/* Food cluster in middle */}
      <path d="M20 28 Q24 23 28 28 Z" fill="#D4A843" opacity="0.8" />
      <circle cx="19" cy="30" r="1.8" fill="#F0D68A" />
      <circle cx="24" cy="31" r="1.8" fill="#F0D68A" />
      <circle cx="29" cy="30" r="1.8" fill="#F0D68A" />
      {/* Elegant Steam waves rising */}
      <path d="M19 12 Q21 8 20 5" stroke="#F0D68A" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <path d="M24 9 Q26 5 25 2" stroke="#FFF8F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
      <path d="M29 12 Q31 8 30 5" stroke="#F0D68A" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    </svg>
  ),
};

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14, display: 'inline', verticalAlign: 'middle', marginRight: 6 }} aria-hidden="true">
      <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M1 7h14" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M5 1v4M11 1v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function EventCard({ event, delay = 0, calendarUrl }) {
  const { t } = useLanguage();
  const icon = EVENT_ICONS[event.id] || EVENT_ICONS['engagement-puja'];

  return (
    <ScrollReveal delay={delay}>
      <motion.div
        whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(212,168,67,0.25)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(212, 168, 67, 0.35)',
          borderRadius: '16px',
          overflow: 'visible',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          position: 'relative',
          padding: '2.5rem 1.8rem 2rem',
          textAlign: 'center',
          minHeight: 280,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
        }}
      >
        {/* Elegant inner gold border frame */}
        <div style={{
          position: 'absolute',
          top: '6px',
          left: '6px',
          right: '6px',
          bottom: '6px',
          border: '1px solid rgba(212, 168, 67, 0.16)',
          borderRadius: '12px',
          pointerEvents: 'none',
        }} />

        {/* Corner floral accents */}
        <FloralAccent style={{ position: 'absolute', top: -12, right: -10, zIndex: 3 }} />
        <FloralAccent style={{ position: 'absolute', bottom: -12, left: -10, transform: 'rotate(180deg)', zIndex: 3 }} />

        {/* Icon */}
        <div style={{ marginBottom: '0.6rem', position: 'relative', zIndex: 2 }}>{icon}</div>

        {/* Event name */}
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.1rem, 3.2vw, 1.3rem)',
          color: '#F0D68A',
          letterSpacing: '0.04em',
          fontWeight: 600,
          lineHeight: 1.3,
          marginBottom: '0.2rem',
          position: 'relative',
          zIndex: 2,
        }}>
          {event.name}
        </h3>

        {/* Date & day */}
        <p style={{
          fontFamily: "'Lora', serif",
          fontSize: '0.88rem',
          color: '#FFF8F0',
          opacity: 0.85,
          position: 'relative',
          zIndex: 2,
        }}>
          {event.day}, {event.date}
        </p>

        {/* Time */}
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.05rem',
          color: '#FFF8F0',
          fontWeight: 600,
          letterSpacing: '0.02em',
          margin: '0.1rem 0',
          position: 'relative',
          zIndex: 2,
        }}>
          {event.time}
        </p>

        {/* Venue */}
        <p style={{
          fontFamily: "'Lora', serif",
          fontSize: '0.85rem',
          color: '#FFF8F0',
          opacity: 0.72,
          lineHeight: 1.4,
          marginBottom: '0.5rem',
          position: 'relative',
          zIndex: 2,
        }}>
          {event.venue}
        </p>

        {/* Actions Button Bar */}
        <div style={{
          marginTop: '1.2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          width: '100%',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* See Route Button */}
          <motion.a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, background: 'rgba(212, 168, 67, 0.16)', borderColor: 'rgba(212, 168, 67, 0.85)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '44px',
              background: 'rgba(212, 168, 67, 0.08)',
              border: '1.2px solid rgba(212, 168, 67, 0.45)',
              borderRadius: '22px',
              fontFamily: "'Lora', serif",
              fontSize: '0.8rem',
              color: '#F0D68A',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 500,
              textDecoration: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              transition: 'border-color 0.25s, background-color 0.25s',
            }}
          >
            {t('see_the_route')} ↗
          </motion.a>

          {/* Add to Calendar Button */}
          {calendarUrl && (
            <motion.a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, background: 'rgba(255, 248, 240, 0.08)', borderColor: 'rgba(255, 248, 240, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '44px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '22px',
                fontFamily: "'Lora', serif",
                fontSize: '0.78rem',
                color: '#FFF8F0',
                opacity: 0.88,
                letterSpacing: '0.08em',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'border-color 0.25s, background-color 0.25s',
              }}
            >
              <CalendarIcon />
              {t('add_to_calendar')}
            </motion.a>
          )}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}
