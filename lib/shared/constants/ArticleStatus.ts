/**
 * Blog / article publication statuses.
 */
export const ArticleStatus = {
  /** Article is being written, not yet submitted for review */
  DRAFT: 'draft',
  /** Article is under review */
  IN_REVIEW: 'in-review',
  /** Article is live on the site */
  PUBLISHED: 'published',
  /** Article has been archived */
  ARCHIVED: 'archived',
} as const;

export type ArticleStatus = (typeof ArticleStatus)[keyof typeof ArticleStatus];

export const ArticleStatusValues = Object.values(ArticleStatus) as readonly ArticleStatus[];
