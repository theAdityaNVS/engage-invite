import { useMemo } from 'react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import CountdownTimer from '@/components/shared/CountdownTimer';
import FloatingLanterns from '@/components/shared/FloatingLanterns';
import MandalaPattern from '@/components/shared/MandalaPattern';
import SectionHeader from '@/components/shared/SectionHeader';
import { ENGAGEMENT, COUPLE } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

const seed = (i, o) => ((i * 137 + o * 31) % 100) / 100;

function TwinklingStars({ count = 18 }) {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      top:  `${3 + seed(i, 0) * 90}%`,
      left: `${2 + seed(i, 1) * 96}%`,
      size: 2 + seed(i, 2) * 3,
      duration: 2 + seed(i, 3) * 3,
      delay: seed(i, 4) * 4,
    })), [count]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: '#FFF8F0',
            animation: `starTwinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function CountdownSection() {
  const { t } = useLanguage();

  return (
    <section style={{
      background: 'var(--navy)',
      padding: 'clamp(4rem, 10vw, 6rem) 1.5rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <MandalaPattern color="var(--gold)" opacity={0.08} />
      <TwinklingStars count={18} />
      <FloatingLanterns count={12} />

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <ScrollReveal>
          <SectionHeader
            eyebrow={t('countdown_script')}
            title={t('countdown_heading')}
            eyebrowType="cursive"
            theme="navy"
            style={{ marginBottom: '3rem' }}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <CountdownTimer targetISO={ENGAGEMENT.COUNTDOWN_ISO} />
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '3rem auto 2rem',
            maxWidth: '360px',
            gap: '1rem',
            opacity: 0.8,
          }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.4))' }} />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--gold)', filter: 'drop-shadow(0 0 4px rgba(212, 168, 67, 0.4))' }}>
              <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" fill="currentColor" />
              <circle cx="12" cy="12" r="3" fill="#FFF8F0" />
            </svg>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(212,168,67,0.4))' }} />
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.015)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(212, 168, 67, 0.14)',
            borderRadius: '16px',
            padding: '2rem 2.2rem',
            position: 'relative',
            maxWidth: '600px',
            margin: '0 auto',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
          }}>
            {/* Fine line inner ornaments */}
            <div style={{ position: 'absolute', top: 10, left: 10, width: 14, height: 14, borderTop: '1px solid rgba(212, 168, 67, 0.35)', borderLeft: '1px solid rgba(212, 168, 67, 0.35)' }} />
            <div style={{ position: 'absolute', top: 10, right: 10, width: 14, height: 14, borderTop: '1px solid rgba(212, 168, 67, 0.35)', borderRight: '1px solid rgba(212, 168, 67, 0.35)' }} />
            <div style={{ position: 'absolute', bottom: 10, left: 10, width: 14, height: 14, borderBottom: '1px solid rgba(212, 168, 67, 0.35)', borderLeft: '1px solid rgba(212, 168, 67, 0.35)' }} />
            <div style={{ position: 'absolute', bottom: 10, right: 10, width: 14, height: 14, borderBottom: '1px solid rgba(212, 168, 67, 0.35)', borderRight: '1px solid rgba(212, 168, 67, 0.35)' }} />

            <p style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: 'clamp(0.92rem, 2.2vw, 1.05rem)',
              color: 'rgba(255, 248, 240, 0.8)',
              lineHeight: 1.8,
              maxWidth: 520,
              margin: '0 auto',
            }}>
              "{t('countdown_message')}"
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
