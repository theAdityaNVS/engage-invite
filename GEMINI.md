# GEMINI.md

This file provides guidance to Gemini / Antigravity when working with code in this repository.

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

### Section Architecture & ProgressDots

The engagement page is divided into 6 named sections with `id` attributes that both `ProgressDots` and `AutoScrollHint` depend on:

| Section ID | Content |
|---|---|
| `section-hero` | Hero |
| `section-events` | Blessings + EventCards + RouteCTA |
| `section-couple` | CoupleSection + RSVP + Gallery |
| `section-info` | ThingsToKnow |
| `section-family` | FamilyShlokaSection |
| `section-countdown` | Countdown + Footer |

**Do not rename these IDs** — `ProgressDots` uses them via `IntersectionObserver`.

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

- `SplashScreen` — temple-door animation + language picker + "Tap to open" button; skips language picker if `hasStoredLang` is true. Uses `useEffect` to safely trigger side-effects like state transitions.
- `ProgressDots` — fixed right-side dot nav; tracks active section via IntersectionObserver. Buttons use 44x44px touch targets.
- `AutoScrollHint` — chevron that appears after 10s idle, dismissed on any scroll
- `GarlandDivider`, `MangoToranDivider`, `KolamDivider` — decorative SVG section dividers; accept `fromColor`/`toColor` props. SVGs dynamically calculate points padded to 4 decimal places via `toFixed(4)` to prevent server/client hydration mismatches.
- `ScrollReveal` — IntersectionObserver wrapper that triggers Framer Motion fade-up animations
- `ClientOnly` — SSR guard wrapper for browser-only components
- `AnimatedPhoto` — Accepts `src` prop with Ghibli filter, falls back to placeholder gradient.

### Static Assets

- `public/translations/` — `en.json`, `hi.json`, `te.json`, `or.json`
- `public/illustrations/` — `jagannath-temple-day.png`, `tirupati-gopuram-night.png`
- OG image expected at `public/og-engagement.jpg`
- `public/music/` and `public/images/` for dynamic assets.

### Environment Variables

Copy `.env.local.example` to `.env.local`:

```
NEXT_PUBLIC_MAPS_API_KEY=      # Google Maps JavaScript API
NEXT_PUBLIC_WEATHER_API_KEY=   # OpenWeatherMap API
```

### Deployment

- Vercel project: `aditya-jyoti-engage`
- Production URL: `jyoti-engages.adityanvs.in`
- See `INFRASTRUCTURE.md` for GCP services (Maps + Places APIs)
- Analytics uses `@vercel/analytics/react` (not `/next` because of Pages Router).
