import { motion } from 'framer-motion';

const FLOAT_TRANSITION = { duration: 4, repeat: Infinity, ease: 'easeInOut' };

export default function AnimatedPhoto({ width, height, alt, className, style = {}, index = 0, src }) {
  const floatDelay = (index % 3) * 0.8;

  if (src) {
    return (
      <motion.div
        className={className}
        animate={{ y: [0, -6, 0] }}
        transition={{ ...FLOAT_TRANSITION, delay: floatDelay }}
        whileHover={{ scale: 1.02 }}
        style={{
          width: width || '100%',
          height: height || '100%',
          borderRadius: '8px',
          border: '2px solid rgba(212,168,67,0.5)',
          boxShadow: '0 4px 20px rgba(139,26,43,0.2), inset 0 0 0 1px rgba(212,168,67,0.15)',
          overflow: 'hidden',
          ...style,
        }}
      >
        <img
          src={src}
          alt={alt || ''}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: 'saturate(1.3) sepia(0.15) hue-rotate(-10deg) brightness(1.05)',
            display: 'block',
          }}
        />
      </motion.div>
    );
  }

  const gradients = [
    'linear-gradient(135deg, #8B1A2B 0%, #C44D5E 40%, #D4A843 100%)',
    'linear-gradient(135deg, #D4A843 0%, #8B1A2B 60%, #1B6B4A 100%)',
    'linear-gradient(160deg, #C44D5E 0%, #8B1A2B 50%, #D4A843 100%)',
    'linear-gradient(120deg, #1B6B4A 0%, #8B1A2B 50%, #D4A843 100%)',
    'linear-gradient(150deg, #D4A843 0%, #C44D5E 40%, #8B1A2B 100%)',
    'linear-gradient(140deg, #8B1A2B 0%, #1B6B4A 50%, #D4A843 100%)',
  ];

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -6, 0] }}
      transition={{ ...FLOAT_TRANSITION, delay: floatDelay }}
      whileHover={{ scale: 1.02, filter: 'brightness(1.08)' }}
      style={{
        width: width || '100%',
        height: height || '100%',
        background: gradients[index % gradients.length],
        borderRadius: '8px',
        border: '2px solid rgba(212,168,67,0.5)',
        boxShadow: '0 4px 20px rgba(139,26,43,0.2), inset 0 0 0 1px rgba(212,168,67,0.15)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        ...style,
      }}
      role="img"
      aria-label={alt || 'Photo placeholder'}
    >
      {/* Shimmer overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 3s ease-in-out infinite',
      }} />
      {/* Decorative corner */}
      <div style={{
        position: 'absolute', top: 8, left: 8, right: 8, bottom: 8,
        border: '1px solid rgba(212,168,67,0.3)',
        borderRadius: '4px',
        pointerEvents: 'none',
      }} />
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </motion.div>
  );
}
