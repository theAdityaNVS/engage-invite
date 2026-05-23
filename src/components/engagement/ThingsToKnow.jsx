import { motion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { ENGAGEMENT, GOOGLE_API } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';
import { useWeather } from '@/hooks/useWeather';

function SunIcon() {
  return (
    <svg viewBox="0 0 48 48" style={{ width: 36, height: 36 }} aria-hidden="true">
      <circle cx="24" cy="24" r="9" fill="#FFD037" style={{ animation: 'ganeshaPulse 3s ease-in-out infinite' }}/>
      {Array.from({length:8},(_,i)=>{
        const a=(i*45)*Math.PI/180;
        return <line key={i} x1={24+13*Math.cos(a)} y1={24+13*Math.sin(a)}
          x2={24+18*Math.cos(a)} y2={24+18*Math.sin(a)}
          stroke="#FFD037" strokeWidth="2.5" strokeLinecap="round"/>;
      })}
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 48 48" style={{ width: 36, height: 36 }} aria-hidden="true">
      <circle cx="20" cy="26" r="9" fill="rgba(200,200,220,0.85)"/>
      <circle cx="28" cy="24" r="10" fill="rgba(200,200,220,0.9)"/>
      <circle cx="34" cy="28" r="7"  fill="rgba(200,200,220,0.8)"/>
      <rect x="14" y="28" width="26" height="8" rx="4" fill="rgba(200,200,220,0.85)"/>
      <circle cx="16" cy="18" r="6"  fill="#FFD037" opacity="0.7"/>
    </svg>
  );
}

function RainIcon() {
  return (
    <svg viewBox="0 0 48 48" style={{ width: 36, height: 36 }} aria-hidden="true">
      <circle cx="20" cy="20" r="8" fill="rgba(160,180,220,0.9)"/>
      <circle cx="28" cy="18" r="9" fill="rgba(160,180,220,0.95)"/>
      <circle cx="34" cy="22" r="6" fill="rgba(160,180,220,0.85)"/>
      <rect x="14" y="22" width="24" height="7" rx="3.5" fill="rgba(160,180,220,0.9)"/>
      {[17,22,27,32].map(x=>(
        <line key={x} x1={x} y1="32" x2={x-2} y2="40" stroke="#6090C0" strokeWidth="1.8" strokeLinecap="round"/>
      ))}
    </svg>
  );
}

const EVENT_SLOTS = [
  { time: '8 AM',  label: 'Morning'                 },
  { time: '9 AM',  label: ''                        },
  { time: '10 AM', label: 'Puja',   highlight: true },
  { time: '11 AM', label: ''                        },
  { time: '12 PM', label: 'Rings',  highlight: true },
  { time: '1 PM',  label: ''                        },
  { time: '2 PM',  label: 'Lunch',  highlight: true },
  { time: '3 PM',  label: ''                        },
  { time: '4 PM',  label: 'Evening'                 },
];

function WeatherCard({ weather }) {
  const { t } = useLanguage();
  const slotIcon = () => {
    if (!weather) return <SunIcon />;
    if (weather.temp > 35) return <SunIcon />;
    if (weather.description?.toLowerCase().includes('rain')) return <RainIcon />;
    return <CloudIcon />;
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', justifyContent: 'center' }}>
        <SunIcon />
        <div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: 'var(--sand-text)', margin: 0 }}>
            {t('weather_label')}
          </p>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '0.75rem', color: 'var(--sand-text)', opacity: 0.65, margin: 0 }}>
            {weather ? `${weather.temp}°C · ${weather.description}` : ENGAGEMENT.WEATHER_ADVISORY}
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
        <div style={{ display: 'flex', gap: '0.5rem', minWidth: 'max-content', padding: '0.25rem 0.5rem' }}>
          {EVENT_SLOTS.map((slot) => (
            <div key={slot.time} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
              padding: '0.6rem 0.7rem',
              background: slot.highlight ? 'rgba(212,168,67,0.18)' : 'rgba(255,248,240,0.06)',
              border: slot.highlight ? '1px solid rgba(212,168,67,0.45)' : '1px solid rgba(58,32,16,0.15)',
              borderRadius: '6px',
              minWidth: 62,
            }}>
              {slotIcon()}
              <span style={{ fontFamily: "'Lora', serif", fontSize: '0.82rem', color: 'var(--sand-text)', fontWeight: 600 }}>
                {slot.time}
              </span>
              {slot.label && (
                <span style={{
                  fontFamily: "'Lora', serif", fontSize: '0.72rem',
                  color: slot.highlight ? '#D4A843' : 'rgba(58,32,16,0.5)',
                  letterSpacing: '0.08em',
                }}>
                  {slot.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReachCard() {
  const { t } = useLanguage();
  return (
    <div>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: 'var(--sand-text)', marginBottom: '0.8rem' }}>
        {t('reach_label')}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        <div style={{ borderLeft: '2px solid rgba(212,168,67,0.5)', paddingLeft: '0.85rem' }}>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '0.72rem', color: 'var(--sand-text)', opacity: 0.6, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
            {t('from_visakhapatnam')}
          </p>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '0.88rem', color: 'var(--sand-text)', lineHeight: 1.6 }}>
            {t('flight_duration')}<br/>
            {t('train_duration')}
          </p>
          <div style={{ display: 'flex', gap: '0.9rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <a href="https://www.google.com/travel/flights?q=flights+from+Visakhapatnam+to+Bhubaneswar"
              target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Lora', serif", fontSize: '0.75rem', color: '#D4A843', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              {t('search_flights')}
            </a>
            <a href="https://www.irctc.co.in/nget/train-search"
              target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Lora', serif", fontSize: '0.75rem', color: '#D4A843', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              {t('book_train')}
            </a>
          </div>
        </div>
        <div style={{ borderLeft: '2px solid rgba(212,168,67,0.5)', paddingLeft: '0.85rem' }}>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '0.72rem', color: 'var(--sand-text)', opacity: 0.6, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
            {t('bbs_station')}
          </p>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '0.88rem', color: 'var(--sand-text)', lineHeight: 1.6 }}>
            {t('cab_from_airport')}<br/>
            📍 P-1, Jaydev Vihar, Nandankanan Rd
          </p>
        </div>
      </div>
    </div>
  );
}

