import { motion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import MandalaPattern from '@/components/shared/MandalaPattern';
import { FAMILIES, COUPLE } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';



function GaneshaSVG() {
  return (
    <svg viewBox="0 0 140 190" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '108px', height: '152px', animation: 'ganeshaPulse 3s ease-in-out infinite' }}
      aria-label="Lord Ganesha"
    >
      {/* Monochromatic Gold Architecture */}
      <ellipse cx="70" cy="150" rx="45" ry="25" fill="rgba(212,168,67,0.1)" />

      {/* Body */}
      <ellipse cx="70" cy="128" rx="40" ry="50" fill="rgba(212,168,67,0.3)" />
      <ellipse cx="70" cy="122" rx="34" ry="44" fill="rgba(212,168,67,0.5)" />
      <ellipse cx="70" cy="118" rx="28" ry="38" fill="#D4A843" opacity="0.7" />

      {/* Dhoti - gold gradient feel */}
      <path d="M38 150 Q40 168 70 172 Q100 168 102 150Z" fill="#D4A843" opacity="0.4"/>
      <path d="M42 150 Q44 164 70 168 Q96 164 98 150Z" fill="#D4A843" opacity="0.5"/>

      {/* Head */}
      <ellipse cx="70" cy="72" rx="36" ry="32" fill="rgba(212,168,67,0.4)" />
      <ellipse cx="70" cy="68" rx="30" ry="28" fill="#D4A843" opacity="0.75" />

      {/* Ears */}
      <ellipse cx="28" cy="70" rx="18" ry="24" fill="rgba(212,168,67,0.5)" />
      <ellipse cx="28" cy="70" rx="13" ry="18" fill="rgba(212,168,67,0.8)" />
      <ellipse cx="112" cy="70" rx="18" ry="24" fill="rgba(212,168,67,0.5)" />
      <ellipse cx="112" cy="70" rx="13" ry="18" fill="rgba(212,168,67,0.8)" />

      {/* Mukut (Crown) */}
      <path d="M42 48 Q48 30 70 24 Q92 30 98 48Z" fill="rgba(212,168,67,0.6)" />
      <path d="M48 46 Q54 32 70 27 Q86 32 92 46Z" fill="#D4A843" />
      <circle cx="70" cy="26" r="5" fill="#F0D68A" />
      <circle cx="55" cy="34" r="3" fill="rgba(240,214,138,0.8)" />
      <circle cx="85" cy="34" r="3" fill="rgba(240,214,138,0.8)" />
      <path d="M48 46 Q50 36 70 32 Q90 36 92 46" stroke="#F0D68A" strokeWidth="1.5" fill="none"/>

      {/* Eyes */}
      <ellipse cx="58" cy="65" rx="7" ry="6" fill="rgba(20,5,10,0.5)" />
      <ellipse cx="82" cy="65" rx="7" ry="6" fill="rgba(20,5,10,0.5)" />
      <circle cx="60" cy="64" r="2.5" fill="#FFF8F0" opacity="0.9" />
      <circle cx="84" cy="64" r="2.5" fill="#FFF8F0" opacity="0.9" />

      {/* Trunk */}
      <path d="M62 78 Q50 92 46 108 Q44 120 52 122 Q58 122 58 115" stroke="#D4A843" strokeWidth="5" strokeLinecap="round" fill="none"/>
      <path d="M62 78 Q50 92 46 108 Q44 120 52 122 Q58 122 58 115" stroke="#F0D68A" strokeWidth="2" strokeLinecap="round" fill="none"/>

      {/* Tilak */}
      <ellipse cx="70" cy="57" rx="5" ry="4" fill="rgba(240,214,138,0.9)"/>
      <line x1="70" y1="53" x2="70" y2="50" stroke="#FFF8F0" strokeWidth="1.5"/>

      {/* Upper left arm — ankush */}
      <path d="M36 100 Q22 88 18 72" stroke="#D4A843" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="20" cy="73" r="9" fill="#F0D68A" stroke="#D4A843" strokeWidth="1.5"/>

      {/* Upper right arm — lotus (changed to golden lotus) */}
      <path d="M104 100 Q118 88 122 72" stroke="#D4A843" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="126" cy="68" r="10" fill="rgba(212,168,67,0.5)"/>
      {Array.from({length:6},(_,i)=>{
        const a=(i*60)*Math.PI/180;
        const cx=parseFloat((126+10*Math.cos(a)).toFixed(4));
        const cy=parseFloat((68+10*Math.sin(a)).toFixed(4));
        const rot=i*60;
        return <ellipse key={i} cx={cx} cy={cy} rx="4" ry="9" transform={`rotate(${rot} ${cx} ${cy})`} fill="rgba(240,214,138,0.7)"/>;
      })}

      {/* Lower right arm — modak */}
      <path d="M102 125 Q114 132 118 140" stroke="#D4A843" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <ellipse cx="121" cy="146" rx="10" ry="12" fill="#F0D68A" />
      <path d="M114 140 Q121 134 128 140" stroke="#D4A843" strokeWidth="1.5" fill="none"/>

      {/* Lower left arm — abhaya mudra */}
      <path d="M38 125 Q26 132 22 140" stroke="#D4A843" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <ellipse cx="19" cy="143" rx="10" ry="8" fill="#F0D68A" opacity="0.85"/>
      {[-6,-2,2,6].map((dx,i)=>(
        <line key={i} x1={19+dx} y1="139" x2={19+dx} y2="150" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round"/>
      ))}
    </svg>
  );
}

