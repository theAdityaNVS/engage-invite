import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import MandalaPattern from '@/components/shared/MandalaPattern';
import { PremiumDoubleBorderFrame } from '@/components/shared/EventCard';
import { ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

// Swaying temple bell component
function SwayingBell({ delay = 0, style = {} }) {
  return (
    <motion.svg
      width="24"
      height="55"
      viewBox="0 0 24 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        originY: 0,
        pointerEvents: 'none',
        ...style
      }}
      animate={{
        rotate: [0, -6, 6, -4, 4, -2, 2, 0],
      }}
      transition={{
        duration: 3.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1.5,
        delay: delay,
      }}
    >
      {/* Hanging Chain */}
      <line x1="12" y1="0" x2="12" y2="30" stroke="#D4A843" strokeWidth="1.2" strokeDasharray="3 2" />
      {/* Tiny chain rings */}
      <circle cx="12" cy="8" r="1.5" fill="none" stroke="#D4A843" strokeWidth="1" />
      <circle cx="12" cy="18" r="1.5" fill="none" stroke="#D4A843" strokeWidth="1" />
      
      {/* Bell cap */}
      <path d="M8 30 C8 30 8 26 12 26 C16 26 16 30 16 30 Z" fill="#D4A843" />
      {/* Bell body */}
      <path d="M7 30 L17 30 L18 40 L6 40 Z" fill="#A8451E" stroke="#D4A843" strokeWidth="1" />
      {/* Bell rim */}
      <rect x="5" y="40" width="14" height="2.5" rx="1.2" fill="#D4A843" />
      {/* Clapper */}
      <circle cx="12" cy="46" r="1.8" fill="#D4A843" />
      <line x1="12" y1="42.5" x2="12" y2="45" stroke="#D4A843" strokeWidth="1.2" />
    </motion.svg>
  );
}

// Mini Journey Map SVG Component using generated assets
function MiniJourneyMap() {
  return (
    <div style={{
      margin: '1.8rem 0 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
      zIndex: 2,
    }}>
      <div style={{ width: '100%', maxWidth: '380px', position: 'relative' }}>
        <svg width="100%" height="75" viewBox="0 0 400 75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="route-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C4572A" />
              <stop offset="50%" stopColor="#D4A843" />
              <stop offset="100%" stopColor="#FAF6EE" />
            </linearGradient>
          </defs>

          {/* Dotted path (Background) - increased opacity for high visibility */}
          <path 
            d="M 50 35 Q 200 10 350 35" 
            stroke="rgba(212, 168, 67, 0.45)" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
          
          {/* Animated flowing dashed path */}
          <path 
            d="M 50 35 Q 200 10 350 35" 
            stroke="url(#route-grad)" 
            strokeWidth="2.5" 
            strokeDasharray="6 6"
            strokeLinecap="round"
            style={{
              animation: 'flowDashes 20s linear infinite',
            }}
          />

          {/* Start node: NALCO Ram Mandir (Temple Spire SVG) */}
          <circle cx="50" cy="35" r="18" fill="#1c050a" stroke="#C4572A" strokeWidth="1.5" />
          <image href="/illustrations/temple-spire.svg" x="26" y="11" width="48" height="48" />

          {/* End node: Suryansh Hotel (Sparkling Ring SVG) */}
          <circle cx="350" cy="35" r="18" fill="#1c050a" stroke="#D4A843" strokeWidth="1.5" />
          <image href="/illustrations/sparkling-ring.svg" x="326" y="11" width="48" height="48" />

          {/* Moving Auto-Rickshaw along the path (High-fidelity vector SVG) */}
          <g>
            <animateMotion 
              dur="8s" 
              repeatCount="indefinite" 
              path="M 50 35 Q 200 10 350 35" 
              rotate="auto"
            />
            {/* Center the vector auto-rickshaw image at (0,0) */}
            <image href="/illustrations/auto-rickshaw.svg" x="-24" y="-18" width="48" height="36" />
          </g>

          <style>{`
            @keyframes flowDashes {
              from {
                stroke-dashoffset: 0;
              }
              to {
                stroke-dashoffset: -120;
              }
            }
          `}</style>
        </svg>
      </div>

      {/* Label and Info */}
      <div style={{
        textAlign: 'center',
        marginTop: '0.4rem',
        fontFamily: "'Lora', serif",
        fontSize: '0.82rem',
        color: '#FAF6EE',
      }}>
        <span style={{ color: '#FAF6EE', fontWeight: 500 }}>NALCO Ram Mandir</span>
        <span style={{ margin: '0 0.5rem', color: 'rgba(212,168,67,0.5)' }}>➔</span>
        <span style={{ 
          background: 'rgba(212,168,67,0.12)', 
          padding: '2px 8px', 
          borderRadius: '12px', 
          border: '1px solid rgba(212,168,67,0.3)',
          color: 'var(--gold-light)',
          fontSize: '0.78rem',
          fontWeight: 600
        }}>
          Just 300m (1-min drive / 3-min walk)
        </span>
        <span style={{ margin: '0 0.5rem', color: 'rgba(212,168,67,0.5)' }}>➔</span>
        <span style={{ color: '#FAF6EE', fontWeight: 500 }}>Suryansh Hotel</span>
      </div>
    </div>
  );
}

