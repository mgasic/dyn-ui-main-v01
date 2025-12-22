import React, { forwardRef, useState, useEffect, useMemo, useCallback } from 'react';
import type { KeyboardEventHandler } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import { DynIcon } from '../DynIcon';
import type {
  DynResponsiveTabsProps,
  DynResponsiveTabsRef,
  DynResponsiveTabsDefaultProps,
} from './DynResponsiveTabs.types';
import { DYN_RESPONSIVE_TABS_DEFAULT_PROPS } from './DynResponsiveTabs.types';
import styles from './DynResponsiveTabs.module.css';

/**
 * Safely access CSS module classes
 */
const getStyleClass = (className: string): string => {
  return (styles as Record<string, string>)[className] || '';
};

/**
 * Hook to detect responsive breakpoint
 */
const useResponsiveMode = (breakpoint: number, responsive: boolean): boolean => {
  const [isAccordion, setIsAccordion] = useState(() => {
    // Initial state based on current window size
    if (!responsive) return false;
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    if (!responsive) {
      setIsAccordion(false);
      return;
    }

    // Check immediately on mount
    const checkBreakpoint = () => {
      setIsAccordion(window.innerWidth <= breakpoint);
    };

    checkBreakpoint();

    // Use both matchMedia and resize for better compatibility
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsAccordion(e.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      // Also listen to resize for Storybook viewport changes
      window.addEventListener('resize', checkBreakpoint);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
        window.removeEventListener('resize', checkBreakpoint);
      };
    }
    // Legacy browsers
    else {
      mediaQuery.addListener(handleChange);
      window.addEventListener('resize', checkBreakpoint);
      return () => {
        mediaQuery.removeListener(handleChange);
        window.removeEventListener('resize', checkBreakpoint);
      };
    }
  }, [breakpoint, responsive]);

  return isAccordion;
};

/**
 * DynResponsiveTabs
 *
 * Responsive tabs component that transforms into accordion on smaller screens.
 * Supports nested tabs composition for complex layouts.
 * Follows DYN UI architecture, accessibility standards, and design token system.
 */
