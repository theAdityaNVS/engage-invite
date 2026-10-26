# Engage-Invite — Implementation Plan (subagent-driven)

**Created:** 2026-06-12
**Source of fixes:** `FIXLIST.md` (audit triage, 2026-06-12) + two new asks (analytics visualization, footer credit).
**Execution model:** Subagent-driven. Main thread plans + reviews; dispatch each task below to a Haiku/Sonnet subagent, then verify before moving on. Keep visual/iterative judgement in the main thread.

> Supersedes the prior PLAN.md (Blessings section refinement, 2026-05-25 — completed and merged).

---

## ⚠️ CRITICAL CONTEXT — THE APP IS ALREADY LIVE AND SHARED

The engagement invite is **deployed at `jyoti-engages.adityanvs.in` and the link was already sent to guests some time ago.** Every task must respect that:

1. **No breaking changes to the guest-facing flow.** Splash → language → enter → scroll → music must keep working exactly as today. Each visual/refactor task verifies on a **Vercel preview deploy first**, then promote to production. Never push a refactor straight to prod unverified.
2. **WhatsApp OG cache reality.** Links already shared cached the (currently blank) preview; WhatsApp caches ~30 days and dedupes by `og:url`. Fixing `og:url` to the **deploy domain changes the canonical URL**, so *newly shared* links scrape fresh and show the photo. Already-sent links may stay blank until their cache expires — acceptable, but tell the user so they can re-share if they want the preview refreshed. (No public debugger for this non-FB domain; validate by sharing a fresh link to a test chat.)
3. **The analytics DB has live data.** All schema changes must be **additive and backward-compatible** (`ALTER TABLE ... ADD COLUMN`, nullable / defaulted). Existing rows keep working with NULLs. Never drop/rename columns the live beacon writes.
4. **Work on a feature branch**, preview-deploy, verify, then merge. Do not commit/push without the user's go-ahead (per global rules).

---

## TASK WAVES

Tasks within a wave are independent and may be parallelized. Waves are ordered by risk (safe → heavy). Every task ends with an explicit verification gate; a task is not "done" until its gate passes on a preview build.

### WAVE 1 — Safe content/meta wins (low risk, no layout impact)

**T1 · OG fix + footer credit + missing i18n keys**
- OG-1/OG-2 (`engagement.jsx:70,73`): point `og:url` and `og:image` to `https://jyoti-engages.adityanvs.in/...`. Prefer driving from `DOMAIN.ENGAGEMENT` in `src/config/index.js` so it's config-driven (CLAUDE.md rule).
- OG-3 (`engagement.jsx:74-75`): change declared dims to `1200`×`630`. **Image regeneration is on the user** — flag that `public/og-engagement.jpg` must be replaced with a real 1200×630 file; the meta change alone won't fix the thumbnail crop.
- BUG-5b (`SplashScreen.jsx:378`): replace hardcoded `"YOU ARE INVITED"` with `t('you_are_invited')`. Add `you_are_invited` to all 4 JSONs (`en/hi/te/or`).
- I18N-2 (`CountdownTimer.jsx:120`): add `celebration_begins_message` to all 4 JSONs; remove the now-dead `||` fallback.
- **Footer credit** (`FooterSection.jsx`): add a "Built with love by Aditya" line. (`made_with_love` = "Made with ❤️" already renders.) Add a dedicated `built_by` key to all 4 JSONs (EN: "Built with love by Aditya") and render it as a footer line. Keep existing `#thecutestAJstory` and `© 2026 theAdityaNVS`.
- **Gate:** `npm run build` clean; view-source shows deploy-domain OG tags + 1200×630; splash button + footer credit + countdown message render correctly when language = hi/te/or (not raw keys).

**T2 · Dead code & dependency cleanup**
- BUG-4 (`globals.css`): delete 8 dead keyframes (`cursorBlink`, `skyFade`, `sunArc`, `moonArc`, `ripplePulse`, `starTwinkle`, `orbit*`, `photoFloat`); dedupe `timelineNodePulse`. Grep `src/` to confirm zero references before deleting each.
- PERF-6 (`_document.js:10`): remove the Cormorant Garamond (wedding) `<link>` — unused on engagement.
- PERF-9: `npm rm @studio-freight/lenis` (keep `lenis`; confirm imports use `lenis`).
- PERF-10: `npm rm swiper` (confirm zero imports).
- PERF-12: delete `FloatingPetals` component + its dead `petalDrift` keyframe (confirm never mounted).
- VIS-4 (`CoupleSection.jsx:274`): `var(--rose)` → `var(--burgundy)`.
- **Gate:** `npm run build` clean; `git grep` confirms no dangling refs to anything removed; page renders visually identical on preview.

