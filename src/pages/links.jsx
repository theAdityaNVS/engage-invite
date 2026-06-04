import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { TRANSLATIONS, MEDIA } from '@/config';

const SIDES = [
  { id: 'groom', label: 'Groom\'s Side', paramValue: 'groom', desc: 'Groom\'s Side invitation links (includes default links)' },
  { id: 'bride', label: 'Bride\'s Side', paramValue: 'bride', desc: 'Bride\'s Side invitation links' },
];

const LANGS = [
  { id: 'none', label: 'Default (Auto / English)', code: null, native: 'System Default' },
  { id: 'en', label: 'English', code: 'en', native: 'English' },
  { id: 'hi', label: 'Hindi', code: 'hi', native: 'हिंदी' },
  { id: 'te', label: 'Telugu', code: 'te', native: 'తెలుగు' },
  { id: 'or', label: 'Odia', code: 'or', native: 'ଓଡ଼ିଆ' },
];

export default function InviteLinkGenerator() {
  const router = useRouter();

  // Basic States
  const [activeSide, setActiveSide] = useState('groom');
  const [domainType, setDomainType] = useState('prod');
  const [customDomain, setCustomDomain] = useState('http://localhost:3000');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive UI States
  const [copiedId, setCopiedId] = useState(null);
  const [qrModalData, setQrModalData] = useState(null); // { url, label }
  const [qrDownloading, setQrDownloading] = useState(false);
  const [stats, setStats] = useState({ total: 0, matches: 0 });

  // Hover States
  const [activeTabHover, setActiveTabHover] = useState(null);
  const [analyticsHover, setAnalyticsHover] = useState(false);
  const [domainHover, setDomainHover] = useState(null);

  // Get current active base URL
  const getBaseUrl = useCallback(() => {
    if (domainType === 'prod') {
      return 'https://adityanvs.in/engagement';
    } else if (domainType === 'local') {
      return 'http://localhost:3000/engagement';
    } else {
      const cleaned = customDomain.trim().replace(/\/$/, '');
      if (cleaned.endsWith('/engagement')) {
        return cleaned;
      }
      return `${cleaned}/engagement`;
    }
  }, [domainType, customDomain]);

  // Generate URL for specific configuration
  const generateUrl = useCallback((sideVal, langCode, musicId) => {
    const base = getBaseUrl();
    const params = [];
    if (sideVal) params.push(`side=${sideVal}`);
    if (langCode) params.push(`lang=${langCode}`);
    if (musicId) params.push(`music=${musicId}`);
    
    if (params.length === 0) return base;
    return `${base}?${params.join('&')}`;
  }, [getBaseUrl]);

  // Copy to clipboard
  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Download QR Code Blob
  const downloadQR = async (url, label) => {
    setQrDownloading(true);
    const size = 500;
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error('Network error');
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `QR_${label.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Failed to download QR code directly, opening in new tab instead.', err);
      window.open(apiUrl, '_blank');
    } finally {
      setQrDownloading(false);
    }
  };

  // Generate all links grouped by Language and Music Block
  const generateAllLinks = useCallback(() => {
    const cards = [];

    LANGS.forEach(lang => {
      const musicBlocks = [];

      // Helper to create a block with variations
      const createBlock = (title, badge, trackId, isDefaultMusic = false) => {
        const variations = [];

        if (activeSide === 'groom') {
          if (isDefaultMusic) {
            // Variation 1: Cleanest (No side, no music)
            variations.push({
              id: `groom_${lang.id}_default_clean`,
              label: 'Cleanest URL (No params)',
              url: generateUrl(null, lang.code, null),
            });
            // Variation 2: Explicit Side only
            variations.push({
              id: `groom_${lang.id}_default_side`,
              label: 'Explicit Side (side=groom)',
              url: generateUrl('groom', lang.code, null),
            });
            // Variation 3: Explicit Music only
            variations.push({
              id: `groom_${lang.id}_default_music`,
              label: 'Explicit Music (music=1)',
              url: generateUrl(null, lang.code, '1'),
            });
            // Variation 4: Fully Explicit
            variations.push({
              id: `groom_${lang.id}_default_explicit`,
              label: 'Explicit Side & Music (side=groom & music=1)',
              url: generateUrl('groom', lang.code, '1'),
            });
          } else {
            // Non-default track variations (Groom Side)
            // Variation 1: Cleanest (No side, music=X)
            variations.push({
              id: `groom_${lang.id}_tr${trackId}_clean`,
              label: 'Cleanest URL (No side param)',
              url: generateUrl(null, lang.code, trackId),
            });
            // Variation 2: Explicit Side
            variations.push({
              id: `groom_${lang.id}_tr${trackId}_explicit`,
              label: `Explicit Side (side=groom & music=${trackId})`,
              url: generateUrl('groom', lang.code, trackId),
            });
          }
        } else {
          // Bride side
          if (isDefaultMusic) {
            // Variation 1: Cleanest (side=bride, no music)
            variations.push({
              id: `bride_${lang.id}_default_clean`,
              label: 'Cleanest URL (No music param)',
              url: generateUrl('bride', lang.code, null),
            });
            // Variation 2: Fully Explicit (side=bride & music=1)
            variations.push({
              id: `bride_${lang.id}_default_explicit`,
              label: 'Explicit Music (side=bride & music=1)',
              url: generateUrl('bride', lang.code, '1'),
            });
          } else {
            // Variations for non-default tracks on Bride Side
            variations.push({
              id: `bride_${lang.id}_tr${trackId}_clean`,
              label: 'Cleanest URL',
              url: generateUrl('bride', lang.code, trackId),
            });
          }
        }

        // Apply search filtering on variation label, block title, or url
        const queryLower = searchQuery.toLowerCase().trim();
        const filteredVariations = variations.filter(v => {
          if (!queryLower) return true;
          const searchString = `${lang.label} ${title} ${v.label} ${v.url}`.toLowerCase();
          return searchString.includes(queryLower);
        });

        return {
          id: `${activeSide}_${lang.id}_block_${trackId}`,
          title,
          badge,
          variations,
          filteredVariations,
          hasMatches: filteredVariations.length > 0
        };
      };

      const blocks = [
        createBlock('Amaran (Track 1) / Default Music', activeSide === 'groom' ? 'Default / music=1' : 'side=bride', '1', true),
        createBlock('Apna Bana Le (Track 2)', activeSide === 'groom' ? 'music=2' : 'side=bride & music=2', '2'),
        createBlock('Vachindamma (Track 3)', activeSide === 'groom' ? 'music=3' : 'side=bride & music=3', '3'),
      ];

      const visibleBlocks = blocks.filter(b => b.hasMatches);

      cards.push({
        lang,
        blocks,
        visibleBlocks,
        hasMatches: visibleBlocks.length > 0
      });
    });

    return cards;
  }, [activeSide, generateUrl, searchQuery]);

  const cardsList = generateAllLinks();
  const visibleCards = cardsList.filter(c => c.hasMatches);

  // Calculate counts dynamically
  useEffect(() => {
    let total = 0;
    let matches = 0;
    cardsList.forEach(c => {
      c.blocks.forEach(b => {
        total += b.variations.length;
        matches += b.filteredVariations.length;
      });
    });
    setStats({ total, matches });
  }, [activeSide, searchQuery, cardsList]);

  return (
    <>
      <Head>
        <title>Invite Link Generator — Admin Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div style={st.page}>
        {/* Decorative background glows */}
        <div style={st.glowBurgundy}></div>
        <div style={st.glowGold}></div>

        <div style={st.container}>
          {/* Header Bar */}
          <header style={st.header}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={st.pulseDot}></span>
                <h1 style={st.h1}>Invite Link Generator</h1>
              </div>
              <p style={st.subtitle}>Generate and copy guest invitation links with custom parameters</p>
            </div>

            <div style={st.headerControls}>
              {/* Analytics Dashboard Link */}
              <button
                onClick={() => router.push('/admin/visits')}
                onMouseEnter={() => setAnalyticsHover(true)}
                onMouseLeave={() => setAnalyticsHover(false)}
                style={{
                  ...st.actionBtn,
                  ...(analyticsHover ? st.actionBtnHover : {})
                }}
              >
                <svg style={{ width: '16px', height: '16px', color: '#8DA5BE' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Analytics Console</span>
              </button>
            </div>
          </header>

          {/* Configuration Form & Settings Panel */}
          <section style={st.configPanel}>
            <h2 style={st.panelTitle}>Target Environment Settings</h2>
            
            <div style={st.configGrid}>
              {/* Base Domain Toggle Group */}
              <div style={st.configBlock}>
                <label style={st.fieldLabel}>Base Domain / Environment</label>
                <div style={st.domainBtnGroup}>
                  {[
                    { type: 'prod', label: 'Production URL', desc: 'https://adityanvs.in' },
                    { type: 'local', label: 'Local Testing', desc: 'http://localhost:3000' },
                    { type: 'custom', label: 'Custom URL', desc: 'Specify manually' }
                  ].map(item => (
                    <button
                      key={item.type}
                      onClick={() => setDomainType(item.type)}
                      onMouseEnter={() => setDomainHover(item.type)}
                      onMouseLeave={() => setDomainHover(null)}
                      style={{
                        ...st.domainBtn,
                        ...(domainType === item.type ? st.domainBtnActive : {}),
                        ...(domainHover === item.type && domainType !== item.type ? st.domainBtnHover : {})
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>{item.label}</div>
                      <div style={st.domainBtnDesc}>{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Domain input (conditional) */}
              {domainType === 'custom' && (
                <div style={{ ...st.configBlock, alignSelf: 'flex-end' }}>
                  <label style={st.fieldLabel}>Enter Custom Base URL</label>
                  <input
                    type="text"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder="https://preview-site.vercel.app"
                    style={st.customInput}
                  />
                  <p style={st.inputHint}>Will append <code>/engagement</code> path suffix automatically.</p>
                </div>
              )}
            </div>
          </section>

          {/* Grouped Tabs by Side/Team */}
          <div style={st.tabBarContainer}>
            <div style={st.tabBarSubContainer}>
              <nav style={st.tabsNav}>
                {SIDES.map((side) => (
                  <button
                    key={side.id}
                    onClick={() => setActiveSide(side.id)}
                    onMouseEnter={() => setActiveTabHover(side.id)}
                    onMouseLeave={() => setActiveTabHover(null)}
                    style={{
                      ...st.tab,
                      ...(activeSide === side.id ? st.tabActive : {}),
                      ...(activeTabHover === side.id && activeSide !== side.id ? st.tabHover : {})
                    }}
                  >
                    {side.label}
                  </button>
                ))}
              </nav>
              
              <div style={st.tabMetaInfo}>
                {SIDES.find(s => s.id === activeSide)?.desc}
              </div>
            </div>

            {/* Link Search query */}
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
                placeholder="Search links (e.g. Odia, Amaran)..."
                style={st.searchInput}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={st.clearSearchBtn}>
                  &times;
                </button>
              )}
            </div>
          </div>

          {/* Visible items stats info */}
          <div style={st.statsBar}>
            <span>Showing <strong>{stats.matches}</strong> of <strong>{stats.total}</strong> generated link combinations for {SIDES.find(s => s.id === activeSide)?.label}</span>
          </div>

          {/* Grouped Link lists grouped by Language */}
          <div style={st.languagesGrid}>
            {visibleCards.map(card => {
              return (
                <article key={card.lang.id} style={st.langSection}>
                  <header style={st.langSectionHeader}>
                    <h3 style={st.langTitle}>{card.lang.label}</h3>
                    <span style={st.langBadge}>{card.lang.native}</span>
                  </header>

                  {/* Blocks representing Music Tracks */}
                  <div style={st.blocksContainer}>
                    {card.visibleBlocks.map(block => {
                      return (
                        <div key={block.id} style={st.blockCard}>
                          {/* Card Header */}
                          <div style={st.blockCardHeader}>
                            <h4 style={st.blockTitle}>{block.title}</h4>
                            <span style={st.blockBadge}>{block.badge}</span>
                          </div>

                          {/* Variations List */}
                          <div style={st.variationsList}>
                            {block.filteredVariations.map(v => {
                              const isCopied = copiedId === v.id;
                              
                              return (
                                <div key={v.id} style={st.variationRow}>
                                  {/* Left side label */}
                                  <div style={st.variationLabelBox}>
                                    <span style={st.variationLabel}>{v.label}</span>
                                  </div>

                                  {/* Monospace URL Display */}
                                  <div style={st.urlDisplay}>
                                    {v.url}
                                  </div>

                                  {/* Actions */}
                                  <div style={st.actionButtonGroup}>
                                    {/* Copy Button */}
                                    <button
                                      onClick={() => handleCopy(v.url, v.id)}
                                      style={{
                                        ...st.variationBtn,
                                        ...(isCopied ? st.copyBtnActive : st.copyBtnNormal)
                                      }}
                                    >
                                      {isCopied ? (
                                        <>
                                          <svg style={{ width: '13px', height: '13px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                          </svg>
                                          <span>Copied</span>
                                        </>
                                      ) : (
                                        <>
                                          <svg style={{ width: '13px', height: '13px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                          </svg>
                                          <span>Copy</span>
                                        </>
                                      )}
                                    </button>

                                    {/* Preview Button */}
                                    <a
                                      href={v.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      style={{ ...st.variationBtn, ...st.openBtn }}
                                    >
                                      <svg style={{ width: '13px', height: '13px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                      <span>Preview</span>
                                    </a>

                                    {/* QR Code Button */}
                                    <button
                                      onClick={() => setQrModalData({ url: v.url, label: `${card.lang.label} — ${block.title} (${v.label})` })}
                                      style={{ ...st.variationBtn, ...st.qrBtn }}
                                    >
                                      <svg style={{ width: '13px', height: '13px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <span>QR Code</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}

            {visibleCards.length === 0 && (
              <div style={st.emptyState}>
                <svg style={{ width: '48px', height: '48px', color: '#64748b', marginBottom: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '6px' }}>No Matching Links Found</h3>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Try clearing the search query or changing active parameters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QR Code Modal Backdrop */}
      {qrModalData && (
        <div style={st.modalBackdrop} onClick={() => setQrModalData(null)}>
          <div style={st.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={st.modalHeader}>
              <div>
                <h3 style={st.modalTitle}>QR Code Generator</h3>
                <p style={st.modalSubtitle}>{qrModalData.label}</p>
              </div>
              <button onClick={() => setQrModalData(null)} style={st.closeModalBtn}>
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div style={st.modalBody}>
              <div style={st.qrBox}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrModalData.url)}`}
                  alt="Invitation QR Code"
                  style={st.qrImage}
                />
              </div>
              
              <div style={st.modalUrlText}>
                {qrModalData.url}
              </div>
            </div>

            {/* Modal Footer */}
            <div style={st.modalFooter}>
              <button
                disabled={qrDownloading}
                onClick={() => downloadQR(qrModalData.url, qrModalData.label)}
                style={{
                  ...st.modalDownloadBtn,
                  ...(qrDownloading ? { opacity: 0.7, cursor: 'not-allowed' } : {})
                }}
              >
                {qrDownloading ? (
                  <>
                    <span style={st.spinner}></span>
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download PNG</span>
                  </>
                )}
              </button>

              <button onClick={() => setQrModalData(null)} style={st.modalCloseBtn}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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
    padding: '32px 24px',
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
  configPanel: {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.07)',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    marginBottom: '32px',
  },
  panelTitle: {
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: '#94a3b8',
    fontWeight: '700',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingBottom: '12px',
    marginBottom: '18px',
  },
  configGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    alignItems: 'start',
  },
  configBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  fieldLabel: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#cbd5e1',
    letterSpacing: '0.02em',
  },
  domainBtnGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
    backgroundColor: 'rgba(255,255,255,0.01)',
    border: '1px solid rgba(255,255,255,0.05)',
    padding: '4px',
    borderRadius: '12px',
  },
  domainBtn: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: '#94a3b8',
    textAlign: 'center',
    transition: 'all 0.2s ease',
  },
  domainBtnActive: {
    backgroundColor: 'rgba(212,168,67,0.12)',
    border: '1px solid rgba(212,168,67,0.4)',
    color: '#D4A843',
  },
  domainBtnHover: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    color: '#cbd5e1',
  },
  domainBtnDesc: {
    fontSize: '0.65rem',
    opacity: 0.8,
    marginTop: '2px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  customInput: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    padding: '10px 14px',
    color: '#ffffff',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border 0.25s ease',
  },
  inputHint: {
    fontSize: '0.7rem',
    color: '#64748b',
    marginTop: '2px',
  },
  tabBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '20px',
  },
  tabBarSubContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  tabsNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(255,255,255,0.01)',
    border: '1px solid rgba(255,255,255,0.05)',
    padding: '4px',
    borderRadius: '12px',
    width: 'fit-content',
  },
  tab: {
    padding: '8px 18px',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: '600',
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
  tabMetaInfo: {
    fontSize: '0.8rem',
    color: '#64748b',
    fontStyle: 'italic',
  },
  searchWrapper: {
    position: 'relative',
    width: '260px',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '9px 12px 9px 36px',
    fontSize: '0.85rem',
    color: '#ffffff',
    outline: 'none',
    transition: 'all 0.25s ease',
  },
  clearSearchBtn: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#64748b',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  statsBar: {
    fontSize: '0.78rem',
    color: '#94a3b8',
    marginBottom: '24px',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
    paddingBottom: '10px',
  },
  languagesGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
  },
  langSection: {
    background: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.04)',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  langSectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    paddingBottom: '14px',
    marginBottom: '20px',
  },
  langTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '-0.01em',
  },
  langBadge: {
    fontSize: '0.7rem',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '20px',
    backgroundColor: 'rgba(212,168,67,0.08)',
    border: '1px solid rgba(212,168,67,0.25)',
    color: '#D4A843',
  },
  blocksContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  blockCard: {
    background: 'rgba(255, 255, 255, 0.015)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '14px',
    padding: '20px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  blockCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    paddingBottom: '10px',
    marginBottom: '16px',
  },
  blockTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#ffffff',
  },
  blockBadge: {
    fontSize: '0.65rem',
    color: '#D4A843',
    fontFamily: 'monospace',
    backgroundColor: 'rgba(212,168,67,0.06)',
    border: '1px solid rgba(212,168,67,0.15)',
    padding: '2px 8px',
    borderRadius: '6px',
  },
  variationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  variationRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    padding: '10px 14px',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.03)',
    borderRadius: '10px',
    flexWrap: 'wrap',
  },
  variationLabelBox: {
    minWidth: '150px',
    flex: '1 0 auto',
  },
  variationLabel: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#94a3b8',
  },
  urlDisplay: {
    fontSize: '0.72rem',
    fontFamily: 'monospace',
    color: '#cbd5e1',
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: '6px 12px',
    borderRadius: '6px',
    wordBreak: 'break-all',
    flex: '99 1 300px',
    textAlign: 'left',
  },
  actionButtonGroup: {
    display: 'flex',
    gap: '6px',
    flex: '1 0 auto',
    justifyContent: 'flex-end',
  },
  variationBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '7px 12px',
    borderRadius: '6px',
    fontSize: '0.7rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
  },
  copyBtnNormal: {
    backgroundColor: 'rgba(212,168,67,0.08)',
    border: '1px solid rgba(212,168,67,0.2)',
    color: '#D4A843',
    ':hover': {
      backgroundColor: 'rgba(212,168,67,0.15)'
    }
  },
  copyBtnActive: {
    backgroundColor: 'rgba(34,197,94,0.12)',
    border: '1px solid rgba(34,197,94,0.3)',
    color: '#4ade80',
  },
  openBtn: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    color: '#cbd5e1',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.08)'
    }
  },
  qrBtn: {
    backgroundColor: 'rgba(139,34,64,0.08)',
    border: '1px solid rgba(139,34,64,0.2)',
    color: '#fca5a5',
    ':hover': {
      backgroundColor: 'rgba(139,34,64,0.15)'
    }
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    textAlign: 'center',
  },
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(8px)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  modalContent: {
    background: 'rgba(15, 16, 28, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: '20px 24px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#ffffff',
  },
  modalSubtitle: {
    fontSize: '0.72rem',
    color: '#64748b',
    marginTop: '4px',
    fontWeight: '500',
  },
  closeModalBtn: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    fontSize: '1.5rem',
    cursor: 'pointer',
    lineHeight: 1,
    padding: '4px',
    transition: 'color 0.2s ease',
    ':hover': {
      color: '#ffffff'
    }
  },
  modalBody: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  qrBox: {
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrImage: {
    width: '240px',
    height: '240px',
    display: 'block',
  },
  modalUrlText: {
    fontSize: '0.72rem',
    fontFamily: 'monospace',
    color: '#64748b',
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: '8px 12px',
    borderRadius: '8px',
    width: '100%',
    textAlign: 'center',
    wordBreak: 'break-all',
    border: '1px solid rgba(255,255,255,0.03)',
  },
  modalFooter: {
    padding: '16px 24px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    backgroundColor: 'rgba(255,255,255,0.01)',
  },
  modalDownloadBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#C4572A',
    border: 'none',
    color: '#ffffff',
    padding: '10px 18px',
    borderRadius: '10px',
    fontSize: '0.78rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  modalCloseBtn: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: '#cbd5e1',
    padding: '10px 16px',
    borderRadius: '10px',
    fontSize: '0.78rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  spinner: {
    width: '12px',
    height: '12px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#ffffff',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    display: 'inline-block',
  }
};
