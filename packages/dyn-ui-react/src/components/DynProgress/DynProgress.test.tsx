/**
 * DynProgress Component Tests
 * @module DynProgress
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DynProgress } from './DynProgress';

describe('DynProgress', () => {
    describe('Rendering', () => {
        it('renders with default props', () => {
            render(<DynProgress />);
            const progress = screen.getByRole('progressbar');
            expect(progress).toBeInTheDocument();
            expect(progress).toHaveAttribute('data-testid', 'dyn-progress');
        });

        it('renders with value', () => {
            render(<DynProgress value={50} />);
            const progress = screen.getByRole('progressbar');
            expect(progress).toHaveAttribute('aria-valuenow', '50');
        });

        it('renders with label', () => {
            render(<DynProgress value={50} label="Loading..." />);
            expect(screen.getByText('Loading...')).toBeInTheDocument();
        });

        it('renders with percentage', () => {
            render(<DynProgress value={75} showPercentage />);
            expect(screen.getByText('75%')).toBeInTheDocument();
        });

        it('renders indeterminate mode', () => {
            render(<DynProgress indeterminate />);
            const progress = screen.getByRole('progressbar');
            expect(progress).toHaveAttribute('data-indeterminate', 'true');
            expect(progress).toHaveAttribute('aria-busy', 'true');
        });
    });

    describe('Value Calculation', () => {
        it('clamps value to min/max range', () => {
            render(<DynProgress value={150} max={100} />);
            const progress = screen.getByRole('progressbar');
            expect(progress).toHaveAttribute('aria-valuenow', '100');
        });

        it('handles custom min/max', () => {
            render(<DynProgress value={50} min={0} max={200} />);
            const progress = screen.getByRole('progressbar');
            expect(progress).toHaveAttribute('aria-valuenow', '50');
            expect(progress).toHaveAttribute('aria-valuemin', '0');
            expect(progress).toHaveAttribute('aria-valuemax', '200');
        });

        it('handles negative min value', () => {
            render(<DynProgress value={0} min={-100} max={100} />);
            const progress = screen.getByRole('progressbar');
            expect(progress).toHaveAttribute('aria-valuenow', '0');
        });
    });

    describe('Status Variants', () => {
        it.each(['default', 'success', 'error', 'warning', 'info'] as const)(
            'renders with status: %s',
            (status) => {
                render(<DynProgress status={status} />);
                const progress = screen.getByRole('progressbar');
                expect(progress).toHaveAttribute('data-status', status);
            }
        );
    });

    describe('Size Variants', () => {
        it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
            'renders with size: %s',
            (size) => {
                render(<DynProgress size={size} />);
                const progress = screen.getByRole('progressbar');
                expect(progress).toHaveAttribute('data-size', size);
            }
        );
    });

    describe('Accessibility', () => {
        it('has correct ARIA attributes', () => {
            render(<DynProgress value={50} aria-label="Upload progress" />);
            const progress = screen.getByRole('progressbar');
            expect(progress).toHaveAttribute('aria-valuenow', '50');
            expect(progress).toHaveAttribute('aria-valuemin', '0');
            expect(progress).toHaveAttribute('aria-valuemax', '100');
            expect(progress).toHaveAttribute('aria-label', 'Upload progress');
        });

        it('provides default aria-label from label prop', () => {
            render(<DynProgress value={50} label="Downloading" />);
            const progress = screen.getByRole('progressbar');
            expect(progress).toHaveAttribute('aria-label', 'Downloading');
        });

        it('has screen reader text', () => {
            render(<DynProgress value={75} />);
            expect(screen.getByText('75% complete')).toBeInTheDocument();
        });

        it('shows loading text for indeterminate', () => {
            render(<DynProgress indeterminate />);
            expect(screen.getByText('Loading...')).toBeInTheDocument();
        });
    });

    describe('Custom Format', () => {
        it('uses custom format function', () => {
            const formatValue = (value: number) => `${value} MB / 100 MB`;
            render(<DynProgress value={50} formatValue={formatValue} showPercentage />);
            expect(screen.getByText('50 MB / 100 MB')).toBeInTheDocument();
        });
    });

    describe('Props', () => {
        it('applies custom className', () => {
            render(<DynProgress className="custom-class" />);
            const progress = screen.getByRole('progressbar');
            expect(progress).toHaveClass('custom-class');
        });

        it('applies custom data-testid', () => {
            render(<DynProgress data-testid="my-progress" />);
            expect(screen.getByTestId('my-progress')).toBeInTheDocument();
        });

        it('forwards ref', () => {
            const ref = { current: null };
            render(<DynProgress ref={ref} />);
            expect(ref.current).toBeInstanceOf(HTMLDivElement);
        });
    });
});
