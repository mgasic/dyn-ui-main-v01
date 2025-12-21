import { forwardRef, useMemo } from 'react';
import type { CSSProperties, ForwardedRef } from 'react';
import { cn } from '../../utils/classNames';
import {
  DYN_CONTAINER_DEFAULT_PROPS,
  DynContainerProps,
  DynContainerRef,
  type DynContainerMaxWidthToken,
  type DynContainerSpaceValue,
} from './DynContainer.types';
import styles from './DynContainer.module.css';

const toPascalCase = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const SPACING_TOKENS: Record<string, string> = {
  none: '0',
  xs: 'var(--dyn-spacing-xs, var(--spacing-xs, 0.25rem))',
  sm: 'var(--dyn-spacing-sm, var(--spacing-sm, 0.5rem))',
  md: 'var(--dyn-spacing-md, var(--spacing-md, 1rem))',
  lg: 'var(--dyn-spacing-lg, var(--spacing-lg, 1.5rem))',
  xl: 'var(--dyn-spacing-xl, var(--spacing-xl, 2rem))',
};

const MAX_WIDTH_TOKENS: Record<DynContainerMaxWidthToken, string> = {
  xs: 'min(100%, var(--dyn-container-max-width-xs))',
  sm: 'min(100%, var(--dyn-container-max-width-sm))',
  md: 'min(100%, var(--dyn-container-max-width-md))',
  lg: 'min(100%, var(--dyn-container-max-width-lg))',
  xl: 'min(100%, var(--dyn-container-max-width-xl))',
  full: '100%',
};

type CSSVarProperties = CSSProperties & Record<string, string | number | undefined>;

const resolveSpacingValue = (value?: DynContainerSpaceValue): string | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === 'number') {
    return `${value}px`;
  }

  const normalized = value.trim();

  if (normalized in SPACING_TOKENS) {
    return SPACING_TOKENS[normalized];
  }

  return normalized;
};

const resolveMaxWidth = (
  value?: DynContainerProps['maxWidth']
): string | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === 'number') {
    return `${value}px`;
  }

  const normalized = value.trim();

  if (normalized in MAX_WIDTH_TOKENS) {
    return MAX_WIDTH_TOKENS[normalized as DynContainerMaxWidthToken];
  }

  return normalized;
};

const DynContainerComponent = (
  {
    title,
    subtitle,
    direction,
    align,
    justify,
    spacing,
    size,
    bordered,
    shadow,
    background,
    height,
    maxWidth,
    layout,
    padding,
    margin,
    noBorder,
    noPadding,
    className,
    children,
    style,
    'data-testid': dataTestId,
    ...rest
  }: DynContainerProps,
  ref: ForwardedRef<DynContainerRef>
) => {
  // ✅ Apply defaults only for CSS class generation
  // Do NOT create variables that are always truthy
  const effectiveDirection = direction ?? DYN_CONTAINER_DEFAULT_PROPS.direction;
  const effectiveSpacing = spacing ?? DYN_CONTAINER_DEFAULT_PROPS.spacing;
  const effectiveSize = size ?? DYN_CONTAINER_DEFAULT_PROPS.size;
  const effectiveBackground = background ?? DYN_CONTAINER_DEFAULT_PROPS.background;
  const effectiveBordered = bordered ?? DYN_CONTAINER_DEFAULT_PROPS.bordered;
  const effectiveShadow = shadow ?? DYN_CONTAINER_DEFAULT_PROPS.shadow;
  const effectiveLayout = layout ?? DYN_CONTAINER_DEFAULT_PROPS.layout;
  const effectiveDataTestId = dataTestId ?? DYN_CONTAINER_DEFAULT_PROPS['data-testid'];

  const resolvedBordered = noBorder ? false : effectiveBordered;
  const hasTitleContent = Boolean(title || subtitle);
  const resolvedMaxWidth = resolveMaxWidth(maxWidth);
  const resolvedPadding = resolveSpacingValue(padding);
  const resolvedMargin = resolveSpacingValue(margin);

  // ✅ Only add inline styles when props are explicitly provided
  const containerStyle = useMemo<CSSProperties | undefined>(() => {
    const next: CSSVarProperties = { ...(style as CSSVarProperties) };

    // Only add height if explicitly provided
    if (height !== undefined) {
      if (typeof height === 'number') {
        next.height = `${height}px`;
      } else if (typeof height === 'string') {
        next.height = height;
      }
    }

    // Only add maxWidth if explicitly provided
    if (maxWidth !== undefined && resolvedMaxWidth !== undefined) {
      next.maxWidth = resolvedMaxWidth;
      next['--dyn-container-max-width'] = resolvedMaxWidth;
    }

    // Only add padding if explicitly provided
    if (padding !== undefined && resolvedPadding !== undefined) {
      next['--dyn-container-padding'] = resolvedPadding;
    }

    // Only add margin if explicitly provided
    if (margin !== undefined && resolvedMargin !== undefined) {
      next['--dyn-container-margin'] = resolvedMargin;
    }

    return Object.keys(next).length > 0 ? next : undefined;
  }, [height, margin, maxWidth, padding, resolvedMargin, resolvedMaxWidth, resolvedPadding, style]);

  const directionClass = styles[`direction${toPascalCase(effectiveDirection)}` as keyof typeof styles];
  const spacingClass = effectiveSpacing
    ? styles[`spacing${toPascalCase(effectiveSpacing)}` as keyof typeof styles]
    : undefined;
  const sizeClass = effectiveSize
    ? styles[`size${toPascalCase(effectiveSize)}` as keyof typeof styles]
    : undefined;
  const backgroundClass = effectiveBackground
    ? styles[`background${toPascalCase(effectiveBackground)}` as keyof typeof styles]
    : undefined;
  const alignClass = align
    ? styles[`align${toPascalCase(align)}` as keyof typeof styles]
    : undefined;
  const justifyClass = justify
    ? styles[`justify${toPascalCase(justify)}` as keyof typeof styles]
    : undefined;

  const containerClassName = cn(
    styles.root,
    directionClass,
    spacingClass,
    sizeClass,
    backgroundClass,
    alignClass,
    justifyClass,
    effectiveLayout === 'fixed' && styles.layoutFixed,
    resolvedBordered && styles.bordered,
    effectiveShadow && styles.shadow,
    noPadding && styles.noPadding,
    hasTitleContent && styles.withTitle,
    className
  );

  return (
    <div
      ref={ref}
      className={containerClassName}
      style={containerStyle}
      data-testid={effectiveDataTestId}
      {...rest}
    >
      {hasTitleContent && (
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const DynContainer = forwardRef<DynContainerRef, DynContainerProps>(DynContainerComponent);

DynContainer.displayName = 'DynContainer';

export { DynContainer };
export default DynContainer;
