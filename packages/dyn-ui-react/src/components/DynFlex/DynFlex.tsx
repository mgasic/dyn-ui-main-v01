import React, { forwardRef } from 'react';
import { cn } from '../../utils/classNames';
import type { DynFlexProps } from './DynFlex.types';
import { DYN_FLEX_DEFAULT_PROPS } from './DynFlex.types';
import styles from './DynFlex.module.css';

export const DynFlex = forwardRef(
    <E extends React.ElementType = 'div'>(
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
            children,
            ...rest
        }: DynFlexProps<E>,
        ref: React.Ref<any>
    ) => {
        const Component = as || 'div';

        const classes = cn(
            styles.flex,
            direction === 'column' && styles.flexColumn,
            wrap === 'wrap' && styles.flexWrap,
            inline && styles.flexInline,

            // Gap mapping
            gap === 'xs' && styles.gapXSmall,
            gap === 'sm' && styles.gapSmall,
            gap === 'md' && styles.gapMedium,
            gap === 'lg' && styles.gapLarge,
            gap === 'xl' && styles.gapXLarge,
            gap === '2xl' && styles.gap2XLarge,

            // Align mapping
            align === 'center' && styles.alignCenter,
            align === 'start' && styles.alignStart,
            align === 'end' && styles.alignEnd,
            align === 'baseline' && styles.alignBaseline,
            align === 'stretch' && styles.alignStretch,

            // Justify mapping
            justify === 'start' && styles.justifyStart,
            justify === 'center' && styles.justifyCenter,
            justify === 'end' && styles.justifyEnd,
            justify === 'between' && styles.justifyBetween,
            justify === 'around' && styles.justifyAround,
            justify === 'evenly' && styles.justifyEvenly,

            className
        );

        return (
            <Component ref={ref} className={classes} {...rest}>
                {children}
            </Component>
        );
    }
);

DynFlex.displayName = 'DynFlex';
