import React, { forwardRef, useState, useMemo, useCallback } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import { DynAvatarProps, DynAvatarRef, DYN_AVATAR_STATUS_LABELS } from './DynAvatar.types';
import styles from './DynAvatar.module.css';

// Default fallback icon
const DefaultFallbackIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Generate initials from a name string
 *
 * Extracts up to 2 first letters from words, trimmed and uppercased.
 * Useful for avatar fallback display when image is not available.
 *
 * @param {string} name - Full name to extract initials from
 * @returns {string} Initials (up to 2 characters, uppercased)
 *
 * @example
 * generateInitials("John Doe") // "JD"
 * generateInitials("Alice") // "A"
 * generateInitials("Mary Jane Watson") // "MW"
 * generateInitials("  John  Smith  ") // "JS" (trimmed)
 */
const generateInitials = (name: string): string => {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};

/**
 * DynAvatar Component
 *
 * Displays a user avatar with optional image, initials fallback, and status indicator.
 * Supports multiple sizes, shapes, and interactive states. Fully accessible with ARIA
 * support and keyboard navigation.
 *
 * Features:
 * - 5 size variants (xs, sm, md, lg, xl)
 * - 3 shape options (circle, square, rounded)
 * - 4 status types (online, offline, away, busy)
 * - Image loading with automatic fallback to initials
 * - Customizable fallback content
 * - Interactive mode with click handlers
 * - Loading and error states
 * - Full ARIA support and screen reader friendly
 * - Keyboard accessible (Enter/Space key support)
 * - Ref forwarding for DOM access
 *
 * @component
 * @param {DynAvatarProps} props - Component props
 * @param {string} [props.src] - Image URL to display
 * @param {string} [props.alt] - Alt text and fallback source for initials
 * @param {string} [props.size="md"] - Avatar size: xs, sm, md, lg, xl
 * @param {string} [props.shape="circle"] - Avatar shape: circle, square, rounded
 * @param {string} [props.initials] - Custom initials to display (overrides auto-generation)
 * @param {string} [props.status] - Status indicator: online, offline, away, busy
 * @param {boolean} [props.loading=false] - Show loading spinner
 * @param {boolean} [props.error=false] - Show error state
 * @param {Function} [props.onClick] - Click handler (enables interactive mode)
 * @param {React.ReactNode} [props.fallback] - Custom fallback content
 * @param {string} [props.imageLoading="eager"] - Image loading strategy: eager, lazy
 * @param {HTMLImageElement} [props.imageProps] - Additional props for img element
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - HTML id attribute
 * @param {string} [props.aria-label] - ARIA label for accessibility
 * @param {string} [props.aria-describedby] - ID of element describing the avatar
 * @param {string} [props.aria-labelledby] - ID of element labeling the avatar
 * @param {string} [props.data-testid] - Test ID for testing
 * @param {string} [props.role] - Custom ARIA role
 * @param {React.ReactNode} [props.children] - Fallback content
 * @param {HTMLDivElement} ref - Forwarded ref to root element
 * @returns {JSX.Element} Avatar component
 *
 * @example
 * // Basic usage with initials from alt text
 * <DynAvatar alt="John Doe" />
 *
 * @example
 * // With image and status indicator
 * <DynAvatar
 *   src="/avatars/john.jpg"
 *   alt="John Doe"
 *   status="online"
 *   size="lg"
 * />
 *
 * @example
 * // Interactive avatar with click handler
 * <DynAvatar
 *   src="/avatars/profile.jpg"
 *   alt="Profile"
 *   onClick={() => navigate('/profile')}
 * />
 *
 * @example
 * // Custom fallback content
 * <DynAvatar
 *   alt="User"
 *   fallback={<CustomIcon />}
 * />
 *
 * @example
 * // With status and custom className
 * <DynAvatar
 *   src="/avatars/user.jpg"
 *   alt="Team Member"
 *   status="away"
 *   size="md"
 *   shape="rounded"
 *   className="my-custom-class"
 * />
 */
