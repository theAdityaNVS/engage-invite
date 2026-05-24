import { motion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import MandalaPattern from '@/components/shared/MandalaPattern';
import { ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

function RipplePin({ x, y, color = '#D4A843', label }) {
  return (
    <g>
      {[1, 2, 3].map((i) => (
        <circle key={i} cx={x} cy={y} r={8 + i * 6}
          stroke={color} strokeWidth="1" fill="none"
          style={{ animation: `ripplePulse 2s ${i * 0.5}s ease-out infinite` }}
        />
      ))}
      <path d={`M${x} ${y - 18} C${x - 10} ${y - 18} ${x - 10} ${y - 8} ${x} ${y} C${x + 10} ${y - 8} ${x + 10} ${y - 18} ${x} ${y - 18}Z`}
        fill={color} opacity="0.9"
      />
      <circle cx={x} cy={y - 14} r="4" fill="rgba(26,37,53,0.4)" />
      <text x={x} y={y + 16} textAnchor="middle"
        fontFamily="Lora, serif" fontSize="9" fill="#5A2A10" fontStyle="italic">
        {label}
      </text>
    </g>
  );
}

function VenueMapSVG() {
  return (
    <svg viewBox="0 0 500 320" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 480, borderRadius: 8 }}
      aria-label="Map to venue"
    >
      {/* Parchment background */}
      <rect width="500" height="320" rx="8" fill="#FDF6E0" />
      <rect x="6" y="6" width="488" height="308" rx="6" stroke="rgba(212,168,67,0.45)" strokeWidth="1.5" fill="none"/>

      {/* Nandankanan Road — main E-W artery */}
      <path d="M0 130 L500 130" stroke="rgba(196,87,42,0.55)" strokeWidth="10" strokeLinecap="round"/>
      <path d="M0 130 L500 130" stroke="rgba(253,246,224,0.4)" strokeWidth="3" strokeDasharray="20 14" strokeLinecap="round"/>
      <text x="380" y="122" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="rgba(90,42,16,0.7)">Nandankanan Road</text>

      {/* Jaydev Vihar road — N-S */}
      <path d="M260 130 L260 320" stroke="rgba(196,87,42,0.4)" strokeWidth="7" strokeLinecap="round"/>
      <path d="M260 130 L260 320" stroke="rgba(253,246,224,0.3)" strokeWidth="2.5" strokeDasharray="16 12" strokeLinecap="round"/>
      <text x="265" y="250" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="rgba(90,42,16,0.6)" transform="rotate(90 265 250)">Jaydev Vihar</text>

      {/* Secondary roads */}
      <path d="M260 130 L420 60"  stroke="rgba(196,87,42,0.3)" strokeWidth="5" strokeLinecap="round"/>
      <path d="M260 130 L80 80"   stroke="rgba(196,87,42,0.3)" strokeWidth="5" strokeLinecap="round"/>

      {/* Direction labels */}
      <text x="420" y="52" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="rgba(90,42,16,0.55)">To Nandankanan ↗</text>
      <text x="20"  y="72" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="rgba(90,42,16,0.55)">← City Centre</text>
      <text x="180" y="312" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="rgba(90,42,16,0.55)">↓ NH-16</text>

      {/* Kalinga Hospital landmark */}
      <rect x="50" y="148" width="70" height="30" rx="3" fill="rgba(212,168,67,0.1)" stroke="rgba(212,168,67,0.3)" strokeWidth="1"/>
      <text x="85" y="160" textAnchor="middle" fontFamily="Lora, serif" fontSize="8" fill="rgba(90,42,16,0.6)">Kalinga</text>
      <text x="85" y="172" textAnchor="middle" fontFamily="Lora, serif" fontSize="8" fill="rgba(90,42,16,0.6)">Hospital ✚</text>

      {/* Temple pin */}
      <RipplePin x={220} y={186} color="#C4572A" label={ENGAGEMENT.TEMPLE_NAME || 'Ramanarayan Temple'} />

      {/* Hotel pin */}
      <RipplePin x={290} y={218} color="#D4A843" label={ENGAGEMENT.VENUE_NAME} />

      {/* Compass rose */}
      <g transform="translate(460, 40)">
        <circle cx="0" cy="0" r="14" fill="rgba(253,246,224,0.8)" stroke="rgba(212,168,67,0.4)" strokeWidth="1"/>
        <text x="0" y="-5" textAnchor="middle" fontFamily="serif" fontSize="9" fill="#5A2A10">N</text>
        <path d="M0 -12 L2 0 L-2 0Z" fill="rgba(196,87,42,0.6)"/>
      </g>
    </svg>
  );
}

export default function RouteCTA() {
  const { t } = useLanguage();

  return (
    <section id="section-map" style={{ background: 'var(--saffron)', padding: 'clamp(2.5rem, 6vw, 4rem) 1.5rem', position: 'relative', overflow: 'hidden' }}>
      <MandalaPattern color="var(--gold-light)" opacity={0.22} />
      <ScrollReveal>
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{
            fontFamily: "'Lora', serif", fontSize: '0.7rem',
            color: 'var(--saffron-text)', opacity: 0.6,
            letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '0.5rem',
          }}>{t('venue_label')}</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            color: '#D4A843', letterSpacing: '0.06em', marginBottom: '0.5rem',
          }}>{ENGAGEMENT.VENUE_NAME}</h2>
          <p style={{
            fontFamily: "'Lora', serif", fontStyle: 'italic',
            fontSize: 'clamp(0.82rem, 2vw, 0.95rem)',
            color: 'var(--saffron-text)', opacity: 0.75, marginBottom: '1.8rem',
          }}>
            {ENGAGEMENT.VENUE_ADDRESS}
          </p>

          <VenueMapSVG />

          <motion.a
            href={ENGAGEMENT.VENUE_MAPS_URL}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(212,168,67,0.15)', borderColor: 'rgba(212,168,67,0.85)' }} 
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-block', marginTop: '1.4rem',
              padding: '0.75rem 2.2rem',
              background: 'rgba(255,248,240,0.12)',
              border: '1.5px solid rgba(212,168,67,0.5)',
              color: '#D4A843',
              fontFamily: "'Lora', serif", fontSize: '0.82rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              textDecoration: 'none', borderRadius: '4px',
              transition: 'color 0.3s, background-color 0.3s, border-color 0.3s',
            }}
          >
            {t('navigate_label')}
          </motion.a>
        </div>
      </ScrollReveal>
    </section>
  );
}
