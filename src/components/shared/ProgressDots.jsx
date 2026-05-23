import { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'section-hero',      label: 'Hero'      },
  { id: 'section-events',    label: 'Events'    },
  { id: 'section-couple',    label: 'Couple'    },
  { id: 'section-info',      label: 'Info'      },
  { id: 'section-family',    label: 'Family'    },
  { id: 'section-countdown', label: 'Countdown' },
];

export default function ProgressDots() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers = SECTIONS.map((sec, idx) => {
      const el = document.getElementById(sec.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(idx); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{
      position: 'fixed', right: '1.2rem', top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 70,
      display: 'flex', flexDirection: 'column', gap: '10px',
      alignItems: 'center',
    }}>
      {SECTIONS.map((sec, i) => (
        <div key={sec.id} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            title={sec.label}
            onClick={() => scrollTo(sec.id)}
            style={{
              width:  i === active ? 11 : 8,
              height: i === active ? 11 : 8,
              borderRadius: '50%',
              background:  i === active ? '#D4A843' : 'transparent',
              border: `1.5px solid ${i === active ? '#D4A843' : 'rgba(212,168,67,0.4)'}`,
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
              outline: 'none',
            }}
          />
        </div>
      ))}
    </div>
  );
}
