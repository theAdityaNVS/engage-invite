import { motion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import MandalaPattern from '@/components/shared/MandalaPattern';
import { PremiumDoubleBorderFrame } from '@/components/shared/EventCard';
import { ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

function VenueMapIframe() {
  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '320px', 
      borderRadius: '16px', 
      overflow: 'hidden', 
      boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
      border: '1px solid rgba(212,168,67,0.25)',
    }}>
      <iframe
        src="https://maps.google.com/maps?q=Suryansh%20Hotels%20and%20Resorts,%20Jaydev%20Vihar,%20Bhubaneswar&t=&z=16&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        style={{
          border: 0,
          filter: 'invert(90%) hue-rotate(200deg) saturate(120%) brightness(90%) contrast(110%)',
          display: 'block',
        }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map showing Suryansh Hotels and Resorts"
      />
    </div>
  );
}

export default function RouteCTA() {
  const { t } = useLanguage();

  return (
    <section id="section-map" style={{
      background: 'linear-gradient(180deg, #3D0A14 0%, #5A1423 40%, var(--saffron) 100%)',
      padding: 'clamp(3rem, 8vw, 5rem) 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <MandalaPattern color="var(--gold-light)" opacity={0.22} />
      
      <ScrollReveal>
        <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          
          {/* Glassmorphic Venue Card with Premium Double Border */}
          <div style={{
            background: 'linear-gradient(180deg, rgba(30, 8, 12, 0.55) 0%, rgba(20, 5, 10, 0.4) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '2.5rem 1.8rem 2.2rem',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.35), inset 0 0 35px rgba(212, 168, 67, 0.15)',
            border: '1px solid rgba(212, 168, 67, 0.25)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '2.5rem',
          }}>
            <PremiumDoubleBorderFrame />
            
            <p style={{
              fontFamily: "'Lora', serif", fontSize: '0.72rem',
              color: 'rgba(245, 236, 200, 0.65)', letterSpacing: '0.22em',
              textTransform: 'uppercase', marginBottom: '0.4rem',
              position: 'relative', zIndex: 2,
            }}>{t('venue_label')}</p>
            
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)',
              color: '#D4A843', letterSpacing: '0.06em', marginBottom: '0.8rem',
              fontWeight: 400,
              position: 'relative', zIndex: 2,
            }}>{ENGAGEMENT.VENUE_NAME}</h2>
            
            <p style={{
              fontFamily: "'Lora', serif", fontStyle: 'italic',
              fontSize: 'clamp(0.82rem, 2vw, 0.95rem)',
              color: 'var(--saffron-text)', opacity: 0.85, marginBottom: '1.8rem',
              position: 'relative', zIndex: 2,
            }}>
              {ENGAGEMENT.VENUE_ADDRESS}
            </p>

            <div style={{
              height: 1,
              width: '100%',
              background: 'linear-gradient(to right, transparent, rgba(212, 168, 67, 0.25), transparent)',
              margin: '0 auto 1.5rem',
              position: 'relative', zIndex: 2,
            }} />

            {/* Dual venue timeline list */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.8rem',
              justifyContent: 'center',
              textAlign: 'left',
              position: 'relative',
              zIndex: 2,
            }}>
              {/* Puja Location */}
              <div style={{ flex: '1 1 240px', minWidth: 200 }}>
                <p style={{ fontFamily: 'Lora, serif', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--gold-light)', letterSpacing: '0.12em', margin: '0 0 0.25rem', fontWeight: 600 }}>
                  ✦ 10:00 AM · Sacred Rituals
                </p>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: '#FFF8F0', fontWeight: 500, margin: '0 0 0.35rem' }}>
                  Engagement Puja
                </h3>
                <p style={{ fontFamily: 'Lora, serif', fontSize: '0.82rem', color: 'rgba(245,236,200,0.7)', fontStyle: 'italic', lineHeight: 1.45, margin: 0 }}>
                  Ram Mandir (NALCO Temple), Jaydev Vihar, Bhubaneswar
                </p>
              </div>

              {/* Ceremony Location */}
              <div style={{ flex: '1 1 240px', minWidth: 200 }}>
                <p style={{ fontFamily: 'Lora, serif', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--gold-light)', letterSpacing: '0.12em', margin: '0 0 0.25rem', fontWeight: 600 }}>
                  ✦ 11:30 AM Onwards · Main Event
                </p>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: '#FFF8F0', fontWeight: 500, margin: '0 0 0.35rem' }}>
                  Ring Ceremony &amp; Lunch
                </h3>
                <p style={{ fontFamily: 'Lora, serif', fontSize: '0.82rem', color: 'rgba(245,236,200,0.7)', fontStyle: 'italic', lineHeight: 1.45, margin: 0 }}>
                  Suryansh Hotels &amp; Resorts, Jaydev Vihar, Bhubaneswar
                </p>
              </div>
            </div>
          </div>

          {/* The Styled Google Maps Embed Iframe */}
          <VenueMapIframe />

          {/* Navigation CTA Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.6rem' }}>
            <motion.a
              href="https://maps.google.com/?q=Ram+Mandir+NALCO+Temple+Jaydev+Vihar+Bhubaneswar"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(196,87,42,0.15)', borderColor: 'rgba(196,87,42,0.85)' }} 
              whileTap={{ scale: 0.96 }}
              style={{
                display: 'inline-block',
                padding: '0.7rem 1.6rem',
                background: 'rgba(255,248,240,0.06)',
                border: '1.5px solid rgba(196,87,42,0.5)',
                color: '#FFF8F0',
                fontFamily: "'Lora', serif", fontSize: '0.8rem',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                textDecoration: 'none', borderRadius: '4px',
                transition: 'color 0.3s, background-color 0.3s, border-color 0.3s',
              }}
            >
              Route to Puja
            </motion.a>

            <motion.a
              href={ENGAGEMENT.VENUE_MAPS_URL}
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(212,168,67,0.15)', borderColor: 'rgba(212,168,67,0.85)' }} 
              whileTap={{ scale: 0.96 }}
              style={{
                display: 'inline-block',
                padding: '0.7rem 1.6rem',
                background: 'rgba(255,248,240,0.12)',
                border: '1.5px solid rgba(212,168,67,0.6)',
                color: '#D4A843',
                fontFamily: "'Lora', serif", fontSize: '0.8rem',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                textDecoration: 'none', borderRadius: '4px',
                transition: 'color 0.3s, background-color 0.3s, border-color 0.3s',
              }}
            >
              {t('navigate_label')}
            </motion.a>
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
