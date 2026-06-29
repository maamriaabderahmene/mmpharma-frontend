import 'server-only';

export const cacheHeaders = {
  short: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400' },
  medium: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=604800' },
  long: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=2592000' },
  noStore: { 'Cache-Control': 'no-store, must-revalidate' },
  private: { 'Cache-Control': 'private, no-store' },
} as const;
