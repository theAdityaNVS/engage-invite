# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Next.js version note (from AGENTS.md):** This project uses Next.js 16.x — APIs, conventions, and file structure may differ from training data. Read relevant guides in `node_modules/next/dist/docs/` before writing any code.

> **Workspace scope:** This repo is a shared workspace for two future sites — the engagement invite (`/engagement`) and a wedding invite (root `/`). **Current work is restricted to `engage-invite` only.** Do not touch wedding-related scaffolding or create wedding components until that project is explicitly started.

---

## Commands

```bash
npm run dev      # start dev server (uses --webpack flag, not Turbopack)
npm run build    # production build
npm start        # serve production build locally
```

No test runner is configured. No lint script is defined.

---

## Architecture

### Pages Router (not App Router)

This project uses **Next.js Pages Router** (`src/pages/`). There is no `app/` directory.

- `src/pages/_app.js` — global provider wrapper (LanguageProvider + Lenis smooth scroll init + Analytics)
- `src/pages/_document.js` — HTML document shell
- `src/pages/engagement.jsx` — the only page currently built (`/engagement`)
- `src/pages/index.js` — wedding page (not yet built)

Path alias `@/` maps to `src/` (defined in `jsconfig.json`).

### Single Config File

**All content lives in `src/config/index.js`.** No hardcoded strings, dates, coordinates, or names in component files. The config exports:

- `COUPLE` — names, hashtag, Instagram handle
- `ENGAGEMENT` — date, venue, coordinates, events array (3 events), weather advisory, muhurtham time
- `WEDDING` — date, venue, coordinates
- `GOOGLE_API` — reads `NEXT_PUBLIC_MAPS_API_KEY` and `NEXT_PUBLIC_WEATHER_API_KEY` from env
- `FAMILIES` — parent and sibling names, gotra, nakshatra
- `TRANSLATIONS.NAMES` — couple names in all four scripts (en/hi/te/or)
- `DOMAIN` — base URL and per-site URLs
- `MEDIA` — paths for music and couple photos

### Language System

`LanguageProvider` (in `src/hooks/useLanguage.js`) wraps the whole app in `_app.js`. Components call `useLanguage()` to get `{ lang, setLang, t, hasStoredLang, isReady }`.

- `t(key)` looks up a key in the loaded translation object, falling back to the key itself
- Translation JSON files live in `public/translations/{en,hi,te,or}.json`
- `loadTranslations()` in `src/utils/i18n.js` fetches and in-memory caches translations
- Chosen language persists to `localStorage` key `invite_lang`
- `SplashScreen` only shows once per browser session (guarded by `sessionStorage` key `splash_shown`)

### Section Architecture

The engagement page is divided into 5 named sections with `id` attributes that `AutoScrollHint` depends on:

| Section ID | Content |
|---|---|
| `section-hero` | EngagementHero |
| `section-events` | BlessingsSection + EventCardsSection + RouteCTA |
| `section-couple` | CoupleSection (couple message, WhatsApp share, gallery) |
| `section-info` | ThingsToKnow |
| `section-countdown` | CountdownSection + FooterSection |

**Do not rename these IDs.** `ProgressDots` was removed — `AutoScrollHint` uses them for scroll-position tracking.

### Color / Theme System

Tailwind v4 is used with `@theme {}` in `src/styles/globals.css` (not a `tailwind.config.js`). The CSS also defines a sectional color system via `:root` custom properties used directly in inline styles:

- `--saffron` / `--saffron-dark` / `--saffron-text` — Blessings, Events, RouteCTA sections
- `--burgundy` / `--burgundy-dark` / `--burgundy-text` — Couple, RSVP, Gallery sections
- `--sand` / `--sand-dark` / `--sand-text` — ThingsToKnow, Instagram sections
- `--navy` / `--navy-dark` / `--navy-text` — Countdown, Footer sections
- `--gold` / `--gold-light` / `--cream` — shared accents throughout

Legacy aliases (`--teal`, `--rose`, `--olive`, `--primary`, etc.) exist for backward compatibility but the sectional names are canonical.

### Shared vs. Engagement-Specific Components

- `src/components/shared/` — used across both sites (SplashScreen, LanguageBanner, MusicPlayer, ProgressDots, dividers, etc.)
- `src/components/engagement/` — specific to `/engagement` page

### Key Shared Components

