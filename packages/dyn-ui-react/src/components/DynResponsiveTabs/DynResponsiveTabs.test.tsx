import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { DynResponsiveTabs } from './DynResponsiveTabs';
import type { DynResponsiveTabItem } from './DynResponsiveTabs.types';
import { resetIdCounters } from '../../utils/accessibility';
import styles from './DynResponsiveTabs.module.css';

const classes = styles as Record<string, string>;

describe('DynResponsiveTabs', () => {
  const mockTabs: DynResponsiveTabItem[] = [
    { label: 'Tab 1', content: <div>Content 1</div> },
    { label: 'Tab 2', content: <div>Content 2</div> },
    { label: 'Tab 3', content: <div>Content 3</div> },
  ];

  beforeEach(() => {
    resetIdCounters();
    // Reset matchMedia mock
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  describe('Basic Functionality', () => {
    it('renders without crashing', () => {
      render(<DynResponsiveTabs tabs={mockTabs} />);
      expect(screen.getByTestId('dyn-responsive-tabs')).toBeInTheDocument();
    });

    it('renders all tab labels', () => {
      render(<DynResponsiveTabs tabs={mockTabs} />);
      mockTabs.forEach((tab) => {
        expect(screen.getByText(tab.label)).toBeInTheDocument();
      });
    });

    it('shows first tab content by default', () => {
      render(<DynResponsiveTabs tabs={mockTabs} />);
      expect(screen.getByText('Content 1')).toBeVisible();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('respects defaultActive prop', () => {
      render(<DynResponsiveTabs tabs={mockTabs} defaultActive={1} />);
      expect(screen.getByText('Content 2')).toBeVisible();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    it('generates unique ID for each instance', () => {
      const { unmount } = render(
        <>
          <DynResponsiveTabs tabs={mockTabs} data-testid="tabs-1" />
          <DynResponsiveTabs tabs={mockTabs} data-testid="tabs-2" />
        </>
      );
      const id1 = screen.getByTestId('tabs-1').id;
      const id2 = screen.getByTestId('tabs-2').id;

      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);
      unmount();
    });

    it('uses provided ID when specified', () => {
      render(<DynResponsiveTabs tabs={mockTabs} id="custom-tabs" />);
      expect(screen.getByTestId('dyn-responsive-tabs')).toHaveAttribute('id', 'custom-tabs');
    });
  });

  describe('Tab Interaction', () => {
    it('switches tab on click', () => {
      render(<DynResponsiveTabs tabs={mockTabs} />);
      const tab2 = screen.getByTestId('dyn-responsive-tabs-tab-1');

      fireEvent.click(tab2);

      expect(screen.getByText('Content 2')).toBeVisible();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    it('calls onChange when tab is clicked', () => {
      const handleChange = vi.fn();
      render(<DynResponsiveTabs tabs={mockTabs} onChange={handleChange} />);

      const tab2 = screen.getByTestId('dyn-responsive-tabs-tab-1');
      fireEvent.click(tab2);

      expect(handleChange).toHaveBeenCalledWith(1);
    });

    it('does not switch to disabled tab', () => {
      const tabsWithDisabled = [
        ...mockTabs,
        { label: 'Disabled Tab', content: <div>Disabled</div>, disabled: true },
      ];
      render(<DynResponsiveTabs tabs={tabsWithDisabled} />);

      const disabledTab = screen.getByTestId('dyn-responsive-tabs-tab-3');
      fireEvent.click(disabledTab);

      expect(screen.getByText('Content 1')).toBeVisible();
      expect(screen.queryByText('Disabled')).not.toBeInTheDocument();
    });

    it('disabled tab has proper attributes', () => {
      const tabsWithDisabled = [
        ...mockTabs,
        { label: 'Disabled Tab', content: <div>Disabled</div>, disabled: true },
      ];
      render(<DynResponsiveTabs tabs={tabsWithDisabled} />);

      const disabledTab = screen.getByTestId('dyn-responsive-tabs-tab-3');
      expect(disabledTab).toBeDisabled();
      expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Keyboard Navigation', () => {
    it('navigates to next tab with ArrowRight', () => {
      render(<DynResponsiveTabs tabs={mockTabs} />);
      const tab1 = screen.getByTestId('dyn-responsive-tabs-tab-0');

      tab1.focus();
      fireEvent.keyDown(tab1, { key: 'ArrowRight' });

      expect(screen.getByText('Content 2')).toBeVisible();
    });

    it('navigates to previous tab with ArrowLeft', () => {
      render(<DynResponsiveTabs tabs={mockTabs} defaultActive={1} />);
      const tab2 = screen.getByTestId('dyn-responsive-tabs-tab-1');

      tab2.focus();
      fireEvent.keyDown(tab2, { key: 'ArrowLeft' });

      expect(screen.getByText('Content 1')).toBeVisible();
    });

    it('navigates to first tab with Home key', () => {
      render(<DynResponsiveTabs tabs={mockTabs} defaultActive={2} />);
      const tab3 = screen.getByTestId('dyn-responsive-tabs-tab-2');

      tab3.focus();
      fireEvent.keyDown(tab3, { key: 'Home' });

      expect(screen.getByText('Content 1')).toBeVisible();
    });

    it('navigates to last tab with End key', () => {
      render(<DynResponsiveTabs tabs={mockTabs} />);
      const tab1 = screen.getByTestId('dyn-responsive-tabs-tab-0');

      tab1.focus();
      fireEvent.keyDown(tab1, { key: 'End' });

      expect(screen.getByText('Content 3')).toBeVisible();
    });

    it('wraps around when navigating past last tab', () => {
      render(<DynResponsiveTabs tabs={mockTabs} defaultActive={2} />);
      const tab3 = screen.getByTestId('dyn-responsive-tabs-tab-2');

      tab3.focus();
      fireEvent.keyDown(tab3, { key: 'ArrowRight' });

      expect(screen.getByText('Content 1')).toBeVisible();
    });

    it('wraps around when navigating before first tab', () => {
      render(<DynResponsiveTabs tabs={mockTabs} />);
      const tab1 = screen.getByTestId('dyn-responsive-tabs-tab-0');

      tab1.focus();
      fireEvent.keyDown(tab1, { key: 'ArrowLeft' });

      expect(screen.getByText('Content 3')).toBeVisible();
    });

    it('skips disabled tabs when navigating', () => {
      const tabsWithDisabled = [
        mockTabs[0],
        { ...mockTabs[1], disabled: true },
        mockTabs[2],
      ];
      render(<DynResponsiveTabs tabs={tabsWithDisabled} />);
      const tab1 = screen.getByTestId('dyn-responsive-tabs-tab-0');

      tab1.focus();
      fireEvent.keyDown(tab1, { key: 'ArrowRight' });

      // Should skip disabled tab 2 and go to tab 3
      expect(screen.getByText('Content 3')).toBeVisible();
    });
  });

  describe('Orientation', () => {
    it('renders horizontal orientation by default', () => {
      render(<DynResponsiveTabs tabs={mockTabs} />);
      const container = screen.getByTestId('dyn-responsive-tabs');
      // Horizontal is default, no specific class applied in current implementation
      expect(container).not.toHaveClass(classes.orientationVertical);
    });

    it('renders vertical orientation correctly', () => {
      render(<DynResponsiveTabs tabs={mockTabs} orientation="vertical" />);
      const container = screen.getByTestId('dyn-responsive-tabs');
      expect(container).toHaveClass(classes.orientationVertical);
    });

    it('sets proper ARIA orientation attribute', () => {
      render(<DynResponsiveTabs tabs={mockTabs} orientation="vertical" />);
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('Icons', () => {
    it('renders string icon names', () => {
      const tabsWithIcons: DynResponsiveTabItem[] = [
        { label: 'Home', icon: 'home', content: <div>Home content</div> },
      ];
      render(<DynResponsiveTabs tabs={tabsWithIcons} />);

      const tab = screen.getByTestId('dyn-responsive-tabs-tab-0');
      // Icon is now inside a span with role="img" or aria-hidden
      const icon = tab.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });

    it('renders custom React node icons', () => {
      const CustomIcon = () => <span data-testid="custom-icon">🎯</span>;
      const tabsWithCustomIcons: DynResponsiveTabItem[] = [
        { label: 'Custom', icon: <CustomIcon />, content: <div>Custom content</div> },
      ];
      render(<DynResponsiveTabs tabs={tabsWithCustomIcons} />);

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Nested Tabs', () => {
    it('renders nested tabs correctly', () => {
      const childTabs: DynResponsiveTabItem[] = [
        { label: 'Child 1', content: <div>Child content 1</div> },
        { label: 'Child 2', content: <div>Child content 2</div> },
      ];

      const parentTabs: DynResponsiveTabItem[] = [
        {
          label: 'Parent 1',
          content: (
            <DynResponsiveTabs
              tabs={childTabs}
              orientation="vertical"
              tabIdentifier="child-tabs"
              data-testid="child-tabs"
            />
          ),
        },
        { label: 'Parent 2', content: <div>Parent content 2</div> },
      ];

      render(
        <DynResponsiveTabs
          tabs={parentTabs}
          orientation="horizontal"
          tabIdentifier="parent-tabs"
          data-testid="parent-tabs"
        />
      );

      expect(screen.getByTestId('parent-tabs')).toBeInTheDocument();
      expect(screen.getByTestId('child-tabs')).toBeInTheDocument();
      expect(screen.getByText('Child content 1')).toBeVisible();
    });

    it('applies nested class when tabIdentifier is provided', () => {
      render(<DynResponsiveTabs tabs={mockTabs} tabIdentifier="nested" />);
      const container = screen.getByTestId('dyn-responsive-tabs');
      expect(container).toHaveClass(classes.nested);
    });

    it('maintains independent state for nested tabs', () => {
      const childTabs: DynResponsiveTabItem[] = [
        { label: 'Child 1', content: <div>Child content 1</div> },
        { label: 'Child 2', content: <div>Child content 2</div> },
      ];

      const parentTabs: DynResponsiveTabItem[] = [
        {
          label: 'Parent 1',
          content: (
            <DynResponsiveTabs
              tabs={childTabs}
              data-testid="child-tabs"
              tabIdentifier="child"
            />
          ),
        },
      ];

      render(<DynResponsiveTabs tabs={parentTabs} data-testid="parent-tabs" />);

      // Click child tab 2
      const childTab2 = screen.getByText('Child 2');
      fireEvent.click(childTab2);

      expect(screen.getByText('Child content 2')).toBeVisible();
      expect(screen.queryByText('Child content 1')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA roles', () => {
      render(<DynResponsiveTabs tabs={mockTabs} />);

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getAllByRole('tab')).toHaveLength(mockTabs.length);
      expect(screen.getAllByRole('tabpanel', { hidden: true })).toHaveLength(mockTabs.length);
    });

    it('sets aria-selected on active tab', () => {
      render(<DynResponsiveTabs tabs={mockTabs} defaultActive={1} />);

      const tabs = screen.getAllByRole('tab');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
      expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
    });

    it('sets aria-controls correctly', () => {
      render(<DynResponsiveTabs tabs={mockTabs} id="test-tabs" />);

      const tab1 = screen.getByTestId('dyn-responsive-tabs-tab-0');
      const panelId = tab1.getAttribute('aria-controls');

      expect(panelId).toBeTruthy();
      expect(screen.getByTestId('dyn-responsive-tabs-panel-0')).toHaveAttribute('id', panelId);
    });

    it('supports aria-label prop', () => {
      render(<DynResponsiveTabs tabs={mockTabs} aria-label="Main navigation" />);
      expect(screen.getByRole('tablist')).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('sets tabIndex correctly for active and inactive tabs', () => {
      render(<DynResponsiveTabs tabs={mockTabs} defaultActive={1} />);

      const tabs = screen.getAllByRole('tab');
      expect(tabs[1]).toHaveAttribute('tabIndex', '0'); // Active tab
      expect(tabs[0]).toHaveAttribute('tabIndex', '-1'); // Inactive tabs
      expect(tabs[2]).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Customization', () => {
    it('accepts custom className', () => {
      render(<DynResponsiveTabs tabs={mockTabs} className="custom-class" />);
      const container = screen.getByTestId('dyn-responsive-tabs');
      expect(container).toHaveClass('custom-class');
      expect(container).toHaveClass(classes.container);
    });

    it('accepts custom data-testid', () => {
      render(<DynResponsiveTabs tabs={mockTabs} data-testid="custom-tabs" />);
      expect(screen.getByTestId('custom-tabs')).toBeInTheDocument();
    });

    it('passes through additional HTML attributes', () => {
      render(<DynResponsiveTabs tabs={mockTabs} data-custom="value" />);
      const container = screen.getByTestId('dyn-responsive-tabs');
      expect(container).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty tabs array gracefully', () => {
      render(<DynResponsiveTabs tabs={[]} />);
      expect(screen.getByTestId('dyn-responsive-tabs')).toBeInTheDocument();
      expect(screen.queryByRole('tab')).not.toBeInTheDocument();
    });

    it('filters out invalid tab items', () => {
      const invalidTabs = [
        mockTabs[0],
        null as any,
        mockTabs[1],
        undefined as any,
        mockTabs[2],
      ];
      render(<DynResponsiveTabs tabs={invalidTabs} />);

      // Should only render valid tabs
      expect(screen.getAllByRole('tab')).toHaveLength(3);
    });

    it('handles defaultActive out of bounds', () => {
      render(<DynResponsiveTabs tabs={mockTabs} defaultActive={99} />);
      // Should not crash, but won't show any content
      expect(screen.getByTestId('dyn-responsive-tabs')).toBeInTheDocument();
    });

    it('handles negative defaultActive', () => {
      render(<DynResponsiveTabs tabs={mockTabs} defaultActive={-1} />);
      expect(screen.getByTestId('dyn-responsive-tabs')).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('uses tabs mode by default (non-mobile)', () => {
      render(<DynResponsiveTabs tabs={mockTabs} responsive={true} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('can disable responsive behavior', () => {
      render(<DynResponsiveTabs tabs={mockTabs} responsive={false} />);
      const container = screen.getByTestId('dyn-responsive-tabs');
      expect(container).not.toHaveClass(classes.accordion);
    });

    it('switches to accordion mode when window is narrow', () => {
      // Mock narrow window
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: true, // Simulate mobile
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      render(<DynResponsiveTabs tabs={mockTabs} responsive={true} breakpoint={768} />);

      // In accordion mode, tabs should not have tablist role
      expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
    });
  });

  describe('Collapse Functionality', () => {
    it('allows collapsing in accordion mode with allowCollapse', () => {
      // Force accordion mode
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(() => ({
          matches: true,
          media: '',
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const handleChange = vi.fn();
      render(
        <DynResponsiveTabs
          tabs={mockTabs}
          responsive={true}
          allowCollapse={true}
          onChange={handleChange}
          defaultActive={0}
        />
      );

      // Click the active accordion header
      const accordionHeader = screen.getByTestId('dyn-responsive-tabs-accordion-0');
      fireEvent.click(accordionHeader);

      // Should call onChange with -1 (collapsed state)
      expect(handleChange).toHaveBeenCalledWith(-1);
    });
  });
});