function AccommodationCard() {
  const { t } = useLanguage();
  return (
    <div>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: 'var(--sand-text)', marginBottom: '0.8rem' }}>
        {t('accommodation_label')}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        <div style={{ borderLeft: '2px solid rgba(212,168,67,0.5)', paddingLeft: '0.85rem' }}>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '0.88rem', color: 'var(--sand-text)', lineHeight: 1.7, opacity: 0.85 }}>
            {t('accommodation_text')}
          </p>
        </div>
        <div style={{ borderLeft: '2px solid rgba(212,168,67,0.5)', paddingLeft: '0.85rem' }}>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '0.72rem', color: 'var(--sand-text)', opacity: 0.6, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
            {t('parking_label')}
          </p>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '0.88rem', color: 'var(--sand-text)', lineHeight: 1.6, opacity: 0.85 }}>
            {t('parking_text')}
          </p>
        </div>
      </div>
    </div>
  );
}

function DressCard() {
  const { t } = useLanguage();
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: 'var(--sand-text)', marginBottom: '0.8rem' }}>
        {t('dress_heading')}
      </p>
      <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginBottom: '0.9rem' }}>
        {[t('dress_traditional'), t('dress_semiformal')].map(tag => (
          <span key={tag} style={{
            fontFamily: "'Lora', serif", fontSize: '0.75rem',
            padding: '0.3rem 0.85rem',
            border: '1px solid rgba(212,168,67,0.55)',
            color: '#D4A843', borderRadius: '20px', letterSpacing: '0.08em',
          }}>{tag}</span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '0.7rem' }}>
        {[['#C4572A','Saffron'],['#D4A843','Gold'],['#8B2240','Burgundy']].map(([color, name]) => (
          <div key={color} style={{ textAlign: 'center' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: color, margin: '0 auto 0.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}/>
            <span style={{ fontFamily: "'Lora', serif", fontSize: '0.6rem', color: 'var(--sand-text)', opacity: 0.6 }}>{name}</span>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.82rem', color: 'var(--sand-text)', opacity: 0.75, lineHeight: 1.6 }}>
        {t('dress_traditional_desc')}
      </p>
    </div>
  );
}

export default function ThingsToKnow() {
  const { t } = useLanguage();
  const { weather } = useWeather({
    lat: ENGAGEMENT.VENUE_LAT,
    lng: ENGAGEMENT.VENUE_LNG,
    apiKey: GOOGLE_API.WEATHER_API_KEY,
  });

  const cards = [
    { id: 'weather',       content: <WeatherCard weather={weather} /> },
    { id: 'reach',         content: <ReachCard /> },
    { id: 'dress',         content: <DressCard /> },
    { id: 'accommodation', content: <AccommodationCard /> },
  ];

  return (
    <section style={{
      background: 'var(--sand)',
      padding: 'clamp(3rem, 8vw, 5rem) 1.5rem',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            color: 'var(--sand-text)', textAlign: 'center',
            letterSpacing: '0.04em', marginBottom: '0.6rem',
          }}>{t('things_heading')}</h2>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem', marginTop: '2.5rem',
        }}>
          {cards.map(({ id, content }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              style={{
                background: 'rgba(255,248,240,0.8)',
                border: '1px solid rgba(58,32,16,0.25)',
                borderRadius: '10px',
                padding: '1.5rem 1.25rem',
              }}
            >
              {content}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
