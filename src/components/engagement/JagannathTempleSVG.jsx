import React from 'react';

export default function JagannathTempleSVG(props) {
  // Calculated positions for the marigold garlands
  const marigoldGarlandPoints = [
    // Vimana garland valleys (under the eaves)
    { cx: 180, cy: 502 }, { cx: 200, cy: 505 }, { cx: 220, cy: 505 }, { cx: 240, cy: 502 },
    { cx: 320, cy: 502 }, { cx: 340, cy: 505 }, { cx: 360, cy: 505 }, { cx: 380, cy: 502 },
    // Jagamohana garland valleys
    { cx: 430, cy: 536 }, { cx: 460, cy: 540 }, { cx: 490, cy: 540 }, { cx: 520, cy: 536 },
    { cx: 580, cy: 536 }, { cx: 610, cy: 540 }, { cx: 640, cy: 540 }, { cx: 670, cy: 536 },
    // Nata Mandapa garland valleys
    { cx: 710, cy: 566 }, { cx: 740, cy: 570 }, { cx: 770, cy: 570 }, { cx: 800, cy: 566 },
    { cx: 820, cy: 566 }, { cx: 850, cy: 570 }, { cx: 880, cy: 570 }, { cx: 910, cy: 566 },
    // Bhoga Mandapa garland valleys
    { cx: 945, cy: 596 }, { cx: 970, cy: 600 }, { cx: 995, cy: 600 }, { cx: 1020, cy: 596 },
  ];

  return (
    <svg 
      viewBox="0 0 1200 755" 
      preserveAspectRatio="xMidYMax meet" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ 
        width: '100%', 
        maxWidth: 1050, 
        display: 'block', 
        margin: '0 auto',
        overflow: 'visible',
        filter: 'drop-shadow(0 12px 30px rgba(0,0,0,0.3))',
        ...props.style
      }}
      aria-label="Shri Jagannath Swamy Temple, Puri"
      className={props.className}
    >
      <defs>
        {/* Soft Organic Flag Flutter Keyframe Animation */}
        <style>
          {`
            @keyframes flagWind {
              0% { transform: rotate(0deg) scaleY(1); }
              50% { transform: rotate(-5deg) scaleY(0.9) skewX(4deg); }
              100% { transform: rotate(5deg) scaleY(1.1) skewX(-4deg); }
            }
            .flutter-flag {
              transform-origin: 282px 10px;
              animation: flagWind 2.4s ease-in-out infinite alternate;
            }
            @keyframes bellSway {
              0% { transform: rotate(-6deg); }
              100% { transform: rotate(6deg); }
            }
            .sway-bell {
              transform-origin: center top;
              animation: bellSway 2s ease-in-out infinite alternate;
            }
            @keyframes birdGlide {
              0% { transform: translate(0, 0); }
              50% { transform: translate(-10px, 4px); }
              100% { transform: translate(0, 0); }
            }
            .gliding-bird {
              animation: birdGlide 6s ease-in-out infinite alternate;
            }
          `}
        </style>

        {/* --- Older Saffron-Gold Ambient Glow (Enriched for twilight harmony) --- */}
        <radialGradient id="templeGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FAD961" stopOpacity="0.35" /> {/* Soft warm yellow gold */}
          <stop offset="50%" stopColor="#F76B1C" stopOpacity="0.15" /> {/* Deep sunset orange */}
          <stop offset="100%" stopColor="#180508" stopOpacity="0" />
        </radialGradient>

        {/* --- Authentic Red-Brown Stone Gradient (Refined for dusk lighting) --- */}
        <linearGradient id="shikharaGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#8C2C15" /> {/* Rich Terracotta Saffron */}
          <stop offset="35%" stopColor="#B24E2B" /> {/* Sunset Sandstone */}
          <stop offset="70%" stopColor="#D87A4A" /> {/* Goldenhour Amber */}
          <stop offset="100%" stopColor="#4A1808" /> {/* Sunset Silhouette */}
        </linearGradient>

        {/* Secondary Carved Panels Gradient */}
        <linearGradient id="ochreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B24E2B" />
          <stop offset="50%" stopColor="#E08B46" /> {/* Warm golden-amber highlight */}
          <stop offset="100%" stopColor="#5C1F0C" />
        </linearGradient>

        {/* Base Foundation Earth Gradient */}
        <linearGradient id="foundationGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5C1F0C" />
          <stop offset="100%" stopColor="#250902" />
        </linearGradient>

        {/* --- High-Contrast Metallic Gold --- */}
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="1" y2="0">
          <stop offset="0%" stopColor="#C58B35" /> {/* Antique Bronze Gold */}
          <stop offset="30%" stopColor="#E5C070" /> {/* Warm Gold */}
          <stop offset="70%" stopColor="#F5DCA0" /> {/* Champagne Gold Highlight */}
          <stop offset="100%" stopColor="#B57A25" /> {/* Dark Burnished Gold */}
        </linearGradient>

        {/* --- Rounded 3D Volumetric Stone Shadow --- */}
        <linearGradient id="stoneShadow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.32)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
        </linearGradient>

        {/* Nila Chakra - Divine Blue-Gold Accent */}
        <linearGradient id="blueWheel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4FC3F7" /> {/* Sky Blue Glow */}
          <stop offset="50%" stopColor="#0288D1" /> {/* Rich Indigo Blue */}
          <stop offset="100%" stopColor="#004D40" /> {/* Gold-Teal Accent */}
        </linearGradient>

        {/* Crimson Red Flag (Patita Pavana Bana) */}
        <linearGradient id="flagGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D43030" />
          <stop offset="100%" stopColor="#801010" />
        </linearGradient>

        {/* Pillar Dimensional Color */}
        <linearGradient id="pillarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B05530" />
          <stop offset="40%" stopColor="#E5C070" />
          <stop offset="70%" stopColor="#C58B35" />
          <stop offset="100%" stopColor="#6E2C14" />
        </linearGradient>

        {/* Mystic Dark Door Interior */}
        <linearGradient id="doorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#301005" />
          <stop offset="100%" stopColor="#1F0A03" />
        </linearGradient>

        {/* Festive Marigold Orange-Yellow Garland */}
        <linearGradient id="marigoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E5C070" /> {/* Yellow-Gold */}
          <stop offset="100%" stopColor="#D43030" /> {/* Saffron Orange */}
        </linearGradient>

        {/* Soft platform reflection glow */}
        <radialGradient id="reflectionGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(229,192,112,0.18)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* ========================================== */}
      {/* 0. SUNSET AMBIENT GLOW & REFL Shadow       */}
      {/* ========================================== */}
      {/* Soft floor shadow with reflection glow */}
      <ellipse cx="600" cy="735" rx="550" ry="20" fill="url(#reflectionGlow)" />
      <ellipse cx="600" cy="735" rx="520" ry="15" fill="rgba(48,16,5,0.25)" />

      {/* Warm Ambient Saffron Halo behind the spires */}
      <rect x="100" y="80" width="1000" height="630" fill="url(#templeGlow)" opacity="0.8" pointerEvents="none" />

      {/* ========================================== */}
      {/* 1. VIMANA (THE MAIN SANCTUM / TALL SPIRE)  */}
      {/* ========================================== */}
      <g id="structure-1-vimana">
        {/* Vimana Base Wall */}
        <rect x="160" y="480" width="240" height="200" rx="16" fill="url(#shikharaGrad)" />
        <rect x="160" y="480" width="240" height="200" rx="16" fill="url(#stoneShadow)" />

        {/* Handcrafted Stone Texture Details (Playful Brick Patterns) */}
        <rect x="180" y="520" width="28" height="12" rx="3" fill="#B05530" fillOpacity="0.3" />
        <rect x="330" y="500" width="36" height="14" rx="4" fill="#6E2C14" fillOpacity="0.45" />
        <rect x="190" y="600" width="32" height="12" rx="3" fill="#E5C070" fillOpacity="0.22" />
        <rect x="340" y="620" width="26" height="12" rx="3" fill="#A84822" fillOpacity="0.3" />

        {/* Vimana Spire Curved Core (Rekha Deula) */}
        <path 
          d="M 160,490 
             C 160,340 185,220 245,160 
             L 315,160 
             C 375,220 400,340 400,490 
             Z" 
          fill="url(#shikharaGrad)" 
        />
        <path 
          d="M 160,490 
             C 160,340 185,220 245,160 
             L 315,160 
             C 375,220 400,340 400,490 
             Z" 
          fill="url(#stoneShadow)" 
        />

        {/* Vertical Pagas (Pillars/Ribs) to create Kalinga texture */}
        {/* Central Raha Paga */}
        <path 
          d="M 245,490 
             C 245,330 258,215 270,160 
             L 290,160 
             C 302,215 315,330 315,490 
             Z" 
          fill="url(#ochreGrad)" 
        />
        {/* Left Side Rib (Kanika Paga) */}
        <path 
          d="M 195,490 
             C 195,350 215,245 240,175 
             L 250,175 
             C 225,245 208,350 208,490 
             Z" 
          fill="url(#goldGrad)" 
          fillOpacity="0.8" 
        />
        {/* Right Side Rib (Kanika Paga) */}
        <path 
          d="M 310,175 
             L 320,175 
             C 345,245 365,350 365,490 
             L 352,490 
             C 352,350 335,245 310,175 
             Z" 
          fill="url(#goldGrad)" 
          fillOpacity="0.45" 
        />

        {/* Elegant Horizontal Carved Stone Bands (Bhumis) with soft curves */}
        {/* Curved Band 1 (y = 440) */}
        <path d="M 172,440 Q 280,422 388,440 L 391,455 Q 280,437 169,455 Z" fill="#4A1E0E" />
        <path d="M 172,440 Q 280,422 388,440" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />
        
        {/* Curved Band 2 (y = 370) */}
        <path d="M 185,370 Q 280,354 375,370 L 378,383 Q 280,367 182,383 Z" fill="#4A1E0E" />
        <path d="M 185,370 Q 280,354 375,370" stroke="url(#ochreGrad)" strokeWidth="2.5" />

        {/* Curved Band 3 (y = 300) */}
        <path d="M 201,300 Q 280,286 359,300 L 361,312 Q 280,298 199,312 Z" fill="#4A1E0E" />
        <path d="M 201,300 Q 280,286 359,300" stroke="url(#goldGrad)" strokeWidth="2.5" />

        {/* Curved Band 4 (y = 230) */}
        <path d="M 221,230 Q 280,219 339,230 L 341,240 Q 280,229 219,240 Z" fill="#4A1E0E" />
        <path d="M 221,230 Q 280,219 339,230" stroke="url(#ochreGrad)" strokeWidth="2" />

        {/* Playful Sacred Medallions (Chaitya Windows) along the center Raha Paga */}
        <circle cx="280" cy="210" r="10" fill="url(#goldGrad)" />
        <circle cx="280" cy="210" r="6" fill="#801010" />
        <circle cx="280" cy="210" r="2.5" fill="#FFE57F" />

        <circle cx="280" cy="275" r="12" fill="url(#goldGrad)" />
        <circle cx="280" cy="275" r="7" fill="#801010" />
        <circle cx="280" cy="275" r="3" fill="#FFE57F" />

        <circle cx="280" cy="345" r="13" fill="url(#goldGrad)" />
        <circle cx="280" cy="345" r="8" fill="#801010" />
        <circle cx="280" cy="345" r="3" fill="#FFE57F" />

        <circle cx="280" cy="415" r="15" fill="url(#goldGrad)" />
        <circle cx="280" cy="415" r="9" fill="#801010" />
        <circle cx="280" cy="415" r="4" fill="#FFE57F" />

        {/* Main nested golden archway (Vimana Portal) */}
        {/* Outer Arch */}
        <path d="M 215,680 L 215,575 A 65,65 0 0,1 345,575 L 345,680 Z" fill="url(#ochreGrad)" />
        {/* Inner Gold Arch */}
        <path d="M 230,680 L 230,585 A 50,50 0 0,1 330,585 L 330,680 Z" fill="url(#goldGrad)" />
        {/* Shadow Opening */}
        <path d="M 245,680 L 245,595 A 35,35 0 0,1 315,595 L 315,680 Z" fill="url(#doorGrad)" />
        {/* Golden Door Handles */}
        <circle cx="276" cy="640" r="3.5" fill="url(#goldGrad)" />
        <circle cx="284" cy="640" r="3.5" fill="url(#goldGrad)" />
        
        {/* Large Decorative Flower Arch Medallion */}
        <circle cx="280" cy="535" r="15" fill="url(#goldGrad)" />
        <circle cx="280" cy="535" r="10" fill="#D43030" />
        <circle cx="280" cy="535" r="5" fill="#FFE57F" />
      </g>

      {/* ========================================== */}
      {/* 2. VIMANA CROWN (AMALAKA, KALASHA, FLAG)   */}
      {/* ========================================== */}
      <g id="vimana-sacred-crown">
        {/* Neck (Beki) */}
        <rect x="250" y="150" width="60" height="15" rx="7" fill="url(#foundationGrad)" />
        <rect x="250" y="150" width="60" height="15" rx="7" fill="url(#stoneShadow)" />

        {/* Amalaka (Ribbed Stone Disc) */}
        <rect x="225" y="122" width="110" height="30" rx="15" fill="url(#ochreGrad)" stroke="url(#goldGrad)" strokeWidth="3" />
        {/* Overlapping ribs to show pumpkin details */}
        <path d="M 245,123 C 248,132 248,142 245,151" stroke="#4A1E0E" strokeWidth="2.5" />
        <path d="M 262,122 C 266,132 266,142 262,151" stroke="#4A1E0E" strokeWidth="2.5" />
        <path d="M 280,122 L 280,152" stroke="#4A1E0E" strokeWidth="2.5" />
        <path d="M 298,122 C 294,132 294,142 298,151" stroke="#4A1E0E" strokeWidth="2.5" />
        <path d="M 315,123 C 312,132 312,142 315,151" stroke="#4A1E0E" strokeWidth="2.5" />

        {/* Cap (Khapuri) */}
        <rect x="245" y="114" width="70" height="10" rx="5" fill="url(#goldGrad)" />

        {/* Kalasha (Sacred Pot) */}
        <rect x="260" y="104" width="40" height="12" rx="4" fill="url(#shikharaGrad)" />
        <path d="M 258,95 
                 C 253,78 307,78 302,95 
                 C 297,106 263,106 258,95 
                 Z" 
              fill="url(#goldGrad)" 
              stroke="#B57A25" 
              strokeWidth="1.5" 
        />
        <rect x="268" y="77" width="24" height="6" rx="3" fill="url(#ochreGrad)" />
        <polygon points="274,77 280,68 286,77" fill="url(#goldGrad)" />

        {/* Flagpole / Mast (Extended further up to y=0 to accommodate separated styling) */}
        <line x1="280" y1="72" x2="280" y2="0" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" />

        {/* Nila Chakra (Eight-Spoked Divine Blue Wheel - Centered at cy=52 to resolve overlaps) */}
        <g id="nila-chakra" transform="translate(0, 0)">
          {/* Flame/Teardrop accents radiating outwards from the wheel */}
          <path d="M 280,33 L 280,26" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 299,52 L 305,52" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 261,52 L 255,52" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 280,71 L 280,78" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Wheel Outer ring */}
          <circle cx="280" cy="52" r="19" stroke="url(#blueWheel)" strokeWidth="5.5" fill="none" />
          <circle cx="280" cy="52" r="14" stroke="url(#goldGrad)" strokeWidth="1.5" fill="none" />
          {/* Wheel Hub */}
          <circle cx="280" cy="52" r="5" fill="url(#blueWheel)" />
          {/* 8 Spokes */}
          <line x1="280" y1="33" x2="280" y2="71" stroke="url(#blueWheel)" strokeWidth="2.5" />
          <line x1="261" y1="52" x2="299" y2="52" stroke="url(#blueWheel)" strokeWidth="2.5" />
          <line x1="267" y1="39" x2="293" y2="65" stroke="url(#blueWheel)" strokeWidth="2.5" />
          <line x1="267" y1="65" x2="293" y2="39" stroke="url(#blueWheel)" strokeWidth="2.5" />
        </g>

        {/* Patita Pavana Bana (Sacred Red Flag hoisted at the top, y=2 to y=18) */}
        <g className="flutter-flag">
          {/* Tiny gold attachment beads */}
          <circle cx="283" cy="4" r="2.5" fill="url(#goldGrad)" />
          <circle cx="283" cy="16" r="2.5" fill="url(#goldGrad)" />
          
          {/* Elegant waving triangular flag */}
          <path 
            d="M 282,2 
               C 320,-8 355,-11 390,0 
               C 365,12 325,12 282,18 
               Z" 
            fill="url(#flagGrad)" 
            stroke="url(#goldGrad)"
            strokeWidth="1.5"
          />
          {/* Decorative inner golden ribbon wave */}
          <path 
            d="M 295,4 
               C 325,-4 348,-4 375,2" 
            stroke="url(#goldGrad)" 
            strokeWidth="2.5" 
            fill="none" 
            strokeLinecap="round"
            opacity="0.8" 
          />
        </g>
      </g>

      {/* ============================================== */}
      {/* 3. JAGAMOHANA (ASSEMBLY HALL - STEPPED ROOF)   */}
      {/* ============================================== */}
      <g id="structure-2-jagamohana">
        {/* Base Wall */}
        <rect x="410" y="520" width="280" height="160" rx="14" fill="url(#shikharaGrad)" />
        <rect x="410" y="520" width="280" height="160" rx="14" fill="url(#stoneShadow)" />

        {/* Scattered stone tiles */}
        <rect x="430" y="560" width="24" height="12" rx="3" fill="#B05530" fillOpacity="0.3" />
        <rect x="630" y="550" width="30" height="12" rx="3" fill="#6E2C14" fillOpacity="0.4" />
        <rect x="620" y="610" width="24" height="10" rx="2" fill="#E5C070" fillOpacity="0.18" />

        {/* Stepped Pyramid Roof (Pidha Deula) - 6 Layers */}
        {/* Layer 1 (Bottom - Wide) */}
        <rect x="380" y="495" width="340" height="25" rx="8" fill="url(#ochreGrad)" stroke="url(#shikharaGrad)" strokeWidth="2.5" />
        {/* Layer 2 */}
        <rect x="405" y="465" width="290" height="30" rx="7" fill="url(#shikharaGrad)" stroke="url(#goldGrad)" strokeWidth="1.5" />
        {/* Layer 3 */}
        <rect x="430" y="435" width="240" height="30" rx="7" fill="url(#ochreGrad)" stroke="url(#shikharaGrad)" strokeWidth="1.5" />
        {/* Layer 4 */}
        <rect x="455" y="405" width="190" height="30" rx="6" fill="url(#shikharaGrad)" stroke="url(#goldGrad)" strokeWidth="1.5" />
        {/* Layer 5 */}
        <rect x="480" y="375" width="140" height="30" rx="6" fill="url(#ochreGrad)" stroke="url(#shikharaGrad)" strokeWidth="1.5" />
        {/* Layer 6 (Top platform) */}
        <rect x="505" y="345" width="90" height="30" rx="5" fill="url(#goldGrad)" stroke="#B57A25" strokeWidth="1.5" />

        {/* Fine gold horizontal trim highlights for architectural depth */}
        <line x1="390" y1="507" x2="710" y2="507" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.65" />
        <line x1="415" y1="480" x2="685" y2="480" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.65" />
        <line x1="440" y1="450" x2="660" y2="450" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.65" />
        <line x1="465" y1="420" x2="635" y2="420" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.65" />

        {/* Unified Soft Side Shadow over Jagamohana's right half */}
        <path 
          d="M 550,345 
             L 595,345 L 620,375 L 645,405 L 670,435 L 695,465 L 720,495 L 720,520 L 690,680 
             L 550,680 Z" 
          fill="url(#stoneShadow)" 
          opacity="0.35" 
        />

        {/* Playful nested temple lattice window (Jali) */}
        <path d="M 505,680 L 505,595 A 45,45 0 0,1 595,595 L 595,680 Z" fill="url(#ochreGrad)" />
        <path d="M 520,680 L 520,607 A 30,30 0 0,1 580,607 L 580,680 Z" fill="url(#doorGrad)" />
        {/* Golden Lattice Pattern inside Jali window */}
        <line x1="530" y1="680" x2="570" y2="615" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="570" y1="680" x2="530" y2="615" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="550" y1="680" x2="550" y2="607" stroke="url(#goldGrad)" strokeWidth="2" />
        
        {/* Decorative Golden Flower Medallion above windows */}
        <circle cx="550" cy="555" r="11" fill="url(#goldGrad)" />
        <circle cx="550" cy="555" r="7" fill="#D43030" />
        <circle cx="550" cy="555" r="3" fill="#FFE57F" />

        {/* Jagamohana Crown (Amalaka & Kalasha) */}
        <rect x="525" y="325" width="50" height="20" rx="10" fill="url(#ochreGrad)" stroke="url(#goldGrad)" strokeWidth="2" />
        {/* Overlapping lines for small Amalaka */}
        <line x1="535" y1="326" x2="535" y2="344" stroke="#4A1E0E" strokeWidth="1.5" />
        <line x1="550" y1="325" x2="550" y2="345" stroke="#4A1E0E" strokeWidth="1.5" />
        <line x1="565" y1="326" x2="565" y2="344" stroke="#4A1E0E" strokeWidth="1.5" />
        
        <rect x="532" y="307" width="36" height="18" rx="8" fill="url(#goldGrad)" stroke="#B57A25" strokeWidth="1" />
        <line x1="550" y1="307" x2="550" y2="292" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* ============================================== */}
      {/* 4. NATA MANDAPA (DANCE HALL - PILLARED HALL)   */}
      {/* ============================================== */}
      <g id="structure-3-nata-mandapa">
        {/* Base Wall (dark brown hollow interior behind pillars) */}
        <rect x="690" y="550" width="240" height="130" rx="12" fill="url(#shikharaGrad)" />
        <rect x="690" y="550" width="240" height="130" rx="12" fill="url(#stoneShadow)" />
        <rect x="710" y="565" width="200" height="115" rx="8" fill="#301005" /> {/* Dark interior */}

        {/* Stepped Pyramid Roof - 5 Layers */}
        {/* Layer 1 (Bottom) */}
        <rect x="660" y="528" width="280" height="22" rx="7" fill="url(#ochreGrad)" stroke="url(#shikharaGrad)" strokeWidth="2" />
        {/* Layer 2 */}
        <rect x="690" y="500" width="220" height="28" rx="6" fill="url(#shikharaGrad)" stroke="url(#goldGrad)" strokeWidth="1.5" />
        {/* Layer 3 */}
        <rect x="720" y="472" width="160" height="28" rx="6" fill="url(#ochreGrad)" stroke="url(#shikharaGrad)" strokeWidth="1.5" />
        {/* Layer 4 */}
        <rect x="750" y="444" width="100" height="28" rx="5" fill="url(#shikharaGrad)" stroke="url(#goldGrad)" strokeWidth="1.5" />
        {/* Layer 5 (Top platform) */}
        <rect x="775" y="416" width="50" height="28" rx="4" fill="url(#goldGrad)" stroke="#B57A25" strokeWidth="1" />

        {/* Detailed golden highlight trim lines for depth */}
        <line x1="670" y1="539" x2="930" y2="539" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.6" />
        <line x1="700" y1="514" x2="900" y2="514" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.6" />
        <line x1="730" y1="486" x2="870" y2="486" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.6" />

        {/* Unified Side Shadow over Nata Mandapa's right half */}
        <path 
          d="M 800,416 
             L 825,416 L 850,444 L 880,472 L 910,500 L 940,528 L 940,550 L 930,680 
             L 800,680 Z" 
          fill="url(#stoneShadow)" 
          opacity="0.35" 
        />

        {/* Stylized Column Arcade (Traditional Dancing Hall Pillars) */}
        {/* Pillar 1 */}
        <rect x="720" y="565" width="14" height="115" rx="4" fill="url(#pillarGrad)" />
        <rect x="717" y="565" width="20" height="6" rx="2" fill="url(#goldGrad)" />
        {/* Pillar 2 */}
        <rect x="752" y="565" width="14" height="115" rx="4" fill="url(#pillarGrad)" />
        <rect x="749" y="565" width="20" height="6" rx="2" fill="url(#goldGrad)" />
        {/* Pillar 3 */}
        <rect x="785" y="565" width="14" height="115" rx="4" fill="url(#pillarGrad)" />
        <rect x="782" y="565" width="20" height="6" rx="2" fill="url(#goldGrad)" />
        {/* Pillar 4 */}
        <rect x="818" y="565" width="14" height="115" rx="4" fill="url(#pillarGrad)" />
        <rect x="815" y="565" width="20" height="6" rx="2" fill="url(#goldGrad)" />
        {/* Pillar 5 */}
        <rect x="852" y="565" width="14" height="115" rx="4" fill="url(#pillarGrad)" />
        <rect x="849" y="565" width="20" height="6" rx="2" fill="url(#goldGrad)" />
        {/* Pillar 6 */}
        <rect x="885" y="565" width="14" height="115" rx="4" fill="url(#pillarGrad)" />
        <rect x="882" y="565" width="20" height="6" rx="2" fill="url(#goldGrad)" />

        {/* Nata Mandapa Crown (Golden Kalasha) */}
        <rect x="785" y="398" width="30" height="18" rx="8" fill="url(#ochreGrad)" stroke="url(#goldGrad)" strokeWidth="1.5" />
        <circle cx="800" cy="388" r="9" fill="url(#goldGrad)" stroke="#B57A25" strokeWidth="1" />
        <line x1="800" y1="382" x2="800" y2="370" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* ============================================== */}
      {/* 5. BHOGA MANDAPA (OFFERING HALL - LOWEST ROOF) */}
      {/* ============================================== */}
      <g id="structure-4-bhoga-mandapa">
        {/* Base Wall */}
        <rect x="930" y="580" width="160" height="100" rx="10" fill="url(#shikharaGrad)" />
        <rect x="930" y="580" width="160" height="100" rx="10" fill="url(#stoneShadow)" />

        {/* Stepped Pyramid Roof - 4 Layers */}
        {/* Layer 1 (Bottom) */}
        <rect x="910" y="560" width="200" height="20" rx="6" fill="url(#ochreGrad)" stroke="url(#shikharaGrad)" strokeWidth="2" />
        {/* Layer 2 */}
        <rect x="935" y="535" width="150" height="25" rx="5" fill="url(#shikharaGrad)" stroke="url(#goldGrad)" strokeWidth="1.2" />
        {/* Layer 3 */}
        <rect x="960" y="510" width="100" height="25" rx="5" fill="url(#ochreGrad)" stroke="url(#shikharaGrad)" strokeWidth="1.2" />
        {/* Layer 4 (Top platform) */}
        <rect x="985" y="485" width="50" height="25" rx="4" fill="url(#goldGrad)" stroke="#B57A25" strokeWidth="1" />

        {/* Detailed golden highlight trim lines */}
        <line x1="920" y1="570" x2="1100" y2="570" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.5" />
        <line x1="945" y1="547" x2="1075" y2="547" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.5" />

        {/* Unified Side Shadow over Bhoga Mandapa's right half */}
        <path 
          d="M 1010,485 
             L 1035,485 L 1060,510 L 1085,535 L 1110,560 L 1110,580 L 1090,680 
             L 1010,680 Z" 
          fill="url(#stoneShadow)" 
          opacity="0.35" 
        />

        {/* Cozy nested arch entrance (Bhoga Mandapa Portal) */}
        <path d="M 985,680 L 985,622 A 25,25 0 0,1 1035,622 L 1035,680 Z" fill="url(#ochreGrad)" />
        <path d="M 995,680 L 995,630 A 15,15 0 0,1 1025,630 L 1025,680 Z" fill="url(#doorGrad)" />
        
        {/* Small gold medallion */}
        <circle cx="1010" cy="595" r="7" fill="url(#goldGrad)" />
        <circle cx="1010" cy="595" r="4" fill="#801010" />

        {/* Bhoga Mandapa Crown (Golden Kalasha) */}
        <circle cx="1010" cy="472" r="8" fill="url(#goldGrad)" stroke="#B57A25" strokeWidth="1" />
        <line x1="1010" y1="464" x2="1010" y2="452" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* ============================================== */}
      {/* 6. SILHOUETTE GLIDING BIRDS (TWILIGHT FLOCK)   */}
      {/* ============================================== */}
      <g id="twilight-flying-birds" pointerEvents="none">
        {/* Bird 1 - Large leader */}
        <g className="gliding-bird" style={{ animationDelay: '0s' }}>
          <path 
            d="M 0,2 C 7,0 12,3 15,8 C 20,1 24,2 21,5 C 18,7 15,10 12,13 L 14,10 C 10,9 5,6 0,2 Z" 
            fill="#4A1808" 
            opacity="0.85" 
            transform="translate(680, 130) scale(1.15) rotate(5)"
          />
        </g>
        {/* Bird 2 - Medium follower */}
        <g className="gliding-bird" style={{ animationDelay: '1.5s' }}>
          <path 
            d="M 0,2 C 7,0 12,3 15,8 C 20,1 24,2 21,5 C 18,7 15,10 12,13 L 14,10 C 10,9 5,6 0,2 Z" 
            fill="#4A1808" 
            opacity="0.72" 
            transform="translate(740, 160) scale(0.9) rotate(8)"
          />
        </g>
        {/* Bird 3 - Small distant */}
        <g className="gliding-bird" style={{ animationDelay: '3s' }}>
          <path 
            d="M 0,2 C 7,0 12,3 15,8 C 20,1 24,2 21,5 C 18,7 15,10 12,13 L 14,10 C 10,9 5,6 0,2 Z" 
            fill="#4A1808" 
            opacity="0.6" 
            transform="translate(790, 125) scale(0.65) rotate(3)"
          />
        </g>
        {/* Bird 4 - Medium-small trailing */}
        <g className="gliding-bird" style={{ animationDelay: '0.8s' }}>
          <path 
            d="M 0,2 C 7,0 12,3 15,8 C 20,1 24,2 21,5 C 18,7 15,10 12,13 L 14,10 C 10,9 5,6 0,2 Z" 
            fill="#4A1808" 
            opacity="0.75" 
            transform="translate(615, 175) scale(0.95) rotate(6)"
          />
        </g>
      </g>
      {/* ========================================== */}
      {/* 7. FESTIVE MARIGOLD GARLANDS (TORANS)      */}
      {/* ========================================== */}
      {/* Draping Saffron/Gold Flower Garlands (Torans) hugging the eaves dynamically */}
      <g id="festive-marigold-torans" strokeLinecap="round">
        {/* Vimana Wall Garlands */}
        <path d="M 162,500 Q 180,512 200,500 Q 220,512 240,500 Q 260,512 280,500" stroke="url(#marigoldGrad)" strokeWidth="4.5" fill="none" />
        <path d="M 280,500 Q 300,512 320,500 Q 340,512 360,500 Q 380,512 398,500" stroke="url(#marigoldGrad)" strokeWidth="4.5" fill="none" />

        {/* Jagamohana Eaves Garlands */}
        <path d="M 382,532 Q 410,546 440,532 Q 470,546 500,532" stroke="url(#marigoldGrad)" strokeWidth="4.5" fill="none" />
        <path d="M 500,532 Q 530,546 560,532 Q 590,546 620,532 Q 650,546 680,532 Q 690,536 718,532" stroke="url(#marigoldGrad)" strokeWidth="4.5" fill="none" />

        {/* Nata Mandapa Eaves Garlands */}
        <path d="M 662,562 Q 690,576 720,562 Q 750,576 780,562 Q 810,576 840,562" stroke="url(#marigoldGrad)" strokeWidth="4.5" fill="none" />
        <path d="M 840,562 Q 870,576 900,562 Q 920,576 938,562" stroke="url(#marigoldGrad)" strokeWidth="4.5" fill="none" />

        {/* Bhoga Mandapa Eaves Garlands */}
        <path d="M 912,592 Q 935,606 960,592 Q 985,606 1010,592" stroke="url(#marigoldGrad)" strokeWidth="4.5" fill="none" />
        <path d="M 1010,592 Q 1035,606 1060,592 Q 1085,606 1108,592" stroke="url(#marigoldGrad)" strokeWidth="4.5" fill="none" />

        {/* Marigold Drop Valley Dots - Map through calculated arrays for perfect layout */}
        {marigoldGarlandPoints.map((pt, idx) => (
          <g key={idx}>
            {/* Hanging Saffron-Gold Marigold ball */}
            <circle cx={pt.cx} cy={pt.cy} r="4.5" fill="url(#marigoldGrad)" />
            {/* Hanging Green mango leaf drop */}
            <path d={`M ${pt.cx},${pt.cy + 4} Q ${pt.cx - 2},${pt.cy + 9} ${pt.cx},${pt.cy + 13} Q ${pt.cx + 2},${pt.cy + 9} ${pt.cx},${pt.cy + 4} Z`} fill="#2E7D32" />
          </g>
        ))}
      </g>

      {/* ============================================== */}
      {/* 8. BASE BOUNDARY WALLS & DECORATIVE BANDS      */}
      {/* ============================================== */}
      <g id="temple-foundation-platform">
        {/* Base Layer 3 (Highest platform trim) */}
        <rect x="120" y="680" width="960" height="18" rx="8" fill="url(#goldGrad)" stroke="#B57A25" strokeWidth="2.5" />
        
        {/* Base Layer 2 (Main terracotta platform) */}
        <rect x="100" y="698" width="1000" height="24" rx="10" fill="url(#shikharaGrad)" />
        <rect x="100" y="698" width="1000" height="24" rx="10" fill="url(#stoneShadow)" />
        {/* Horizontal gold string line through middle platform */}
        <line x1="110" y1="710" x2="1090" y2="710" stroke="url(#goldGrad)" strokeWidth="2.5" />

        {/* Base Layer 1 (Thickest, lowest brown foundation stone) */}
        <rect x="80" y="722" width="1040" height="26" rx="12" fill="url(#foundationGrad)" />
        <rect x="80" y="722" width="1040" height="26" rx="12" fill="url(#stoneShadow)" />

        {/* Swaying decorative marigold bells along the platform */}
        {/* Bell 1 */}
        <g className="sway-bell" style={{ transformOrigin: '220px 698px' }}>
          <line x1="220" y1="698" x2="220" y2="706" stroke="url(#goldGrad)" strokeWidth="1.5" />
          <circle cx="220" cy="707" r="4.5" fill="url(#marigoldGrad)" />
        </g>
        {/* Bell 2 */}
        <g className="sway-bell" style={{ transformOrigin: '380px 698px' }}>
          <line x1="380" y1="698" x2="380" y2="706" stroke="url(#goldGrad)" strokeWidth="1.5" />
          <circle cx="380" cy="707" r="4.5" fill="url(#marigoldGrad)" />
        </g>
        {/* Bell 3 */}
        <g className="sway-bell" style={{ transformOrigin: '560px 698px' }}>
          <line x1="560" y1="698" x2="560" y2="706" stroke="url(#goldGrad)" strokeWidth="1.5" />
          <circle cx="560" cy="707" r="4.5" fill="url(#marigoldGrad)" />
        </g>
        {/* Bell 4 */}
        <g className="sway-bell" style={{ transformOrigin: '760px 698px' }}>
          <line x1="760" y1="698" x2="760" y2="706" stroke="url(#goldGrad)" strokeWidth="1.5" />
          <circle cx="760" cy="707" r="4.5" fill="url(#marigoldGrad)" />
        </g>
        {/* Bell 5 */}
        <g className="sway-bell" style={{ transformOrigin: '960px 698px' }}>
          <line x1="960" y1="698" x2="960" y2="706" stroke="url(#goldGrad)" strokeWidth="1.5" />
          <circle cx="960" cy="707" r="4.5" fill="url(#marigoldGrad)" />
        </g>
      </g>
    </svg>
  );
}
