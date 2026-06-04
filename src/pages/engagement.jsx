import Head from 'next/head';
import { useState } from 'react';


import SplashScreen from '@/components/shared/SplashScreen';
import MusicPlayer from '@/components/shared/MusicPlayer';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import GarlandDivider from '@/components/shared/GarlandDivider';
import MangoToranDivider from '@/components/shared/MangoToranDivider';
import KolamDivider from '@/components/shared/KolamDivider';

import AutoScrollHint from '@/components/shared/AutoScrollHint';

import EngagementHero from '@/components/engagement/EngagementHero';
import BlessingsSection from '@/components/engagement/BlessingsSection';
import EventCardsSection from '@/components/engagement/EventCardsSection';
import RouteCTA from '@/components/engagement/RouteCTA';
import CoupleSection from '@/components/engagement/CoupleSection';

import ThingsToKnow from '@/components/engagement/ThingsToKnow';
import CountdownSection from '@/components/engagement/CountdownSection';
import FooterSection from '@/components/engagement/FooterSection';

import { COUPLE, ENGAGEMENT, DOMAIN } from '@/config';

export default function EngagementPage({ side = 'groom', musicTrack = 1, hasSideParam = false, hasMusicParam = false }) {
  const [musicAutoPlay, setMusicAutoPlay] = useState(false);
  const [entered, setEntered] = useState(false);

  return (
    <>
      <Head>
        <title>{`${COUPLE.GROOM_NAME} & ${COUPLE.BRIDE_NAME} — Engagement`}</title>
        <meta name="description" content="Join us for Aditya & Jyoti's engagement — 17 June, Suryansh Hotel, Bhubaneswar. In English, Hindi, Telugu & Odia." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
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
        {/* Fonts (incl. Great Vibes) are loaded once in _document.js */}
      </Head>

      {/* Overlays */}
      <SplashScreen onEnter={() => {
        setMusicAutoPlay(true);
        setEntered(true);
        window.scrollTo(0, 0);
      }} />


      <main>
        <div id="section-hero"><EngagementHero /></div>

        <div id="section-events">
          <BlessingsSection side={side} />
          <EventCardsSection />
          <RouteCTA />
        </div>

        <GarlandDivider fromColor="var(--saffron)" toColor="var(--burgundy)" />

        <div id="section-couple">
          <CoupleSection />
        </div>

        <MangoToranDivider fromColor="var(--burgundy)" toColor="var(--sand)" />

        <div id="section-info"><ThingsToKnow /></div>

        <KolamDivider fromColor="var(--sand)" toColor="var(--navy)" />

        <div id="section-countdown">
          <CountdownSection />
          <FooterSection />
        </div>
      </main>

      {/* Fixed UI */}

      {entered && <AutoScrollHint />}
      <MusicPlayer autoPlay={musicAutoPlay} />
      {entered && <LanguageSwitcher />}
    </>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const side = query.side === 'bride' ? 'bride' : 'groom';
    const musicTrack = [1, 2, 3].includes(Number(query.music))
      ? Number(query.music) : 1;
    return {
      props: {
        side,
        musicTrack,
        hasSideParam:  'side'  in query,
        hasMusicParam: 'music' in query,
      },
    };
  } catch {
    return { props: { side: 'groom', musicTrack: 1, hasSideParam: false, hasMusicParam: false } };
  }
}
