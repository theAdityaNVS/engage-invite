# Design Spec: Side Param, Multi-track Music & Layout Reshuffle

**Date:** 2026-06-04  
**Scope:** `engage-invite` only  
**Status:** Approved — ready for implementation plan

---

## 1. Overview

Two URL params — `?side` and `?music` — personalise the engagement invite for different share links. `?side=bride` shows bride's family first and reverses the couple name order; `?music=1|2|3` selects which background track plays. Both params are read server-side via `getServerSideProps` so the first paint is correct with no client-side flash. Params are also persisted to `localStorage` for return visits.

Alongside this: the floating UI is reshuffled (LanguageSwitcher → top-right, MusicPlayer → bottom-left, ProgressDots removed), the MusicPlayer is redesigned as a mute/unmute button, and analytics gains two new columns.

---

## 2. URL Parameters

### 2.1 `?side`

| Value | Behaviour |
|---|---|
| `groom` | Groom's family card left, "Aditya & Jyoti" hero order. **Default.** |
| `bride` | Bride's family card left, "Jyoti & Aditya" hero order. |
| missing / invalid | Treated as `groom`. |

### 2.2 `?music`

| Value | Behaviour |
|---|---|
| `1` | Play track 1. **Default when param is missing.** |
| `2` | Play track 2. |
| `3` | Play track 3. |
| missing / invalid | Treated as `1`. |

---

## 3. Architecture

### 3.1 Server-side param reading

`engagement.jsx` exports `getServerSideProps`. It reads and validates both params, returns safe defaults on any missing or invalid value. A `try/catch` wraps the whole function — on any unexpected error it returns the defaults, never throws to the client.

```js
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
```

### 3.2 Props flow

```
getServerSideProps
       ↓
 EngagementPage({ side, musicTrack })
 ├─ <Head>             static OG tags (not dynamic)
 ├─ EngagementHero     side → name render order
 ├─ BlessingsSection   side → family card order
 └─ MusicPlayer        musicTrack → track src lookup
       ↓
 mount useEffect       save to localStorage if params were present
```

### 3.3 Return-visit localStorage behaviour

On mount, a `useEffect` in `engagement.jsx`:
1. `hasSideParam` is `true` → save `side` to `localStorage` as `invite_side`. This correctly handles `?side=groom` (explicit) vs no param (implicit default) since both resolve to `'groom'` but only the former sets `hasSideParam: true`.
2. Same: `hasMusicParam` is `true` → save `musicTrack` to `localStorage` as `invite_music`.
3. On a return visit **without** params (server renders defaults), a second `useEffect` reads `localStorage` and updates local state via `useState`. This causes a minor re-render after hydration, which is acceptable — return visits are not shared-link first impressions.

All `localStorage` access is wrapped in `try/catch` (Safari private mode throws).

---

## 4. Feature: `?side` — Family order & hero names

### 4.1 `BlessingsSection`

Accepts a `side` prop. The two family card objects currently hardcoded as `[groomCard, brideCard]` are assembled into an array, then conditionally reversed:

```js
const cards = [groomCard, brideCard];
const ordered = side === 'bride' ? [...cards].reverse() : cards;
ordered.map(...)
```

No other changes to the card markup.

### 4.2 `EngagementHero`

Accepts a `side` prop. Currently renders `currentGroom` (line 184) then `currentBride` (line 211). With the prop:

```js
const [primary, secondary] = side === 'bride'
  ? [currentBride, currentGroom]
  : [currentGroom, currentBride];
```

Render `primary` then secondary. The typewriter cycle (`TRANSLATIONS.NAMES`) still drives both names in the correct language — only display order changes.

---

## 5. Feature: `?music` — Multi-track music player

### 5.1 Config change

Replace `MEDIA.MUSIC_SRC: null` with:

```js
MUSIC_TRACKS: [
  { id: 1, src: '/music/track-1.mp3' },
  { id: 2, src: '/music/track-2.mp3' },
  { id: 3, src: '/music/track-3.mp3' },
],
```

Filenames are placeholders. Drop real files at `public/music/` when available.

### 5.2 Missing / unavailable music — fallback chain

