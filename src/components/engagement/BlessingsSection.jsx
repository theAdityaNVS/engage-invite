import { Fragment, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import MandalaPattern from '@/components/shared/MandalaPattern';
import { FAMILIES, COUPLE, TRANSLATIONS } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';
import { PremiumDoubleBorderFrame } from '@/components/shared/EventCard';



function GaneshaSVG() {
  return (
    <svg viewBox="0 0 140 190" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '108px', height: '152px', animation: 'ganeshaPulse 3s ease-in-out infinite' }}
      aria-label="Lord Ganesha"
    >
      {/* Monochromatic Gold Architecture */}
      <ellipse cx="70" cy="150" rx="45" ry="25" fill="rgba(212,168,67,0.1)" />

      {/* Body */}
      <ellipse cx="70" cy="128" rx="40" ry="50" fill="rgba(212,168,67,0.3)" />
      <ellipse cx="70" cy="122" rx="34" ry="44" fill="rgba(212,168,67,0.5)" />
      <ellipse cx="70" cy="118" rx="28" ry="38" fill="#D4A843" opacity="0.7" />

      {/* Dhoti - gold gradient feel */}
      <path d="M38 150 Q40 168 70 172 Q100 168 102 150Z" fill="#D4A843" opacity="0.4"/>
      <path d="M42 150 Q44 164 70 168 Q96 164 98 150Z" fill="#D4A843" opacity="0.5"/>

      {/* Head */}
      <ellipse cx="70" cy="72" rx="36" ry="32" fill="rgba(212,168,67,0.4)" />
      <ellipse cx="70" cy="68" rx="30" ry="28" fill="#D4A843" opacity="0.75" />

      {/* Ears */}
      <ellipse cx="28" cy="70" rx="18" ry="24" fill="rgba(212,168,67,0.5)" />
      <ellipse cx="28" cy="70" rx="13" ry="18" fill="rgba(212,168,67,0.8)" />
      <ellipse cx="112" cy="70" rx="18" ry="24" fill="rgba(212,168,67,0.5)" />
      <ellipse cx="112" cy="70" rx="13" ry="18" fill="rgba(212,168,67,0.8)" />

      {/* Mukut (Crown) */}
      <path d="M42 48 Q48 30 70 24 Q92 30 98 48Z" fill="rgba(212,168,67,0.6)" />
      <path d="M48 46 Q54 32 70 27 Q86 32 92 46Z" fill="#D4A843" />
      <circle cx="70" cy="26" r="5" fill="#F0D68A" />
      <circle cx="55" cy="34" r="3" fill="rgba(240,214,138,0.8)" />
      <circle cx="85" cy="34" r="3" fill="rgba(240,214,138,0.8)" />
      <path d="M48 46 Q50 36 70 32 Q90 36 92 46" stroke="#F0D68A" strokeWidth="1.5" fill="none"/>

      {/* Eyes */}
      <ellipse cx="58" cy="65" rx="7" ry="6" fill="rgba(20,5,10,0.5)" />
      <ellipse cx="82" cy="65" rx="7" ry="6" fill="rgba(20,5,10,0.5)" />
      <circle cx="60" cy="64" r="2.5" fill="#FFF8F0" opacity="0.9" />
      <circle cx="84" cy="64" r="2.5" fill="#FFF8F0" opacity="0.9" />

      {/* Trunk */}
      <path d="M62 78 Q50 92 46 108 Q44 120 52 122 Q58 122 58 115" stroke="#D4A843" strokeWidth="5" strokeLinecap="round" fill="none"/>
      <path d="M62 78 Q50 92 46 108 Q44 120 52 122 Q58 122 58 115" stroke="#F0D68A" strokeWidth="2" strokeLinecap="round" fill="none"/>

      {/* Tilak */}
      <ellipse cx="70" cy="57" rx="5" ry="4" fill="rgba(240,214,138,0.9)"/>
      <line x1="70" y1="53" x2="70" y2="50" stroke="#FFF8F0" strokeWidth="1.5"/>

      {/* Upper left arm — ankush */}
      <path d="M36 100 Q22 88 18 72" stroke="#D4A843" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="20" cy="73" r="9" fill="#F0D68A" stroke="#D4A843" strokeWidth="1.5"/>

      {/* Upper right arm — lotus (changed to golden lotus) */}
      <path d="M104 100 Q118 88 122 72" stroke="#D4A843" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="126" cy="68" r="10" fill="rgba(212,168,67,0.5)"/>
      {Array.from({length:6},(_,i)=>{
        const a=(i*60)*Math.PI/180;
        const cx=parseFloat((126+10*Math.cos(a)).toFixed(4));
        const cy=parseFloat((68+10*Math.sin(a)).toFixed(4));
        const rot=i*60;
        return <ellipse key={i} cx={cx} cy={cy} rx="4" ry="9" transform={`rotate(${rot} ${cx} ${cy})`} fill="rgba(240,214,138,0.7)"/>;
      })}

      {/* Lower right arm — modak */}
      <path d="M102 125 Q114 132 118 140" stroke="#D4A843" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <ellipse cx="121" cy="146" rx="10" ry="12" fill="#F0D68A" />
      <path d="M114 140 Q121 134 128 140" stroke="#D4A843" strokeWidth="1.5" fill="none"/>

      {/* Lower left arm — abhaya mudra */}
      <path d="M38 125 Q26 132 22 140" stroke="#D4A843" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <ellipse cx="19" cy="143" rx="10" ry="8" fill="#F0D68A" opacity="0.85"/>
      {[-6,-2,2,6].map((dx,i)=>(
        <line key={i} x1={19+dx} y1="139" x2={19+dx} y2="150" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round"/>
      ))}
    </svg>
  );
}

