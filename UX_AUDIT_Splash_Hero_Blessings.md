# UX/UI + Performance Audit — Splash · Hero · Blessings

**Site:** `/engagement` · **Audited live** at `localhost:3000` via Chrome DevTools MCP
**Viewports tested:** 1440×900, 390×844, 320 (narrow) · **Date:** 2026-05-31

Verdict: the bones are genuinely premium — the twilight hero gradient, the Jagannath temple SVG, the cinematic name crossfade and the patrika-door reveal are a strong concept. But several **legibility failures violate the project's own elder-first / 16px mandate**, one **z-index leak breaks the splash reveal**, the **doors render washed-out**, there's a **404 on the music track**, and the page ships a **measured CLS of 0.19** from unoptimized web-font loading. None are hard to fix. Details below.

---

## ✅ What's actually working (verified, not assumed)

- **Mobile auto-scroll bug is fixed.** Logged `window.scrollY` for 16s after load at 390×844 — pinned at `0` the entire time. The recent commit holds. Date/venue pill stays visible on load.
- **No React hydration mismatches.** Console is clean of hydration warnings — the `toFixed(4)` SVG point-rounding strategy works.
- **ProgressDots** tap targets are correctly 44×44.
- **320px:** no horizontal overflow (`scrollWidth 485 < vw`); names fit comfortably.
- **Family-card couple names** (white on dark glass) measure **6.33:1** — good.
- **The splash exit itself is reflow-safe** — it's a `position:fixed` overlay that fades on `opacity` while the hero is mounted behind it. (But the page as a whole still shifts during load — see C6, font-swap CLS.)

---

## 🔴 Critical flaws

### C1. LanguageSwitcher floats *over* the sealed splash doors
`LanguageSwitcher` is `zIndex: 100` (`LanguageSwitcher.jsx:39`); the splash overlay is `zIndex: 90` (`SplashScreen.jsx:108`). Result: the floating **"EN" pill is visible top-right over the closed cardstock doors** at every breakpoint — verified visually at 1440, 390 and 320. It shatters the "sealed invitation" first impression.
*(`MusicPlayer` is `z:80`, correctly hidden — only the switcher leaks.)*
**Fix:** raise splash overlay to `zIndex: 9999`, or don't mount `LanguageSwitcher` until `onEnter` fires.

### C2. The doors render as washed-out dusty rose, not deep burgundy
The cardstock texture is `url("https://www.transparenttextures.com/patterns/cream-paper.png")` — a **light** texture tiled with the default (normal) blend over `--burgundy-dark (#6F1A32)`. It lightens the burgundy into flat construction-paper pink — clearly visible in the frozen closed-door frame, where the intended rich wine reads as muted mauve. Two problems:
1. **Visual:** the deep wine the design intends is gone — the doors look faded, which undercuts the most important "first frame."
2. **Reliability:** the texture is an **external hotlink** to transparenttextures.com. It loaded fine during this audit, but a premium invite shouldn't depend on a third-party CDN being reachable (offline guests, adblock, CDN downtime). Self-host it.
**Fix:** copy the texture into `/public`, add `mixBlendMode: 'multiply'` (or drop texture opacity) so the burgundy stays rich, and bump the gold inner borders from `rgba(212,168,67,0.4)/0.15` — currently barely visible — to `~0.6/0.3`.

### C3. Music track 404s on every load
`MEDIA.MUSIC_SRC = '/music/engagement-track.mp3'` (`config/index.js:110`) → **404 Not Found** (console error confirmed). `MusicPlayer` only guards against an *empty* src, so a missing-but-truthy path still tries to load.
**Fix:** add the asset, or null the config value until it exists (the guard at `MusicPlayer.jsx:11` already handles null).

