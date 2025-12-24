import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DinComponentTemplate } from './DinComponentTemplate';

expect.extend(toHaveNoViolations);

describe('DinComponentTemplate', () => {
  /* ============================================
     RENDERING TESTS
     ============================================ */

  it('trebalo bi da se renderira sa default props-ima', () => {
    render(<DinComponentTemplate>Test Content</DinComponentTemplate>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('trebalo bi da se renderira sa children-om', () => {
    render(
      <DinComponentTemplate variant="primary">
        Custom Content
      </DinComponentTemplate>
    );
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  /* ============================================
     VARIANT TESTS
     ============================================ */

  it('trebalo bi da ima primary variant', () => {
    const { container } = render(
      <DinComponentTemplate variant="primary">Primary</DinComponentTemplate>
    );
    const element = container.firstChild;
    expect(element).toHaveClass('variantPrimary');
  });

  it('trebalo bi da ima secondary variant', () => {
    const { container } = render(
      <DinComponentTemplate variant="secondary">Secondary</DinComponentTemplate>
    );
    const element = container.firstChild;
    expect(element).toHaveClass('variantSecondary');
  });

  it('trebalo bi da ima tertiary variant', () => {
    const { container } = render(
      <DinComponentTemplate variant="tertiary">Tertiary</DinComponentTemplate>
    );
    const element = container.firstChild;
    expect(element).toHaveClass('variantTertiary');
  });

  /* ============================================
     SIZE TESTS
     ============================================ */

  it('trebalo bi da ima small size', () => {
    const { container } = render(
      <DinComponentTemplate size="small">Small</DinComponentTemplate>
    );
    const element = container.firstChild;
    expect(element).toHaveClass('sizeSmall');
  });

  it('trebalo bi da ima medium size (default)', () => {
    const { container } = render(
      <DinComponentTemplate size="medium">Medium</DinComponentTemplate>
    );
    const element = container.firstChild;
    expect(element).toHaveClass('sizeMedium');
  });

  it('trebalo bi da ima large size', () => {
    const { container } = render(
      <DinComponentTemplate size="large">Large</DinComponentTemplate>
    );
    const element = container.firstChild;
    expect(element).toHaveClass('sizeLarge');
  });

  /* ============================================
     STATE TESTS
     ============================================ */

  it('trebalo bi da ima disabled state', () => {
    const { container } = render(
      <DinComponentTemplate disabled>Disabled</DinComponentTemplate>
    );
    const element = container.firstChild;
    expect(element).toHaveClass('disabled');
    expect(element).toHaveAttribute('aria-disabled', 'true');
  });

  it('trebalo bi da nema disabled state kada je disabled=false', () => {
    const { container } = render(
      <DinComponentTemplate disabled={false}>Enabled</DinComponentTemplate>
    );
    const element = container.firstChild;
    expect(element).not.toHaveClass('disabled');
    expect(element).toHaveAttribute('aria-disabled', 'false');
  });

  /* ============================================
     PROP TESTS
     ============================================ */

  it('trebalo bi da prima className prop', () => {
    const { container } = render(
      <DinComponentTemplate className="custom-class">Test</DinComponentTemplate>
    );
    const element = container.firstChild;
    expect(element).toHaveClass('custom-class');
  });

  it('trebalo bi da prima ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<DinComponentTemplate ref={ref}>Test</DinComponentTemplate>);
    expect(ref.current).toBeInTheDocument();
  });

  /* ============================================
     ACCESSIBILITY TESTS
     ============================================ */

  it('trebalo bi da bude accessible (axe)', async () => {
    const { container } = render(
      <DinComponentTemplate variant="primary">
        Accessible Component
      </DinComponentTemplate>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('trebalo bi da ima role="region"', () => {
    const { container } = render(
      <DinComponentTemplate>Test</DinComponentTemplate>
    );
    const element = container.firstChild;
    expect(element).toHaveAttribute('role', 'region');
  });

  it('trebalo bi da bude keyboard navigable (disabled state)', () => {
    render(
      <DinComponentTemplate disabled data-testid="disabled-comp">
        Disabled
      </DinComponentTemplate>
    );
    const element = screen.getByTestId('disabled-comp');
    expect(element).toHaveAttribute('aria-disabled', 'true');
  });

  /* ============================================
     COMBINATION TESTS
     ============================================ */

  it('trebalo bi da ima sve kombinacije variant + size', () => {
    const variants = ['primary', 'secondary', 'tertiary'] as const;
    const sizes = ['small', 'medium', 'large'] as const;

    variants.forEach((variant) => {
      sizes.forEach((size) => {
        const { container } = render(
          <DinComponentTemplate variant={variant} size={size}>
            {variant}-{size}
          </DinComponentTemplate>
        );
        const element = container.firstChild;
        expect(element).toHaveClass(`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`);
        expect(element).toHaveClass(`size${size.charAt(0).toUpperCase() + size.slice(1)}`);
      });
    });
  });

  /* ============================================
     SNAPSHOT TESTS
     ============================================ */

  it('trebalo bi da matchuje snapshot (primary)', () => {
    const { container } = render(
      <DinComponentTemplate variant="primary" size="medium">
        Primary Button
      </DinComponentTemplate>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('trebalo bi da matchuje snapshot (disabled)', () => {
    const { container } = render(
      <DinComponentTemplate disabled>Disabled</DinComponentTemplate>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