### WAVE 2 — Small a11y + config (low risk)

**T3 · Touch targets + hometowns to config**
- A11Y-2 (`SplashScreen.jsx:199-200`): language chips → `minWidth/minHeight: 44px`.
- A11Y-3 (`LanguageBanner.jsx:94`): dismiss button → 44px.
- BUG-6 (`BlessingsSection.jsx:267,276`): move `Visakhapatnam` / `Sunabeda` into `FAMILIES` config (`GROOM_LOCATION` / `BRIDE_LOCATION`), reference from component.
- **Gate:** measured tap targets ≥44px; build clean; hometowns still display, now sourced from config.

### WAVE 3 — Heavier refactors (verify carefully on preview, run sequentially)

**T4 · Image optimization (PERF-2)** — `AnimatedPhoto.jsx`, `PhotoCarousel.jsx`: replace raw `<img>` with `next/image`; `priority` on the couple portrait, lazy for gallery. **Watch:** the Ghibli CSS filter and float animation must still apply; no layout shift; aspect ratios preserved. **Gate:** preview deploy — photos render with filter, Network panel shows WebP + lazy loading, no CLS regression.

**T5 · Code-split Framer Motion (PERF-1)** — `engagement.jsx:5-18`: wrap below-the-fold sections in `next/dynamic(() => import(...), { ssr: false })` (keep hero SSR for OG/first paint). **Watch:** no hydration mismatch, no flash of missing sections, AutoScrollHint section IDs (`section-hero/events/couple/info/countdown`) still present. **Gate:** preview deploy — full scroll works, initial JS bundle smaller (compare `npm run build` output), no console hydration errors.

**T6 · Hex → CSS vars (VIS-5)** — migrate hardcoded hex in section components' inline styles to the canonical `--saffron/--burgundy/--sand/--navy/--gold` vars from `globals.css`. Pure housekeeping. **Gate:** side-by-side screenshot diff shows no visual change.

**T7 · Server-side `?lang=` (SEO-3)** — read `lang` in `getServerSideProps`, seed `LanguageProvider` / `<html lang>` so non-English share links don't flash English. **Watch:** must still respect `localStorage` precedence and the splash language picker. **Gate:** open `?lang=hi` in a fresh profile → Hindi paints immediately, no English flash.

### WAVE 4 — Security hardening (low risk, API-only)

**T8 · API hardening**
- SEC-B (`api/visits.js:83`): return a generic `{ error: 'query failed' }`; log detail server-side only.
- SEC-D (`api/track.js`): add lightweight rate limiting (per-IP short window / token bucket) to protect the Neon free tier.
- SEC-E (`api/weather.js:15`): validate `lat`/`lng` are finite numbers in range before forwarding to OpenWeatherMap.
- **Gate:** induced DB error returns generic message; flooding `/api/track` gets throttled; out-of-range weather coords rejected.

### WAVE 5 — ANALYTICS OVERHAUL (headline new feature) — see design below.
Build as **T9 (data layer)** → **T10 (dashboard viz)**.

---

## ANALYTICS OVERHAUL — DESIGN

### Why the current numbers mislead (especially in India)
- **"Total Opens" = page loads**, not people. **"Unique Visitors" = distinct IP**, but India runs massive CGNAT (Jio/Airtel) — thousands of guests can share one carrier IP, so unique-by-IP **badly undercounts** and household Wi-Fi over-merges. We need a device-level identity.
- **No engagement depth.** We don't know who actually tapped "You are invited", scrolled, played music, tapped "Navigate", opened the gallery, or how long they stayed. Today every visit looks identical.
- **No trends.** Can't see the open spike when the link was shared, or peak hours.

### T9 · Data layer (additive migration + richer beacon)

