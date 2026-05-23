import "@/styles/globals.css";
import { useEffect } from "react";
import { LanguageProvider } from "@/hooks/useLanguage";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
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
    </LanguageProvider>
  );
}
