import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

export default function FooterSection() {
  const { t } = useLanguage();
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer style={{
        background: '#040711',
        borderTop: '1px solid rgba(212, 168, 67, 0.1)',
        textAlign: 'center',
        position: 'relative',
        padding: '1rem 1.5rem',
        zIndex: 2,
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.78rem',
            color: 'rgba(245, 236, 200, 0.5)',
            letterSpacing: '0.04em',
            margin: 0,
            lineHeight: 1.5,
          }}>
            {t('made_with_love')} &nbsp;·&nbsp; {t('built_with_credits')}
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            color: 'rgba(245, 236, 200, 0.25)',
            letterSpacing: '0.05em',
            margin: 0,
          }}>
            English · हिन्दी · తెలుగు · ଓଡ଼ିଆ &nbsp;·&nbsp; © 2026 theAdityaNVS
          </p>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={scrollToTop}
            title="Back to Top"
            aria-label="Back to Top"
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              zIndex: 90,
              background: 'rgba(20, 5, 10, 0.65)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(212, 168, 67, 0.35)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'rgba(245, 236, 200, 0.85)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              transition: 'transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
            }}
            whileHover={{ scale: 1.1, translateY: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
