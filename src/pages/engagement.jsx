import Head from 'next/head';
import { useState } from 'react';

import LanguageBanner from '@/components/shared/LanguageBanner';
import SplashScreen from '@/components/shared/SplashScreen';
import MusicPlayer from '@/components/shared/MusicPlayer';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import GarlandDivider from '@/components/shared/GarlandDivider';
import MangoToranDivider from '@/components/shared/MangoToranDivider';
import KolamDivider from '@/components/shared/KolamDivider';
import ProgressDots from '@/components/shared/ProgressDots';
import AutoScrollHint from '@/components/shared/AutoScrollHint';

import EngagementHero from '@/components/engagement/EngagementHero';
import BlessingsSection from '@/components/engagement/BlessingsSection';
import EventCardsSection from '@/components/engagement/EventCardsSection';
import RouteCTA from '@/components/engagement/RouteCTA';
import CoupleSection from '@/components/engagement/CoupleSection';
import RSVPSection from '@/components/engagement/RSVPSection';
import GallerySection from '@/components/engagement/GallerySection';
import ThingsToKnow from '@/components/engagement/ThingsToKnow';
import FamilyShlokaSection from '@/components/engagement/FamilyShlokaSection';
import CountdownSection from '@/components/engagement/CountdownSection';
import FooterSection from '@/components/engagement/FooterSection';

import { COUPLE, ENGAGEMENT, DOMAIN } from '@/config';

export default function EngagementPage() {
  const [musicAutoPlay, setMusicAutoPlay] = useState(false);

  return (
    <>
      <Head>
        <title>{COUPLE.GROOM_NAME} &amp; {COUPLE.BRIDE_NAME} — Engagement</title>
        <meta name="description" content="Join us for Aditya & Jyoti's engagement — 17 June, Suryansh Hotel, Bhubaneswar. In English, Hindi, Telugu & Odia." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8B1A2B" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={DOMAIN.ENGAGEMENT} />
        <meta property="og:title" content={`${COUPLE.GROOM_NAME} & ${COUPLE.BRIDE_NAME} — Engagement Invitation`} />
        <meta property="og:description" content="Join us for Aditya & Jyoti's engagement — 17 June, Suryansh Hotel, Bhubaneswar. In English, Hindi, Telugu & Odia." />
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
        <div id="section-hero"><EngagementHero /></div>

        <div id="section-events">
          <BlessingsSection />
          <EventCardsSection />
          <RouteCTA />
        </div>

        <GarlandDivider fromColor="var(--saffron)" toColor="var(--burgundy)" />

        <div id="section-couple">
          <CoupleSection />
          <RSVPSection />
          <GallerySection />
        </div>

        <MangoToranDivider fromColor="var(--burgundy)" toColor="var(--sand)" />

        <div id="section-info"><ThingsToKnow /></div>

        <div id="section-family"><FamilyShlokaSection /></div>

        <KolamDivider fromColor="var(--sand)" toColor="var(--navy)" />

        <div id="section-countdown">
          <CountdownSection />
          <FooterSection />
        </div>
      </main>

      {/* Fixed UI */}
      <ProgressDots />
      <AutoScrollHint />
      <MusicPlayer autoPlay={musicAutoPlay} />
      <LanguageSwitcher />
    </>
  );
}