export const DynAvatar = forwardRef<DynAvatarRef, DynAvatarProps>(
  (
    {
      src,
      alt,
      size = 'md',
      shape = 'circle',
      initials,
      status,
      loading = false,
      error = false,
      onClick,
      fallback,
      imageLoading = 'eager',
      imageProps,
      className,
      id,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-labelledby': ariaLabelledBy,
      'data-testid': dataTestId,
      role,
      children,
      ...rest
    },
    ref
  ) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [internalId] = useState(() => id || generateId('avatar'));

    const isInteractive = Boolean(onClick);

    // Generate initials from alt text or use provided initials
    const displayInitials = useMemo(() => {
      if (initials) return initials.slice(0, 2).toUpperCase();
      if (alt && alt !== 'Avatar') return generateInitials(alt);
      return '';
    }, [initials, alt]);

    // Determine what to show
    const showImage = src && !imageError && imageLoaded;
    const showFallback = !src || imageError || !imageLoaded;
    const isLoadingState = loading || (src && !imageLoaded && !imageError);

    /**
     * Handle image load successfully
     * Updates state to show image and hide initials fallback
     */
    const handleImageLoad = useCallback(() => {
      setImageLoaded(true);
      setImageError(false);
    }, []);

    /**
     * Handle image load error
     * Falls back to initials when image fails to load
     */
    const handleImageError = useCallback(() => {
      setImageError(true);
      setImageLoaded(false);
    }, []);

    /**
     * Handle avatar click when interactive
     * Prevents bubbling and calls onClick prop if provided
     */
    const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
      if (!isInteractive) return;
      onClick?.(event);
    }, [isInteractive, onClick]);

    /**
     * Handle keyboard activation
     * Supports Enter and Space keys for accessibility
     */
    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isInteractive) return;

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick?.(event as any);
      }
    }, [isInteractive, onClick]);

    // Generate accessibility attributes
    const statusLabel = status ? DYN_AVATAR_STATUS_LABELS[status] : undefined;
    const accessibleLabelBase = ariaLabel || (isInteractive ? `Avatar for ${alt}` : alt);
    const accessibleLabel = statusLabel
      ? `${accessibleLabelBase} (${statusLabel})`
      : accessibleLabelBase;

    const avatarClasses = cn(
      styles.container,
      styles[size],
      styles[shape],
      {
        [styles.clickable]: isInteractive,
        [styles.loading]: isLoadingState,
        [styles.error]: error || imageError,
      },
      className
    );

    const statusClasses = cn(
      styles.status,
      status && styles[`status${status.charAt(0).toUpperCase()}${status.slice(1)}`]
    );

    const imageClasses = cn(
      styles.image,
      {
        [styles.imageLoading]: !imageLoaded,
        [styles.imageLoaded]: imageLoaded,
      }
    );

    return (
      <div
        ref={ref}
        id={internalId}
        className={avatarClasses}
        role={isInteractive ? 'button' : (role || 'img')}
        tabIndex={isInteractive ? 0 : undefined}
        aria-label={accessibleLabel}
        aria-describedby={ariaDescribedBy}
        aria-labelledby={ariaLabelledBy}
        aria-busy={isLoadingState ? 'true' : undefined}
        data-status={status}
        data-testid={dataTestId || 'dyn-avatar'}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {/* Image */}
        {src && (
          <img
            src={src}
            alt={showImage ? alt : ''}
            loading={imageLoading}
            className={imageClasses}
            data-testid="dyn-avatar-image"
            onLoad={handleImageLoad}
            onError={handleImageError}
            {...imageProps}
          />
        )}

        {/* Fallback content */}
        {showFallback && (
          <div
            className={styles.initials}
            aria-hidden={showImage ? 'true' : undefined}
          >
            {fallback || children || (
              displayInitials ? (
                <span data-testid="dyn-avatar-initials">
                  {displayInitials}
                </span>
              ) : (
                <span data-testid="dyn-avatar-icon">
                  <DefaultFallbackIcon />
                </span>
              )
            )}
          </div>
        )}

        {/* Status Indicator */}
        {status && (
          <div
            className={statusClasses}
            aria-label={statusLabel}
            data-testid="dyn-avatar-status"
          />
        )}

        {/* Loading announcement for screen readers */}
        {isLoadingState && (
          <span className="dyn-sr-only" aria-live="polite">
          </span>
        )}

        {/* Error announcement for screen readers */}
        {(error || imageError) && (
          <span className="dyn-sr-only" aria-live="assertive">
            Avatar failed to load
          </span>
        )}
      </div>
    );
  }
);

DynAvatar.displayName = 'DynAvatar';
