# Engage-Invite Fix List

Generated from the 2026-06-05 audit triage interview (completed 2026-06-12).
Only `FIX` items are listed, ordered by severity. Items marked WONTFIX / INTENTIONAL
in the interview are recorded at the bottom for the record.

---

## CRITICAL

- [ ] **OG-1 / OG-2 — OG tags point to wrong domain.** `engagement.jsx:70,73`. Change `og:url` and `og:image` from `https://adityanvs.in/...` to `https://jyoti-engages.adityanvs.in/...` (preferably drive from `DOMAIN.ENGAGEMENT`). Fixes blank WhatsApp preview (apex returns 404).
- [ ] **PERF-1 — Code-split Framer Motion.** `engagement.jsx:5-18`. Wrap below-the-fold sections in `next/dynamic(() => import(...), { ssr: false })`.
- [ ] **PERF-2 — Use next/image.** `AnimatedPhoto.jsx`, `PhotoCarousel.jsx`. Replace raw `<img>` with `next/image`; set `priority` on couple portrait.

## HIGH

- [ ] **BUG-5b — Splash "YOU ARE INVITED" hardcoded English.** `SplashScreen.jsx:378`. Replace literal with `t('you_are_invited')` (add key to all 4 JSONs).
- [ ] **I18N-2 — Missing `celebration_begins_message` key.** `CountdownTimer.jsx:120`. Add key to all 4 translation JSONs; remove the `||` fallback.
- [ ] **A11Y-2 / A11Y-3 — Touch targets <44px.** `SplashScreen.jsx:199-200` (language chips 34px), `LanguageBanner.jsx:94` (dismiss ~20px). Set `minWidth/minHeight: 44px`.
- [ ] **OG-3 — OG image dimensions.** `engagement.jsx:74-75`. Regenerate `og-engagement.jpg` to 1200×630; update declared dims.
- [ ] **BUG-6 — Family hometowns hardcoded.** `BlessingsSection.jsx:267,276`. Move `Visakhapatnam` / `Sunabeda` into `FAMILIES` config.
- [ ] **BUG-4 — Dead CSS keyframes.** `globals.css`. Delete 8 dead keyframes (`cursorBlink`, `skyFade`, `sunArc`, `moonArc`, `ripplePulse`, `starTwinkle`, `orbit*`, `photoFloat`); dedupe `timelineNodePulse`.

## MEDIUM

- [ ] **VIS-4 / VIS-5 — Migrate hardcoded hex to CSS vars.** All section components; fix `CoupleSection.jsx:274` `var(--rose)` → `var(--burgundy)`.
- [ ] **PERF-6 — Drop unused wedding font.** `_document.js:10`. Remove Cormorant Garamond `<link>`.
- [ ] **SEO-3 — Read `?lang=` server-side.** `engagement.jsx` getServerSideProps. Eliminate FOUC for non-English share links.

## LOW (security)

- [ ] **SEC-B — Hide DB error text.** `api/visits.js:83`. Return generic message, not raw Postgres error.
- [ ] **SEC-D — Rate-limit `/api/track`.** Prevent Neon free-tier flooding.
- [ ] **SEC-E — Validate weather lat/lng.** `api/weather.js:15`. Reject out-of-range coords to protect OWM quota.

## LOW (dependency cleanup)

- [ ] **PERF-9 — Remove duplicate `@studio-freight/lenis`.** Keep `lenis`.
- [ ] **PERF-10 — Remove `swiper`.** Never imported.
- [ ] **PERF-12 — Delete `FloatingPetals`.** Unused component + dead `petalDrift` keyframe.

---

## NOT FIXING (interview decisions, for the record)

- **VIS-3 / VIS-2 (zoom + sub-16px fonts)** — INTENTIONAL, leave as-is.
- **BUG-5a (hero 4-language cycle)** — INTENTIONAL decorative feature, keep cycling.
- **PERF-3 (music preload), PERF-4/5 (lanterns/GPU)** — WONTFIX.
- **A11Y-1 (prefers-reduced-motion)** — WONTFIX.
- **CORRECT-2 (weather env var)** — WONTFIX; key name already correct in Vercel.
- **SEC-INFO (data-collection notice)** — not selected.
