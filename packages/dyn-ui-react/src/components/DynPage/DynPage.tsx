import React from 'react';
import { cn } from '../../utils/classNames';
import { DynButton } from '../DynButton';
import { DynIcon } from '../DynIcon';
import type { DynButtonKind } from '../DynButton/DynButton.types';
import type { DynPageProps } from './DynPage.types';
import styles from './DynPage.module.css';

export const DynPage: React.FC<DynPageProps> = ({
  title,
  subtitle,
  breadcrumbs = [],
  actions = [],
  children,
  loading = false,
  error,
  size = 'medium',
  padding = 'md',
  background = 'page',
  className,
  id,
  'data-testid': testId
}) => {
  const pageClasses = cn(
    styles.container,
    size === 'small' && styles.sizeSmall,
    size === 'medium' && styles.sizeMedium,
    size === 'large' && styles.sizeLarge,
    padding === 'none' && styles.paddingNone,
    padding === 'xs' && styles.paddingXs,
    padding === 'sm' && styles.paddingSm,
    padding === 'md' && styles.paddingMd,
    padding === 'lg' && styles.paddingLg,
    background === 'none' && styles.backgroundNone,
    background === 'surface' && styles.backgroundSurface,
    background === 'page' && styles.backgroundPage,
    {
      [styles.loading]: loading,
      [styles.error]: !!error
    },
    className
  );

  const renderBreadcrumbs = () => {
    if (breadcrumbs.length === 0) return null;

    return (
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <ol className={styles.breadcrumbList}>
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={index} className={styles.breadcrumbItem}>
              {breadcrumb.href || breadcrumb.onClick ? (
                <a
                  href={breadcrumb.href}
                  onClick={(e) => {
                    if (breadcrumb.onClick) {
                      e.preventDefault();
                      breadcrumb.onClick();
                    }
                  }}
                  className={styles.breadcrumbLink}
                >
                  {breadcrumb.title}
                </a>
              ) : (
                <span className={styles.breadcrumbText}>{breadcrumb.title}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className={styles.breadcrumbSeparator} aria-hidden="true">
                  <DynIcon icon="chevron-right" size="small" />
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  };

  const renderActions = () => {
    if (actions.length === 0) return null;

    return (
      <div className={styles.actions}>
        {actions.map((action) => (
          <DynButton
            key={action.key}
            kind={(action.type ?? 'secondary') as DynButtonKind}
            size={size === 'large' ? 'large' : 'medium'}
            disabled={action.disabled}
            loading={action.loading}
            onClick={action.onClick}
            icon={action.icon}
          >
            {action.title}
          </DynButton>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className={pageClasses} id={id} data-testid={testId}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <span>Loading page...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={pageClasses} id={id} data-testid={testId}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>
            <DynIcon icon="alert-triangle" size="large" />
          </div>
          <div className={styles.errorContent}>
            {typeof error === 'string' ? (
              <span className={styles.errorMessage}>{error}</span>
            ) : (
              error
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={pageClasses} id={id} data-testid={testId}>
      <header className={styles.header}>
        {renderBreadcrumbs()}

        <div className={styles.titleSection}>
          <div className={styles.titleContent}>
            <h1 className={styles.headerTitle}>{title}</h1>
            {subtitle && (
              <p className={styles.headerSubtitle}>{subtitle}</p>
            )}
          </div>
          {renderActions()}
        </div>
      </header>

      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
};


DynPage.displayName = 'DynPage';

export default DynPage;
