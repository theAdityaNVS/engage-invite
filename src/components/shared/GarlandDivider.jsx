/* Watercolor-feel marigold — multiple overlapping petal rings at varying opacity */
function Marigold({ x, y, r, color }) {
  const outerN = 12;
  const innerN = 8;
  return (
    <g>
      {/* Soft ambient glow */}
      <circle cx={x} cy={y} r={r * 1.5} fill={color} opacity="0.07" />

      {/* Outer petal ring */}
      {Array.from({ length: outerN }, (_, i) => {
        const a = (i * (360 / outerN)) * Math.PI / 180;
        const px = parseFloat((x + r * 0.62 * Math.cos(a)).toFixed(4));
        const py = parseFloat((y + r * 0.62 * Math.sin(a)).toFixed(4));
        const rxVal = parseFloat((r * 0.27).toFixed(4));
        const ryVal = parseFloat((r * 0.52).toFixed(4));
        const rotAngle = parseFloat((i * (360 / outerN)).toFixed(4));
        return (
          <ellipse key={i}
            cx={px} cy={py}
            rx={rxVal} ry={ryVal}
            transform={`rotate(${rotAngle} ${px} ${py})`}
            fill={color}
            opacity="0.72"
          />
        );
      })}

      {/* Second petal ring — offset for depth */}
      {Array.from({ length: outerN }, (_, i) => {
        const a = (i * (360 / outerN) + 15) * Math.PI / 180;
        const px = parseFloat((x + r * 0.5 * Math.cos(a)).toFixed(4));
        const py = parseFloat((y + r * 0.5 * Math.sin(a)).toFixed(4));
        const rxVal = parseFloat((r * 0.2).toFixed(4));
        const ryVal = parseFloat((r * 0.4).toFixed(4));
        const rotAngle = parseFloat((i * (360 / outerN) + 15).toFixed(4));
        return (
          <ellipse key={i}
            cx={px} cy={py}
            rx={rxVal} ry={ryVal}
            transform={`rotate(${rotAngle} ${px} ${py})`}
            fill={color}
            opacity="0.55"
          />
        );
      })}

      {/* Inner petal ring */}
      {Array.from({ length: innerN }, (_, i) => {
        const a = (i * 45 + 22) * Math.PI / 180;
        const px = parseFloat((x + r * 0.28 * Math.cos(a)).toFixed(4));
        const py = parseFloat((y + r * 0.28 * Math.sin(a)).toFixed(4));
        const rxVal = parseFloat((r * 0.17).toFixed(4));
        const ryVal = parseFloat((r * 0.3).toFixed(4));
        const rotAngle = parseFloat((i * 45 + 22).toFixed(4));
        return (
          <ellipse key={i}
            cx={px} cy={py}
            rx={rxVal} ry={ryVal}
            transform={`rotate(${rotAngle} ${px} ${py})`}
            fill={color}
            opacity="0.82"
          />
        );
      })}

      {/* Center disc */}
      <circle cx={x} cy={y} r={r * 0.22} fill="#C4572A" opacity="0.88" />
      <circle cx={x} cy={y} r={r * 0.1} fill="#8B3018" opacity="1" />
    </g>
  );
}

/* Leaf pair at a point along the vine */
function Leaf({ x, y, angle }) {
  return (
    <g>
      <ellipse
        cx={x - 7} cy={y - 5}
        rx="5" ry="13"
        transform={`rotate(${angle - 42} ${x - 7} ${y - 5})`}
        fill="#4A7A30"
        opacity="0.72"
      />
      <ellipse
        cx={x + 7} cy={y - 5}
        rx="5" ry="13"
        transform={`rotate(${-angle + 42} ${x + 7} ${y - 5})`}
        fill="#5A8A3A"
        opacity="0.6"
      />
    </g>
  );
}

export default function GarlandDivider({ fromColor, toColor }) {
  return (
    <div style={{ position: 'relative', height: 108, overflow: 'hidden' }}>
      {/* Color blocks forming the section transition */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '52%',
        background: fromColor || 'var(--saffron)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '48%',
        background: toColor || 'var(--burgundy)',
      }} />

      {/* Garland SVG — sits across the color boundary */}
      <svg
        viewBox="0 0 1200 108"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', width: '100%', height: '108px', top: 0, left: 0 }}
        aria-hidden="true"
      >
        {/* Main vine — catenary-style bezier */}
        <path
          d="M -10,26 C 80,20 180,38 300,58 C 380,70 460,82 600,88 C 740,82 820,70 900,58 C 1020,38 1120,20 1210,26"
          stroke="#4A6A28"
          strokeWidth="2.8"
          fill="none"
          opacity="0.65"
        />

        {/* Leaves along vine */}
        {[
          [85,  24, -22],
          [175, 34,  18],
          [265, 50, -18],
          [365, 66,  22],
          [450, 79, -14],
          [510, 85,  10],
          [600, 88,   0],
          [690, 85, -10],
          [750, 79,  14],
          [835, 66, -22],
          [935, 50,  18],
          [1025,34, -18],
          [1115,24,  22],
        ].map(([x, y, angle], i) => (
          <Leaf key={i} x={x} y={y} angle={angle} />
        ))}

        {/* Primary marigolds — larger, gold and saffron alternating */}
        {[
          [0,   26, 26, '#D4A843'],
          [200, 46, 24, '#C4572A'],
          [400, 78, 28, '#D4A843'],
          [600, 88, 30, '#C4572A'],
          [800, 78, 28, '#D4A843'],
          [1000,46, 24, '#C4572A'],
          [1200,26, 26, '#D4A843'],
        ].map(([x, y, r, color], i) => (
          <Marigold key={i} x={x} y={y} r={r} color={color} />
        ))}

        {/* Secondary accent flowers — smaller */}
        {[
          [100, 30, 15, '#EFC040'],
          [300, 60, 17, '#D9782A'],
          [500, 85, 15, '#EFC040'],
          [700, 85, 17, '#D9782A'],
          [900, 60, 15, '#EFC040'],
          [1100,30, 17, '#D9782A'],
        ].map(([x, y, r, color], i) => (
          <Marigold key={`s${i}`} x={x} y={y} r={r} color={color} />
        ))}
      </svg>
    </div>
  );
}
