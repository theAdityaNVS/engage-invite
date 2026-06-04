import { useMemo } from 'react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import CountdownTimer from '@/components/shared/CountdownTimer';
import FloatingLanterns from '@/components/shared/FloatingLanterns';
import MandalaPattern from '@/components/shared/MandalaPattern';
import SectionHeader from '@/components/shared/SectionHeader';
import { ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

// Pseudo-random generator for consistent server/client rendering
const seed = (i, o) => ((i * 137 + o * 31) % 100) / 100;

/**
 * SOUTH INDIAN TEMPLE SVG GENERATION PROMPT:
 * 
 * "High-fidelity flat vector illustration of a grand South Indian Gopuram (Dravidian temple tower).
 * Detailed symmetrical architectural tiers, clean geometric linework, stylized golden-yellow highlights
 * on a transparent background. Flanked by ornate brass standing oil lamps (Kuthu Vilakkus) with warm glowing flames
 * at the base. Designed as a clean vector graphic suitable for SVG code, luxury wedding theme, minimal and elegant."
 */

function HangingGarlands() {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '95px',
        pointerEvents: 'none',
        zIndex: 3,
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="marigold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFAE34" />
          <stop offset="100%" stopColor="#D95A1E" />
        </linearGradient>
        <linearGradient id="jasmine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EAE6DF" />
        </linearGradient>
      </defs>

      {/* Drapes (Festoons) - 4 loops across 1200px */}
      {[0, 300, 600, 900].map((startX, i) => {
        const flowers = [];
        const count = 18;
        for (let j = 0; j <= count; j++) {
          const t = j / count;
          // Quadratic Bezier interpolation
          const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * (startX + 150) + t * t * (startX + 300);
          const y = (1 - t) * (1 - t) * 0 + 2 * (1 - t) * t * 45 + t * t * 0;
          flowers.push({ x, y, type: j % 2 === 0 ? 'marigold' : 'jasmine' });
        }

        return (
          <g key={i}>
            <path
              d={`M ${startX} 0 Q ${startX + 150} 45 ${startX + 300} 0`}
              fill="none"
              stroke="rgba(212, 168, 67, 0.2)"
              strokeWidth="0.8"
            />
            {flowers.map((f, idx) => (
              f.type === 'marigold' ? (
                <circle key={idx} cx={f.x} cy={f.y} r="4.5" fill="url(#marigold)" />
              ) : (
                <ellipse key={idx} cx={f.x} cy={f.y} rx="2.2" ry="4" fill="url(#jasmine)" transform={`rotate(15, ${f.x}, ${f.y})`} />
              )
            ))}
          </g>
        );
      })}

      {/* Hanging vertical strings at the joint points */}
      {[0, 300, 600, 900, 1200].map((x, i) => {
        const length = 45 + (i % 2 === 0 ? 25 : 10);
        const flowers = [];
        const count = Math.floor(length / 8);
        for (let j = 0; j < count; j++) {
          const y = 6 + j * 8;
          flowers.push({ x, y, type: j % 3 === 0 ? 'marigold' : 'jasmine' });
        }

        return (
          <g key={i}>
            <line x1={x} y1="0" x2={x} y2={length} stroke="rgba(212, 168, 67, 0.2)" strokeWidth="0.8" />
            {flowers.map((f, idx) => (
              f.type === 'marigold' ? (
                <circle key={idx} cx={f.x} cy={f.y} r="4.5" fill="url(#marigold)" />
              ) : (
                <ellipse key={idx} cx={f.x} cy={f.y} rx="2.2" ry="4.5" fill="url(#jasmine)" />
              )
            ))}
            {/* Swaying golden bell at the bottom of each string */}
            <g transform={`translate(${x}, ${length + 4})`} style={{ animation: 'bellSway 4s ease-in-out infinite', transformOrigin: 'top center' }}>
              <path d="M-4 0 L-2 -5 L2 -5 L4 0 Z" fill="#D4A843" />
              <circle cx="0" cy="1" r="1.5" fill="#FFEBA7" />
            </g>
          </g>
        );
      })}
    </svg>
  );
}

