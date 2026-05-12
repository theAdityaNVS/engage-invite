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

function TirupatiGopuram() {
  const diyaWindows = [
    [340,220],[380,220],[420,220],[460,220],[500,220],[540,220],[560,220],
    [360,180],[400,180],[440,180],[480,180],[520,180],
    [380,148],[420,148],[460,148],[500,148],
  ];

  return (
    <svg viewBox="0 0 1200 380" preserveAspectRatio="xMidYMax meet" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute', bottom: 0, left: 0, width: '100%', maxHeight: 380,
        pointerEvents: 'none',
        maskImage: 'linear-gradient(to top, black 0%, black 55%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to top, black 0%, black 55%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      <rect x="100" y="360" width="1000" height="20" rx="2" fill="rgba(212,168,67,0.2)"/>
      <rect x="140" y="348" width="920"  height="14" rx="2" fill="rgba(212,168,67,0.15)"/>

      {/* Base gate */}
      <rect x="200" y="260" width="800" height="100" rx="2" fill="rgba(212,168,67,0.12)"/>
      <rect x="200" y="270" width="800" height="10"  rx="1" fill="rgba(212,168,67,0.1)"/>
      <rect x="200" y="340" width="800" height="10"  rx="1" fill="rgba(212,168,67,0.1)"/>

      {/* Entrance arch */}
      <path d="M480 360 L480 295 Q600 265 720 295 L720 360Z" fill="rgba(212,168,67,0.08)"/>
      <path d="M500 360 L500 300 Q600 275 700 300 L700 360Z" fill="rgba(10,4,20,0.6)"/>

      {/* Tiers */}
      <rect x="220" y="228" width="760" height="34" rx="1" fill="rgba(212,168,67,0.11)"/>
      <rect x="255" y="198" width="690" height="32" rx="1" fill="rgba(212,168,67,0.1)"/>
      <rect x="295" y="170" width="610" height="30" rx="1" fill="rgba(212,168,67,0.09)"/>
      <rect x="340" y="145" width="520" height="27" rx="1" fill="rgba(212,168,67,0.09)"/>
      <rect x="388" y="122" width="424" height="25" rx="1" fill="rgba(212,168,67,0.08)"/>
      <rect x="432" y="102" width="336" height="22" rx="1" fill="rgba(212,168,67,0.08)"/>
      <rect x="472" y="85"  width="256" height="19" rx="1" fill="rgba(212,168,67,0.07)"/>

      {/* Kalasha row */}
      {[490,517,545,572,600,628,656,684,712].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy="80"  rx="11" ry="8"  fill="rgba(212,168,67,0.14)"/>
          <ellipse cx={x} cy="74"  rx="7"  ry="6"  fill="rgba(212,168,67,0.18)"/>
          <circle  cx={x} cy="69"  r="3.5"          fill="rgba(212,168,67,0.22)"/>
          <line x1={x} y1="66" x2={x} y2="59" stroke="rgba(212,168,67,0.15)" strokeWidth="1.5"/>
          <circle  cx={x} cy="58"  r="2"            fill="rgba(212,168,67,0.2)"/>
        </g>
      ))}

      {/* Side towers */}
      {[[150,260,180,100],[870,260,180,100]].map(([x,y,w,h],i)=>(
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} rx="1" fill="rgba(212,168,67,0.08)"/>
          {[0,1,2].map(t=>(
            <rect key={t} x={x+t*8} y={y+t*20} width={w-t*16} height={18} rx="1" fill="rgba(212,168,67,0.07)"/>
          ))}
          <ellipse cx={x+w/2} cy={y-6} rx={w/2-10} ry="8" fill="rgba(212,168,67,0.1)"/>
        </g>
      ))}

      {/* Sculptural figure dots */}
      {[220,240,260,280,300,320,340,360,380,400,420,440,460,480,500,520,540,560,580,600,620,640,660,680,700,720,740,760,780].map((x,i)=>(
        <circle key={i} cx={x} cy={260} r="3" fill="rgba(212,168,67,0.18)"/>
      ))}

      {/* Diya windows with flicker */}
      {diyaWindows.map(([x,y],i)=>(
        <g key={i}>
          <ellipse cx={x} cy={y}   rx="7"   ry="5"   fill="rgba(255,200,80,0.12)"/>
          <ellipse cx={x} cy={y-1} rx="4.5" ry="3.5" fill="rgba(255,200,80,0.18)"
            style={{ animation: `diyaFlicker ${1.5+i*0.12}s ${i*0.18}s ease-in-out infinite` }}/>
          <ellipse cx={x} cy={y-3} rx="2.5" ry="4"   fill="rgba(255,180,50,0.28)"
            style={{ animation: `diyaFlicker ${1.8+i*0.1}s ${i*0.15}s ease-in-out infinite` }}/>
        </g>
      ))}
    </svg>
  );
}

function AnimatedMoon() {
  return (
    <div style={{
      position: 'absolute', top: '8%', zIndex: 1,
      animation: 'moonArc 120s linear infinite',
      pointerEvents: 'none',
    }}>
      <svg viewBox="0 0 44 44" style={{ width: 44, height: 44 }}>
        <circle cx="22" cy="22" r="16" fill="rgba(255,245,200,0.85)" />
        <circle cx="30" cy="16" r="13" fill="var(--navy)" />
        <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,245,200,0.12)" strokeWidth="4"/>
      </svg>
    </div>
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
      <Starfield count={34} />
      <AnimatedMoon />
      <FloatingLanterns count={10} />
      <TirupatiGopuram />

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
