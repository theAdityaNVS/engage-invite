import ScrollReveal from '@/components/shared/ScrollReveal';
import EventCard from '@/components/shared/EventCard';
import { ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

export default function EventCardsSection() {
  const { t } = useLanguage();

  return (
    <section style={{
      background: 'var(--teal)',
      padding: 'clamp(3rem, 8vw, 5rem) 1.5rem',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{
              fontFamily: "'Lora', serif",
              fontSize: '0.8rem',
              color: 'rgba(212,168,67,0.8)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}>
              ✦ {t('join_us_label')} ✦
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
              color: 'var(--teal-text)',
            }}>
              {t('events_heading')}
            </h2>
            <div style={{
              width: '60px', height: '2px',
              background: 'linear-gradient(to right, var(--teal-dark), var(--gold))',
              margin: '1rem auto 0',
              borderRadius: '2px',
            }} />
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '3rem 2rem',
          paddingBottom: '1rem',
        }}>
          {ENGAGEMENT.EVENTS.map((event, i) => (
            <EventCard key={event.id} event={event} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
