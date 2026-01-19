import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DynStack } from './DynStack';
import React from 'react';

describe('DynStack', () => {
    it('renders vertical stack by default', () => {
        const { container } = render(<DynStack>Content</DynStack>);
        expect((container.firstChild as HTMLElement).className).toContain('vertical');
    });

    it('applies gap classes correctly', () => {
        const { container } = render(<DynStack gap="sm">Content</DynStack>);
        expect((container.firstChild as HTMLElement).className).toContain('gapSm');
    });

    it('renders as a custom component', () => {
        const { container } = render(<DynStack as="ul"><li>Item</li></DynStack>);
        expect(container.querySelector('ul')).toBeInTheDocument();
        expect(container.querySelector('li')).toBeInTheDocument();
    });
});
