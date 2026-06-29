/**
 * Comment moderation statuses.
 */
export const CommentStatus = {
  /** Comment awaits moderation */
  PENDING: 'pending',
  /** Comment has been approved and is visible */
  APPROVED: 'approved',
  /** Comment has been rejected and is hidden */
  REJECTED: 'rejected',
  /** Comment has been flagged for review */
  FLAGGED: 'flagged',
} as const;

export type CommentStatus = (typeof CommentStatus)[keyof typeof CommentStatus];

export const CommentStatusValues = Object.values(CommentStatus) as readonly CommentStatus[];
