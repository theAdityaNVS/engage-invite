import { motion } from 'framer-motion';
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
    <svg viewBox="0 0 140 190" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '108px', height: '152px', animation: 'ganeshaPulse 3s ease-in-out infinite' }}
      aria-label="Lord Ganesha"
    >
      <ellipse cx="70" cy="150" rx="45" ry="25" fill="rgba(212,168,67,0.18)" />

      {/* Body — layered watercolor fills */}
      <ellipse cx="70" cy="128" rx="40" ry="50" fill="rgba(212,168,67,0.55)" />
      <ellipse cx="70" cy="122" rx="34" ry="44" fill="rgba(212,168,67,0.72)" />
      <ellipse cx="70" cy="118" rx="28" ry="38" fill="#D4A843" opacity="0.85" />

      {/* Dhoti */}
      <path d="M38 150 Q40 168 70 172 Q100 168 102 150Z" fill="#C0654A" opacity="0.7"/>
      <path d="M42 150 Q44 164 70 168 Q96 164 98 150Z" fill="#A8451E" opacity="0.5"/>

      {/* Head */}
      <ellipse cx="70" cy="72" rx="36" ry="32" fill="rgba(212,168,67,0.6)" />
      <ellipse cx="70" cy="68" rx="30" ry="28" fill="#D4A843" opacity="0.88" />

      {/* Ears */}
      <ellipse cx="28" cy="70" rx="18" ry="24" fill="rgba(240,210,130,0.65)" />
      <ellipse cx="28" cy="70" rx="13" ry="18" fill="rgba(220,180,100,0.45)" />
      <ellipse cx="112" cy="70" rx="18" ry="24" fill="rgba(240,210,130,0.65)" />
      <ellipse cx="112" cy="70" rx="13" ry="18" fill="rgba(220,180,100,0.45)" />

      {/* Mukut */}
      <path d="M42 48 Q48 30 70 24 Q92 30 98 48Z" fill="rgba(212,168,67,0.8)" />
      <path d="M48 46 Q54 32 70 27 Q86 32 92 46Z" fill="#D4A843" />
      <circle cx="70" cy="26" r="5"  fill="#C4572A" />
      <circle cx="55" cy="34" r="3"  fill="#8B2240" opacity="0.8"/>
      <circle cx="85" cy="34" r="3"  fill="#8B2240" opacity="0.8"/>
      <path d="M48 46 Q50 36 70 32 Q90 36 92 46" stroke="rgba(212,168,67,0.6)" strokeWidth="1" fill="none"/>

      {/* Eyes */}
      <ellipse cx="58" cy="65" rx="7" ry="6"  fill="rgba(74,32,64,0.9)" />
      <ellipse cx="82" cy="65" rx="7" ry="6"  fill="rgba(74,32,64,0.9)" />
      <circle  cx="60" cy="64" r="2.5" fill="#FFF8F0" />
      <circle  cx="84" cy="64" r="2.5" fill="#FFF8F0" />
      <circle  cx="61" cy="63" r="1"   fill="rgba(74,32,64,0.9)" />
      <circle  cx="85" cy="63" r="1"   fill="rgba(74,32,64,0.9)" />

      {/* Trunk */}
      <path d="M62 78 Q50 92 46 108 Q44 120 52 122 Q58 122 58 115" stroke="#8B4020" strokeWidth="5" strokeLinecap="round" fill="none"/>
      <path d="M62 78 Q50 92 46 108 Q44 120 52 122 Q58 122 58 115" stroke="#C0804A" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* Tilak */}
      <ellipse cx="70" cy="57" rx="5" ry="4"  fill="rgba(196,87,42,0.8)"/>
      <line x1="70" y1="53" x2="70" y2="50" stroke="#D4A843" strokeWidth="1.5"/>

      {/* Upper left arm — ankush */}
      <path d="M36 100 Q22 88 18 72" stroke="#D4A843" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M18 72 Q14 64 20 60" stroke="#C0654A" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="20" cy="73" r="9" fill="#F0D68A" stroke="#D4A843" strokeWidth="1.5"/>

      {/* Upper right arm — lotus */}
      <path d="M104 100 Q118 88 122 72" stroke="#D4A843" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="126" cy="68" r="10" fill="rgba(220,100,140,0.6)"/>
      {Array.from({length:6},(_,i)=>{
        const a=(i*60)*Math.PI/180;
        const cx=parseFloat((126+10*Math.cos(a)).toFixed(4));
        const cy=parseFloat((68+10*Math.sin(a)).toFixed(4));
        const rot=i*60;
        return <ellipse key={i} cx={cx} cy={cy} rx="4" ry="9" transform={`rotate(${rot} ${cx} ${cy})`} fill="rgba(220,100,140,0.55)"/>;
      })}

      {/* Lower right arm — modak */}
      <path d="M102 125 Q114 132 118 140" stroke="#D4A843" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <ellipse cx="121" cy="146" rx="10" ry="12" fill="#F0D68A" />
      <path d="M114 140 Q121 134 128 140" stroke="#D4A843" strokeWidth="1.5" fill="none"/>

      {/* Lower left arm — abhaya mudra */}
      <path d="M38 125 Q26 132 22 140" stroke="#D4A843" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <ellipse cx="19" cy="143" rx="10" ry="8" fill="#F0D68A" opacity="0.85"/>
      {[-6,-2,2,6].map((dx,i)=>(
        <line key={i} x1={19+dx} y1="139" x2={19+dx} y2="150" stroke="#C0804A" strokeWidth="1.5" strokeLinecap="round"/>
      ))}
    </svg>
  );
}

