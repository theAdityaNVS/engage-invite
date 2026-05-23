import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

const LANGUAGES = [
  { code: 'en', label: 'English', script: 'A'  },
  { code: 'hi', label: 'हिंदी',   script: 'अ'  },
  { code: 'te', label: 'తెలుగు',  script: 'అ'  },
  { code: 'or', label: 'ଓଡ଼ିଆ',   script: 'ଅ'  },
];

export default function LanguageBanner() {
  const { setLang, hasStoredLang, t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (hasStoredLang) return;
    const show = setTimeout(() => setVisible(true), 1200);
    const hide = setTimeout(() => dismiss('en'), 9200);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [hasStoredLang]);

  const dismiss = (code) => {
    if (code) setLang(code);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 80,
            background: 'rgba(26, 37, 53, 0.97)',
            borderTop: '1px solid rgba(212,168,67,0.3)',
            backdropFilter: 'blur(12px)',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <p style={{
            fontFamily: "'Lora', serif",
            fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
            color: 'rgba(245,236,200,0.85)',
            flexShrink: 0,
          }}>
            {t('view_in_language')}
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', flex: 1, justifyContent: 'center' }}>
            {LANGUAGES.map((l) => (
              <motion.button
                key={l.code}
                whileHover={{ scale: 1.06, backgroundColor: 'rgba(212,168,67,0.25)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dismiss(l.code)}
                style={{
                  padding: '0.4rem 1rem',
                  border: '1px solid rgba(212,168,67,0.5)',
                  borderRadius: '50px',
                  background: 'rgba(212,168,67,0.1)',
                  color: '#F5ECC8',
                  cursor: 'pointer',
                  fontFamily: l.code === 'te' ? "'Noto Serif Telugu', serif"
                            : l.code === 'or' ? "'Noto Sans Odia', sans-serif"
                            : l.code === 'hi' ? "'Noto Serif Devanagari', serif"
                            : "'Playfair Display', serif",
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'background 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ color: '#D4A843', fontWeight: 700 }}>{l.script}</span>
                {l.label}
              </motion.button>
            ))}
          </div>

          <button
            onClick={() => dismiss(null)}
            aria-label="Dismiss"
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(245,236,200,0.5)',
              cursor: 'pointer',
              fontSize: '1.2rem',
              lineHeight: 1,
              padding: '0.25rem',
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
