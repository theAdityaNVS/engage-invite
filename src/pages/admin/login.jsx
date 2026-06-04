import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Interactive style states
  const [btnHover, setBtnHover] = useState(false);
  const [backHover, setBackHover] = useState(false);
  const [userFocused, setUserFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);

  const router = useRouter();
  const { from } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, rememberMe }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Navigate back to origin page or default to visits dashboard
      const dest = typeof from === 'string' && from.startsWith('/') && !from.includes('//') ? from : '/admin/visits';
      router.push(dest);
    } catch (err) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In — Admin Portal</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div style={st.page}>
        {/* Glowing background light spots */}
        <div style={st.glowBurgundy}></div>
        <div style={st.glowGold}></div>

        {/* Decorative thin accent lines */}
        <div style={st.stripeTop}></div>
        <div style={st.stripeBottom}></div>

        <div style={st.container}>
          {/* Brand Header */}
          <div style={st.header}>
            <h1 style={st.coupleTitle}>Aditya & Jyoti</h1>
            <p style={st.subtitle}>Admin Console</p>
          </div>

          {/* Premium Glassmorphic Form Container */}
          <div style={st.card}>
            {/* Elegant double-accented header border line */}
            <div style={st.cardTopBar}></div>

            <form onSubmit={handleSubmit} style={st.form}>
              {error && (
                <div style={st.errorBox}>
                  <svg style={st.errorIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span style={{ fontWeight: 500 }}>{error}</span>
                </div>
              )}

              {/* Username Input Field */}
              <div style={st.fieldGroup}>
                <label style={st.label}>Username</label>
                <div style={st.inputWrapper}>
                  <span style={st.inputIcon}>
                    <svg style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setUserFocused(true)}
                    onBlur={() => setUserFocused(false)}
                    placeholder="Enter username"
                    style={{
                      ...st.input,
                      ...(userFocused ? st.inputFocused : {})
                    }}
                  />
                </div>
              </div>

              {/* Password Input Field */}
              <div style={st.fieldGroup}>
                <label style={st.label}>Password</label>
                <div style={st.inputWrapper}>
                  <span style={st.inputIcon}>
                    <svg style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPassFocused(true)}
                    onBlur={() => setPassFocused(false)}
                    placeholder="Enter password"
                    style={{
                      ...st.input,
                      ...(passFocused ? st.inputFocused : {})
                    }}
                  />
                </div>
              </div>

              {/* Remember me Option */}
              <div style={st.checkboxRow}>
                <label style={st.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={st.checkboxInput}
                  />
                  <span style={st.checkboxText}>Remember me</span>
                </label>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={loading}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={{
                  ...st.submitBtn,
                  ...(btnHover ? st.submitBtnHover : {}),
                  ...(loading ? { opacity: 0.6, cursor: 'not-allowed' } : {})
                }}
              >
                {loading ? 'Verifying Credentials...' : 'Sign In'}
              </button>
            </form>
          </div>

          {/* Bottom Back Button */}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={() => router.push('/engagement')}
              onMouseEnter={() => setBackHover(true)}
              onMouseLeave={() => setBackHover(false)}
              style={{
                ...st.backBtn,
                ...(backHover ? { color: '#FAF6EE' } : {})
              }}
            >
              ← Back to Invitation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const st = {
  page: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(180deg, #05050a 0%, #0a0b16 50%, #05050a 100%)',
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#e2e8f0',
    overflow: 'hidden',
  },
  glowBurgundy: {
    position: 'absolute',
    top: '20%',
    left: '20%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    backgroundColor: '#8B2240',
    opacity: 0.15,
    filter: 'blur(110px)',
    pointerEvents: 'none',
  },
  glowGold: {
    position: 'absolute',
    bottom: '20%',
    right: '20%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    backgroundColor: '#D4A843',
    opacity: 0.08,
    filter: 'blur(130px)',
    pointerEvents: 'none',
  },
  stripeTop: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '40%',
    height: '1.5px',
    background: 'linear-gradient(to left, rgba(212,168,67,0.25), transparent)',
    pointerEvents: 'none',
  },
  stripeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '40%',
    height: '1.5px',
    background: 'linear-gradient(to right, rgba(139,34,64,0.25), transparent)',
    pointerEvents: 'none',
  },
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: '430px',
    padding: '0 24px',
    zIndex: 10,
  },
  header: {
    textAlign: 'center',
    marginBottom: '2.2rem',
  },
  coupleTitle: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: '3.4rem',
    fontWeight: 'normal',
    background: 'linear-gradient(to right, #FAF6EE, #D4A843)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.4rem',
    filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.4))',
  },
  subtitle: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.25em',
    color: '#64748b',
    fontWeight: '700',
  },
  card: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255, 255, 255, 0.07)',
    borderRadius: '20px',
    padding: '2.5rem 2.2rem',
    boxShadow: '0 30px 70px -10px rgba(0, 0, 0, 0.9)',
    overflow: 'hidden',
  },
  cardTopBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(to right, #8B2240, #D4A843, #8B2240)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.4rem',
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(139,34,64,0.12)',
    border: '1px solid rgba(139,34,64,0.4)',
    borderRadius: '12px',
    padding: '12px 14px',
    fontSize: '0.85rem',
    color: '#fca5a5',
  },
  errorIcon: {
    width: '18px',
    height: '18px',
    color: '#f87171',
    flexShrink: 0,
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.72rem',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: '#64748b',
    fontWeight: '600',
    paddingLeft: '2px',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '15px',
    color: '#475569',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    padding: '13px 16px 13px 44px',
    fontSize: '0.875rem',
    color: '#f1f5f9',
    outline: 'none',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  inputFocused: {
    borderColor: '#D4A843',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    boxShadow: '0 0 0 1px rgba(212, 168, 67, 0.25), inset 0 2px 4px rgba(0,0,0,0.3)',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2px 0',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  checkboxInput: {
    cursor: 'pointer',
    width: '16px',
    height: '16px',
    accentColor: '#D4A843',
  },
  checkboxText: {
    fontSize: '0.85rem',
    color: '#64748b',
  },
  submitBtn: {
    width: '100%',
    background: 'linear-gradient(to right, #8B2240, #C4572A)',
    border: 'none',
    borderRadius: '12px',
    padding: '13px',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#ffffff',
    cursor: 'pointer',
    boxShadow: '0 8px 16px rgba(139,34,64,0.2)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  submitBtnHover: {
    background: 'linear-gradient(to right, #9f294b, #d66231)',
    boxShadow: '0 8px 22px rgba(139,34,64,0.35)',
    transform: 'translateY(-1px)',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'none',
    border: 'none',
    fontSize: '0.75rem',
    color: '#475569',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
};