function DiyaIcon({ style }) {
  return (
    <svg viewBox="0 0 32 32" style={{ width: 18, height: 18, ...style }} aria-hidden="true">
      <ellipse cx="16" cy="8" rx="3" ry="6" fill="#FFD037" style={{ animation: 'diyaFlicker 1.8s ease-in-out infinite' }} />
      <ellipse cx="16" cy="9" rx="2" ry="4" fill="#FF8C00" style={{ animation: 'diyaFlicker 1.8s 0.2s ease-in-out infinite' }} />
      <path d="M8 20 Q8 28 16 28 Q24 28 24 20 L22 16 L10 16Z" fill="#C0654A" />
      <path d="M10 18 Q10 26 16 26 Q22 26 22 18Z" fill="#A8451E" opacity="0.6" />
      <line x1="16" y1="14" x2="16" y2="16" stroke="#4A2806" strokeWidth="1.5" />
    </svg>
  );
}

function GroomsFamilySVG() {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '80px', height: '80px', marginBottom: '0.8rem' }}
      aria-label="Groom's Family Icon"
    >
      <circle cx="80" cy="80" r="76" stroke="rgba(212,168,67,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="80" cy="80" r="70" stroke="rgba(212,168,67,0.3)" strokeWidth="1" />
      <circle cx="80" cy="80" r="64" fill="rgba(212,168,67,0.06)" stroke="rgba(212,168,67,0.15)" strokeWidth="1" />
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 22.5) * Math.PI / 180;
        const x1 = parseFloat((80 + 64 * Math.cos(angle)).toFixed(4));
        const y1 = parseFloat((80 + 64 * Math.sin(angle)).toFixed(4));
        const x2 = parseFloat((80 + 70 * Math.cos(angle)).toFixed(4));
        const y2 = parseFloat((80 + 70 * Math.sin(angle)).toFixed(4));
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4A843" strokeWidth="1" opacity="0.35" />
        );
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 + 22.5) * Math.PI / 180;
        const cx = parseFloat((80 + 73 * Math.cos(angle)).toFixed(4));
        const cy = parseFloat((80 + 73 * Math.sin(angle)).toFixed(4));
        return (
          <circle key={i} cx={cx} cy={cy} r="1.5" fill="#F0D68A" opacity="0.7" />
        );
      })}
      {/* Kalash (purna kumbha) motif */}
      {/* Mango leaves fanning from neck */}
      <path d="M80 52 Q68 44 62 48 Q68 54 80 55Z" fill="rgba(34,100,55,0.75)" />
      <path d="M80 52 Q74 40 80 37 Q86 40 80 52Z" fill="rgba(34,100,55,0.85)" />
      <path d="M80 52 Q92 44 98 48 Q92 54 80 55Z" fill="rgba(34,100,55,0.75)" />
      {/* Coconut on top */}
      <circle cx="80" cy="46" r="8" fill="#C4572A" opacity="0.85" />
      <circle cx="80" cy="44" r="5.5" fill="#D4A843" opacity="0.7" />
      {/* Neck of kalash */}
      <rect x="73" y="55" width="14" height="7" rx="2" fill="#D4A843" opacity="0.9" />
      {/* Pot body */}
      <ellipse cx="80" cy="88" rx="24" ry="26" fill="rgba(196,87,42,0.55)" stroke="#D4A843" strokeWidth="1.5" />
      <ellipse cx="80" cy="84" rx="18" ry="20" fill="rgba(212,168,67,0.25)" />
      {/* Decorative band on pot */}
      <path d="M57 82 Q80 76 103 82" stroke="#F0D68A" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M59 88 Q80 82 101 88" stroke="#F0D68A" strokeWidth="1" fill="none" opacity="0.6" />
      {/* Base of kalash */}
      <ellipse cx="80" cy="113" rx="16" ry="4" fill="#D4A843" opacity="0.7" />
    </svg>
  );
}

