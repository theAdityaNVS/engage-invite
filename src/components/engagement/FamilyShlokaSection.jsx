import { useMemo } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { COUPLE, FAMILIES } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

function DiyaIcon({ style }) {
  return (
    <svg viewBox="0 0 32 32" style={{ width: 22, height: 22, ...style }} aria-hidden="true">
      <ellipse cx="16" cy="8" rx="3" ry="6" fill="#FFD037" style={{ animation: 'diyaFlicker 1.8s ease-in-out infinite' }} />
      <ellipse cx="16" cy="9" rx="2" ry="4" fill="#FF8C00" style={{ animation: 'diyaFlicker 1.8s 0.2s ease-in-out infinite' }} />
      <path d="M8 20 Q8 28 16 28 Q24 28 24 20 L22 16 L10 16Z" fill="#C0654A" />
      <path d="M10 18 Q10 26 16 26 Q22 26 22 18Z" fill="#A8451E" opacity="0.6" />
      <line x1="16" y1="14" x2="16" y2="16" stroke="#4A2806" strokeWidth="1.5" />
    </svg>
  );
}

function FloatingFloret({ style }) {
  return (
    <div style={{
      position: 'absolute', pointerEvents: 'none',
      animation: 'petalDrift 12s ease-in-out infinite',
      ...style,
    }}>
      <svg viewBox="0 0 20 20" style={{ width: 14, height: 14 }}>
        {Array.from({ length: 6 }, (_, i) => {
          const a = (i * 60) * Math.PI / 180;
          const cx = parseFloat((10 + 6 * Math.cos(a)).toFixed(4));
          const cy = parseFloat((10 + 6 * Math.sin(a)).toFixed(4));
          const rot = i * 60;
          return <ellipse key={i} cx={cx} cy={cy} rx="3" ry="5"
            transform={`rotate(${rot} ${cx} ${cy})`}
            fill="#D4A843" opacity="0.7" />;
        })}
        <circle cx="10" cy="10" r="2.5" fill="#C4572A" />
      </svg>
    </div>
  );
}

function GroomFigure() {
  return (
    <svg viewBox="0 0 60 100" style={{ width: 42, height: 70 }} aria-hidden="true">
      <circle cx="30" cy="18" r="12" fill="rgba(212,168,67,0.8)" />
      <path d="M16 35 L16 72 Q30 78 44 72 L44 35 Q37 30 30 30 Q23 30 16 35Z" fill="rgba(196,87,42,0.75)" />
      <path d="M16 62 L14 90 L30 86 L46 90 L44 62Z" fill="rgba(212,168,67,0.6)" />
      <line x1="16" y1="38" x2="6" y2="56" stroke="rgba(196,87,42,0.7)" strokeWidth="5" strokeLinecap="round" />
      <line x1="44" y1="38" x2="54" y2="56" stroke="rgba(196,87,42,0.7)" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="30" cy="10" rx="14" ry="6" fill="rgba(212,168,67,0.9)" />
    </svg>
  );
}

function BrideFigure() {
  return (
    <svg viewBox="0 0 60 100" style={{ width: 42, height: 70 }} aria-hidden="true">
      <circle cx="30" cy="18" r="12" fill="rgba(212,168,67,0.8)" />
      <path d="M16 35 L14 74 Q30 80 46 74 L46 35 Q39 30 30 30 Q21 30 16 35Z" fill="rgba(139,34,64,0.75)" />
      <path d="M14 50 Q10 55 12 70" stroke="rgba(212,168,67,0.5)" strokeWidth="2" fill="none" />
      <path d="M14 66 L10 92 L30 88 L50 92 L46 66Z" fill="rgba(139,34,64,0.65)" />
      <line x1="16" y1="40" x2="8" y2="56" stroke="rgba(139,34,64,0.7)" strokeWidth="5" strokeLinecap="round" />
      <line x1="44" y1="40" x2="52" y2="56" stroke="rgba(139,34,64,0.7)" strokeWidth="5" strokeLinecap="round" />
      <path d="M16 32 Q30 26 44 32" stroke="rgba(212,168,67,0.6)" strokeWidth="3" fill="none" />
      <circle cx="30" cy="14" r="2.5" fill="#C4572A" />
    </svg>
  );
}

const SEED = (i, o) => ((i * 137 + o * 31) % 100) / 100;