function VenueMapIframe() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <div 
      onClick={() => {
        if (!isUnlocked && !showPrompt) {
          setShowPrompt(true);
        }
      }}
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '320px', 
        borderRadius: '16px', 
        overflow: 'hidden', 
        boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
        border: '1px solid rgba(212,168,67,0.25)',
        cursor: !isUnlocked ? 'pointer' : 'default',
      }}
    >
      <iframe
        src="https://maps.google.com/maps?q=Suryansh%20Hotels%20and%20Resorts,%20Jaydev%20Vihar,%20Bhubaneswar&t=&z=16&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        style={{
          border: 0,
          filter: 'invert(90%) hue-rotate(200deg) saturate(120%) brightness(90%) contrast(110%)',
          display: 'block',
          pointerEvents: isUnlocked ? 'auto' : 'none',
        }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map showing Suryansh Hotels and Resorts"
      />

      {/* Subtle indicator badge when locked to help users know it's interactive */}
      {!isUnlocked && !showPrompt && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(30, 8, 12, 0.8)',
          border: '1px solid rgba(212, 168, 67, 0.35)',
          borderRadius: '20px',
          padding: '4px 10px',
          color: 'var(--gold-light)',
          fontSize: '0.7rem',
          fontFamily: "'Lora', serif",
          pointerEvents: 'none',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          zIndex: 4,
        }}>
          <span>📍</span> Map Locked (Tap to Unlock)
        </div>
      )}

      {/* Interactive Unlock Prompt Overlay */}
      {showPrompt && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(30, 8, 12, 0.75)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          textAlign: 'center',
          zIndex: 10,
        }}>
          <h4 style={{
            fontFamily: "'Playfair Display', serif",
            color: 'var(--gold-light)',
            fontSize: '1.05rem',
            margin: '0 0 0.5rem',
          }}>
            Unlock Map Controls?
          </h4>
          <p style={{
            fontFamily: "'Lora', serif",
            color: 'rgba(255, 248, 240, 0.8)',
            fontSize: '0.78rem',
            lineHeight: 1.4,
            maxWidth: '260px',
            margin: '0 0 1.2rem',
          }}>
            Unlock zoom & navigation controls, or keep it locked to avoid page scrolling interference.
          </p>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsUnlocked(true);
                setShowPrompt(false);
              }}
              style={{
                background: 'linear-gradient(135deg, #C4572A, #A8451E)',
                border: 'none',
                borderRadius: '4px',
                color: '#FFF8F0',
                padding: '6px 14px',
                fontSize: '0.75rem',
                fontFamily: "'Lora', serif",
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(196,87,42,0.3)',
              }}
            >
              Unlock Map
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPrompt(false);
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(212, 168, 67, 0.4)',
                borderRadius: '4px',
                color: 'var(--gold-light)',
                padding: '5px 14px',
                fontSize: '0.75rem',
                fontFamily: "'Lora', serif",
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Lock Map Button when Unlocked */}
      {isUnlocked && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsUnlocked(false);
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(30, 8, 12, 0.85)',
            border: '1.2px solid rgba(212, 168, 67, 0.5)',
            borderRadius: '20px',
            padding: '5px 12px',
            color: '#D4A843',
            fontSize: '0.72rem',
            fontFamily: "'Lora', serif",
            cursor: 'pointer',
            zIndex: 6,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(139,34,64,0.85)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(30, 8, 12, 0.85)'; }}
        >
          🔒 Lock Map
        </button>
      )}
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

            {/* Swaying Temple Bells hanging inside the gold border */}
            <SwayingBell delay={0} style={{ position: 'absolute', top: '10px', left: '24px', zIndex: 3 }} />
            <SwayingBell delay={0.8} style={{ position: 'absolute', top: '10px', right: '24px', zIndex: 3 }} />
            
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

            {/* Separator / Journey Connector */}
            <div style={{
              height: 1,
              width: '100%',
              background: 'linear-gradient(to right, transparent, rgba(212, 168, 67, 0.25), transparent)',
              margin: '1.5rem auto 0.5rem',
              position: 'relative',
              zIndex: 2,
            }} />

            {/* Mini Journey Infographic Map */}
            <MiniJourneyMap />

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
