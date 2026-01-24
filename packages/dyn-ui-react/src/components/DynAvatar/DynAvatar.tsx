import React, { forwardRef, useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import { DynBadge } from '../DynBadge';
import { DynAvatarProps, DynAvatarRef, DYN_AVATAR_STATUS_LABELS } from './DynAvatar.types';
import styles from './DynAvatar.module.css';

// Default image loading timeout (10 seconds)
const DEFAULT_LOAD_TIMEOUT = 10000;

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
      badge,
      loading = false,
      error = false,
      onClick,
      fallback,
      imageLoading = 'eager',
      imageProps,
      loadTimeout = DEFAULT_LOAD_TIMEOUT,
      onImageError,
      errorText = 'Avatar failed to load',
      loadingText = 'Loading avatar',
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
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const isInteractive = Boolean(onClick);

    const displayInitials = useMemo(() => {
      if (initials) return initials.slice(0, 2).toUpperCase();
      if (alt && alt !== 'Avatar') return generateInitials(alt);
      return '';
    }, [initials, alt]);

    const showImage = src && !imageError && imageLoaded;
    const showFallback = !src || imageError || !imageLoaded;
    const isLoadingState = loading || (src && !imageLoaded && !imageError);

    const handleImageLoad = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setImageLoaded(true);
      setImageError(false);
    }, []);

    const handleImageError = useCallback((event?: React.SyntheticEvent<HTMLImageElement>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setImageError(true);
      setImageLoaded(false);
      if (event && onImageError) {
        onImageError(event);
      }
    }, [onImageError]);

    const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
      if (!isInteractive) return;
      onClick?.(event);
    }, [isInteractive, onClick]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isInteractive) return;

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick?.(event as any);
      }
    }, [isInteractive, onClick]);

    useEffect(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (src && !imageLoaded && !imageError) {
        timeoutRef.current = setTimeout(() => {
          setImageError(true);
          setImageLoaded(false);
          timeoutRef.current = null;
          if (onImageError) {
            onImageError({ type: 'timeout' });
          }
        }, loadTimeout);
      }

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }, [src, imageLoaded, imageError, loadTimeout, onImageError]);

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

    const imageClasses = cn(
      styles.image,
      {
        [styles.imageLoading]: !imageLoaded,
        [styles.imageLoaded]: imageLoaded,
      }
    );

    const badgeSize = useMemo(() => {
      switch (size) {
        case 'xs':
        case 'sm':
          return 'xs';
        case 'md':
          return 'sm';
        case 'lg':
          return 'md';
        case 'xl':
          return 'lg';
        default:
          return 'sm';
      }
    }, [size]);

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
        <div className={styles.content}>
          {/* Image */}
          {src && !imageError && (
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

          {/* Hidden image to trigger error handling if src exists but img is hidden */}
          {src && imageError && (
            <span style={{ display: 'none' }}>
              <img src={src} onError={handleImageError} alt="" />
            </span>
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

        </div>

        {/* Status Indicator */}
        {status && (
          <DynBadge
            variant="dot"
            color={status}
            position="bottomRight"
            size={badgeSize}

            aria-label={statusLabel}
            aria-live="off"
            data-testid="dyn-avatar-status"
            className={styles.status}
          />
        )}

        {/* Custom Badge Overlay */}
        {badge && (
          <div
            className={styles.badgeContainer}
            data-testid="dyn-avatar-badge"
          >
            {React.isValidElement(badge) ? (
              badge
            ) : typeof badge === 'object' && badge !== null && 'content' in badge ? (
              <DynBadge
                variant={(badge as any).variant || 'solid'}
                color={(badge as any).color || 'primary'}
                size={badgeSize}
                className={styles.customBadge}
                aria-label={(badge as any)['aria-label']}
              >
                {(badge as any).content}
              </DynBadge>
            ) : (
              <DynBadge
                variant="solid"
                color="primary"
                size={badgeSize}
                className={styles.customBadge}
              >
                {badge as React.ReactNode}
              </DynBadge>
            )}
          </div>
        )}

        {/* Loading announcement for screen readers */}
        {isLoadingState && (
          <span className="dyn-sr-only" aria-live="polite">
            {loadingText}
          </span>
        )}

        {/* Error announcement for screen readers */}
        {(error || imageError) && (
          <span className="dyn-sr-only" aria-live="assertive">
            {errorText}
          </span>
        )}

      </div>
    );
  }
);

DynAvatar.displayName = 'DynAvatar';