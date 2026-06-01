import ScrollReveal from '@/components/shared/ScrollReveal';
import EventCard from '@/components/shared/EventCard';
import MandalaPattern from '@/components/shared/MandalaPattern';
import { ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

const CAL_TIMES = {
  'engagement-puja': { start: '20260617T100000', end: '20260617T113000' },
  'ring-ceremony':   { start: '20260617T113000', end: '20260617T130000' },
  'family-lunch':    { start: '20260617T130000', end: '20260617T150000' },
};

function makeCalendarUrl(event) {
  const times = CAL_TIMES[event.id] || { start: '20260617T100000', end: '20260617T120000' };
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.name,
    dates: `${times.start}/${times.end}`,
    location: event.address,
    details: `Part of the engagement celebrations of Aditya & Jyoti at ${event.venue}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function EventCardsSection() {
  const { t } = useLanguage();

  return (
    <section style={{
      background: 'linear-gradient(180deg, var(--saffron) 0%, #5A1423 60%, #3D0A14 100%)',
      padding: 'clamp(3rem, 8vw, 5rem) 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <MandalaPattern color="var(--gold-light)" opacity={0.15} />
      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
              color: 'var(--teal-text)',
              letterSpacing: '0.06em',
            }}>
              {t('events_heading')}
            </h2>
            <div style={{
              width: '60px', height: '2px',
              background: 'linear-gradient(to right, rgba(212,168,67,0.1), var(--gold), rgba(212,168,67,0.1))',
              margin: '1.2rem auto 0',
              borderRadius: '2px',
            }} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.06}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              display: 'inline-block',
              fontFamily: "'Lora', serif",
              fontSize: '0.88rem',
              color: '#F0D68A',
              background: 'rgba(212, 168, 67, 0.12)',
              border: '1.5px solid rgba(212,168,67,0.7)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: '20px',
              padding: '0.45rem 1.4rem',
              letterSpacing: '0.12em',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              fontWeight: 500,
            }}>
              ✦ {t('muhurtham_label')}: {ENGAGEMENT.MUHURTHAM_TIME} ✦
            </span>
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '3rem 2rem',
          paddingBottom: '1rem',
        }}>
          {ENGAGEMENT.EVENTS.map((event, i) => (
            <EventCard key={event.id} event={event} delay={i * 0.12} calendarUrl={makeCalendarUrl(event)} />
          ))}
        </div>
      </div>
    </section>
  );
}
