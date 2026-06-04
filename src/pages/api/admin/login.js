import crypto from 'crypto';

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password, rememberMe } = req.body || {};

  if (!ADMIN_USER || !ADMIN_PASS) {
    return res.status(500).json({ error: 'Server authentication configuration missing' });
  }

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Calculate expiration (30 days for remember me, 24 hours otherwise)
  const lifespan = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  const expires = Date.now() + lifespan;

  // Generate SHA-256 signature using the admin password as the secret key
  const msg = `${ADMIN_USER}:${ADMIN_PASS}:${expires}:${ADMIN_PASS}`;
  const signature = crypto.createHash('sha256').update(msg).digest('hex');

  // Session token format: expires_timestamp|signature
  const token = `${expires}|${signature}`;

  // Build cookie header
  const maxAgeAttr = rememberMe ? `; Max-Age=${30 * 24 * 60 * 60}` : '';
  const secureAttr = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  const cookieStr = `admin_session=${token}; Path=/; HttpOnly; SameSite=Lax${maxAgeAttr}${secureAttr}`;

  res.setHeader('Set-Cookie', cookieStr);
  return res.status(200).json({ success: true });
}
