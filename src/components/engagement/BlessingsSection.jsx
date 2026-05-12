import ScrollReveal from '@/components/shared/ScrollReveal';
import { FAMILIES, COUPLE } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

function PaisleyPattern() {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.12 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="paisley" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M40 10 Q55 10 60 25 Q65 40 55 50 Q45 60 35 55 Q25 50 28 38 Q31 26 40 10Z"
            fill="none" stroke="rgba(160,60,20,0.5)" strokeWidth="1.5" />
          <circle cx="40" cy="28" r="5" fill="none" stroke="rgba(160,60,20,0.5)" strokeWidth="1" />
          <path d="M36 50 Q34 60 38 65" fill="none" stroke="rgba(160,60,20,0.5)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#paisley)" />
    </svg>
  );
}

function GaneshaSVG() {
  return (
    <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '90px', height: '120px', animation: 'ganeshaPulse 3s ease-in-out infinite' }}
      aria-hidden="true"
    >
      <ellipse cx="60" cy="105" rx="35" ry="45" fill="rgba(212,168,67,0.9)"/>
      <ellipse cx="60" cy="62" rx="30" ry="28" fill="#D4A843"/>
      <path d="M50 75 Q35 85 30 100 Q35 110 45 105" stroke="#4A2040" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <circle cx="52" cy="58" r="3.5" fill="#4A2040"/>
      <circle cx="68" cy="58" r="3.5" fill="#4A2040"/>
      <circle cx="53" cy="57" r="1" fill="#FFF8F0"/>
      <circle cx="69" cy="57" r="1" fill="#FFF8F0"/>
      <circle cx="60" cy="50" r="4" fill="#C0654A"/>
      <ellipse cx="30" cy="60" rx="12" ry="16" fill="#F0D68A" opacity="0.8"/>
      <ellipse cx="90" cy="60" rx="12" ry="16" fill="#F0D68A" opacity="0.8"/>
      <path d="M35 38 L40 25 L50 35 L60 20 L70 35 L80 25 L85 38" stroke="#D4A843" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="60" cy="20" r="4" fill="#C0654A"/>
      <path d="M28 95 Q18 88 20 78" stroke="#D4A843" strokeWidth="5" strokeLinecap="round" fill="none"/>
      <circle cx="20" cy="75" r="7" fill="#F0D68A" stroke="#D4A843" strokeWidth="1.5"/>
      <path d="M92 95 Q102 88 100 78" stroke="#D4A843" strokeWidth="5" strokeLinecap="round" fill="none"/>
      <path d="M40 145 Q35 155 45 158" stroke="#C0654A" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M80 145 Q85 155 75 158" stroke="#C0654A" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="60" cy="108" r="5" fill="rgba(74,32,64,0.3)"/>
    </svg>
  );
}

export default function BlessingsSection() {
  const { t } = useLanguage();

  return (
    <section style={{
      background: 'var(--teal)',
      padding: 'clamp(3rem, 8vw, 5rem) 1.5rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Embossed paisley texture */}
      <PaisleyPattern />

      <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ScrollReveal delay={0}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <GaneshaSVG />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p style={{
            fontFamily: "'Noto Serif Devanagari', serif",
            fontSize: 'clamp(1.4rem, 4.5vw, 2rem)',
            color: '#D4A843',
            lineHeight: 1.3,
            marginBottom: '0.5rem',
          }}>
            {t('mantra')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 3vw, 1.2rem)',
            color: 'var(--teal-text)',
            marginBottom: '2rem',
            opacity: 0.85,
          }}>
            {t('family_blessings')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem auto', maxWidth: '400px' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #D4A843)' }} />
            <span style={{ color: '#D4A843', fontSize: '1.2rem' }}>✦</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #D4A843)' }} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <p style={{
            fontFamily: "'Lora', serif",
            fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
            color: 'rgba(245,236,200,0.65)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '0.8rem',
          }}>
            {t('groom_parents_label')}
          </p>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            color: 'var(--teal-text)',
            lineHeight: 1.5,
          }}>
            {FAMILIES.GROOM_PARENTS}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.45}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem auto', maxWidth: '200px' }}>
            <div style={{ flex: 1, height: '1px', background: '#D4A843', opacity: 0.4 }} />
            <span style={{ color: '#D4A843', fontSize: '0.9rem' }}>❧</span>
            <div style={{ flex: 1, height: '1px', background: '#D4A843', opacity: 0.4 }} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <p style={{
            fontFamily: "'Lora', serif",
            fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
            color: 'rgba(245,236,200,0.65)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '0.8rem',
          }}>
            {t('bride_parents_label')}
          </p>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            color: 'var(--teal-text)',
            lineHeight: 1.5,
          }}>
            {FAMILIES.BRIDE_PARENTS}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <div style={{ marginTop: '2.5rem' }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              color: 'rgba(245,236,200,0.7)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              {t('invite_intro')}
            </p>

            {/* Large "INVITE" display word */}
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3rem, 10vw, 5rem)',
              color: '#D4A843',
              lineHeight: 1,
              letterSpacing: '0.08em',
              marginBottom: '1rem',
            }}>
              INVITE
            </p>

            <p style={{
              fontFamily: "'Lora', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              color: 'rgba(245,236,200,0.65)',
              marginBottom: '1.5rem',
            }}>
              you to join us in the engagement celebrations of
            </p>

            <p style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 'clamp(2.2rem, 7vw, 3.5rem)',
              color: '#D4A843',
              lineHeight: 1.2,
              marginBottom: '0.2rem',
            }}>
              {COUPLE.GROOM_NAME}
            </p>
            <p style={{
              fontFamily: "'Lora', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              color: 'rgba(245,236,200,0.75)',
              letterSpacing: '0.15em',
              margin: '0.2rem 0',
            }}>
              &amp;
            </p>
            <p style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 'clamp(2.2rem, 7vw, 3.5rem)',
              color: '#D4A843',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}>
              {COUPLE.BRIDE_NAME}
            </p>

            <p style={{
              fontFamily: "'Lora', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
              color: 'rgba(245,236,200,0.55)',
              letterSpacing: '0.1em',
            }}>
              on the following events
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
