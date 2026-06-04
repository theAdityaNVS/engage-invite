import { useMemo } from 'react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import CountdownTimer from '@/components/shared/CountdownTimer';
import FloatingLanterns from '@/components/shared/FloatingLanterns';
import MandalaPattern from '@/components/shared/MandalaPattern';
import SectionHeader from '@/components/shared/SectionHeader';
import { ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';
import TirupatiGopuramSVG from './TirupatiGopuramSVG';

// Pseudo-random generator for consistent server/client rendering
const seed = (i, o) => ((i * 137 + o * 31) % 100) / 100;

/**
 * SOUTH INDIAN TEMPLE SVG GENERATION PROMPT:
 * 
 * "High-fidelity flat vector illustration of a grand South Indian Gopuram (Dravidian temple tower).
 * Detailed symmetrical architectural tiers, clean geometric linework, stylized golden-yellow highlights
 * on a transparent background. Flanked by ornate brass standing oil lamps (Kuthu Vilakkus) with warm glowing flames
 * at the base. Designed as a clean vector graphic suitable for SVG code, luxury wedding theme, minimal and elegant."
 */

function HangingGarlands() {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '95px',
        pointerEvents: 'none',
        zIndex: 3,
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="marigold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFAE34" />
          <stop offset="100%" stopColor="#D95A1E" />
        </linearGradient>
        <linearGradient id="jasmine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EAE6DF" />
        </linearGradient>
      </defs>

      {/* Drapes (Festoons) - 4 loops across 1200px */}
      {[0, 300, 600, 900].map((startX, i) => {
        const flowers = [];
        const count = 18;
        for (let j = 0; j <= count; j++) {
          const t = j / count;
          // Quadratic Bezier interpolation
          const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * (startX + 150) + t * t * (startX + 300);
          const y = (1 - t) * (1 - t) * 0 + 2 * (1 - t) * t * 45 + t * t * 0;
          flowers.push({ x, y, type: j % 2 === 0 ? 'marigold' : 'jasmine' });
        }

        return (
          <g key={i}>
            <path
              d={`M ${startX} 0 Q ${startX + 150} 45 ${startX + 300} 0`}
              fill="none"
              stroke="rgba(212, 168, 67, 0.2)"
              strokeWidth="0.8"
            />
            {flowers.map((f, idx) => (
              f.type === 'marigold' ? (
                <circle key={idx} cx={f.x} cy={f.y} r="4.5" fill="url(#marigold)" />
              ) : (
                <ellipse key={idx} cx={f.x} cy={f.y} rx="2.2" ry="4" fill="url(#jasmine)" transform={`rotate(15, ${f.x}, ${f.y})`} />
              )
            ))}
          </g>
        );
      })}

      {/* Hanging vertical strings at the joint points */}
      {[0, 300, 600, 900, 1200].map((x, i) => {
        const length = 45 + (i % 2 === 0 ? 25 : 10);
        const flowers = [];
        const count = Math.floor(length / 8);
        for (let j = 0; j < count; j++) {
          const y = 6 + j * 8;
          flowers.push({ x, y, type: j % 3 === 0 ? 'marigold' : 'jasmine' });
        }

        return (
          <g key={i}>
            <line x1={x} y1="0" x2={x} y2={length} stroke="rgba(212, 168, 67, 0.2)" strokeWidth="0.8" />
            {flowers.map((f, idx) => (
              f.type === 'marigold' ? (
                <circle key={idx} cx={f.x} cy={f.y} r="4.5" fill="url(#marigold)" />
              ) : (
                <ellipse key={idx} cx={f.x} cy={f.y} rx="2.2" ry="4.5" fill="url(#jasmine)" />
              )
            ))}
            {/* Swaying golden bell at the bottom of each string */}
            <g transform={`translate(${x}, ${length + 4})`} style={{ animation: 'bellSway 4s ease-in-out infinite', transformOrigin: 'top center' }}>
              <path d="M-4 0 L-2 -5 L2 -5 L4 0 Z" fill="#D4A843" />
              <circle cx="0" cy="1" r="1.5" fill="#FFEBA7" />
            </g>
          </g>
        );
      })}
    </svg>
  );
}

