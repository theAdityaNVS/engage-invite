import { useId } from 'react';

/**
 * Subtle tiled lotus-mandala texture for section backgrounds.
 * Sits behind content (zIndex 0, pointer-events none). Recolor per zone via `color`.
 *
 * Host <section> must be position: relative; overflow: hidden, and its content
 * wrapper should be position: relative; zIndex: 1 so text stays above the texture.
 */
export default function MandalaPattern({
  color = 'var(--gold)',
  opacity = 0.05,
  size = 260,
  style = {},
}) {
  // useId is SSR-safe; strip colons so it's valid inside url(#...)
  const uid = `mandala-${useId().replace(/:/g, '')}`;
  const c = size / 2;

  const ring = (count, radius, rx, ry, op) =>
    Array.from({ length: count }, (_, i) => {
      const deg = (360 / count) * i;
      const a = (deg * Math.PI) / 180;
      const x = parseFloat((c + radius * Math.cos(a)).toFixed(4));
      const y = parseFloat((c + radius * Math.sin(a)).toFixed(4));
      return (
        <ellipse
          key={`${count}-${i}`}
          cx={x}
          cy={y}
          rx={rx}
          ry={ry}
          transform={`rotate(${deg} ${x} ${y})`}
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity={op}
        />
      );
    });

  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity,
        ...style,
      }}
    >
      <defs>
        <pattern id={uid} width={size} height={size} patternUnits="userSpaceOnUse">
          {/* concentric guide circles */}
          <circle cx={c} cy={c} r={c * 0.5} fill="none" stroke={color} strokeWidth="1" opacity="0.45" />
          <circle cx={c} cy={c} r={c * 0.62} fill="none" stroke={color} strokeWidth="0.6" opacity="0.3" />
          {/* outer lotus ring */}
          {ring(16, c * 0.44, 4, 11, 0.6)}
          {/* mid ring */}
          {ring(12, c * 0.28, 3, 8, 0.7)}
          {/* inner ring */}
          {ring(8, c * 0.14, 2.5, 6, 0.8)}
          {/* heart */}
          <circle cx={c} cy={c} r="3" fill={color} opacity="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${uid})`} />
    </svg>
  );
}
