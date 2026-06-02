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

    let lenis;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }).catch(() => {});
    return () => lenis?.destroy();
  }, []);

  return (
    <LanguageProvider>
      <Component {...pageProps} />
      <Analytics />
      <VisitTracker />
    </LanguageProvider>
  );
}
