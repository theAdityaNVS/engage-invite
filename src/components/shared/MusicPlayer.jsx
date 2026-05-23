import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MEDIA } from '@/config';

export default function MusicPlayer({ autoPlay = false }) {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);
  const howlRef = useRef(null);

  useEffect(() => {
    if (!MEDIA.MUSIC_SRC) { setVisible(false); return; }
    let mounted = true;
    import('howler').then(({ Howl }) => {
      if (!mounted) return;
      howlRef.current = new Howl({
        src: [MEDIA.MUSIC_SRC],
        loop: true,
        volume: 0.4,
        onloaderror: () => setVisible(false),
        onplayerror: () => setPlaying(false),
      });
      if (autoPlay) {
        howlRef.current.play();
        setPlaying(true);
      }
    }).catch(() => {});
    return () => {
      mounted = false;
      howlRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    if (autoPlay && howlRef.current && !playing) {
      howlRef.current.play();
      setPlaying(true);
    }
  }, [autoPlay]);

  const toggle = () => {
    if (!howlRef.current) return;
    if (playing) {
      howlRef.current.pause();
      setPlaying(false);
    } else {
      howlRef.current.play();
      setPlaying(true);
    }
  };

  if (!visible) return null;

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      style={{
        position: 'fixed', top: '1.2rem', right: '1.2rem', zIndex: 80,
        width: '48px', height: '48px', borderRadius: '50%',
        background: '#8B1A2B',
        border: '2px solid rgba(212,168,67,0.5)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(139,26,43,0.4)',
        fontSize: '1.3rem',
      }}
      title={playing ? 'Pause music' : 'Play music'}
      aria-label={playing ? 'Pause background music' : 'Play background music'}
    >
      {playing ? (
        <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
          🎵
        </motion.span>
      ) : (
        <span style={{ opacity: 0.7 }}>🔇</span>
      )}
    </motion.button>
  );
}
