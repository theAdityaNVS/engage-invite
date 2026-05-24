import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AutoScrollHint() {
  const [visible, setVisible] = useState(false);
  const idleTimer = useRef(null);
  const scrollTimer = useRef(null);

  useEffect(() => {
    const resetIdle = () => {
      setVisible(false);
      clearTimeout(idleTimer.current);
      clearTimeout(scrollTimer.current);

      idleTimer.current = setTimeout(() => {
        const nearBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 200;
        if (nearBottom) return;
        setVisible(true);
        scrollTimer.current = setTimeout(() => {
          const nearBottom2 = window.scrollY + window.innerHeight >= document.body.scrollHeight - 200;
          if (!nearBottom2) window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
          setVisible(false);
        }, 3000);
      }, 20000);
    };

    window.addEventListener('scroll',     resetIdle, { passive: true });
    window.addEventListener('touchstart', resetIdle, { passive: true });
    window.addEventListener('click',      resetIdle);
    resetIdle();

    return () => {
      clearTimeout(idleTimer.current);
      clearTimeout(scrollTimer.current);
      window.removeEventListener('scroll',     resetIdle);
      window.removeEventListener('touchstart', resetIdle);
      window.removeEventListener('click',      resetIdle);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed', bottom: '2.5rem', left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 60, pointerEvents: 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
          }}
        >
          <span style={{
            fontFamily: "'Lora', serif", fontSize: '0.7rem',
            color: 'rgba(212,168,67,0.7)', letterSpacing: '0.12em',
          }}>Scroll</span>
          <div style={{
            fontSize: '1.4rem', color: 'rgba(212,168,67,0.8)',
            animation: 'chevronBounce 0.8s ease-in-out infinite',
          }}>⌄</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
