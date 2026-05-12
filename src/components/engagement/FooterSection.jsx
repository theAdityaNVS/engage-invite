import { useMemo } from 'react';
import { COUPLE, ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';
import FloatingLanterns from '@/components/shared/FloatingLanterns';

const seed = (i, o) => ((i * 137 + o * 31) % 100) / 100;

function Starfield({ count = 22 }) {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      cx: `${2 + seed(i, 0) * 96}%`,
      cy: `${2 + seed(i, 1) * 60}%`,
      r: 1 + seed(i, 2) * 2,
      delay: seed(i, 3) * 5,
      duration: 2 + seed(i, 4) * 3,
    })), [count]);

  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      {stars.map((s) => (
        <circle key={s.id} cx={s.cx} cy={s.cy} r={s.r}
          fill="rgba(255,248,240,0.85)"
          style={{ animation: `starTwinkle ${s.duration}s ${s.delay}s ease-in-out infinite` }}
        />
      ))}
    </svg>
  );
}

function FaintTempleSilhouette() {
  return (
    <svg
      viewBox="0 0 900 200"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 'auto',
        maxHeight: 200,
        pointerEvents: 'none',
        maskImage: 'linear-gradient(to top, black 0%, black 50%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to top, black 0%, black 50%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      {/* Central gopuram tier silhouette */}
      {[0,1,2,3,4,5,6,7,8].map((t) => (
        <rect key={t}
          x={380 - t * 18} y={200 - (t + 1) * 20}
          width={140 + t * 36} height={22}
          rx="2"
          fill={`rgba(212,168,67,${0.06 + t * 0.01})`}
        />
      ))}
      {/* Kalasha finial */}
      <ellipse cx="450" cy="12" rx="14" ry="7" fill="rgba(212,168,67,0.12)" />
      <circle  cx="450" cy="6"  r="5"          fill="rgba(212,168,67,0.15)" />

      {/* Side shrines */}
      {[200, 700].map((cx) => (
        <g key={cx}>
          {[0,1,2,3,4].map((t) => (
            <rect key={t}
              x={cx - 30 - t * 8} y={200 - (t + 1) * 16}
              width={60 + t * 16} height={18}
              rx="2"
              fill={`rgba(212,168,67,${0.04 + t * 0.008})`}
            />
          ))}
        </g>
      ))}

      {/* Base platform */}
      <rect x="60" y="186" width="780" height="14" rx="2" fill="rgba(212,168,67,0.08)" />
      <rect x="0"  y="194" width="900" height="6"  fill="rgba(212,168,67,0.05)" />
    </svg>
  );
}

export default function FooterSection() {
  const { t } = useLanguage();

  return (
    <footer style={{
      background: 'var(--navy)',
      textAlign: 'center',
      overflow: 'hidden',
      position: 'relative',
      paddingTop: 'clamp(4rem, 10vw, 6rem)',
      paddingBottom: 0,
      minHeight: 320,
    }}>
      {/* Stars */}
      <Starfield count={22} />

      {/* Floating lanterns — sparser/slower than hero */}
      <FloatingLanterns count={6} />

      {/* Faint temple silhouette at bottom */}
      <FaintTempleSilhouette />

      {/* Footer text */}
      <div style={{
        padding: 'clamp(1.5rem, 4vw, 2.5rem) 1.5rem clamp(3rem, 8vw, 5rem)',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)',
            color: '#D4A843',
            marginBottom: '0.4rem',
          }}>
            {COUPLE.GROOM_NAME} &amp; {COUPLE.BRIDE_NAME}
          </p>
          <p style={{
            fontFamily: "'Lora', serif",
            fontSize: '0.88rem',
            color: 'rgba(240,214,138,0.65)',
            marginBottom: '0.4rem',
            letterSpacing: '0.05em',
          }}>
            {ENGAGEMENT.DATE_DISPLAY} · {ENGAGEMENT.VENUE_CITY}
          </p>
          <p style={{
            fontFamily: "'Lora', serif",
            fontSize: '0.82rem',
            color: 'rgba(245,236,200,0.4)',
            letterSpacing: '0.05em',
            marginBottom: '1.25rem',
          }}>
            {COUPLE.HASHTAG}
          </p>

          <div style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.25), transparent)',
            maxWidth: 260,
            margin: '0 auto 1.25rem',
          }} />

          <p style={{
            fontFamily: "'Lora', serif",
            fontSize: '0.78rem',
            color: 'rgba(245,236,200,0.28)',
          }}>
            {t('made_with_love')}
          </p>
        </div>
      </div>
    </footer>
  );
}
