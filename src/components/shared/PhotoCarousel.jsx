import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPhoto from './AnimatedPhoto';
import { useLanguage } from '@/hooks/useLanguage';

const ROTATIONS = [-3.4, 2.2, -1.6, 3.8, -2.5, 1.9, -3.1, 2.7];
const TOTAL = 8;

export default function PhotoCarousel({ photos = [] }) {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const CAPTIONS = useMemo(
    () => Array.from({ length: TOTAL }, (_, i) => t(`photo_caption_${i + 1}`)),
    [t]
  );
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (lightboxIndex !== null) {
      closeBtnRef.current?.focus();
    }
  }, [lightboxIndex]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextPhoto = useCallback(() => setLightboxIndex(i => (i + 1) % TOTAL), []);
  const prevPhoto = useCallback(() => setLightboxIndex(i => (i - 1 + TOTAL) % TOTAL), []);

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
      {/* Board — horizontal scroll with hidden scrollbar */}
      <div style={{
        overflowX: 'auto',
        overflowY: 'visible',
        paddingBottom: '1rem',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}>
        <style>{`.polaroid-scroll::-webkit-scrollbar{display:none}`}</style>
        <div
          className="polaroid-scroll"
          style={{
            display: 'flex',
            gap: 'clamp(1rem, 3vw, 1.75rem)',
            padding: 'clamp(1rem, 3vw, 1.75rem) clamp(1rem, 4vw, 2.5rem) 0.5rem',
            width: 'max-content',
            minWidth: '100%',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {Array.from({ length: TOTAL }, (_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
              role="button"
              tabIndex={0}
              onClick={() => setLightboxIndex(i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxIndex(i); } }}
              style={{
                background: '#FFFEFC',
                padding: '10px 10px 46px',
                boxShadow: '0 4px 18px rgba(0,0,0,0.22), 0 1px 4px rgba(0,0,0,0.14)',
                cursor: 'zoom-in',
                position: 'relative',
                rotate: `${ROTATIONS[i]}deg`,
                flexShrink: 0,
                transition: 'box-shadow 0.2s',
                zIndex: 1,
              }}
            >
              <AnimatedPhoto
                width="clamp(150px, 18vw, 190px)"
                height="clamp(170px, 21vw, 220px)"
                alt={CAPTIONS[i]}
                index={i}
                src={photos[i] || undefined}
                style={{
                  width: 'clamp(150px, 18vw, 190px)',
                  height: 'clamp(170px, 21vw, 220px)',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: 46,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 10px',
              }}>
                <span style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: '1rem',
                  color: 'rgba(45,24,16,0.5)',
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
          ))}
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
                fontFamily: "'Great Vibes', cursive",
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
