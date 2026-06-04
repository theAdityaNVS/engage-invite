# Side/Music Params, Language Selector & Layout Reshuffle — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `?side` and `?music` URL params that personalise family card order, hero name order, and background music track; add a floating mute/unmute button; add a splash-screen language selector with cycling tooltip; track both params in analytics; and reshuffle the fixed-position UI elements.

**Architecture:** URL params are read in `getServerSideProps` and passed as page props to eliminate first-render flash. The MusicPlayer switches from play/pause to mute/unmute semantics using Howler volume. Analytics piggybacks on the existing `VisitTracker` beacon with two new Neon columns. The SplashScreen gets an inline language chip row independent of the main-page `LanguageSwitcher`.

**Tech Stack:** Next.js 16 Pages Router, React, Framer Motion, Howler.js, Neon Postgres (via `@neondatabase/serverless`), `@vercel/analytics`.

**Spec:** `docs/superpowers/specs/2026-06-04-side-music-params-design.md`

---

## File Map

| File | Action | What changes |
|---|---|---|
| `src/config/index.js` | Modify | `MEDIA.MUSIC_SRC` → `MEDIA.MUSIC_TRACKS` array of 3 objects |
| `src/pages/engagement.jsx` | Modify | Add `getServerSideProps`; accept+pass props; add localStorage effects; remove ProgressDots import; update MusicPlayer/LanguageSwitcher positions |
| `src/components/shared/MusicPlayer.jsx` | Modify | Accept `track` prop; mute/unmute via Howler volume; move to bottom-left; new equaliser/muted icon |
| `src/components/shared/LanguageSwitcher.jsx` | Verify only | Already at top-right with 44px touch target — confirm, no code change expected |
| `src/components/shared/ProgressDots.jsx` | Delete | Component removed entirely |
| `src/components/engagement/BlessingsSection.jsx` | Modify | Accept `side` prop; conditionally reverse family card array |
| `src/components/engagement/EngagementHero.jsx` | Modify | Accept `side` prop; swap primary/secondary name render order |
| `src/components/shared/SplashScreen.jsx` | Modify | Add language chip row (top-right, absolute) + cycling tooltip |
| `src/components/shared/VisitTracker.jsx` | Modify | Parse `?side`/`?music` from `window.location.search`; add to beacon payload |
| `src/pages/api/track.js` | Modify | Accept, validate, and insert `invite_side` and `invite_music` |
| `src/pages/admin/visits.jsx` | Modify | Add two aggregation queries and a breakdown display for side/music |
| **Neon DB** | Migration | `ALTER TABLE visits ADD COLUMN invite_side varchar(8), invite_music smallint` |

---

## Task 1: Database Migration

**Files:**
- Neon DB via MCP tool or `src/` SQL utility

This is a prerequisite for all analytics tasks (Tasks 11–13). Run it first; it is backwards-compatible — existing rows get `NULL` in the new columns.

- [ ] Open Neon MCP or a local SQL client connected to the `adityanvs-invites` project (us-west-2, project id `divine-pine-34395361`).

- [ ] Run the migration:
  ```
  ALTER TABLE visits ADD COLUMN invite_side  varchar(8);
  ALTER TABLE visits ADD COLUMN invite_music smallint;
  ```

- [ ] Verify the columns exist by running `\d visits` or `SELECT column_name FROM information_schema.columns WHERE table_name = 'visits'` and confirming `invite_side` and `invite_music` appear.

- [ ] Commit a migration note (no code file needed — document it in git message):
  ```
  git commit --allow-empty -m "db: add invite_side and invite_music columns to visits"
  ```

---

## Task 2: Config — MUSIC_TRACKS Array

**Files:**
- Modify: `src/config/index.js`

Replace the single null `MUSIC_SRC` key with a `MUSIC_TRACKS` array. All three src values will be placeholder strings pointing to files that don't exist yet — the MusicPlayer's fallback chain handles missing files silently.

- [ ] In `src/config/index.js`, inside the `MEDIA` export object:
  - Remove the line `MUSIC_SRC: null`
  - Add `MUSIC_TRACKS` as an array of three objects, each with `id` (1, 2, 3) and `src` (`'/music/track-1.mp3'`, `'/music/track-2.mp3'`, `'/music/track-3.mp3'`)

- [ ] Run `npm run build` and confirm no build errors. The existing `MusicPlayer` still references `MEDIA.MUSIC_SRC` at this point — it will error. That is expected and will be fixed in Task 6.

