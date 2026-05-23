# Implementation Plan — engage-invite Completion Sprint

## Context

Three parallel audit agents (completion audit, code review, UI/UX review) and a pattern-mapping agent have fully characterized the site's current state. The foundation is strong — hero, countdown, dividers, language system, and splash screen are polished. But the site cannot go live due to launch blockers (missing OG image/photos/music), pervasive i18n violations, UI hierarchy problems, and missing P1 features. This plan executes all fixable work in three waves of parallel sub-agents, then identifies what requires the couple to deliver content.

---

## What Requires Couple Action (Unblock in Parallel)

Before wave 3 finishes, the couple must deliver:
1. **OG image** — `public/og-engagement.jpg`, 1200×630px, names + date bold enough to read at 80px
2. **Couple photos** — 2–3 images → `public/images/couple-1.jpg`, `couple-2.jpg`, etc.
3. **Music file** — `public/music/engagement-track.mp3` (veena/nadaswaram, ~2–3 min loop)
4. **Gotra + Nakshatra** — groom and bride values to populate config
5. **Bride sibling name** — or confirm none
6. **Instagram handle** — confirm `@jyoti.weds.aditya` is live and public
7. **Couple story milestones** — 3–4 date+description items (P2, not blocking launch)

---

## SVG Quality Issues — Pre-Wave Analysis Agent Required

Before Wave 1 begins, spawn a dedicated **SVG Analysis Agent** to audit and redesign the two temple SVG illustrations. These are identified as the biggest visual weak points on the page.

### Known Issues
- **Hero SVG (Jagannath Nagara temple in `EngagementHero.jsx`)** — ❌ Not satisfactory. The rendering is too simplified and does not carry sufficient visual fidelity to evoke the temple authentically. Animations (sun arc, parallax scroll) exist but the base illustration lacks detail. Elements may be misaligned.
- **Footer SVG (Tirupati Gopuram night scene in `FooterSection.jsx`)** — ⚠️ ~60% satisfactory. The overall silhouette reads correctly but details (window diya flicker, star placement, gopuram tier proportions, structural alignment) need refinement.

### SVG Analysis Agent Task
This agent reads `EngagementHero.jsx` and `FooterSection.jsx` in full, then produces:
1. **Annotated critique** of each SVG — which paths/elements are structurally wrong, misaligned, or visually weak
2. **Animation audit** — which keyframes (sunArc, moonArc, diyaFlicker, lanternFloat) are misfiring or have incorrect origins
3. **Alignment issues** — elements that are off-center, incorrectly anchored, or don't scale proportionally across viewport widths
4. **Detailed SVG rewrite spec** — for the Jagannath temple (full redesign needed) and Tirupati gopuram (targeted fixes) — specific `<path>`, `<rect>`, `<polygon>` replacements with corrected coordinates and proportions
5. **Animation fix spec** — corrected keyframe values and timing functions

This agent's output feeds into a **Wave 0 SVG Redesign** task that runs before or alongside Wave 1. The redesigned SVGs are committed separately with the message `fix: redesign Jagannath temple hero SVG + refine Tirupati gopuram footer SVG`.

---

## Wave 1 — Three Parallel Agents (Independent, No File Conflicts)

### Agent 1: Bug Fixes
File scope: `useWeather.js`, `LanguageSwitcher.jsx`, `PhotoCarousel.jsx`.

| Fix | File | Location | Change |
|---|---|---|---|
| B2: hasFetched ref blocks re-fetch | `useWeather.js` | L9–12 | Remove `hasFetched` ref entirely; module-level `cache` already prevents excessive calls |
| B3: LanguageSwitcher touch targets 32px | `LanguageSwitcher.jsx` | L31 | Change `width`/`height` to `44px`; adjust container gap to `6px` |
| B4: PhotoCarousel polaroids not keyboard-accessible | `PhotoCarousel.jsx` | card divs | Add `role="button"`, `tabIndex={0}`, `onKeyDown` (Enter/Space triggers lightbox) |
| B5: Lightbox nav missing aria-labels | `PhotoCarousel.jsx` | Prev/Next/Close btns | Add `aria-label="Previous photo"` / `"Next photo"` / `"Close lightbox"` |

---

### Agent 2: i18n Completeness Pass
All hardcoded English strings → `t()` calls. File scope: `BlessingsSection.jsx`, `ThingsToKnow.jsx`, `RouteCTA.jsx`, `CountdownTimer.jsx`, `PhotoCarousel.jsx`, `SplashScreen.jsx`, `LanguageBanner.jsx`, `WeatherWidget.jsx`, `FamilyShlokaSection.jsx` + all 4 `public/translations/*.json` files.

