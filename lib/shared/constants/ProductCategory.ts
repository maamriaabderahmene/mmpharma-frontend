/**
 * Product categories.
 */
export const ProductCategory = {
  /** Body hygiene products */
  HYGIENE_CORPS: 'hygiene-corps',
  /** Hair hygiene products */
  HYGIENE_CHEVEUX: 'hygiene-cheveux',
  /** Oral hygiene products */
  HYGIENE_BUCCO_DENTAIRE: 'hygiene-bucco-dentaire',
  /** Detergent products */
  DETERGENT: 'detergent',
  /** Disinfectant products */
  DESINFECTANT: 'desinfectant',
  /** Inox maintenance products */
  INOX: 'inox',
  /** Miscellaneous products */
  MISC: 'misc',
} as const;

export type ProductCategory = (typeof ProductCategory)[keyof typeof ProductCategory];

export const ProductCategoryValues = Object.values(ProductCategory) as readonly ProductCategory[];
