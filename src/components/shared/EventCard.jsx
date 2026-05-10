import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';

const ILLUSTRATIONS = {
  puja: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 48, height: 48 }}>
      <circle cx="30" cy="30" r="28" fill="rgba(212,168,67,0.15)" stroke="#D4A843" strokeWidth="1.5"/>
      <path d="M30 15 L34 25 L44 25 L36 31 L39 41 L30 35 L21 41 L24 31 L16 25 L26 25Z" fill="#D4A843" opacity="0.8"/>
      <circle cx="30" cy="30" r="5" fill="#8B1A2B"/>
    </svg>
  ),
  ring: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 48, height: 48 }}>
      <circle cx="30" cy="30" r="28" fill="rgba(212,168,67,0.15)" stroke="#D4A843" strokeWidth="1.5"/>
      <circle cx="30" cy="30" r="14" stroke="#8B1A2B" strokeWidth="3" fill="none"/>
      <circle cx="30" cy="30" r="10" stroke="#D4A843" strokeWidth="2" fill="none"/>
      <path d="M24 20 Q30 15 36 20" stroke="#D4A843" strokeWidth="2" fill="none"/>
      <circle cx="30" cy="17" r="3" fill="#C44D5E"/>
    </svg>
  ),
  lunch: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 48, height: 48 }}>
      <circle cx="30" cy="30" r="28" fill="rgba(212,168,67,0.15)" stroke="#D4A843" strokeWidth="1.5"/>
      <ellipse cx="30" cy="35" rx="16" ry="6" fill="#D4A843" opacity="0.6"/>
      <path d="M20 35 Q20 22 30 22 Q40 22 40 35" stroke="#8B1A2B" strokeWidth="2" fill="rgba(139,26,43,0.1)"/>
      <line x1="30" y1="16" x2="30" y2="22" stroke="#1B6B4A" strokeWidth="2"/>
      <path d="M27 16 Q30 12 33 16" stroke="#1B6B4A" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
};

export default function EventCard({ event, delay = 0 }) {
  const { t } = useLanguage();

  return (
    <ScrollReveal delay={delay}>
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(139,26,43,0.2)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          background: '#FFF8F0',
          border: '1px solid rgba(212,168,67,0.4)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(139,26,43,0.08)',
        }}
      >
        {/* Card header with illustration */}
        <div style={{
          background: 'linear-gradient(135deg, #8B1A2B 0%, #C44D5E 100%)',
          padding: '1.5rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.1,
            backgroundImage: 'radial-gradient(circle at 20% 80%, #D4A843 0%, transparent 50%), radial-gradient(circle at 80% 20%, #FFF8F0 0%, transparent 40%)',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            {ILLUSTRATIONS[event.illustration] || ILLUSTRATIONS.puja}
          </div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.3rem',
            color: '#FFF8F0',
            marginTop: '0.75rem',
            textAlign: 'center',
            position: 'relative', zIndex: 1,
          }}>
            {event.name}
          </h3>
        </div>

        {/* Card body */}
        <div style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#6B4E3D' }}>
              <span style={{ fontSize: '1rem' }}>📅</span>
              <span style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem' }}>
                {event.date} · {event.day}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#6B4E3D' }}>
              <span style={{ fontSize: '1rem' }}>🕐</span>
              <span style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem' }}>{event.time}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#6B4E3D' }}>
              <span style={{ fontSize: '1rem', marginTop: '1px' }}>📍</span>
              <span style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', lineHeight: 1.4 }}>
                {event.address}
              </span>
            </div>
          </div>

          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                padding: '0.65rem 1rem',
                background: 'linear-gradient(135deg, #8B1A2B, #C44D5E)',
                color: '#FFF8F0',
                borderRadius: '8px',
                fontFamily: "'Lora', serif",
                fontSize: '0.85rem',
                letterSpacing: '0.03em',
                cursor: 'pointer',
              }}
            >
              <span>🗺️</span>
              <span>{t('navigate')}</span>
            </motion.div>
          </a>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}