**New translation keys to add to all 4 JSON files:**

```json
"with_blessings_of": "With the blessings of",
"invite_you_to_join": "you to join us in the engagement celebrations of",
"on_the_following_events": "on the following events",
"reach_label": "How to Reach",
"from_visakhapatnam": "From Visakhapatnam",
"flight_duration": "Flight ~1 hr",
"cab_from_airport": "OLA/Cab ~20 min",
"train_duration": "Train ~8–10 hrs",
"bbs_station": "Bhubaneswar Station → Hotel ~15 min",
"dress_heading": "Dress to Celebrate",
"dress_traditional": "Traditional",
"dress_semiformal": "Semi-Formal",
"dress_traditional_desc": "Sarees, sherwanis, lehengas, dhotis welcome",
"dress_semiformal_desc": "Smart casuals and formals equally celebrated",
"navigate_label": "Navigate →",
"venue_label": "Venue",
"auto_select_english": "Auto-selecting English in {n}s",
"tap_to_open": "Tap to open",
"view_in_language": "View this invitation in your language?",
"checking_weather": "Checking weather…",
"check_weather_fallback": "Check weather on the day.",
"celebrations_begin": "The celebrations begin!",
"grooms_family": "Groom's Family",
"brides_family": "Bride's Family"
```

For Hindi, Telugu, Odia — fill in accurate translations. For location names (Visakhapatnam, Bhubaneswar) keep transliterated in each script.

`PhotoCarousel.jsx` CAPTIONS: move array inside component, replace 8 hardcoded English captions with keys `photo_caption_1` through `photo_caption_8` added to all JSON files.

`auto_select_english` uses `{n}` placeholder — update the component to replace `{n}` with `countdown` value dynamically.

Also fix: `ThingsToKnow.jsx` direct `process.env.NEXT_PUBLIC_WEATHER_API_KEY` → `GOOGLE_API.WEATHER_API_KEY` from config import.

---

### Agent 3: UI/UX Design Fixes + EngagementHero Bugs
Visual hierarchy, contrast, mobile layout. File scope: `EngagementHero.jsx`, `BlessingsSection.jsx`, `ThingsToKnow.jsx`, `FooterSection.jsx`, `ProgressDots.jsx`, `RouteCTA.jsx`, `SplashScreen.jsx`.

| Issue | File | Change |
|---|---|---|
| B1: Typewriter restarts on re-render | `EngagementHero.jsx` | Wrap `groomNames` + `brideNames` in `useMemo(() => ..., [])` |
| B6: Hardcoded "Weds" bypasses t() | `EngagementHero.jsx` | Replace with `{t('weds')}` — key already in all 4 JSONs |
| Hero temple SVG horizontal overflow on mobile | `EngagementHero.jsx` | Remove `left: '-5%'` and `width: '110%'`; use `width: '100%'`, `overflow: 'hidden'` on wrapper |
| BlessingsSection: "INVITE" overshadows couple names | `BlessingsSection.jsx` | Reduce INVITE `clamp(3rem,8vw,5rem)` → `clamp(2rem,5vw,3rem)`; increase couple names → `clamp(2.8rem,7vw,4.5rem)` |
| Weather time slot labels too small | `ThingsToKnow.jsx` | `0.72rem` → `0.82rem` |
| Card border too faint | `ThingsToKnow.jsx` | Border opacity `0.15` → `0.25` |
| Card background too dim | `ThingsToKnow.jsx` | Background opacity `0.6` → `0.8` |
| Footer: couple names undersized | `FooterSection.jsx` | `clamp(1.2rem,3.5vw,1.6rem)` → `clamp(1.6rem,4vw,2rem)` |
| Footer: hashtag + "made with love" too small | `FooterSection.jsx` | `0.78rem–0.88rem` → `0.9rem–1rem` |
| Footer: date/hashtag opacity too low | `FooterSection.jsx` | `rgba(245,236,200,0.4)` → `rgba(245,236,200,0.7)` |
| ProgressDots 8–11px tap targets too small | `ProgressDots.jsx` | Wrap each button in `44px × 44px` touch area; keep visual dot size |
| RouteCTA Navigate button too passive | `RouteCTA.jsx` | Add `background: 'rgba(212,168,67,0.15)'` hover; stronger `whileHover` scale |
| Mandala opacity too low on Splash | `SplashScreen.jsx` | `opacity: 0.3` → `opacity: 0.45` |

