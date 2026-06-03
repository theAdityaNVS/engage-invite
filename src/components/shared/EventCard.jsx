import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';

/* Gold marigold cluster for card corners */
export function FloralAccent({ style, className }) {
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
      style={{ width: 44, height: 44, ...style }} className={className} aria-hidden="true">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <path
          key={a}
          d={getD(a)}
          fill="rgba(212,168,67,0.8)"
        />
      ))}
      <circle cx="25" cy="25" r="5" fill="#D4A843" />
    </svg>
  );
}

const EVENT_ICONS = {
  'engagement-puja': (
    <svg viewBox="0 0 48 48" fill="none" style={{ width: 56, height: 56 }} aria-hidden="true">
      {/* Diya body in golden lines */}
      <path d="M12 28 C12 36 24 38 36 36 C36 36 38 28 36 26 C34 24 14 24 12 28Z" stroke="#C4572A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(212,168,67,0.12)"/>
      <path d="M16 28 C16 32 24 34 32 33" stroke="#A8451E" strokeWidth="1.2" strokeLinecap="round"/>
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
      <circle className="diya-flame-animated" cx="24" cy="14" r="11" fill="url(#flame-glow)" opacity="0.6" />
      {/* Precise Flame vectors */}
      <path className="diya-flame-animated" d="M24 6 C26 12 29 15 29 19 C29 22 26 24 24 24 C22 24 19 22 19 19 C19 15 22 12 24 6Z" fill="#FFC837" stroke="#C4572A" strokeWidth="1" />
      <path className="diya-flame-animated" d="M24 10 C25 14 27 16 27 19 C27 21 25 22 24 22 C23 22 21 21 21 19 C21 16 23 14 24 10Z" fill="#FF8008" />
    </svg>
  ),
  'ring-ceremony': (
    <svg viewBox="0 0 48 48" fill="none" style={{ width: 56, height: 56 }} aria-hidden="true">
      {/* Left Ring (offset behind) */}
      <circle cx="20" cy="26" r="10" stroke="rgba(139,34,64,0.4)" strokeWidth="1.8" />
      <circle cx="20" cy="26" r="7" stroke="rgba(139,34,64,0.2)" strokeWidth="1" />
      {/* Right Ring (offset front) */}
      <circle cx="28" cy="22" r="10" stroke="#C4572A" strokeWidth="2.5" />
      <circle cx="28" cy="22" r="7" stroke="#D4A843" strokeWidth="1.2" />
      {/* Diamond bezel setting */}
      <path d="M28 12 L30 9 L28 6 L26 9 Z" fill="#FFF8F0" stroke="#D4A843" strokeWidth="1" />
      {/* Diamond shine star */}
      <path className="diamond-sparkle-animated" d="M28 3 L29 7 L33 8 L29 9 L28 13 L27 9 L23 8 L27 7 Z" fill="#D4A843" opacity="0.95" />
      <circle className="diamond-sparkle-animated" cx="28" cy="8" r="1.5" fill="#FFF" />
    </svg>
  ),
  'family-lunch': (
    <svg viewBox="0 0 48 48" fill="none" style={{ width: 56, height: 56 }} aria-hidden="true">
      {/* Plate rim */}
      <circle cx="24" cy="26" r="16" stroke="#8B2240" strokeWidth="2.5" fill="rgba(212,168,67,0.08)" />
      <circle cx="24" cy="26" r="14.5" stroke="#D4A843" strokeWidth="1" />
      {/* Small bowls (katoris) inside */}
      <circle cx="16" cy="20" r="3.5" stroke="#C4572A" strokeWidth="1.5" fill="rgba(212,168,67,0.12)" />
      <circle cx="24" cy="16" r="3.5" stroke="#C4572A" strokeWidth="1.5" fill="rgba(212,168,67,0.12)" />
      <circle cx="32" cy="20" r="3.5" stroke="#C4572A" strokeWidth="1.5" fill="rgba(212,168,67,0.12)" />
      {/* Food cluster in middle */}
      <path d="M20 28 Q24 23 28 28 Z" fill="#D4A843" opacity="0.85" />
      <circle cx="19" cy="30" r="1.8" fill="#C4572A" />
      <circle cx="24" cy="31" r="1.8" fill="#C4572A" />
      <circle cx="29" cy="30" r="1.8" fill="#C4572A" />
      {/* Elegant Steam waves rising */}
      <path className="steam-wave-1" d="M19 12 Q21 8 20 5" stroke="#C4572A" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
      <path className="steam-wave-2" d="M24 9 Q26 5 25 2" stroke="#A8451E" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
      <path className="steam-wave-3" d="M29 12 Q31 8 30 5" stroke="#C4572A" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
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

/* Inset Double Border Frame with elegant corner stars (No mosque-like arch shape) */
export function PremiumDoubleBorderFrame({ borderColor = 'rgba(212, 168, 67, 0.35)', dashColor = 'rgba(212, 168, 67, 0.18)' }) {
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      right: '10px',
      bottom: '10px',
      border: `1.5px solid ${borderColor}`,
      borderRadius: '16px',
      pointerEvents: 'none',
      zIndex: 2,
    }}>
      {/* Inner Nested Dashed Border */}
      <div style={{
        position: 'absolute',
        top: '4px',
        left: '4px',
        right: '4px',
        bottom: '4px',
        border: `1px dashed ${dashColor}`,
        borderRadius: '12px',
        pointerEvents: 'none',
      }} />
      
      {/* Four Elegant Corner Diamond Stars */}
      <span style={{ position: 'absolute', top: '2px', left: '4px', color: borderColor, fontSize: '10px', lineHeight: 1, filter: 'drop-shadow(0 0 2px rgba(212,168,67,0.3))' }}>✦</span>
      <span style={{ position: 'absolute', top: '2px', right: '4px', color: borderColor, fontSize: '10px', lineHeight: 1, filter: 'drop-shadow(0 0 2px rgba(212,168,67,0.3))' }}>✦</span>
      <span style={{ position: 'absolute', bottom: '2px', left: '4px', color: borderColor, fontSize: '10px', lineHeight: 1, filter: 'drop-shadow(0 0 2px rgba(212,168,67,0.3))' }}>✦</span>
      <span style={{ position: 'absolute', bottom: '2px', right: '4px', color: borderColor, fontSize: '10px', lineHeight: 1, filter: 'drop-shadow(0 0 2px rgba(212,168,67,0.3))' }}>✦</span>
    </div>
  );
}

