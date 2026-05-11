import Head from 'next/head';
import { useState } from 'react';

import LanguageBanner from '@/components/shared/LanguageBanner';
import SplashScreen from '@/components/shared/SplashScreen';
import MusicPlayer from '@/components/shared/MusicPlayer';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import VintageCarDivider from '@/components/shared/VintageCarDivider';

import EngagementHero from '@/components/engagement/EngagementHero';
import BlessingsSection from '@/components/engagement/BlessingsSection';
import EventCardsSection from '@/components/engagement/EventCardsSection';
import RouteCTA from '@/components/engagement/RouteCTA';
import CoupleSection from '@/components/engagement/CoupleSection';
import RSVPSection from '@/components/engagement/RSVPSection';
import GallerySection from '@/components/engagement/GallerySection';
import ThingsToKnow from '@/components/engagement/ThingsToKnow';
import InstagramSection from '@/components/engagement/InstagramSection';
import CountdownSection from '@/components/engagement/CountdownSection';
import FooterSection from '@/components/engagement/FooterSection';

import { COUPLE, ENGAGEMENT, DOMAIN } from '@/config';

export default function EngagementPage() {
  const [musicAutoPlay, setMusicAutoPlay] = useState(false);

  return (
    <>
      <Head>
        <title>{COUPLE.GROOM_NAME} &amp; {COUPLE.BRIDE_NAME} — Engagement</title>
        <meta name="description" content={`You are cordially invited to the engagement ceremony of ${COUPLE.GROOM_NAME} & ${COUPLE.BRIDE_NAME} on ${ENGAGEMENT.DATE_DISPLAY} at ${ENGAGEMENT.VENUE_NAME}, ${ENGAGEMENT.VENUE_CITY}.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={DOMAIN.ENGAGEMENT} />
        <meta property="og:title" content={`${COUPLE.GROOM_NAME} & ${COUPLE.BRIDE_NAME} — Engagement Invitation`} />
        <meta property="og:description" content={`Join us for the engagement ceremony on ${ENGAGEMENT.DATE_DISPLAY} at ${ENGAGEMENT.VENUE_NAME}, ${ENGAGEMENT.VENUE_CITY}. Available in English, Hindi, Telugu & Odia.`} />
        <meta property="og:image" content={`${DOMAIN.BASE}/og-engagement.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Google Fonts — include Great Vibes for countdown script */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Overlays */}
      <SplashScreen onEnter={() => setMusicAutoPlay(true)} />
      <LanguageBanner />

      <main>
        {/* S-1: Hero — Jagannath temple (Odishan), floating lanterns, stacked names */}
        <EngagementHero />

        {/* S-2 + S-3: Blessings + Event Cards — teal */}
        <BlessingsSection />
        <EventCardsSection />

        {/* S-4: Route CTA — teal */}
        <RouteCTA />

        {/* Divider #1 — blue Mercedes between teal and rose */}
        <VintageCarDivider color="blue" fromColor="var(--teal)" toColor="var(--rose)" />

        {/* S-5: Couple — rose mauve */}
        <CoupleSection />

        {/* S-6: RSVP — rose mauve */}
        <RSVPSection />

        {/* S-7: Gallery — rose mauve */}
        <GallerySection />

        {/* Divider #2 — black 1940s sedan between rose and olive */}
        <VintageCarDivider color="black" fromColor="var(--rose)" toColor="var(--olive)" />

        {/* S-8: Things to Know — olive */}
        <ThingsToKnow />

        {/* S-9: Follow the Action — olive */}
        <InstagramSection />

        {/* Gradient transition to navy */}
        <div style={{
          height: 60,
          background: 'linear-gradient(180deg, var(--olive) 0%, var(--navy) 100%)',
        }} />

        {/* S-10: Countdown — dark navy */}
        <CountdownSection />

        {/* S-11: Footer — dark navy + Tirupati gopuram night */}
        <FooterSection />
      </main>

      {/* Fixed UI */}
      <MusicPlayer autoPlay={musicAutoPlay} />
      <LanguageSwitcher />
    </>
  );
}
