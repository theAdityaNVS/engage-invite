function KolamMotif({ cx, cy, r = 18 }) {
  const dots = Array.from({length:8}, (_, i) => {
    const a = (i * 45) * Math.PI / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });
  const diag = Array.from({length:4}, (_, i) => {
    const a = (i * 90 + 45) * Math.PI / 180;
    return { x: cx + r * 0.7 * Math.cos(a), y: cy + r * 0.7 * Math.sin(a) };
  });

  return (
    <g>
      {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="2.5" fill="#D4A843" opacity="0.55"/>)}
      {diag.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="2" fill="#D4A843" opacity="0.4"/>)}
      {dots.map((d, i) => {
        const next = dots[(i + 1) % 8];
        const mx = (d.x + next.x) / 2;
        const my = (d.y + next.y) / 2;
        const dx = mx - cx, dy = my - cy;
        const len = Math.sqrt(dx*dx+dy*dy);
        const ctrl = { x: cx + dx/len*(r*0.3), y: cy + dy/len*(r*0.3) };
        return (
          <path key={i}
            d={`M${d.x} ${d.y} Q${ctrl.x} ${ctrl.y} ${next.x} ${next.y}`}
            stroke="#D4A843" strokeWidth="0.8" fill="none" opacity="0.35"
          />
        );
      })}
      <circle cx={cx} cy={cy} r="3" fill="#D4A843" opacity="0.6"/>
    </g>
  );
}

export default function KolamDivider({ fromColor, toColor }) {
  const motifs = [60, 185, 310, 435, 560, 685, 810, 935, 1060];
  const y = 30;

  return (
    <div style={{ position: 'relative', height: 60, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: fromColor || 'var(--sand)' }}/>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: toColor || 'var(--navy)' }}/>
      <svg viewBox="0 0 1200 60" preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', width: '100%', height: '60px', top: 0, left: 0 }}
        aria-hidden="true"
      >
        <line x1="20" y1={y} x2="1180" y2={y} stroke="rgba(212,168,67,0.15)" strokeWidth="0.8"/>
        {motifs.map((cx, i) => <KolamMotif key={i} cx={cx} cy={y} r={18}/>)}
        {[120,245,370,495,620,745,870,995].map((cx, i) => (
          <circle key={i} cx={cx} cy={y} r="2" fill="#D4A843" opacity="0.3"/>
        ))}
      </svg>
    </div>
  );
}
