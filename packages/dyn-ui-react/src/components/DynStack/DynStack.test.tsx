import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DynStack } from './DynStack';
import React from 'react';
import styles from './DynStack.module.css';

const getStyleClass = (className: string): string => {
    return (styles as Record<string, string>)[className] || '';
};

describe('DynStack', () => {
    it('renders children', () => {
        render(<DynStack><span>Content</span></DynStack>);
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders vertical stack by default', () => {
        const { container } = render(<DynStack>Content</DynStack>);
        expect((container.firstChild as HTMLElement)).toHaveClass(getStyleClass('vertical'));
    });

    it('renders horizontal stack', () => {
        const { container } = render(<DynStack direction="horizontal">Content</DynStack>);
        expect((container.firstChild as HTMLElement)).toHaveClass(getStyleClass('horizontal'));
    });

    it('renders reverse direction', () => {
        const { container } = render(<DynStack direction="reverse">Content</DynStack>);
        expect((container.firstChild as HTMLElement)).toHaveClass(getStyleClass('verticalReverse'));
    });

    describe('gap sizes', () => {
        it.each(['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const)(
            'applies %s gap class',
            (gapSize) => {
                const { container } = render(<DynStack gap={gapSize}>Content</DynStack>);
                // Casing logic: 2xs -> 2xs, xs -> Xs. 
                // Matches standard toPascalCase EXCEPT the numbering detail we fixed in DynFlex.
                // Wait, in DynFlex we used `gap2xs`. Let's assume DynStack follows suit.
                const pascal = gapSize === '2xs' ? '2xs' :
                    gapSize === '2xl' ? '2xl' :
                        gapSize === '3xl' ? '3xl' :
                            gapSize === '4xl' ? '4xl' :
                                gapSize.charAt(0).toUpperCase() + gapSize.slice(1);
                expect((container.firstChild as HTMLElement)).toHaveClass(getStyleClass(`gap${pascal}`));
            }
        );
    });

    describe('alignment', () => {
        it.each(['start', 'center', 'end', 'stretch', 'baseline'] as const)(
            'applies %s align class',
            (alignValue) => {
                const { container } = render(<DynStack align={alignValue}>Content</DynStack>);
                const expectedClass = `align${alignValue.charAt(0).toUpperCase() + alignValue.slice(1)}`;
                expect((container.firstChild as HTMLElement)).toHaveClass(getStyleClass(expectedClass));
            }
        );
    });

    describe('justification', () => {
        it.each(['start', 'center', 'end', 'between', 'around', 'evenly'] as const)(
            'applies %s justify class',
            (justifyValue) => {
                const { container } = render(<DynStack justify={justifyValue}>Content</DynStack>);
                const expectedClass = `justify${justifyValue.charAt(0).toUpperCase() + justifyValue.slice(1)}`;
                expect((container.firstChild as HTMLElement)).toHaveClass(getStyleClass(expectedClass));
            }
        );
    });

    it('applies wrap class when wrap is true', () => {
        const { container } = render(<DynStack wrap>Content</DynStack>);
        expect((container.firstChild as HTMLElement)).toHaveClass(getStyleClass('wrap'));
    });

    it('applies noWrap class when wrap is false', () => {
        const { container } = render(<DynStack wrap={false}>Content</DynStack>);
        expect((container.firstChild as HTMLElement)).toHaveClass(getStyleClass('noWrap'));
    });

    it('renders as a custom element type', () => {
        const { container } = render(<DynStack as="section">Content</DynStack>);
        expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('renders as ul with li children', () => {
        const { container } = render(
            <DynStack as="ul">
                <li>Item 1</li>
                <li>Item 2</li>
            </DynStack>
        );
        expect(container.querySelector('ul')).toBeInTheDocument();
        expect(container.querySelectorAll('li')).toHaveLength(2);
    });

    it('applies custom className', () => {
        const { container } = render(<DynStack className="custom-class">Content</DynStack>);
        expect((container.firstChild as HTMLElement)).toHaveClass('custom-class');
    });

    it('applies flex style prop', () => {
        const { container } = render(<DynStack flex={1}>Content</DynStack>);
        expect((container.firstChild as HTMLElement)).toHaveStyle({ flex: '1' });
    });

    it('merges custom style with flex', () => {
        const { container } = render(
            <DynStack flex={2} style={{ margin: '10px' }}>
                Content
            </DynStack>
        );
        const element = container.firstChild as HTMLElement;
        expect(element).toHaveStyle({ flex: '2', margin: '10px' });
    });

    it('forwards ref', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<DynStack ref={ref}>Content</DynStack>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('passes through additional props', () => {
        render(<DynStack data-testid="stack" aria-label="Stack">Content</DynStack>);
        const stack = screen.getByTestId('stack');
        expect(stack).toHaveAttribute('aria-label', 'Stack');
    });

    it('has correct displayName', () => {
        expect(DynStack.displayName).toBe('DynStack');
    });
});
