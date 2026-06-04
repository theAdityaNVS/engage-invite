import Head from 'next/head';
import { useState, useEffect } from 'react';


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


export default function EngagementPage({ side = 'groom', musicTrack = 1, hasSideParam = false, hasMusicParam = false }) {
  const [musicAutoPlay, setMusicAutoPlay] = useState(false);
  const [entered, setEntered] = useState(false);
  const [activeSide, setActiveSide] = useState(side);
  const [activeMusicTrack, setActiveMusicTrack] = useState(musicTrack);

  // Write-effect: save params to localStorage when they were explicitly in the URL
  useEffect(() => {
    try {
      if (hasSideParam) localStorage.setItem('invite_side', activeSide);
    } catch {}
    try {
      if (hasMusicParam) localStorage.setItem('invite_music', String(activeMusicTrack));
    } catch {}
  }, []);

  // Read-effect: restore stored choices when no param was present in the URL
  useEffect(() => {
    try {
      if (!hasSideParam) {
        const stored = localStorage.getItem('invite_side');
        if (stored === 'bride' || stored === 'groom') setActiveSide(stored);
      }
    } catch {}
    try {
      if (!hasMusicParam) {
        const stored = Number(localStorage.getItem('invite_music'));
        if ([1, 2, 3].includes(stored)) setActiveMusicTrack(stored);
      }
    } catch {}
  }, []);

  return (
    <>
      <Head>
        <title>Aditya &amp; Jyoti — Engagement Invitation</title>
        <meta name="description" content="Join us to celebrate their engagement — 17th June 2026, Suryansh Hotels & Resorts, Bhubaneswar. In English, Hindi, Telugu & Odia." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#8B1A2B" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />

        {/* Open Graph / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adityanvs.in/engagement" />
        <meta property="og:title" content="Aditya & Jyoti — Engagement Invitation" />
        <meta property="og:description" content="Join us to celebrate their engagement — 17th June 2026, Suryansh Hotels & Resorts, Bhubaneswar. In English, Hindi, Telugu & Odia." />
        <meta property="og:image" content="https://adityanvs.in/og-engagement.jpg" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
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
        <div id="section-hero"><EngagementHero side={activeSide} /></div>

        <div id="section-events">
          <BlessingsSection side={activeSide} />
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
      <MusicPlayer autoPlay={musicAutoPlay} track={activeMusicTrack} />
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