### C4. Gold mantra on saffron — failing contrast
`ॐ श्री गणेशाय नमः` is `#D4A843` sitting where the section's gradient has reached saffron-orange. Measured **~2.0:1** (and trending toward 1:1 in the gold band just above it). Either way it fails WCAG (large text needs ≥3:1) and is the single most visible legibility flaw in Blessings.
**Fix:** recolor to `var(--saffron-text)` cream, or place it on a subtle darker plate. (The Devanagari shloka just below, already cream, is the correct model — 4.20:1.)

### C5. Sub-16px text breaks the project's own elder-minimum mandate
`Events/CLAUDE.md`: *"Minimum body text: 16px everywhere (elder-friendly requirement)."* Measured violations in the three audited sections:

| Text | Size | Opacity | Contrast | Note |
|---|---|---|---|---|
| "May this light bring auspiciousness…" (shloka meaning) | **13px** | 0.65 | **2.43:1** | fails AA, faded |
| `VISAKHAPATNAM` / `SUNABEDA` (card location) | **10px** | 0.5 | **2.58:1** | fails |
| `GROOM'S/BRIDE'S PARENTS` label | **12px** | 0.75 | 3.90:1 | small-text fail |
| `Sibling` label | **11px** | 0.45 | **2.36:1** | fails |
| gotra / nakshatra | **~10px** | 0.55 | **2.81:1** | fails |
| `SCROLL DOWN TO DISCOVER` | 11px | 0.85 | — | sub-16px |
| `✦ TOGETHER THEY BEGIN ✦` | 14px | 0.85 | — | sub-16px |

Note on weighting: the 10–12px uppercase eyebrow labels (`VISAKHAPATNAM`, `Sibling`, gotra) are a defensible luxury-invite *style* — the stronger, harder-to-dispute objection to them is the **contrast** (2.36–2.81:1, table above), not the size. The size mandate bites hardest on the **13px shloka meaning line**, which is genuine body copy, genuinely too small, *and* faded to 2.43:1 — the audience the site is explicitly designed for (elderly relatives) cannot comfortably read it.
**Fix:** floor real body text at 16px; raise the meaning line opacity `0.65 → 0.85`; raise card micro-labels `0.45/0.5 → 0.7` (contrast first, size second for the decorative eyebrows).

### C6. Font-swap CLS — measured **0.19 in dev, but only 0.02 in production** ✅ no refactor needed
A dev-server trace showed **CLS 0.19** with the culprit cluster (score 0.17) attributed to web-fonts swapping in (Lora, Playfair, Great Vibes, Noto). **Re-measured on a production build (`next build && next start`), CLS dropped to 0.02 — within the "Good" range (<0.1).** The dev number was inflated by the unminified dev server / HMR overhead; the real shift is negligible.
**Conclusion:** the proposed `next/font/google` migration is **not warranted** — it would touch 89 inline `fontFamily` references across 17 files for a 0.02 → ~0 gain. The proportionate fix already applied: consolidate Great Vibes into the single `_document.js` font link and drop the `next/head` injection in `engagement.jsx` (silences the Next warning, removes a duplicate round-trip). Leave the broader font system as-is.
*Separate observation (not a font issue): production LCP traced at ~5.4s with a 20ms TTFB — i.e. pure render-delay. The cause is the framer-motion opacity fade-ins on the largest text (splash/hero names animating from `opacity:0`), which defers the LCP timestamp. If LCP becomes a priority, render the largest hero text at full opacity and animate a wrapper/transform instead. Out of scope for this audit.*

---

## 🟠 Correctness / code hygiene

- **Dead code in SplashScreen.** It imports `useLanguage` and defines a 4-entry `LANGUAGES` array (`SplashScreen.jsx:1–11`) but **renders no language picker** — verified in DOM. Language is only ever chosen via the floating switcher. (Note: `engage-invite/CLAUDE.md` claims the splash *has* a language picker — the doc and the code disagree.) Either implement the picker in the splash or delete the unused import + array.
- **Fonts loaded via `next/head`.** Console warns: `Great Vibes` `<link rel="stylesheet">` is injected through `next/head` (Next.js `no-stylesheets-in-head-component`). This is the root of the measured CLS in **C6** — `next/font/google` is the correct fix and addresses both at once.
- **Framer-motion "non-static position" warning.** `useScroll` in the hero logs a measurement warning on hydration. Benign (the target *is* `position:relative`), but worth silencing — usually fixed by ensuring the ref'd element is laid out before measurement.
- **EN switcher tap target is 40px tall** (77×40) — under the 44px minimum the project uses elsewhere.

