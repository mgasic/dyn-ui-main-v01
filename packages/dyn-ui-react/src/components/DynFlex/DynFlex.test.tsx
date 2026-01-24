import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DynFlex } from './DynFlex';
import styles from './DynFlex.module.css';

const getStyleClass = (className: string): string => {
    return (styles as Record<string, string>)[className] || '';
};

describe('DynFlex', () => {
    describe('Basic Rendering', () => {
        it('renders with default class', () => {
            render(<DynFlex data-testid="flex-default">Content</DynFlex>);
            const element = screen.getByTestId('flex-default');
            expect(element).toHaveClass(getStyleClass('flex'));
            expect(element.tagName).toBe('DIV');
        });

        it('renders children correctly', () => {
            render(<DynFlex><span>Child</span></DynFlex>);
            expect(screen.getByText('Child')).toBeInTheDocument();
        });
    });

    describe('Props & Variants', () => {
        it('applies direction classes', () => {
            const directions = ['row', 'column', 'row-reverse', 'column-reverse'] as const;

            directions.forEach(dir => {
                const { unmount } = render(<DynFlex direction={dir} data-testid={`dir-${dir}`} />);
                const pascalDir = dir.replace(/-([a-z])/g, (g) => g[1].toUpperCase()).replace(/^./, (c) => c.toUpperCase());
                expect(screen.getByTestId(`dir-${dir}`)).toHaveClass(getStyleClass(`flex${pascalDir}`));
                unmount();
            });
        });

        it('applies wrap classes', () => {
            const { rerender } = render(<DynFlex wrap="wrap" data-testid="wrap" />);
            expect(screen.getByTestId('wrap')).toHaveClass(getStyleClass('flexWrap'));

            rerender(<DynFlex wrap="nowrap" data-testid="wrap" />);
            expect(screen.getByTestId('wrap')).toHaveClass(getStyleClass('flexNowrap'));

            rerender(<DynFlex wrap="wrap-reverse" data-testid="wrap" />);
            expect(screen.getByTestId('wrap')).toHaveClass(getStyleClass('flexWrapReverse'));
        });

        it('applies inline variants', () => {
            render(<DynFlex inline data-testid="inline" />);
            expect(screen.getByTestId('inline')).toHaveClass(getStyleClass('flexInline'));
        });

        it('applies justify classes', () => {
            const justify = ['start', 'center', 'end', 'between', 'around', 'evenly'] as const;

            justify.forEach(j => {
                const { unmount } = render(<DynFlex justify={j} data-testid={`justify-${j}`} />);
                const pascal = j.charAt(0).toUpperCase() + j.slice(1);
                expect(screen.getByTestId(`justify-${j}`)).toHaveClass(getStyleClass(`justify${pascal}`));
                unmount();
            });
        });

        it('applies align classes', () => {
            const align = ['start', 'center', 'end', 'stretch', 'baseline'] as const;

            align.forEach(a => {
                const { unmount } = render(<DynFlex align={a} data-testid={`align-${a}`} />);
                const pascal = a.charAt(0).toUpperCase() + a.slice(1);
                expect(screen.getByTestId(`align-${a}`)).toHaveClass(getStyleClass(`align${pascal}`));
                unmount();
            });
        });
    });

    describe('Spacing Tokens', () => {
        it('applies gap classes', () => {
            const gaps = ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const;

            gaps.forEach(g => {
                const { unmount } = render(<DynFlex gap={g} data-testid={`gap-${g}`} />);
                const pascal = g === '2xs' ? '2xs' :
                    g === '2xl' ? '2xl' :
                        g === '3xl' ? '3xl' :
                            g === '4xl' ? '4xl' :
                                g.charAt(0).toUpperCase() + g.slice(1);
                expect(screen.getByTestId(`gap-${g}`)).toHaveClass(getStyleClass(`gap${pascal}`));
                unmount();
            });
        });

        it('applies padding classes', () => {
            const paddings = ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const;

            paddings.forEach(p => {
                const { unmount } = render(<DynFlex padding={p} data-testid={`pad-${p}`} />);
                const pascal = p === '2xs' ? '2xs' :
                    p === '2xl' ? '2xl' :
                        p === '3xl' ? '3xl' :
                            p === '4xl' ? '4xl' :
                                p.charAt(0).toUpperCase() + p.slice(1);
                expect(screen.getByTestId(`pad-${p}`)).toHaveClass(getStyleClass(`padding${pascal}`));
                unmount();
            });
        });
    });

    describe('Polymorphism', () => {
        it('renders as custom element', () => {
            render(<DynFlex as="section" data-testid="poly" />);
            expect(screen.getByTestId('poly').tagName).toBe('SECTION');
        });

        it('forwards ref', () => {
            const ref = createRef<any>();
            render(<DynFlex ref={ref} data-testid="ref-test" />);
            expect(ref.current).toBeInstanceOf(HTMLDivElement);
        });
    });
});
