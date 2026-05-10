import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import InfoCard from '@/components/shared/InfoCard';
import WeatherWidget from '@/components/shared/WeatherWidget';
import { useLanguage } from '@/hooks/useLanguage';
import { COUPLE, ENGAGEMENT } from '@/config';

export default function InfoCardsSection() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyHashtag = async () => {
    try {
      await navigator.clipboard.writeText(COUPLE.HASHTAG);
    } catch {
      const el = document.createElement('textarea');
      el.value = COUPLE.HASHTAG;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section style={{
      background: '#FFF8F0',
      padding: 'clamp(3rem, 8vw, 5rem) 1.5rem',
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{
              fontFamily: "'Lora', serif",
              fontSize: '0.8rem',
              color: '#8B1A2B',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}>
              ✦ Good to Know ✦
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
              color: '#2D1810',
            }}>
              {t('things_heading')}
            </h2>
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
        }}>
          {/* Hashtag card */}
          <InfoCard icon="🏷️" title={t('hashtag_label')} delay={0}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: '#8B1A2B', marginBottom: '0.75rem' }}>
              {COUPLE.HASHTAG}
            </p>
            <div style={{ position: 'relative' }}>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={copyHashtag}
                style={{
                  padding: '0.5rem 1.25rem',
                  background: copied ? '#1B6B4A' : '#8B1A2B',
                  color: '#FFF8F0',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontFamily: "'Lora', serif",
                  fontSize: '0.8rem',
                  transition: 'background 0.3s',
                }}
              >
                {copied ? t('copied') : t('copy')}
              </motion.button>
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: -30 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                      background: '#1B6B4A', color: '#FFF8F0', padding: '4px 12px',
                      borderRadius: '20px', fontSize: '0.75rem', whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                    }}
                  >
                    {t('copied')}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </InfoCard>

          {/* Weather card */}
          <InfoCard icon="🌤️" title={t('weather_label')} delay={0.1}>
            <WeatherWidget
              lat={ENGAGEMENT.VENUE_LAT}
              lng={ENGAGEMENT.VENUE_LNG}
              advisory={ENGAGEMENT.WEATHER_ADVISORY}
            />
          </InfoCard>

          {/* Accommodation card */}
          <InfoCard icon="🏨" title={t('accommodation_label')} delay={0.2}>
            <p>{t('accommodation_text')}</p>
          </InfoCard>

          {/* Parking card */}
          <InfoCard icon="🅿️" title={t('parking_label')} delay={0.3}>
            <p>{t('parking_text')}</p>
          </InfoCard>
        </div>
      </div>
    </section>
  );
}
