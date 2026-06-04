import { NextResponse } from 'next/server';

// Cookie-based session verification middleware for the admin dashboard.
// Next.js 16 uses src/proxy.js for edge middleware routing.

const REALM = 'adityanvs-admin';

async function verifySessionToken(token, user, pass) {
  if (!token) return false;
  const parts = token.split('|');
  if (parts.length !== 2) return false;

  const [expiresStr, signature] = parts;
  const expires = parseInt(expiresStr, 10);
  if (isNaN(expires) || expires < Date.now()) return false;

  // Recompute signature to verify integrity (using password as local secret)
  const msg = `${user}:${pass}:${expiresStr}:${pass}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(msg);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const expectedSignature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return signature === expectedSignature;
}

export async function proxy(req) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;

  const url = req.nextUrl.clone();

  // Exclude login endpoints to prevent infinite redirect loops
  if (
    url.pathname === '/admin/login' ||
    url.pathname === '/api/admin/login' ||
    url.pathname === '/api/admin/logout'
  ) {
    return NextResponse.next();
  }

  // If credentials are not configured, display a server error configuration message
  if (!user || !pass) {
    if (url.pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Auth configuration missing' }, { status: 500 });
    }
    return new NextResponse('Authentication configuration missing', { status: 500 });
  }

  // Extract session token from cookie
  const token = req.cookies.get('admin_session')?.value;
  const isValid = await verifySessionToken(token, user, pass);

  if (isValid) {
    return NextResponse.next();
  }

  // Unauthenticated requests:
  if (url.pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // Redirect page visits to the login screen with destination parameter
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = '/admin/login';
  loginUrl.searchParams.set('from', req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*', '/api/visits'],
};