function BridesFamilySVG() {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '80px', height: '80px', marginBottom: '0.8rem' }}
      aria-label="Bride's Family Icon"
    >
      <circle cx="80" cy="80" r="76" stroke="rgba(212,168,67,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="80" cy="80" r="70" stroke="rgba(212,168,67,0.3)" strokeWidth="1" />
      <circle cx="80" cy="80" r="64" fill="rgba(212,168,67,0.06)" stroke="rgba(212,168,67,0.15)" strokeWidth="1" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const x = parseFloat((80 + 67 * Math.cos(angle)).toFixed(4));
        const y = parseFloat((80 + 67 * Math.sin(angle)).toFixed(4));
        return (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#D4A843" opacity="0.5" />
        );
      })}
      <path d="M45 120 Q80 25 115 120" stroke="rgba(212,168,67,0.25)" strokeWidth="1.5" fill="none" />
      {/* Kalash (purna kumbha) motif */}
      {/* Mango leaves fanning from neck */}
      <path d="M80 52 Q68 44 62 48 Q68 54 80 55Z" fill="rgba(34,100,55,0.75)" />
      <path d="M80 52 Q74 40 80 37 Q86 40 80 52Z" fill="rgba(34,100,55,0.85)" />
      <path d="M80 52 Q92 44 98 48 Q92 54 80 55Z" fill="rgba(34,100,55,0.75)" />
      {/* Coconut on top */}
      <circle cx="80" cy="46" r="8" fill="rgba(139,34,64,0.8)" opacity="0.85" />
      <circle cx="80" cy="44" r="5.5" fill="#D4A843" opacity="0.7" />
      {/* Neck of kalash */}
      <rect x="73" y="55" width="14" height="7" rx="2" fill="#D4A843" opacity="0.9" />
      {/* Pot body */}
      <ellipse cx="80" cy="88" rx="24" ry="26" fill="rgba(139,34,64,0.45)" stroke="#D4A843" strokeWidth="1.5" />
      <ellipse cx="80" cy="84" rx="18" ry="20" fill="rgba(212,168,67,0.25)" />
      {/* Decorative band on pot */}
      <path d="M57 82 Q80 76 103 82" stroke="#F0D68A" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M59 88 Q80 82 101 88" stroke="#F0D68A" strokeWidth="1" fill="none" opacity="0.6" />
      {/* Base of kalash */}
      <ellipse cx="80" cy="113" rx="16" ry="4" fill="#D4A843" opacity="0.7" />
    </svg>
  );
}

