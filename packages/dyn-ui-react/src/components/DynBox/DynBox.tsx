import React, { forwardRef, useEffect, useMemo } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import type { DynBoxProps, DynBoxRef } from './DynBox.types';
import styles from './DynBox.module.css';

const getStyleClass = (name: string) => (styles as Record<string, string>)[name] || '';

const FILTERED_PROPS = new Set([
  'as','padding','p','px','py','pt','pr','pb','pl','m','mx','my','mt','mr','mb','ml',
  'radius','borderRadius','customBorderRadius','shadow','border','background','bg','backgroundColor','color',
  'align','justify','direction','flexDirection','wrap','gap','rowGap','columnGap',
  'gridTemplateColumns','gridTemplateRows','gridTemplateAreas','top','right','bottom','left','zIndex',
  'interactive','cssVars','ariaLiveMessage','ariaLivePoliteness','focusOnMount','display','position','textAlign','overflow','overflowX','overflowY',
  'alignContent','width','height','minWidth','minHeight','maxWidth','maxHeight','hideOnMobile','hideOnTablet','hideOnDesktop','mobileOnly','tabletOnly','desktopOnly'
]);

const isToken = (v?: string) => v && ['0','xs','sm','md','lg','xl','2xl'].includes(v);
const toTokenVar = (v: string) => `var(--dyn-spacing-${v}, var(--spacing-${v}, ${({'0':'0','xs':'0.25rem','sm':'0.5rem','md':'1rem','lg':'1.5rem','xl':'2rem','2xl':'3rem'} as Record<string,string>)[v]}))`;