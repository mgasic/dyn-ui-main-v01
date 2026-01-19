import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DynStack } from './DynStack';
import React from 'react';

describe('DynStack', () => {
    it('renders children', () => {
        render(<DynStack><span>Content</span></DynStack>);
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders vertical stack by default', () => {
        const { container } = render(<DynStack>Content</DynStack>);
        expect((container.firstChild as HTMLElement).className).toContain('vertical');
    });

    it('renders horizontal stack', () => {
        const { container } = render(<DynStack direction="horizontal">Content</DynStack>);
        expect((container.firstChild as HTMLElement).className).toContain('horizontal');
    });

    it('renders reverse direction', () => {
        const { container } = render(<DynStack direction="reverse">Content</DynStack>);
        expect((container.firstChild as HTMLElement).className).toContain('reverse');
    });

    describe('gap sizes', () => {
        it.each(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const)(
            'applies %s gap class',
            (gapSize) => {
                const { container } = render(<DynStack gap={gapSize}>Content</DynStack>);
                const expectedClass = `gap${gapSize.charAt(0).toUpperCase() + gapSize.slice(1)}`;
                expect((container.firstChild as HTMLElement).className).toContain(expectedClass);
            }
        );
    });

    describe('alignment', () => {
        it.each(['start', 'center', 'end', 'stretch', 'baseline'] as const)(
            'applies %s align class',
            (alignValue) => {
                const { container } = render(<DynStack align={alignValue}>Content</DynStack>);
                const expectedClass = `align${alignValue.charAt(0).toUpperCase() + alignValue.slice(1)}`;
                expect((container.firstChild as HTMLElement).className).toContain(expectedClass);
            }
        );
    });

    describe('justification', () => {
        it.each(['start', 'center', 'end', 'between', 'around', 'evenly'] as const)(
            'applies %s justify class',
            (justifyValue) => {
                const { container } = render(<DynStack justify={justifyValue}>Content</DynStack>);
                const expectedClass = `justify${justifyValue.charAt(0).toUpperCase() + justifyValue.slice(1)}`;
                expect((container.firstChild as HTMLElement).className).toContain(expectedClass);
            }
        );
    });

    it('applies wrap class when wrap is true', () => {
        const { container } = render(<DynStack wrap>Content</DynStack>);
        expect((container.firstChild as HTMLElement).className).toContain('wrap');
    });

    it('applies noWrap class when wrap is false', () => {
        const { container } = render(<DynStack wrap={false}>Content</DynStack>);
        expect((container.firstChild as HTMLElement).className).toContain('noWrap');
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

    describe('multiple children', () => {
        it('renders multiple children correctly', () => {
            render(
                <DynStack>
                    <div>Child 1</div>
                    <div>Child 2</div>
                    <div>Child 3</div>
                </DynStack>
            );
            expect(screen.getByText('Child 1')).toBeInTheDocument();
            expect(screen.getByText('Child 2')).toBeInTheDocument();
            expect(screen.getByText('Child 3')).toBeInTheDocument();
        });
    });

    describe('combined props', () => {
        it('applies all layout props together', () => {
            const { container } = render(
                <DynStack
                    direction="horizontal"
                    gap="lg"
                    align="center"
                    justify="between"
                    wrap
                >
                    Content
                </DynStack>
            );
            const element = container.firstChild as HTMLElement;
            expect(element.className).toContain('horizontal');
            expect(element.className).toContain('gapLg');
            expect(element.className).toContain('alignCenter');
            expect(element.className).toContain('justifyBetween');
            expect(element.className).toContain('wrap');
        });
    });
});
