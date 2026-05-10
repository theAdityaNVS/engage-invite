import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lora:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Noto+Serif+Devanagari:wght@400;600&family=Noto+Serif+Telugu:wght@400;600&family=Noto+Sans+Odia:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body suppressHydrationWarning>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
