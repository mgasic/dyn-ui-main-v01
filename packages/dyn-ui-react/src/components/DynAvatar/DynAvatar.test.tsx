import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { testAccessibility } from '../../test-utils';
import { DynAvatar } from './DynAvatar';
import styles from './DynAvatar.module.css';

const getImageElement = () =>
  screen.getByTestId('dyn-avatar-image') as HTMLImageElement;

const getStyleClass = (className: string): string => {
  return (styles as Record<string, string>)[className] || '';
};

describe('DynAvatar', () => {
  describe('Basic Functionality', () => {
    it('renders with initials when no image provided', () => {
      render(<DynAvatar alt="John Doe" />);

      expect(screen.getByText('JD')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'John Doe');
    });

    it('renders with custom initials', () => {
      render(<DynAvatar alt="Test" initials="AB" />);
      expect(screen.getByText('AB')).toBeInTheDocument();
    });

    it('handles single name initials correctly', () => {
      render(<DynAvatar alt="John" />);
      expect(screen.getByText('J')).toBeInTheDocument();
    });

    it('handles empty alt gracefully', () => {
      render(<DynAvatar alt="" />);
      // Should show default icon when no initials can be generated
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('renders image when src provided', async () => {
      const mockSrc = 'https://example.com/avatar.jpg';
      render(<DynAvatar src={mockSrc} alt="User Avatar" />);

      const img = getImageElement();
      expect(img).toHaveAttribute('src', mockSrc);
      expect(img).toHaveAttribute('alt', '');

      fireEvent.load(img);

      await waitFor(() => {
        expect(img).toHaveClass(getStyleClass('avatar__image--loaded'));
      });
    });

    it('falls back to initials on image error', async () => {
      render(<DynAvatar src="invalid-url.jpg" alt="John Doe" />);

      const img = getImageElement();
      fireEvent.error(img);

      await waitFor(() => {
        expect(screen.getByText('JD')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<DynAvatar alt="Accessible avatar" />);
      await testAccessibility(container);
    });

    it('has proper role when non-interactive', () => {
      render(<DynAvatar alt="Profile picture" />);
      expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Profile picture');
    });

    it('has proper role when interactive', () => {
      render(<DynAvatar alt="Profile picture" onClick={() => { }} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Avatar for Profile picture');
    });

    it('supports custom aria-label', () => {
      render(<DynAvatar alt="Test" aria-label="Custom avatar label" />);
      expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Custom avatar label');
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <DynAvatar alt="User" aria-describedby="avatar-description" />
          <div id="avatar-description">Online user avatar</div>
        </>
      );
      expect(screen.getByRole('img')).toHaveAttribute('aria-describedby', 'avatar-description');
    });

    it('supports aria-labelledby', () => {
      render(
        <>
          <DynAvatar alt="User" aria-labelledby="avatar-label" />
          <div id="avatar-label">Profile picture</div>
        </>
      );
      expect(screen.getByRole('img')).toHaveAttribute('aria-labelledby', 'avatar-label');
    });

    it('announces loading state to screen readers', () => {
      render(<DynAvatar src="loading.jpg" alt="Loading avatar" />);
      expect(screen.getByText('Loading avatar')).toBeInTheDocument();
    });

    it('announces error state to screen readers', () => {
      render(<DynAvatar alt="Error avatar" error />);
      expect(screen.getByText('Avatar failed to load')).toBeInTheDocument();
    });

    it('sets aria-busy during loading', () => {
      render(<DynAvatar alt="Loading" loading />);
      expect(screen.getByRole('img')).toHaveAttribute('aria-busy', 'true');
    });

    it('includes status in aria-label', () => {
      render(<DynAvatar alt="John Doe" status="online" />);
      expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'John Doe (Online)');
    });

    it('sets data-status attribute', () => {
      render(<DynAvatar alt="User" status="busy" />);
      expect(screen.getByRole('img')).toHaveAttribute('data-status', 'busy');
    });
  });

  describe('Interactive Behavior', () => {
    it('handles click events', async () => {
      const handleClick = vi.fn();
      render(<DynAvatar alt="Clickable" onClick={handleClick} />);

      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard navigation', async () => {
      const handleClick = vi.fn();
      render(<DynAvatar alt="Keyboard nav" onClick={handleClick} />);

      const avatar = screen.getByRole('button');
      avatar.focus();

      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);

      await userEvent.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('has proper focus indicators', () => {
      render(<DynAvatar alt="Focusable" onClick={() => { }} />);
      const avatar = screen.getByRole('button');
      avatar.focus();
      expect(avatar).toHaveFocus();
    });

    it('has proper tabIndex for interactive avatars', () => {
      render(<DynAvatar alt="Interactive" onClick={() => { }} />);
      expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '0');
    });

    it('is not interactive without onClick', () => {
      render(<DynAvatar alt="Non-interactive" />);
      const avatar = screen.getByRole('img');

      expect(avatar).not.toHaveAttribute('tabIndex');
      expect(avatar).toHaveAttribute('role', 'img');
    });

    it('does not trigger click when not interactive', async () => {
      const handleClick = vi.fn();
      render(<DynAvatar alt="Non-interactive" />);

      await userEvent.click(screen.getByRole('img'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Sizes and Variants', () => {
    it('applies size classes correctly', () => {
      const { rerender } = render(<DynAvatar alt="Test" size="sm" />);
      expect(screen.getByRole('img')).toHaveClass(getStyleClass('avatar--sm'));

      rerender(<DynAvatar alt="Test" size="lg" />);
      expect(screen.getByRole('img')).toHaveClass(getStyleClass('avatar--lg'));
    });

    it('applies default medium size when not specified', () => {
      render(<DynAvatar alt="Test" />);
      expect(screen.getByRole('img')).toHaveClass(getStyleClass('avatar--md'));
    });

    it('applies shape classes correctly', () => {
      const { rerender } = render(<DynAvatar alt="Test" shape="square" />);
      expect(screen.getByRole('img')).toHaveClass(getStyleClass('avatar--square')!);

      rerender(<DynAvatar alt="Test" shape="rounded" />);
      expect(screen.getByRole('img')).toHaveClass(getStyleClass('avatar--rounded')!);
    });

    it('applies default circle shape when not specified', () => {
      render(<DynAvatar alt="Test" />);
      expect(screen.getByRole('img')).toHaveClass(getStyleClass('avatar--circle'));
    });

    it('applies status classes correctly', () => {
      const { rerender } = render(<DynAvatar alt="Test" status="online" />);
      expect(screen.getByRole('img')).toHaveClass(getStyleClass('avatar--online'));

      rerender(<DynAvatar alt="Test" status="busy" />);
      expect(screen.getByRole('img')).toHaveClass(getStyleClass('avatar--busy'));
    });
  });

  describe('Loading and Error States', () => {
    it('shows loading state', () => {
      render(<DynAvatar alt="Loading" loading />);
      expect(screen.getByRole('img')).toHaveClass(getStyleClass('avatar--loading'));
      expect(screen.getByText('Loading avatar')).toBeInTheDocument();
    });

    it('shows error state', () => {
      render(<DynAvatar alt="Error" error />);
      expect(screen.getByRole('img')).toHaveClass(getStyleClass('avatar--error'));
      expect(screen.getByText('Avatar failed to load')).toBeInTheDocument();
    });

    it('shows loading state when image is loading', () => {
      render(<DynAvatar src="loading.jpg" alt="Loading" />);
      expect(screen.getByRole('img')).toHaveClass(getStyleClass('avatar--loading'));
    });

    it('combines error and loading states correctly', () => {
      render(<DynAvatar alt="Error Loading" error loading />);
      const avatar = screen.getByRole('img');
      expect(avatar).toHaveClass(getStyleClass('avatar--error'));
      expect(avatar).toHaveClass(getStyleClass('avatar--loading'));
    });
  });

  describe('Custom Fallback', () => {
    it('renders custom fallback content', () => {
      const customFallback = <span data-testid="custom-fallback">CF</span>;
      render(<DynAvatar alt="Custom" fallback={customFallback} />);
      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    });

    it('prefers fallback over children', () => {
      const customFallback = <span data-testid="fallback">FB</span>;
      const children = <span data-testid="children">CH</span>;
      render(
        <DynAvatar alt="Test" fallback={customFallback}>
          {children}
        </DynAvatar>
      );
      expect(screen.getByTestId('fallback')).toBeInTheDocument();
      expect(screen.queryByTestId('children')).not.toBeInTheDocument();
    });

    it('uses children when no fallback or initials', () => {
      const children = <span data-testid="children">CH</span>;
      render(
        <DynAvatar alt="">
          {children}
        </DynAvatar>
      );
      expect(screen.getByTestId('children')).toBeInTheDocument();
    });
  });

  describe('Image Loading', () => {
    it('sets loading strategy correctly', () => {
      render(<DynAvatar src="test.jpg" alt="Test" imageLoading="lazy" />);
      expect(getImageElement()).toHaveAttribute('loading', 'lazy');
    });

    it('defaults to eager loading', () => {
      render(<DynAvatar src="test.jpg" alt="Test" />);
      expect(getImageElement()).toHaveAttribute('loading', 'eager');
    });

    it('passes through image props', () => {
      render(
        <DynAvatar
          src="test.jpg"
          alt="Test"
          imageProps={{ crossOrigin: 'anonymous' }}
        />
      );
      expect(getImageElement()).toHaveAttribute('crossorigin', 'anonymous');
    });

    it('handles image load events', async () => {
      const onLoad = vi.fn();
      render(
        <DynAvatar
          src="test.jpg"
          alt="Test"
          imageProps={{ onLoad }}
        />
      );

      const img = getImageElement();
      fireEvent.load(img);

      await waitFor(() => {
        expect(onLoad).toHaveBeenCalled();
      });
    });

    it('handles image error events', async () => {
      const onError = vi.fn();
      render(
        <DynAvatar
          src="invalid.jpg"
          alt="Test"
          imageProps={{ onError }}
        />
      );

      const img = getImageElement();
      fireEvent.error(img);

      await waitFor(() => {
        expect(onError).toHaveBeenCalled();
      });
    });
  });

  describe('Props and Customization', () => {
    it('applies custom className', () => {
      render(<DynAvatar alt="Test" className="custom-class" />);
      expect(screen.getByRole('img')).toHaveClass('custom-class');
    });

    it('sets custom id', () => {
      render(<DynAvatar alt="Test" id="custom-id" />);
      expect(screen.getByRole('img')).toHaveAttribute('id', 'custom-id');
    });

    it('sets custom test id', () => {
      render(<DynAvatar alt="Test" data-testid="custom-testid" />);
      expect(screen.getByTestId('custom-testid')).toBeInTheDocument();
    });

    it('forwards additional props', () => {
      render(<DynAvatar alt="Test" data-custom="value" />);
      expect(screen.getByRole('img')).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('Badge Prop', () => {
    it('renders simple badge content (number)', () => {
      render(<DynAvatar alt="User" badge={5} />);
      expect(screen.getByTestId('dyn-avatar-badge')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders simple badge content (string)', () => {
      render(<DynAvatar alt="User" badge="New" />);
      expect(screen.getByTestId('dyn-avatar-badge')).toBeInTheDocument();
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders badge with DynBadge config object', () => {
      render(
        <DynAvatar
          alt="User"
          badge={{ content: '99+', color: 'danger', variant: 'solid' }}
        />
      );
      expect(screen.getByTestId('dyn-avatar-badge')).toBeInTheDocument();
      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('renders custom React element as badge', () => {
      render(
        <DynAvatar
          alt="User"
          badge={<span data-testid="custom-badge-element">✓</span>}
        />
      );
      expect(screen.getByTestId('dyn-avatar-badge')).toBeInTheDocument();
      expect(screen.getByTestId('custom-badge-element')).toBeInTheDocument();
    });

    it('does not render badge when badge prop is undefined', () => {
      render(<DynAvatar alt="User" />);
      expect(screen.queryByTestId('dyn-avatar-badge')).not.toBeInTheDocument();
    });
  });

  describe('loadTimeout and onImageError Props', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('uses custom loadTimeout', async () => {
      const onImageError = vi.fn();
      render(
        <DynAvatar
          src="slow-loading.jpg"
          alt="Test"
          loadTimeout={5000}
          onImageError={onImageError}
        />
      );

      // Advance time less than timeout - should not trigger error
      vi.advanceTimersByTime(4000);
      expect(onImageError).not.toHaveBeenCalled();

      // Advance past timeout - should trigger error
      vi.advanceTimersByTime(2000);
      expect(onImageError).toHaveBeenCalledWith({ type: 'timeout' });
    });

    it('calls onImageError on image load failure', async () => {
      const onImageError = vi.fn();
      render(
        <DynAvatar
          src="invalid.jpg"
          alt="Test"
          onImageError={onImageError}
        />
      );

      const img = getImageElement();
      fireEvent.error(img);

      await waitFor(() => {
        expect(onImageError).toHaveBeenCalled();
      });
    });

    it('clears timeout on successful image load', async () => {
      const onImageError = vi.fn();
      render(
        <DynAvatar
          src="valid.jpg"
          alt="Test"
          loadTimeout={5000}
          onImageError={onImageError}
        />
      );

      const img = getImageElement();

      // Simulate successful load before timeout
      vi.advanceTimersByTime(2000);
      fireEvent.load(img);

      // Advance past original timeout
      vi.advanceTimersByTime(5000);

      // Should not have called error handler since image loaded successfully
      expect(onImageError).not.toHaveBeenCalled();
    });

    it('defaults to 10000ms timeout when loadTimeout not specified', async () => {
      const onImageError = vi.fn();
      render(
        <DynAvatar
          src="slow.jpg"
          alt="Test"
          onImageError={onImageError}
        />
      );

      // At 9.9 seconds, should not trigger
      vi.advanceTimersByTime(9900);
      expect(onImageError).not.toHaveBeenCalled();

      // At 10+ seconds, should trigger
      vi.advanceTimersByTime(200);
      expect(onImageError).toHaveBeenCalledWith({ type: 'timeout' });
    });
  });
});
