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
        border: '1px solid rgba(212,168,67,0.3)',
        boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.3), 0 12px 40px rgba(139,34,64,0.4)',
        position: 'relative',
        zIndex: 1,
      }}>
        {children}
      </div>

      {/* SVG arch frame overlay */}
      <svg
        viewBox="0 0 240 310"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          inset: '-14px -14px -10px -14px',
          pointerEvents: 'none',
          width: 'calc(100% + 28px)',
          zIndex: 10,
        }}
        aria-hidden="true"
      >
        <defs>
          {/* Metallic Gold Gradients */}
          <linearGradient id="gold-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9B7224" />
            <stop offset="25%" stopColor="#FFE593" />
            <stop offset="50%" stopColor="#D4A843" />
            <stop offset="75%" stopColor="#FFF3CD" />
            <stop offset="100%" stopColor="#8F681E" />
          </linearGradient>
          
          <linearGradient id="gold-light" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4A843" />
            <stop offset="50%" stopColor="#FFF3CD" />
            <stop offset="100%" stopColor="#9B7224" />
          </linearGradient>

          <radialGradient id="diya-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 235, 167, 1)" />
            <stop offset="40%" stopColor="rgba(212, 168, 67, 0.4)" />
            <stop offset="100%" stopColor="rgba(139, 26, 43, 0)" />
          </radialGradient>
        </defs>

        <style>{`
          .flicker-flame {
            animation: flameFlicker 2.5s ease-in-out infinite alternate;
            transform-origin: 120px 281px;
          }
          .sway-bell {
            animation: bellSway 4s ease-in-out infinite;
            transform-origin: 120px 24px;
          }
          @keyframes flameFlicker {
            0% { transform: scale(0.95, 0.93) rotate(-1.5deg); opacity: 0.85; }
            100% { transform: scale(1.05, 1.07) rotate(1.5deg); opacity: 1; }
          }
          @keyframes bellSway {
            0%, 100% { transform: rotate(-4deg); }
            50% { transform: rotate(4deg); }
          }
        `}</style>

        {/* 1. Left Pillar */}
        {/* Base Pedestal */}
        <path d="M10 290 H28 V296 H10 Z" fill="url(#gold-metallic)" stroke="#8F681E" strokeWidth="0.5" />
        <path d="M12 284 H26 V290 H12 Z" fill="url(#gold-metallic)" stroke="#8F681E" strokeWidth="0.5" />
        {/* Shaft */}
        <rect x="15" y="125" width="12" height="159" fill="url(#gold-light)" stroke="#8F681E" strokeWidth="0.5" />
        {/* Shaft Fluting Details */}
        <line x1="18" y1="126" x2="18" y2="283" stroke="#8F681E" strokeWidth="0.75" />
        <line x1="21" y1="126" x2="21" y2="283" stroke="#FFFFFF" strokeWidth="0.75" opacity="0.6" />
        <line x1="24" y1="126" x2="24" y2="283" stroke="#8F681E" strokeWidth="0.75" />
        {/* Capital */}
        <path d="M12 120 H26 V125 H12 Z" fill="url(#gold-metallic)" stroke="#8F681E" strokeWidth="0.5" />
        <path d="M10 114 H28 V120 H10 Z" fill="url(#gold-metallic)" stroke="#8F681E" strokeWidth="0.5" />

        {/* 2. Right Pillar */}
        {/* Base Pedestal */}
        <path d="M212 290 H230 V296 H212 Z" fill="url(#gold-metallic)" stroke="#8F681E" strokeWidth="0.5" />
        <path d="M214 284 H228 V290 H214 Z" fill="url(#gold-metallic)" stroke="#8F681E" strokeWidth="0.5" />
        {/* Shaft */}
        <rect x="213" y="125" width="12" height="159" fill="url(#gold-light)" stroke="#8F681E" strokeWidth="0.5" />
        {/* Shaft Fluting Details */}
        <line x1="216" y1="126" x2="216" y2="283" stroke="#8F681E" strokeWidth="0.75" />
        <line x1="219" y1="126" x2="219" y2="283" stroke="#FFFFFF" strokeWidth="0.75" opacity="0.6" />
        <line x1="222" y1="126" x2="222" y2="283" stroke="#8F681E" strokeWidth="0.75" />
        {/* Capital */}
        <path d="M214 120 H228 V125 H214 Z" fill="url(#gold-metallic)" stroke="#8F681E" strokeWidth="0.5" />
        <path d="M212 114 H230 V120 H212 Z" fill="url(#gold-metallic)" stroke="#8F681E" strokeWidth="0.5" />

        {/* 3. Base Threshold Beam */}
        <rect x="24" y="290" width="192" height="6" fill="url(#gold-metallic)" stroke="#8F681E" strokeWidth="0.5" />
        <rect x="20" y="296" width="200" height="4" fill="url(#gold-metallic)" />

        {/* 4. Arches */}
        {/* Outer Arch Ellipse */}
        <path
          d="M15 125 A 105 118 0 0 1 225 125"
          stroke="url(#gold-metallic)"
          strokeWidth="4"
          fill="none"
        />
        {/* Inner Arch Bezel */}
        <path
          d="M27 125 A 93 114 0 0 1 213 125"
          stroke="url(#gold-metallic)"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Intricate Inner Dotted Lace Arch */}
        <path
          d="M34 125 A 86 108 0 0 1 206 125"
          stroke="#FFF3CD"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
          opacity="0.8"
        />

        {/* 5. Palace Crown (Stepped Dome & Kalash Finial) */}
        {/* Miniature domes on side capitals */}
        <path d="M10 114 C10 106 28 106 28 114 Z" fill="url(#gold-metallic)" stroke="#8F681E" strokeWidth="0.5" />
        <path d="M212 114 C212 106 230 106 230 114 Z" fill="url(#gold-metallic)" stroke="#8F681E" strokeWidth="0.5" />
        {/* Center Gopuram/Kalash Crown */}
        <path d="M96 23 C96 6, 144 6, 144 23 Z" fill="url(#gold-metallic)" stroke="#8F681E" strokeWidth="0.5" />
        <rect x="110" y="5" width="20" height="3" fill="url(#gold-light)" />
        <circle cx="120" cy="3" r="3" fill="#FFF3CD" filter="drop-shadow(0 0 2px #D4A843)" />
        {/* Elegant scroll decorations flanking center Kalash */}
        <path d="M96 23 Q75 14 62 25 Q48 36 65 36 Q78 36 82 25" stroke="url(#gold-metallic)" fill="none" strokeWidth="1.5" />
        <path d="M144 23 Q165 14 178 25 Q192 36 175 36 Q162 36 158 25" stroke="url(#gold-metallic)" fill="none" strokeWidth="1.5" />

        {/* 6. Hanging Bell at Apex */}
        <g className="sway-bell">
          {/* Hanger thread */}
          <line x1="120" y1="23" x2="120" y2="35" stroke="url(#gold-metallic)" strokeWidth="1.5" />
          {/* Bell body */}
          <path d="M115 45 L125 45 C125 39, 123 35, 120 35 C117 35, 115 39, 115 45 Z" fill="url(#gold-metallic)" stroke="#8F681E" strokeWidth="0.5" />
          {/* Bell clapper */}
          <circle cx="120" cy="47" r="1.5" fill="#FFE593" />
        </g>

        {/* 7. Bottom Center Flickering Diya */}
        {/* Diya Glow */}
        <circle cx="120" cy="278" r="24" fill="url(#diya-glow)" />
        {/* Diya Brass Base */}
        <path
          d="M102 284 C102 294, 138 294, 138 284 C132 286, 108 286, 102 284 Z"
          fill="url(#gold-metallic)"
          stroke="#8F681E"
          strokeWidth="0.5"
        />
        {/* Small detail lines on Diya */}
        <path d="M107 285 Q120 290 133 285" stroke="#8F681E" strokeWidth="0.5" fill="none" />
        {/* Flickering Diya Flame */}
        <path
          className="flicker-flame"
          d="M120 284 C117 280, 116 272, 120 263 C124 272, 123 280, 120 284 Z"
          fill="url(#gold-light)"
          filter="drop-shadow(0 0 5px #D4A843)"
        />
        <path
          className="flicker-flame"
          d="M120 282 C118 279, 118 274, 120 268 C122 274, 122 279, 120 282 Z"
          fill="#FFFDF9"
          opacity="0.8"
        />
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
