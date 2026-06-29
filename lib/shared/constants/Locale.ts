/**
 * Supported locales / languages.
 */
export const Locale = {
  /** French (Morocco) */
  FR_MA: 'fr-MA',
  /** Arabic (Morocco) */
  AR_MA: 'ar-MA',
  /** English (US) */
  EN_US: 'en-US',
} as const;

export type Locale = (typeof Locale)[keyof typeof Locale];

export const LocaleValues = Object.values(Locale) as readonly Locale[];
