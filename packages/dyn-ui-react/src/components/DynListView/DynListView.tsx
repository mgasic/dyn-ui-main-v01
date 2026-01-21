import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import styles from './DynListView.module.css';
import type { DynListViewProps, DynListViewRef, ListViewItem, ListAction } from './DynListView.types';
import { DynIcon } from '../DynIcon';


const isComplexItem = (item: any) => {
  // Consider item complex if it has more than typical display fields
  const displayKeys = new Set(['id', 'title', 'label', 'value', 'description', 'icon', 'disabled', 'selected']);
  const keys = Object.keys(item || {});
  return keys.filter(k => !displayKeys.has(k)).length >= 3; // threshold can be tuned
};

export const DynListView = forwardRef<HTMLDivElement, DynListViewProps>(function DynListView(
  {
    items = [],
    data = [], // legacy alias
    value,
    defaultValue,
    multiSelect = false,
    selectable = false,
    disabled = false,
    loading = false,
    emptyText = 'No data available',
    loadingText = 'Loading...',
    selectAllText = 'Select All',
    expandText = 'Expand',
    collapseText = 'Collapse',
    dividers = false,
    striped = false,
    actions = [],
    renderItem,
    size,
    height,
    bordered = false,
    selectedKeys = [],
    itemKey,
    onChange,
    onSelectionChange,
    className,
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'data-testid': dataTestId,
    ...rest
  }, ref) {

  // Internal ref for imperative handle
  const rootRef = useRef<HTMLDivElement>(null);

  // Use items prop, fallback to data for backward compatibility
  const listItems = items.length > 0 ? items : data;

  const [internalId] = useState(() => id || generateId('listview'));
  const isControlled = value !== undefined;
  const [selected, setSelected] = useState<string[] | string | undefined>(
    value ?? (multiSelect ? [] : defaultValue)
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isControlled) setSelected(value as any);
  }, [isControlled, value]);

  const itemIds = useMemo(() =>
    listItems.map((_, i) => `${internalId}-option-${i}`),
    [listItems, internalId]
  );

  const getItemKey = (item: ListViewItem, index: number): string => {
    if (typeof itemKey === 'function') return itemKey(item);
    if (typeof itemKey === 'string') return String((item as any)[itemKey]);
    return item.id ? String(item.id) : item.value ? String(item.value) : String(index);
  };

  const isSelected = (val: string) => {
    return multiSelect || selectable ? Array.isArray(selected) && selected.includes(val) : selected === val;
  };

  const commit = (vals: string[] | string) => {
    if (!isControlled) setSelected(vals as any);

    const valArray = Array.isArray(vals) ? vals : [vals];
    const selectedItems = listItems.filter((item, idx) => valArray.includes(getItemKey(item, idx)));

    onChange?.(vals as any, (multiSelect || selectable) ? selectedItems : selectedItems[0]);
    onSelectionChange?.(valArray, selectedItems);
  };

  const toggle = (val: string) => {
    if (disabled) return;
    if (multiSelect || selectable) {
      const current = Array.isArray(selected) ? selected : [];
      const next = current.includes(val) ? current.filter(v => v !== val) : [...current, val];
      commit(next);
    } else {
      commit(val);
    }
  };

  const moveActive = (delta: number) => {
    const count = listItems.length;
    if (!count) return;
    setActiveIndex(idx => (idx + delta + count) % count);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); moveActive(1); break;
      case 'ArrowUp': e.preventDefault(); moveActive(-1); break;
      case 'Home': e.preventDefault(); setActiveIndex(0); break;
      case 'End': e.preventDefault(); setActiveIndex(Math.max(0, listItems.length - 1)); break;
      case 'Enter':
      case ' ': {
        e.preventDefault();
        const item = listItems[activeIndex];
        if (item) {
          const key = getItemKey(item, activeIndex);
          toggle(key);
        }
        break;
      }
    }
  };

  const rootClasses = cn(
    styles.root,
    size === 'small' && styles.rootSmall,
    size === 'large' && styles.rootLarge,
    bordered && styles.bordered,
    dividers && styles.dividers,
    striped && styles.striped,
    className
  );

  const rootStyle = height ? {
    height: typeof height === 'number' ? `${height}px` : String(height)
  } : undefined;

  const allKeys = listItems.map((item, i) => getItemKey(item, i));
  const allChecked = (multiSelect || selectable) && allKeys.length > 0 && allKeys.every(k => isSelected(k));

  // Expose imperative methods via ref
  useImperativeHandle(ref, () => ({
    focus: () => rootRef.current?.focus(),
    selectAll: () => commit(allKeys),
    clearSelection: () => commit(multiSelect ? [] : ''),
  }) as unknown as HTMLDivElement, [allKeys, multiSelect, commit]);

  return (
    <div
      ref={rootRef}
      id={internalId}
      role="listbox"
      aria-multiselectable={multiSelect || selectable || undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-activedescendant={listItems[activeIndex] ? itemIds[activeIndex] : undefined}
      aria-busy={loading}
      aria-disabled={disabled || undefined}
      className={rootClasses}
      data-testid={dataTestId || 'dyn-listview'}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      style={rootStyle}
      {...rest}
    >
      {(multiSelect || selectable) && (
        <div className={cn(
          styles.option,
          size === 'small' && styles.optionSmall,
          size === 'large' && styles.optionLarge
        )}
          role="option"
          aria-selected={allChecked}
        >
          <input
            type="checkbox"
            role="checkbox"
            aria-checked={allChecked}
            checked={allChecked}
            onChange={() => commit(allChecked ? [] : allKeys)}
            className={styles.optionCheckbox}
          />
          <span className={cn(
            styles.optionLabel,
            size === 'small' && styles.optionLabelSmall,
            size === 'large' && styles.optionLabelLarge
          )}>{selectAllText}</span>
        </div>
      )}

      {loading ? (
        <div role="status" className={styles.loading}>
          {loadingText}
        </div>
      ) : listItems.length === 0 ? (
        <div role="note" className={styles.empty}>
          {emptyText}
        </div>
      ) : (
        listItems.map((item, i) => {
          const key = getItemKey(item, i);
          const selectedState = isSelected(key);
          const title = (item as any).title ?? (item as any).label ?? (item as any).value ?? String((item as any).id ?? i + 1);
          const desc = (item as any).description;
          const complex = isComplexItem(item);

          return (
            <div
              key={key}
              id={itemIds[i]}
              role="option"
              aria-selected={selectedState}
              aria-setsize={listItems.length}
              aria-posinset={i + 1}
              className={cn(
                styles.option,
                size === 'small' && styles.optionSmall,
                size === 'large' && styles.optionLarge,
                selectedState && styles.optionSelected,
                i === activeIndex && styles.optionActive,
                item.disabled && styles.optionDisabled
              )}
              onMouseEnter={() => !item.disabled && setActiveIndex(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => !item.disabled && toggle(key)}
            >
              {(selectable || multiSelect) && (
                <input
                  type="checkbox"
                  role="checkbox"
                  aria-checked={!!selectedState}
                  checked={!!selectedState}
                  disabled={item.disabled}
                  onChange={() => !item.disabled && toggle(key)}
                  onClick={(e) => e.stopPropagation()}
                  className={styles.optionCheckbox}
                />
              )}

              <div className={styles.optionContentWrapper}>
                {item.icon && (
                  <div className={styles.optionIcon}>
                    <DynIcon icon={item.icon} size={size === 'large' ? 'medium' : 'small'} />
                  </div>
                )}
                <div className={styles.optionContent}>
                  {renderItem ? (
                    renderItem(item, i)
                  ) : (
                    <>
                      <span className={cn(
                        styles.optionLabel,
                        size === 'small' && styles.optionLabelSmall,
                        size === 'large' && styles.optionLabelLarge
                      )}>
                        {title}
                      </span>
                      {desc && (
                        <span className={cn(
                          styles.optionDescription,
                          size === 'small' && styles.optionDescriptionSmall,
                          size === 'large' && styles.optionDescriptionLarge
                        )}>
                          {desc}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {complex && (
                <button
                  type="button"
                  className={styles.optionExpand}
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
                  }}
                  aria-expanded={!!expanded[key]}
                >
                  {expanded[key] ? collapseText : expandText}
                </button>
              )}

              {actions && actions.length > 0 && (
                <div
                  className={styles.optionActions}
                  onClick={(e) => e.stopPropagation()}
                >
                  {actions.map((action) => (
                    <button
                      key={action.key}
                      type="button"
                      className={cn(
                        styles.actionButton,
                        action.type === 'primary' && styles.actionButtonPrimary,
                        action.type === 'danger' && styles.actionButtonDanger
                      )}
                      onClick={() => action.onClick(item, i)}
                      title={action.title}
                    >
                      {action.icon ? <DynIcon icon={action.icon} /> : action.title}
                    </button>
                  ))}
                </div>
              )}


              {expanded[key] && (
                <div className={styles.optionDetails}>
                  {Object.entries(item).map(([k, v]) => (
                    <div key={k}>
                      <strong>{k}:</strong> {String(v)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
});

export default DynListView;
