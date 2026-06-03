import { motion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import MandalaPattern from '@/components/shared/MandalaPattern';
import SectionHeader from '@/components/shared/SectionHeader';
import { ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';
import { useWeather } from '@/hooks/useWeather';
import { PremiumDoubleBorderFrame } from '@/components/shared/EventCard';

const WeatherAnimations = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes rotate-sun {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes drift-cloud {
      0%, 100% { transform: translateY(0) translateX(0); }
      50% { transform: translateY(-1.5px) translateX(1.5px); }
    }
    @keyframes rain-fall-anim {
      0% { stroke-dashoffset: 0; opacity: 0; }
      20% { opacity: 1; }
      100% { stroke-dashoffset: -12; opacity: 0; }
    }
    @keyframes fly-plane {
      0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
      50% { transform: translateY(-2px) rotate(3deg) scale(1.05); }
    }
    @keyframes chug-train {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(1.5px); }
    }
    @keyframes wiggle-compass {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-8deg); }
      75% { transform: rotate(8deg); }
    }
    .anim-sun-rays {
      transform-origin: 24px 24px;
      animation: rotate-sun 16s linear infinite;
    }
    .anim-cloud {
      animation: drift-cloud 5s ease-in-out infinite;
    }
    .anim-rain-drops line {
      stroke-dasharray: 4, 8;
      animation: rain-fall-anim 1.2s linear infinite;
    }
    .anim-plane {
      animation: fly-plane 3s ease-in-out infinite;
      transform-origin: center;
    }
    .anim-train {
      animation: chug-train 1.5s ease-in-out infinite;
      transform-origin: center;
    }
    .anim-compass {
      animation: wiggle-compass 4s ease-in-out infinite;
      transform-origin: center;
    }
    .travel-subcard {
      transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .travel-subcard:hover {
      transform: translateY(-2px);
      background: rgba(255, 255, 255, 0.8) !important;
      border-color: rgba(212, 168, 67, 0.6) !important;
      box-shadow: 0 6px 16px rgba(212, 168, 67, 0.12) !important;
    }
  `}} />
);

function SunIcon() {
  return (
    <svg viewBox="0 0 48 48" style={{ width: 36, height: 36 }} aria-hidden="true">
      <circle cx="24" cy="24" r="8" fill="#FFD037" style={{ animation: 'ganeshaPulse 3s ease-in-out infinite' }}/>
      <g className="anim-sun-rays">
        {Array.from({length:8},(_,i)=>{
          const a=(i*45)*Math.PI/180;
          const x1 = parseFloat((24+12*Math.cos(a)).toFixed(4));
          const y1 = parseFloat((24+12*Math.sin(a)).toFixed(4));
          const x2 = parseFloat((24+17*Math.cos(a)).toFixed(4));
          const y2 = parseFloat((24+17*Math.sin(a)).toFixed(4));
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFD037" strokeWidth="2.5" strokeLinecap="round"/>;
        })}
      </g>
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 48 48" style={{ width: 36, height: 36 }} aria-hidden="true">
      <circle cx="18" cy="20" r="6" fill="#FFD037" opacity="0.8"/>
      <g className="anim-cloud">
        <path d="M18,34 C14.7,34 12,31.3 12,28 C12,25.2 13.9,22.9 16.6,22.2 C17.7,18.7 20.9,16 24.8,16 C29.1,16 32.7,19.2 33.2,23.3 C35.9,23.8 38,26.1 38,29 C38,31.8 35.8,34 33,34 Z" 
          fill="rgba(215,225,235,0.95)" stroke="rgba(58,32,16,0.15)" strokeWidth="1" />
      </g>
    </svg>
  );
}

function RainIcon() {
  return (
    <svg viewBox="0 0 48 48" style={{ width: 36, height: 36 }} aria-hidden="true">
      <g className="anim-cloud">
        <path d="M16,30 C13.2,30 11,27.8 11,25 C11,22.7 12.6,20.8 14.8,20.2 C15.8,17.2 18.5,15 21.8,15 C25.5,15 28.6,17.7 29.0,21.1 C31.3,21.5 33,23.5 33,26 C33,28.8 30.8,30 28.5,30 Z" 
          fill="rgba(160,180,200,0.95)" stroke="rgba(58,32,16,0.15)" strokeWidth="1" />
      </g>
      <g className="anim-rain-drops">
        <line x1="16" y1="33" x2="14" y2="39" stroke="#6090C0" strokeWidth="2" strokeLinecap="round"/>
        <line x1="22" y1="34" x2="20" y2="40" stroke="#6090C0" strokeWidth="2" strokeLinecap="round"/>
        <line x1="28" y1="33" x2="26" y2="39" stroke="#6090C0" strokeWidth="2" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

function JhumarIcon() {
  return (
    <svg viewBox="0 0 100 70" style={{ width: 70, height: 49, margin: '0 auto 0.75rem', display: 'block' }} aria-hidden="true">
      <line x1="50" y1="0" x2="50" y2="18" stroke="#D4A843" strokeWidth="1.5" strokeDasharray="1, 2" />
      <path d="M46 18 C46 14, 54 14, 54 18 Z" fill="#D4A843" />
      <path d="M30 32 Q50 42 70 32" fill="none" stroke="#D4A843" strokeWidth="1.5" />
      <path d="M20 42 Q50 56 80 42" fill="none" stroke="#D4A843" strokeWidth="1" strokeDasharray="1, 1.5" />
      
      <circle cx="50" cy="37" r="3" fill="#D4A843" />
      <line x1="50" y1="37" x2="50" y2="56" stroke="#D4A843" strokeWidth="1.5" />
      <path d="M47 56 L53 56 L50 62 Z" fill="#D4A843" />
      
      <circle cx="30" cy="32" r="2" fill="#D4A843" />
      <line x1="30" y1="32" x2="30" y2="48" stroke="#D4A843" strokeWidth="1.2" />
      <circle cx="30" cy="50" r="2" fill="#D4A843" />
      
      <circle cx="70" cy="32" r="2" fill="#D4A843" />
      <line x1="70" y1="32" x2="70" y2="48" stroke="#D4A843" strokeWidth="1.2" />
      <circle cx="70" cy="50" r="2" fill="#D4A843" />
      
      <circle cx="20" cy="42" r="1.5" fill="#D4A843" />
      <line x1="20" y1="42" x2="20" y2="54" stroke="#D4A843" strokeWidth="1" />
      <path d="M18 54 Q20 58 22 54 Z" fill="#D4A843" />
      
      <circle cx="80" cy="42" r="1.5" fill="#D4A843" />
      <line x1="80" y1="42" x2="80" y2="54" stroke="#D4A843" strokeWidth="1" />
      <path d="M78 54 Q80 58 82 54 Z" fill="#D4A843" />
    </svg>
  );
}

function AirplaneIcon() {
  return (
    <svg className="anim-plane" viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: '#D4A843', flexShrink: 0 }} aria-hidden="true">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5L21 16z"/>
    </svg>
  );
}

function TrainIcon() {
  return (
    <svg className="anim-train" viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: '#D4A843', flexShrink: 0 }} aria-hidden="true">
      <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zm0 2c3.71 0 6 .42 6 2H6c0-1.58 2.29-2 6-2zm5 11H7V8h10v7zm-1.5-5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg className="anim-compass" viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: 'none', stroke: '#D4A843', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', flexShrink: 0 }} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#D4A843" opacity="0.3" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function WeatherCard({ weather }) {
  const { t } = useLanguage();
  const baseTemp = weather ? weather.temp : 34;
  const baseCondition = weather ? weather.condition?.toLowerCase() : 'clear';

  const slots = [
    { time: '9 AM',  label: 'Arrival',      temp: baseTemp - 2, cond: 'clear' },
    { time: '10 AM', label: 'Puja',         temp: baseTemp - 1, cond: 'clear', highlight: true },
    { time: '11 AM', label: 'Gathering',    temp: baseTemp,     cond: 'cloudy' },
    { time: '12 PM', label: 'Rings',        temp: baseTemp + 1, cond: 'clear', highlight: true },
    { time: '1 PM',  label: 'Lunch',        temp: baseTemp + 1, cond: 'cloudy', highlight: true },
    { time: '2 PM',  label: 'Celebration',  temp: baseTemp,     cond: 'rain' },
    { time: '3 PM',  label: 'Departure',    temp: baseTemp - 1, cond: 'cloudy' },
  ];

  const getSlotIcon = (cond) => {
    let finalCond = cond;
    if (baseCondition.includes('rain') || baseCondition.includes('drizzle')) {
      if (cond === 'cloudy') finalCond = 'rain';
    }
    if (finalCond === 'rain') return <RainIcon />;
    if (finalCond === 'cloudy') return <CloudIcon />;
    return <SunIcon />;
  };

  return (
    <div style={{ width: '100%' }}>
      <WeatherAnimations />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
        <SunIcon />
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#5A1423', margin: 0, fontWeight: 600, letterSpacing: '0.04em' }}>
            {t('weather_label')}
          </h4>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#2D1810', opacity: 0.75, margin: '2px 0 0' }}>
            {weather ? `${weather.temp}°C · ${weather.description}` : ENGAGEMENT.WEATHER_ADVISORY}
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: '0.25rem' }}>
        <div style={{ display: 'flex', gap: '0.65rem', minWidth: 'max-content', padding: '0.25rem 0.5rem', justifyContent: 'center', width: '100%' }}>
          {slots.map((slot) => (
            <div key={slot.time} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem',
              padding: '0.75rem 0.85rem',
              background: slot.highlight ? 'rgba(212,168,67,0.18)' : 'rgba(255,248,240,0.06)',
              border: slot.highlight ? '1px solid rgba(212,168,67,0.45)' : '1px solid rgba(212,168,67,0.15)',
              borderRadius: '8px',
              minWidth: 72,
              boxShadow: slot.highlight ? '0 2px 8px rgba(212,168,67,0.1)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#2D1810', fontWeight: 600 }}>
                {slot.time}
              </span>
              <div style={{ height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {getSlotIcon(slot.cond)}
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#2D1810', fontWeight: 700 }}>
                {slot.temp}°C
              </span>
              {slot.label && (
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.7rem',
                  color: slot.highlight ? '#D4A843' : 'rgba(45,24,16,0.6)',
                  letterSpacing: '0.04em',
                  fontWeight: slot.highlight ? 600 : 500,
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
  
  const transitHubs = [
    { key: 'airport', icon: <AirplaneIcon />, label: t('airport_label'), details: t('airport_details') },
    { key: 'railway', icon: <TrainIcon />, label: t('railway_label'), details: t('railway_details') },
    { key: 'vizag',   icon: <CompassIcon />, label: t('vizag_label'), details: t('vizag_details') }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <div>
        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#5A1423', marginBottom: '1.25rem', fontWeight: 600, letterSpacing: '0.04em', textAlign: 'center' }}>
          {t('reach_label')}
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {transitHubs.map((hub) => (
            <div key={hub.key} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.9rem',
              padding: '0.85rem 1rem',
              background: 'rgba(255, 255, 255, 0.35)',
              border: '1px solid rgba(212, 168, 67, 0.22)',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(58, 32, 16, 0.03)',
              textAlign: 'left',
            }}
              className="travel-subcard"
            >
              <div style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'rgba(212, 168, 67, 0.06)',
                border: '1px solid rgba(212, 168, 67, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {hub.icon}
              </div>
              <div>
                <h5 style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#2D1810', fontWeight: 'bold', margin: '0 0 0.15rem' }}>
                  {hub.label}
                </h5>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#2D1810', opacity: 0.8, margin: 0, lineHeight: 1.4 }}>
                  {hub.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DressCard() {
  const { t } = useLanguage();
  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <div>
        <JhumarIcon />
        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#5A1423', marginBottom: '1.25rem', fontWeight: 600, letterSpacing: '0.04em' }}>
          {t('dress_heading')}
        </h4>
        <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
          {[t('dress_traditional'), t('dress_pastels')].map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--font-body)', fontSize: '0.78rem',
              padding: '0.35rem 0.95rem',
              border: '1px solid rgba(212, 168, 67, 0.55)',
              background: 'rgba(212, 168, 67, 0.06)',
              color: '#D4A843', borderRadius: '20px', letterSpacing: '0.05em',
              fontWeight: 600
            }}>{tag}</span>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
          {[
            ['#FAD5C0', 'Peach'],
            ['#D3ECE1', 'Mint'],
            ['#E6E6FA', 'Lavender'],
            ['#FDFBF7', 'Ivory'],
            ['#E5A93C', 'Saffron']
          ].map(([color, name]) => (
            <div key={color} style={{ textAlign: 'center' }}>
              <div style={{ 
                width: 32, 
                height: 32, 
                borderRadius: '50%', 
                background: color, 
                margin: '0 auto 0.35rem', 
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1), 0 2px 6px rgba(58,32,16,0.12)',
                border: color === '#FDFBF7' ? '1px solid rgba(58, 32, 16, 0.15)' : 'none'
              }}/>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#2D1810', opacity: 0.72, fontWeight: 500 }}>{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        padding: '0.85rem', 
        background: 'rgba(212,168,67,0.06)', 
        borderRadius: '8px', 
        border: '1px dashed rgba(212,168,67,0.3)',
        marginTop: '0.5rem'
      }}>
        <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '0.85rem', color: '#2D1810', opacity: 0.85, lineHeight: 1.5, margin: 0 }}>
          {t('dress_traditional_desc')}
        </p>
      </div>
    </div>
  );
}

export default function ThingsToKnow() {
  const { t } = useLanguage();
  const { weather } = useWeather({
    lat: ENGAGEMENT.VENUE_LAT,
    lng: ENGAGEMENT.VENUE_LNG,
  });

  return (
    <section style={{
      background: 'var(--sand)',
      padding: 'clamp(3rem, 8vw, 5rem) 1.5rem',
      position: 'relative', overflow: 'hidden',
    }}>
      <MandalaPattern color="var(--saffron-dark)" opacity={0.1} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <SectionHeader
            title={t('things_heading')}
            subtitle={t('things_subheading')}
            theme="sand"
            style={{ marginBottom: '2.5rem' }}
          />
        </ScrollReveal>

        <div className="things-grid">
          <style dangerouslySetInnerHTML={{ __html: `
            .things-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 1.75rem;
              margin-top: 2.5rem;
            }
            @media (min-width: 868px) {
              .things-grid {
                grid-template-columns: repeat(2, 1fr);
              }
              .card-weather {
                grid-column: 1 / -1;
              }
            }
          `}} />

          {/* Weather Card (Full Width on Desktop) */}
          <motion.div
            className="event-card-hover card-weather"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, boxShadow: '0 24px 56px rgba(90, 20, 35, 0.35), inset 0 0 45px rgba(212, 168, 67, 0.18)' }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            style={{
              background: 'linear-gradient(180deg, #FAF6EE 0%, #FAF0D4 100%)',
              border: '1px solid rgba(212, 168, 67, 0.15)',
              borderRadius: '24px',
              padding: '2.5rem 2rem 2.2rem',
              boxShadow: '0 20px 48px rgba(90, 20, 35, 0.24), inset 0 0 35px rgba(212, 168, 67, 0.12)',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            <PremiumDoubleBorderFrame />
            <div className="gold-foil-shimmer-container">
              <div className="gold-foil-shimmer" />
            </div>
            <div style={{ position: 'relative', zIndex: 3, width: '100%' }}>
              <WeatherCard weather={weather} />
            </div>
          </motion.div>

          {/* Travel Card */}
          <motion.div
            className="event-card-hover"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, boxShadow: '0 24px 56px rgba(90, 20, 35, 0.35), inset 0 0 45px rgba(212, 168, 67, 0.18)' }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            style={{
              background: 'linear-gradient(180deg, #FAF6EE 0%, #FAF0D4 100%)',
              border: '1px solid rgba(212, 168, 67, 0.15)',
              borderRadius: '24px',
              padding: '2.5rem 2rem 2.2rem',
              boxShadow: '0 20px 48px rgba(90, 20, 35, 0.24), inset 0 0 35px rgba(212, 168, 67, 0.12)',
              position: 'relative',
              overflow: 'visible',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <PremiumDoubleBorderFrame />
            <div className="gold-foil-shimmer-container">
              <div className="gold-foil-shimmer" />
            </div>
            <div style={{ position: 'relative', zIndex: 3, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyConstraints: 'space-between' }}>
              <ReachCard />
            </div>
          </motion.div>

          {/* Dress Card */}
          <motion.div
            className="event-card-hover"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, boxShadow: '0 24px 56px rgba(90, 20, 35, 0.35), inset 0 0 45px rgba(212, 168, 67, 0.18)' }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            style={{
              background: 'linear-gradient(180deg, #FAF6EE 0%, #FAF0D4 100%)',
              border: '1px solid rgba(212, 168, 67, 0.15)',
              borderRadius: '24px',
              padding: '2.5rem 2rem 2.2rem',
              boxShadow: '0 20px 48px rgba(90, 20, 35, 0.24), inset 0 0 35px rgba(212, 168, 67, 0.12)',
              position: 'relative',
              overflow: 'visible',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <PremiumDoubleBorderFrame />
            <div className="gold-foil-shimmer-container">
              <div className="gold-foil-shimmer" />
            </div>
            <div style={{ position: 'relative', zIndex: 3, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <DressCard />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
