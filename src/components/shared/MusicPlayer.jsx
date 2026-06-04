import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MEDIA } from '@/config';

const VOLUME = 0.4;

// Animated equaliser bars shown when music is playing (unmuted).
function Equaliser() {
  return (
    <span style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '3px', height: '18px' }}>
      {[{ base: 8, delay: 0 }, { base: 14, delay: 0.18 }, { base: 10, delay: 0.36 }].map((bar, i) => (
        <motion.span
          key={i}
          style={{ width: '3px', borderRadius: '2px', background: '#F5DCA0', display: 'block' }}
          initial={{ height: bar.base }}
          animate={{ height: [bar.base, bar.base + 6, bar.base] }}
          transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut', delay: bar.delay }}
        />
      ))}
    </span>
  );
}

// Crossed-speaker icon shown when muted.
function MutedIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ opacity: 0.75 }}>
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="#F5DCA0" />
      <line x1="16" y1="8" x2="22" y2="16" stroke="#F5DCA0" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="8" x2="16" y2="16" stroke="#F5DCA0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function MusicPlayer({ autoPlay = false, track = 1 }) {
  const tracks = MEDIA.MUSIC_TRACKS || [];
  const [muted, setMuted] = useState(false);
  const howlRef = useRef(null);
  const startedRef = useRef(false);
  const mutedRef = useRef(false);

  const src = tracks[track - 1]?.src;

  // (Re)create the Howl whenever the selected track changes.
  useEffect(() => {
    if (!src) return;
    let mounted = true;
    let howl;
    import('howler').then(({ Howl }) => {
      if (!mounted) return;
      howl = new Howl({
        src: [src],
        html5: true,
        loop: true,
        volume: VOLUME,
        onplayerror: () => {
          howl.once('unlock', () => { if (startedRef.current && !mutedRef.current) howl.play(); });
        },
      });
      howlRef.current = howl;
      if (startedRef.current && !mutedRef.current) howl.play();
    }).catch(() => {});
    return () => {
      mounted = false;
      howl?.unload();
    };
  }, [src]);

  // Begin playback when the guest taps "YOU ARE INVITED" (autoPlay flips true).
  useEffect(() => {
    if (autoPlay && !startedRef.current) {
      startedRef.current = true;
      if (!mutedRef.current) howlRef.current?.play();
    }
  }, [autoPlay]);

  // Pause music when the page is hidden and resume when they return.
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!startedRef.current || mutedRef.current) return;
      if (document.hidden) {
        howlRef.current?.pause();
      } else {
        howlRef.current?.play();
      }
    };

    const handlePageHide = () => {
      howlRef.current?.pause();
    };

    const handlePageShow = (e) => {
      if (e.persisted && startedRef.current && !mutedRef.current) {
        howlRef.current?.play();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('pageshow', handlePageShow);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  // Mute: pause/play instead of volume(0) so iOS audio session truly stops.
  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    mutedRef.current = next;
    if (next) {
      howlRef.current?.pause();
    } else if (startedRef.current) {
      howlRef.current?.play();
    }
  };

  if (!src) return null;

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', left: '1.5rem', zIndex: 80 }}>
      <motion.button
        onClick={toggleMute}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={muted ? 'Unmute music' : 'Mute music'}
        aria-pressed={muted}
        style={circleBtn}
      >
        {muted ? <MutedIcon /> : <Equaliser />}
      </motion.button>
    </div>
  );
}

const circleBtn = {
  width: '52px', height: '52px', borderRadius: '50%',
  background: '#8B1A2B',
  border: '2px solid rgba(212,168,67,0.5)',
  cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  boxShadow: '0 4px 20px rgba(139,26,43,0.45)',
};