function DiyaIcon({ style }) {
  return (
    <svg viewBox="0 0 32 32" style={{ width: 18, height: 18, ...style }} aria-hidden="true">
      <ellipse cx="16" cy="8" rx="3" ry="6" fill="#FFD037" style={{ animation: 'diyaFlicker 1.8s ease-in-out infinite' }} />
      <ellipse cx="16" cy="9" rx="2" ry="4" fill="#FF8C00" style={{ animation: 'diyaFlicker 1.8s 0.2s ease-in-out infinite' }} />
      <path d="M8 20 Q8 28 16 28 Q24 28 24 20 L22 16 L10 16Z" fill="#C0654A" />
      <path d="M10 18 Q10 26 16 26 Q22 26 22 18Z" fill="#A8451E" opacity="0.6" />
      <line x1="16" y1="14" x2="16" y2="16" stroke="#4A2806" strokeWidth="1.5" />
    </svg>
  );
}

function GroomsFamilySVG() {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '64px', height: '64px' }}
      aria-label="Groom's Family Icon"
    >
      <circle cx="80" cy="80" r="76" stroke="rgba(212,168,67,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="80" cy="80" r="70" stroke="rgba(212,168,67,0.3)" strokeWidth="1" />
      <circle cx="80" cy="80" r="64" fill="rgba(212,168,67,0.06)" stroke="rgba(212,168,67,0.15)" strokeWidth="1" />
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 22.5) * Math.PI / 180;
        const x1 = parseFloat((80 + 64 * Math.cos(angle)).toFixed(4));
        const y1 = parseFloat((80 + 64 * Math.sin(angle)).toFixed(4));
        const x2 = parseFloat((80 + 70 * Math.cos(angle)).toFixed(4));
        const y2 = parseFloat((80 + 70 * Math.sin(angle)).toFixed(4));
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4A843" strokeWidth="1" opacity="0.35" />
        );
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 + 22.5) * Math.PI / 180;
        const cx = parseFloat((80 + 73 * Math.cos(angle)).toFixed(4));
        const cy = parseFloat((80 + 73 * Math.sin(angle)).toFixed(4));
        return (
          <circle key={i} cx={cx} cy={cy} r="1.5" fill="#F0D68A" opacity="0.7" />
        );
      })}
      {/* Kalash (purna kumbha) motif */}
      {/* Mango leaves fanning from neck */}
      <path d="M80 52 Q68 44 62 48 Q68 54 80 55Z" fill="rgba(34,100,55,0.75)" />
      <path d="M80 52 Q74 40 80 37 Q86 40 80 52Z" fill="rgba(34,100,55,0.85)" />
      <path d="M80 52 Q92 44 98 48 Q92 54 80 55Z" fill="rgba(34,100,55,0.75)" />
      {/* Coconut on top */}
      <circle cx="80" cy="46" r="8" fill="#C4572A" opacity="0.85" />
      <circle cx="80" cy="44" r="5.5" fill="#D4A843" opacity="0.7" />
      {/* Neck of kalash */}
      <rect x="73" y="55" width="14" height="7" rx="2" fill="#D4A843" opacity="0.9" />
      {/* Pot body */}
      <ellipse cx="80" cy="88" rx="24" ry="26" fill="rgba(196,87,42,0.55)" stroke="#D4A843" strokeWidth="1.5" />
      <ellipse cx="80" cy="84" rx="18" ry="20" fill="rgba(212,168,67,0.25)" />
      {/* Decorative band on pot */}
      <path d="M57 82 Q80 76 103 82" stroke="#F0D68A" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M59 88 Q80 82 101 88" stroke="#F0D68A" strokeWidth="1" fill="none" opacity="0.6" />
      {/* Base of kalash */}
      <ellipse cx="80" cy="113" rx="16" ry="4" fill="#D4A843" opacity="0.7" />
    </svg>
  );
}

