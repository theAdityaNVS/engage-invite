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
    <div 
      className="royal-frame-container"
      style={{ 
        position: 'relative', 
        width: 240, 
        height: 310, 
        display: 'inline-block',
        cursor: 'pointer'
      }}
    >
      {/* Photo inside arch, clipped to Jharokha shape */}
      <div style={{
        position: 'absolute',
        inset: 0,
        width: 240,
        height: 310,
        clipPath: 'url(#royal-arch-clip)',
        overflow: 'hidden',
        zIndex: 1,
      }}>
        {children}
      </div>

      {/* SVG Jharokha frame overlay */}
      <svg
        viewBox="0 0 240 310"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          zIndex: 10,
        }}
        aria-hidden="true"
      >
        <defs>
          {/* Clip path for the photo */}
          <clipPath id="royal-arch-clip">
            <path d="M24 286 L24 135 C24 116, 34 105, 48 95 C48 81, 68 67, 84 59 C84 45, 106 35, 120 30 C134 35, 156 45, 156 59 C172 67, 192 81, 192 95 C206 105, 216 116, 216 135 L216 286 Z" />
          </clipPath>

          {/* Metallic Gold Gradients */}
          <linearGradient id="gold-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8F681E" />
            <stop offset="20%" stopColor="#D4A843" />
            <stop offset="40%" stopColor="#FFE593" />
            <stop offset="60%" stopColor="#D4A843" />
            <stop offset="80%" stopColor="#FFF3CD" />
            <stop offset="100%" stopColor="#8F681E" />
          </linearGradient>
          
          <linearGradient id="gold-light" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4A843" />
            <stop offset="50%" stopColor="#FFF3CD" />
            <stop offset="100%" stopColor="#9B7224" />
          </linearGradient>

          {/* Glare Gradient */}
          <linearGradient id="glare-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        <style>{`
          .royal-frame-container {
            transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25), 0 1px 3px rgba(212, 168, 67, 0.15);
            border-radius: 16px;
            background: rgba(139, 26, 43, 0.08); /* subtle dark red shadow backdrop */
          }
          .royal-frame-container:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4), 0 2px 10px rgba(212, 168, 67, 0.25);
          }
          .glare-path {
            transform: translateX(-150px);
            transition: transform 0s;
          }
          .royal-frame-container:hover .glare-path {
            transform: translateX(350px);
            transition: transform 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          .sway-bell {
            animation: bellSway 4s ease-in-out infinite;
            transform-origin: 120px 24px;
          }
          @keyframes bellSway {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
          }
        `}</style>

        {/* 1. Outer Card Background & Border */}
        {/* Burgundy frosted back card */}
        <rect x="6" y="6" width="228" height="298" rx="16" fill="rgba(69, 13, 22, 0.45)" stroke="url(#gold-metallic)" strokeWidth="2.5" />
        
        {/* Inner concentric dotted gold border */}
        <rect x="12" y="12" width="216" height="286" rx="11" stroke="url(#gold-light)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

        {/* 2. Corner Floral filigree ornaments inside card */}
        {/* Top-Left Ornament */}
        <g transform="translate(14, 14)">
          <path d="M0 0 C15 0, 20 5, 20 20 C20 30, 10 35, 0 35" stroke="url(#gold-light)" strokeWidth="1" fill="none" opacity="0.8" />
          <path d="M0 0 C8 0, 12 4, 12 12 C12 18, 6 22, 0 22" stroke="url(#gold-metallic)" strokeWidth="0.75" fill="none" opacity="0.5" />
          <circle cx="20" cy="20" r="1.5" fill="#FFF5D6" />
          <circle cx="12" cy="12" r="1" fill="#FFF5D6" />
        </g>
        {/* Top-Right Ornament */}
        <g transform="translate(226, 14) scale(-1, 1)">
          <path d="M0 0 C15 0, 20 5, 20 20 C20 30, 10 35, 0 35" stroke="url(#gold-light)" strokeWidth="1" fill="none" opacity="0.8" />
          <path d="M0 0 C8 0, 12 4, 12 12 C12 18, 6 22, 0 22" stroke="url(#gold-metallic)" strokeWidth="0.75" fill="none" opacity="0.5" />
          <circle cx="20" cy="20" r="1.5" fill="#FFF5D6" />
          <circle cx="12" cy="12" r="1" fill="#FFF5D6" />
        </g>
        {/* Bottom-Left Star */}
        <path d="M 18 292 L 20 290 L 18 288 L 16 290 Z" fill="url(#gold-light)" />
        {/* Bottom-Right Star */}
        <path d="M 222 292 L 224 290 L 222 288 L 220 290 Z" fill="url(#gold-light)" />

        {/* 3. The Arch Frame Overlay */}
        {/* Outer arch gold bezel */}
        <path
          d="M21 286 L21 135 C21 113, 31 102, 45 92 C45 77, 65 63, 81 55 C81 40, 103 30, 120 25 C137 30, 159 40, 159 55 C175 63, 195 77, 195 92 C209 102, 219 113, 219 135 L219 286"
          stroke="url(#gold-metallic)"
          strokeWidth="3.5"
          fill="none"
        />
        {/* Inner arch gold trim */}
        <path
          d="M25 286 L25 135 C25 118, 35 107, 49 97 C49 83, 69 69, 85 61 C85 47, 107 37, 120 32 C133 37, 155 47, 155 61 C171 69, 191 83, 191 97 C205 107, 215 118, 215 135 L215 286"
          stroke="url(#gold-light)"
          strokeWidth="1.25"
          fill="none"
          opacity="0.8"
        />

        {/* 4. Imperial Crown Top (Traditional Mughal Floral / Crest motif) */}
        {/* Stepped finial pedestal */}
        <path d="M110 25 H130 V27 H110 Z" fill="url(#gold-metallic)" />
        {/* Dome crown top */}
        <path d="M114 25 C114 12, 126 12, 126 25 Z" fill="url(#gold-metallic)" stroke="url(#gold-light)" strokeWidth="0.5" />
        <circle cx="120" cy="10" r="2.5" fill="#FFF3CD" filter="drop-shadow(0 0 3px #D4A843)" />
        {/* Flanking scroll flourishes */}
        <path d="M96 29 Q80 20 70 29 Q60 38 72 38 Q82 38 86 29" stroke="url(#gold-metallic)" strokeWidth="1" fill="none" />
        <path d="M144 29 Q160 20 170 29 Q180 38 168 38 Q158 38 154 29" stroke="url(#gold-metallic)" strokeWidth="1" fill="none" />

        {/* 5. Swaying Traditional Gold Bell */}
        <g className="sway-bell">
          <line x1="120" y1="25" x2="120" y2="38" stroke="url(#gold-metallic)" strokeWidth="1" />
          <path d="M116 46 L124 46 C124 41, 122 38, 120 38 C118 38, 116 41, 116 46 Z" fill="url(#gold-metallic)" stroke="#8F681E" strokeWidth="0.5" />
          <circle cx="120" cy="48" r="1" fill="#FFE593" />
        </g>

        {/* 6. Gold Plaque Base Panel */}
        <rect x="75" y="280" width="90" height="12" rx="6" fill="url(#gold-metallic)" stroke="#8F681E" strokeWidth="0.5" />
        <line x1="85" y1="286" x2="155" y2="286" stroke="#8F681E" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
        <circle cx="120" cy="286" r="1.5" fill="#8F681E" />

        {/* 7. Hover Glare Sweep Path */}
        {/* Clipped to the arch shape so it only sweeps across the photo */}
        <g clipPath="url(#royal-arch-clip)">
          <rect
            className="glare-path"
            x="0"
            y="0"
            width="80"
            height="310"
            fill="url(#glare-grad)"
            transform="skewX(-25)"
          />
        </g>
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
                    width="240px"
                    height="310px"
                    alt={`${COUPLE.GROOM_NAME} & ${COUPLE.BRIDE_NAME}`}
                    index={1}
                    src={MEDIA.COUPLE_PHOTO || undefined}
                    style={{ width: '240px', height: '310px', objectFit: 'cover' }}
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
