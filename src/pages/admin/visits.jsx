import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const SITE_TABS = [
  { id: 'all', label: 'All Sites' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'wedding', label: 'Wedding' },
];

const fmtTime = (ts) => {
  try {
    return new Date(ts).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return ts;
  }
};

const host = (url) => {
  if (!url) return 'direct';
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

export default function VisitsDashboard() {
  const [site, setSite] = useState('all');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deviceFilter, setDeviceFilter] = useState('all');

  // Interactive style states
  const [activeTabHover, setActiveTabHover] = useState(null);
  const [refreshHover, setRefreshHover] = useState(false);
  const [signOutHover, setSignOutHover] = useState(false);
  const [exportHover, setExportHover] = useState(false);
  const [linksHover, setLinksHover] = useState(false);
  const [hoveredRowId, setHoveredRowId] = useState(null);

  const router = useRouter();

  const load = useCallback(async (s) => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/visits?site=${s}`, { credentials: 'same-origin' });
      if (r.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setData(await r.json());
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load(site);
  }, [site, load]);

  const handleSignOut = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (e) {
      console.error('Logout failed:', e);
    }
  };

  const exportToCSV = () => {
    if (!data?.rows || data.rows.length === 0) return;
    const headers = ['Time (IST)', 'Site', 'City', 'Country', 'IP', 'Browser', 'OS', 'Device Type', 'Language', 'Referrer'];
    const csvContent = [
      headers.join(','),
      ...data.rows.map((r) => [
        `"${fmtTime(r.ts)}"`,
        `"${r.site || ''}"`,
        `"${r.city || ''}"`,
        `"${r.country || ''}"`,
        `"${r.ip || ''}"`,
        `"${r.browser || ''}"`,
        `"${r.os || ''}"`,
        `"${r.device_type || ''}"`,
        `"${r.language || ''}"`,
        `"${host(r.referrer)}"`,
      ].join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `visitor_logs_${site}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const s = data?.summary;

  // Filter rows based on search parameters
  const filteredRows = (data?.rows || []).filter((r) => {
    const matchesSearch =
      (r.ip || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.city || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.country || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.referrer || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.browser || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.os || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDevice =
      deviceFilter === 'all' ||
      (r.device_type || 'unknown').toLowerCase() === deviceFilter.toLowerCase();

    return matchesSearch && matchesDevice;
  });

  return (
    <>
      <Head>
        <title>Analytics Console — Admin Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div style={st.page} className="admin-page">
        {/* Glow background spots */}}
        <div style={st.glowBurgundy}></div>
        <div style={st.glowGold}></div>

        <div style={st.container}>
          {/* Top Navigation Header */}
          <header style={st.header} className="admin-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={st.pulseDot}></span>
                <h1 style={st.h1}>Visitor Insights</h1>
              </div>
              <p style={st.subtitle}>Real-time analytics & engagement tracking</p>
            </div>

            <div style={st.headerControls} className="admin-header-controls">
              {/* User Badge */}
              <div style={st.userBadge}>
                <svg style={{ width: '14px', height: '14px', color: '#D4A843' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>admin</span>
              </div>

              {/* Invite Links Button */}
              <button
                onClick={() => router.push('/links')}
                onMouseEnter={() => setLinksHover(true)}
                onMouseLeave={() => setLinksHover(false)}
                style={{
                  ...st.actionBtn,
                  ...(linksHover ? st.actionBtnHover : {})
                }}
              >
                <svg style={{ width: '16px', height: '16px', color: '#D4A843' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="admin-btn-label">Invite Links</span>
              </button>

              {/* Refresh Button */}
              <button
                onClick={() => load(site)}
                disabled={loading}
                onMouseEnter={() => setRefreshHover(true)}
                onMouseLeave={() => setRefreshHover(false)}
                style={{
                  ...st.actionBtn,
                  ...(refreshHover ? st.actionBtnHover : {}),
                  ...(loading ? { opacity: 0.6 } : {})
                }}
              >
                <svg style={{ width: '16px', height: '16px', animation: loading ? 'spin 1.5s linear infinite' : 'none' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
                </svg>
                <span className="admin-btn-label">{loading ? 'Refreshing...' : 'Refresh'}</span>
              </button>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                onMouseEnter={() => setSignOutHover(true)}
                onMouseLeave={() => setSignOutHover(false)}
                style={{
                  ...st.signOutBtn,
                  ...(signOutHover ? st.signOutBtnHover : {})
                }}
              >
                <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="admin-btn-label">Sign Out</span>
              </button>
            </div>
          </header>

          {/* Navigation Tabs */}
          <nav style={st.tabsNav} className="admin-tabs-nav">
            {SITE_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setSite(t.id)}
                onMouseEnter={() => setActiveTabHover(t.id)}
                onMouseLeave={() => setActiveTabHover(null)}
                style={{
                  ...st.tab,
                  ...(site === t.id ? st.tabActive : {}),
                  ...(activeTabHover === t.id && site !== t.id ? st.tabHover : {})
                }}
              >
                {t.label}
              </button>
            ))}
          </nav>

          {error && (
            <div style={st.errorBanner}>
              <svg style={{ width: '20px', height: '20px', flexShrink: 0, color: '#f87171' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Error Loading Analytics</p>
                <p style={{ fontSize: '0.75rem', color: '#fca5a5cc', marginTop: '2px' }}>{error}</p>
              </div>
            </div>
          )}

          {/* Summary Metric Cards */}
          {s && (
            <section style={st.metricsGrid} className="admin-metrics-grid">
              <Card
                label="Total Opens"
                value={s.total}
                borderAccent="#C4572A"
                icon={
                  <svg style={{ width: '20px', height: '20px', color: '#C4572A' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                }
              />
              <Card
                label="Unique Visitors"
                value={s.unique_ips}
                borderAccent="#D4A843"
                icon={
                  <svg style={{ width: '20px', height: '20px', color: '#D4A843' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                }
              />
              <Card
                label="Views (Last 24h)"
                value={s.last_24h}
                borderAccent="#8B2240"
                icon={
                  <svg style={{ width: '20px', height: '20px', color: '#8B2240' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <Card
                label="Top Country"
                value={s.top_country}
                borderAccent="#C8A86A"
                icon={
                  <svg style={{ width: '20px', height: '20px', color: '#C8A86A' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2a2.5 2.5 0 002.5-2.5V10a2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <Card
                label="Top Device"
                value={s.top_device}
                borderAccent="#5A7A9A"
                icon={
                  <svg style={{ width: '20px', height: '20px', color: '#8DA5BE' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                }
              />
            </section>
          )}

          {/* Breakdown Segment Grids */}
          {data?.breakdowns && (
            <section style={st.breakdownsGrid} className="admin-breakdowns-grid">
              <Breakdown
                title="Visits by Country"
                rows={data.breakdowns.byCountry}
                total={s?.total}
                fillColor="#C8A86A"
              />
              <Breakdown
                title="Visits by Device"
                rows={data.breakdowns.byDevice}
                total={s?.total}
                fillColor="#8B2240"
              />
              <Breakdown
                title="Visits by Language"
                rows={data.breakdowns.byLanguage}
                total={s?.total}
                fillColor="#D4A843"
              />
              {site === 'all' ? (
                <Breakdown
                  title="Visits by Site"
                  rows={data.breakdowns.bySite}
                  total={s?.total}
                  fillColor="#C4572A"
                />
              ) : (
                <Breakdown
                  title="Visits by Invite Lang"
                  rows={data.breakdowns.byInviteLang}
                  total={s?.total}
                  fillColor="#C4572A"
                />
              )}
            </section>
          )}

          {/* Parameter segment details */}
          {data?.breakdowns && (
            <section style={st.shareParamsGrid} className="admin-share-params-grid">
              <Breakdown
                title="Share Link Param — Side Referral"
                rows={data.breakdowns.bySide}
                total={s?.total}
                fillColor="linear-gradient(to right, #8B2240, #C4572A)"
              />
              <Breakdown
                title="Share Link Param — Music Chosen"
                rows={data.breakdowns.byMusic}
                total={s?.total}
                fillColor="linear-gradient(to right, #C4572A, #D4A843)"
              />
            </section>
          )}

          {/* Recent sessions log */}
          {data?.rows && (
            <section style={st.logPanel}>
              {/* Panel Header & Controls */}
              <div style={st.panelHeader} className="admin-panel-header">
                <div>
                  <h2 style={st.panelTitle}>Recent Sessions</h2>
                  <p style={st.panelCount}>
                    Showing {filteredRows.length} of {data.rows.length} logs
                  </p>
                </div>

                <div style={st.panelControls} className="admin-panel-controls">
                  {/* Search bar input */}
                  <div style={st.searchWrapper}>
                    <span style={st.searchIcon}>
                      <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search sessions..."
                      style={st.searchInput}
                      className="admin-search-input"
                    />
                  </div>

                  {/* Dropdown Filter */}
                  <select
                    value={deviceFilter}
                    onChange={(e) => setDeviceFilter(e.target.value)}
                    style={st.selectFilter}
                    className="admin-select-filter"
                  >
                    <option value="all">All Devices</option>
                    <option value="mobile">Mobile</option>
                    <option value="tablet">Tablet</option>
                    <option value="desktop">Desktop</option>
                    <option value="unknown">Unknown</option>
                  </select>

                  {/* Export Button */}
                  <button
                    onClick={exportToCSV}
                    onMouseEnter={() => setExportHover(true)}
                    onMouseLeave={() => setExportHover(false)}
                    style={{
                      ...st.exportBtn,
                      ...(exportHover ? st.exportBtnHover : {})
                    }}
                  >
                    <svg style={{ width: '14px', height: '14px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Table rendering */}
              <div style={st.tableScroll}>
                <table style={st.table}>
                  <thead>
                    <tr style={st.tableHeadRow}>
                      {['Time (IST)', 'Site', 'Location', 'IP Address', 'Client details', 'Language', 'Referrer'].map((h) => (
                        <th key={h} style={st.th}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((r) => (
                      <tr
                        key={r.id}
                        onMouseEnter={() => setHoveredRowId(r.id)}
                        onMouseLeave={() => setHoveredRowId(null)}
                        style={{
                          ...st.tr,
                          ...(hoveredRowId === r.id ? st.trHovered : {})
                        }}
                      >
                        {/* Time */}
                        <td style={st.tdTime}>{fmtTime(r.ts)}</td>
                        {/* Site Badge */}
                        <td style={st.td}>
                          <span
                            style={{
                              ...st.siteBadge,
                              ...(r.site === 'engagement' ? st.badgeEngagement : st.badgeWedding)
                            }}
                          >
                            {r.site}
                          </span>
                        </td>
                        {/* Location */}
                        <td style={st.tdLocation}>
                          {[r.city, r.country].filter(Boolean).join(', ') || '—'}
                        </td>
                        {/* IP */}
                        <td style={st.tdIp}>{r.ip || '—'}</td>
                        {/* Client details */}
                        <td style={st.tdDetails}>
                          <span style={{ color: '#ffffff', fontWeight: '500' }}>{r.browser || 'Browser'}</span>
                          <span style={st.tdDot}>·</span>
                          <span>{r.os || 'OS'}</span>
                          {r.device_type && (
                            <>
                              <span style={st.tdDot}>·</span>
                              <span style={st.deviceLabel}>{r.device_type}</span>
                            </>
                          )}
                        </td>
                        {/* Language */}
                        <td style={st.td}>{r.language || '—'}</td>
                        {/* Referrer */}
                        <td style={st.tdReferrer} title={r.referrer}>
                          {host(r.referrer)}
                        </td>
                      </tr>
                    ))}
                    {filteredRows.length === 0 && (
                      <tr>
                        <td colSpan={7} style={st.emptyTd}>
                          No records match the current filter criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Embedded CSS animations + mobile responsive */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* ── Select / Dropdown Styling ── */
        select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'></path></svg>");
          background-repeat: no-repeat;
          background-position: right 10px center;
          background-size: 14px;
          padding-right: 32px !important;
        }
        select option {
          background-color: #0f0f1c;
          color: #e2e8f0;
          font-size: 0.8rem;
        }
        select option:hover,
        select option:focus,
        select option:checked {
          background-color: #1e1e35;
          color: #ffffff;
        }

        /* ── Mobile Responsive ── */
        @media (max-width: 640px) {
          /* Tighter page padding */
          .admin-page { padding: 16px 12px !important; }

          /* Header: stack title above controls */
          .admin-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 14px !important;
          }

          /* Controls: wrap and shrink */
          .admin-header-controls {
            width: 100% !important;
            flex-wrap: wrap !important;
            gap: 8px !important;
          }

          /* Hide text labels in action buttons on very small screens */
          .admin-btn-label { display: none !important; }

          /* Metrics grid: 2 columns on mobile */
          .admin-metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }

          /* Breakdowns: single column */
          .admin-breakdowns-grid,
          .admin-share-params-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }

          /* Panel header: stack controls below title */
          .admin-panel-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          /* Panel controls: fill width, wrap */
          .admin-panel-controls {
            width: 100% !important;
            flex-wrap: wrap !important;
          }

          /* Search input: fill remaining width */
          .admin-search-input {
            width: 100% !important;
            min-width: 0 !important;
          }

          /* Select filter: fill width */
          .admin-select-filter {
            flex: 1 !important;
            min-width: 0 !important;
          }

          /* Tab nav: allow wrapping */
          .admin-tabs-nav {
            width: 100% !important;
            flex-wrap: wrap !important;
          }
        }

        @media (max-width: 400px) {
          /* Single column metrics on very narrow screens */
          .admin-metrics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

function Card({ label, value, borderAccent = '', icon }) {
  return (
    <div style={{ ...st.card, borderLeft: `4px solid ${borderAccent}` }}>
      <div style={st.cardHeader}>
        <span style={st.cardLabel}>{label}</span>
        <div style={st.cardIconBox}>{icon}</div>
      </div>
      <div style={st.cardValue}>{value}</div>
    </div>
  );
}

function Breakdown({ title, rows = [], total, fillColor = '#8B2240' }) {
  return (
    <div style={st.bdBox}>
      <h3 style={st.bdHeader}>{title}</h3>
      {rows.length === 0 && <div style={st.bdEmpty}>No data recorded.</div>}
      <div style={st.bdRowsList}>
        {rows.map((r) => {
          const pct = total ? Math.round((r.n / total) * 100) : 0;
          return (
            <div key={r.key} style={st.bdRow}>
              <div style={st.bdRowMeta}>
                <span style={st.bdRowKey} title={r.key}>{r.key}</span>
                <span style={st.bdRowVal}>
                  {r.n} <span style={st.bdRowPct}>({pct}%)</span>
                </span>
              </div>
              {/* Progress bar line */}
              <div style={st.progressOuter}>
                <div
                  style={{
                    ...st.progressInner,
                    background: fillColor,
                    width: `${pct}%`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const st = {
  page: {
    position: 'relative',
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #05050a 0%, #0a0b16 50%, #05050a 100%)',
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#e2e8f0',
    overflowX: 'hidden',
    padding: '20px 16px',
  },
  glowBurgundy: {
    position: 'absolute',
    top: 0,
    right: '15%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    backgroundColor: '#8B2240',
    opacity: 0.07,
    filter: 'blur(130px)',
    pointerEvents: 'none',
  },
  glowGold: {
    position: 'absolute',
    bottom: 0,
    left: '15%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    backgroundColor: '#D4A843',
    opacity: 0.05,
    filter: 'blur(140px)',
    pointerEvents: 'none',
  },
  container: {
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
    zIndex: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    paddingBottom: '24px',
    marginBottom: '32px',
  },
  pulseDot: {
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    backgroundColor: '#D4A843',
    boxShadow: '0 0 10px #D4A843, 0 0 20px rgba(212,168,67,0.5)',
    display: 'inline-block',
  },
  h1: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginTop: '6px',
    fontWeight: '500',
  },
  headerControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  userBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '7px 12px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    fontSize: '0.75rem',
    color: '#94a3b8',
    fontWeight: '600',
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    color: '#cbd5e1',
    padding: '8px 16px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  actionBtnHover: {
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderColor: 'rgba(255,255,255,0.15)',
  },
  signOutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(139,34,64,0.08)',
    border: '1px solid rgba(139,34,64,0.3)',
    borderRadius: '10px',
    color: '#fca5a5',
    padding: '8px 16px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  signOutBtnHover: {
    backgroundColor: 'rgba(139,34,64,0.22)',
    borderColor: 'rgba(139,34,64,0.45)',
  },
  tabsNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(255,255,255,0.01)',
    border: '1px solid rgba(255,255,255,0.05)',
    padding: '6px',
    borderRadius: '14px',
    width: 'fit-content',
    marginBottom: '32px',
  },
  tab: {
    padding: '8px 20px',
    borderRadius: '10px',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#64748b',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  tabActive: {
    background: 'linear-gradient(to right, #8B2240, #C4572A)',
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(139,34,64,0.18)',
  },
  tabHover: {
    color: '#cbd5e1',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  errorBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'rgba(139,34,64,0.1)',
    border: '1px solid rgba(139,34,64,0.4)',
    borderRadius: '16px',
    padding: '16px',
    color: '#fca5a5',
    marginBottom: '32px',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.07)',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '14px',
  },
  cardLabel: {
    fontSize: '0.72rem',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: '#64748b',
    fontWeight: '600',
  },
  cardIconBox: {
    padding: '6px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  cardValue: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '-0.02em',
  },
  breakdownsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  bdBox: {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.07)',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  bdHeader: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: '#94a3b8',
    fontWeight: '700',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingBottom: '12px',
    marginBottom: '16px',
  },
  bdEmpty: {
    fontSize: '0.75rem',
    color: '#64748b',
    fontStyle: 'italic',
    padding: '8px 0',
  },
  bdRowsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  bdRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  bdRowMeta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  bdRowKey: {
    color: '#e2e8f0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '160px',
  },
  bdRowVal: {
    color: '#94a3b8',
  },
  bdRowPct: {
    fontSize: '10px',
    color: '#475569',
    fontWeight: '500',
  },
  progressOuter: {
    width: '100%',
    height: '6px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '999px',
    overflow: 'hidden',
  },
  progressInner: {
    height: '100%',
    borderRadius: '999px',
    transition: 'width 0.5s ease',
  },
  shareParamsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  logPanel: {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.07)',
    borderRadius: '16px',
    boxShadow: '0 15px 40px rgba(0,0,0,0.25)',
    overflow: 'hidden',
    marginBottom: '24px',
  },
  panelHeader: {
    padding: '20px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(255,255,255,0.01)',
    display: 'flex',
    alignDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
  },
  panelTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: 0,
  },
  panelCount: {
    fontSize: '0.75rem',
    color: '#64748b',
    marginTop: '4px',
  },
  panelControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    color: '#475569',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  searchInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    border: '1px solid #1e293b',
    borderRadius: '10px',
    fontSize: '0.75rem',
    color: '#e2e8f0',
    padding: '8px 12px 8px 34px',
    width: '180px',
    outline: 'none',
    transition: 'all 0.25s ease',
  },
  selectFilter: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid #1e293b',
    borderRadius: '10px',
    fontSize: '0.75rem',
    color: '#cbd5e1',
    padding: '8px 32px 8px 12px',
    outline: 'none',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease',
  },
  exportBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(212,168,67,0.08)',
    border: '1px solid rgba(212,168,67,0.35)',
    borderRadius: '10px',
    color: '#F0D68A',
    padding: '8px 14px',
    fontSize: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  exportBtnHover: {
    backgroundColor: 'rgba(212,168,67,0.18)',
    borderColor: 'rgba(212,168,67,0.55)',
  },
  tableScroll: {
    overflowX: 'auto',
    width: '100%',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.8125rem',
  },
  tableHeadRow: {
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  th: {
    textAlign: 'left',
    padding: '16px 20px',
    color: '#94a3b8',
    fontWeight: '600',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    textTransform: 'uppercase',
    fontSize: '0.7rem',
    letterSpacing: '0.08em',
    whiteSpace: 'nowrap',
  },
  tr: {
    borderBottom: '1px solid rgba(255,255,255,0.03)',
    transition: 'background-color 0.15s ease',
  },
  trHovered: {
    backgroundColor: 'rgba(255,255,255,0.01)',
  },
  td: {
    padding: '14px 20px',
    whiteSpace: 'nowrap',
  },
  tdTime: {
    padding: '14px 20px',
    color: '#ffffff',
    fontWeight: '500',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
  },
  tdLocation: {
    padding: '14px 20px',
    color: '#cbd5e1',
    fontWeight: '500',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
  },
  tdIp: {
    padding: '14px 20px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: '0.75rem',
    color: '#a5b4fc',
    whiteSpace: 'nowrap',
  },
  tdDetails: {
    padding: '14px 20px',
    color: '#94a3b8',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
  },
  tdDot: {
    margin: '0 6px',
    color: 'rgba(255,255,255,0.1)',
  },
  deviceLabel: {
    fontSize: '9px',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    padding: '2px 6px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: '4px',
    color: 'rgba(255,255,255,0.55)',
  },
  tdReferrer: {
    padding: '14px 20px',
    color: '#94a3b8',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '120px',
  },
  siteBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '6px',
    fontSize: '9px',
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: '0.06em',
  },
  badgeEngagement: {
    backgroundColor: 'rgba(196,87,42,0.1)',
    color: '#F0D68A',
    border: '1px solid rgba(196,87,42,0.3)',
  },
  badgeWedding: {
    backgroundColor: 'rgba(139,34,64,0.1)',
    color: '#fca5a5',
    border: '1px solid rgba(139,34,64,0.3)',
  },
  emptyTd: {
    padding: '32px 20px',
    textAlign: 'center',
    color: '#64748b',
    fontStyle: 'italic',
  },
};
