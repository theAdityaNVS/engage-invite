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
            display: 'flex', alignItems: 'center', gap: '1rem',
            margin: '3rem auto 1.5rem',
            maxWidth: '320px',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(212,168,67,0.35)' }} />
            <span style={{ color: '#D4A843', fontSize: '1.2rem' }}>✦</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(212,168,67,0.35)' }} />
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
            color: 'rgba(245,236,200,0.75)',
            lineHeight: 1.75,
            maxWidth: 560,
            margin: '0 auto',
          }}>
            {t('countdown_message')}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