function UnifiedStarfield({ count = 38 }) {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const isStardust = seed(i, 8) > 0.6;
      return {
        id: i,
        type: isStardust ? 'stardust' : 'circle',
        x: seed(i, 0) * 100,
        y: seed(i, 1) * 88, // Avoid placing stars behind the bottom gopuram
        size: isStardust ? 0.8 + seed(i, 2) * 0.8 : 1.2 + seed(i, 2) * 1.5,
        delay: seed(i, 3) * 5,
        duration: 2.0 + seed(i, 4) * 3.0,
      };
    }), [count]);

  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
      {stars.map((s) => (
        <circle
          key={s.id}
          cx={`${s.x}%`}
          cy={`${s.y}%`}
          r={s.size}
          fill="#FFF8F0"
          opacity={s.type === 'stardust' ? 0.35 : 0.85}
          style={{
            animation: `softStarTwinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
            transformOrigin: 'center',
          }}
        />
      ))}
    </svg>
  );
}

function LuminousMoon() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '60px',
        right: '8%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <svg viewBox="0 0 120 120" style={{ width: 75, height: 75, filter: 'drop-shadow(0 0 16px rgba(212, 168, 67, 0.45))' }}>
        <defs>
          <radialGradient id="fullMoonGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#FFEBA7" />
            <stop offset="60%" stopColor="#F5D061" opacity="0.9" />
            <stop offset="85%" stopColor="#D4A843" opacity="0.3" />
            <stop offset="100%" stopColor="#D4A843" opacity="0" />
          </radialGradient>
          <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFEBA7" />
            <stop offset="50%" stopColor="#D4A843" />
            <stop offset="100%" stopColor="#9C731A" />
          </linearGradient>
        </defs>

        {/* Outer Halo Rings */}
        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(212, 168, 67, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(212, 168, 67, 0.22)" strokeWidth="1.5" />
        
        {/* Ray Lines (Prabhavali style rays) */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          const x1 = 60 + Math.cos((angle * Math.PI) / 180) * 36;
          const y1 = 60 + Math.sin((angle * Math.PI) / 180) * 36;
          const x2 = 60 + Math.cos((angle * Math.PI) / 180) * 44;
          const y2 = 60 + Math.sin((angle * Math.PI) / 180) * 44;
          return (
            <line
              key={i}
              x1={x1.toFixed(3)}
              y1={y1.toFixed(3)}
              x2={x2.toFixed(3)}
              y2={y2.toFixed(3)}
              stroke="url(#goldMetallic)"
              strokeWidth="1.2"
              opacity="0.6"
            />
          );
        })}

        {/* Inner Ring with tiny dots representing a traditional medallion */}
        <circle cx="60" cy="60" r="34" fill="none" stroke="url(#goldMetallic)" strokeWidth="1" />
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const x = 60 + Math.cos((angle * Math.PI) / 180) * 34;
          const y = 60 + Math.sin((angle * Math.PI) / 180) * 34;
          return (
            <circle
              key={i}
              cx={x.toFixed(3)}
              cy={y.toFixed(3)}
              r="1.5"
              fill="#FFEBA7"
              opacity="0.8"
            />
          );
        })}

        {/* Glowing Full Moon Sphere */}
        <circle cx="60" cy="60" r="28" fill="url(#fullMoonGlow)" />
        <circle cx="60" cy="60" r="28" fill="none" stroke="url(#goldMetallic)" strokeWidth="0.8" opacity="0.4" />
      </svg>
    </div>
  );
}

export default function CountdownSection() {
  const { t } = useLanguage();

  return (
    <section style={{
      background: 'linear-gradient(to bottom, #0d1527 0%, #070b14 50%, #03050a 100%)',
      paddingTop: 'clamp(5rem, 12vw, 7rem)',
      paddingBottom: '280px', // Increased padding to accommodate the longer Gopuram tower
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '90vh',
    }}>
      {/* Localized Styles for Opacity star twinkles & non-rotating vertical stretch flames */}
      <style>{`
        @keyframes softStarTwinkle {
          0%, 100% { opacity: 0.22; }
          50%      { opacity: 0.9; }
        }
        @keyframes normalFire {
          0%, 100% { transform: scaleY(1) scaleX(1) translateY(0); opacity: 0.95; }
          50%      { transform: scaleY(1.12) scaleX(0.93) translateY(-1.5px); opacity: 1; }
        }
        .custom-flame {
          animation: normalFire 1.6s ease-in-out infinite;
          transform-origin: bottom center;
        }
      `}</style>

      {/* Hanging floral welcome garlands */}
      <HangingGarlands />

      <MandalaPattern color="var(--gold)" opacity={0.06} />
      <UnifiedStarfield count={38} />
      <LuminousMoon />
      <FloatingLanterns count={16} />

      {/* Backlight glow behind Gopuram */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '900px',
        height: '420px',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(212, 168, 67, 0.22) 0%, rgba(212, 168, 67, 0.06) 60%, transparent 80%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Countdown Content */}
      <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
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

      {/* Temple Gopuram & Standing Lamps */}
      <TirupatiGopuramSVG style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxHeight: '620px', // Adjusted height to showcase the longer, vertical tower tiers
        pointerEvents: 'none',
        zIndex: 1,
        maskImage: 'linear-gradient(to top, black 0%, black 75%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to top, black 0%, black 75%, transparent 100%)',
      }} />
    </section>
  );
}
