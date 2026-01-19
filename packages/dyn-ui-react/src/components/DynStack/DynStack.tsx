import React, { forwardRef } from 'react';
import { cn } from '../../utils/classNames';
import type { DynStackProps } from './DynStack.types';
import { DYN_STACK_DEFAULT_PROPS } from './DynStack.types';
import styles from './DynStack.module.css';

export const DynStack = forwardRef(
    <E extends React.ElementType = 'div'>(
        {
            as,
            direction = DYN_STACK_DEFAULT_PROPS.direction,
            gap = DYN_STACK_DEFAULT_PROPS.gap,
            align = DYN_STACK_DEFAULT_PROPS.align,
            justify = DYN_STACK_DEFAULT_PROPS.justify,
            wrap = DYN_STACK_DEFAULT_PROPS.wrap,
            flex,
            className,
            children,
            style,
            ...rest
        }: DynStackProps<E>,
        ref: React.Ref<any>
    ) => {
        const Component = as || 'div';

        const classes = cn(
            styles.container,
            direction === 'vertical' && styles.vertical,
            direction === 'horizontal' && styles.horizontal,
            direction === 'reverse' && styles.reverse,

            // Gap mapping
            gap === 'none' && styles.gapNone,
            gap === 'xs' && styles.gapXs,
            gap === 'sm' && styles.gapSm,
            gap === 'md' && styles.gapMd,
            gap === 'lg' && styles.gapLg,
            gap === 'xl' && styles.gapXl,

            // Align mapping
            align === 'start' && styles.alignStart,
            align === 'center' && styles.alignCenter,
            align === 'end' && styles.alignEnd,
            align === 'stretch' && styles.alignStretch,
            align === 'baseline' && styles.alignBaseline,

            // Justify mapping
            justify === 'start' && styles.justifyStart,
            justify === 'center' && styles.justifyCenter,
            justify === 'end' && styles.justifyEnd,
            justify === 'between' && styles.justifyBetween,
            justify === 'around' && styles.justifyAround,
            justify === 'evenly' && styles.justifyEvenly,

            wrap && styles.wrap,
            !wrap && styles.noWrap,

            className
        );

        const inlineStyle = {
            ...style,
            flex: flex !== undefined ? flex : style?.flex,
        };

        return (
            <Component ref={ref} className={classes} style={inlineStyle} {...rest}>
                {children}
            </Component>
        );
    }
);

DynStack.displayName = 'DynStack';