function UnifiedStarfield({ count = 38 }) {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const isStardust = seed(i, 8) > 0.6;
      return {
        id: i,
        type: isStardust ? 'stardust' : 'circle',
        x: seed(i, 0) * 100,
        y: seed(i, 1) * 88, // Avoid placing stars behind the bottom gopuram
        size: isStardust ? 0.8 + seed(i, 2) * 0.8 : 1.2 + seed(i, 2) * 1.5,
        delay: seed(i, 3) * 5,
        duration: 2.0 + seed(i, 4) * 3.0,
      };
    }), [count]);

  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
      {stars.map((s) => (
        <circle
          key={s.id}
          cx={`${s.x}%`}
          cy={`${s.y}%`}
          r={s.size}
          fill="#FFF8F0"
          opacity={s.type === 'stardust' ? 0.35 : 0.85}
          style={{
            animation: `softStarTwinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
            transformOrigin: 'center',
          }}
        />
      ))}
    </svg>
  );
}

function LuminousMoon() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '60px',
        right: '8%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <svg viewBox="0 0 120 120" style={{ width: 75, height: 75, filter: 'drop-shadow(0 0 16px rgba(212, 168, 67, 0.45))' }}>
        <defs>
          <radialGradient id="fullMoonGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#FFEBA7" />
            <stop offset="60%" stopColor="#F5D061" opacity="0.9" />
            <stop offset="85%" stopColor="#D4A843" opacity="0.3" />
            <stop offset="100%" stopColor="#D4A843" opacity="0" />
          </radialGradient>
          <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFEBA7" />
            <stop offset="50%" stopColor="#D4A843" />
            <stop offset="100%" stopColor="#9C731A" />
          </linearGradient>
        </defs>

        {/* Outer Halo Rings */}
        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(212, 168, 67, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(212, 168, 67, 0.22)" strokeWidth="1.5" />
        
        {/* Ray Lines (Prabhavali style rays) */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          const x1 = 60 + Math.cos((angle * Math.PI) / 180) * 36;
          const y1 = 60 + Math.sin((angle * Math.PI) / 180) * 36;
          const x2 = 60 + Math.cos((angle * Math.PI) / 180) * 44;
          const y2 = 60 + Math.sin((angle * Math.PI) / 180) * 44;
          return (
            <line
              key={i}
              x1={x1.toFixed(3)}
              y1={y1.toFixed(3)}
              x2={x2.toFixed(3)}
              y2={y2.toFixed(3)}
              stroke="url(#goldMetallic)"
              strokeWidth="1.2"
              opacity="0.6"
            />
          );
        })}

        {/* Inner Ring with tiny dots representing a traditional medallion */}
        <circle cx="60" cy="60" r="34" fill="none" stroke="url(#goldMetallic)" strokeWidth="1" />
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const x = 60 + Math.cos((angle * Math.PI) / 180) * 34;
          const y = 60 + Math.sin((angle * Math.PI) / 180) * 34;
          return (
            <circle
              key={i}
              cx={x.toFixed(3)}
              cy={y.toFixed(3)}
              r="1.5"
              fill="#FFEBA7"
              opacity="0.8"
            />
          );
        })}

        {/* Glowing Full Moon Sphere */}
        <circle cx="60" cy="60" r="28" fill="url(#fullMoonGlow)" />
        <circle cx="60" cy="60" r="28" fill="none" stroke="url(#goldMetallic)" strokeWidth="0.8" opacity="0.4" />
      </svg>
    </div>
  );
}

function TirupatiGopuramWithLamps() {
  const diyaWindows = [
    [480, 365], [520, 365], [560, 365], [600, 365], [640, 365], [680, 365], [720, 365],
    [520, 315], [560, 315], [600, 315], [640, 315], [680, 315],
    [540, 267], [580, 267], [620, 267], [660, 267],
  ];

  const renderKuthuVilakku = (x) => {
    const baseGradient = 'url(#goldGopuram)';
    const highlightGradient = 'url(#goldHighlight)';
    const baseCol = 'rgba(212, 168, 67, 0.35)';
    return (
      <g key={x}>
        {/* Base Pedestal (layered brass rings) */}
        <ellipse cx={x} cy="524" rx="28" ry="7" fill={baseGradient} stroke={baseCol} strokeWidth="1" />
        <ellipse cx={x} cy="524" rx="28" ry="7" fill={highlightGradient} />
        <ellipse cx={x} cy="517" rx="20" ry="5.5" fill={baseGradient} stroke={baseCol} strokeWidth="1" />
        <ellipse cx={x} cy="517" rx="20" ry="5.5" fill={highlightGradient} />
        <ellipse cx={x} cy="510" rx="24" ry="5" fill={baseGradient} stroke={baseCol} strokeWidth="1" />
        <ellipse cx={x} cy="510" rx="24" ry="5" fill={highlightGradient} />

        {/* Main Stem (Ornate tapered column) */}
        <path d={`M ${x - 5} 510 L ${x - 3} 270 L ${x + 3} 270 L ${x + 5} 510 Z`} fill={baseGradient} stroke={baseCol} strokeWidth="1" />
        <path d={`M ${x - 5} 510 L ${x - 3} 270 L ${x + 3} 270 L ${x + 5} 510 Z`} fill={highlightGradient} />
        
        {/* Ornate decorative rings along stem */}
        <ellipse cx={x} cy="450" rx="10" ry="5.5" fill={baseGradient} stroke={baseCol} strokeWidth="1" />
        <ellipse cx={x} cy="450" rx="10" ry="5.5" fill={highlightGradient} />
        <ellipse cx={x} cy="390" rx="8.5" ry="4.5" fill={baseGradient} stroke={baseCol} strokeWidth="1" />
        <ellipse cx={x} cy="390" rx="8.5" ry="4.5" fill={highlightGradient} />
        <ellipse cx={x} cy="330" rx="7.5" ry="4" fill={baseGradient} stroke={baseCol} strokeWidth="1" />
        <ellipse cx={x} cy="330" rx="7.5" ry="4" fill={highlightGradient} />

        {/* Oil Basin (Kinnam) */}
        <path d={`M ${x - 26} 270 C ${x - 26} 282, ${x + 26} 282, ${x + 26} 270 Z`} fill={baseGradient} stroke={baseCol} strokeWidth="1.2" />
        <path d={`M ${x - 26} 270 C ${x - 26} 282, ${x + 26} 282, ${x + 26} 270 Z`} fill={highlightGradient} />
        <ellipse cx={x} cy="270" rx="26" ry="5" fill="rgba(10, 4, 20, 0.6)" stroke={baseCol} strokeWidth="1" />

        {/* Center Finial (peacock/swan shape rising from center) */}
        <path d={`M ${x - 6} 270 Q ${x} 265 ${x} 250 Q ${x} 265 ${x + 6} 270 Z`} fill={baseGradient} stroke={baseCol} strokeWidth="0.8" />
        {/* Small Kalasa/peacock top */}
        <path d={`M ${x - 5} 250 Q ${x - 9} 235 ${x} 225 Q ${x + 9} 235 ${x + 5} 250 Z`} fill={baseGradient} stroke={baseCol} strokeWidth="1" />
        <path d={`M ${x - 5} 250 Q ${x - 9} 235 ${x} 225 Q ${x + 9} 235 ${x + 5} 250 Z`} fill={highlightGradient} />
        <circle cx={x} cy="225" r="2" fill="#FFEBA7" />

        {/* Flames (Wicks) on left, center, right of the bowl */}
        {/* Center Flame */}
        <g transform={`translate(${x}, 268)`}>
          <ellipse cx="0" cy="0" rx="8" ry="5.5" fill="rgba(255,200,80,0.2)"/>
          <path d="M -4 -2 Q -6 -10 0 -18 Q 6 -10 4 -2 Q 0 2 -4 -2 Z" fill="rgba(255,190,50,0.85)" className="custom-flame" />
          <path d="M -2 -1 Q -3.5 -6 0 -11 Q 3.5 -6 2 -1 Q 0 1 -2 -1 Z" fill="rgba(255,248,240,0.95)" className="custom-flame" style={{ animationDelay: '0.2s' }} />
        </g>

        {/* Left Flame */}
        <g transform={`translate(${x - 20}, 270)`}>
          <ellipse cx="0" cy="0" rx="7" ry="5" fill="rgba(255,200,80,0.2)"/>
          <path d="M -4 -2 Q -5.5 -9 0 -16 Q 5.5 -9 4 -2 Q 0 2 -4 -2 Z" fill="rgba(255,190,50,0.8)" className="custom-flame" style={{ animationDelay: '0.4s' }} />
          <path d="M -2 -1 Q -3 -5 0 -10 Q 3 -5 2 -1 Q 0 1 -2 -1 Z" fill="rgba(255,248,240,0.9)" className="custom-flame" style={{ animationDelay: '0.6s' }} />
        </g>

        {/* Right Flame */}
        <g transform={`translate(${x + 20}, 270)`}>
          <ellipse cx="0" cy="0" rx="7" ry="5" fill="rgba(255,200,80,0.2)"/>
          <path d="M -4 -2 Q -5.5 -9 0 -16 Q 5.5 -9 4 -2 Q 0 2 -4 -2 Z" fill="rgba(255,190,50,0.8)" className="custom-flame" style={{ animationDelay: '0.8s' }} />
          <path d="M -2 -1 Q -3 -5 0 -10 Q 3 -5 2 -1 Q 0 1 -2 -1 Z" fill="rgba(255,248,240,0.9)" className="custom-flame" style={{ animationDelay: '1.0s' }} />
        </g>
      </g>
    );
  };

  return (
    <svg viewBox="0 0 1200 550" preserveAspectRatio="xMidYMax meet" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute', bottom: 0, left: 0, width: '100%', maxHeight: 540,
        pointerEvents: 'none',
        maskImage: 'linear-gradient(to top, black 0%, black 65%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to top, black 0%, black 65%, transparent 100%)',
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

      {/* Ground platform */}
      <rect x="80" y="530" width="1040" height="20" rx="3" fill="rgba(212,168,67,0.25)"/>
      <rect x="120" y="516" width="960"  height="14" rx="2" fill="rgba(212,168,67,0.18)"/>

      {/* Base Gate Structure (Adhisthana and Bhumi) */}
      <rect x="200" y="390" width="800" height="126" rx="3" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.15)" strokeWidth="1.5"/>
      <rect x="200" y="390" width="800" height="126" fill="url(#goldHighlight)" />
      
      {/* Decorative base lines */}
      <rect x="180" y="508" width="840" height="8" rx="1" fill="rgba(212,168,67,0.22)"/>
      <rect x="220" y="398" width="760" height="8" rx="1" fill="rgba(212,168,67,0.15)"/>

      {/* Main Entrance Archway (Gopuram Dvāra) */}
      <path d="M 470 516 L 470 432 Q 600 375 730 432 L 730 516 Z" fill="rgba(212,168,67,0.1)" stroke="rgba(212,168,67,0.2)" strokeWidth="2" />
      <path d="M 490 516 L 490 437 Q 600 398 710 437 L 710 516 Z" fill="rgba(10,4,20,0.85)" stroke="rgba(212,168,67,0.35)" strokeWidth="1" />
      
      {/* Small hanging bell motif in gateway */}
      <line x1="600" y1="398" x2="600" y2="418" stroke="#D4A843" strokeWidth="2" />
      <circle cx="600" cy="422" r="4.5" fill="#FFE070" />

      {/* Elegant Pyramidal Tiers (Talams) */}
      {/* Tier 1 */}
      <g id="tala-1">
        <path d="M 216 390 L 236 340 L 964 340 L 984 390 Z" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.15)" />
        <path d="M 216 390 L 236 340 L 964 340 L 984 390 Z" fill="url(#goldHighlight)" />
        <line x1="236" y1="340" x2="964" y2="340" stroke="rgba(212,168,67,0.25)" strokeWidth="2" />
        {[270, 310, 350, 390, 430, 770, 810, 850, 890, 930].map(x => (
          <line key={x} x1={x} y1="340" x2={x + 7} y2="390" stroke="rgba(212,168,67,0.16)" strokeWidth="1.5" />
        ))}
      </g>

      {/* Tier 2 */}
      <g id="tala-2">
        <path d="M 250 340 L 270 290 L 930 290 L 950 340 Z" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.15)" />
        <path d="M 250 340 L 270 290 L 930 290 L 950 340 Z" fill="url(#goldHighlight)" />
        <line x1="270" y1="290" x2="930" y2="290" stroke="rgba(212,168,67,0.22)" strokeWidth="1.5" />
        {[300, 340, 380, 420, 780, 820, 860, 900].map(x => (
          <line key={x} x1={x} y1="290" x2={x + 6} y2="340" stroke="rgba(212,168,67,0.16)" strokeWidth="1.5" />
        ))}
      </g>

      {/* Tier 3 */}
      <g id="tala-3">
        <path d="M 286 290 L 306 244 L 894 244 L 914 290 Z" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.12)" />
        <path d="M 286 290 L 306 244 L 894 244 L 914 290 Z" fill="url(#goldHighlight)" />
        <line x1="306" y1="244" x2="894" y2="244" stroke="rgba(212,168,67,0.2)" strokeWidth="1.5" />
        {[330, 370, 410, 790, 830, 870].map(x => (
          <line key={x} x1={x} y1="244" x2={x + 5} y2="290" stroke="rgba(212,168,67,0.16)" strokeWidth="1.5" />
        ))}
      </g>

      {/* Tier 4 */}
      <g id="tala-4">
        <path d="M 326 244 L 346 202 L 854 202 L 874 244 Z" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.12)" />
        <path d="M 326 244 L 346 202 L 854 202 L 874 244 Z" fill="url(#goldHighlight)" />
        <line x1="346" y1="202" x2="854" y2="202" stroke="rgba(212,168,67,0.2)" strokeWidth="1.5" />
        {[370, 410, 450, 750, 790, 830].map(x => (
          <line key={x} x1={x} y1="202" x2={x + 4} y2="244" stroke="rgba(212,168,67,0.16)" strokeWidth="1.5" />
        ))}
      </g>

      {/* Tier 5 */}
      <g id="tala-5">
        <path d="M 370 202 L 390 166 L 810 166 L 830 202 Z" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.1)" />
        <path d="M 370 202 L 390 166 L 810 166 L 830 202 Z" fill="url(#goldHighlight)" />
        <line x1="390" y1="166" x2="810" y2="166" stroke="rgba(212,168,67,0.18)" strokeWidth="1.5" />
        {[410, 450, 750, 790].map(x => (
          <line key={x} x1={x} y1="166" x2={x + 3} y2="202" stroke="rgba(212,168,67,0.15)" strokeWidth="1.2" />
        ))}
      </g>

      {/* Tier 6 */}
      <g id="tala-6">
        <path d="M 416 166 L 436 134 L 764 134 L 784 166 Z" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.1)" />
        <path d="M 416 166 L 436 134 L 764 134 L 784 166 Z" fill="url(#goldHighlight)" />
        <line x1="436" y1="134" x2="764" y2="134" stroke="rgba(212,168,67,0.18)" strokeWidth="1.5" />
      </g>

      {/* Tier 7 - Vaulted Crown Roof (Sala-Shikhara) */}
      <g id="shikhara-roof">
        <path d="M 462 134 Q 482 102 502 100 L 698 100 Q 718 102 738 134 Z" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.15)" />
        <path d="M 462 134 Q 482 102 502 100 L 698 100 Q 718 102 738 134 Z" fill="url(#goldHighlight)" />
        <line x1="502" y1="100" x2="698" y2="100" stroke="rgba(212,168,67,0.25)" strokeWidth="2" />
      </g>

      {/* Row of Golden Kalashas (Finials) on vaulted roof */}
      {[510, 532, 555, 577, 600, 622, 645, 667, 690].map((x, i) => (
        <g key={i} id={`kalasha-${i}`}>
          <ellipse cx={x} cy="96" rx="9" ry="5" fill="rgba(212,168,67,0.22)"/>
          <ellipse cx={x} cy="91" rx="6" ry="4.5" fill="rgba(212,168,67,0.28)"/>
          <circle  cx={x} cy="86" r="2.8" fill="rgba(255,225,130,0.4)"/>
          <line x1={x} y1="83" x2={x} y2="77" stroke="rgba(212,168,67,0.25)" strokeWidth="1.5"/>
          <circle  cx={x} cy="76" r="1.5" fill="rgba(255,225,130,0.5)"/>
        </g>
      ))}

      {/* Side Towers (Dvarapala pavilions) */}
      {[[150, 390, 130, 126],[920, 390, 130, 126]].map(([x,y,w,h],i)=>(
        <g key={i} id={`side-tower-${i}`}>
          <rect x={x} y={y} width={w} height={h} rx="2" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.12)"/>
          <rect x={x} y={y} width={w} height={h} fill="url(#goldHighlight)" />
          {[0,1,2].map(t=>(
            <g key={t}>
              <rect x={x+t*10} y={y-t*30-24} width={w-t*20} height={24} rx="1" fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.1)"/>
              <rect x={x+t*10} y={y-t*30-24} width={w-t*20} height={24} fill="url(#goldHighlight)" />
            </g>
          ))}
          <path d={`M ${x+30} ${y-84} Q ${x+w/2} ${y-112} ${x+w-30} ${y-84} Z`} fill="url(#goldGopuram)" stroke="rgba(212,168,67,0.15)"/>
          <circle cx={x+w/2} cy={y-98} r="3.5" fill="#D4A843" />
        </g>
      ))}

      {/* Sculptural temple dancers silhouettes/texture dots along base wall */}
      {[220,240,260,280,300,320,340,360,380,400,420,440,460,480,500,520,540,560,580,600,620,640,660,680,700,720,740,760,780,800,820,840,860,880,900,920,940,960,980].map((x,i)=>(
        <circle key={i} cx={x} cy={390} r="2.5" fill="rgba(212, 168, 67, 0.22)"/>
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

      {/* Flanking Kuthu Vilakkus (Traditional South Indian Standing Lamps) */}
      {renderKuthuVilakku(80)}
      {renderKuthuVilakku(1120)}
    </svg>
  );
}

export default function CountdownSection() {
  const { t } = useLanguage();

  return (
    <section style={{
      background: 'linear-gradient(to bottom, #0d1527 0%, #070b14 50%, #03050a 100%)',
      paddingTop: 'clamp(5rem, 12vw, 7rem)',
      paddingBottom: '240px', // Massive padding to elevate countdown text and allow Gopuram spire to sit behind it
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '90vh',
    }}>
      {/* Localized Styles for Opacity star twinkles & non-rotating vertical stretch flames */}
      <style>{`
        @keyframes softStarTwinkle {
          0%, 100% { opacity: 0.22; }
          50%      { opacity: 0.9; }
        }
        @keyframes normalFire {
          0%, 100% { transform: scaleY(1) scaleX(1) translateY(0); opacity: 0.95; }
          50%      { transform: scaleY(1.12) scaleX(0.93) translateY(-1.5px); opacity: 1; }
        }
        .custom-flame {
          animation: normalFire 1.6s ease-in-out infinite;
          transform-origin: bottom center;
        }
      `}</style>

      {/* Hanging floral welcome garlands */}
      <HangingGarlands />

      <MandalaPattern color="var(--gold)" opacity={0.06} />
      <UnifiedStarfield count={38} />
      <LuminousMoon />
      <FloatingLanterns count={16} />

      {/* Backlight glow behind Gopuram */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '900px',
        height: '420px',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(212, 168, 67, 0.22) 0%, rgba(212, 168, 67, 0.06) 60%, transparent 80%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Countdown Content */}
      <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
        <ScrollReveal>
          <SectionHeader
            eyebrow={t('countdown_script')}
            title={t('countdown_heading')}
            eyebrowType="cursive"
            theme="navy"
            style={{ marginBottom: '3rem' }}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <CountdownTimer targetISO={ENGAGEMENT.COUNTDOWN_ISO} />
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '3rem auto 2rem',
            maxWidth: '360px',
            gap: '1rem',
            opacity: 0.8,
          }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.4))' }} />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--gold)', filter: 'drop-shadow(0 0 4px rgba(212, 168, 67, 0.4))' }}>
              <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" fill="currentColor" />
              <circle cx="12" cy="12" r="3" fill="#FFF8F0" />
            </svg>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(212,168,67,0.4))' }} />
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.015)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(212, 168, 67, 0.14)',
            borderRadius: '16px',
            padding: '2rem 2.2rem',
            position: 'relative',
            maxWidth: '600px',
            margin: '0 auto',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
          }}>
            {/* Fine line inner ornaments */}
            <div style={{ position: 'absolute', top: 10, left: 10, width: 14, height: 14, borderTop: '1px solid rgba(212, 168, 67, 0.35)', borderLeft: '1px solid rgba(212, 168, 67, 0.35)' }} />
            <div style={{ position: 'absolute', top: 10, right: 10, width: 14, height: 14, borderTop: '1px solid rgba(212, 168, 67, 0.35)', borderRight: '1px solid rgba(212, 168, 67, 0.35)' }} />
            <div style={{ position: 'absolute', bottom: 10, left: 10, width: 14, height: 14, borderBottom: '1px solid rgba(212, 168, 67, 0.35)', borderLeft: '1px solid rgba(212, 168, 67, 0.35)' }} />
            <div style={{ position: 'absolute', bottom: 10, right: 10, width: 14, height: 14, borderBottom: '1px solid rgba(212, 168, 67, 0.35)', borderRight: '1px solid rgba(212, 168, 67, 0.35)' }} />

            <p style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: 'clamp(0.92rem, 2.2vw, 1.05rem)',
              color: 'rgba(255, 248, 240, 0.8)',
              lineHeight: 1.8,
              maxWidth: 520,
              margin: '0 auto',
            }}>
              "{t('countdown_message')}"
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Temple Gopuram & Standing Lamps */}
      <TirupatiGopuramWithLamps />
    </section>
  );
}
