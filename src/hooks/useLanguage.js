import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadTranslations } from '@/utils/i18n';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');
  const [translations, setTranslations] = useState({});
  const [hasStoredLang, setHasStoredLang] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Precedence: ?lang URL param (share links) > stored choice > English default.
    let urlLang = null;
    try {
      if (typeof window !== 'undefined') {
        const p = new URLSearchParams(window.location.search).get('lang');
        if (p === 'en' || p === 'hi' || p === 'te' || p === 'or') urlLang = p;
      }
    } catch {}
    const saved = typeof window !== 'undefined' ? localStorage.getItem('invite_lang') : null;
    const initialLang = urlLang || saved || 'en';
    setLangState(initialLang);
    if (urlLang || saved) setHasStoredLang(true);
    // An explicit ?lang persists so it sticks on param-less return visits.
    if (urlLang && typeof window !== 'undefined') {
      try { localStorage.setItem('invite_lang', urlLang); } catch {}
    }
    loadTranslations(initialLang).then((t) => {
      setTranslations(t);
      setIsReady(true);
    });
  }, []);

  // Reflect the active language onto <html> so CSS can target Indic scripts
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.setAttribute('data-lang', lang);
    }
  }, [lang]);

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
