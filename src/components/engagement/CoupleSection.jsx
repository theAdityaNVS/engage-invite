import ScrollReveal from '@/components/shared/ScrollReveal';
import AnimatedPhoto from '@/components/shared/AnimatedPhoto';
import MandalaPattern from '@/components/shared/MandalaPattern';
import SectionHeader from '@/components/shared/SectionHeader';
import PhotoCarousel from '@/components/shared/PhotoCarousel';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { COUPLE, MEDIA, TRANSLATIONS } from '@/config';

/* Ornate arch frame — Mughal/South Indian style SVG */
function OrnateArchFrame({ children }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Photo inside arch */}
      <div style={{
        width: 220,
        height: 290,
        borderRadius: '50% 50% 8px 8px / 40% 40% 8px 8px',
        overflow: 'hidden',
        border: '3px solid rgba(212,168,67,0.6)',
        boxShadow: '0 0 0 6px rgba(212,168,67,0.15), 0 8px 32px rgba(139,34,64,0.3)',
      }}>
        {children}
      </div>

      {/* SVG arch frame overlay */}
      <svg
        viewBox="0 0 240 310"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: '-14px -14px -10px -14px', pointerEvents: 'none', width: 'calc(100% + 28px)' }}
        aria-hidden="true"
      >
        {/* Arch outer */}
        <path d="M20 310 L20 140 Q20 20 120 20 Q220 20 220 140 L220 310"
          stroke="#D4A843" strokeWidth="2" fill="none" opacity="0.7"/>
        {/* Arch decorative inner */}
        <path d="M32 310 L32 145 Q32 40 120 40 Q208 40 208 145 L208 310"
          stroke="#D4A843" strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="4 3"/>
        {/* Top finial */}
        <circle cx="120" cy="20" r="6" fill="#D4A843" opacity="0.8"/>
        <circle cx="120" cy="20" r="10" stroke="#D4A843" strokeWidth="1.5" fill="none" opacity="0.4"/>
        {/* Side lotus buds */}
        {[60, 180].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy="80" rx="6" ry="9" fill="rgba(212,168,67,0.5)"/>
            <ellipse cx={x} cy="80" rx="3" ry="6" fill="rgba(212,168,67,0.7)"/>
          </g>
        ))}
        {/* Base ornaments */}
        <path d="M20 295 Q70 285 120 290 Q170 285 220 295" stroke="#D4A843" strokeWidth="1.5" fill="none" opacity="0.5"/>
      </svg>
    </div>
  );
}

/* Embossed floral pattern for rose section */
function FloralPattern() {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.1 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="floral" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="20" stroke="rgba(255,248,240,0.2)" strokeWidth="1.5" fill="none"/>
          <circle cx="50" cy="50" r="12" stroke="rgba(255,248,240,0.2)" strokeWidth="1" fill="none"/>
          {[0,60,120,180,240,300].map((a) => {
            const cx = parseFloat((50 + 26 * Math.cos(a * Math.PI / 180)).toFixed(4));
            const cy = parseFloat((50 + 26 * Math.sin(a * Math.PI / 180)).toFixed(4));
            return (
              <ellipse key={a}
                cx={cx}
                cy={cy}
                rx="7" ry="11"
                transform={`rotate(${a} ${cx} ${cy})`}
                fill="none" stroke="rgba(255,248,240,0.2)" strokeWidth="1" />
            );
          })}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#floral)" />
    </svg>
  );
}

export default function CoupleSection() {
  const { t, lang } = useLanguage();
  const names = TRANSLATIONS.NAMES[lang] || TRANSLATIONS.NAMES.en;

  return (
    <section style={{
      background: 'var(--rose)',
      padding: 'clamp(4rem, 10vw, 6rem) 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <MandalaPattern color="var(--gold-light)" opacity={0.16} />
      <FloralPattern />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Meet the Couple Block */}
        <div style={{ maxWidth: '1000px', margin: '0 auto clamp(3.5rem, 8vw, 5.5rem)' }}>
          <ScrollReveal>
            <SectionHeader
              eyebrow={t('our_story_label')}
              title={t('couple_heading')}
              eyebrowType="serif"
              theme="burgundy"
              style={{ marginBottom: '3rem' }}
            />
          </ScrollReveal>

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '3rem',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Ornate arch with couple portrait */}
            <ScrollReveal delay={0.1}>
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <OrnateArchFrame>
                  <AnimatedPhoto
                    width="220px"
                    height="290px"
                    alt={`${COUPLE.GROOM_NAME} & ${COUPLE.BRIDE_NAME}`}
                    index={1}
                    src={MEDIA.COUPLE_PHOTO || undefined}
                    style={{ width: '220px', height: '290px', objectFit: 'cover' }}
                  />
                </OrnateArchFrame>
              </motion.div>
            </ScrollReveal>

            {/* Message */}
            <ScrollReveal delay={0.25} style={{ flex: '1 1 300px', maxWidth: '460px' }}>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', top: '-0.5rem', left: '-0.25rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '5rem', color: 'rgba(255,248,240,0.15)', opacity: 1,
                  lineHeight: 1, userSelect: 'none',
                }}>
                  "
                </span>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                  color: 'rgba(255,248,240,0.9)',
                  lineHeight: 1.85,
                  position: 'relative', zIndex: 1,
                  paddingLeft: '1rem',
                }}>
                  {t('couple_message')}
                </p>
                <div style={{
                  marginTop: '1.25rem',
                  fontFamily: 'var(--font-display)',
                  color: 'rgba(255,248,240,0.7)',
                  fontSize: '1.1rem',
                  textAlign: 'right',
                }}>
                  — {names.groom} &amp; {names.bride}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Elegant Gold Separator Line */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto clamp(3rem, 7vw, 4.5rem)',
          maxWidth: '400px',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.35), transparent)' }} />
          <span style={{ color: 'rgba(212,168,67,0.5)', padding: '0 1.25rem', fontSize: '0.85rem', letterSpacing: '0.15em' }}>✦ ❁ ✦</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.35), transparent)' }} />
        </div>

        {/* Moments Together (Gallery) Block */}
        <div>
          <ScrollReveal>
            <SectionHeader
              eyebrow={t('memories_label')}
              title={t('gallery_heading')}
              subtitle={t('gallery_subheading')}
              eyebrowType="serif"
              theme="burgundy"
              style={{ marginBottom: '2.5rem' }}
            />
          </ScrollReveal>

          <div style={{ padding: '0 1rem' }}>
            <PhotoCarousel photos={MEDIA.MOMENTS || []} />
          </div>
        </div>

      </div>
    </section>
  );
}
