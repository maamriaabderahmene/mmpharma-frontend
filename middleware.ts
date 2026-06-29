import { NextRequest, NextResponse } from 'next/server';
import { LocaleValues } from '@/lib/shared/constants/Locale';

const LOCALE_COOKIE = 'NEXT_LOCALE';

const authRoutes = ['/account/', '/api/cart', '/api/orders', '/api/account/', '/api/upload/'];

function isAuthRoute(pathname: string): boolean {
  return authRoutes.some((r) => pathname === r || pathname.startsWith(r));
}

function isApiRoute(pathname: string): boolean {
  return pathname.startsWith('/api/');
}

function getPreferredLocale(request: NextRequest): string | null {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && (LocaleValues as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }
  const acceptLanguage = request.headers.get('Accept-Language');
  if (acceptLanguage) {
    for (const locale of LocaleValues as readonly string[]) {
      if (acceptLanguage.includes(locale)) return locale;
    }
    const primary = acceptLanguage.split(',')[0]?.split(';')[0]?.trim();
    if (primary && primary.length >= 2) {
      const match = (LocaleValues as readonly string[]).find((l) => l.startsWith(primary.slice(0, 2)));
      if (match) return match;
    }
  }
  return null;
}

function addSecurityHeaders(response: NextResponse): void {
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://res.cloudinary.com",
    "font-src 'self'",
    "connect-src 'self' https://res.cloudinary.com",
    "frame-ancestors 'none'",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
}

function stripTrackingParams(url: URL): boolean {
  const trackingParams = ['sid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  let changed = false;
  for (const param of trackingParams) {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param);
      changed = true;
    }
  }
  return changed;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 7. Redirect trailing slashes (except for root)
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/+$/, '');
    return NextResponse.redirect(url, 308);
  }

  // 6. Strip tracking params
  const url = request.nextUrl.clone();
  const trackingStripped = stripTrackingParams(url);
  if (trackingStripped) {
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();

  // 1. Security headers
  addSecurityHeaders(response);

  // 2. Request ID propagation
  const incomingRequestId = request.headers.get('X-Request-Id');
  if (incomingRequestId) {
    response.headers.set('X-Request-Id', incomingRequestId);
  }

  // 3. i18n locale detection
  const preferredLocale = getPreferredLocale(request);
  if (preferredLocale) {
    response.cookies.set(LOCALE_COOKIE, preferredLocale, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  // 4. Auth check
  if (isAuthRoute(pathname)) {
    const session = request.cookies.get('session')?.value;
    if (!session) {
      if (isApiRoute(pathname)) {
        return NextResponse.json(
          { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
          { status: 401, headers: { 'X-Request-Id': incomingRequestId ?? '' } },
        );
      }
      const signinUrl = new URL('/auth/signin', request.url);
      signinUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(signinUrl);
    }
  }

  // 5. Rate limiting (simplified - pass through with headers)
  const requestCount = request.headers.get('X-Ratelimit-Remaining');
  if (requestCount !== null) {
    response.headers.set('X-Ratelimit-Remaining', requestCount);
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|openapi.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)'],
};
