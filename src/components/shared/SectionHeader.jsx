export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  eyebrowType = 'cursive', // 'cursive' | 'serif'
  theme = 'saffron',      // 'saffron' | 'burgundy' | 'sand' | 'navy'
  align = 'center',
  style = {},
}) {
  // Define theme colors and gradients to fit the sectional color scheme
  const themeStyles = {
    saffron: {
      eyebrowColor: 'var(--gold-light)',
      titleGradient: 'linear-gradient(to bottom, #FFFDF9 0%, #FAF0D4 55%, #D4A843 100%)',
      subtitleColor: 'rgba(255,248,240,0.85)',
      ornamentColor: 'var(--gold)',
    },
    burgundy: {
      eyebrowColor: 'var(--gold-light)',
      titleGradient: 'linear-gradient(to bottom, #FFFDF9 0%, #FAF0D4 55%, #D4A843 100%)',
      subtitleColor: 'rgba(255,248,240,0.85)',
      ornamentColor: 'var(--gold)',
    },
    sand: {
      eyebrowColor: 'var(--saffron-dark)',
      titleGradient: 'linear-gradient(to bottom, #3A2010 0%, #5E3C1B 100%)',
      subtitleColor: 'rgba(58,32,16,0.8)',
      ornamentColor: 'var(--saffron-dark)',
    },
    navy: {
      eyebrowColor: 'var(--gold-light)',
      titleGradient: 'linear-gradient(to bottom, #FFFDF9 0%, #FAF0D4 55%, #D4A843 100%)',
      subtitleColor: 'rgba(245,236,200,0.8)',
      ornamentColor: 'var(--gold)',
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.saffron;

  return (
    <div style={{ textAlign: align, marginBottom: '2.5rem', ...style }}>
      {eyebrow && (
        eyebrowType === 'cursive' ? (
          <span style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(1.5rem, 4.5vw, 2.2rem)',
            color: currentTheme.eyebrowColor,
            display: 'block',
            marginBottom: '0.4rem',
            textShadow: theme === 'sand' ? 'none' : '0 2px 8px rgba(212, 168, 67, 0.2)',
          }}>
            {eyebrow}
          </span>
        ) : (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.85rem, 2vw, 0.92rem)',
            color: currentTheme.eyebrowColor,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            opacity: theme === 'sand' ? 0.8 : 0.65,
          }}>
            ✦ {eyebrow} ✦
          </p>
        )
      )}

      {title && (
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          fontWeight: 400,
          background: currentTheme.titleGradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          margin: 0,
          display: 'inline-block',
        }}>
          {title}
        </h2>
      )}

      {subtitle && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontStyle: 'italic',
          color: currentTheme.subtitleColor,
          fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
          marginTop: '0.6rem',
          maxWidth: '600px',
          marginLeft: align === 'center' ? 'auto' : 0,
          marginRight: align === 'center' ? 'auto' : 0,
          lineHeight: 1.6,
        }}>
          {subtitle}
        </p>
      )}

      {/* Ornate Divider with breathing/flickering center */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: align === 'center' ? 'center' : 'flex-start', marginTop: '1.2rem' }}>
        <div style={{ width: '60px', height: '1px', background: `linear-gradient(to right, transparent, ${currentTheme.ornamentColor})` }} />
        <span style={{ 
          color: currentTheme.ornamentColor, 
          fontSize: '0.8rem', 
          animation: theme === 'sand' ? 'none' : 'diyaFlicker 2s ease-in-out infinite' 
        }}>
          ✦ ❁ ✦
        </span>
        <div style={{ width: '60px', height: '1px', background: `linear-gradient(to left, transparent, ${currentTheme.ornamentColor})` }} />
      </div>
    </div>
  );
}
