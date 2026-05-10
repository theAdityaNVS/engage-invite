import ScrollReveal from '@/components/shared/ScrollReveal';
import CountdownTimer from '@/components/shared/CountdownTimer';
import { ENGAGEMENT, COUPLE } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

export default function CountdownSection() {
  const { t } = useLanguage();

  return (
    <section style={{
      background: 'linear-gradient(135deg, #2D1810 0%, #8B1A2B 40%, #6B2535 70%, #2D1810 100%)',
      padding: 'clamp(4rem, 10vw, 6rem) 1.5rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative background shimmer */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(212,168,67,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(212,168,67,0.1) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <p style={{
            fontFamily: "'Lora', serif",
            fontSize: '0.8rem',
            color: 'rgba(212,168,67,0.7)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            ✦ The Big Day ✦
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            color: '#F0D68A',
            marginBottom: '3rem',
          }}>
            {t('countdown_heading')}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <CountdownTimer targetISO={ENGAGEMENT.COUNTDOWN_ISO} />
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            margin: '3rem auto 1.5rem',
            maxWidth: '320px',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(212,168,67,0.4)' }} />
            <span style={{ color: '#D4A843', fontSize: '1.2rem' }}>✦</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(212,168,67,0.4)' }} />
          </div>
          <p style={{
            fontFamily: "'Lora', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
            color: 'rgba(255,248,240,0.85)',
            lineHeight: 1.7,
          }}>
            {t('countdown_message')}
          </p>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
            color: '#D4A843',
            marginTop: '1rem',
          }}>
            — {COUPLE.GROOM_NAME} &amp; {COUPLE.BRIDE_NAME}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