1. `getServerSideProps` defaults `musicTrack` to `1` if param is missing or invalid.
2. `MusicPlayer` looks up `MEDIA.MUSIC_TRACKS[track - 1]?.src`. If `src` is falsy (placeholder not replaced yet), `setVisible(false)` — button hidden, no 404 fired.
3. Howler's `onloaderror` callback also calls `setVisible(false)` — covers the case where the file is configured but the actual MP3 is missing from `public/music/`.
4. Result: the player silently disappears rather than showing a broken button or throwing an error.

### 5.3 Mute/unmute semantics

Music autoplay is triggered when the user taps "Enter" on `SplashScreen` (existing `setMusicAutoPlay(true)` flow). From that point the button is mute/unmute only — the track keeps playing in the background.

Mute uses Howler volume: `howlRef.current.volume(0)` / `howlRef.current.volume(0.4)`. This preserves track position and avoids the `onplayerror` risk that `.play()` after a pause can trigger on iOS.

Button states:
- **Unmuted:** animated equaliser bars (three vertical bars that pulse in CSS keyframes)
- **Muted:** crossed speaker icon

---

## 6. Floating UI Layout

### 6.1 New positions

| Element | Old position | New position |
|---|---|---|
| LanguageSwitcher | bottom-left | top-right |
| MusicPlayer | top-right | bottom-left |
| ProgressDots | right-center | **removed** |

### 6.2 ProgressDots removal

- Remove import and `<ProgressDots />` from `engagement.jsx`.
- Delete `src/components/shared/ProgressDots.jsx`.
- Section `id` attributes on each `<div>` in `engagement.jsx` are left in place (harmless, useful for future anchor links).

### 6.3 MusicPlayer button redesign

```
Position:   fixed, bottom: 1.5rem, left: 1.5rem, z-index: 80
Size:       52 × 52px circle
Background: #8B1A2B (maroon)
Border:     2px solid rgba(212,168,67,0.5) (gold, semi-transparent)
Shadow:     0 4px 20px rgba(139,26,43,0.45)
Icon:       CSS equaliser bars (unmuted) / crossed speaker SVG (muted)
Hover:      scale(1.08), transition 0.2s ease
```

### 6.4 LanguageSwitcher repositioning

Update fixed position in `LanguageSwitcher.jsx` from `bottom: X, left: X` to `top: 1.2rem, right: 1.2rem`. Touch target must be ≥ 44px (BUG-3 fix included here).

---

## 7. Analytics

### 7.1 Database migration

```sql
ALTER TABLE visits ADD COLUMN invite_side  varchar(8);
ALTER TABLE visits ADD COLUMN invite_music smallint;
```

Existing rows get `NULL` for both columns — backwards-compatible.

### 7.2 `VisitTracker.jsx`

Read params from `window.location.search` inside the existing `useEffect` (client-side, runs after SSR):

```js
const params = new URLSearchParams(window.location.search);
const rawSide  = params.get('side');
const rawMusic = Number(params.get('music'));

const invite_side  = rawSide === 'bride' || rawSide === 'groom' ? rawSide : null;
const invite_music = [1,2,3].includes(rawMusic) ? rawMusic : null;
```

Add `invite_side` and `invite_music` to the beacon payload. Null values are sent as-is — the API accepts and stores them.

### 7.3 `/api/track.js`

Accept and validate from `body`:

```js
invite_side:  body.invite_side === 'bride' || body.invite_side === 'groom'
              ? body.invite_side : null,
invite_music: [1,2,3].includes(Number(body.invite_music))
              ? Number(body.invite_music) : null,
```

Add both to the SQL `INSERT` (column list and values).

### 7.4 Dashboard (`/admin/visits`)

Add a small breakdown section showing:
- Opens by side: count of `invite_side = 'bride'`, `invite_side = 'groom'`, `invite_side IS NULL`
- Opens by track: count per `invite_music` value (1, 2, 3, null)

Implemented as two additional aggregation queries alongside the existing visit list.

---

## 8. Static OG / Meta

Polished static block in `<Head>` in `engagement.jsx`. Not dynamic — same for all visitors.

