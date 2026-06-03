import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

const LANGS = [
  { code: 'en', label: 'English', script: 'A' },
  { code: 'hi', label: 'हिंदी', script: 'अ' },
  { code: 'te', label: 'తెలుగు', script: 'అ' },
  { code: 'or', label: 'ଓଡ଼ିଆ', script: 'ଅ' },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const activeLang = LANGS.find(l => l.code === lang) || LANGS[0];

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ 
      position: 'fixed', 
      top: '1.5rem', 
      right: '1.5rem', 
      zIndex: 100, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-end' 
    }}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'rgba(20, 5, 10, 0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(212,168,67,0.35)',
          borderRadius: '50px',
          minHeight: '44px',
          padding: '0.5rem 1.1rem',
          color: '#D4A843',
          cursor: 'pointer',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontWeight: 500,
          fontSize: '0.8rem',
          letterSpacing: '0.08em',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', opacity: 0.85 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </span>
        {activeLang.code.toUpperCase()}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              marginTop: '0.75rem',
              background: 'rgba(20, 5, 10, 0.75)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(212,168,67,0.25)',
              borderRadius: '12px',
              padding: '0.5rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              minWidth: '150px'
            }}
          >
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setIsOpen(false); }}
                style={{
                  background: lang === l.code ? 'rgba(212,168,67,0.15)' : 'transparent',
                  border: 'none',
                  color: lang === l.code ? '#F5DCA0' : 'rgba(255,248,240,0.75)',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontWeight: lang === l.code ? 600 : 400,
                  fontSize: '0.85rem',
                  letterSpacing: '0.02em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{ 
                  fontSize: '1.1rem', 
                  color: lang === l.code ? '#D4A843' : 'rgba(255,248,240,0.5)',
                  width: '20px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)' // Keep Lora for the script characters (अ, etc)
                }}>
                  {l.script}
                </span>
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