- [ ] Commit:
  ```
  git commit -m "config: replace MUSIC_SRC with MUSIC_TRACKS array"
  ```

---

## Task 3: getServerSideProps in engagement.jsx

**Files:**
- Modify: `src/pages/engagement.jsx`

This is the central data-reading step. Both `?side` and `?music` are read here and normalised to safe defaults. Four props are returned: `side`, `musicTrack`, `hasSideParam`, `hasMusicParam`. The `has*Param` booleans let the client-side localStorage effect distinguish "explicit param present" from "defaulted silently".

- [ ] Add an exported `getServerSideProps` function at the bottom of `src/pages/engagement.jsx` (after the default export).

- [ ] Inside it, read `context.query.side` and `context.query.music`. Validate:
  - `side`: accept only `'bride'` or `'groom'`; default to `'groom'` for anything else
  - `musicTrack`: accept only integers 1, 2, 3 (convert with `Number()`); default to `1`
  - `hasSideParam`: `'side' in context.query` (boolean)
  - `hasMusicParam`: `'music' in context.query` (boolean)

- [ ] Wrap the entire function body in a `try/catch` that returns `{ props: { side: 'groom', musicTrack: 1, hasSideParam: false, hasMusicParam: false } }` on any error.

- [ ] Update the `EngagementPage` component signature to accept `{ side, musicTrack, hasSideParam, hasMusicParam }` as props. Default-destructure all four so the page still works if rendered without SSR in tests.