- `SplashScreen` — temple-door animation + 4-chip language selector (top-right) + "YOU ARE INVITED" CTA; skips language picker if `hasStoredLang` is true. Uses `useEffect` to safely trigger side-effects like state transitions.
- `AutoScrollHint` — chevron that appears after 20s idle, dismissed on any scroll
- `GarlandDivider`, `MangoToranDivider`, `KolamDivider` — decorative SVG section dividers; accept `fromColor`/`toColor` props. SVGs dynamically calculate points padded to 4 decimal places via `toFixed(4)` to prevent server/client hydration mismatches.
- `ScrollReveal` — IntersectionObserver wrapper that triggers Framer Motion fade-up animations
- `ClientOnly` — SSR guard wrapper for browser-only components
- `AnimatedPhoto` — Accepts `src` prop with Ghibli filter, falls back to placeholder gradient.

### Static Assets

- `public/translations/` — `en.json`, `hi.json`, `te.json`, `or.json`
- `public/illustrations/` — `jagannath-temple-day.png`, `tirupati-gopuram-night.png`
- OG image expected at `public/og-engagement.jpg`
- `public/music/` and `public/images/` for dynamic assets.

### Visit Analytics & Admin Dashboard

A visit-tracking system sits alongside the invite pages, backed by Neon Postgres:

- `src/lib/db.js` — lazy `getSql()` singleton around `@neondatabase/serverless`. Returns `null` if `DATABASE_URL` is unset; every caller must treat that as "analytics disabled," never crash.
- `src/lib/site.js` — `deriveSite(path)` is the **single source of truth** for path → site (`'engagement'` vs `'wedding'`) mapping. Keep the tracker, API, and dashboard all deriving site from this one function.
- `src/lib/ua.js` — minimal user-agent parser (`parseUA`) for browser/OS/device_type.
- `src/pages/api/track.js` — POST-only visit beacon. Reads IP/geo/UA from trusted server-side headers (Vercel's `x-vercel-ip-*`), merges client-supplied beacon fields (screen, viewport, timezone, session id, `invite_side`/`invite_music`/`invite_lang` share-link params), inserts one row into `visits`. **Always fails silently (returns 204/200 on any error)** — analytics must never break the invite for a guest.
- `src/pages/api/visits.js` — reads back visit rows for the dashboard (protected route, see below).
- `src/components/shared/VisitTracker.jsx` — client-side component that fires the beacon on page load.
- `src/pages/admin/visits.jsx` — analytics dashboard UI.
- `src/pages/links.jsx` — internal (noindex) tool to generate/copy/QR-code shareable invite URLs with `?side=`, `?lang=`, `?music=` params per family/language combo; links to the analytics dashboard.

**Admin auth**: `src/proxy.js` is Next.js 16's edge middleware entrypoint (`proxy()` replaces the old `middleware()` export name). It guards `/admin/:path*` and `/api/visits` with a signed, expiring cookie session (`admin_session`), verified via `verifySessionToken()` (SHA-256 HMAC-style using `ADMIN_PASS` as the local secret). Login flow: `src/pages/admin/login.jsx` → `src/pages/api/admin/login.js` issues the cookie; `src/pages/api/admin/logout.js` clears it. If `ADMIN_USER`/`ADMIN_PASS` are unset, protected routes return a 500 config-error rather than silently allowing access.

### Environment Variables

Copy `.env.local.example` to `.env.local`:

```
NEXT_PUBLIC_MAPS_API_KEY=   # Google Maps JavaScript API (client-side)
WEATHER_API_KEY=            # OpenWeatherMap API key — server-side only, proxied via /api/weather
DATABASE_URL=                # Neon Postgres pooled connection string (visit analytics)
ADMIN_USER=                  # Basic auth user for /admin/visits and /api/visits
ADMIN_PASS=                  # Basic auth password — also used as the session-signing secret
```

Note: `useWeather` never calls OpenWeatherMap directly from the browser — it goes through `src/pages/api/weather.js`, which holds the key server-side and returns `null` (not an error) on any failure so the UI falls back to static advisory text.

### Deployment

- Vercel project: `aditya-jyoti-engage`
- Production URL: `jyoti-engages.adityanvs.in`
- See `INFRASTRUCTURE.md` for GCP services (Maps + Places APIs)
- Analytics uses `@vercel/analytics/react` (not `/next` because of Pages Router).
