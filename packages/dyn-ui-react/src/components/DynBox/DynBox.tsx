import React, { forwardRef, useMemo, useId } from 'react';
import { cn } from '../../utils/classNames';
import type { DynBoxProps, DynBoxRef } from './DynBox.types';
import styles from './DynBox.module.css';

const getStyleClass = (name: string) => (styles as Record<string, string>)[name] || '';

// Props to filter out before spreading to the DOM element
const FILTERED_PROPS = new Set([
  'as', 'padding', 'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl', 'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml',
  'radius', 'borderRadius', 'customBorderRadius', 'shadow', 'border', 'background', 'bg', 'backgroundColor', 'color',
  'align', 'justify', 'direction', 'flexDirection', 'wrap', 'gap', 'rowGap', 'columnGap',
  'gridTemplateColumns', 'gridTemplateRows', 'gridTemplateAreas', 'top', 'right', 'bottom', 'left', 'zIndex',
  'interactive', 'cssVars', 'ariaLiveMessage', 'ariaLivePoliteness', 'focusOnMount', 'display', 'position', 'textAlign', 'overflow', 'overflowX', 'overflowY',
  'alignContent', 'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 'hideOnMobile', 'hideOnTablet', 'hideOnDesktop', 'mobileOnly', 'tabletOnly', 'desktopOnly'
]);

const TOKEN_KEYS = ['none', '0', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'auto'];
const isToken = (v?: string | number) => v !== undefined && TOKEN_KEYS.includes(String(v));

// Strictly map tokens to component-specific CSS variables
const resolvePaddingToken = (v: string | number) => {
  const sv = String(v);
  if (sv === '0' || sv === 'none') return 'var(--dyn-box-spacing-padding-none)';
  return isToken(v) ? `var(--dyn-box-spacing-padding-${sv})` : sv;
};

const resolveMarginToken = (v: string | number) => {
  const sv = String(v);
  if (sv === '0' || sv === 'none') return 'var(--dyn-box-spacing-margin-none)';
  if (sv === 'auto') return 'var(--dyn-box-spacing-margin-auto)';
  return isToken(v) ? `var(--dyn-box-spacing-margin-${sv})` : sv;
};

const toPascalCase = (s: string) => s ? s.replace(/(^\w|-\w)/g, (c) => c.replace('-', '').toUpperCase()) : '';