export default function EventCard({ event, delay = 0, calendarUrl }) {
  const { t } = useLanguage();
  const icon = EVENT_ICONS[event.id] || EVENT_ICONS['engagement-puja'];

  // Translate event name & weekday via keys, falling back to the canonical
  // config value when no translation key exists (t() returns the key on miss).
  const tr = (key, fallback) => {
    const v = t(key);
    return v === key ? fallback : v;
  };
  const eventName = tr(`event_${event.id.replace(/-/g, '_')}`, event.name);
  const eventDay = tr(`weekday_${event.day.toLowerCase()}`, event.day);

  return (
    <ScrollReveal delay={delay}>
      <motion.div
        whileHover={{ y: -6, boxShadow: '0 24px 56px rgba(90, 20, 35, 0.35), inset 0 0 45px rgba(212, 168, 67, 0.18)' }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="event-card-hover"
        style={{
          background: 'linear-gradient(180deg, #FAF6EE 0%, #FAF0D4 100%)',
          borderRadius: '24px', /* Modern premium rounded corners */
          overflow: 'visible',
          boxShadow: '0 20px 48px rgba(90, 20, 35, 0.24), inset 0 0 35px rgba(212, 168, 67, 0.12)',
          position: 'relative',
          padding: '2.5rem 1.8rem 2.2rem', /* Sleek balanced padding */
          textAlign: 'center',
          minHeight: 380,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.45rem',
          border: '1px solid rgba(212, 168, 67, 0.15)',
        }}
      >
        {/* Sleek Inset Gold Double Frame */}
        <PremiumDoubleBorderFrame />

        {/* Diagonal Gold Foil Shimmer sweep */}
        <div className="gold-foil-shimmer-container">
          <div className="gold-foil-shimmer" />
        </div>

        {/* Central Traditional Emblem sitting inside a detailed brass halo niche */}
        <div style={{ 
          marginBottom: '0.8rem', 
          position: 'relative', 
          zIndex: 2,
          background: 'rgba(212, 168, 67, 0.05)',
          border: '1.5px solid rgba(212, 168, 67, 0.35)',
          borderRadius: '50%',
          padding: '0.8rem',
          boxShadow: '0 8px 24px rgba(212, 168, 67, 0.12)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </div>

        {/* Event name */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.2rem, 3.5vw, 1.45rem)',
          color: '#5A1423',
          letterSpacing: '0.04em',
          fontWeight: 600,
          lineHeight: 1.3,
          marginBottom: '0.2rem',
          position: 'relative',
          zIndex: 2,
        }}>
          {eventName}
        </h3>

        {/* Date & day */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          color: '#2D1810',
          opacity: 0.85,
          position: 'relative',
          zIndex: 2,
        }}>
          {eventDay}, {event.date}
        </p>

        {/* Time */}
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.15rem',
          color: '#C4572A',
          fontWeight: 600,
          letterSpacing: '0.02em',
          margin: '0.15rem 0',
          position: 'relative',
          zIndex: 2,
        }}>
          {event.time}
        </p>

        {/* Venue */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.88rem',
          color: '#2D1810',
          opacity: 0.72,
          lineHeight: 1.45,
          marginBottom: '0.8rem',
          position: 'relative',
          zIndex: 2,
          padding: '0 0.5rem',
        }}>
          {event.venue}
        </p>

        {/* Actions Button Bar */}
        <div style={{
          marginTop: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          width: '100%',
          position: 'relative',
          zIndex: 3,
        }}>
          {/* See Route Button - Premium gold gradient */}
          <motion.a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.025, background: 'linear-gradient(135deg, #A8451E, #8A3716)', boxShadow: '0 6px 18px rgba(196, 87, 42, 0.35)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '42px',
              background: 'linear-gradient(135deg, #C4572A, #A8451E)',
              borderRadius: '21px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: '#FFF8F0',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 500,
              textDecoration: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(196, 87, 42, 0.25)',
              transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            {t('see_the_route')} ↗
          </motion.a>

          {/* Add to Calendar Button - Elegant gold glass overlay */}
          {calendarUrl && (
            <motion.a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.025, background: 'rgba(212, 168, 67, 0.12)', borderColor: 'rgba(212, 168, 67, 0.85)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '42px',
                background: 'rgba(212, 168, 67, 0.06)',
                border: '1.2px solid rgba(212, 168, 67, 0.5)',
                borderRadius: '21px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                color: '#5A1423',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
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
