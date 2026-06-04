import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';

// Analytics dashboard. Lives behind src/middleware.js Basic Auth (so does the
// /api/visits call it makes). Generic over `site` — the wedding page plugs in
// with zero changes once it starts logging.

const SITE_TABS = [
  { id: 'all', label: 'All sites' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'wedding', label: 'Wedding' },
];

const fmtTime = (ts) => {
  try {
    return new Date(ts).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
    });
  } catch { return ts; }
};

const host = (url) => {
  if (!url) return 'direct';
  try { return new URL(url).hostname; } catch { return url; }
};

export default function VisitsDashboard() {
  const [site, setSite] = useState('all');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (s) => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/visits?site=${s}`, { credentials: 'same-origin' });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setData(await r.json());
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(site); }, [site, load]);

  const s = data?.summary;

  return (
    <>
      <Head><title>Visits — Admin</title><meta name="robots" content="noindex" /></Head>
      <div style={st.page}>
        <header style={st.header}>
          <h1 style={st.h1}>Visit Analytics</h1>
          <button onClick={() => load(site)} style={st.refresh} disabled={loading}>
            {loading ? 'Loading…' : 'Refresh'}
          </button>
        </header>

        <nav style={st.tabs}>
          {SITE_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSite(t.id)}
              style={{ ...st.tab, ...(site === t.id ? st.tabActive : {}) }}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {error && <div style={st.error}>Failed to load: {error}</div>}

        {s && (
          <section style={st.cards}>
            <Card label="Total opens" value={s.total} />
            <Card label="Unique IPs" value={s.unique_ips} />
            <Card label="Last 24h" value={s.last_24h} />
            <Card label="Top country" value={s.top_country} />
            <Card label="Top device" value={s.top_device} />
          </section>
        )}

        {data?.breakdowns && (
          <section style={st.breakdowns}>
            <Breakdown title="By country" rows={data.breakdowns.byCountry} total={s?.total} />
            <Breakdown title="By device" rows={data.breakdowns.byDevice} total={s?.total} />
            <Breakdown title="By language" rows={data.breakdowns.byLanguage} total={s?.total} />
            {site === 'all' && (
              <Breakdown title="By site" rows={data.breakdowns.bySite} total={s?.total} />
            )}
          </section>
        )}

        {data?.breakdowns && (
          <section style={st.breakdowns}>
            <Breakdown title="Share links — by side" rows={data.breakdowns.bySide} total={s?.total} />
            <Breakdown title="Share links — by track" rows={data.breakdowns.byMusic} total={s?.total} />
            <Breakdown title="Share links — by language" rows={data.breakdowns.byInviteLang} total={s?.total} />
          </section>
        )}

        {data?.rows && (
          <section>
            <h2 style={st.h2}>Recent opens ({data.rows.length})</h2>
            <div style={st.tableWrap}>
              <table style={st.table}>
                <thead>
                  <tr>
                    {['Time', 'Site', 'Location', 'IP', 'Device', 'Lang', 'Referrer'].map((h) => (
                      <th key={h} style={st.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((r) => (
                    <tr key={r.id} style={st.tr}>
                      <td style={st.td}>{fmtTime(r.ts)}</td>
                      <td style={st.td}>{r.site}</td>
                      <td style={st.td}>{[r.city, r.country].filter(Boolean).join(', ') || '—'}</td>
                      <td style={st.tdMono}>{r.ip || '—'}</td>
                      <td style={st.td}>{[r.browser, r.os, r.device_type].filter(Boolean).join(' · ') || '—'}</td>
                      <td style={st.td}>{r.language || '—'}</td>
                      <td style={st.td}>{host(r.referrer)}</td>
                    </tr>
                  ))}
                  {data.rows.length === 0 && (
                    <tr><td style={st.td} colSpan={7}>No visits yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

function Card({ label, value }) {
  return (
    <div style={st.card}>
      <div style={st.cardValue}>{value}</div>
      <div style={st.cardLabel}>{label}</div>
    </div>
  );
}

function Breakdown({ title, rows = [], total }) {
  return (
    <div style={st.bd}>
      <h3 style={st.bdTitle}>{title}</h3>
      {rows.length === 0 && <div style={st.bdEmpty}>—</div>}
      {rows.map((r) => {
        const pct = total ? Math.round((r.n / total) * 100) : 0;
        return (
          <div key={r.key} style={st.bdRow}>
            <div style={st.bdBar}>
              <div style={{ ...st.bdFill, width: `${pct}%` }} />
              <span style={st.bdKey}>{r.key}</span>
            </div>
            <span style={st.bdN}>{r.n}</span>
          </div>
        );
      })}
    </div>
  );
}

const st = {
  page: { minHeight: '100vh', background: '#0b0b10', color: '#e7e7ea', padding: '24px',
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  h1: { fontSize: 22, fontWeight: 700, margin: 0 },
  refresh: { background: '#1f2030', color: '#e7e7ea', border: '1px solid #33344a',
    borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 14 },
  tabs: { display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' },
  tab: { background: 'transparent', color: '#9a9ab0', border: '1px solid #2a2b3d',
    borderRadius: 999, padding: '6px 16px', cursor: 'pointer', fontSize: 14 },
  tabActive: { background: '#6d5dfc', color: '#fff', borderColor: '#6d5dfc' },
  error: { background: '#3a1620', color: '#ffb4b4', padding: '12px 16px', borderRadius: 8, marginBottom: 16 },
  cards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 },
  card: { background: '#15161f', border: '1px solid #25263a', borderRadius: 12, padding: '16px 18px' },
  cardValue: { fontSize: 26, fontWeight: 700, lineHeight: 1.1 },
  cardLabel: { fontSize: 13, color: '#9a9ab0', marginTop: 4 },
  breakdowns: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 28 },
  bd: { background: '#15161f', border: '1px solid #25263a', borderRadius: 12, padding: 16 },
  bdTitle: { fontSize: 14, fontWeight: 600, margin: '0 0 12px', color: '#c7c7d6' },
  bdEmpty: { color: '#6a6a80', fontSize: 13 },
  bdRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 },
  bdBar: { position: 'relative', flex: 1, height: 24, background: '#1d1e2c', borderRadius: 6, overflow: 'hidden' },
  bdFill: { position: 'absolute', top: 0, left: 0, height: '100%', background: 'rgba(109,93,252,0.35)' },
  bdKey: { position: 'relative', padding: '0 8px', lineHeight: '24px', fontSize: 13 },
  bdN: { fontSize: 13, color: '#9a9ab0', minWidth: 28, textAlign: 'right' },
  h2: { fontSize: 16, fontWeight: 600, margin: '0 0 12px' },
  tableWrap: { overflowX: 'auto', border: '1px solid #25263a', borderRadius: 12 },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { textAlign: 'left', padding: '10px 12px', color: '#9a9ab0', fontWeight: 600,
    borderBottom: '1px solid #25263a', whiteSpace: 'nowrap', position: 'sticky', top: 0, background: '#15161f' },
  tr: { borderBottom: '1px solid #1d1e2c' },
  td: { padding: '9px 12px', whiteSpace: 'nowrap' },
  tdMono: { padding: '9px 12px', whiteSpace: 'nowrap', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: '#c7c7d6' },
};