function DynBoxInner<E extends React.ElementType = 'div'>(props: DynBoxProps<E>, ref: React.ForwardedRef<any>) {
  const {
    as, padding, p, px, py, pt, pr, pb, pl,
    m, mx, my, mt, mr, mb, ml,
    radius, borderRadius, customBorderRadius,
    shadow, border,
    background, bg, backgroundColor, color,
    align, justify,
    direction, flexDirection, wrap,
    gap, rowGap, columnGap,
    gridTemplateColumns, gridTemplateRows, gridTemplateAreas,
    alignContent, display, position, textAlign, overflow, overflowX, overflowY,
    width, height, maxWidth, maxHeight, minWidth, minHeight,
    top, right, bottom, left, zIndex,
    className, style, id, role,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-labelledby': ariaLabelledBy,
    'data-testid': dataTestId = 'dyn-box',
    focusOnMount, interactive,
    ariaLiveMessage, ariaLivePoliteness = 'polite',
    cssVars,
    hideOnMobile, hideOnTablet, hideOnDesktop, mobileOnly, tabletOnly, desktopOnly,
    children, ...rest
  } = props;

  const Component = (as ?? 'div') as React.ElementType;
  const generatedId = useId();
  const internalId = useMemo(() => id || generatedId, [id, generatedId]);

  // Filter props for DOM
  const domProps = Object.fromEntries(Object.entries(rest).filter(([k]) => !FILTERED_PROPS.has(k)));

  // Forward ref logic
  const elementRef = React.useRef<HTMLElement | null>(null);
  const setRefs = (node: any) => {
    elementRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref && 'current' in (ref as any)) (ref as any).current = node;
  };

  const finalDirection = flexDirection || direction;
  const finalBackground = bg || background;
  const finalRadius = borderRadius || customBorderRadius || radius;
  const basePadding = p ?? padding;

  // Generate class names - prefer utility classes for token keys where available (p, m)
  const classes = cn(
    getStyleClass('box'),
    // Padding classes
    basePadding && isToken(basePadding) && getStyleClass(`boxP${toPascalCase(String(basePadding))}`),
    // Margin classes
    m && isToken(m) && getStyleClass(`boxM${toPascalCase(String(m))}`),

    // Semantic Background classes
    finalBackground && ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'surface', 'muted'].includes(finalBackground as string) && getStyleClass(`boxBg${toPascalCase(finalBackground as string)}`),

    // Layout classes
    display && getStyleClass(`box${toPascalCase(display)}`),
    position && getStyleClass(`box${toPascalCase(position)}`),

    // Border Radius classes (utility)
    finalRadius && isToken(finalRadius as string) && ['none', 'sm', 'md', 'lg', 'full'].includes(finalRadius as string) && getStyleClass(`boxRounded${toPascalCase(finalRadius as string)}`),

    // Shadow classes
    shadow && ['sm', 'md', 'lg'].includes(shadow) && getStyleClass(`boxShadow${toPascalCase(shadow)}`),

    // Text Align & Overflow
    textAlign && getStyleClass(`boxText${toPascalCase(textAlign)}`),
    overflow && getStyleClass(`boxOverflow${toPascalCase(overflow)}`),

    // Border & Interactive
    border === 'default' && getStyleClass('boxBorder'),
    interactive && getStyleClass('boxInteractive'),

    // Responsive utilities
    hideOnMobile && getStyleClass('boxMobileHidden'),
    hideOnTablet && getStyleClass('boxTabletHidden'),
    hideOnDesktop && getStyleClass('boxDesktopHidden'),
    mobileOnly && [getStyleClass('boxTabletHidden'), getStyleClass('boxDesktopHidden')],
    tabletOnly && [getStyleClass('boxMobileHidden'), getStyleClass('boxDesktopHidden')],
    desktopOnly && [getStyleClass('boxMobileHidden'), getStyleClass('boxTabletHidden')],

    className
  );

  // Style variables for dynamic overrides
  const styleVars: React.CSSProperties = {
    // Dimensions
    ...(width !== undefined ? { '--dyn-box-width': typeof width === 'number' ? (width === 0 ? '0' : `${width}px`) : width } : {}),
    ...(height !== undefined ? { '--dyn-box-height': typeof height === 'number' ? (height === 0 ? '0' : `${height}px`) : height } : {}),
    ...(minWidth !== undefined ? { '--dyn-box-min-width': typeof minWidth === 'number' ? (minWidth === 0 ? '0' : `${minWidth}px`) : minWidth } : {}),
    ...(minHeight !== undefined ? { '--dyn-box-min-height': typeof minHeight === 'number' ? (minHeight === 0 ? '0' : `${minHeight}px`) : minHeight } : {}),
    ...(maxWidth !== undefined ? { '--dyn-box-max-width': typeof maxWidth === 'number' ? (maxWidth === 0 ? '0' : `${maxWidth}px`) : maxWidth } : {}),
    ...(maxHeight !== undefined ? { '--dyn-box-max-height': typeof maxHeight === 'number' ? (maxHeight === 0 ? '0' : `${maxHeight}px`) : maxHeight } : {}),

    // Positioning
    ...(top !== undefined ? { '--dyn-box-top': typeof top === 'number' ? (top === 0 ? '0' : `${top}px`) : top } : {}),
    ...(right !== undefined ? { '--dyn-box-right': typeof right === 'number' ? (right === 0 ? '0' : `${right}px`) : right } : {}),
    ...(bottom !== undefined ? { '--dyn-box-bottom': typeof bottom === 'number' ? (bottom === 0 ? '0' : `${bottom}px`) : bottom } : {}),
    ...(left !== undefined ? { '--dyn-box-left': typeof left === 'number' ? (left === 0 ? '0' : `${left}px`) : left } : {}),
    ...(zIndex !== undefined ? { '--dyn-box-z-index': zIndex } : {}),

    // Appearance (Overrides)
    ...(backgroundColor ? { '--dyn-box-bg': backgroundColor } : {}),
    ...(color ? { '--dyn-box-color': color } : {}),
    // Custom Background (non-semantic)
    ...(finalBackground && !['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'surface', 'muted'].includes(finalBackground as string) ? { '--dyn-box-bg': finalBackground } : {}),

    // Radius (Tokens or raw)
    ...(finalRadius && !['none', 'sm', 'md', 'lg', 'full'].includes(finalRadius as string) ? {
      '--dyn-box-radius': isToken(finalRadius as string) ? `var(--dyn-box-border-radius-${finalRadius})` : finalRadius
    } : {}),

    // Padding (Directional or Custom)
    ...(basePadding && !isToken(basePadding) ? { '--dyn-box-padding': basePadding } : {}),
    ...(px ? { '--dyn-box-padding-left': resolvePaddingToken(px), '--dyn-box-padding-right': resolvePaddingToken(px) } : {}),
    ...(py ? { '--dyn-box-padding-top': resolvePaddingToken(py), '--dyn-box-padding-bottom': resolvePaddingToken(py) } : {}),
    ...(pt ? { '--dyn-box-padding-top': resolvePaddingToken(pt) } : {}),
    ...(pr ? { '--dyn-box-padding-right': resolvePaddingToken(pr) } : {}),
    ...(pb ? { '--dyn-box-padding-bottom': resolvePaddingToken(pb) } : {}),
    ...(pl ? { '--dyn-box-padding-left': resolvePaddingToken(pl) } : {}),

    // Margin (Directional or Custom)
    ...(m && !isToken(m) ? { '--dyn-box-margin': m } : {}),
    ...(mx ? { '--dyn-box-margin-left': resolveMarginToken(mx), '--dyn-box-margin-right': resolveMarginToken(mx) } : {}),
    ...(my ? { '--dyn-box-margin-top': resolveMarginToken(my), '--dyn-box-margin-bottom': resolveMarginToken(my) } : {}),
    ...(mt ? { '--dyn-box-margin-top': resolveMarginToken(mt) } : {}),
    ...(mr ? { '--dyn-box-margin-right': resolveMarginToken(mr) } : {}),
    ...(mb ? { '--dyn-box-margin-bottom': resolveMarginToken(mb) } : {}),
    ...(ml ? { '--dyn-box-margin-left': resolveMarginToken(ml) } : {}),

    // Layout Specifics
    ...(finalDirection ? { '--dyn-box-flex-direction': finalDirection } : {}),
    ...(wrap ? { '--dyn-box-flex-wrap': wrap } : {}),
    ...(justify ? { '--dyn-box-justify-content': justify } : {}),
    ...(align ? { '--dyn-box-align-items': align } : {}),
    ...(alignContent ? { '--dyn-box-align-content': alignContent } : {}),
    ...(gap ? { '--dyn-box-gap': resolvePaddingToken(gap) } : {}),
    ...(rowGap ? { '--dyn-box-row-gap': resolvePaddingToken(rowGap) } : {}),
    ...(columnGap ? { '--dyn-box-column-gap': resolvePaddingToken(columnGap) } : {}),

    // Grid Specifics
    ...(gridTemplateColumns ? { '--dyn-box-grid-columns': gridTemplateColumns } : {}),
    ...(gridTemplateRows ? { '--dyn-box-grid-rows': gridTemplateRows } : {}),
    ...(gridTemplateAreas ? { '--dyn-box-grid-areas': gridTemplateAreas } : {}),
    ...(overflowX ? { '--dyn-box-overflow-x': overflowX } : {}),
    ...(overflowY ? { '--dyn-box-overflow-y': overflowY } : {}),

    ...cssVars,
    ...style,
  } as React.CSSProperties;

  // accessibility focus management
  React.useEffect(() => {
    if (focusOnMount && interactive) {
      // Use microtask to ensure DOM is ready
      queueMicrotask(() => {
        try { elementRef.current?.focus?.(); } catch { /* ignore */ }
      });
    }
  }, [focusOnMount, interactive]);

  const liveRegionId = ariaLiveMessage ? `${internalId}-liveregion` : undefined;
  const describedBy = [ariaDescribedBy, liveRegionId].filter(Boolean).join(' ') || undefined;

  return React.createElement(
    Component,
    {
      ...domProps,
      ref: setRefs,
      id: internalId,
      role: interactive ? (role ?? 'button') : role,
      className: classes,
      style: styleVars,
      'aria-label': ariaLabel,
      'aria-describedby': describedBy,
      'aria-labelledby': ariaLabelledBy,
      'data-testid': dataTestId,
      tabIndex: interactive ? ((domProps as any).tabIndex ?? 0) : (domProps as any).tabIndex,
      onKeyDown: (e: React.KeyboardEvent) => {
        (domProps as any).onKeyDown?.(e);
        if (!interactive) return;
        if (e.key === 'Enter' || e.key === ' ') {
          (domProps as any).onClick?.(e);
          if (e.key === ' ') e.preventDefault();
        }
      },
    },
    children,
    ariaLiveMessage && (
      <span id={`${internalId}-liveregion`} aria-live={ariaLivePoliteness} aria-atomic="true" className="dyn-sr-only">{ariaLiveMessage}</span>
    )
  );
}

const _DynBox = forwardRef(DynBoxInner) as React.NamedExoticComponent<any>;
export const DynBox = _DynBox as <E extends React.ElementType = 'div'>(
  props: DynBoxProps<E> & { ref?: DynBoxRef<E> }
) => React.ReactElement | null;

(_DynBox as React.NamedExoticComponent).displayName = 'DynBox';
