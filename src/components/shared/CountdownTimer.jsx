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
    <div style={{ textAlign: 'center', minWidth: '70px' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            color: '#FFF8F0',
            lineHeight: 1,
            marginBottom: '0.4rem',
          }}
        >
          {pad(value)}
        </motion.div>
      </AnimatePresence>
      <p style={{
        fontFamily: "'Lora', serif",
        fontSize: '0.7rem',
        color: 'rgba(255,248,240,0.7)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
      }}>
        {label}
      </p>
    </div>
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
      <div style={{ textAlign: 'center', fontSize: '2rem' }}>
        🎉 The celebrations begin! 🎉
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: 'clamp(1rem, 4vw, 3rem)', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
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
    <span style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: 'clamp(2rem, 6vw, 3rem)',
      color: 'rgba(212,168,67,0.7)',
      lineHeight: 1,
      marginBottom: '1.2rem',
    }}>
      :
    </span>
  );
}
