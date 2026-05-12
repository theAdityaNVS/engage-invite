function MangoLeaf({ x, y, angle }) {
  return (
    <g transform={`rotate(${angle} ${x} ${y})`}>
      <ellipse cx={x} cy={y} rx="9" ry="22" fill="#2D5A1A" opacity="0.78"/>
      <ellipse cx={x} cy={y} rx="5" ry="17" fill="#3D6E22" opacity="0.55"/>
      <line x1={x} y1={y-20} x2={x} y2={y+20} stroke="#1A3A0E" strokeWidth="0.8" opacity="0.4"/>
    </g>
  );
}

function Bell({ x, y }) {
  return (
    <g style={{ animation: 'bellSway 2.5s ease-in-out infinite', transformOrigin: `${x}px ${y-16}px` }}>
      <path d={`M${x-7} ${y} Q${x-8} ${y+12} ${x} ${y+14} Q${x+8} ${y+12} ${x+7} ${y}`}
        fill="#D4A843" opacity="0.85"/>
      <path d={`M${x-7} ${y} Q${x} ${y-2} ${x+7} ${y}`}
        fill="#D4A843" opacity="0.85"/>
      <ellipse cx={x} cy={y+14} rx="5" ry="2" fill="#C09030" opacity="0.9"/>
      <line x1={x} y1={y+14} x2={x} y2={y+20} stroke="#A07020" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx={x} cy={y+20} r="2" fill="#A07020"/>
      <line x1={x} y1={y-16} x2={x} y2={y} stroke="#8B4020" strokeWidth="1" opacity="0.6"/>
    </g>
  );
}

export default function MangoToranDivider({ fromColor, toColor }) {
  const items = [
    { x: 0,    type: 'leaf',  angle: -5  },
    { x: 80,   type: 'bell'              },
    { x: 140,  type: 'leaf',  angle: 10  },
    { x: 200,  type: 'bell'              },
    { x: 270,  type: 'leaf',  angle: -12 },
    { x: 330,  type: 'bell'              },
    { x: 390,  type: 'leaf',  angle: 8   },
    { x: 450,  type: 'bell'              },
    { x: 520,  type: 'leaf',  angle: -6  },
    { x: 580,  type: 'bell'              },
    { x: 640,  type: 'leaf',  angle: 11  },
    { x: 700,  type: 'bell'              },
    { x: 760,  type: 'leaf',  angle: -9  },
    { x: 820,  type: 'bell'              },
    { x: 880,  type: 'leaf',  angle: 7   },
    { x: 940,  type: 'bell'              },
    { x: 1000, type: 'leaf',  angle: -5  },
    { x: 1060, type: 'bell'              },
    { x: 1120, type: 'leaf',  angle: 10  },
    { x: 1180, type: 'bell'              },
    { x: 1200, type: 'leaf',  angle: -7  },
  ];

  return (
    <div style={{ position: 'relative', height: 80, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: fromColor || 'var(--burgundy)' }}/>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: toColor || 'var(--sand)' }}/>
      <svg viewBox="0 0 1200 80" preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', width: '100%', height: '80px', top: 0, left: 0 }}
        aria-hidden="true"
      >
        <path d="M0 18 Q600 24 1200 18" stroke="#5A2A10" strokeWidth="2" fill="none" opacity="0.6"/>
        {items.map((item, i) => (
          item.type === 'leaf'
            ? <MangoLeaf key={i} x={item.x} y={30} angle={item.angle || 0} />
            : <Bell key={i} x={item.x} y={22} />
        ))}
      </svg>
    </div>
  );
}
