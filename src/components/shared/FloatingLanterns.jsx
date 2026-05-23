import { useMemo } from 'react';

const seed = (i, offset) => ((i * 137 + offset * 31) % 100) / 100;

export default function FloatingLanterns({ count = 14 }) {
  const lanterns = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left:     `${5 + seed(i, 0) * 90}%`,
      duration: 15 + seed(i, 3) * 13,
      delay:    -(seed(i, 4) * 20),
      opacity:  0.65 + seed(i, 5) * 0.3,
      scale:    0.55 + seed(i, 6) * 0.65,
      // Two warm colour variants: golden-amber vs deeper saffron-orange
      warm:     seed(i, 7) > 0.5,
    })), [count]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {lanterns.map((l) => {
        const gradId   = `lg-${l.id}`;
        const glowId   = `gw-${l.id}`;
        // Ambient halo colours
        const haloRgb  = l.warm ? '255,210,100' : '255,160,60';
        const glowPx   = 24 * l.scale;

        return (
          <div
            key={l.id}
            style={{
              position: 'absolute',
              bottom: '-15vh',
              left: l.left,
              width: 24,
              height: 48,
              transform: `scale(${l.scale})`,
              transformOrigin: 'bottom center',
              '--lantern-opacity': l.opacity,
              animation: `lanternFloat ${l.duration}s ${l.delay}s ease-in-out infinite`,
              // Soft ambient halo around the whole lantern
              filter: `drop-shadow(0 0 ${glowPx}px rgba(${haloRgb},0.55))`,
            }}
          >
            <svg
              viewBox="0 0 30 58"
              width="24"
              height="48"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: 'block', overflow: 'visible' }}
            >
              <defs>
                {/* Radial gradient: bright amber core, darker reddish-orange edges */}
                <radialGradient id={gradId} cx="50%" cy="45%" r="60%" fx="50%" fy="40%">
                  <stop offset="0%"   stopColor={l.warm ? 'rgba(255,210,80,0.98)' : 'rgba(255,175,50,0.98)'} />
                  <stop offset="45%"  stopColor={l.warm ? 'rgba(230,120,20,0.88)' : 'rgba(200,90,15,0.88)'} />
                  <stop offset="80%"  stopColor={l.warm ? 'rgba(180,55,10,0.70)'  : 'rgba(160,40,8,0.70)'} />
                  <stop offset="100%" stopColor="rgba(120,20,5,0.15)" />
                </radialGradient>

                {/* Blur filter for the bottom flame glow ellipse */}
                <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="2.5" />
                </filter>
              </defs>

              {/* ── Hanging string above the lantern ── */}
              <line
                x1="15" y1="0"
                x2="15" y2="6"
                stroke="#5A1A08"
                strokeWidth="0.9"
                strokeLinecap="round"
              />

              {/* ── Top wire ring ── */}
              <ellipse
                cx="15" cy="8"
                rx="8" ry="1.6"
                fill="none"
                stroke="#3D1008"
                strokeWidth="1.2"
              />

              {/* ── Barrel body ── */}
              {/*
                Top opening: x=7 to x=23 at y=8
                Widest point: x=2 to x=28 at y=27
                Bottom opening: x=6 to x=24 at y=44
                Smooth cubic bezier barrel bulge
              */}
              <path
                d="M 7 8 C 2 14 2 20 2 27 C 2 34 3 40 6 44 L 24 44 C 27 40 28 34 28 27 C 28 20 28 14 23 8 Z"
                fill={`url(#${gradId})`}
              />

              {/* ── Subtle vertical highlight stripe (paper sheen) ── */}
              <path
                d="M 12 9 C 10 15 10 21 10 27 C 10 33 10.5 38 12 43"
                fill="none"
                stroke="rgba(255,240,180,0.30)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* ── Bottom wire ring ── */}
              <ellipse
                cx="15" cy="44"
                rx="9" ry="1.8"
                fill="none"
                stroke="#3D1008"
                strokeWidth="1.2"
              />

              {/* ── Bottom flame glow (blurred warm ellipse behind the ring) ── */}
              <ellipse
                cx="15" cy="44"
                rx="7" ry="3"
                fill={l.warm ? 'rgba(255,180,40,0.85)' : 'rgba(255,140,30,0.85)'}
                filter={`url(#${glowId})`}
              />

              {/* ── Hanging tail string below lantern ── */}
              <line
                x1="15" y1="44"
                x2="13" y2="54"
                stroke="#5A1A08"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              <line
                x1="15" y1="44"
                x2="17" y2="54"
                stroke="#5A1A08"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
