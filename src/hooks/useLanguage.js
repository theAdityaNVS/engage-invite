import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadTranslations } from '@/utils/i18n';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');
  const [translations, setTranslations] = useState({});
  const [hasStoredLang, setHasStoredLang] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('invite_lang') : null;
    const initialLang = saved || 'en';
    setLangState(initialLang);
    if (saved) setHasStoredLang(true);
    loadTranslations(initialLang).then((t) => {
      setTranslations(t);
      setIsReady(true);
    });
  }, []);

  const setLang = useCallback(async (newLang) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('invite_lang', newLang);
    }
    setHasStoredLang(true);
    const t = await loadTranslations(newLang);
    setTranslations(t);
  }, []);

  const t = useCallback((key) => translations[key] ?? key, [translations]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, hasStoredLang, isReady }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
