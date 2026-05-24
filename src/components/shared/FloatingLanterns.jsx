import { useMemo } from 'react';

// Pseudo-random generator for consistent server/client rendering
const seed = (i, offset) => ((i * 137 + offset * 31) % 100) / 100;

export default function FloatingLanterns({ count = 20 }) {
  const sparks = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const isWarm = seed(i, 7) > 0.4;
      return {
        id: i,
        left: `${2 + seed(i, 0) * 96}%`,
        duration: 12 + seed(i, 3) * 15,
        delay: -(seed(i, 4) * 20),
        opacity: 0.3 + seed(i, 5) * 0.6, // Soft random opacity
        scale: 0.4 + seed(i, 6) * 1.5,
        // Divine spark colors: Deep gold/amber vs soft bright yellow
        color: isWarm ? 'rgba(255, 160, 40, 0.85)' : 'rgba(255, 230, 140, 0.8)',
        blur: 2 + seed(i, 8) * 8, // Varying degrees of bokeh blur
      };
    }), [count]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {sparks.map((spark) => (
        <div
          key={spark.id}
          style={{
            position: 'absolute',
            bottom: '-15vh',
            left: spark.left,
            width: 14 * spark.scale,
            height: 14 * spark.scale,
            borderRadius: '50%',
            background: spark.color,
            boxShadow: `0 0 ${20 * spark.scale}px ${6 * spark.scale}px ${spark.color.replace('0.85', '0.4').replace('0.8', '0.4')}`,
            filter: `blur(${spark.blur}px)`,
            opacity: spark.opacity,
            animation: `lanternFloat ${spark.duration}s ${spark.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
