import "@/styles/globals.css";
import { useEffect } from "react";
import { LanguageProvider } from "@/hooks/useLanguage";
import { Analytics } from "@vercel/analytics/react";
import VisitTracker from "@/components/shared/VisitTracker";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Disable automatic browser scroll restoration on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Block pinch-zoom on iOS Safari (it ignores the viewport maximum-scale flag)
    const preventGesture = (e) => e.preventDefault();
    document.addEventListener('gesturestart', preventGesture);
    document.addEventListener('gesturechange', preventGesture);
    document.addEventListener('gestureend', preventGesture);

    // Lenis smooth scroll — disabled on iOS because Lenis uses transform-based
    // scrolling as a fallback on iOS Safari, which breaks `position: fixed`
    // children (they get pulled to the center or stuck). iOS already has
    // excellent native momentum scrolling so Lenis adds no benefit there.
    const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    let lenis;
    if (!isIOS) {
      import("lenis").then(({ default: Lenis }) => {
        lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }).catch(() => {});
    }
    return () => {
      lenis?.destroy();
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
      document.removeEventListener('gestureend', preventGesture);
    };
  }, []);

  return (
    <LanguageProvider>
      <Component {...pageProps} />
      <Analytics />
      <VisitTracker />
    </LanguageProvider>
  );
}