---

## Wave 2 — Two Parallel Agents (After Wave 1 Completes)

### Agent 4: P1 Functional Features
File scope: `EventCard.jsx`, `EventCardsSection.jsx`, `RSVPSection.jsx`, `ThingsToKnow.jsx`, `src/pages/engagement.jsx`, `src/config/index.js`.

**Feature 1: Add-to-Calendar buttons per EventCard**
- Add optional `calendarUrl` prop to `EventCard`; in `EventCardsSection` derive Google Calendar URL per event using ISO dates from `ENGAGEMENT.COUNTDOWN_ISO`
- Format: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=...&dates=20260617T100000/20260617T113000&location=...`
- Render second CTA link below "see_the_route" with calendar SVG icon + `t('add_to_calendar')`
- Add `"add_to_calendar": "Add to Calendar"` to all 4 JSONs

**Feature 2: WhatsApp Share Button**
- Add to `RSVPSection.jsx` below "looking forward" text
- `wa.me/?text=` deep link with pre-composed message using config values
- Style: gold border button, max-width 300px centered
- Add `"share_on_whatsapp": "Share with family & friends →"` to all 4 JSONs

**Feature 3: Accommodation Card in ThingsToKnow**
- Add `AccommodationCard` component mirroring `ReachCard`/`DressCard` structure
- Append `{ id: 'accommodation', content: <AccommodationCard /> }` to `cards` array
- Uses existing keys `accommodation_label` + `accommodation_text` already in all 4 JSONs

**Feature 4: `theme-color` meta + shorten OG description**
- `<meta name="theme-color" content="#8B1A2B" />` in `engagement.jsx` `<Head>`
- Shorten `og:description` to ≤80 chars: `"Join us for Aditya & Jyoti's engagement — 17 June, Suryansh Hotel, Bhubaneswar. In English, Hindi, Telugu & Odia."`

---

### Agent 5: Content Infrastructure
File scope: `src/config/index.js`, `AnimatedPhoto.jsx`, `MusicPlayer.jsx`, `CoupleSection.jsx`, `GallerySection.jsx`, `PhotoCarousel.jsx`, `BlessingsSection.jsx`, `FamilyShlokaSection.jsx`.

**Feature 1: AnimatedPhoto → accept real photos + Ghibli filter**
- Add optional `src` prop; when provided render `<img>` with `objectFit: cover` + CSS filter `saturate(1.3) sepia(0.15) hue-rotate(-10deg) brightness(1.05)`
- When absent: existing gradient placeholder unchanged
- Add `MEDIA` export to config: `{ MUSIC_SRC, COUPLE_PHOTO_1, COUPLE_PHOTO_2 }`
- `CoupleSection`: pass `src={MEDIA.COUPLE_PHOTO_1}` to AnimatedPhoto
- `PhotoCarousel`: accept `photos` prop array; fall back to placeholders when empty
- `GallerySection`: pass `photos={[]}` (placeholder mode until photos delivered)

**Feature 2: MusicPlayer → config-driven + graceful fail**
- Replace hardcoded path with `MEDIA.MUSIC_SRC`; hide button when `onloaderror` fires

**Feature 3: Gotra/Nakshatra in config + BlessingsSection**
- Add `GROOM_GOTRA`, `BRIDE_GOTRA`, `GROOM_NAKSHATRA`, `BRIDE_NAKSHATRA` to `FAMILIES` (empty strings)
- Render conditionally below parent names in BlessingsSection (only shows when non-empty)
- Add `"gotra_label"` + `"nakshatra_label"` to all 4 JSONs

**Feature 4: Bride sibling in FamilyShlokaSection**
- Add `BRIDE_SIBLING: ''` to `FAMILIES` config
- Mirror groom sibling render logic (conditional)

---

## Wave 3 — One Agent (After Wave 2 Completes)

### Agent 6: P2 Features
File scope: `FooterSection.jsx`, `EventCardsSection.jsx`, `ThingsToKnow.jsx`, `src/config/index.js`.

**Feature 1: Hashtag + Instagram block (FooterSection)**
- Copy-to-clipboard hashtag using `navigator.clipboard.writeText`; swap label to `t('copied')` on success
- Instagram link (`https://instagram.com/jyoti.weds.aditya`) opens in new tab
- Uses existing keys `hashtag_label`, `follow_the_action`, `follow_subtitle` from all 4 JSONs