- [ ] Run `npm run dev` and visit `/engagement`, `/engagement?side=bride`, `/engagement?side=groom&music=2`, `/engagement?side=invalid&music=99`. Confirm the page loads without errors in all cases (prop values are not used visually yet — that's Tasks 4–6).

- [ ] Commit:
  ```
  git commit -m "feat: add getServerSideProps for side/music params"
  ```

---

## Task 4: BlessingsSection — Side-Aware Card Order

**Files:**
- Modify: `src/components/engagement/BlessingsSection.jsx`

The family cards at lines 303–321 are currently a hardcoded array `[groomCard, brideCard]`. With `side='bride'` they should render `[brideCard, groomCard]`.

- [ ] Update `BlessingsSection` to accept a `side` prop (default `'groom'`).

- [ ] Locate the array of two card-descriptor objects (around line 303). Extract them as named constants: `groomCard` and `brideCard`.

- [ ] Build the render array as `side === 'bride' ? [brideCard, groomCard] : [groomCard, groomCard]` — wait, that's a typo: `[brideCard, groomCard] : [groomCard, brideCard]`. The spread-reverse pattern `[...cards].reverse()` also works and is equivalent.

- [ ] In `src/pages/engagement.jsx`, pass `side={side}` to `<BlessingsSection />`.

- [ ] Run `npm run dev`. Visit `/engagement?side=bride` and confirm bride's family card appears on the left. Visit `/engagement` (no param) and confirm groom's card is on the left. Visit `/engagement?side=groom` explicitly and confirm groom's card is still on the left.

- [ ] Commit:
  ```
  git commit -m "feat: BlessingsSection respects side prop for family card order"
  ```

---

## Task 5: EngagementHero — Side-Aware Name Order

**Files:**
- Modify: `src/components/engagement/EngagementHero.jsx`

The hero currently renders `currentGroom` (line 184) before `currentBride` (line 211). With `side='bride'`, bride should appear first.

- [ ] Update `EngagementHero` to accept a `side` prop (default `'groom'`).

- [ ] After the existing `currentGroom` and `currentBride` derivations, add two variables: `primaryName` and `secondaryName`. Assign based on `side`: if `'bride'`, primary = `currentBride`, secondary = `currentGroom`; otherwise primary = `currentGroom`, secondary = `currentBride`.

- [ ] Replace the `{currentGroom}` render at line 184 with `{primaryName}` and `{currentBride}` at line 211 with `{secondaryName}`. Do not change any surrounding styles, motion wrappers, or font properties.

- [ ] In `src/pages/engagement.jsx`, pass `side={side}` to `<EngagementHero />`.

- [ ] Run `npm run dev`. Visit `/engagement?side=bride` and confirm hero reads "Jyoti … & … Aditya". Visit `/engagement` and confirm hero reads "Aditya … & … Jyoti". Verify the typewriter language cycling still works in both modes (cycle through 4 languages, confirm names swap languages correctly).

- [ ] Commit:
  ```
  git commit -m "feat: EngagementHero respects side prop for couple name order"
  ```

---

## Task 6: MusicPlayer — Track Prop, Mute/Unmute, New Design

**Files:**
- Modify: `src/components/shared/MusicPlayer.jsx`

Three changes in one file: (1) accept a `track` prop and look up `src` from `MEDIA.MUSIC_TRACKS`; (2) switch from play/pause semantics to mute/unmute via Howler `.volume()`; (3) update position to `bottom: 1.5rem, left: 1.5rem` and redesign the icon.

- [ ] Update `MusicPlayer` to accept a `track` prop (default `1`). Inside the component, derive `src` as `MEDIA.MUSIC_TRACKS?.[track - 1]?.src`. If `src` is falsy, call `setVisible(false)` and return early (same guard that was on `MEDIA.MUSIC_SRC`).

- [ ] In the Howler `useEffect`, replace `src: [MEDIA.MUSIC_SRC]` with `src: [src]` (the derived value from above). The rest of the Howler setup (loop, volume, onloaderror, onplayerror) is unchanged.

- [ ] Change mute/unmute semantics: replace the `playing` state with a `muted` state (initial `false` — starts unmuted). The toggle function calls `howlRef.current.volume(muted ? 0.4 : 0)` then flips `muted`. The two existing `useEffect`s that call `.play()` when `autoPlay` is true are left unchanged — they start the track when the user taps "YOU ARE INVITED". The button never calls `.play()` or `.pause()`, only `.volume()`.

- [ ] Update position styles: change `top: '1.2rem', right: '1.2rem'` to `bottom: '1.5rem', left: '1.5rem'`. Increase button size from `48px` to `52px`.

- [ ] Replace the emoji icons with descriptive inline content:
  - **Unmuted state:** three small vertical bars of different heights (`8px`, `14px`, `10px`) styled as a mini equaliser, with a Framer Motion `animate` that varies their heights in a loop (staggered pulse).
  - **Muted state:** a simple crossed-speaker shape — this can be an inline SVG or a unicode character (`🔇` is acceptable as a placeholder until a real SVG is designed).

- [ ] In `src/pages/engagement.jsx`, pass `track={musicTrack}` to `<MusicPlayer />`.

- [ ] Run `npm run dev`. Tap "YOU ARE INVITED" — music button should appear at bottom-left. Tap it — music should mute (volume to 0) without stopping. Tap again — music should unmute (volume to 0.4). Verify button hides correctly when no MP3 files exist at `public/music/` (404 triggers `onloaderror` → `setVisible(false)`).

- [ ] Commit:
  ```
  git commit -m "feat: MusicPlayer accepts track prop, mute/unmute semantics, bottom-left position"
  ```

---

## Task 7: Layout Reshuffle — ProgressDots Removal

**Files:**
- Modify: `src/pages/engagement.jsx`
- Delete: `src/components/shared/ProgressDots.jsx`
- Verify: `src/components/shared/LanguageSwitcher.jsx` (no change expected)

- [ ] Open `src/components/shared/LanguageSwitcher.jsx` and confirm `position: 'fixed', top: '1.5rem', right: '1.5rem'` and `minHeight: '44px'` are already present. If they are, no change needed. If not, update position to top-right and touch target to 44px.

- [ ] In `src/pages/engagement.jsx`, remove the `ProgressDots` import line and the `<ProgressDots />` JSX element. Do not remove the section `id` attributes on the wrapper `<div>` elements — leave them in place.

- [ ] Delete the file `src/components/shared/ProgressDots.jsx`.

- [ ] Run `npm run build` and confirm no "module not found" or unused-import errors.

- [ ] Run `npm run dev`. Scroll through the entire engagement page and confirm: no progress dots on the right edge, LanguageSwitcher visible at top-right, MusicPlayer (from Task 6) visible at bottom-left. Confirm no visual overlap between any fixed elements.

- [ ] Commit:
  ```
  git commit -m "feat: remove ProgressDots, confirm LanguageSwitcher at top-right"
  ```

---

## Task 8: localStorage Return-Visit Logic

**Files:**
- Modify: `src/pages/engagement.jsx`

On first visit with params in the URL, save those choices. On return visits without params, read stored choices and override the default state.

- [ ] In `src/pages/engagement.jsx`, add two `useState` values: `activeSide` (initialised from the `side` prop) and `activeMusicTrack` (initialised from `musicTrack` prop). Replace direct `side`/`musicTrack` prop references passed to child components with these state values.

- [ ] Add a `useEffect` that runs once on mount (empty dep array). Inside it:
  - If `hasSideParam` is `true`, write `activeSide` to `localStorage` under key `invite_side`. Wrap in `try/catch`.
  - If `hasMusicParam` is `true`, write `activeMusicTrack` to `localStorage` under key `invite_music`. Wrap in `try/catch`.

- [ ] Add a second `useEffect` that also runs once on mount. Inside it, read `localStorage`:
  - If `hasSideParam` is `false` (no param in URL), read `localStorage.getItem('invite_side')`. If valid (`'bride'` or `'groom'`), call `setActiveSide` with the stored value.
  - If `hasMusicParam` is `false`, read `localStorage.getItem('invite_music')`. If valid (parses to 1, 2, or 3), call `setActiveMusicTrack` with the stored value.
  - Wrap all reads in `try/catch` (private Safari throws on localStorage access).

- [ ] Run `npm run dev`. Workflow to test:
  1. Visit `/engagement?side=bride` — confirm bride-first layout.
  2. Close tab, reopen `/engagement` (no param) — confirm bride-first layout is restored from localStorage.
  3. Visit `/engagement?side=groom` — confirm groom-first layout overrides the stored bride value.
  4. Reopen `/engagement` — confirm groom-first is now stored.

- [ ] Commit:
  ```
  git commit -m "feat: persist side/music params to localStorage for return visits"
  ```

---

## Task 9: SplashScreen Language Selector

**Files:**
- Modify: `src/components/shared/SplashScreen.jsx`

A four-chip language row at the top-right of the splash overlay, with a cycling tooltip below it. This is fully self-contained — it uses the existing `useLanguage()` hook and adds no new state to the parent.

- [ ] In `SplashScreen.jsx`, add a `useLanguage()` call to get `{ lang, setLang }` (already imported — the component already uses `lang`).

- [ ] Add a local `useState` for `tooltipIndex` (initial `0`) — this drives which language's hint text is currently displayed.

- [ ] Add a local `useState` for `hasInteracted` (initial `false`) — cycling stops after the user taps any chip.

- [ ] Add a `useEffect` that sets up a `setInterval` cycling `tooltipIndex` through 0–3 every 1800ms. The interval is cleared when `hasInteracted` is `true` or on `unmount`. Guard: only start the interval if `!hasInteracted`.

- [ ] Define a constant array `LANG_HINTS` with four objects, each with `code` and `hint` text:
  - `en`: `"Select your language"`
  - `hi`: `"भाषा चुनें"`
  - `te`: `"భాష ఎంచుకోండి"`
  - `or`: `"ଭାଷା ବାଛନ୍ତୁ"`

- [ ] Define a constant array `LANG_CHIPS` matching the `LANGS` shape from `LanguageSwitcher`: `[{code:'en', label:'EN'}, {code:'hi', label:'हि'}, {code:'te', label:'తె'}, {code:'or', label:'ଓ'}]`.

- [ ] Add the language selector JSX block. Position it `absolute, top: 1.2rem, right: 1.2rem, zIndex: 10000` (above the doors at `zIndex: 20`). The block contains:
  - A row of four chip `<button>` elements. Each chip: minimum 36×36px, pill border-radius, no border. Active chip (code matches `lang`): `#D4A843` background, dark text. Inactive: transparent background, cream text at 60% opacity. On click: call `setLang(code)`, call `setHasInteracted(true)`.
  - Below the chip row: an `AnimatePresence` block rendering the current `LANG_HINTS[tooltipIndex].hint` text. Use `motion.span` with `initial={{ opacity: 0 }}`, `animate={{ opacity: 1 }}`, `exit={{ opacity: 0 }}`, keyed by `tooltipIndex`. Style: 11px, `rgba(212,168,67,0.75)`, centered, no background.

- [ ] Place the language selector block inside the parchment interior `<div>` (the one with the `AnimatedWatermark` and couple names), not inside the doors layer. It must sit above `zIndex: 20` (the doors) so it is visible and tappable even before the doors open.

- [ ] Run `npm run dev`. Load the page fresh (clear `sessionStorage` if needed to force splash to show). Confirm:
  - Four language chips visible at top-right of the splash.
  - Tooltip text cycles through all four languages every 1.8s.
  - Tapping `हि` switches names to Hindi immediately and stops cycling.
  - Tapping `EN` switches back to English.
  - After tapping any chip, tooltip stays on the selected language's hint text (cycling stopped).
  - After tapping "YOU ARE INVITED", main page shows names in the chosen language and `LanguageSwitcher` reflects the same language.

- [ ] Commit:
  ```
  git commit -m "feat: add language chip selector and cycling tooltip to SplashScreen"
  ```

---

## Task 10: Static OG / Meta Tags

**Files:**
- Modify: `src/pages/engagement.jsx`

Replace the current loose meta description with a clean, premium static block.

- [ ] In the `<Head>` block in `engagement.jsx`, update or replace the existing meta tags with the following values (do not make them dynamic — all values are hardcoded strings):
  - `og:title`: `"Aditya & Jyoti — Engagement Invitation"`
  - `og:description`: `"Join us to celebrate their engagement — 17th June 2026, Suryansh Hotels & Resorts, Bhubaneswar. In English, Hindi, Telugu & Odia."`
  - `og:image`: `"https://adityanvs.in/og-engagement.jpg"`
  - `og:image:width`: `"1200"`
  - `og:image:height`: `"630"`
  - `og:type`: `"website"`
  - `og:url`: `"https://adityanvs.in/engagement"`
  - `twitter:card`: `"summary_large_image"`
  - `<title>`: `"Aditya & Jyoti — Engagement Invitation"`
  - `name="description"`: same text as `og:description`
  - `theme-color`: `"#8B1A2B"` (already present — leave it)

- [ ] Run `npm run build` — confirm clean build and no unused variable warnings from removed dynamic title logic.

- [ ] Commit:
  ```
  git commit -m "feat: polished static OG/meta tags for WhatsApp preview"
  ```

---

## Task 11: VisitTracker — Param Fields in Beacon

**Files:**
- Modify: `src/components/shared/VisitTracker.jsx`

Add `invite_side` and `invite_music` to the existing beacon payload by parsing `window.location.search`.

- [ ] Inside the `useEffect` in `VisitTracker.jsx`, after the `session_id` derivation and before the `payload` object is constructed, parse `window.location.search`:
  - Use `new URLSearchParams(window.location.search)` to get params.
  - Derive `invite_side`: accept only `'bride'` or `'groom'`, otherwise `null`.
  - Derive `invite_music`: parse to number, accept only 1/2/3, otherwise `null`.

- [ ] Add `invite_side` and `invite_music` to the `payload` object alongside the existing fields.

- [ ] Run `npm run dev`. Open browser DevTools → Network tab. Visit `/engagement?side=bride&music=2`. Find the POST to `/api/track` and inspect the request body — confirm `invite_side: "bride"` and `invite_music: 2` are present. Visit `/engagement` (no params) and confirm both fields are `null` in the payload.

- [ ] Commit:
  ```
  git commit -m "feat: VisitTracker includes invite_side and invite_music in beacon"
  ```

---

## Task 12: /api/track — Insert New Columns

**Files:**
- Modify: `src/pages/api/track.js`

Accept the two new fields from the beacon body, validate them server-side (never trust client input), and include them in the SQL INSERT.

- [ ] In the `handler` function in `track.js`, after the existing `body` fields are read (around line 40–62), add:
  - `invite_side`: read from `body.invite_side`. Accept only `'bride'` or `'groom'`; set to `null` for anything else.
  - `invite_music`: read from `body.invite_music`. Parse with `Number()`, accept only 1/2/3; set to `null` otherwise.

- [ ] Add both to the `row` object.

- [ ] Update the `sql` template literal INSERT to include `invite_side` and `invite_music` in both the column list and the values list. Keep the existing column order — append the two new columns at the end.

- [ ] Run `npm run dev`. Visit `/engagement?side=bride&music=3`. Wait for the beacon to fire (once per session — clear `sessionStorage.visit_logged` first if needed). Query the Neon `visits` table and confirm the latest row has `invite_side = 'bride'` and `invite_music = 3`.

- [ ] Commit:
  ```
  git commit -m "feat: track.js inserts invite_side and invite_music into visits"
  ```

---

## Task 13: Admin Dashboard — Side/Music Breakdown

**Files:**
- Modify: `src/pages/admin/visits.jsx`

Add two aggregation queries to the existing dashboard data fetch and render a small breakdown section below the existing visit list.

- [ ] In `visits.jsx`, locate where the existing visit data is fetched (likely a `getServerSideProps` or `useEffect` fetching `/api/visits`). Add two additional queries to the same data-fetch function (or as separate server-side queries if using `getServerSideProps`):
  - **Side breakdown:** `SELECT invite_side, COUNT(*) as count FROM visits WHERE site = 'engagement' GROUP BY invite_side ORDER BY count DESC`
  - **Music breakdown:** `SELECT invite_music, COUNT(*) as count FROM visits WHERE site = 'engagement' GROUP BY invite_music ORDER BY count DESC`

- [ ] If the dashboard uses a client-side fetch to `/api/visits`, extend that API route to also return aggregated `sideBreakdown` and `musicBreakdown` arrays. If it uses `getServerSideProps`, run the queries there directly via `getSql()`.

- [ ] Render a "Share Links" breakdown section in the dashboard UI below the existing table, with two subsections:
  - **By Side:** three rows — "Bride side", "Groom side", "No param" — each showing a count and percentage of total.
  - **By Music:** four rows — "Track 1", "Track 2", "Track 3", "No param" — each showing a count and percentage.

- [ ] Styling: match the existing dashboard aesthetic (whatever styles it currently uses). No new CSS frameworks.

- [ ] Run `npm run dev`. Log into `/admin/visits` (Basic Auth: `aditya` / existing password). Confirm the breakdown section renders without errors. With test rows in the DB from Task 12, confirm the counts are correct.

- [ ] Commit:
  ```
  git commit -m "feat: admin dashboard shows side/music param breakdown"
  ```

---

## Task 14: End-to-End Smoke Test

No new files. Verify the full feature set works together before marking the feature branch done.

- [ ] Run `npm run build` — confirm zero errors and zero warnings about missing modules.

- [ ] Run `npm run dev`. Test the following scenarios:

  **Scenario A — Bride link with music 2:**
  - Visit `/engagement?side=bride&music=2`
  - Confirm: splash shows, language chips visible at top-right, tooltip cycles all 4 languages
  - Tap "YOU ARE INVITED"
  - Confirm: hero shows "Jyoti & Aditya", bride's family card on left
  - Confirm: music button at bottom-left (appears unmuted); tap to mute — music volume drops; tap again — volume returns
  - Confirm: LanguageSwitcher at top-right
  - Confirm: no ProgressDots on right edge

  **Scenario B — Return visit (no param):**
  - Close tab, reopen `/engagement`
  - Confirm: bride-first layout restored from localStorage (Task 8)
  - Confirm: splash is skipped (sessionStorage gate — may need to clear manually)

  **Scenario C — Groom link with music 1 (default):**
  - Open incognito, visit `/engagement?side=groom`
  - Confirm: hero shows "Aditya & Jyoti", groom card on left

  **Scenario D — Invalid params:**
  - Visit `/engagement?side=foo&music=99`
  - Confirm: page loads without errors, defaults to groom/track-1

  **Scenario E — No params:**
  - Visit `/engagement`
  - Confirm: defaults to groom order, music button hidden (no MP3 files yet)

- [ ] Check DevTools console — confirm zero unhandled errors and zero 404s (other than the expected music 404 which is suppressed by onloaderror).

- [ ] Commit if any minor fixes were made:
  ```
  git commit -m "fix: smoke test corrections"
  ```

---

## Dependency Order

```
Task 1 (DB)        → prerequisite for Tasks 11–13
Task 2 (config)    → prerequisite for Task 6
Task 3 (SSR)       → prerequisite for Tasks 4, 5, 6, 8
Task 4 (Blessings) → depends on Task 3
Task 5 (Hero)      → depends on Task 3
Task 6 (Music)     → depends on Tasks 2, 3
Task 7 (Layout)    → independent (but run after Task 6 to verify no overlap)
Task 8 (localStorage) → depends on Task 3
Task 9 (Splash)    → independent
Task 10 (OG)       → independent
Task 11 (Tracker)  → depends on Task 1
Task 12 (API)      → depends on Tasks 1, 11
Task 13 (Dashboard)→ depends on Tasks 1, 12
Task 14 (Smoke)    → depends on all above
```

**Safe parallel groups:**
- Tasks 1 + 9 + 10 can run in parallel (all independent)
- Tasks 4 + 5 can run in parallel after Task 3
- Tasks 11 + 7 can run in parallel
