import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MEDIA } from '@/config';

export default function MusicPlayer({ autoPlay = false, track = 1 }) {
  const [muted, setMuted] = useState(false);
  const [visible, setVisible] = useState(true);
  const howlRef = useRef(null);
  const startedRef = useRef(false);

  const src = MEDIA.MUSIC_TRACKS?.[track - 1]?.src;

  useEffect(() => {
    if (!src) { setVisible(false); return; }
    let mounted = true;
    import('howler').then(({ Howl }) => {
      if (!mounted) return;
      howlRef.current = new Howl({
        src: [src],
        loop: true,
        volume: 0.4,
        onloaderror: () => setVisible(false),
        onplayerror: () => {},
      });
      if (autoPlay && !startedRef.current) {
        howlRef.current.play();
        startedRef.current = true;
      }
    }).catch(() => {});
    return () => {
      mounted = false;
      howlRef.current?.unload();
    };
  }, [src]);

  useEffect(() => {
    if (autoPlay && howlRef.current && !startedRef.current) {
      howlRef.current.play();
      startedRef.current = true;
    }
  }, [autoPlay]);

  const toggle = () => {
    if (!howlRef.current) return;
    howlRef.current.volume(muted ? 0.4 : 0);
    setMuted(!muted);
  };

  if (!visible) return null;

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      style={{
        position: 'fixed', bottom: '1.5rem', left: '1.5rem', zIndex: 80,
        width: '52px', height: '52px', borderRadius: '50%',
        background: '#8B1A2B',
        border: '2px solid rgba(212,168,67,0.5)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(139,26,43,0.45)',
      }}
      title={muted ? 'Unmute music' : 'Mute music'}
      aria-label={muted ? 'Unmute background music' : 'Mute background music'}
    >
      {muted ? (
        <span style={{ opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 9v6h4l5 4V5L8 9H4z"
              fill="#F5DCA0"
            />
            <line x1="16" y1="8" x2="22" y2="16" stroke="#F5DCA0" strokeWidth="2" strokeLinecap="round" />
            <line x1="22" y1="8" x2="16" y2="16" stroke="#F5DCA0" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      ) : (
        <span style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '3px', height: '18px' }}>
          {[
            { base: 8, delay: 0 },
            { base: 14, delay: 0.18 },
            { base: 10, delay: 0.36 },
          ].map((bar, i) => (
            <motion.span
              key={i}
              style={{
                width: '3px',
                borderRadius: '2px',
                background: '#F5DCA0',
                display: 'block',
              }}
              initial={{ height: bar.base }}
              animate={{ height: [bar.base, bar.base + 6, bar.base] }}
              transition={{
                repeat: Infinity,
                duration: 0.9,
                ease: 'easeInOut',
                delay: bar.delay,
              }}
            />
          ))}
        </span>
      )}
    </motion.button>
  );
}