function BridesFamilySVG() {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '64px', height: '64px' }}
      aria-label="Bride's Family Icon"
    >
      <circle cx="80" cy="80" r="76" stroke="rgba(212,168,67,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="80" cy="80" r="70" stroke="rgba(212,168,67,0.3)" strokeWidth="1" />
      <circle cx="80" cy="80" r="64" fill="rgba(212,168,67,0.06)" stroke="rgba(212,168,67,0.15)" strokeWidth="1" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const x = parseFloat((80 + 67 * Math.cos(angle)).toFixed(4));
        const y = parseFloat((80 + 67 * Math.sin(angle)).toFixed(4));
        return (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#D4A843" opacity="0.5" />
        );
      })}
      <path d="M45 120 Q80 25 115 120" stroke="rgba(212,168,67,0.25)" strokeWidth="1.5" fill="none" />
      {/* Kalash (purna kumbha) motif */}
      {/* Mango leaves fanning from neck */}
      <path d="M80 52 Q68 44 62 48 Q68 54 80 55Z" fill="rgba(34,100,55,0.75)" />
      <path d="M80 52 Q74 40 80 37 Q86 40 80 52Z" fill="rgba(34,100,55,0.85)" />
      <path d="M80 52 Q92 44 98 48 Q92 54 80 55Z" fill="rgba(34,100,55,0.75)" />
      {/* Coconut on top */}
      <circle cx="80" cy="46" r="8" fill="rgba(139,34,64,0.8)" opacity="0.85" />
      <circle cx="80" cy="44" r="5.5" fill="#D4A843" opacity="0.7" />
      {/* Neck of kalash */}
      <rect x="73" y="55" width="14" height="7" rx="2" fill="#D4A843" opacity="0.9" />
      {/* Pot body */}
      <ellipse cx="80" cy="88" rx="24" ry="26" fill="rgba(139,34,64,0.45)" stroke="#D4A843" strokeWidth="1.5" />
      <ellipse cx="80" cy="84" rx="18" ry="20" fill="rgba(212,168,67,0.25)" />
      {/* Decorative band on pot */}
      <path d="M57 82 Q80 76 103 82" stroke="#F0D68A" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M59 88 Q80 82 101 88" stroke="#F0D68A" strokeWidth="1" fill="none" opacity="0.6" />
      {/* Base of kalash */}
      <ellipse cx="80" cy="113" rx="16" ry="4" fill="#D4A843" opacity="0.7" />
    </svg>
  );
}

