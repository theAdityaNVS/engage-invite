// Neon serverless Postgres client. Reads DATABASE_URL (pooled connection string).
// Used only by server-side API routes — never imported into client components.
import { neon } from '@neondatabase/serverless';

let _sql = null;

// Lazy singleton so a missing DATABASE_URL doesn't crash module load — callers
// handle the null and fail silently (analytics must never break the invite).
export function getSql() {
  if (_sql) return _sql;
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  _sql = neon(url);
  return _sql;
}
