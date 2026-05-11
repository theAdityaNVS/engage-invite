import { motion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

function PinIcon() {
  return (
    <svg viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 32, height: 38 }} aria-hidden="true">
      <path d="M20 2 C10 2 2 10 2 20 C2 32 20 46 20 46 C20 46 38 32 38 20 C38 10 30 2 20 2Z"
        fill="#D4A843" />
      <circle cx="20" cy="20" r="7" fill="rgba(26,37,53,0.35)" />
    </svg>
  );
}

export default function RouteCTA() {
  const { t } = useLanguage();

  return (
    <section style={{ background: 'var(--teal)', padding: 'clamp(2rem, 6vw, 3.5rem) 1.5rem' }}>
      <ScrollReveal>
        <a
          href={ENGAGEMENT.VENUE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', textDecoration: 'none' }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              maxWidth: 600,
              margin: '0 auto',
              textAlign: 'center',
              padding: '2rem',
              border: '1.5px solid rgba(212,168,67,0.4)',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
          >
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              color: '#D4A843',
              letterSpacing: '0.08em',
              marginBottom: '0.4rem',
            }}>
              {t('route_cta_heading')}
            </h2>
            <p style={{
              fontFamily: "'Lora', serif",
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              color: 'var(--teal-text)',
              opacity: 0.75,
              marginBottom: '1.2rem',
            }}>
              {t('click_map')}
            </p>
            <PinIcon />
          </motion.div>
        </a>
      </ScrollReveal>
    </section>
  );
}
