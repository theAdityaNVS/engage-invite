import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

const LANGUAGES = [
  { code: 'en', label: 'English',  script: 'A'  },
  { code: 'hi', label: 'हिंदी',    script: 'अ'  },
  { code: 'te', label: 'తెలుగు',   script: 'అ'  },
  { code: 'or', label: 'ଓଡ଼ିଆ',    script: 'ଅ'  },
];

export default function LanguageModal() {
  const { setLang, hasStoredLang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (hasStoredLang) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const timer = setTimeout(() => handleSelect('en'), 5000);
    return () => clearTimeout(timer);
  }, [hasStoredLang]);

  const handleSelect = (code) => {
    setLang(code);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'linear-gradient(135deg, #2D1810 0%, #8B1A2B 50%, #2D1810 100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ textAlign: 'center', maxWidth: '480px', width: '100%' }}
          >
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.1rem, 4vw, 1.4rem)',
              color: '#D4A843',
              marginBottom: '0.5rem',
              letterSpacing: '0.05em',
            }}>
              ॐ श्री गणेशाय नमः
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
              color: '#FFF8F0',
              marginBottom: '0.5rem',
              lineHeight: 1.2,
            }}>
              Welcome / स्वागत
            </h1>
            <p style={{
              fontFamily: "'Noto Serif Telugu', serif",
              fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              color: '#F0D68A',
              marginBottom: '2.5rem',
            }}>
              స్వాగతం / ସ୍ୱାଗତ
            </p>
            <p style={{ color: '#C44D5E', fontSize: '0.9rem', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>
              CHOOSE YOUR LANGUAGE
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              {LANGUAGES.map((l) => (
                <motion.button
                  key={l.code}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(212,168,67,0.2)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelect(l.code)}
                  style={{
                    padding: '1rem',
                    border: '1px solid rgba(212,168,67,0.5)',
                    borderRadius: '8px',
                    background: 'rgba(255,248,240,0.08)',
                    color: '#FFF8F0',
                    cursor: 'pointer',
                    fontFamily: l.code === 'te' ? "'Noto Serif Telugu', serif"
                              : l.code === 'or' ? "'Noto Sans Odia', sans-serif"
                              : l.code === 'hi' ? "'Noto Serif Devanagari', serif"
                              : "'Playfair Display', serif",
                    fontSize: '1.1rem',
                    transition: 'background 0.2s',
                  }}
                >
                  <span style={{ display: 'block', fontSize: '1.8rem', marginBottom: '0.25rem', color: '#D4A843' }}>
                    {l.script}
                  </span>
                  {l.label}
                </motion.button>
              ))}
            </div>

            <button
              onClick={() => handleSelect('en')}
              style={{
                background: 'none', border: 'none', color: 'rgba(255,248,240,0.5)',
                cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline',
              }}
            >
              Skip (English)
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
