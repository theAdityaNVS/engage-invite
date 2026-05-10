import { useEffect, useState } from 'react';

const PETAL_SVG = (color = '#D4A843') => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 30" fill="${color}" opacity="0.8">
    <ellipse cx="10" cy="15" rx="6" ry="12" transform="rotate(-15 10 15)"/>
    <ellipse cx="10" cy="15" rx="4" ry="10" fill="${color === '#D4A843' ? '#F0D68A' : '#C44D5E'}" opacity="0.5" transform="rotate(-15 10 15)"/>
  </svg>
`;

const encodeSVG = (svg) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

export default function FloatingPetals({ count = 12 }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const colors = ['#D4A843', '#C44D5E', '#8B1A2B', '#F0D68A'];
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      size: 14 + Math.random() * 16,
      duration: 15 + Math.random() * 12,
      delay: Math.random() * 10,
      driftX: `${(Math.random() - 0.5) * 120}px`,
      driftR: `${180 + Math.random() * 360}deg`,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.5 + Math.random() * 0.5,
    }));
    setPetals(generated);
  }, [count]);

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      pointerEvents: 'none', zIndex: 1,
    }}>
      {petals.map((p) => (
        <img
          key={p.id}
          src={encodeSVG(PETAL_SVG(p.color))}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: p.left,
            top: '-5%',
            width: `${p.size}px`,
            opacity: p.opacity,
            '--drift-x': p.driftX,
            '--drift-r': p.driftR,
            animation: `petalDrift ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}