**Feature 2: Muhurtham call-out (EventCardsSection)**
- Add `ENGAGEMENT.MUHURTHAM_TIME: '10:00 AM'` to config
- Small gold chip above events grid: `✦ Shubha Muhurtham: {ENGAGEMENT.MUHURTHAM_TIME} ✦`
- Add `"muhurtham_label": "Shubha Muhurtham"` to all 4 JSONs

**Feature 3: Travel deep-links (ThingsToKnow ReachCard)**
- Two small underlined link CTAs below travel text: Google Flights + IRCTC pre-filled for Vizag→Bhubaneswar

---

## Sub-Agent Assignment Summary

| Wave | Agent | Files Touched | Can Start |
|---|---|---|---|
| 0 | SVG Analysis | `EngagementHero.jsx`, `FooterSection.jsx` (read-only analysis) | Immediately |
| 1 | Bug Fixes | `useWeather.js`, `LanguageSwitcher.jsx`, `PhotoCarousel.jsx` | Immediately |
| 1 | i18n Pass | 9 component files + 4 translation JSONs | Immediately |
| 1 | UI/UX + Hero | `EngagementHero.jsx`, `BlessingsSection.jsx`, `ThingsToKnow.jsx`, `FooterSection.jsx`, `ProgressDots.jsx`, `RouteCTA.jsx`, `SplashScreen.jsx` | Immediately |
| 2 | P1 Features | `EventCard.jsx`, `EventCardsSection.jsx`, `RSVPSection.jsx`, `ThingsToKnow.jsx`, `engagement.jsx`, `config/index.js` | After Wave 1 |
| 2 | Content Infra | `AnimatedPhoto.jsx`, `MusicPlayer.jsx`, `CoupleSection.jsx`, `GallerySection.jsx`, `PhotoCarousel.jsx`, `BlessingsSection.jsx`, `FamilyShlokaSection.jsx`, `config/index.js` | After Wave 1 |
| 3 | P2 Features | `FooterSection.jsx`, `EventCardsSection.jsx`, `ThingsToKnow.jsx`, `config/index.js` | After Wave 2 |

---

## Git Workflow — Commits Per Wave + Merge to Main

Each wave ends with a commit on `feat/engagement-v3-enhancements`. After all waves pass `npm run build`, merge to `main`.

| After | Commit message |
|---|---|
| Wave 0 — SVG Redesign | `fix: redesign Jagannath temple hero SVG + refine Tirupati gopuram footer SVG` |
| Wave 1 — Bug Fixes | `fix: useWeather hasFetched ref, LanguageSwitcher touch targets, PhotoCarousel a11y` |
| Wave 1 — i18n Pass | `feat: i18n completeness — route all hardcoded strings through t() in 10 components` |
| Wave 1 — UI/UX Fixes | `fix: visual hierarchy, mobile overflow, contrast, and ProgressDots touch targets` |
| Wave 2 — P1 Features | `feat: add-to-calendar, WhatsApp share, accommodation card, theme-color meta` |
| Wave 2 — Content Infra | `feat: AnimatedPhoto src prop + Ghibli filter, config MEDIA, gotra/nakshatra fields` |
| Wave 3 — P2 Features | `feat: hashtag block, muhurtham callout, travel deep-links` |

**Merge to main after all waves pass build:**
```bash
git checkout main
git merge feat/engagement-v3-enhancements --no-ff -m "feat: engagement site v3 — i18n, P1 features, design fixes, SVG redesign"
git push origin main
```

Confirm Vercel auto-deploys from `main` to `jyoti-engages.adityanvs.in` before merging.

---

## Verification

1. **After each wave** — `npm run dev`, spot-check each changed component in browser at 375px and 1280px
2. **Wave 1** — typewriter no longer restarts; language buttons are 44px; lightbox keyboard-navigable; all i18n strings switch language correctly
3. **Wave 2** — calendar link pre-fills Google Calendar; WhatsApp button opens correct message; OG tags correct in `view-source`; AnimatedPhoto shows placeholder until `src` provided; MusicPlayer hidden when file missing
4. **Wave 3** — hashtag copies to clipboard; Instagram link opens; muhurtham chip visible
5. **Build gate** — `npm run build` zero errors before any wave commit

---

## Dead Code Cleanup (Wave 3 or Later)

Remove confirmed-unused files:
- `src/components/engagement/InfoCardsSection.jsx`
- `src/components/engagement/KolamDivider.jsx` (duplicate)
- `src/components/shared/LanguageModal.jsx`
- `src/components/shared/WeatherWidget.jsx`
- `src/components/shared/InfoCard.jsx`
- `src/components/shared/VintageCarDivider.jsx`