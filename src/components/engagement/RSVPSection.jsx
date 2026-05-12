import ScrollReveal from '@/components/shared/ScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';

export default function RSVPSection() {
  const { t } = useLanguage();

  return (
    <section style={{
      background: 'var(--rose)',
      padding: 'clamp(2.5rem, 7vw, 4rem) 1.5rem',
      textAlign: 'center',
    }}>
      <ScrollReveal>
        <p style={{
          fontFamily: "'Lora', serif",
          fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
          color: 'rgba(255,248,240,0.55)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '0.4rem',
        }}>
          {t('rsvp_please')}
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(2.5rem, 7vw, 4rem)',
          color: 'var(--burgundy-text)',
          lineHeight: 1.1,
          marginBottom: '1.2rem',
        }}>
          {t('rsvp_title')}
        </h2>
        <p style={{
          fontFamily: "'Lora', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          color: 'var(--burgundy-text)',
          opacity: 0.75,
          maxWidth: 480,
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          {t('rsvp_looking_forward')}
        </p>
      </ScrollReveal>
    </section>
  );
}
