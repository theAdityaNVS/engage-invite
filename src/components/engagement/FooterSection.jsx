import { useMemo, useState, useCallback } from 'react';
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
    [480,220],[520,220],[560,220],[600,220],[640,220],[680,220],[720,220],
    [520,180],[560,180],[600,180],[640,180],[680,180],
    [540,148],[580,148],[620,148],[660,148],
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
      <defs>
        <linearGradient id="goldGopuram" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(212,168,67,0.12)" />
          <stop offset="50%" stopColor="rgba(212,168,67,0.22)" />
          <stop offset="100%" stopColor="rgba(245,236,200,0.15)" />
        </linearGradient>
        <linearGradient id="goldHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(212,168,67,0.06)" />
          <stop offset="50%" stopColor="rgba(255,235,170,0.28)" />
          <stop offset="100%" stopColor="rgba(212,168,67,0.06)" />
        </linearGradient>
      </defs>

      {/* Ground shadows and platform */}
      <rect x="80" y="360" width="1040" height="20" rx="3" fill="rgba(212,168,67,0.25)"/>
      <rect x="120" y="346" width="960"  height="14" rx="2" fill="rgba(212,168,67,0.18)"/>

      {/* Base Gate Structure (Adhisthana and Bhumi) */}
      <rect x="200" y="260" width="800" height="86" rx="3" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.15)" strokeWidth="1.5"/>
      <rect x="200" y="260" width="800" height="86" fill="url(#goldHighlight)" />
      
      {/* Decorative base lines */}
      <rect x="180" y="338" width="840" height="8" rx="1" fill="rgba(212,168,67,0.22)"/>
      <rect x="220" y="268" width="760" height="8" rx="1" fill="rgba(212,168,67,0.15)"/>

      {/* Main Entrance Archway (Gopuram Dvāra) */}
      <path d="M 470 346 L 470 292 Q 600 255 730 292 L 730 346 Z" fill="rgba(212,168,67,0.1)" stroke="rgba(212,168,67,0.2)" strokeWidth="2" />
      <path d="M 490 346 L 490 297 Q 600 268 710 297 L 710 346 Z" fill="rgba(10,4,20,0.85)" stroke="rgba(212,168,67,0.35)" strokeWidth="1" />
      
      {/* Small hanging bell motif in gateway */}
      <line x1="600" y1="268" x2="600" y2="282" stroke="#D4A843" strokeWidth="2" />
      <circle cx="600" cy="285" r="3.5" fill="#FFE070" />

      {/* Elegant Pyramidal Tiers (Talams) */}
      {/* Tier 1 */}
      <g id="tala-1">
        <path d="M 216 260 L 236 226 L 964 226 L 984 260 Z" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.15)" />
        <path d="M 216 260 L 236 226 L 964 226 L 984 260 Z" fill="url(#goldHighlight)" />
        <line x1="236" y1="226" x2="964" y2="226" stroke="rgba(212,168,67,0.25)" strokeWidth="2" />
        {/* Architectural carvings - ornamental pillars */}
        {[270, 310, 350, 390, 430, 770, 810, 850, 890, 930].map(x => (
          <line key={x} x1={x} y1="226" x2={x + 5} y2="260" stroke="rgba(212,168,67,0.16)" strokeWidth="1.5" />
        ))}
      </g>

      {/* Tier 2 */}
      <g id="tala-2">
        <path d="M 250 226 L 270 194 L 930 194 L 950 226 Z" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.15)" />
        <path d="M 250 226 L 270 194 L 930 194 L 950 226 Z" fill="url(#goldHighlight)" />
        <line x1="270" y1="194" x2="930" y2="194" stroke="rgba(212,168,67,0.22)" strokeWidth="1.5" />
        {/* Carvings */}
        {[300, 340, 380, 420, 780, 820, 860, 900].map(x => (
          <line key={x} x1={x} y1="194" x2={x + 4} y2="226" stroke="rgba(212,168,67,0.16)" strokeWidth="1.5" />
        ))}
      </g>

      {/* Tier 3 */}
      <g id="tala-3">
        <path d="M 286 194 L 306 166 L 894 166 L 914 194 Z" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.12)" />
        <path d="M 286 194 L 306 166 L 894 166 L 914 194 Z" fill="url(#goldHighlight)" />
        <line x1="306" y1="166" x2="894" y2="166" stroke="rgba(212,168,67,0.2)" strokeWidth="1.5" />
        {/* Carvings */}
        {[330, 370, 410, 790, 830, 870].map(x => (
          <line key={x} x1={x} y1="166" x2={x + 3} y2="194" stroke="rgba(212,168,67,0.16)" strokeWidth="1.5" />
        ))}
      </g>

      {/* Tier 4 */}
      <g id="tala-4">
        <path d="M 326 166 L 346 140 L 854 140 L 874 166 Z" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.12)" />
        <path d="M 326 166 L 346 140 L 854 140 L 874 166 Z" fill="url(#goldHighlight)" />
        <line x1="346" y1="140" x2="854" y2="140" stroke="rgba(212,168,67,0.2)" strokeWidth="1.5" />
        {/* Carvings */}
        {[370, 410, 450, 750, 790, 830].map(x => (
          <line key={x} x1={x} y1="140" x2={x + 3} y2="166" stroke="rgba(212,168,67,0.16)" strokeWidth="1.5" />
        ))}
      </g>

      {/* Tier 5 */}
      <g id="tala-5">
        <path d="M 370 140 L 390 116 L 810 116 L 830 140 Z" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.1)" />
        <path d="M 370 140 L 390 116 L 810 116 L 830 140 Z" fill="url(#goldHighlight)" />
        <line x1="390" y1="116" x2="810" y2="116" stroke="rgba(212,168,67,0.18)" strokeWidth="1.5" />
        {/* Carvings */}
        {[410, 450, 750, 790].map(x => (
          <line key={x} x1={x} y1="116" x2={x + 2} y2="140" stroke="rgba(212,168,67,0.15)" strokeWidth="1.2" />
        ))}
      </g>

      {/* Tier 6 */}
      <g id="tala-6">
        <path d="M 416 116 L 436 94 L 764 94 L 784 116 Z" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.1)" />
        <path d="M 416 116 L 436 94 L 764 94 L 784 116 Z" fill="url(#goldHighlight)" />
        <line x1="436" y1="94" x2="764" y2="94" stroke="rgba(212,168,67,0.18)" strokeWidth="1.5" />
      </g>

      {/* Tier 7 - Vaulted Crown Roof (Sala-Shikhara) */}
      <g id="shikhara-roof">
        <path d="M 462 94 Q 482 72 502 70 L 698 70 Q 718 72 738 94 Z" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.15)" />
        <path d="M 462 94 Q 482 72 502 70 L 698 70 Q 718 72 738 94 Z" fill="url(#goldHighlight)" />
        <line x1="502" y1="70" x2="698" y2="70" stroke="rgba(212,168,67,0.25)" strokeWidth="2" />
      </g>

      {/* Row of Golden Kalashas (Finials) on vaulted roof */}
      {[510, 532, 555, 577, 600, 622, 645, 667, 690].map((x, i) => (
        <g key={i} id={`kalasha-${i}`}>
          <ellipse cx={x} cy="66" rx="9" ry="5" fill="rgba(212,168,67,0.22)"/>
          <ellipse cx={x} cy="61" rx="6" ry="4.5" fill="rgba(212,168,67,0.28)"/>
          <circle  cx={x} cy="56" r="2.8" fill="rgba(255,225,130,0.4)"/>
          <line x1={x} y1="53" x2={x} y2="47" stroke="rgba(212,168,67,0.25)" strokeWidth="1.5"/>
          <circle  cx={x} cy="46" r="1.5" fill="rgba(255,225,130,0.5)"/>
        </g>
      ))}

      {/* Side Towers (Dvarapala pavilions) - highly refined */}
      {[[150, 260, 130, 86],[920, 260, 130, 86]].map(([x,y,w,h],i)=>(
        <g key={i} id={`side-tower-${i}`}>
          <rect x={x} y={y} width={w} height={h} rx="2" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.12)"/>
          <rect x={x} y={y} width={w} height={h} fill="url(#goldHighlight)" />
          {[0,1,2].map(t=>(
            <g key={t}>
              <rect x={x+t*10} y={y-t*20-18} width={w-t*20} height={18} rx="1" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.1)"/>
              <rect x={x+t*10} y={y-t*20-18} width={w-t*20} height={18} fill="url(#goldHighlight)" />
            </g>
          ))}
          <path d={`M ${x+30} ${y-58} Q ${x+w/2} ${y-82} ${x+w-30} ${y-58} Z`} fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.15)"/>
          <circle cx={x+w/2} cy={y-72} r="3" fill="#D4A843" />
        </g>
      ))}

      {/* Sculptural temple dancers silhouettes/texture dots along base wall */}
      {[220,240,260,280,300,320,340,360,380,400,420,440,460,480,500,520,540,560,580,600,620,640,660,680,700,720,740,760,780,800,820,840,860,880,900,920,940,960,980].map((x,i)=>(
        <circle key={i} cx={x} cy={260} r="2.5" fill="rgba(212,168,67,0.22)"/>
      ))}

      {/* Diya windows with warm glowing animations */}
      {diyaWindows.map(([x,y],i)=>(
        <g key={i}>
          <ellipse cx={x} cy={y}   rx="8"   ry="5.5"   fill="rgba(255,200,80,0.15)"/>
          <ellipse cx={x} cy={y-1} rx="5" ry="3.8" fill="rgba(255,190,50,0.22)"
            style={{ animation: `diyaFlicker ${1.4+i*0.1}s ${i*0.15}s ease-in-out infinite` }}/>
          <ellipse cx={x} cy={y-3} rx="2.8" ry="4.5"   fill="rgba(255,140,0,0.38)"
            style={{ animation: `diyaFlicker ${1.7+i*0.08}s ${i*0.12}s ease-in-out infinite` }}/>
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
  const [copied, setCopied] = useState(false);

  const copyHashtag = useCallback(() => {
    navigator.clipboard?.writeText(COUPLE.HASHTAG)?.then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }, []);

  const instagramUrl = `https://instagram.com/${COUPLE.INSTAGRAM_HANDLE.replace('@', '')}`;

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
            fontSize: 'clamp(1.6rem,4vw,2rem)',
            color: '#D4A843',
            marginBottom: '0.4rem',
          }}>
            {COUPLE.GROOM_NAME} &amp; {COUPLE.BRIDE_NAME}
          </p>
          <p style={{
            fontFamily: "'Lora', serif",
            fontSize: '1rem',
            color: 'rgba(240,214,138,0.65)',
            marginBottom: '0.4rem',
            letterSpacing: '0.05em',
          }}>
            {ENGAGEMENT.DATE_DISPLAY} · {ENGAGEMENT.VENUE_CITY}
          </p>
          {/* Hashtag + copy */}
          <p style={{
            fontFamily: "'Lora', serif", fontSize: '0.7rem',
            color: 'rgba(245,236,200,0.4)', letterSpacing: '0.18em',
            textTransform: 'uppercase', marginBottom: '0.25rem',
          }}>
            {t('hashtag_label')}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <p style={{
              fontFamily: "'Lora', serif",
              fontSize: '0.9rem',
              color: 'rgba(245,236,200,0.7)',
              letterSpacing: '0.05em',
              margin: 0,
            }}>
              {COUPLE.HASHTAG}
            </p>
            <button
              onClick={copyHashtag}
              title={t('copy')}
              aria-label={t('copy')}
              style={{
                background: 'none', border: '1px solid rgba(212,168,67,0.35)',
                borderRadius: '12px', padding: '0.15rem 0.6rem',
                fontFamily: "'Lora', serif", fontSize: '0.72rem',
                color: copied ? '#D4A843' : 'rgba(245,236,200,0.55)',
                cursor: 'pointer', letterSpacing: '0.06em',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              {copied ? t('copied') : t('copy')}
            </button>
          </div>

          <div style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.25), transparent)',
            maxWidth: 260,
            margin: '0 auto 1.25rem',
          }} />

          {/* Instagram follow */}
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{
              fontFamily: "'Lora', serif", fontSize: '0.78rem',
              color: 'rgba(245,236,200,0.45)', letterSpacing: '0.14em',
              textTransform: 'uppercase', marginBottom: '0.4rem',
            }}>
              {t('follow_the_action')}
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Lora', serif", fontSize: '0.85rem',
                color: 'rgba(212,168,67,0.75)',
                textDecoration: 'underline', textUnderlineOffset: 3,
                letterSpacing: '0.04em', display: 'block', marginBottom: '0.2rem',
              }}
            >
              {COUPLE.INSTAGRAM_HANDLE}
            </a>
            <p style={{
              fontFamily: "'Lora', serif", fontSize: '0.75rem',
              color: 'rgba(245,236,200,0.4)', letterSpacing: '0.06em', margin: 0,
            }}>
              {t('follow_subtitle')}
            </p>
          </div>

          <div style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.25), transparent)',
            maxWidth: 260,
            margin: '0 auto 1.25rem',
          }} />

          <p style={{
            fontFamily: "'Lora', serif",
            fontSize: '0.9rem',
            color: 'rgba(245,236,200,0.5)',
          }}>
            {t('made_with_love')}
          </p>
        </div>
      </div>
    </footer>
  );
}
