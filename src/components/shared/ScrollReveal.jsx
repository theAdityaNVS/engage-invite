import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ScrollReveal({ children, delay = 0, duration = 0.7, className, style }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      className={className}
      style={{
        willChange: 'transform, opacity',
        ...style,
      }}
      initial={{ opacity: 0, y: isMobile ? 12 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isMobile ? '-6%' : '-15%' }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

