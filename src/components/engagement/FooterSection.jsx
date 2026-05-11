import { COUPLE, ENGAGEMENT } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

/*
 * Tirupati-style South Indian Dravidian gopuram — night version.
 * Layered stepped pyramid tower with warm amber internal glow.
 * PLACEHOLDER — swap with AI-generated art at:
 *   public/illustrations/tirupati-gopuram-night.png
 * Midjourney prompt:
 *   "South Indian Dravidian gopuram temple tower at night, warm amber
 *    golden internal lighting glowing from within, detailed sculptures
 *    on layered tiers, illustration style, dark indigo sky, stars,
 *    wide shot, cinematic, oil painting texture"
 */
function TirupatiGopuramNight() {
  return (
    <svg
      viewBox="0 0 700 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 700, display: 'block', margin: '0 auto' }}
      aria-label="Tirupati gopuram silhouette at night"
    >
      {/* Warm glow behind gopuram */}
      <ellipse cx="350" cy="320" rx="280" ry="70" fill="rgba(255,160,60,0.15)" />
      <ellipse cx="350" cy="310" rx="200" ry="50" fill="rgba(255,180,80,0.1)" />

      {/* Base platform */}
      <rect x="50" y="320" width="600" height="26" rx="3" fill="#2A1A0A" />
      <rect x="70" y="306" width="560" height="16" rx="2" fill="#231508" />

      {/* Gopuram — dramatically wide layered tiers (Dravidian style) */}
      {/* Tier 1 (widest) */}
      <rect x="100" y="278" width="500" height="30" rx="3" fill="#1E1208" />
      {/* Tier 2 */}
      <rect x="130" y="250" width="440" height="30" rx="3" fill="#211508" />
      {/* Tier 3 */}
      <rect x="160" y="222" width="380" height="30" rx="3" fill="#241708" />
      {/* Tier 4 */}
      <rect x="185" y="197" width="330" height="27" rx="3" fill="#271A0A" />
      {/* Tier 5 */}
      <rect x="208" y="174" width="284" height="25" rx="3" fill="#2A1C0B" />
      {/* Tier 6 */}
      <rect x="228" y="153" width="244" height="23" rx="3" fill="#2D1F0C" />
      {/* Tier 7 */}
      <rect x="246" y="134" width="208" height="21" rx="3" fill="#30220D" />
      {/* Tier 8 */}
      <rect x="262" y="117" width="176" height="19" rx="2" fill="#32240E" />
      {/* Tier 9 */}
      <rect x="276" y="102" width="148" height="17" rx="2" fill="#34260F" />
      {/* Tier 10 */}
      <rect x="289" y="89"  width="122" height="15" rx="2" fill="#362810" />
      {/* Tier 11 */}
      <rect x="300" y="78"  width="100" height="13" rx="2" fill="#382A11" />
      {/* Tier 12 */}
      <rect x="310" y="68"  width="80"  height="12" rx="2" fill="#3A2C12" />

      {/* Barrel vault top (shikhara cap) */}
      <ellipse cx="350" cy="60" rx="42" ry="16" fill="#3A2C12" />
      <ellipse cx="350" cy="54" rx="28" ry="11" fill="#C07830" opacity="0.7" />

      {/* Kalasha finial */}
      <ellipse cx="350" cy="46" rx="12" ry="8"  fill="#D4A843" opacity="0.9" />
      <ellipse cx="350" cy="39" rx="8"  ry="6"  fill="#E8C060" opacity="0.9" />
      <circle  cx="350" cy="33" r="5"           fill="#F0D68A" />
      <line x1="350" y1="28" x2="350" y2="18"  stroke="#D4A843" strokeWidth="2" />
      <polygon points="350,18 356,24 350,22 344,24" fill="#D4A843" />

      {/* Internal warm glow from windows/niches — amber light emanating */}
      {[130, 170, 210, 250, 290, 330, 370, 410, 450, 490, 530, 570].map((x, i) => {
        const tier = Math.floor(i / 2);
        const y = 278 - tier * 28;
        return (
          <rect key={x}
            x={x} y={y + 5}
            width="18" height={20 - tier * 1}
            rx="2"
            fill={`rgba(255,${160 - tier * 5},${60 - tier * 3},${0.4 - tier * 0.02})`}
          />
        );
      })}

      {/* Amber glow reflections on each tier */}
      {[0, 1, 2, 3, 4, 5].map((t) => (
        <rect key={t}
          x={100 + t * 30} y={278 - t * 28}
          width={500 - t * 60} height={3}
          fill={`rgba(255,160,60,${0.18 - t * 0.02})`}
        />
      ))}

      {/* Night sky stars near gopuram */}
      {[80, 150, 220, 480, 550, 620].map((x) => (
        <circle key={x} cx={x} cy={20 + (x % 40)} r={1.5} fill="rgba(255,248,240,0.6)" />
      ))}

      {/* Ground reflection */}
      <rect x="0" y="345" width="700" height="15" fill="rgba(255,120,40,0.06)" />
    </svg>
  );
}

export default function FooterSection() {
  const { t } = useLanguage();

  return (
    <footer style={{
      background: 'var(--navy)',
      textAlign: 'center',
      overflow: 'hidden',
      paddingTop: 'clamp(3rem, 7vw, 5rem)',
    }}>
      {/* Night gopuram illustration */}
      <div style={{ padding: '0 1rem', marginBottom: '-4px' }}>
        <img
          src="/illustrations/tirupati-gopuram-night.png"
          alt="Tirupati gopuram at night"
          style={{ width: '100%', maxWidth: 700, display: 'block', margin: '0 auto', objectFit: 'contain' }}
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
        />
        <div style={{ display: 'none' }}><TirupatiGopuramNight /></div>
      </div>

      {/* Footer text */}
      <div style={{
        padding: 'clamp(1.5rem, 4vw, 2.5rem) 1.5rem',
        borderTop: '1px solid rgba(212,168,67,0.12)',
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
