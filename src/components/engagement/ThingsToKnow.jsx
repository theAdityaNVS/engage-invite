import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { COUPLE, ENGAGEMENT, GOOGLE_API } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';
import { useWeather } from '@/hooks/useWeather';

/* ── SVG Icons ── */
function CameraIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" style={{ width: 44, height: 44 }} aria-hidden="true">
      <rect x="6" y="14" width="36" height="26" rx="5" stroke="#3A3010" strokeWidth="2.5" fill="none"/>
      <circle cx="24" cy="27" r="8" stroke="#3A3010" strokeWidth="2.5" fill="none"/>
      <circle cx="24" cy="27" r="3" fill="rgba(58,48,16,0.3)"/>
      <rect x="16" y="10" width="16" height="5" rx="2.5" stroke="#3A3010" strokeWidth="2" fill="none"/>
      <circle cx="37" cy="20" r="2" fill="#3A3010" opacity="0.5"/>
    </svg>
  );
}

function ThermometerIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" style={{ width: 44, height: 44 }} aria-hidden="true">
      <rect x="20" y="8" width="8" height="22" rx="4" stroke="#3A3010" strokeWidth="2.5" fill="none"/>
      <circle cx="24" cy="34" r="7" stroke="#3A3010" strokeWidth="2.5" fill="none"/>
      <rect x="22.5" y="16" width="3" height="16" rx="1.5" fill="rgba(192,101,74,0.6)"/>
      <circle cx="24" cy="34" r="4" fill="rgba(192,101,74,0.5)"/>
      <line x1="28" y1="16" x2="32" y2="16" stroke="#3A3010" strokeWidth="2" strokeLinecap="round"/>
      <line x1="28" y1="21" x2="31" y2="21" stroke="#3A3010" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function SuitcaseIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" style={{ width: 44, height: 44 }} aria-hidden="true">
      <rect x="8" y="18" width="32" height="22" rx="4" stroke="#3A3010" strokeWidth="2.5" fill="none"/>
      <path d="M17 18 L17 14 Q17 10 24 10 Q31 10 31 14 L31 18" stroke="#3A3010" strokeWidth="2.5" fill="none"/>
      <line x1="24" y1="18" x2="24" y2="40" stroke="#3A3010" strokeWidth="2" opacity="0.4"/>
      <rect x="20" y="26" width="8" height="5" rx="2" stroke="#3A3010" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function CarParkIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" style={{ width: 44, height: 44 }} aria-hidden="true">
      <rect x="6" y="14" width="36" height="22" rx="5" stroke="#3A3010" strokeWidth="2.5" fill="none"/>
      <path d="M10 36 L10 40" stroke="#3A3010" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M38 36 L38 40" stroke="#3A3010" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="16" cy="36" r="4" stroke="#3A3010" strokeWidth="2" fill="none"/>
      <circle cx="32" cy="36" r="4" stroke="#3A3010" strokeWidth="2" fill="none"/>
      <path d="M10 24 L14 16 L34 16 L38 24" stroke="#3A3010" strokeWidth="2" fill="rgba(58,48,16,0.08)" strokeLinejoin="round"/>
      <rect x="18" y="19" width="7" height="6" rx="1" fill="rgba(168,200,230,0.6)"/>
      <rect x="26" y="19" width="7" height="6" rx="1" fill="rgba(168,200,230,0.6)"/>
    </svg>
  );
}

function HashtagCopied({ show }) {
  if (!show) return null;
  return (
    <motion.span
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute',
        top: '-2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--navy)',
        color: '#D4A843',
        fontSize: '0.78rem',
        padding: '0.2rem 0.7rem',
        borderRadius: '20px',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}
    >
      Copied! ✨
    </motion.span>
  );
}

function Item({ icon, label, children, delay }) {
  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '0.6rem',
        padding: '0 0.5rem',
      }}
    >
      {icon}
      <p style={{
        fontFamily: "'Lora', serif",
        fontSize: '0.7rem',
        color: 'var(--olive-text)',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        fontWeight: 700,
      }}>
        {label}
      </p>
      <p style={{
        fontFamily: "'Lora', serif",
        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
        color: 'var(--olive-text)',
        lineHeight: 1.6,
        maxWidth: 200,
      }}>
        {children}
      </p>
    </motion.div>
  );
}

export default function ThingsToKnow() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const { weather } = useWeather({
    lat: ENGAGEMENT.VENUE_LAT,
    lng: ENGAGEMENT.VENUE_LNG,
    apiKey: GOOGLE_API?.WEATHER_API_KEY,
  });

  const copyHashtag = () => {
    navigator.clipboard?.writeText(COUPLE.HASHTAG).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const weatherText = weather
    ? `${weather.temp}°C · ${weather.description}`
    : ENGAGEMENT.WEATHER_ADVISORY;

  return (
    <section style={{
      background: 'var(--olive)',
      padding: 'clamp(3rem, 8vw, 5rem) 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Leaf pattern texture */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.12 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="leaf" x="0" y="0" width="90" height="90" patternUnits="userSpaceOnUse">
            <path d="M45 10 Q70 45 45 80 Q20 45 45 10Z" fill="none" stroke="#7A8A20" strokeWidth="1.5"/>
            <line x1="45" y1="10" x2="45" y2="80" stroke="#7A8A20" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#leaf)" />
      </svg>

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
              color: 'var(--olive-text)',
              letterSpacing: '0.04em',
              marginBottom: '0.8rem',
            }}>
              {t('things_heading')}
            </h2>
            <p style={{
              fontFamily: "'Lora', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
              color: 'var(--olive-text)',
              opacity: 0.7,
              maxWidth: 560,
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              {t('things_subheading')}
            </p>
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem 2rem',
          justifyItems: 'center',
        }}>
          {/* Hashtag */}
          <div style={{ position: 'relative' }}>
            <HashtagCopied show={copied} />
            <Item icon={<CameraIcon />} label={t('hashtag_label')} delay={0}>
              <span
                onClick={copyHashtag}
                style={{ cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}
              >
                {COUPLE.HASHTAG}
              </span>
            </Item>
          </div>

          {/* Weather */}
          <Item icon={<ThermometerIcon />} label={t('weather_label')} delay={0.1}>
            {weatherText}
          </Item>

          {/* Accommodation */}
          <Item icon={<SuitcaseIcon />} label={t('accommodation_label')} delay={0.2}>
            {t('accommodation_text')}
          </Item>

          {/* Parking */}
          <Item icon={<CarParkIcon />} label={t('parking_label')} delay={0.3}>
            {t('parking_text')}
          </Item>
        </div>
      </div>
    </section>
  );
}
