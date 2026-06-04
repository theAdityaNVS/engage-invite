import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Music-note icon for the track-menu button.
function NoteIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 18V6l10-2v12" stroke="#F5DCA0" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6.5" cy="18" r="2.6" fill="#F5DCA0" />
      <circle cx="16.5" cy="16" r="2.6" fill="#F5DCA0" />
    </svg>
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
  const [currentTrack, setCurrentTrack] = useState(track); // 1-based id
  const [muted, setMuted] = useState(false);
  const [open, setOpen] = useState(false);
  const howlRef = useRef(null);
  const startedRef = useRef(false); // music has begun (after the splash "enter" gesture)
  const mutedRef = useRef(false);   // latest muted value for use inside the loader effect
  const containerRef = useRef(null);

  const src = tracks[currentTrack - 1]?.src;

  // (Re)create the Howl whenever the selected track changes. We stream via HTML5
  // audio (html5: true) so the track plays immediately instead of downloading the
  // whole file first — and so autoplay-after-gesture works reliably on mobile.
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
        volume: mutedRef.current ? 0 : VOLUME,
        onplayerror: () => {
          // Autoplay blocked until a gesture — retry once the context unlocks.
          howl.once('unlock', () => { if (startedRef.current) howl.play(); });
        },
      });
      howlRef.current = howl;
      if (startedRef.current) howl.play(); // keep playing across track switches
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
      howlRef.current?.play();
    }
  }, [autoPlay]);

  // Close the panel when clicking/tapping outside it.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, [open]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    mutedRef.current = next;
    howlRef.current?.volume(next ? 0 : VOLUME);
  };

  const pickTrack = (id) => {
    if (id === currentTrack) return;
    startedRef.current = true; // tapping a track is a gesture → ensure it plays
    setCurrentTrack(id);       // triggers the [src] effect → new Howl → play
  };

  if (!src) return null; // no tracks configured at all

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', bottom: '1.5rem', left: '1.5rem', zIndex: 80, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginBottom: '0.7rem',
              width: '210px',
              background: 'rgba(30, 8, 12, 0.82)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(212,168,67,0.35)',
              borderRadius: '16px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
              padding: '0.85rem',
              color: '#F5ECC8',
              fontFamily: 'var(--font-body)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#D4A843' }}>
                <span style={{ fontSize: '0.95rem' }}>♪</span> Music
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close music menu"
                style={{ background: 'none', border: 'none', color: 'rgba(245,236,200,0.6)', cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: '2px 4px' }}
              >
                ✕
              </button>
            </div>

            <div style={{ height: '1px', background: 'rgba(212,168,67,0.2)', margin: '0 0 0.55rem' }} />

            {/* Track list */}
            {tracks.map((tk) => {
              const active = tk.id === currentTrack;
              return (
                <button
                  key={tk.id}
                  onClick={() => pickTrack(tk.id)}
                  aria-label={`Play ${tk.label}`}
                  aria-pressed={active}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: active ? 'rgba(212,168,67,0.16)' : 'transparent',
                    border: 'none',
                    borderRadius: '10px',
                    minHeight: '40px',
                    padding: '0.4rem 0.6rem',
                    cursor: 'pointer',
                    color: active ? '#F5DCA0' : 'rgba(245,236,200,0.78)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: active ? 600 : 400,
                    textAlign: 'left',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <span style={{ width: '14px', display: 'flex', justifyContent: 'center', color: active ? '#D4A843' : 'rgba(245,236,200,0.4)' }}>
                    {active ? (muted ? '◌' : '●') : '○'}
                  </span>
                  {tk.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed controls: dedicated mute toggle + track-menu opener */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
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

        <motion.button
          onClick={() => setOpen((o) => !o)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Choose music track"
          aria-expanded={open}
          style={circleBtn}
        >
          <NoteIcon />
        </motion.button>
      </div>
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