export default function FamilyShlokaSection() {
  const { t } = useLanguage();
  const florets = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${10 + SEED(i, 0) * 80}%`,
      top: `${5 + SEED(i, 1) * 80}%`,
      delay: `${SEED(i, 2) * 8}s`,
      duration: `${8 + SEED(i, 3) * 6}s`,
    }))
    , []);

  const families = [
    {
      side: t('grooms_family'),
      location: 'Visakhapatnam',
      figure: <GroomFigure />,
      names: [
        FAMILIES.GROOM_PARENTS,
        FAMILIES.GROOM_SIBLING || null,
      ].filter(Boolean),
      color: 'rgba(196,87,42,0.15)',
      borderColor: 'rgba(196,87,42,0.35)',
    },
    {
      side: t('brides_family'),
      location: 'Bhubaneswar',
      figure: <BrideFigure />,
      names: [
        FAMILIES.BRIDE_PARENTS,
        FAMILIES.BRIDE_SIBLING || null,
      ].filter(Boolean),
      color: 'rgba(139,34,64,0.15)',
      borderColor: 'rgba(139,34,64,0.35)',
    },
  ];

  return (
    <section style={{
      background: 'var(--sand)',
      padding: 'clamp(3rem, 8vw, 5rem) 1.5rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {florets.map(f => (
        <FloatingFloret key={f.id} style={{ left: f.left, top: f.top, animationDelay: f.delay, animationDuration: f.duration }} />
      ))}

      <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
              <DiyaIcon />
              <div style={{ height: 1, width: 80, background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.6))' }} />
              <DiyaIcon />
              <div style={{ height: 1, width: 80, background: 'linear-gradient(to left, transparent, rgba(212,168,67,0.6))' }} />
              <DiyaIcon />
            </div>
            <p style={{
              fontFamily: "'Noto Serif Devanagari', serif",
              fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              color: 'var(--sand-text)', lineHeight: 1.8, marginBottom: '0.5rem',
            }}>
              शुभं करोति कल्याणम् आरोग्यं धनसंपदाम् ।
            </p>
            <p style={{
              fontFamily: "'Noto Serif Devanagari', serif",
              fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              color: 'var(--sand-text)', lineHeight: 1.8, marginBottom: '0.8rem',
            }}>
              शत्रुबुद्धिविनाशाय दीपज्योतिर्नमोस्तुते ॥
            </p>
            <p style={{
              fontFamily: "'Lora', serif", fontStyle: 'italic',
              fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
              color: 'var(--sand-text)', opacity: 0.65, lineHeight: 1.7,
            }}>
              May this light bring auspiciousness, health, and prosperity;<br />
              may it destroy all ill-will.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', justifyContent: 'center', marginTop: '1.2rem' }}>
              <div style={{ width: 60, height: 1, background: 'rgba(212,168,67,0.4)' }} />
              <span style={{ color: '#D4A843', fontSize: '0.55rem' }}>✦</span>
              <div style={{ width: 60, height: 1, background: 'rgba(212,168,67,0.4)' }} />
            </div>
          </div>
        </ScrollReveal>

        <div style={{ display: 'flex', gap: '1.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {families.map(({ side, location, figure, names, color, borderColor }, i) => (
            <motion.div
              key={side}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              style={{
                flex: '1 1 280px', maxWidth: 340,
                background: color,
                border: `1px solid ${borderColor}`,
                borderRadius: '10px',
                padding: '1.8rem 1.5rem',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <DiyaIcon style={{ position: 'absolute', top: 14, left: 16 }} />
              <DiyaIcon style={{ position: 'absolute', top: 14, right: 16 }} />

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.8rem', marginTop: '0.5rem' }}>
                {figure}
              </div>

              <p style={{
                fontFamily: "'Lora', serif", fontSize: '0.68rem',
                color: 'var(--sand-text)', opacity: 0.55,
                letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.25rem',
              }}>{location}</p>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
                color: 'var(--sand-text)', marginBottom: '0.75rem',
              }}>{side}</p>
              <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${borderColor}, transparent)`, marginBottom: '0.75rem' }} />
              {names.map((n, ni) => (
                <p key={ni} style={{
                  fontFamily: "'Lora', serif",
                  fontSize: 'clamp(0.82rem, 2vw, 0.92rem)',
                  color: 'var(--sand-text)', lineHeight: 1.65, marginBottom: ni < names.length - 1 ? '0.4rem' : 0,
                }}>{n}</p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
