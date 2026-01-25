import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ThemeProvider, type Theme } from '../../theme/ThemeProvider';

// Wrapper to provide theme context
const renderWithTheme = (ui: React.ReactElement, initialTheme: Theme = 'light') => {
  return render(
    <ThemeProvider initialTheme={initialTheme}>
      {ui}
    </ThemeProvider>
  );
};

describe('ThemeSwitcher', () => {
  it('renders with default props', () => {
    renderWithTheme(<ThemeSwitcher />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders available themes as buttons', () => {
    renderWithTheme(<ThemeSwitcher />);
    expect(screen.getByRole('tab', { name: /light/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /dark/i })).toBeInTheDocument();
  });

  it('marks current theme as selected', () => {
    renderWithTheme(<ThemeSwitcher />, 'light');
    const lightButton = screen.getByRole('tab', { name: /light/i });
    expect(lightButton).toHaveAttribute('aria-selected', 'true');
  });

  it('calls onChange when theme is changed', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    renderWithTheme(<ThemeSwitcher onChange={handleChange} />, 'light');

    await user.click(screen.getByRole('tab', { name: /dark/i }));
    expect(handleChange).toHaveBeenCalledWith('dark');
  });

  it('updates active state on click', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeSwitcher />, 'light');

    const darkButton = screen.getByRole('tab', { name: /dark/i });
    await user.click(darkButton);

    expect(darkButton).toHaveAttribute('aria-selected', 'true');
  });

  it('renders custom labels', () => {
    renderWithTheme(
      <ThemeSwitcher labels={{ light: 'Day Mode', dark: 'Night Mode' }} />
    );
    expect(screen.getByRole('tab', { name: 'Day Mode' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Night Mode' })).toBeInTheDocument();
  });

  it('renders only specified themes', () => {
    renderWithTheme(<ThemeSwitcher themes={['light', 'dark']} />);
    expect(screen.getByRole('tab', { name: /light/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /dark/i })).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: /system/i })).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    renderWithTheme(<ThemeSwitcher className="custom-class" />);
    expect(screen.getByRole('tablist')).toHaveClass('custom-class');
  });

  describe('sizes', () => {
    it.each(['sm', 'md'] as const)('applies %s size class', (size) => {
      renderWithTheme(<ThemeSwitcher size={size} />);
      const buttons = screen.getAllByRole('tab');
      buttons.forEach(button => {
        expect(button.className).toContain(`size-${size}`);
      });
    });
  });

  describe('rounded variants', () => {
    it.each(['sm', 'md', 'lg', 'full'] as const)('applies %s rounded class', (rounded) => {
      renderWithTheme(<ThemeSwitcher rounded={rounded} />);
      expect(screen.getByRole('tablist').className).toContain(`rounded-${rounded}`);
    });
  });

  describe('accessibility', () => {
    it('has aria-label for the container', () => {
      renderWithTheme(<ThemeSwitcher />);
      expect(screen.getByRole('tablist')).toHaveAttribute('aria-label', 'Theme switcher');
    });

    it('buttons have role="tab"', () => {
      renderWithTheme(<ThemeSwitcher />);
      const buttons = screen.getAllByRole('tab');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('buttons have aria-selected attribute', () => {
      renderWithTheme(<ThemeSwitcher />);
      const buttons = screen.getAllByRole('tab');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-selected');
      });
    });

    it('buttons have type="button"', () => {
      renderWithTheme(<ThemeSwitcher />);
      const buttons = screen.getAllByRole('tab');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });

    it('can be navigated with keyboard', async () => {
      const user = userEvent.setup();
      renderWithTheme(<ThemeSwitcher />);

      const lightButton = screen.getByRole('tab', { name: /light/i });
      lightButton.focus();

      expect(document.activeElement).toBe(lightButton);
    });
  });

  describe('displayName', () => {
    it('has correct displayName', () => {
      expect(ThemeSwitcher.displayName).toBe('ThemeSwitcher');
    });
  });
});
