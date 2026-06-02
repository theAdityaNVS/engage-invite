// Dashboard data source. GET only. Returns recent rows + aggregates, optionally
// filtered by ?site=engagement|wedding (omit/`all` for everything).
// Protected by src/middleware.js Basic Auth (matcher includes /api/visits).
import { getSql } from '@/lib/db';
import { SITES } from '@/lib/site';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'method not allowed' });
  }

  const sql = getSql();
  if (!sql) return res.status(500).json({ error: 'DATABASE_URL not configured' });

  const siteParam = String(req.query.site || 'all').toLowerCase();
  const site = SITES.includes(siteParam) ? siteParam : null; // null => all sites
  const limit = Math.min(parseInt(req.query.limit, 10) || 500, 2000);

  try {
    // One filtered CTE feeds every aggregate so the site filter is applied once.
    const rows = site
      ? await sql`SELECT * FROM visits WHERE site = ${site} ORDER BY ts DESC LIMIT ${limit}`
      : await sql`SELECT * FROM visits ORDER BY ts DESC LIMIT ${limit}`;

    const totals = site
      ? await sql`
          SELECT
            count(*)::int AS total,
            count(DISTINCT ip)::int AS unique_ips,
            count(*) FILTER (WHERE ts > now() - interval '24 hours')::int AS last_24h
          FROM visits WHERE site = ${site}`
      : await sql`
          SELECT
            count(*)::int AS total,
            count(DISTINCT ip)::int AS unique_ips,
            count(*) FILTER (WHERE ts > now() - interval '24 hours')::int AS last_24h
          FROM visits`;

    const byCountry = site
      ? await sql`SELECT coalesce(country, 'Unknown') AS key, count(*)::int AS n FROM visits WHERE site = ${site} GROUP BY 1 ORDER BY n DESC LIMIT 15`
      : await sql`SELECT coalesce(country, 'Unknown') AS key, count(*)::int AS n FROM visits GROUP BY 1 ORDER BY n DESC LIMIT 15`;

    const byDevice = site
      ? await sql`SELECT coalesce(device_type, 'Unknown') AS key, count(*)::int AS n FROM visits WHERE site = ${site} GROUP BY 1 ORDER BY n DESC`
      : await sql`SELECT coalesce(device_type, 'Unknown') AS key, count(*)::int AS n FROM visits GROUP BY 1 ORDER BY n DESC`;

    const byLanguage = site
      ? await sql`SELECT coalesce(language, 'Unknown') AS key, count(*)::int AS n FROM visits WHERE site = ${site} GROUP BY 1 ORDER BY n DESC LIMIT 15`
      : await sql`SELECT coalesce(language, 'Unknown') AS key, count(*)::int AS n FROM visits GROUP BY 1 ORDER BY n DESC LIMIT 15`;

    const bySite = await sql`SELECT site AS key, count(*)::int AS n FROM visits GROUP BY 1 ORDER BY n DESC`;

    const summary = totals[0] || { total: 0, unique_ips: 0, last_24h: 0 };

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({
      site: site || 'all',
      summary: {
        total: summary.total,
        unique_ips: summary.unique_ips,
        last_24h: summary.last_24h,
        top_country: byCountry[0]?.key || '—',
        top_device: byDevice[0]?.key || '—',
      },
      breakdowns: { byCountry, byDevice, byLanguage, bySite },
      rows,
    });
  } catch (e) {
    return res.status(500).json({ error: 'query failed', detail: String(e?.message || e) });
  }
}
