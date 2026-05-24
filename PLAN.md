# Implementation Plan — Blessings / Events Section Refinement

**Branch:** `feature/refine-blessing-section`
**Date:** 2026-05-25
**Source:** Brutally-honest UI/UX review (390px-first) of the live build after consolidating `FamilyShlokaSection` into `BlessingsSection`.

## Context

`FamilyShlokaSection.jsx` was deleted and its content (Shubham Karoti shloka, family details, siblings, location labels) folded into `BlessingsSection.jsx`. This correctly eliminated the old bug where parents' names printed twice on one page. The four items below are locked decisions from the review; execute them on this branch.

Current Blessings structure (`src/components/engagement/BlessingsSection.jsx`):
- Block 1 — Invocation: Ganesha SVG + `mantra` + `family_blessings` (lines 203–229)
- Shloka block — diyas + Shubham Karoti + meaning (lines 231–275)
- Block 2 — Family cards (lines 277–409)
- Block 3 — Invite climax: `invite_intro` / `invite_you_to_join` / **Aditya & Jyoti** (Great Vibes) / `on_the_following_events` (lines 411–481)

---

## 1. Name seam / repetition — MERGE & REARRANGE (keep the branding)

**Decision:** Keep the Great Vibes "Aditya & Jyoti" treatment (branding is good). Eliminate the duplicated "come celebrate at the events" beat.

**Problem:** Block 3 ends with the giant name + `on_the_following_events`, then `EventCardsSection` immediately opens with `JOIN US / The Celebrations / Shubha Muhurtham` in the same orange field — same beat twice, and the giant name is the 3rd oversized reveal (splash → hero "Aditya WEDS Jyoti" → here).

**Fix:**
- Merge Block 3 and the Events-section header into one transition: a single name treatment + one "join us for the following events" line, then straight into the events grid. Remove the redundant `JOIN US` / second "celebrate" line so the beat appears once.
- Keep one Great Vibes "Aditya & Jyoti" as the climax of that merged block.

**Broader repetition pass (user agreed — rationalize site-wide so each beat appears once):**
- "Aditya & Jyoti" giant name currently at: splash, hero, blessings invite block, couple-section quote signature, countdown footer. Decide which are intentional; trim the rest.
- "celebrate/celebrations" appears as `TOGETHER WE INVITE YOU TO CELEBRATE`, `engagement celebrations of`, `The Celebrations` — collapse duplicates.
- `JOIN US` echoes `invite you to join us` — keep one.

---

## 2. Elder legibility — names ≥16px + trim labels

**Decision:** Bump parent & sibling names to ≥16px, raise label contrast, drop the redundant card-level "With the blessings of".

**Measured now (all below the project's mandated 16px elder-minimum):** location 9.9px, parents label 11.5px, "with blessings of" 11.5px, **parent names 14.4px**, sibling label 11.2px, sibling name 13.6px.

**Fix (family cards, `BlessingsSection.jsx` ~339–405):**
- Parent names (367–372): `clamp(0.9rem, 2.5vw, 1.05rem)` → floor at 16px, e.g. `clamp(1rem, 2.8vw, 1.15rem)`.
- Sibling name (384–388): raise to ≥1rem floor.
- **Delete** the card-level `with_blessings_of` line (359–365) — the section heading `family_blessings` already says it.
- Raise contrast / consolidate micro-labels: merge `location` + `PARENTS` into one label row to cut row count; bump opacities off the 0.45–0.5 range.
- Target hierarchy per card: `[icon] → [LOCATION · PARENTS] → names (≥16px) → sibling (if present)`.

---

## 3. Family card parity — balance the layout

**Decision:** Cards must look balanced whether or not a sibling exists.

**Problem:** Groom card has a sibling (Nadamuni Dhruv); bride card has none → dead space at the bottom of the bride card. Reads as one family slighted. Bride sibling is an open content item — do not depend on it being filled.

**Fix:**
- Card inner layout to `display:flex; flex-direction:column; justify-content:center` so a card with fewer rows centers its content instead of leaving bottom dead space.
- Keep cards equal height; distribute whitespace evenly.
- Sibling block stays conditional (`sibling && ...`).

---

## 4. Family icon — simplify to one motif

**Decision:** Replace the two-figure illustrations with a single clean auspicious motif inside the existing ring.

**Problem:** `GroomsFamilySVG` / `BridesFamilySVG` cram ~26 vector elements into an 80px badge → reads as a blob.

**Fix:**
- Keep the dashed mandala ring (differentiates groom/bride nicely, reads well).
- Replace the central two-figure group with one clean symbol: kalash (purna kumbha), lotus, or an enlarged reuse of `DiyaIcon`.
- Delete the now-unused detailed figure path code.

---

## Folded-in defaults (no decision needed)

- **Devotional pacing:** KEEP both invocations (Ganesha mantra + Shubham Karoti shloka) — culturally appropriate. Revisit only if it feels long in testing.
- **Glass card panels:** KEEP — they read fine on desktop; the real issue was text contrast (handled in #2).

## Out of scope here (already logged, sitewide)

- EN sticky pill overlaps top-edge text during scroll.
- ProgressDots faint on warm-colored sections (issue A-4).

---

## Verification

- Dev server already running on `:3000`; review at **390px (priority)** then 1440px.
- Confirm parent names compute to ≥16px (measure `font-size`).
- Confirm the blessings→events seam has the "join us for the events" beat **once**.
- Confirm groom card (with sibling) and bride card (no sibling) look balanced — no dead space.
- Confirm the family icon is legible at 80px.
- No raw translation keys leak in any of en/hi/te/or; `npm run build` passes clean.

## Commit (when changes are done)

```
refactor(blessings): merge invite/events seam, raise elder legibility,
balance family cards, simplify family icon
```

---

## Background Pattern System — DONE (2026-05-25)

Added subtle tiled lotus-mandala texture behind every section. New reusable component `src/components/shared/MandalaPattern.jsx` (props: `color`, `opacity`; renders an absolute zIndex:0 SVG `<pattern>` behind content). Rolled out via Haiku/Sonnet subagents.

Per-zone values (note: gold-on-warm needs higher opacity than the 4–6% first tried — it was invisible on warm-on-warm):

| Zone | Sections | color | opacity |
|---|---|---|---|
| Saffron | Blessings, EventCards, RouteCTA | `var(--gold-light)` | 0.22 |
| Burgundy | Couple, RSVP, Gallery | `var(--gold-light)` | 0.16 |
| Sand | ThingsToKnow | `var(--saffron-dark)` | 0.10 |
| Navy | Countdown, Footer | `var(--gold)` | 0.08 |

Each host section was given `position:relative; overflow:hidden`; content wrappers carry `position:relative; zIndex:1` so text stays above the texture.

Open tweak: sand zone is faint (section is mostly cream cards) — bump opacity if more presence wanted.

