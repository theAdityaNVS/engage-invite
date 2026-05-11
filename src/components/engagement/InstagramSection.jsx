import { motion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { COUPLE } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

/* Teal 1930s open-top convertible — Instagram icon in windshield */
function TealConvertibleCar() {
  return (
    <svg viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 340, display: 'block' }} aria-hidden="true">
      {/* Body */}
      <path d="M20 110 L20 80 Q22 68 50 66 L310 66 Q338 68 340 80 L340 110Z" fill="#2AB8A0"/>
      {/* Open cabin — no roof */}
      <path d="M70 66 Q76 44 100 38 L220 38 Q240 44 250 66Z" fill="#1E9A87"/>
      {/* Windshield (tall, for IG icon) */}
      <path d="M78 65 Q82 46 100 42 L180 42 L176 65Z" fill="#A8E8E0" opacity="0.8"/>
      {/* Passenger area (open top) */}
      <path d="M184 65 L182 42 L218 42 Q238 46 248 65Z" fill="#A8E8E0" opacity="0.6"/>
      {/* Instagram icon in windshield */}
      <g transform="translate(96, 46)">
        <rect x="2" y="2" width="26" height="26" rx="7" stroke="#1A2535" strokeWidth="2" fill="none"/>
        <circle cx="15" cy="15" r="6" stroke="#1A2535" strokeWidth="2" fill="none"/>
        <circle cx="22" cy="8" r="2" fill="#1A2535"/>
      </g>
      {/* Wheels */}
      <circle cx="90"  cy="112" r="24" fill="#1A1A1A"/>
      <circle cx="90"  cy="112" r="13" fill="#555"/>
      <circle cx="90"  cy="112" r="5"  fill="#333"/>
      <circle cx="270" cy="112" r="24" fill="#1A1A1A"/>
      <circle cx="270" cy="112" r="13" fill="#555"/>
      <circle cx="270" cy="112" r="5"  fill="#333"/>
      {/* Headlights */}
      <ellipse cx="342" cy="82" rx="8" ry="5" fill="#FFF176" opacity="0.9"/>
      <ellipse cx="18"  cy="82" rx="8" ry="5" fill="#FFF176" opacity="0.7"/>
      {/* Chrome trim */}
      <rect x="20" y="104" width="320" height="4" rx="2" fill="rgba(255,255,255,0.3)"/>
      {/* Windshield frame */}
      <path d="M78 66 Q82 44 100 40 L180 40" stroke="#1E9A87" strokeWidth="3" fill="none"/>
      {/* Door handle */}
      <rect x="155" y="83" width="12" height="4" rx="2" fill="rgba(255,255,255,0.3)"/>
      {/* Spare tire at back */}
      <circle cx="330" cy="100" r="14" stroke="#1A1A1A" strokeWidth="2" fill="none"/>
      <circle cx="330" cy="100" r="8"  fill="#1A1A1A"/>
    </svg>
  );
}

export default function InstagramSection() {
  const { t } = useLanguage();
  const igUrl = `https://instagram.com/${COUPLE.INSTAGRAM_HANDLE.replace('@', '')}`;

  return (
    <section style={{
      background: 'var(--olive)',
      padding: 'clamp(2rem, 6vw, 4rem) 1.5rem',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      <ScrollReveal>
        <p style={{
          fontFamily: "'Lora', serif",
          fontSize: '0.78rem',
          color: 'rgba(58,48,16,0.55)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          marginBottom: '0.4rem',
        }}>
          ✦
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          color: 'var(--olive-text)',
          lineHeight: 1.1,
          letterSpacing: '0.06em',
          marginBottom: '0.3rem',
        }}>
          {t('follow_the_action')}
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <a
          href={igUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            fontFamily: "'Lora', serif",
            fontSize: '0.9rem',
            color: 'var(--olive-text)',
            opacity: 0.65,
            textDecoration: 'underline',
            textUnderlineOffset: 3,
            marginBottom: '2rem',
            cursor: 'pointer',
          }}
        >
          {t('follow_subtitle')} · {COUPLE.INSTAGRAM_HANDLE}
        </a>
      </ScrollReveal>

      {/* Car slides in from left */}
      <motion.div
        initial={{ x: '-60vw', opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <a href={igUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', cursor: 'pointer' }}>
          <TealConvertibleCar />
        </a>
      </motion.div>
    </section>
  );
}
