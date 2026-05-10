import Head from 'next/head';
import { useState } from 'react';

import LanguageModal from '@/components/shared/LanguageModal';
import SplashScreen from '@/components/shared/SplashScreen';
import MusicPlayer from '@/components/shared/MusicPlayer';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

import EngagementHero from '@/components/engagement/EngagementHero';
import KolamDivider from '@/components/engagement/KolamDivider';
import BlessingsSection from '@/components/engagement/BlessingsSection';
import EventCardsSection from '@/components/engagement/EventCardsSection';
import CoupleSection from '@/components/engagement/CoupleSection';
import GallerySection from '@/components/engagement/GallerySection';
import InfoCardsSection from '@/components/engagement/InfoCardsSection';
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
        <meta name="twitter:title" content={`${COUPLE.GROOM_NAME} & ${COUPLE.BRIDE_NAME} — Engagement`} />
        <meta name="twitter:description" content={`${ENGAGEMENT.DATE_DISPLAY} · ${ENGAGEMENT.VENUE_NAME}, ${ENGAGEMENT.VENUE_CITY}`} />
      </Head>

      {/* Overlays: render first so they appear above everything */}
      <LanguageModal />
      <SplashScreen onEnter={() => setMusicAutoPlay(true)} />

      <main>
        <EngagementHero />
        <KolamDivider />
        <BlessingsSection />
        <KolamDivider flip />
        <EventCardsSection />
        <KolamDivider />
        <CoupleSection />
        <GallerySection />
        <KolamDivider flip />
        <InfoCardsSection />
        <CountdownSection />
        <FooterSection />
      </main>

      {/* Fixed UI */}
      <MusicPlayer autoPlay={musicAutoPlay} />
      <LanguageSwitcher />
    </>
  );
}
