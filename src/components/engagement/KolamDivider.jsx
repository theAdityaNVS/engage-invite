export default function KolamDivider({ flip = false }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem 2rem',
      transform: flip ? 'scaleX(-1)' : undefined,
    }}>
      <svg viewBox="0 0 400 40" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', maxWidth: '500px', height: '40px' }}
        aria-hidden="true"
      >
        {/* Central diamond */}
        <path d="M200 8 L210 20 L200 32 L190 20Z" fill="#D4A843" opacity="0.7"/>
        {/* Inner small diamonds */}
        <path d="M200 12 L206 20 L200 28 L194 20Z" fill="#8B1A2B" opacity="0.8"/>
        {/* Side lotus petals */}
        {[-80,-50,-25,25,50,80].map((x, i) => (
          <ellipse key={i} cx={200+x} cy={20} rx={8} ry={4}
            fill={i % 2 === 0 ? '#D4A843' : '#C44D5E'} opacity="0.5"
            transform={`rotate(${x > 0 ? 20 : -20} ${200+x} 20)`}
          />
        ))}
        {/* Lines */}
        <line x1="10" y1="20" x2="170" y2="20" stroke="#D4A843" strokeWidth="1" opacity="0.4"/>
        <line x1="230" y1="20" x2="390" y2="20" stroke="#D4A843" strokeWidth="1" opacity="0.4"/>
        <circle cx="10" cy="20" r="2.5" fill="#D4A843" opacity="0.4"/>
        <circle cx="390" cy="20" r="2.5" fill="#D4A843" opacity="0.4"/>
        {/* Dot pattern */}
        {[-120,-100,-140,120,100,140].map((x, i) => (
          <circle key={i} cx={200+x} cy={20} r={1.5} fill="#D4A843" opacity="0.3"/>
        ))}
      </svg>
    </div>
  );
}
