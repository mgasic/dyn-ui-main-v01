import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DynFlex } from './DynFlex';
import React from 'react';

describe('DynFlex', () => {
    it('renders children correctly', () => {
        render(<DynFlex><span>Child</span></DynFlex>);
        expect(screen.getByText('Child')).toBeInTheDocument();
    });

    it('renders as different element using "as" prop', () => {
        const { container } = render(<DynFlex as="section">Content</DynFlex>);
        expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('applies correct direction class', () => {
        const { container } = render(<DynFlex direction="column">Content</DynFlex>);
        expect((container.firstChild as HTMLElement).className).toContain('flexColumn');
    });

    it('applies gap classes', () => {
        const { container } = render(<DynFlex gap="lg">Content</DynFlex>);
        expect((container.firstChild as HTMLElement).className).toContain('gapLarge');
    });


});
