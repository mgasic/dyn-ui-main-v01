import { ReactNode, CSSProperties } from 'react';

/**
 * Available visual variants for the badge
 */
export type DynBadgeVariant = 'solid' | 'soft' | 'outline' | 'dot' | 'ghost';

/**
 * Available semantic colors for the badge
 */
export type DynBadgeColor = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'neutral'
  | 'online'
  | 'offline'
  | 'away'
  | 'busy';

/**
 * Available sizes for the badge
 */
export type DynBadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Available positions for the badge relative to parent
 */
export type DynBadgePosition = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft' | 'center';

/**
 * Props for the DynBadge component
 */
export interface DynBadgeProps {
  /**
   * Content to be displayed inside the badge.
   * If `count` is provided, this is ignored.
   */
  children?: ReactNode;

  /**
   * Numeric value to be displayed.
   * If provided, overrides `children`.
   */
  count?: number;

  /**
   * Legacy prop for count, kept for backward compatibility.
   * @deprecated Use `count` instead.
   */
  value?: number;

  /**
   * Visual style variant of the badge.
   * @default 'solid'
   */
  variant?: DynBadgeVariant;

  /**
   * Semantic color of the badge.
   * @default 'primary'
   */
  color?: DynBadgeColor;

  /**
   * Size of the badge.
   * @default 'md'
   */
  size?: DynBadgeSize;

  /**
   * Maximum number to display before showing suffix (e.g. 99+).
   * Only applies when `count` or `value` is used.
   * @default 99
   */
  max?: number;

  /**
   * Optional icon to display before the text/count.
   */
  icon?: ReactNode;

  /**
   * Whether the badge should have an entrance animation.
   * @default false
   */
  animated?: boolean;

  /**
   * Whether the badge should have a pulsing animation.
   * @default false
   */
  pulse?: boolean;

  /**
   * Absolute position of the badge relative to its parent container.
   * Parent container must have `position: relative`.
   */
  position?: DynBadgePosition;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Inline styles.
   */
  style?: CSSProperties;

  /**
   * Content to display when count is 0 and showZero is false (or undefined).
   * Usually undefined to hide the badge, or a specific fallback content.
   */
  fallback?: ReactNode;

  /**
   * Whether to display the badge when count is 0.
   * @default false
   */
  showZero?: boolean;

  /**
   * Accessible label for the badge.
   * If not provided, one may be generated based on color/variant.
   */
  'aria-label'?: string;
  
  /**
   * ID for testing purposes
   */
  'data-testid'?: string;

  /**
   * Accessibility live region behavior
   */
  'aria-live'?: 'off' | 'assertive' | 'polite';
  
  /**
   * Role attribute
   */
  role?: string;

  /**
   * Click handler
   */
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}
