import { COUPLE, ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

export default function FooterSection() {
  const { t } = useLanguage();

  return (
    <footer style={{
      background: '#2D1810',
      padding: 'clamp(2rem, 5vw, 3rem) 1.5rem',
      textAlign: 'center',
      borderTop: '1px solid rgba(212,168,67,0.2)',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.4rem, 4vw, 2rem)',
          color: '#D4A843',
          marginBottom: '0.5rem',
        }}>
          {COUPLE.GROOM_NAME} &amp; {COUPLE.BRIDE_NAME}
        </p>
        <p style={{
          fontFamily: "'Lora', serif",
          fontSize: '0.9rem',
          color: 'rgba(240,214,138,0.7)',
          marginBottom: '0.5rem',
          letterSpacing: '0.05em',
        }}>
          {ENGAGEMENT.DATE_DISPLAY} · {ENGAGEMENT.VENUE_CITY}
        </p>
        <p style={{
          fontFamily: "'Lora', serif",
          fontSize: '0.85rem',
          color: 'rgba(255,248,240,0.4)',
          letterSpacing: '0.05em',
          marginBottom: '1.5rem',
        }}>
          {COUPLE.HASHTAG}
        </p>

        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.3), transparent)',
          margin: '0 auto 1.25rem',
          maxWidth: '280px',
        }} />

        <p style={{
          fontFamily: "'Lora', serif",
          fontSize: '0.8rem',
          color: 'rgba(255,248,240,0.3)',
        }}>
          {t('made_with_love')}
        </p>
      </div>
    </footer>
  );
}