**Migration (safe on live DB — additive only). Apply to a Neon BRANCH first, verify, then prod:**
```sql
ALTER TABLE visits
  ADD COLUMN IF NOT EXISTS visitor_id   text,        -- persistent device id (localStorage UUID)
  ADD COLUMN IF NOT EXISTS event_type   text DEFAULT 'page_open',
  ADD COLUMN IF NOT EXISTS event_detail text,        -- section id / music track / lang
  ADD COLUMN IF NOT EXISTS dwell_ms     integer,     -- time on page at unload
  ADD COLUMN IF NOT EXISTS scroll_depth integer;     -- max % scrolled
CREATE INDEX IF NOT EXISTS visits_visitor_idx ON visits (visitor_id);
CREATE INDEX IF NOT EXISTS visits_event_idx   ON visits (event_type);
```
Existing rows get NULL `visitor_id` / default `page_open` — backward compatible.

**Identity (highest-value add):**
- **`visitor_id`**: UUID generated once, stored in `localStorage` (`invite_visitor`). Survives sessions, immune to CGNAT → trustworthy **Unique Devices** + **Returning vs New**. Keep existing per-session `session_id` for session rollups.
- **Optional passive fingerprint fallback** (localStorage cleared/blocked): hash of `UA + screen + timezone + language + platform`. Lower fidelity; tiebreaker only. **Privacy:** increases tracking; user declined an in-app data notice (SEC-INFO). For a private invite to known guests this is low-risk, but DPDP Act (India) is worth one line. **Confirm with user before adding the fingerprint — `visitor_id` alone may suffice.**

**Event beacons (engagement depth):** extend the client beacon to fire named events via `navigator.sendBeacon` (non-blocking, survives unload), all through the existing `/api/track` sink (just more columns), keeping "fail silently — analytics must never break the invite":
- `page_open` (today's behavior, unchanged) · `entered` (tapped splash) · `language_selected` (detail=lang) · `music_played` · `section_view` (detail=section id, via IntersectionObserver) · `navigate_click` (detail=event) · `gallery_open` · `whatsapp_share` · `engagement` (on `visibilitychange`/`pagehide`: `dwell_ms` + `scroll_depth`).

### T10 · Dashboard visualization redesign (`admin/visits.jsx` + `api/visits.js`)
Admin page is `noindex` → bundle size irrelevant; a chart lib (Recharts) is fine. Add aggregates server-side, new panels:
1. **Real KPI cards:** Unique Devices · Returning vs New · Total Opens · Engaged % (tapped "entered") · Avg dwell · Peak hour.
2. **Opens over time** — area/line per day (per hour on launch day) → the share-spike becomes visible.
3. **Engagement funnel** — Opened → Entered → Scrolled ≥50% → Music → Shared (the best "did they actually engage" view).
4. **Section reach** — bar of `section_view` counts (how far guests scrolled).
5. **Hour×weekday heatmap** — when guests open.
6. **Geography** — city-level bars (have country already); optional India map later.
7. **Device / browser / OS** donut/bars (data already collected).
8. Keep share-param breakdowns (side/music/invite_lang), sessions table, search, CSV — extend CSV with new columns.
9. **Session rollup view** — collapse rows by `session_id` into one session with derived dwell + max scroll + events fired, so the table reads as "sessions" not raw beacons.

- **Gate:** migration tested on a Neon branch; beacon writes new columns (inspect a test row); dashboard panels render real data on preview; existing CSV/search/tabs still work; live invite flow unaffected (analytics still fails silently).

---

## SEQUENCING & VERIFICATION DISCIPLINE
1. New branch `feature/audit-fixes` off `main`.
2. Execute waves in order. Within a wave, dispatch tasks to subagents; main thread reviews each diff + runs the gate.
3. After each wave: `npm run build` + preview deploy + smoke-test the guest flow.
4. Analytics migration: apply to a **Neon branch** and test before touching the production DB.
5. Merge to `main` / promote to production only with the user's explicit go-ahead. Do not auto-commit/push.
6. On completion, update memory (`MEMORY.md`, bugs, status) and tick items in `FIXLIST.md`.

## NOT IN SCOPE (user decided in interview — do not "fix")
Pinch-zoom + sub-16px fonts (kept), hero 4-language cycle (kept as decorative), music preload gating, lantern/GPU reduction, `prefers-reduced-motion`, weather env-var rename (already correct in Vercel), in-app data-collection notice.
