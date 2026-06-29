/**
 * Structured API error with HTTP status and machine-readable code.
 */
export class ApiError extends Error {
  /** HTTP status code */
  httpStatus: number;
  /** Machine-readable error code */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Additional error details */
  details?: Record<string, unknown>;

  constructor(httpStatus: number, code: string, message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = 'ApiError';
    this.httpStatus = httpStatus;
    this.code = code;
    this.message = message;
    this.details = details;
  }
}
