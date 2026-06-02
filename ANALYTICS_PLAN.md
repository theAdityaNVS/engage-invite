# Visit Analytics Plan — engage-invite

**Goal:** Log every real human open of the invite with timestamp, raw IP, geo
(city/region/country), device (browser/OS/type), screen, timezone, chosen
language, referrer. Store in Neon Postgres. View via a password-protected
dashboard.

**Decisions (locked):**
- Granularity: **aggregate visits** (no per-guest unique links). Every open is a
  row; not tied to a named person.
- Stack: **custom** — Next.js API route → Neon Postgres → protected dashboard page.
- IP: **full raw IP + derived geo**.

---

## Why a client-side beacon (not server/middleware capture)

WhatsApp / iMessage / Telegram link-preview crawlers fetch the page server-side
but never run JS. If we logged on the server request, every preview bounce and
prefetch would count as an "open." A **client beacon fired once per session**
counts only real human opens — exactly what you want. The IP/geo are still read
**server-side** from the request headers when the beacon POSTs, so they're
trustworthy.

---

## Data captured

| Field | Source |
|---|---|
| `ts` | server `now()` |
| `site` | `'engagement'` (derived from path; future-proofs the wedding page) |
| `path` | beacon body |
| `ip` | `x-forwarded-for` / `x-real-ip` header (server) |
| `country` `region` `city` `latitude` `longitude` | Vercel geo headers `x-vercel-ip-*` (server, **production only**) |
| `ua` `browser` `os` `device_type` | parse `user-agent` server-side |
| `screen` `viewport` `timezone` `language` `referrer` | beacon body (browser) |
| `session_id` | random id in `sessionStorage`, dedupes repeat opens in one session |

> **Dev note:** `x-vercel-ip-*` headers exist only on Vercel. Locally they'll be
> null — that's fine. (Optional dev-only fallback to `ipapi.co` if you want geo
> while testing; not required.)

---

## Files

**New:**
- `src/lib/db.js` — Neon client (`@neondatabase/serverless`), reads `DATABASE_URL`.
- `src/pages/api/track.js` — `POST` only. Reads IP + geo + UA from headers,
  merges beacon body, inserts one `visits` row. Returns `204`. Fails silently
  (analytics must never break the invite).
- `src/components/shared/VisitTracker.jsx` — `ClientOnly`-style effect that fires
  the beacon once per session (guarded by `sessionStorage` key `visit_logged`).
- `src/pages/api/visits.js` — `GET`, returns rows + aggregates. Behind auth.
- `src/pages/admin/visits.jsx` — dashboard table + summary cards. Behind auth.
- `middleware.js` (project root) — HTTP Basic Auth gate for `/admin/:path*` and
  `/api/visits`, using `ADMIN_USER` / `ADMIN_PASS` env.

**Modified:**
- `src/pages/_app.js` — mount `<VisitTracker />` alongside `<Analytics />`.
- `.env.local.example` — document `DATABASE_URL`, `ADMIN_USER`, `ADMIN_PASS`.

**Deps to add:** `@neondatabase/serverless`. (`ua-parser-js` optional for robust
device parsing; otherwise a ~15-line inline UA parser covers browser/OS/mobile.)

---

## Neon schema

```sql
CREATE TABLE visits (
  id          BIGSERIAL PRIMARY KEY,
  ts          TIMESTAMPTZ NOT NULL DEFAULT now(),
  site        TEXT NOT NULL DEFAULT 'engagement',
  path        TEXT,
  ip          TEXT,
  country     TEXT,
  region      TEXT,
  city        TEXT,
  latitude    TEXT,
  longitude   TEXT,
  ua          TEXT,
  browser     TEXT,
  os          TEXT,
  device_type TEXT,
  screen      TEXT,
  viewport    TEXT,
  timezone    TEXT,
  language    TEXT,
  referrer    TEXT,
  session_id  TEXT
);
CREATE INDEX idx_visits_ts ON visits (ts DESC);
```

---

## Dashboard (`/admin/visits`)

- Summary cards: total opens, unique IPs, opens last 24h, top country, top device.
- Table (newest first): time, city/country, IP, device (`browser · os · type`),
  language, referrer.
- Simple breakdowns: by country, by device type, by language.
- Client-fetches `/api/visits`; both that route and `/admin/*` sit behind the
  middleware Basic Auth, so the browser prompts once and reuses the credentials.

---

## Build sequence

1. **Neon** (via Neon MCP): create/confirm project → branch → run schema. Grab
   pooled `DATABASE_URL`. → verify: `SELECT 1` works.
2. Add `DATABASE_URL`, `ADMIN_USER`, `ADMIN_PASS` to `.env.local` and to Vercel
   project env (all envs). → verify: present in both.
3. Install `@neondatabase/serverless` (+ optional `ua-parser-js`). → verify: build clean.
4. `src/lib/db.js` + `src/pages/api/track.js`. → verify: `curl -XPOST /api/track`
   inserts a row.
5. `VisitTracker.jsx` + wire into `_app.js`. → verify: loading `/engagement` once
   adds exactly one row; refresh in same tab adds none (session guard).
6. `middleware.js` Basic Auth. → verify: `/admin/visits` returns 401 without creds.
7. `src/pages/api/visits.js` + `src/pages/admin/visits.jsx`. → verify: dashboard
   renders the rows after auth.
8. Deploy to Vercel. → verify (production): open from **phone + desktop on
   different networks**; both appear with correct device + real city/country;
   `/admin/visits` requires the password.

---

## Privacy note (read before shipping)

You're storing guests' raw IP addresses — that's personal data. For a private
family invite the risk is low, but: keep the dashboard password strong, don't
share the link publicly, and consider deleting the table after the events. If you
ever want to soften this, switch `ip` storage to "geo-only" (derive city/country,
discard the raw IP) — the code path supports dropping that one field.

---

## Out of scope (chosen against)

- Per-named-guest identity / unique invite links (you picked aggregate). Easy to
  add later: append `?g=<id>` to links, capture the param in the beacon, add a
  `guest` column — no rework of the above.
- Third-party analytics (PostHog/Umami). Existing `@vercel/analytics` stays for
  aggregate pageviews; this custom layer adds the IP/device/geo detail it lacks.
