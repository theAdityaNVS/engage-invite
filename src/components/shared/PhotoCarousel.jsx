import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPhoto from './AnimatedPhoto';
import { useLanguage } from '@/hooks/useLanguage';

const ROTATIONS = [-3.5, 2.5, -2, 3.2];

export default function PhotoCarousel({ photos = [] }) {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Fallback to at least 3 placeholders if empty array
  const totalPhotos = Math.max(photos.length, 3);

  const CAPTIONS = useMemo(
    () => Array.from({ length: totalPhotos }, (_, i) => t(`photo_caption_${i + 1}`)),
    [t, totalPhotos]
  );
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (lightboxIndex !== null) {
      closeBtnRef.current?.focus();
    }
  }, [lightboxIndex]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextPhoto = useCallback(() => setLightboxIndex(i => (i + 1) % totalPhotos), [totalPhotos]);
  const prevPhoto = useCallback(() => setLightboxIndex(i => (i - 1 + totalPhotos) % totalPhotos), [totalPhotos]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, closeLightbox, nextPhoto, prevPhoto]);

  return (
    <>
      <style>{`
        .polaroid-card {
          transition: box-shadow 0.3s ease, transform 0.3s ease, z-index 0s;
          /* Default desktop transformation: include offset & rotation */
          transform: translateY(var(--desktop-offset)) rotate(var(--rotation));
        }
        
        /* On mobile/tablet, disable vertical offsets to keep layout clean and centered */
        @media (max-width: 768px) {
          .polaroid-card {
            transform: translateY(0px) rotate(var(--rotation)) !important;
            margin: 0.5rem 0;
          }
        }
      `}</style>

      {/* Board — Staggered Flex Grid */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '2.5rem',
      }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 'clamp(2rem, 5vw, 3.5rem)',
            padding: '2.5rem 1rem',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '1000px',
            width: '100%',
          }}
        >
          {Array.from({ length: totalPhotos }, (_, i) => {
            const rotation = ROTATIONS[i % ROTATIONS.length];
            const isEven = i % 2 === 0;
            // Alternate vertical offset on desktop
            const desktopOffset = isEven ? 16 : -16;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: isMobile ? 12 : 35, rotate: rotation - 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: rotation }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.12 }}
                whileHover={{
                  rotate: 0,
                  scale: 1.06,
                  y: isEven ? 6 : -26, // lift relative to the desktop offset
                  zIndex: 20,
                  boxShadow: '0 22px 48px rgba(0,0,0,0.28), 0 5px 15px rgba(0,0,0,0.12)',
                }}
                role="button"
                tabIndex={0}
                onClick={() => setLightboxIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLightboxIndex(i);
                  }
                }}
                className={`polaroid-card polaroid-card-${i}`}
                style={{
                  background: '#FFFEFC',
                  padding: '12px 12px 52px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.15), 0 3px 8px rgba(0,0,0,0.08)',
                  cursor: 'zoom-in',
                  position: 'relative',
                  flexShrink: 0,
                  zIndex: 1,
                  willChange: 'transform, opacity',
                  // CSS variables used for media queries
                  '--desktop-offset': `${desktopOffset}px`,
                  '--rotation': `${rotation}deg`,
                }}
              >
                <AnimatedPhoto
                  width="clamp(170px, 21vw, 210px)"
                  height="clamp(210px, 25vw, 260px)"
                  alt={CAPTIONS[i]}
                  index={i}
                  src={photos[i] || undefined}
                  style={{
                    width: 'clamp(170px, 21vw, 210px)',
                    height: 'clamp(210px, 25vw, 260px)',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: 52,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 12px',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-script)',
                    fontSize: '1.25rem',
                    color: 'rgba(45,24,16,0.65)',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                  }}>
                    {CAPTIONS[i]}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeLightbox}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(18,10,4,0.92)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'zoom-out',
            }}
          >
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.86, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#FFFEFC',
                padding: '14px 14px 60px',
                boxShadow: '0 32px 96px rgba(0,0,0,0.55)',
                cursor: 'default',
                maxWidth: '88vw',
              }}
            >
              <AnimatedPhoto
                width="min(360px, 78vw)"
                height="min(430px, 58vh)"
                alt={CAPTIONS[lightboxIndex]}
                index={lightboxIndex}
                src={photos[lightboxIndex] || undefined}
                style={{ display: 'block', objectFit: 'cover' }}
              />
              <div style={{
                textAlign: 'center',
                marginTop: '0.35rem',
                fontFamily: 'var(--font-script)',
                fontSize: '1.35rem',
                color: 'rgba(45,24,16,0.55)',
              }}>
                {CAPTIONS[lightboxIndex]}
              </div>
            </motion.div>

            {/* Prev / Next */}
            {[
              { label: '←', action: prevPhoto, pos: 'left', ariaLabel: 'Previous photo' },
              { label: '→', action: nextPhoto, pos: 'right', ariaLabel: 'Next photo' },
            ].map(({ label, action, pos, ariaLabel }) => (
              <button
                key={pos}
                aria-label={ariaLabel}
                onClick={(e) => { e.stopPropagation(); action(); }}
                style={{
                  position: 'absolute',
                  [pos]: 'clamp(0.75rem, 3vw, 2rem)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,254,252,0.1)',
                  border: '1px solid rgba(255,254,252,0.25)',
                  color: '#FFFEFC',
                  width: 46, height: 46,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.15s',
                }}
              >
                {label}
              </button>
            ))}

            {/* Close */}
            <button
              ref={closeBtnRef}
              aria-label="Close photo"
              onClick={closeLightbox}
              style={{
                position: 'absolute',
                top: 'clamp(0.75rem, 2vw, 1.5rem)',
                right: 'clamp(0.75rem, 2vw, 1.5rem)',
                background: 'rgba(255,254,252,0.1)',
                border: '1px solid rgba(255,254,252,0.25)',
                color: '#FFFEFC',
                width: 40, height: 40,
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
