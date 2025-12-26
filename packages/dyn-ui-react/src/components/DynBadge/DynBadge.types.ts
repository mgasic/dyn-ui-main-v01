import type {
  HTMLAttributes,
  MouseEvent as ReactMouseEvent,
  ReactNode
} from 'react';
import type { BaseComponentProps, AccessibilityProps } from '../../types';

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Supported badge colors
 * Semantic colors for status, alerts, and notifications
 */
export const DYN_BADGE_COLORS = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'info',
  'neutral'
] as const;

/**
 * Supported badge sizes
 * Used for sizing the badge component
 */
export const DYN_BADGE_SIZES: ComponentSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

/**
 * Supported badge variants
 * Visual style variants for different use cases
 */
export const DYN_BADGE_VARIANTS = ['solid', 'soft', 'outline', 'dot'] as const;

/**
 * Supported badge positions
 * Used for overlay badges (e.g., on avatars)
 */
export const DYN_BADGE_POSITIONS = ['topRight', 'topLeft', 'bottomRight', 'bottomLeft', 'center'] as const;

export type DynBadgeSemanticColor = (typeof DYN_BADGE_COLORS)[number];
export type DynBadgeVariant = (typeof DYN_BADGE_VARIANTS)[number];
export type DynBadgeColor = DynBadgeSemanticColor | (string & {});
export type DynBadgePosition = (typeof DYN_BADGE_POSITIONS)[number];

/**
 * Props interface for DynBadge component
 * Clean TypeScript implementation following DynAvatar gold standard
 */
export interface DynBadgeProps
  extends BaseComponentProps,
    AccessibilityProps,
    Omit<HTMLAttributes<HTMLSpanElement>, keyof BaseComponentProps | keyof AccessibilityProps | 'color' | 'children'> {
  /** Badge content */
  children?: ReactNode;

  /** Badge variant style */
  variant?: DynBadgeVariant;

  /** Semantic color */
  color?: DynBadgeColor;

  /** Size variant */
  size?: ComponentSize;

  /** Position when used as overlay */
  position?: DynBadgePosition;

  /** Click handler (makes badge interactive) */
  onClick?: (event: ReactMouseEvent<HTMLSpanElement>) => void;

  /** Icon before text */
  startIcon?: ReactNode;

  /** Icon after text */
  endIcon?: ReactNode;

  /** Max count before showing + */
  maxCount?: number;

  /** Numeric value (for count badges) */
  count?: number;

  /**
   * @deprecated Use `count` instead. Legacy alias maintained for backward compatibility.
   */
  value?: number;

  /** Show badge even when count is 0 */
  showZero?: boolean;

  /** Animate appearance */
  animated?: boolean;

  /** Pulse animation for notifications */
  pulse?: boolean;

  /** Accessible description for count */
  countDescription?: string;
  
  /** Hide badge while keeping DOM accessible */
  invisible?: boolean;
  
  /** Optional icon element */
  icon?: ReactNode;
  
  /** Fallback content if no children/count */
  fallback?: ReactNode;
}

/**
 * Ref type for DynBadge component
 */
export type DynBadgeRef = HTMLSpanElement;

/**
 * Avatar status labels for accessibility
 * Used in DynAvatar integration
 */
export const DYN_BADGE_STATUS_LABELS = {
  online: 'Online',
  offline: 'Offline',
  away: 'Away',
  busy: 'Busy'
} as const;