import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

export default function InfoCard({ icon, title, children, delay = 0 }) {
  return (
    <ScrollReveal delay={delay}>
      <motion.div
        whileInView={{ scale: [0.85, 1.03, 1], opacity: [0, 1, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        style={{
          background: '#FFF8F0',
          border: '1px solid rgba(212,168,67,0.35)',
          borderRadius: '16px',
          padding: '1.5rem',
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(139,26,43,0.06)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div style={{ fontSize: '2.2rem' }}>{icon}</div>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1rem',
          color: '#8B1A2B',
          letterSpacing: '0.05em',
        }}>
          {title}
        </h3>
        <div style={{
          fontFamily: "'Lora', serif",
          fontSize: '0.88rem',
          color: '#6B4E3D',
          lineHeight: 1.6,
        }}>
          {children}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}
