/**
 * Product ranges (Range I — Range V).
 */
export const ProductRange = {
  /** Range I — Hygiene products */
  HYGIENE: 'hygiene',
  /** Range II — Detergent products */
  DETERGENT: 'detergent',
  /** Range III — Disinfectant products */
  DISINFECTANT: 'disinfectant',
  /** Range IV — Inox maintenance products */
  INOX: 'inox',
  /** Range V — Miscellaneous products */
  MISC: 'misc',
} as const;

export type ProductRange = (typeof ProductRange)[keyof typeof ProductRange];

export const ProductRangeValues = Object.values(ProductRange) as readonly ProductRange[];
