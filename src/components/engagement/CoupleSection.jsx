import ScrollReveal from '@/components/shared/ScrollReveal';
import AnimatedPhoto from '@/components/shared/AnimatedPhoto';
import { useLanguage } from '@/hooks/useLanguage';
import { COUPLE } from '@/config';

export default function CoupleSection() {
  const { t } = useLanguage();

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
              ✦ Our Story ✦
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
              color: '#2D1810',
            }}>
              {t('couple_heading')}
            </h2>
          </div>
        </ScrollReveal>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
          {/* Portraits */}
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flex: '0 0 auto' }}>
            {[
              { name: COUPLE.GROOM_NAME, index: 1 },
              { name: COUPLE.BRIDE_NAME, index: 4 },
            ].map((person) => (
              <ScrollReveal key={person.name} delay={0.1}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    padding: '6px',
                    background: 'linear-gradient(135deg, #D4A843, #8B1A2B, #D4A843)',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginBottom: '0.75rem',
                  }}>
                    <AnimatedPhoto
                      width="160px"
                      height="160px"
                      alt={person.name}
                      index={person.index}
                      style={{ borderRadius: '50%', width: '160px', height: '160px' }}
                    />
                  </div>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.1rem',
                    color: '#8B1A2B',
                    letterSpacing: '0.05em',
                  }}>
                    {person.name}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Message */}
          <ScrollReveal delay={0.25} style={{ flex: '1 1 300px', maxWidth: '480px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #FDF0E0, #FFF8F0)',
              border: '1px solid rgba(212,168,67,0.3)',
              borderRadius: '16px',
              padding: '2rem',
              position: 'relative',
            }}>
              <span style={{
                position: 'absolute', top: '1rem', left: '1.25rem',
                fontFamily: "'Playfair Display', serif",
                fontSize: '5rem', color: '#D4A843', opacity: 0.2,
                lineHeight: 1, userSelect: 'none',
              }}>
                "
              </span>
              <p style={{
                fontFamily: "'Lora', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                color: '#6B4E3D',
                lineHeight: 1.8,
                position: 'relative', zIndex: 1,
              }}>
                {t('couple_message')}
              </p>
              <div style={{
                marginTop: '1.25rem',
                fontFamily: "'Playfair Display', serif",
                color: '#D4A843',
                fontSize: '1.1rem',
                textAlign: 'right',
              }}>
                — {COUPLE.GROOM_NAME} &amp; {COUPLE.BRIDE_NAME}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
