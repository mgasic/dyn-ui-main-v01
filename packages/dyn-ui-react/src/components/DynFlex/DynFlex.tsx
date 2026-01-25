import React, { forwardRef } from 'react';
import { cn } from '../../utils/classNames';
import type { DynFlexProps, DynFlexRef } from './DynFlex.types';
import { DYN_FLEX_DEFAULT_PROPS } from './DynFlex.types';
import styles from './DynFlex.module.css';

const getStyleClass = (name: string) => (styles as Record<string, string>)[name] || '';
const toPascalCase = (s: string) => s ? s.replace(/(^\w|-\w)/g, (c) => c.replace('-', '').toUpperCase()) : '';

// Valid token keys from flex.json (approximate list for gap/padding)
const TOKEN_KEYS = ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
const isToken = (v?: string | number) => v !== undefined && TOKEN_KEYS.includes(String(v));

// Layout enums
const DIRECTIONS = ['row', 'column', 'row-reverse', 'column-reverse'];
const WRAPS = ['nowrap', 'wrap', 'wrap-reverse'];
const ALIGNS = ['start', 'center', 'end', 'stretch', 'baseline'];
const JUSTIFIES = ['start', 'center', 'end', 'between', 'around', 'evenly'];

function DynFlexInner<E extends React.ElementType = 'div'>(
    {
        as,
        direction = DYN_FLEX_DEFAULT_PROPS.direction,
        justify = DYN_FLEX_DEFAULT_PROPS.justify,
        align = DYN_FLEX_DEFAULT_PROPS.align,
        wrap = DYN_FLEX_DEFAULT_PROPS.wrap,
        gap = DYN_FLEX_DEFAULT_PROPS.gap,
        inline = DYN_FLEX_DEFAULT_PROPS.inline,
        padding,
        className,
        style,
        children,
        ...rest
    }: DynFlexProps<E>,
    ref: React.Ref<any>
) {
    const Component = as || 'div';

    const classes = cn(
        styles.flex,
        inline && styles.flexInline,

        // Direction
        direction && DIRECTIONS.includes(direction) && getStyleClass(`flex${toPascalCase(direction)}`),

        // Wrap
        wrap && WRAPS.includes(wrap) && getStyleClass(`flex${toPascalCase(wrap)}`),

        // Alignment
        align && ALIGNS.includes(align) && getStyleClass(`align${toPascalCase(align)}`),
        justify && JUSTIFIES.includes(justify) && getStyleClass(`justify${toPascalCase(justify)}`),

        // Gap & Padding (Tokens)
        gap && isToken(gap) && getStyleClass(`gap${toPascalCase(String(gap))}`),
        padding && isToken(padding) && getStyleClass(`padding${toPascalCase(String(padding))}`),

        className
    );

    // Dynamic Overrides
    const styleVars: React.CSSProperties = {
        ...(direction && !DIRECTIONS.includes(direction) ? { '--dyn-flex-flex-direction': direction } : {}),
        ...(wrap && !WRAPS.includes(wrap) ? { '--dyn-flex-flex-wrap': wrap } : {}),
        ...(align && !ALIGNS.includes(align) ? { '--dyn-flex-align-items': align } : {}),
        ...(justify && !JUSTIFIES.includes(justify) ? { '--dyn-flex-justify-content': justify } : {}),
        ...(gap && !isToken(gap) ? { '--dyn-flex-gap': typeof gap === 'number' ? `${gap}px` : gap } : {}),
        ...(padding && !isToken(padding) ? { '--dyn-flex-padding': typeof padding === 'number' ? `${padding}px` : padding } : {}),
        ...style,
    } as React.CSSProperties;

    return (
        <Component ref={ref} className={classes} style={styleVars} {...rest}>
            {children}
        </Component>
    );
}

const _DynFlex = forwardRef(DynFlexInner) as React.NamedExoticComponent<any>;
export const DynFlex = _DynFlex as <E extends React.ElementType = 'div'>(
    props: DynFlexProps<E> & { ref?: DynFlexRef<E> }
) => React.ReactElement | null;

(_DynFlex as any).displayName = 'DynFlex';

export default DynFlex;
