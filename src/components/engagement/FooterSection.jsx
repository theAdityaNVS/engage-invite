import { useState, useCallback } from 'react';
import { COUPLE, ENGAGEMENT, TRANSLATIONS } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

export default function FooterSection() {
  const { t, lang } = useLanguage();
  const names = TRANSLATIONS.NAMES[lang] || TRANSLATIONS.NAMES.en;
  const [copied, setCopied] = useState(false);

  const copyHashtag = useCallback(() => {
    navigator.clipboard?.writeText(COUPLE.HASHTAG)?.then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer style={{
      background: '#040711', // Solid dark midnight background
      borderTop: '1px solid rgba(212, 168, 67, 0.1)',
      textAlign: 'center',
      position: 'relative',
      padding: '4rem 1.5rem 3rem',
      zIndex: 2,
    }}>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        {/* Couple Names */}
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.7rem, 4.5vw, 2.4rem)',
          color: '#D4A843',
          marginBottom: '0.4rem',
          letterSpacing: '0.02em',
        }}>
          {names.groom} &amp; {names.bride}
        </p>

        {/* Date and Location */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          color: 'rgba(240,214,138,0.7)',
          marginBottom: '1.5rem',
          letterSpacing: '0.06em',
        }}>
          {ENGAGEMENT.DATE_DISPLAY} · {ENGAGEMENT.VENUE_CITY}
        </p>

        {/* Hashtag Capsule Pill */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.75rem' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.78rem',
            color: 'rgba(245,236,200,0.45)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '0.45rem',
          }}>
            {t('hashtag_label')}
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(20, 5, 10, 0.45)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(212, 168, 67, 0.25)',
            borderRadius: '100px',
            padding: '0.4rem 0.5rem 0.4rem 1.25rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212, 168, 67, 0.5)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 168, 67, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212, 168, 67, 0.25)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
          }}
          >
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.92rem',
              color: 'rgba(255, 248, 240, 0.85)',
              letterSpacing: '0.05em',
              fontWeight: '500',
            }}>
              {COUPLE.HASHTAG}
            </span>

            <div style={{ width: '1px', height: '16px', background: 'rgba(212, 168, 67, 0.25)' }} />

            <button
              onClick={copyHashtag}
              title={t('copy')}
              aria-label={t('copy')}
              style={{
                background: copied ? 'rgba(212, 168, 67, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: copied ? '#FFEBA7' : 'rgba(245, 236, 200, 0.65)',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (!copied) e.currentTarget.style.color = '#FFF8F0';
              }}
              onMouseLeave={(e) => {
                if (!copied) e.currentTarget.style.color = 'rgba(245, 236, 200, 0.65)';
              }}
            >
              {copied ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}

              {copied && (
                <div style={{
                  position: 'absolute',
                  bottom: '125%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#D4A843',
                  color: '#1A2535',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  pointerEvents: 'none',
                  zIndex: 20,
                }}>
                  {t('copied') || 'Copied! ✨'}
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderTop: '5px solid #D4A843',
                  }} />
                </div>
              )}
            </button>
          </div>
        </div>

        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.2), transparent)',
          maxWidth: 280,
          margin: '0 auto 1.5rem',
        }} />

        {/* Back to Top button */}
        <button
          onClick={scrollToTop}
          title="Back to Top"
          aria-label="Back to Top"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(212, 168, 67, 0.3)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            margin: '0 auto 1.5rem',
            color: 'rgba(245, 236, 200, 0.7)',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            position: 'relative',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(212, 168, 67, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(212, 168, 67, 0.65)';
            e.currentTarget.style.color = '#FFF8F0';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
            e.currentTarget.style.borderColor = 'rgba(212, 168, 67, 0.3)';
            e.currentTarget.style.color = 'rgba(245, 236, 200, 0.7)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>

        {/* Made for & Copyright details */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          color: 'rgba(245,236,200,0.4)',
          letterSpacing: '0.04em',
          marginBottom: '0.4rem',
          lineHeight: 1.6,
        }}>
          {t('made_with_love')}
        </p>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.74rem',
          color: 'rgba(245,236,200,0.25)',
          letterSpacing: '0.05em',
          margin: 0,
        }}>
          Available in English, Hindi, Telugu &amp; Odia. · © 2026 {names.groom} &amp; {names.bride}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
