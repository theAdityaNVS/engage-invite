import ScrollReveal from '@/components/shared/ScrollReveal';
import AnimatedPhoto from '@/components/shared/AnimatedPhoto';
import MandalaPattern from '@/components/shared/MandalaPattern';
import SectionHeader from '@/components/shared/SectionHeader';
import PhotoCarousel from '@/components/shared/PhotoCarousel';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { COUPLE, MEDIA, TRANSLATIONS } from '@/config';
import { useState, useEffect } from 'react';

/* Ornate arch frame — Mughal/South Indian style SVG */function OrnateArchFrame({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Float stars only on desktop to improve mobile scroll/paint performance
  const starsList = isMobile ? [] : [
    { top: '-15px', left: '30px', delay: 0, duration: 6, size: 14 },
    { top: '50px', left: '-20px', delay: 1.5, duration: 7, size: 16 },
    { top: '-20px', left: '190px', delay: 3, duration: 5.5, size: 15 },
    { top: '250px', left: '-15px', delay: 0.8, duration: 6.5, size: 14 },
    { top: '280px', left: '220px', delay: 2.2, duration: 8, size: 17 },
    { top: '120px', left: '235px', delay: 4.1, duration: 7.5, size: 15 },
  ];

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
      {/* Backing card background behind the photo */}
      <div style={{
        position: 'absolute',
        inset: 6,
        backgroundColor: 'rgba(69, 13, 22, 0.88)',
        borderRadius: '18px',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Photo inside frame, clipped to rounded rectangle */}
      <div style={{
        position: 'absolute',
        left: 12,
        top: 12,
        width: 216,
        height: 286,
        borderRadius: '14px',
        overflow: 'hidden',
        zIndex: 1,
      }}>
        {children}
      </div>

      {/* Floating Gold Sparkle Stars surrounding the frame */}
      {starsList.map((sp, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.9, 0.9, 0],
            scale: [0.7, 1.2, 1.2, 0.7],
            y: [0, -25, -50],
            x: [0, 12, -12, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: sp.duration,
            repeat: Infinity,
            delay: sp.delay,
            ease: "easeInOut",
          }}
          style={{
            position: 'absolute',
            top: sp.top,
            left: sp.left,
            width: sp.size,
            height: sp.size,
            pointerEvents: 'none',
            zIndex: 15,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <path
              d="M12 0 L15 9 L24 12 L15 15 L12 24 L9 15 L0 12 L9 9 Z"
              fill="url(#gold-metallic)"
            />
          </svg>
        </motion.div>
      ))}

      {/* SVG modern wedding card frame overlay */}
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
            <stop offset="50%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Clip path for the glare sweep */}
          <clipPath id="rect-clip">
            <rect x="12" y="12" width="216" height="286" rx="14" />
          </clipPath>
        </defs>

        <style>{`
          @keyframes auraPulse {
            0% { box-shadow: 0 12px 36px rgba(0, 0, 0, 0.25), 0 0 12px rgba(212, 168, 67, 0.15); }
            50% { box-shadow: 0 12px 36px rgba(0, 0, 0, 0.25), 0 0 25px rgba(212, 168, 67, 0.35); }
            100% { box-shadow: 0 12px 36px rgba(0, 0, 0, 0.25), 0 0 12px rgba(212, 168, 67, 0.15); }
          }
          .royal-frame-container {
            transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            animation: auraPulse 4s infinite ease-in-out;
            border-radius: 18px;
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
          @media (max-width: 768px) {
            .royal-frame-container {
              animation: none !important;
              backdrop-filter: none !important;
              -webkit-backdrop-filter: none !important;
              box-shadow: 0 12px 36px rgba(0, 0, 0, 0.25) !important;
            }
          }
          .royal-frame-container:hover {
            transform: translateY(-6px) scale(1.025);
            animation: none;
            box-shadow: 0 24px 50px rgba(0, 0, 0, 0.35), 0 0 32px rgba(212, 168, 67, 0.45);
          }
          .glare-path {
            transform: translateX(-150px);
            transition: transform 0s;
          }
          .royal-frame-container:hover .glare-path {
            transform: translateX(350px);
            transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
        `}</style>

        {/* 1. Outer Card Background & Border */}
        {/* Transparent interior back card to remove dark filter on photo */}
        <rect x="6" y="6" width="228" height="298" rx="18" fill="none" stroke="url(#gold-metallic)" strokeWidth="2.5" />
        
        {/* Inner concentric dotted gold border */}
        <rect x="12" y="12" width="216" height="286" rx="14" stroke="url(#gold-light)" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.45" />

        {/* 2. Photo frame bezel outlines */}
        {/* Outer photo bezel */}
        <rect x="10.5" y="10.5" width="219" height="289" rx="15.5" stroke="url(#gold-metallic)" strokeWidth="3" />
        {/* Inner photo bezel */}
        <rect x="12" y="12" width="216" height="286" rx="14" stroke="url(#gold-light)" strokeWidth="1.25" opacity="0.85" />
        {/* Inner dotted lace border inside photo area */}
        <rect x="15" y="15" width="210" height="280" rx="11" stroke="#FFF3CD" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.4" />

        {/* 3. Corner Sparkle Stars ✦ */}
        <g transform="translate(18, 18)">
          <path d="M0 -3 L0.75 -0.75 L3 0 L0.75 0.75 L0 3 L-0.75 0.75 L-3 0 L-0.75 -0.75 Z" fill="url(#gold-metallic)" opacity="0.8" />
        </g>
        <g transform="translate(222, 18)">
          <path d="M0 -3 L0.75 -0.75 L3 0 L0.75 0.75 L0 3 L-0.75 0.75 L-3 0 L-0.75 -0.75 Z" fill="url(#gold-metallic)" opacity="0.8" />
        </g>
        <g transform="translate(18, 292)">
          <path d="M0 -3 L0.75 -0.75 L3 0 L0.75 0.75 L0 3 L-0.75 0.75 L-3 0 L-0.75 -0.75 Z" fill="url(#gold-metallic)" opacity="0.8" />
        </g>
        <g transform="translate(222, 292)">
          <path d="M0 -3 L0.75 -0.75 L3 0 L0.75 0.75 L0 3 L-0.75 0.75 L-3 0 L-0.75 -0.75 Z" fill="url(#gold-metallic)" opacity="0.8" />
        </g>

        {/* Single elegant top-center star */}
        <g transform="translate(120, 10) scale(1.3)">
          <path d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z" fill="url(#gold-metallic)" />
        </g>
        <circle cx="120" cy="10" r="1.5" fill="#FFFDF9" opacity="0.8" />

        {/* 4. Hover Glare Sweep Path */}
        <g clipPath="url(#rect-clip)">
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
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <OrnateArchFrame>
                  <AnimatedPhoto
                    width="216px"
                    height="286px"
                    alt={`${COUPLE.GROOM_NAME} & ${COUPLE.BRIDE_NAME}`}
                    index={1}
                    src={MEDIA.COUPLE_PHOTO || undefined}
                    filter="none"
                    style={{ width: '216px', height: '286px', objectFit: 'cover' }}
                  />
                </OrnateArchFrame>
              </div>
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