export const DynResponsiveTabs = forwardRef<DynResponsiveTabsRef, DynResponsiveTabsProps>(
  (
    {
      tabs,
      defaultActive = DYN_RESPONSIVE_TABS_DEFAULT_PROPS.defaultActive,
      orientation = DYN_RESPONSIVE_TABS_DEFAULT_PROPS.orientation,
      responsive = DYN_RESPONSIVE_TABS_DEFAULT_PROPS.responsive,
      breakpoint = DYN_RESPONSIVE_TABS_DEFAULT_PROPS.breakpoint,
      allowCollapse = DYN_RESPONSIVE_TABS_DEFAULT_PROPS.allowCollapse,
      expandIcon = DYN_RESPONSIVE_TABS_DEFAULT_PROPS.expandIcon,
      collapseIcon = DYN_RESPONSIVE_TABS_DEFAULT_PROPS.collapseIcon,
      tabIdentifier,
      onChange,
      className,
      id,
      'aria-label': ariaLabel,
      'data-testid': dataTestId,
      ...rest
    },
    ref
  ) => {
    // Generate unique ID for this tabs instance
    const internalId = useMemo(() => {
      return id || generateId(tabIdentifier ? `tabs-${tabIdentifier}` : 'responsive-tabs');
    }, [id, tabIdentifier]);

    const [activeIndex, setActiveIndex] = useState(defaultActive);
    const isAccordion = useResponsiveMode(breakpoint, responsive);

    // Validate tabs
    const validTabs = useMemo(() => {
      return tabs.filter(tab => tab && (tab.label || tab.content));
    }, [tabs]);

    // Handle tab click
    const handleTabClick = useCallback((index: number, disabled?: boolean) => {
      if (disabled) return;

      // In accordion mode with allowCollapse, toggle the same tab
      if (isAccordion && allowCollapse && activeIndex === index) {
        setActiveIndex(-1);
        onChange?.(-1);
      } else {
        setActiveIndex(index);
        onChange?.(index);
      }
    }, [isAccordion, allowCollapse, activeIndex, onChange]);

    // Keyboard navigation for tabs (non-accordion mode)
    const handleTabKeyDown: (index: number) => KeyboardEventHandler<HTMLButtonElement> =
      useCallback((index) => (event) => {
        if (isAccordion) return;

        const tabCount = validTabs.length;
        let nextIndex = index;

        switch (event.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            event.preventDefault();
            nextIndex = (index + 1) % tabCount;
            // Skip disabled tabs
            while (validTabs[nextIndex]?.disabled && nextIndex !== index) {
              nextIndex = (nextIndex + 1) % tabCount;
            }
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            event.preventDefault();
            nextIndex = (index - 1 + tabCount) % tabCount;
            // Skip disabled tabs
            while (validTabs[nextIndex]?.disabled && nextIndex !== index) {
              nextIndex = (nextIndex - 1 + tabCount) % tabCount;
            }
            break;
          case 'Home':
            event.preventDefault();
            nextIndex = 0;
            while (validTabs[nextIndex]?.disabled && nextIndex < tabCount - 1) {
              nextIndex++;
            }
            break;
          case 'End':
            event.preventDefault();
            nextIndex = tabCount - 1;
            while (validTabs[nextIndex]?.disabled && nextIndex > 0) {
              nextIndex--;
            }
            break;
          default:
            return;
        }

        if (nextIndex !== index && !validTabs[nextIndex]?.disabled) {
          handleTabClick(nextIndex);
          // Focus the next tab
          const nextButton = document.querySelector(
            `#${internalId}-tab-${nextIndex}`
          ) as HTMLButtonElement;
          nextButton?.focus();
        }
      }, [isAccordion, validTabs, handleTabClick, internalId]);

    // Generate CSS classes
    const containerClass = cn(
      getStyleClass('container'),
      getStyleClass(`orientation-${orientation}`),
      {
        [getStyleClass('accordion')]: isAccordion,
        [getStyleClass('nested')]: tabIdentifier !== undefined,
      },
      className
    );

    // Render tab headers (non-accordion mode)
    const renderTabHeaders = () => {
      if (isAccordion) return null;

      return (
        <div
          role="tablist"
          className={cn(
            getStyleClass('tabList'),
            tabIdentifier && getStyleClass(`tabList-${tabIdentifier}`)
          )}
          aria-label={ariaLabel}
          aria-orientation={orientation}
        >
          {validTabs.map((tab, index) => {
            const isActive = activeIndex === index;
            const isDisabled = tab.disabled;
            const tabId = `${internalId}-tab-${index}`;
            const panelId = `${internalId}-panel-${index}`;

            return (
              <button
                key={index}
                id={tabId}
                ref={isActive ? ref : undefined}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={panelId}
                aria-disabled={isDisabled || undefined}
                disabled={isDisabled}
                tabIndex={isActive ? 0 : -1}
                className={cn(
                  getStyleClass('tab'),
                  {
                    [getStyleClass('activeTab')]: isActive,
                    [getStyleClass('disabledTab')]: isDisabled,
                  }
                )}
                onClick={() => handleTabClick(index, isDisabled)}
                onKeyDown={handleTabKeyDown(index)}
                data-testid={`${dataTestId || 'dyn-responsive-tabs'}-tab-${index}`}
              >
                {tab.icon && (
                  <span className={getStyleClass('tabIcon')} aria-hidden="true">
                    {typeof tab.icon === 'string' ? (
                      <DynIcon icon={tab.icon} size="small" />
                    ) : (
                      tab.icon
                    )}
                  </span>
                )}
                {tab.label}
              </button>
            );
          })}
        </div>
      );
    };

    // Render panels
    const renderPanels = () => {
      return (
        <div className={getStyleClass('panelContainer')}>
          {validTabs.map((tab, index) => {
            const isActive = activeIndex === index;
            const tabId = `${internalId}-${isAccordion ? 'accordion' : 'tab'}-${index}`;
            const panelId = `${internalId}-panel-${index}`;
            const isDisabled = tab.disabled;

            return (
              <div key={index} className={getStyleClass('panelWrapper')}>
                {/* Accordion header (mobile view) */}
                {isAccordion && (
                  <button
                    id={tabId}
                    ref={isActive ? ref : undefined}
                    type="button"
                    className={cn(
                      getStyleClass('accordionHeader'),
                      {
                        [getStyleClass('activeAccordion')]: isActive,
                        [getStyleClass('disabledAccordion')]: isDisabled,
                      }
                    )}
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    aria-disabled={isDisabled || undefined}
                    disabled={isDisabled}
                    onClick={() => handleTabClick(index, isDisabled)}
                    data-testid={`${dataTestId || 'dyn-responsive-tabs'}-accordion-${index}`}
                  >
                    <span className={getStyleClass('accordionLabel')}>
                      {tab.icon && (
                        <span className={getStyleClass('accordionIcon')} aria-hidden="true">
                          {typeof tab.icon === 'string' ? (
                            <DynIcon icon={tab.icon} size="small" />
                          ) : (
                            tab.icon
                          )}
                        </span>
                      )}
                      {tab.label}
                    </span>
                    <span className={getStyleClass('accordionToggle')} aria-hidden="true">
                      {typeof expandIcon === 'string' ? (
                        <DynIcon icon={isActive ? collapseIcon as string : expandIcon} size="small" />
                      ) : isActive ? (
                        collapseIcon
                      ) : (
                        expandIcon
                      )}
                    </span>
                  </button>
                )}

                {/* Panel content */}
                <div
                  id={panelId}
                  role="tabpanel"
                  aria-labelledby={tabId}
                  hidden={!isActive}
                  className={cn(
                    getStyleClass('panel'),
                    {
                      [getStyleClass('activePanel')]: isActive,
                    }
                  )}
                  data-testid={`${dataTestId || 'dyn-responsive-tabs'}-panel-${index}`}
                >
                  {/* Render content - supports nested tabs */}
                  {isActive && tab.content}
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    return (
      <div
        id={internalId}
        className={containerClass}
        data-testid={dataTestId || 'dyn-responsive-tabs'}
        {...rest}
      >
        {renderTabHeaders()}
        {renderPanels()}
      </div>
    );
  }
);

DynResponsiveTabs.displayName = 'DynResponsiveTabs';

export default DynResponsiveTabs;