export default function BlessingsSection() {
  const { t } = useLanguage();

  return (
    <section style={{
      background: 'linear-gradient(180deg, #D4A843 0%, rgba(196,87,42,0.95) 15%, var(--saffron) 40%, var(--saffron) 100%)',
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

      <MandalaPattern color="var(--gold-light)" opacity={0.22} />

      <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* 1. Invocation Block (Fades in together) */}
        <ScrollReveal delay={0}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <GaneshaSVG />
          </div>

          <p style={{
            fontFamily: "'Noto Serif Devanagari', serif",
            fontSize: 'clamp(1.4rem, 4.5vw, 2rem)',
            color: '#D4A843',
            lineHeight: 1.3,
            marginBottom: '0.5rem',
          }}>
            {t('mantra')}
          </p>

          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 3vw, 1.2rem)',
            color: 'var(--saffron-text)',
            marginBottom: '1rem',
            opacity: 0.85,
          }}>
            {t('family_blessings')}
          </p>
        </ScrollReveal>

        {/* Shubham Karoti Shloka Block */}
        <ScrollReveal delay={0.08}>
          <div style={{ margin: '1.5rem auto 2rem', maxWidth: '600px', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', justifyContent: 'center', marginBottom: '0.8rem' }}>
              <DiyaIcon />
              <div style={{ height: '1px', width: '50px', background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.5))' }} />
              <span style={{ color: '#D4A843', fontSize: '0.8rem' }}>✦</span>
              <div style={{ height: '1px', width: '50px', background: 'linear-gradient(to left, transparent, rgba(212,168,67,0.5))' }} />
              <DiyaIcon />
            </div>

            <p style={{
              fontFamily: "'Noto Serif Devanagari', serif",
              fontSize: 'clamp(1rem, 3.2vw, 1.25rem)',
              color: 'var(--saffron-text)',
              lineHeight: 1.8,
              marginBottom: '0.3rem',
              letterSpacing: '0.02em',
            }}>
              शुभं करोति कल्याणम् आरोग्यं धनसंपदाम् ।
            </p>
            <p style={{
              fontFamily: "'Noto Serif Devanagari', serif",
              fontSize: 'clamp(1rem, 3.2vw, 1.25rem)',
              color: 'var(--saffron-text)',
              lineHeight: 1.8,
              marginBottom: '0.6rem',
              letterSpacing: '0.02em',
            }}>
              शत्रुबुद्धिविनाशाय दीपज्योतिर्नमोस्तुते ॥
            </p>
            
            <p style={{
              fontFamily: "'Lora', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(0.8rem, 2.2vw, 0.9rem)',
              color: 'rgba(245,236,200,0.65)',
              lineHeight: 1.6,
              maxWidth: '480px',
              margin: '0 auto',
            }}>
              {t('shubham_shloka_meaning')}
            </p>
          </div>
        </ScrollReveal>

        {/* 2. Family Block (Fades in together) */}
        <ScrollReveal delay={0.15}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem auto', maxWidth: '400px' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #D4A843)' }} />
            <span style={{ color: '#D4A843', fontSize: '1.2rem' }}>✦</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #D4A843)' }} />
          </div>


          <div style={{
            display: 'flex',
            gap: '1.5rem',
            maxWidth: 620,
            margin: '0 auto',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {[
              { 
                labelKey: 'groom_parents_label', 
                names: FAMILIES.GROOM_PARENTS, 
                delay: 0,    
                gotra: FAMILIES.GROOM_GOTRA,  
                nakshatra: FAMILIES.GROOM_NAKSHATRA,
                sibling: FAMILIES.GROOM_SIBLING || null,
                location: 'Visakhapatnam',
                icon: <GroomsFamilySVG />
              },
              { 
                labelKey: 'bride_parents_label', 
                names: FAMILIES.BRIDE_PARENTS, 
                delay: 0.12, 
                gotra: FAMILIES.BRIDE_GOTRA,  
                nakshatra: FAMILIES.BRIDE_NAKSHATRA,
                sibling: FAMILIES.BRIDE_SIBLING || null,
                location: 'Sunabeda',
                icon: <BridesFamilySVG />
              },
            ].map(({ labelKey, names, delay, gotra, nakshatra, sibling, location, icon }) => (
              <motion.div
                key={labelKey}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay, duration: 0.55, ease: 'easeOut' }}
                style={{
                  flex: '1 1 240px',
                  minWidth: 220,
                  background: 'rgba(20, 5, 10, 0.25)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(212, 168, 67, 0.25)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  borderRadius: '16px',
                  padding: 'clamp(1.2rem, 3vw, 1.8rem)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {icon}
                </div>

                <p style={{
                  fontFamily: "'Lora', serif",
                  fontSize: '0.62rem',
                  color: 'rgba(245,236,200,0.5)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '0.15rem',
                }}>{location}</p>
                <p style={{
                  fontFamily: "'Lora', serif",
                  fontSize: '0.72rem',
                  color: 'rgba(245,236,200,0.75)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}>{t(labelKey)}</p>

                <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.45), transparent)', marginBottom: '0.5rem' }} />

                {names.split(' & ').sort((a) => (a.startsWith('Shri') ? -1 : 1)).map((name, i) => (
                  <p key={i} style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1rem, 2.8vw, 1.15rem)',
                    color: 'var(--saffron-text)',
                    lineHeight: 1.65,
                  }}>{name}</p>
                ))}

                {sibling && (
                  <>
                    <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.3), transparent)', margin: '0.6rem 0' }} />
                    <p style={{
                      fontFamily: "'Lora', serif",
                      fontStyle: 'italic',
                      fontSize: '0.7rem',
                      color: 'rgba(245,236,200,0.45)',
                      marginBottom: '0.2rem',
                    }}>{t('sibling_label')}</p>
                    <p style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(1rem, 2.4vw, 1.1rem)',
                      color: 'var(--saffron-text)',
                    }}>{sibling}</p>
                  </>
                )}

                {(gotra || nakshatra) && (
                  <div style={{ marginTop: '0.6rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
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

        {/* 3. Invite Block (Fades in together) */}
        <ScrollReveal delay={0.3}>
          <div style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              color: 'rgba(245,236,200,0.7)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: 'clamp(2rem, 5vw, 3rem)',
            }}>
              {t('invite_intro')}
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

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