---

## ✨ Premium polish (good → jaw-dropping)

1. **Closed-door state is bare.** Two mauve rectangles + a thin gold seam. Add a centered gold **monogram (A&J)** or a small **Ganesha / wax-seal medallion** at the seam line, plus a soft inner vignette. This is the first frame every guest sees — it should feel embossed.
2. **Name crossfade settles too rarely.** `AnimatePresence mode="wait"` with `blur(8px)` on both exit and enter (0.9s each) means ~1.8s of every 3.5s cycle is mid-blur — the name never quite "rests." Drop to ~0.5s, or overlap exit/enter so the legible dwell is longer. (Also consider: English appears only 1-in-4 cycles; an elder may not catch *whose* engagement it is — optionally hold English longer.)
3. **Date/venue pill looks static but is clickable** (it scrolls to the map). Add a hover affordance / `cursor: pointer` cue so the interaction is discoverable.
4. **Desktop hero composition is left-weighted** — at 1440 the temple sits left-of-center with a lone kalash bottom-center, leaving the right half empty. Consider centering the temple or mirroring a second motif.
5. **Mantra plate.** Beyond fixing contrast (C4), a faint translucent cream plate behind the invocation block would lift it off the busy gradient and read as more deliberate.
6. **Name repetition across the three sections.** The couple's names appear three times in close succession — splash ("Aditya & Jyoti"), hero (cycling, full-screen), and the Blessings invite block ("Aditya & Jyoti" again in Great Vibes). Splash → hero is fine (it's a reveal). But the Blessings closing block repeats the exact same treatment as the splash, so by the time a guest reaches it the gesture has lost impact. Consider differentiating it — e.g. lead the invite block with "request the pleasure of your company" framing rather than re-stating the names in the same script.

---

## 🔧 Surgical fix list

| # | File | Change |
|---|---|---|
| C1 | `SplashScreen.jsx:108` | `zIndex: 90 → 9999` (or gate `LanguageSwitcher` mount on splash dismissal) |
| C2 | `SplashScreen.jsx:257,277` | self-host texture; add `mixBlendMode:'multiply'`; borders `0.4/0.15 → 0.6/0.3` |
| C3 | `config/index.js:110` | add `/public/music/engagement-track.mp3` or set `MUSIC_SRC` null until available |
| C4 | `BlessingsSection.jsx:219` | mantra `color: '#D4A843' → 'var(--saffron-text)'` |
| C5 | `BlessingsSection.jsx` (meaning, card labels) + hero/scroll labels | floor font-size ≥16px; meaning opacity `0.65→0.85`; labels `0.45/0.5→0.7` |
| C6 / H2 | font loading | migrate Google Fonts → `next/font/google` to kill the 0.17 font-swap CLS and remove render-path round-trips |
| H1 | `SplashScreen.jsx:1,6–11` | remove unused `useLanguage` import + `LANGUAGES` array (or build the picker) |
| H3 | `LanguageSwitcher.jsx` | min-height `40 → 44px` |

---

*Method note: numbers above were measured live, not read off source — computed styles, WCAG blend+luminance math on alpha-blended foregrounds over the actual rendered background (gold band, saffron, or the dark-glass card composite), 16s scroll logging for the mobile auto-scroll check, and a Chrome DevTools performance trace for LCP/CLS + the CLS-culprit attribution. One earlier inference ("low CLS") was discarded after the trace showed 0.19; it's reported as measured above.*
