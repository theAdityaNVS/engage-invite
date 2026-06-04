import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { TRANSLATIONS, MEDIA } from '@/config';

const SIDES = [
  { id: 'groom', label: 'Groom\'s Side', paramValue: 'groom' },
  { id: 'bride', label: 'Bride\'s Side', paramValue: 'bride' },
];

const LANGS = [
  { id: 'en', label: 'English', code: 'en', native: 'English' },
  { id: 'hi', label: 'Hindi', code: 'hi', native: 'हिंदी' },
  { id: 'te', label: 'Telugu', code: 'te', native: 'తెలుగు' },
  { id: 'or', label: 'Odia', code: 'or', native: 'ଓଡ଼ିଆ' },
];

export default function InviteLinkGenerator() {
  const router = useRouter();

  // Interactive Builder State
  const [builderSide, setBuilderSide] = useState('groom');
  const [builderLang, setBuilderLang] = useState('en');
  const [builderMusic, setBuilderMusic] = useState('none');

  // UI feedback states
  const [copiedId, setCopiedId] = useState(null);
  const [qrDownloading, setQrDownloading] = useState(false);
  const [qrModalData, setQrModalData] = useState(null); // for quick share popup QR codes

  // Hover states
  const [analyticsHover, setAnalyticsHover] = useState(false);
  const [btnHover, setBtnHover] = useState(null);

  // Music tracks extraction
  const getMusicTracks = () => {
    const tracks = MEDIA.MUSIC_TRACKS || [];
    return [
      { id: 'none', label: 'Amaran / Default (Track 1)', trackVal: null },
      ...tracks.map(t => ({
        id: String(t.id),
        label: `${t.label} (Track ${t.id})`,
        trackVal: String(t.id)
      }))
    ];
  };

  const musicOptions = getMusicTracks();

  const getBaseUrl = useCallback(() => {
    return 'https://jyoti-engages.adityanvs.in/engagement';
  }, []);

  // Generate URL helper
  const generateUrl = useCallback((sideVal, langCode, musicId) => {
    const base = getBaseUrl();
    const params = [];
    if (sideVal) params.push(`side=${sideVal}`);
    if (langCode) params.push(`lang=${langCode}`);
    if (musicId) params.push(`music=${musicId}`);
    
    if (params.length === 0) return base;
    return `${base}?${params.join('&')}`;
  }, [getBaseUrl]);

  // Copy helper
  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Download QR Code Blob helper
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

  // Builder URL generation
  const activeLangObj = LANGS.find(l => l.id === builderLang) || LANGS[0];
  const activeMusicObj = musicOptions.find(m => m.id === builderMusic) || musicOptions[0];

  // Variation 1: Cleanest Recommended URL (omits side=groom, music=1)
  const builderCleanUrl = generateUrl(
    builderSide === 'groom' ? null : 'bride',
    activeLangObj.code,
    activeMusicObj.trackVal
  );

  // Variation 2: Explicit URL (contains side and music params explicitly)
  const builderExplicitUrl = generateUrl(
    builderSide,
    activeLangObj.code || activeLangObj.id === 'none' ? activeLangObj.code : null,
    activeMusicObj.trackVal || activeMusicObj.id === 'none' ? (activeMusicObj.trackVal || '1') : null
  );

  const builderLabel = `${builderSide === 'groom' ? 'Groom Side' : 'Bride Side'} — ${activeLangObj.label} — ${activeMusicObj.label.split(' / ')[0]}`;

  return (
    <>
      <Head>
        <title>Invite Link Generator — Dashboard</title>
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
              <p style={st.subtitle}>Generate, customize, and share invitation links with QR codes</p>
            </div>

            <div style={st.headerControls}>
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


          {/* SECTION 1: INTERACTIVE BUILDER PANEL (Two Columns) */}
          <section style={st.builderPanel}>
            <div style={st.builderGrid}>
              
              {/* Left Column: Selector Controls */}
              <div style={st.builderControls}>
                <h3 style={st.builderTitle}>Dynamic Invite Builder</h3>
                <p style={st.builderDesc}>Select parameters to dynamically build a personalized guest link.</p>
                
                {/* Side Selection */}
                <div style={st.controlGroup}>
                  <label style={st.controlLabel}>Select Family Team</label>
                  <div style={st.sideToggles}>
                    {SIDES.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setBuilderSide(s.id)}
                        style={{
                          ...st.sideToggleBtn,
                          ...(builderSide === s.id ? st.sideToggleBtnActive : {})
                        }}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language Selection */}
                <div style={st.controlGroup}>
                  <label style={st.controlLabel}>Select Language View</label>
                  <select
                    value={builderLang}
                    onChange={(e) => setBuilderLang(e.target.value)}
                    style={st.dropdownSelect}
                  >
                    {LANGS.map(l => (
                      <option key={l.id} value={l.id}>
                        {l.label} {l.native !== 'Default' ? `(${l.native})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Music Selection */}
                <div style={st.controlGroup}>
                  <label style={st.controlLabel}>Select Music Soundtrack</label>
                  <select
                    value={builderMusic}
                    onChange={(e) => setBuilderMusic(e.target.value)}
                    style={st.dropdownSelect}
                  >
                    {musicOptions.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Column: Live Output & QR Preview */}
              <div style={st.builderDisplay}>
                <h3 style={st.displayTitle}>Live Generated Output</h3>
                
                {/* QR Code Container */}
                <div style={st.qrWrapper}>
                  <div style={st.qrContainerBox}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(builderCleanUrl)}`}
                      alt="Builder QR Code"
                      style={st.builderQrImage}
                    />
                  </div>
                  <button
                    disabled={qrDownloading}
                    onClick={() => downloadQR(builderCleanUrl, builderLabel)}
                    onMouseEnter={() => setBtnHover('download')}
                    onMouseLeave={() => setBtnHover(null)}
                    style={{
                      ...st.downloadQrBtn,
                      ...(btnHover === 'download' ? st.downloadQrBtnHover : {}),
                      ...(qrDownloading ? { opacity: 0.7 } : {})
                    }}
                  >
                    {qrDownloading ? (
                      <>
                        <span style={st.spinner}></span>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <svg style={{ width: '14px', height: '14px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Download QR Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Generated URLs display */}
                <div style={st.urlsDisplayBlock}>
                  {/* Clean URL (Recommended) */}
                  <div style={st.urlDisplayBlock}>
                    <div style={st.urlHeaderRow}>
                      <span style={st.urlBadgeClean}>Recommended Link (Short)</span>
                      <div style={st.urlBtnGroup}>
                        <button
                          onClick={() => handleCopy(builderCleanUrl, 'builder_clean')}
                          style={{
                            ...st.urlActionBtn,
                            ...(copiedId === 'builder_clean' ? st.urlActionBtnCopied : {})
                          }}
                        >
                          {copiedId === 'builder_clean' ? 'Copied' : 'Copy'}
                        </button>
                        <a href={builderCleanUrl} target="_blank" rel="noreferrer" style={st.urlActionBtnLink}>
                          Preview
                        </a>
                      </div>
                    </div>
                    <div style={st.urlBoxText}>{builderCleanUrl}</div>
                  </div>

                  {/* Explicit URL */}
                  <div style={st.urlDisplayBlock}>
                    <div style={st.urlHeaderRow}>
                      <span style={st.urlBadgeExplicit}>Explicit Parameters Link</span>
                      <div style={st.urlBtnGroup}>
                        <button
                          onClick={() => handleCopy(builderExplicitUrl, 'builder_explicit')}
                          style={{
                            ...st.urlActionBtn,
                            ...(copiedId === 'builder_explicit' ? st.urlActionBtnCopied : {})
                          }}
                        >
                          {copiedId === 'builder_explicit' ? 'Copied' : 'Copy'}
                        </button>
                        <a href={builderExplicitUrl} target="_blank" rel="noreferrer" style={st.urlActionBtnLink}>
                          Preview
                        </a>
                      </div>
                    </div>
                    <div style={st.urlBoxText}>{builderExplicitUrl}</div>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* SECTION 2: QUICK SHARE DIRECTORY (Compact Grid) */}
          <section style={st.quickShareSection}>
            <h2 style={st.sectionHeading}>Quick-Share Invitation Links</h2>
            <p style={st.sectionSubheading}>Instantly copy or preview the most commonly shared family-specific language links (default music track is Amaran).</p>
            
            <div style={st.quickShareGrid}>
              {LANGS.map(lang => {
                const groomLink = generateUrl(null, lang.code, null);
                const brideLink = generateUrl('bride', lang.code, null);
                
                const groomId = `qs_groom_${lang.id}`;
                const brideId = `qs_bride_${lang.id}`;

                return (
                  <div key={lang.id} style={st.quickShareCard}>
                    <div style={st.qsCardHeader}>
                      <h4 style={st.qsCardTitle}>{lang.label}</h4>
                      <span style={st.qsCardNative}>{lang.native}</span>
                    </div>

                    <div style={st.qsCardBody}>
                      {/* Groom side row */}
                      <div style={st.qsRow}>
                        <div style={st.qsRowLabelBox}>
                          <span style={st.qsRowLabel}>Groom Side</span>
                        </div>
                        <div style={st.qsRowActions}>
                          <button
                            onClick={() => handleCopy(groomLink, groomId)}
                            style={{
                              ...st.qsBtn,
                              ...(copiedId === groomId ? st.qsBtnCopied : st.qsBtnCopy)
                            }}
                          >
                            {copiedId === groomId ? 'Copied' : 'Copy'}
                          </button>
                          <a href={groomLink} target="_blank" rel="noreferrer" style={st.qsBtnPreview}>
                            Preview
                          </a>
                          <button
                            onClick={() => setQrModalData({ url: groomLink, label: `Groom Side — ${lang.label} (Quick Link)` })}
                            style={st.qsBtnQr}
                          >
                            QR
                          </button>
                        </div>
                      </div>

                      {/* Bride side row */}
                      <div style={st.qsRow}>
                        <div style={st.qsRowLabelBox}>
                          <span style={st.qsRowLabel}>Bride Side</span>
                        </div>
                        <div style={st.qsRowActions}>
                          <button
                            onClick={() => handleCopy(brideLink, brideId)}
                            style={{
                              ...st.qsBtn,
                              ...(copiedId === brideId ? st.qsBtnCopied : st.qsBtnCopy)
                            }}
                          >
                            {copiedId === brideId ? 'Copied' : 'Copy'}
                          </button>
                          <a href={brideLink} target="_blank" rel="noreferrer" style={st.qsBtnPreview}>
                            Preview
                          </a>
                          <button
                            onClick={() => setQrModalData({ url: brideLink, label: `Bride Side — ${lang.label} (Quick Link)` })}
                            style={st.qsBtnQr}
                          >
                            QR
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </div>

      {/* QR Code Modal Backdrop (Quick Share Popups) */}
      {qrModalData && (
        <div style={st.modalBackdrop} onClick={() => setQrModalData(null)}>
          <div style={st.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={st.modalHeader}>
              <div>
                <h3 style={st.modalTitle}>QR Code Generator</h3>
                <p style={st.modalSubtitle}>{qrModalData.label}</p>
              </div>
              <button onClick={() => setQrModalData(null)} style={st.closeModalBtn}>
                &times;
              </button>
            </div>

            <div style={st.modalBody}>
              <div style={st.qrBox}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrModalData.url)}`}
                  alt="Quick Link QR Code"
                  style={st.qrImage}
                />
              </div>
              <div style={st.modalUrlText}>
                {qrModalData.url}
              </div>
            </div>

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
  builderPanel: {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
    marginBottom: '40px',
  },
  builderGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '40px',
    alignItems: 'start',
  },
  builderControls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  builderTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#ffffff',
  },
  builderDesc: {
    fontSize: '0.85rem',
    color: '#94a3b8',
    lineHeight: '1.5',
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  controlLabel: {
    fontSize: '0.78rem',
    fontWeight: '700',
    color: '#cbd5e1',
    letterSpacing: '0.01em',
  },
  sideToggles: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  sideToggleBtn: {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(255,255,255,0.02)',
    color: '#94a3b8',
    fontWeight: '600',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  sideToggleBtnActive: {
    background: 'linear-gradient(to right, #8B2240, #C4572A)',
    borderColor: 'rgba(139,34,64,0.4)',
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(139,34,64,0.2)',
  },
  dropdownSelect: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '12px 16px',
    color: '#ffffff',
    fontSize: '0.875rem',
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'></path></svg>")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    backgroundSize: '16px',
  },
  builderDisplay: {
    background: 'rgba(0,0,0,0.25)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.3)',
  },
  displayTitle: {
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: '#D4A843',
    fontWeight: '700',
    alignSelf: 'flex-start',
  },
  qrWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
  },
  qrContainerBox: {
    padding: '12px',
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
  },
  builderQrImage: {
    width: '160px',
    height: '160px',
    display: 'block',
  },
  downloadQrBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(212,168,67,0.12)',
    border: '1px solid rgba(212,168,67,0.35)',
    color: '#D4A843',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '0.75rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  downloadQrBtnHover: {
    background: 'rgba(212,168,67,0.22)',
    borderColor: 'rgba(212,168,67,0.5)',
  },
  urlsDisplayBlock: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  urlDisplayBlock: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  urlHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  urlBadgeClean: {
    fontSize: '0.65rem',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '4px',
    backgroundColor: 'rgba(34,197,94,0.12)',
    border: '1px solid rgba(34,197,94,0.3)',
    color: '#4ade80',
    letterSpacing: '0.02em',
  },
  urlBadgeExplicit: {
    fontSize: '0.65rem',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '4px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#94a3b8',
    letterSpacing: '0.02em',
  },
  urlBtnGroup: {
    display: 'flex',
    gap: '4px',
  },
  urlActionBtn: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    color: '#cbd5e1',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.65rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  urlActionBtnCopied: {
    backgroundColor: 'rgba(34,197,94,0.15)',
    border: '1px solid rgba(34,197,94,0.3)',
    color: '#4ade80',
  },
  urlActionBtnLink: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    color: '#cbd5e1',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.65rem',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
  urlBoxText: {
    width: '100%',
    fontFamily: 'monospace',
    fontSize: '0.72rem',
    color: '#cbd5e1',
    backgroundColor: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.05)',
    padding: '8px 12px',
    borderRadius: '8px',
    wordBreak: 'break-all',
    textAlign: 'left',
  },
  quickShareSection: {
    marginTop: '20px',
  },
  sectionHeading: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '6px',
  },
  sectionSubheading: {
    fontSize: '0.85rem',
    color: '#64748b',
    marginBottom: '24px',
  },
  quickShareGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  quickShareCard: {
    background: 'rgba(255, 255, 255, 0.015)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  qsCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    paddingBottom: '8px',
  },
  qsCardTitle: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#ffffff',
  },
  qsCardNative: {
    fontSize: '0.68rem',
    padding: '2px 8px',
    borderRadius: '12px',
    backgroundColor: 'rgba(212,168,67,0.06)',
    border: '1px solid rgba(212,168,67,0.2)',
    color: '#D4A843',
    fontWeight: '600',
  },
  qsCardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  qsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 10px',
    backgroundColor: 'rgba(255,255,255,0.01)',
    border: '1px solid rgba(255,255,255,0.03)',
    borderRadius: '8px',
  },
  qsRowLabelBox: {
    flex: '1',
  },
  qsRowLabel: {
    fontSize: '0.78rem',
    fontWeight: '600',
    color: '#cbd5e1',
  },
  qsRowActions: {
    display: 'flex',
    gap: '4px',
  },
  qsBtn: {
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '0.68rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
  },
  qsBtnCopy: {
    backgroundColor: 'rgba(212,168,67,0.08)',
    border: '1px solid rgba(212,168,67,0.2)',
    color: '#D4A843',
  },
  qsBtnCopied: {
    backgroundColor: 'rgba(34,197,94,0.12)',
    border: '1px solid rgba(34,197,94,0.3)',
    color: '#4ade80',
  },
  qsBtnPreview: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    color: '#cbd5e1',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '0.68rem',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
  qsBtnQr: {
    backgroundColor: 'rgba(139,34,64,0.08)',
    border: '1px solid rgba(139,34,64,0.2)',
    color: '#fca5a5',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '0.68rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
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
