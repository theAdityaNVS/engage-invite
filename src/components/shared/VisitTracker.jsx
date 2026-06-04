import { useEffect } from 'react';

// Client beacon: fires once per browser session to /api/track. We log on the
// client (not the server request) so link-preview crawlers — which fetch the
// page but never run JS — don't count as opens. IP/geo are still read
// server-side from the request headers when this POST lands, so they're trusted.
//
// Renders nothing. Mount once near the app root.
export default function VisitTracker() {
  useEffect(() => {
    // Exclude admin dashboard and API routes from visitor analytics logging
    if (typeof window !== 'undefined' && (window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/api'))) {
      return;
    }

    // Once per session, across all pages — keyed in sessionStorage.
    let logged;
    try { logged = sessionStorage.getItem('visit_logged'); } catch { logged = null; }
    if (logged) return;

    let session_id;
    try {
      session_id = sessionStorage.getItem('visit_session');
      if (!session_id) {
        session_id =
          (crypto?.randomUUID?.() ||
            `${Date.now()}-${Math.random().toString(36).slice(2)}`);
        sessionStorage.setItem('visit_session', session_id);
      }
    } catch {
      session_id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }

    // Share-link params: which side/music the guest opened the invite with.
    const params = new URLSearchParams(window.location.search);
    const rawSide = params.get('side');
    const rawMusic = Number(params.get('music'));
    const rawLang = params.get('lang');
    const invite_side = rawSide === 'bride' || rawSide === 'groom' ? rawSide : null;
    const invite_music = [1, 2, 3].includes(rawMusic) ? rawMusic : null;
    const invite_lang = ['en', 'hi', 'te', 'or'].includes(rawLang) ? rawLang : null;

    const payload = {
      path: window.location.pathname,
      screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
      language: navigator.language || null,
      referrer: document.referrer || null,
      session_id,
      invite_side,
      invite_music,
      invite_lang,
    };

    // Mark logged immediately to dedupe Strict-Mode double-invoke and fast refresh.
    try { sessionStorage.setItem('visit_logged', '1'); } catch {}

    const body = JSON.stringify(payload);
    // sendBeacon survives page unload; fetch keepalive is the fallback.
    try {
      const blob = new Blob([body], { type: 'application/json' });
      if (!navigator.sendBeacon || !navigator.sendBeacon('/api/track', blob)) {
        throw new Error('beacon-unavailable');
      }
    } catch {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  }, []);

  return null;
}
