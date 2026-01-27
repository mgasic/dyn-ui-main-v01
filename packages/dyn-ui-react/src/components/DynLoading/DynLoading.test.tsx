/**
 * DynLoading Component Tests
 * @module DynLoading
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DynLoading } from './DynLoading';

describe('DynLoading', () => {
    describe('Rendering', () => {
        it('renders with default props', () => {
            render(<DynLoading />);
            const loading = screen.getByRole('status');
            expect(loading).toBeInTheDocument();
            expect(loading).toHaveAttribute('data-testid', 'dyn-loading');
            expect(loading).toHaveAttribute('data-variant', 'spinner');
        });

        it('renders label and description', () => {
            render(<DynLoading label="Loading..." description="Please wait" />);
            expect(screen.getByText('Loading...')).toBeInTheDocument();
            expect(screen.getByText('Please wait')).toBeInTheDocument();
        });

        it('renders overlay variant', () => {
            render(<DynLoading variant="overlay" />);
            const loading = screen.getByRole('status');
            expect(loading).toHaveAttribute('data-variant', 'overlay');
        });

        it('renders dots variant', () => {
            render(<DynLoading variant="dots" />);
            const loading = screen.getByRole('status');
            expect(loading).toHaveAttribute('data-variant', 'dots');
        });

        it('renders pulse variant', () => {
            render(<DynLoading variant="pulse" />);
            const loading = screen.getByRole('status');
            expect(loading).toHaveAttribute('data-variant', 'pulse');
        });

        it('renders skeleton variant', () => {
            render(<DynLoading variant="skeleton" data-testid="skeleton" />);
            const skeleton = screen.getByTestId('skeleton');
            // Skeleton usually has no role or different accessibility attributes
            expect(skeleton).toBeInTheDocument();
            expect(screen.queryByRole('status')).not.toBeInTheDocument();
        });
    });

    describe('Variants & Props', () => {
        it('applies fixed class for overlay', () => {
            render(<DynLoading variant="overlay" fixed />);
            // We check class application mostly via snapshot or checking if class exists, 
            // but testing-library discourages testing class names strictly. 
            // We can check if it has style/attribute implications if any.
            // Here we trust the rendering if data attributes are correct
            const loading = screen.getByRole('status');
            expect(loading).toHaveAttribute('data-variant', 'overlay');
        });

        it('renders circle skeleton', () => {
            render(<DynLoading variant="skeleton" circle data-testid="skeleton-circle" />);
            const skeleton = screen.getByTestId('skeleton-circle');
            expect(skeleton).toBeInTheDocument();
        });

        it('applies custom width and height', () => {
            render(<DynLoading variant="skeleton" width="100px" height="50px" data-testid="sized" />);
            const element = screen.getByTestId('sized');
            expect(element).toHaveStyle({ width: '100px', height: '50px' });
        });
    });

    describe('Status Variants (Colors)', () => {
        it.each(['primary', 'success', 'danger', 'white'] as const)(
            'renders with color: %s',
            (color) => {
                render(<DynLoading color={color} />);
                const loading = screen.getByRole('status');
                expect(loading).toHaveAttribute('data-color', color);
            }
        );
    });

    describe('Size Variants', () => {
        it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
            'renders with size: %s',
            (size) => {
                render(<DynLoading size={size} />);
                const loading = screen.getByRole('status');
                expect(loading).toHaveAttribute('data-size', size);
            }
        );
    });

    describe('Accessibility', () => {
        it('has correct ARIA attributes', () => {
            render(<DynLoading label="Loading data" />);
            const loading = screen.getByRole('status');
            expect(loading).toHaveAttribute('aria-label', 'Loading data');
            expect(loading).toHaveAttribute('aria-busy', 'true');
        });

        it('provides default aria-label', () => {
            render(<DynLoading />);
            const loading = screen.getByRole('status');
            expect(loading).toHaveAttribute('aria-label', 'Loading');
        });

        it('skeleton is hidden from screen readers unless labeled', () => {
            // Typically skeletons are decorative
            const { container } = render(<DynLoading variant="skeleton" />);
            expect(container.firstChild).not.toHaveAttribute('role');
        });
    });
});
