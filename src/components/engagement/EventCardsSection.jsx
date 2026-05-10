import ScrollReveal from '@/components/shared/ScrollReveal';
import EventCard from '@/components/shared/EventCard';
import { ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

export default function EventCardsSection() {
  const { t } = useLanguage();

  return (
    <section style={{
      background: '#FDF0E0',
      padding: 'clamp(3rem, 8vw, 5rem) 1.5rem',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{
              fontFamily: "'Lora', serif",
              fontSize: '0.8rem',
              color: '#8B1A2B',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}>
              ✦ Join Us ✦
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
              color: '#2D1810',
            }}>
              {t('events_heading')}
            </h2>
            <div style={{
              width: '60px', height: '2px',
              background: 'linear-gradient(to right, #8B1A2B, #D4A843)',
              margin: '1rem auto 0',
              borderRadius: '2px',
            }} />
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {ENGAGEMENT.EVENTS.map((event, i) => (
            <EventCard key={event.id} event={event} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
