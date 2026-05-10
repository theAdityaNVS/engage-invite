import ScrollReveal from '@/components/shared/ScrollReveal';
import { FAMILIES } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

function GaneshaSVG() {
  return (
    <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '90px', height: '120px', animation: 'ganeshaPulse 3s ease-in-out infinite' }}
      aria-hidden="true"
    >
      {/* Body */}
      <ellipse cx="60" cy="105" rx="35" ry="45" fill="rgba(212,168,67,0.9)"/>
      {/* Head */}
      <ellipse cx="60" cy="62" rx="30" ry="28" fill="#D4A843"/>
      {/* Trunk */}
      <path d="M50 75 Q35 85 30 100 Q35 110 45 105" stroke="#8B1A2B" strokeWidth="4" fill="none" strokeLinecap="round"/>
      {/* Eyes */}
      <circle cx="52" cy="58" r="3.5" fill="#8B1A2B"/>
      <circle cx="68" cy="58" r="3.5" fill="#8B1A2B"/>
      <circle cx="53" cy="57" r="1" fill="#FFF8F0"/>
      <circle cx="69" cy="57" r="1" fill="#FFF8F0"/>
      {/* Bindi */}
      <circle cx="60" cy="50" r="4" fill="#C44D5E"/>
      {/* Ears */}
      <ellipse cx="30" cy="60" rx="12" ry="16" fill="#F0D68A" opacity="0.8"/>
      <ellipse cx="90" cy="60" rx="12" ry="16" fill="#F0D68A" opacity="0.8"/>
      {/* Crown */}
      <path d="M35 38 L40 25 L50 35 L60 20 L70 35 L80 25 L85 38" stroke="#D4A843" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="60" cy="20" r="4" fill="#C44D5E"/>
      {/* Arms with modak */}
      <path d="M28 95 Q18 88 20 78" stroke="#D4A843" strokeWidth="5" strokeLinecap="round" fill="none"/>
      <circle cx="20" cy="75" r="7" fill="#F0D68A" stroke="#D4A843" strokeWidth="1.5"/>
      <path d="M92 95 Q102 88 100 78" stroke="#D4A843" strokeWidth="5" strokeLinecap="round" fill="none"/>
      {/* Legs */}
      <path d="M40 145 Q35 155 45 158" stroke="#C44D5E" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M80 145 Q85 155 75 158" stroke="#C44D5E" strokeWidth="4" strokeLinecap="round" fill="none"/>
      {/* Belly button */}
      <circle cx="60" cy="108" r="5" fill="rgba(139,26,43,0.3)"/>
    </svg>
  );
}

export default function BlessingsSection() {
  const { t } = useLanguage();

  return (
    <section style={{
      background: '#FFF8F0',
      padding: 'clamp(3rem, 8vw, 5rem) 1.5rem',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <ScrollReveal delay={0}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <GaneshaSVG />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p style={{
            fontFamily: "'Noto Serif Devanagari', serif",
            fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
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
            color: '#8B1A2B',
            marginBottom: '2rem',
          }}>
            {t('family_blessings')}
          </p>
        </ScrollReveal>

        {/* Gold ornamental divider */}
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
            fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
            color: '#6B4E3D',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            {t('groom_parents_label')}
          </p>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            color: '#2D1810',
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
            fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
            color: '#6B4E3D',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            {t('bride_parents_label')}
          </p>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            color: '#2D1810',
            lineHeight: 1.5,
          }}>
            {FAMILIES.BRIDE_PARENTS}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
