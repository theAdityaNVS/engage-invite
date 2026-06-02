// Visit beacon sink. POST only. Reads trustworthy IP/geo/UA server-side from
// request headers, merges the client-supplied beacon body, inserts ONE visits
// row, returns 204. Fails silently — analytics must never break the invite.
import { getSql } from '@/lib/db';
import { deriveSite } from '@/lib/site';
import { parseUA } from '@/lib/ua';

// Full header value (handles the array form Node may give for repeated headers).
function header(v) {
  if (!v) return null;
  return (Array.isArray(v) ? v[0] : v) || null;
}

// First entry of a comma-separated list header (e.g. x-forwarded-for: ip1, ip2).
function firstHeader(v) {
  const s = header(v);
  return s ? s.split(',')[0].trim() || null : null;
}

// Vercel geo headers are URL-encoded (e.g. city "S%C3%A3o%20Paulo").
function decode(v) {
  const s = firstHeader(v);
  if (!s) return null;
  try { return decodeURIComponent(s); } catch { return s; }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  try {
    const sql = getSql();
    if (!sql) return res.status(204).end(); // no DB configured — drop silently

    const body = typeof req.body === 'object' && req.body ? req.body : {};
    const h = req.headers;

    const path = typeof body.path === 'string' ? body.path.slice(0, 512) : null;
    const ua = header(h['user-agent']);
    const { browser, os, device_type } = parseUA(ua || '');

    const row = {
      site:        deriveSite(path),
      path,
      ip:          firstHeader(h['x-forwarded-for']) || firstHeader(h['x-real-ip']),
      country:     decode(h['x-vercel-ip-country']),
      region:      decode(h['x-vercel-ip-country-region']),
      city:        decode(h['x-vercel-ip-city']),
      latitude:    firstHeader(h['x-vercel-ip-latitude']),
      longitude:   firstHeader(h['x-vercel-ip-longitude']),
      ua,
      browser,
      os,
      device_type,
      screen:      typeof body.screen === 'string' ? body.screen.slice(0, 32) : null,
      viewport:    typeof body.viewport === 'string' ? body.viewport.slice(0, 32) : null,
      timezone:    typeof body.timezone === 'string' ? body.timezone.slice(0, 64) : null,
      language:    typeof body.language === 'string' ? body.language.slice(0, 16) : null,
      referrer:    typeof body.referrer === 'string' ? body.referrer.slice(0, 1024) : null,
      session_id:  typeof body.session_id === 'string' ? body.session_id.slice(0, 64) : null,
    };

    await sql`
      INSERT INTO visits
        (site, path, ip, country, region, city, latitude, longitude,
         ua, browser, os, device_type, screen, viewport, timezone,
         language, referrer, session_id)
      VALUES
        (${row.site}, ${row.path}, ${row.ip}, ${row.country}, ${row.region},
         ${row.city}, ${row.latitude}, ${row.longitude}, ${row.ua},
         ${row.browser}, ${row.os}, ${row.device_type}, ${row.screen},
         ${row.viewport}, ${row.timezone}, ${row.language}, ${row.referrer},
         ${row.session_id})
    `;

    return res.status(204).end();
  } catch {
    // Swallow everything — never surface analytics errors to the visitor.
    return res.status(204).end();
  }
}
