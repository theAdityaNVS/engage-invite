import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

function pad(n) {
  return String(n).padStart(2, '0');
}

function getTimeLeft(targetISO) {
  const diff = new Date(targetISO) - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function CountUnit({ value, label }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        borderColor: 'rgba(212, 168, 67, 0.45)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'clamp(68px, 11vw, 115px)',
        height: 'clamp(78px, 13vw, 120px)',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(212, 168, 67, 0.2)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0px rgba(255, 255, 255, 0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft top lighting overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '35%',
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent)',
        pointerEvents: 'none',
      }} />

      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ scale: 1.15, opacity: 0, y: 5 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: -5 }}
          transition={{ duration: 0.25 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 5vw, 3rem)',
            background: 'linear-gradient(135deg, #FFEBA7 0%, #D4A843 50%, #B58A2A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
            fontWeight: '600',
            marginBottom: '0.2rem',
            letterSpacing: '-0.01em',
          }}
        >
          {pad(value)}
        </motion.div>
      </AnimatePresence>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)',
        color: 'rgba(240, 214, 138, 0.75)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        margin: 0,
      }}>
        {label}
      </p>
    </motion.div>
  );
}

export default function CountdownTimer({ targetISO }) {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetISO));
    const interval = setInterval(() => setTimeLeft(getTimeLeft(targetISO)), 1000);
    return () => clearInterval(interval);
  }, [targetISO]);

  const isZero = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isZero) {
    return (
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
        color: '#FFEBA7',
        textAlign: 'center',
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(212, 168, 67, 0.2)',
        borderRadius: '16px',
        maxWidth: '480px',
        margin: '0 auto',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
      }}>
        🎉 {t('celebration_begins_message') || 'The celebrations begin!'} 🎉
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      gap: 'clamp(0.25rem, 1.5vw, 1rem)',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'nowrap',
    }}>
      <CountUnit value={timeLeft.days}    label={t('days')}    />
      <Separator />
      <CountUnit value={timeLeft.hours}   label={t('hours')}   />
      <Separator />
      <CountUnit value={timeLeft.minutes} label={t('minutes')} />
      <Separator />
      <CountUnit value={timeLeft.seconds} label={t('seconds')} />
    </div>
  );
}

function Separator() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.25rem',
      color: 'rgba(212, 168, 67, 0.4)',
      fontSize: '0.65rem',
      userSelect: 'none',
    }}>
      <span className="diamond-sparkle-animated" style={{ animationDelay: '0s' }}>✦</span>
      <span className="diamond-sparkle-animated" style={{ animationDelay: '1.5s' }}>✦</span>
    </div>
  );
}
