// Single source of truth for deriving which site a visit belongs to.
// Future-proofs the wedding page: /engagement -> 'engagement', everything
// else (including root '/') -> 'wedding'. Keep this the ONLY place the path
// -> site mapping lives so the tracker, API, and dashboard agree.

export const SITES = ['engagement', 'wedding'];

export function deriveSite(path) {
  if (!path) return 'wedding';
  return path.startsWith('/engagement') ? 'engagement' : 'wedding';
}
