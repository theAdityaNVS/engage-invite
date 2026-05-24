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
      background: 'var(--teal)',
      padding: 'clamp(3rem, 8vw, 5rem) 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <MandalaPattern color="var(--gold-light)" opacity={0.22} />
      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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

        <ScrollReveal delay={0.1}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{
              display: 'inline-block',
              fontFamily: "'Lora', serif",
              fontSize: '0.85rem',
              color: '#D4A843',
              border: '1px solid rgba(212,168,67,0.4)',
              borderRadius: '20px',
              padding: '0.35rem 1.1rem',
              letterSpacing: '0.1em',
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
