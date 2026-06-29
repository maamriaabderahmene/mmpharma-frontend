import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/lib/shared/utils/ApiError';

type Handler<T = Record<string, never>> = (req: NextRequest, context: T) => Promise<NextResponse>;

export function withApi<T>(handler: Handler<T>): Handler<T> {
  return async (req, context) => {
    const requestId = crypto.randomUUID();
    const start = performance.now();
    try {
      const response = await handler(req, context);
      response.headers.set('X-Request-Id', requestId);
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      return response;
    } catch (error) {
      const duration = performance.now() - start;
      if (error instanceof ApiError) {
        return NextResponse.json(
          { error: { code: error.code, message: error.message, details: error.details } },
          { status: error.httpStatus, headers: { 'X-Request-Id': requestId } }
        );
      }
      console.error(`[${requestId}] Unhandled error (${duration.toFixed(0)}ms):`, error);
      return NextResponse.json(
        { error: { code: 'INTERNAL', message: 'An unexpected error occurred' } },
        { status: 500, headers: { 'X-Request-Id': requestId } }
      );
    }
  };
}
