import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DynContainer } from './DynContainer';
import styles from './DynContainer.module.css';

// Helper to get class name from module
const getStyleClass = (className: string) => styles[className] || className;

describe('DynContainer', () => {
  it('exports a React component', () => {
    expect(DynContainer).toBeDefined();
  });

  it('renders children correctly', () => {
    render(
      <DynContainer>
        <div>Test content</div>
      </DynContainer>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders title and subtitle when provided', () => {
    render(
      <DynContainer title="Section Title" subtitle="Supporting copy">
        <div>Content</div>
      </DynContainer>
    );

    expect(screen.getByText('Section Title')).toBeInTheDocument();
    expect(screen.getByText('Supporting copy')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <DynContainer className="custom-container">
        <div>Content</div>
      </DynContainer>
    );

    expect(screen.getByTestId('dyn-container')).toHaveClass('custom-container');
  });

  it('applies layout modifiers through props', () => {
    render(
      <DynContainer spacing="lg" size="large" direction="horizontal" align="center" justify="between">
        <div>Content</div>
      </DynContainer>
    );

    const element = screen.getByTestId('dyn-container');

    // Mapped classes:
    // spacing="lg" -> spacingLg
    // size="large" -> sizeLg (via SIZE_MAP)
    // direction="horizontal" -> directionHorizontal
    // align="center" -> alignCenter
    // justify="between" -> justifyBetween

    expect(element.className).toMatch(/spacingLg/);
    expect(element.className).toMatch(/sizeLg/);
    expect(element.className).toMatch(/directionHorizontal/);
    expect(element.className).toMatch(/alignCenter/);
    expect(element.className).toMatch(/justifyBetween/);
  });

  it('respects legacy noBorder and noPadding flags', () => {
    render(
      <DynContainer noBorder noPadding bordered shadow>
        <div>Content</div>
      </DynContainer>
    );

    const element = screen.getByTestId('dyn-container');

    expect(element.className).not.toMatch(/bordered/);
    expect(element.className).toMatch(/noPadding/);
  });

  it('supports fixed layout with token-based maxWidth and spacing overrides', () => {
    render(
      <DynContainer layout="fixed" maxWidth="md" padding="lg" margin="sm">
        <div>Content</div>
      </DynContainer>
    );

    const element = screen.getByTestId('dyn-container');

    expect(element.className).toMatch(/layoutFixed/);
    // Inline styles for overrides
    expect(element.style.getPropertyValue('--dyn-container-max-width')).toMatch(/var\(--dyn-container-max-width-md\)/);
    // padding="lg" -> resolved strict variable
    expect(element.style.getPropertyValue('--dyn-container-padding')).toBe(
      'var(--dyn-spacing-lg)'
    );
    // margin="sm" -> resolved strict variable
    expect(element.style.getPropertyValue('--dyn-container-margin')).toBe(
      'var(--dyn-spacing-sm)'
    );
  });

  it('accepts numeric spacing overrides', () => {
    render(
      <DynContainer padding={24} margin={16} maxWidth={720}>
        <div>Content</div>
      </DynContainer>
    );

    const element = screen.getByTestId('dyn-container');

    expect(element.style.getPropertyValue('--dyn-container-padding')).toBe('24px');
    expect(element.style.getPropertyValue('--dyn-container-margin')).toBe('16px');
    expect(element.style.maxWidth).toBe('720px');
  });
});