export default function BlessingsSection() {
  const { t } = useLanguage();

  return (
    <section style={{
      background: 'linear-gradient(180deg, #D4A843 0%, var(--teal) 160px, var(--teal) 100%)',
      padding: 'clamp(3rem, 8vw, 5rem) 1.5rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      borderTopLeftRadius: 'clamp(24px, 5vw, 40px)',
      borderTopRightRadius: 'clamp(24px, 5vw, 40px)',
      marginTop: 'clamp(-24px, -4vw, -40px)',
      zIndex: 10,
      boxShadow: '0 -12px 30px rgba(0,0,0,0.15)',
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

        <ScrollReveal delay={0.3}>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            maxWidth: 580,
            margin: '0 auto',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {[
              { labelKey: 'groom_parents_label', names: FAMILIES.GROOM_PARENTS, delay: 0,    gotra: FAMILIES.GROOM_GOTRA,  nakshatra: FAMILIES.GROOM_NAKSHATRA },
              { labelKey: 'bride_parents_label', names: FAMILIES.BRIDE_PARENTS, delay: 0.12, gotra: FAMILIES.BRIDE_GOTRA,  nakshatra: FAMILIES.BRIDE_NAKSHATRA },
            ].map(({ labelKey, names, delay, gotra, nakshatra }) => (
              <motion.div
                key={labelKey}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay, duration: 0.55, ease: 'easeOut' }}
                style={{
                  flex: '1 1 220px',
                  minWidth: 200,
                  background: 'rgba(20, 5, 10, 0.25)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(212, 168, 67, 0.25)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  borderRadius: '16px',
                  padding: 'clamp(1.2rem, 3vw, 1.5rem)',
                  textAlign: 'center',
                }}
              >
                <svg viewBox="0 0 40 28" style={{ width: 28, height: 20, marginBottom: '0.6rem' }} aria-hidden="true">
                  {Array.from({length:6},(_,i)=>{
                    const a=(i*60-90)*Math.PI/180;
                    const cx=parseFloat((20+12*Math.cos(a)).toFixed(4));
                    const cy=parseFloat((14+12*Math.sin(a)).toFixed(4));
                    const rot=i*60-90;
                    return <ellipse key={i} cx={cx} cy={cy} rx="5" ry="11"
                      transform={`rotate(${rot} ${cx} ${cy})`}
                      fill="#D4A843" opacity="0.65"/>;
                  })}
                  <circle cx="20" cy="14" r="5" fill="#D4A843" opacity="0.85"/>
                </svg>

                <p style={{
                  fontFamily: "'Lora', serif",
                  fontSize: '0.65rem',
                  color: 'rgba(245,236,200,0.55)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}>{t(labelKey)}</p>

                <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.45), transparent)', marginBottom: '0.5rem' }} />

                <p style={{
                  fontFamily: "'Lora', serif",
                  fontStyle: 'italic',
                  fontSize: '0.72rem',
                  color: 'rgba(245,236,200,0.45)',
                  marginBottom: '0.5rem',
                }}>{t('with_blessings_of')}</p>

                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
                  color: 'var(--saffron-text)',
                  lineHeight: 1.65,
                }}>{names}</p>

                {(gotra || nakshatra) && (
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {gotra && (
                      <span style={{ fontFamily: "'Lora', serif", fontSize: '0.65rem', color: 'rgba(245,236,200,0.55)', letterSpacing: '0.12em' }}>
                        {t('gotra_label')}: {gotra}
                      </span>
                    )}
                    {nakshatra && (
                      <span style={{ fontFamily: "'Lora', serif", fontSize: '0.65rem', color: 'rgba(245,236,200,0.55)', letterSpacing: '0.12em' }}>
                        {t('nakshatra_label')}: {nakshatra}
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <div style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              color: 'rgba(245,236,200,0.7)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
            }}>
              {t('invite_intro')}
            </p>

            <p style={{
              fontFamily: "'Lora', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
              color: 'rgba(245,236,200,0.85)',
              marginBottom: 'clamp(2rem, 5vw, 3rem)',
            }}>
              {t('invite_you_to_join')}
            </p>

            <p style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 'clamp(3.5rem, 9vw, 5.5rem)',
              color: '#D4A843',
              lineHeight: 1.1,
              marginBottom: '0.5rem',
              textShadow: '0 2px 12px rgba(212, 168, 67, 0.25)',
            }}>
              {COUPLE.GROOM_NAME}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', margin: '0.5rem 0' }}>
              <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.5))' }} />
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                color: 'var(--saffron-text)',
                opacity: 0.8,
              }}>
                &amp;
              </p>
              <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(212,168,67,0.5))' }} />
            </div>

            <p style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 'clamp(3.5rem, 9vw, 5.5rem)',
              color: '#D4A843',
              lineHeight: 1.1,
              marginBottom: 'clamp(2rem, 5vw, 3rem)',
              textShadow: '0 2px 12px rgba(212, 168, 67, 0.25)',
            }}>
              {COUPLE.BRIDE_NAME}
            </p>

            <p style={{
              fontFamily: "'Lora', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(0.85rem, 2.2vw, 1rem)',
              color: 'rgba(245,236,200,0.65)',
              letterSpacing: '0.12em',
            }}>
              {t('on_the_following_events')}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
