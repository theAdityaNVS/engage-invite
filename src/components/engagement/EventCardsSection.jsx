import { useState } from 'react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import EventCard from '@/components/shared/EventCard';
import MandalaPattern from '@/components/shared/MandalaPattern';
import SectionHeader from '@/components/shared/SectionHeader';
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
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
          <SectionHeader
            eyebrow={t('join_us_label') || "Join Us For"}
            title={t('events_heading')}
            eyebrowType="cursive"
            theme="saffron"
            style={{ marginBottom: '3.5rem' }}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.06}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem', position: 'relative', zIndex: 3 }}>
            <div 
              className="muhurtham-ornament-container"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: '#5A1423',
                background: 'linear-gradient(180deg, #FFFDF9 0%, #FAF0D4 100%)',
                border: '2.5px solid var(--gold)',
                borderRadius: '30px',
                padding: '0.6rem 2.2rem',
                letterSpacing: '0.12em',
                fontWeight: 500,
                position: 'relative',
                boxShadow: '0 8px 24px rgba(90, 20, 35, 0.2)',
              }}
            >
              <span style={{ color: '#D4A843', marginRight: '6px' }}>✦</span>
              {t('muhurtham_label')}: <strong style={{ color: '#C4572A', marginLeft: '4px', fontWeight: 600 }}>{ENGAGEMENT.MUHURTHAM_TIME}</strong>
              <span style={{ color: '#D4A843', marginLeft: '6px' }}>✦</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Chronological Timeline Container */}
        <div className="timeline-container">
          {/* Glowing Center Line */}
          <div className="timeline-track" />

          {ENGAGEMENT.EVENTS.map((event, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={event.id} style={{ display: 'contents' }}>
                <div 
                  className={`timeline-item ${isLeft ? 'timeline-item-left' : 'timeline-item-right'}`}
                >
                  {/* Timeline node marker that pulses and scales on card hover */}
                  <div 
                    className={`timeline-node ${hoveredIndex === i ? 'timeline-node-active' : ''}`}
                    onClick={() => {
                      window.open(event.mapsUrl, '_blank');
                    }}
                    title={t('see_the_route')}
                  />

                  {/* Timeline Card Wrapper coordinating hover state with node */}
                  <div 
                    className="timeline-card-wrapper"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <EventCard 
                      event={event} 
                      delay={i * 0.12} 
                      calendarUrl={makeCalendarUrl(event)} 
                    />
                  </div>
                </div>

                {/* Garland Divider between stacked cards, visible only on Mobile */}
                {i < ENGAGEMENT.EVENTS.length - 1 && (
                  <div className="mobile-timeline-divider" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