```
og:title        "Aditya & Jyoti — Engagement Invitation"
og:description  "Join us to celebrate their engagement — 17th June 2026,
                 Suryansh Hotels & Resorts, Bhubaneswar.
                 In English, Hindi, Telugu & Odia."
og:image        /og-engagement.jpg  (1200×630px — drop file when ready)
og:type         website
og:url          https://adityanvs.in/engagement
twitter:card    summary_large_image
theme-color     #8B1A2B
```

---

## 9. Feature: SplashScreen Language Selector

### 9.1 What it does

A compact language selector lives at the **top-right corner** of the `SplashScreen` overlay. It lets guests pick their language before they enter the invite — critical for elderly relatives who may not notice the switcher later.

### 9.2 Layout

```
Position:  absolute, top: 1.2rem, right: 1.2rem, zIndex: 10000
Element:   Four pill chips in a row — EN · हि · తె · ଓ
Active:    Gold (#D4A843) background, dark text, slight scale-up
Inactive:  Transparent background, cream text at 60% opacity
Size:      Each chip 36×36px minimum touch target, pill border-radius
```

### 9.3 Cycling tooltip

Directly below the chips: a single line of text that auto-cycles through the four languages every 1.8s using `AnimatePresence` fade crossfade:

| Language | Text |
|---|---|
| English | "Select your language" |
| Hindi | "भाषा चुनें" |
| Telugu | "భాష ఎంచుకోండి" |
| Odia | "ଭାଷା ବାଛନ୍ତୁ" |

Styling: 11px, gold-tinted (`rgba(212,168,67,0.75)`), no background, no border. The cycling timer clears on `unmount` (when splash exits) and stops cycling once the user taps any chip — a local `hasInteracted` flag prevents restart.

### 9.4 State integration

Tapping a chip calls `setLang(code)` from `useLanguage()`. The splash immediately re-renders names in the new language (already wired — `SplashScreen` reads `lang` from context). `localStorage` persistence is handled by the existing `useLanguage` hook. No new state needed.

When the main page appears after "YOU ARE INVITED", `LanguageSwitcher` (top-right) already reflects the language the guest chose on the splash. No duplication.

### 9.5 Visibility rule

The language chips are always visible on the splash, even on return visits (where the splash itself is skipped via `sessionStorage`). When `sessionStorage.splash_shown` is set, the splash hides immediately — no issue since the chips are part of the splash and disappear with it.

---

## 10. Files Modified

| File | Change |
|---|---|
| `src/pages/engagement.jsx` | Add `getServerSideProps`; pass `side`, `musicTrack`, `hasSideParam`, `hasMusicParam` props; localStorage effects; remove ProgressDots; reposition MusicPlayer/LanguageSwitcher |
| `src/config/index.js` | `MEDIA.MUSIC_SRC → MEDIA.MUSIC_TRACKS` array |
| `src/components/shared/MusicPlayer.jsx` | Accept `track` prop; mute/unmute semantics; bottom-left position; new icon design |
| `src/components/shared/LanguageSwitcher.jsx` | Reposition to top-right; fix touch target to 44px (BUG-3) |
| `src/components/shared/ProgressDots.jsx` | **Delete** |
| `src/components/engagement/BlessingsSection.jsx` | Accept `side` prop; conditional card order |
| `src/components/engagement/EngagementHero.jsx` | Accept `side` prop; conditional name render order |
| `src/components/shared/SplashScreen.jsx` | Add language chip row (top-right) + cycling tooltip |
| `src/components/shared/VisitTracker.jsx` | Read `?side`/`?music` from URL; add to beacon payload |
| `src/pages/api/track.js` | Accept + validate + insert `invite_side`, `invite_music` |
| `src/pages/admin/visits.jsx` | Add side/music breakdown aggregation queries + display |
| **DB migration** | `ALTER TABLE visits ADD COLUMN invite_side varchar(8), invite_music smallint` |

---

## 11. Out of Scope

- Wedding page — not touched.
- Track labels / names visible in the UI — button shows mute/unmute only.
- Changing the `?music` track mid-session via UI — only param at load time selects the track.
- Dynamic OG tags — static only.
