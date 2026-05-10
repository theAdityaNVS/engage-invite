import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

const LANGS = [
  { code: 'en', script: 'A' },
  { code: 'hi', script: 'अ' },
  { code: 'te', script: 'అ' },
  { code: 'or', script: 'ଅ' },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div style={{
      position: 'fixed', bottom: '1.5rem', left: '1.5rem', zIndex: 80,
      display: 'flex', gap: '4px',
      background: 'rgba(45,24,16,0.85)',
      backdropFilter: 'blur(8px)',
      borderRadius: '50px',
      padding: '5px',
      border: '1px solid rgba(212,168,67,0.3)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
    }}>
      {LANGS.map((l) => (
        <motion.button
          key={l.code}
          whileTap={{ scale: 0.9 }}
          onClick={() => setLang(l.code)}
          style={{
            width: '32px', height: '32px', borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            fontFamily: l.code === 'hi' ? "'Noto Serif Devanagari', serif"
                       : l.code === 'te' ? "'Noto Serif Telugu', serif"
                       : l.code === 'or' ? "'Noto Sans Odia', sans-serif"
                       : "'Playfair Display', serif",
            fontSize: '0.9rem',
            fontWeight: lang === l.code ? 700 : 400,
            background: lang === l.code
              ? 'linear-gradient(135deg, #D4A843, #F0D68A)'
              : 'transparent',
            color: lang === l.code ? '#2D1810' : 'rgba(255,248,240,0.7)',
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          title={l.code.toUpperCase()}
          aria-label={`Switch to ${l.code}`}
          aria-pressed={lang === l.code}
        >
          {l.script}
        </motion.button>
      ))}
    </div>
  );
}
