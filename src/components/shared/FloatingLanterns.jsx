import { useMemo } from 'react';

const seed = (i, offset) => ((i * 137 + offset * 31) % 100) / 100;

export default function FloatingLanterns({ count = 14 }) {
  const lanterns = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left:     `${5 + seed(i, 0) * 90}%`,
      width:    18 + seed(i, 1) * 20,
      height:   26 + seed(i, 2) * 18,
      duration: 15 + seed(i, 3) * 13,
      delay:    -(seed(i, 4) * 20),
      opacity:  0.65 + seed(i, 5) * 0.3,
      scale:    0.55 + seed(i, 6) * 0.65,
      hue:      seed(i, 7) > 0.5 ? '255,220,180' : '255,190,140',
    })), [count]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {lanterns.map((l) => (
        <div
          key={l.id}
          style={{
            position: 'absolute',
            bottom: '-15vh',
            left: l.left,
            width: l.width,
            height: l.height,
            borderRadius: '50% 50% 45% 45%',
            background: `radial-gradient(ellipse at 40% 35%, rgba(${l.hue},0.95) 0%, rgba(${l.hue},0.6) 50%, rgba(${l.hue},0.1) 100%)`,
            boxShadow: `0 0 ${l.width * 0.8}px rgba(${l.hue},0.5), 0 0 ${l.width * 1.5}px rgba(${l.hue},0.2)`,
            transform: `scale(${l.scale})`,
            '--lantern-opacity': l.opacity,
            animation: `lanternFloat ${l.duration}s ${l.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
