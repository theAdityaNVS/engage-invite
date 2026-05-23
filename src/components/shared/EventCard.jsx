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
    <svg viewBox="0 0 48 48" fill="none" style={{ width: 38, height: 38 }}>
      <path d="M24 8 L27 18 L37 18 L29 24 L32 34 L24 28 L16 34 L19 24 L11 18 L21 18Z" fill="#D4A843" opacity="0.9"/>
      <circle cx="24" cy="24" r="4" fill="rgba(74,32,64,0.4)"/>
    </svg>
  ),
  'ring-ceremony': (
    <svg viewBox="0 0 48 48" fill="none" style={{ width: 38, height: 38 }}>
      <circle cx="24" cy="24" r="12" stroke="rgba(74,32,64,0.6)" strokeWidth="3" fill="none"/>
      <circle cx="24" cy="24" r="8"  stroke="#D4A843" strokeWidth="2" fill="none"/>
      <path d="M19 15 Q24 11 29 15" stroke="#D4A843" strokeWidth="2" fill="none"/>
      <circle cx="24" cy="13" r="3" fill="#C0654A"/>
    </svg>
  ),
  'family-lunch': (
    <svg viewBox="0 0 48 48" fill="none" style={{ width: 38, height: 38 }}>
      <ellipse cx="24" cy="30" rx="14" ry="5" fill="#D4A843" opacity="0.6"/>
      <path d="M14 30 Q14 18 24 18 Q34 18 34 30" stroke="rgba(74,32,64,0.6)" strokeWidth="2" fill="rgba(74,32,64,0.08)"/>
      <line x1="24" y1="11" x2="24" y2="18" stroke="#D4A843" strokeWidth="2"/>
      <path d="M21 11 Q24 7 27 11" stroke="#D4A843" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
};

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, display: 'inline', verticalAlign: 'middle', marginRight: 4 }} aria-hidden="true">
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
        whileHover={{ y: -4, boxShadow: '0 14px 36px rgba(196,87,42,0.28)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          background: 'var(--cream)',
          border: '1.5px solid rgba(212,168,67,0.55)',
          borderRadius: '48% / 40%',
          overflow: 'visible',
          boxShadow: '0 4px 18px rgba(196,87,42,0.14)',
          position: 'relative',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          minHeight: 260,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
      >
        {/* Corner floral accents */}
        <FloralAccent style={{ position: 'absolute', top: -10, right: -8 }} />
        <FloralAccent style={{ position: 'absolute', bottom: -10, left: -8, transform: 'rotate(180deg)' }} />

        {/* Icon */}
        <div style={{ marginBottom: '0.5rem' }}>{icon}</div>

        {/* Event name */}
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          color: 'var(--saffron)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          lineHeight: 1.2,
        }}>
          {event.name}
        </h3>

        {/* Date & day */}
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.88rem', color: 'var(--dark-text)', opacity: 0.75 }}>
          {event.day}, {event.date}
        </p>

        {/* Time */}
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: 'var(--dark-text)', fontWeight: 700 }}>
          {event.time}
        </p>

        {/* Venue */}
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: 'var(--dark-text)', opacity: 0.7, lineHeight: 1.4 }}>
          {event.venue}
        </p>

        {/* Route link */}
        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: '0.5rem',
            fontFamily: "'Lora', serif",
            fontSize: '0.85rem',
            color: 'var(--saffron)',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
            cursor: 'pointer',
          }}
        >
          {t('see_the_route')} ↗
        </a>

        {/* Add to Calendar */}
        {calendarUrl && (
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Lora', serif",
              fontSize: '0.82rem',
              color: 'var(--saffron)',
              textDecoration: 'none',
              opacity: 0.8,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <CalendarIcon />
            {t('add_to_calendar')}
          </a>
        )}
      </motion.div>
    </ScrollReveal>
  );
}
