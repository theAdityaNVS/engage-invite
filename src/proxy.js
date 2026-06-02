import { NextResponse } from 'next/server';

// HTTP Basic Auth gate for the analytics dashboard and its data API.
// (Next.js 16 renamed the "middleware" file convention to "proxy".)
//
// IMPORTANT: the matcher covers ONLY /admin/* and /api/visits — it must NEVER
// catch /api/track, or the public beacon would require a password and we'd log
// nothing.
//
// Runtime note: proxy runs in an edge-style runtime, so decode the
// Authorization header with atob (Buffer may be unavailable here).

const REALM = 'adityanvs-admin'; // keep identical everywhere so browsers reuse the cached credential

function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': `Basic realm="${REALM}"` },
  });
}

export function proxy(req) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;

  // If creds aren't configured, lock everything down rather than exposing data.
  if (!user || !pass) return unauthorized();

  const header = req.headers.get('authorization') || '';
  if (!header.startsWith('Basic ')) return unauthorized();

  let decoded = '';
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }

  const idx = decoded.indexOf(':');
  const givenUser = idx === -1 ? decoded : decoded.slice(0, idx);
  const givenPass = idx === -1 ? '' : decoded.slice(idx + 1);

  if (givenUser === user && givenPass === pass) {
    return NextResponse.next();
  }
  return unauthorized();
}

export const config = {
  matcher: ['/admin/:path*', '/api/visits'],
};