function SiblingPill({ t, className, style }) {
  return (
    <div className={className} style={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', maxWidth: '280px', marginBottom: '0.8rem' }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.3))' }} />
        <span style={{ color: '#D4A843', fontSize: '0.85rem' }}>✦</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(212,168,67,0.3))' }} />
      </div>
      <div style={{
        background: 'rgba(20, 5, 10, 0.2)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(212, 168, 67, 0.2)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.02)',
        borderRadius: '30px',
        padding: '0.6rem 2rem',
        display: 'inline-flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.8rem',
      }}>
        {FAMILIES.GROOM_SIBLING && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(245, 236, 200, 0.7)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {t('sibling_label')}:
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--saffron-text)', fontWeight: '600' }}>
              {FAMILIES.GROOM_SIBLING}
            </span>
          </div>
        )}
        {FAMILIES.GROOM_SIBLING && FAMILIES.BRIDE_SIBLING && (
          <span style={{ color: 'rgba(212, 168, 67, 0.4)', fontSize: '0.8rem' }}>•</span>
        )}
        {FAMILIES.BRIDE_SIBLING && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(245, 236, 200, 0.7)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {t('sibling_label')}:
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--saffron-text)', fontWeight: '600' }}>
              {FAMILIES.BRIDE_SIBLING}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BlessingsSection({ side = 'groom' }) {
  const { t, lang } = useLanguage();
  const names = TRANSLATIONS.NAMES[lang] || TRANSLATIONS.NAMES.en;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const groomCard = {
    labelKey: 'groom_parents_label',
    names: FAMILIES.GROOM_PARENTS,
    delay: 0,
    gotra: FAMILIES.GROOM_GOTRA,
    nakshatra: FAMILIES.GROOM_NAKSHATRA,
    location: 'Visakhapatnam',
    icon: <GroomsFamilySVG />,
  };
  const brideCard = {
    labelKey: 'bride_parents_label',
    names: FAMILIES.BRIDE_PARENTS,
    delay: 0.12,
    gotra: FAMILIES.BRIDE_GOTRA,
    nakshatra: FAMILIES.BRIDE_NAKSHATRA,
    location: 'Sunabeda',
    icon: <BridesFamilySVG />,
  };
  const cards = [groomCard, brideCard];
  const ordered = side === 'bride' ? [...cards].reverse() : cards;

  return (
    <section style={{
      background: 'linear-gradient(180deg, #D4A843 0%, rgba(196,87,42,0.95) 15%, var(--saffron) 40%, var(--saffron) 100%)',
      padding: 'clamp(3rem, 8vw, 5rem) 1.5rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      borderTopLeftRadius: 'clamp(24px, 5vw, 40px)',
      borderTopRightRadius: 'clamp(24px, 5vw, 40px)',
      marginTop: 'clamp(-24px, -4vw, -40px)',
      zIndex: 10,
      boxShadow: '0 -12px 30px rgba(0,0,0,0.15)',
    }}>

      <MandalaPattern color="var(--gold-light)" opacity={0.22} />

      <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* 1. Invocation Block (Fades in together) */}
        <ScrollReveal delay={0}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <GaneshaSVG />
          </div>

          <p style={{
            fontFamily: "'Noto Serif Devanagari', serif",
            fontSize: 'clamp(1.4rem, 4.5vw, 2rem)',
            color: 'var(--saffron-text)',
            lineHeight: 1.3,
            marginBottom: '0.5rem',
          }}>
            {t('mantra')}
          </p>

          <p style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 3vw, 1.2rem)',
            color: 'var(--saffron-text)',
            marginBottom: '1rem',
            opacity: 0.85,
          }}>
            {t('family_blessings')}
          </p>
        </ScrollReveal>

        {/* Shubham Karoti Shloka Block */}
        <ScrollReveal delay={0.08}>
          <div style={{ margin: '1.5rem auto 2rem', maxWidth: '600px', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', justifyContent: 'center', marginBottom: '0.8rem' }}>
              <DiyaIcon />
              <div style={{ height: '1px', width: '50px', background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.5))' }} />
              <span style={{ color: '#D4A843', fontSize: '0.8rem' }}>✦</span>
              <div style={{ height: '1px', width: '50px', background: 'linear-gradient(to left, transparent, rgba(212,168,67,0.5))' }} />
              <DiyaIcon />
            </div>

            <p style={{
              fontFamily: "'Noto Serif Devanagari', serif",
              fontSize: 'clamp(1rem, 3.2vw, 1.25rem)',
              color: 'var(--saffron-text)',
              lineHeight: 1.8,
              marginBottom: '0.3rem',
              letterSpacing: '0.02em',
            }}>
              शुभं करोति कल्याणम् आरोग्यं धनसंपदाम् ।
            </p>
            <p style={{
              fontFamily: "'Noto Serif Devanagari', serif",
              fontSize: 'clamp(1rem, 3.2vw, 1.25rem)',
              color: 'var(--saffron-text)',
              lineHeight: 1.8,
              marginBottom: '0.6rem',
              letterSpacing: '0.02em',
            }}>
              शत्रुबुद्धिविनाशाय दीपज्योतिर्नमोस्तुते ॥
            </p>
            
            <p style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2.4vw, 1.05rem)',
              color: 'rgba(245,236,200,0.85)',
              lineHeight: 1.6,
              maxWidth: '480px',
              margin: '0 auto',
            }}>
              {t('shubham_shloka_meaning')}
            </p>
          </div>
        </ScrollReveal>

        {/* 2. Family Block (Cards reveal independently with stagger on desktop) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem auto', maxWidth: '400px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #D4A843)' }} />
          <span style={{ color: '#D4A843', fontSize: '1.2rem' }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #D4A843)' }} />
        </div>


        <div style={{
          display: 'flex',
          gap: '1.5rem',
          maxWidth: 620,
          margin: '0 auto',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {ordered.map(({ labelKey, names, delay, gotra, nakshatra, location, icon }, idx) => (<Fragment key={labelKey}>
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 12 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: isMobile ? '-6%' : '-15%' }}
              transition={{ delay: isMobile ? 0 : delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: '0 24px 56px rgba(0, 0, 0, 0.35), inset 0 0 45px rgba(212, 168, 67, 0.25)' }}
              className="event-card-hover"
              style={{
                flex: '1 1 260px',
                minWidth: 240,
                maxWidth: 290,
                position: 'relative',
                background: 'linear-gradient(180deg, rgba(30, 8, 12, 0.55) 0%, rgba(20, 5, 10, 0.4) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '24px',
                overflow: 'visible',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.25), inset 0 0 35px rgba(212, 168, 67, 0.15)',
                padding: '2.5rem 1.8rem 2.2rem',
                textAlign: 'center',
                minHeight: 380,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                border: '1px solid rgba(212, 168, 67, 0.25)',
                willChange: 'transform, opacity',
              }}
            >
                <PremiumDoubleBorderFrame />
                <div className="gold-foil-shimmer-container">
                  <div className="gold-foil-shimmer" />
                </div>
                <div style={{
                  marginBottom: '0.8rem',
                  position: 'relative',
                  zIndex: 3,
                  background: 'rgba(212, 168, 67, 0.05)',
                  border: '1.5px solid rgba(212, 168, 67, 0.35)',
                  borderRadius: '50%',
                  padding: '0.6rem',
                  boxShadow: '0 8px 24px rgba(212, 168, 67, 0.12)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {icon}
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  color: 'rgba(245, 236, 200, 0.65)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '0.1rem',
                  zIndex: 2,
                }}>{location}</p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  color: '#D4A843',
                  fontWeight: '600',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '0.6rem',
                  zIndex: 2,
                }}>{t(labelKey)}</p>
                <div style={{
                  height: 1,
                  width: '60px',
                  margin: '0 auto 0.8rem',
                  background: 'linear-gradient(to right, transparent, rgba(212, 168, 67, 0.5), transparent)',
                  zIndex: 2,
                }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', zIndex: 2, flexGrow: 1, justifyContent: 'center' }}>
                  {names.split(' & ').map((name, i) => (
                    <p key={i} style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.05rem, 2.8vw, 1.25rem)',
                      color: 'var(--saffron-text)',
                      fontWeight: '600',
                      lineHeight: 1.35,
                    }}>{name}</p>
                  ))}
                </div>
                {(gotra || nakshatra) && (
                  <div style={{
                    marginTop: '1rem',
                    display: 'flex',
                    gap: '0.6rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    zIndex: 2,
                    borderTop: '1px solid rgba(212, 168, 67, 0.1)',
                    paddingTop: '0.8rem',
                    width: '100%',
                  }}>
                    {gotra && (
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(245,236,200,0.75)', letterSpacing: '0.12em' }}>
                        {t('gotra_label')}: {gotra}
                      </span>
                    )}
                    {gotra && nakshatra && (
                      <span style={{ color: 'rgba(212, 168, 67, 0.4)', fontSize: '0.82rem' }}>•</span>
                    )}
                    {nakshatra && (
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(245,236,200,0.75)', letterSpacing: '0.12em' }}>
                        {t('nakshatra_label')}: {nakshatra}
                      </span>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Inline sibling pill: only on groom side, only between card 0 and card 1, only on mobile */}
              {side === 'groom' && idx === 0 && (FAMILIES.GROOM_SIBLING || FAMILIES.BRIDE_SIBLING) && (
                <SiblingPill className="sibling-pill-inline" t={t} />
              )}
            </Fragment>))}
          </div>

        {/* Sibling pill below both cards — hidden on mobile for groom side (shown inline between cards instead) */}
        {(FAMILIES.GROOM_SIBLING || FAMILIES.BRIDE_SIBLING) && (
          <ScrollReveal delay={0.2}>
            <SiblingPill className={side === 'groom' ? 'sibling-pill-block' : 'sibling-pill-always'} t={t} style={{ marginTop: '2.5rem' }} />
          </ScrollReveal>
        )}
        <ScrollReveal delay={0.3}>
          <div style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              color: 'rgba(245,236,200,0.7)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: 'clamp(2rem, 5vw, 3rem)',
            }}>
              {t('invite_intro')}
            </p>

            <p style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(3.5rem, 9vw, 5.5rem)',
              color: '#D4A843',
              lineHeight: 1.1,
              marginBottom: '0.5rem',
              textShadow: '0 2px 12px rgba(212, 168, 67, 0.25)',
            }}>
              {names.groom}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', margin: '0.5rem 0' }}>
              <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.5))' }} />
              <p style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                color: 'var(--saffron-text)',
                opacity: 0.8,
              }}>
                &amp;
              </p>
              <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(212,168,67,0.5))' }} />
            </div>

            <p style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(3.5rem, 9vw, 5.5rem)',
              color: '#D4A843',
              lineHeight: 1.1,
              marginBottom: 'clamp(2rem, 5vw, 3rem)',
              textShadow: '0 2px 12px rgba(212, 168, 67, 0.25)',
            }}>
              {names.bride}
            </p>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
