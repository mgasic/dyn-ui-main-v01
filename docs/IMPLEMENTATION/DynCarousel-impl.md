# DynCarousel – Implementation Guide

## Component Overview

`DynCarousel` is an image or content slider that allows users to cycle through a set of slides.  It should support horizontal sliding or fading transitions, navigation controls (arrows), dot indicators, keyboard navigation, optional autoplay with pause‑on‑hover, looping, and responsive layouts that display multiple slides on wider screens.  The component is intended for showcasing products, images or any arbitrary JSX content.  Customisation options include choosing the number of visible slides, enabling infinite looping, adjusting transition types and durations, customizing the look of navigation arrows and indicators, and overriding default colours, sizes and spacing via design tokens.

## Current State Analysis

The carousel component does not yet exist in the code base; it is listed in the new component roadmap as a **low‑priority, medium‑high complexity** feature【630038733035793†L45-L49】.  There is therefore no existing implementation to analyse.  The roadmap indicates an estimated effort of around 16 hours and notes that the component should provide an image carousel/slider.  This guide defines the initial API, tokens and behaviours required to implement `DynCarousel` from scratch.

## Implementation Instructions

1. **File structure and setup** – Create `packages/dyn-ui-react/src/components/DynCarousel/` containing:
   - `DynCarousel.tsx` – React component implemented with `forwardRef` and TypeScript typings.
   - `DynCarousel.types.ts` – interface defining props.
   - `DynCarousel.module.css` – CSS module with design tokens and styles.
   - `DynCarousel.stories.tsx` – Storybook examples demonstrating various use cases.
   - `DynCarousel.test.tsx` – Jest tests covering behaviours.
   - `DynCarousel.impl.md` – this implementation guide.

2. **Define the API** – In `DynCarousel.types.ts` export an interface such as:

   ```ts
   export interface DynCarouselProps<T = any> extends React.HTMLAttributes<HTMLDivElement> {
     /** Array of slides to render; each slide can be any React node. */
     items: T[];
     /** Number of slides visible at once; default 1. */
     slidesToShow?: number;
     /** Enables wrap‑around behaviour when reaching the first or last slide; default true. */
     infinite?: boolean;
     /** Enables automatic advancement through slides. */
     autoplay?: boolean;
     /** Interval between automatic slide transitions in ms; default 5000. */
     autoplayInterval?: number;
     /** Transition type: 'slide' or 'fade'; default 'slide'. */
     transition?: 'slide' | 'fade';
     /** Whether to display navigation arrows; default true. */
     showArrows?: boolean;
     /** Whether to display indicator dots; default true. */
     showIndicators?: boolean;
     /** Callback invoked when the current slide index changes. */
     onSlideChange?: (index: number) => void;
     /** Optional controlled current index; if provided, component becomes controlled. */
     currentIndex?: number;
     /** Additional className for the root element. */
     className?: string;
   }
   ```

3. **Design tokens** – In `DynCarousel.module.css` define component‑scoped variables with three‑level fallback.  Use the `--dyn-carousel-*` prefix, for example:

   ```css
   /* Foundation fallbacks live in :root; component tokens override them */
   :root {
     --dyn-carousel-arrow-size: var(--dyn-size-4, 16px);
     --dyn-carousel-dot-size: var(--dyn-size-3, 12px);
     --dyn-carousel-gap: var(--dyn-spacing-4, 16px);
     --dyn-carousel-transition-duration: var(--dyn-duration-normal, 300ms);
     --dyn-carousel-bg: var(--dyn-color-gray-100, #F5F5F5);
     --dyn-carousel-arrow-color: var(--dyn-color-gray-700, #4A4A4A);
     --dyn-carousel-dot-color: var(--dyn-color-gray-500, #8A8A8A);
     --dyn-carousel-dot-color-active: var(--dyn-color-primary-60, #007ACC);
   }
   
   .dyn-carousel {
     display: flex;
     overflow: hidden;
     position: relative;
     background-color: var(--dyn-carousel-bg);
     gap: var(--dyn-carousel-gap);
   }
   /* Arrows */
   .arrow {
     position: absolute;
     top: 50%;
     width: var(--dyn-carousel-arrow-size);
     height: var(--dyn-carousel-arrow-size);
     transform: translateY(-50%);
     color: var(--dyn-carousel-arrow-color);
   }
   .arrowLeft { left: var(--dyn-spacing-3, 12px); }
   .arrowRight { right: var(--dyn-spacing-3, 12px); }
   /* Indicators */
   .indicators {
     position: absolute;
     bottom: var(--dyn-spacing-3, 12px);
     left: 50%;
     transform: translateX(-50%);
     display: flex;
     gap: var(--dyn-spacing-2, 8px);
   }
   .indicator {
     width: var(--dyn-carousel-dot-size);
     height: var(--dyn-carousel-dot-size);
     border-radius: 50%;
     background-color: var(--dyn-carousel-dot-color);
     cursor: pointer;
     transition: background-color var(--dyn-carousel-transition-duration) ease-in-out;
   }
   .indicatorActive {
     background-color: var(--dyn-carousel-dot-color-active);
   }
   @media (prefers-color-scheme: dark) {
     :root {
       --dyn-carousel-bg: var(--dyn-color-gray-900, #1A1A1A);
       --dyn-carousel-arrow-color: var(--dyn-color-gray-200, #DDD);
       --dyn-carousel-dot-color: var(--dyn-color-gray-600, #666);
       --dyn-carousel-dot-color-active: var(--dyn-color-primary-30, #5EA9E0);
     }
   }
   @media (prefers-contrast: more) {
     :root {
       --dyn-carousel-arrow-color: var(--dyn-color-black, #000);
       --dyn-carousel-dot-color-active: var(--dyn-color-black, #000);
     }
   }
   ```

   Expand tokens to include responsive breakpoints like `--dyn-carousel-breakpoint-md` if you plan to show multiple slides per view; create classes for sizes (`.carouselSmall`, `.carouselLarge`) if necessary.

4. **Implement the component** – In `DynCarousel.tsx`:
   - Use `useState` to manage the current index when `currentIndex` is undefined; otherwise rely on the controlled prop.
   - Use `useRef` to reference the slide container; update scroll or transform based on `currentIndex`.
   - When `autoplay` is enabled, set up an interval in a `useEffect` that calls `setCurrentIndex` at the specified `autoplayInterval`; pause the timer on hover or when the user interacts.
   - Render arrows conditionally; on click, call `increment` or `decrement` functions which wrap around if `infinite` is true.
   - Render indicators as a list of buttons; clicking a dot sets the current index.
   - Handle keyboard events on the root element: arrow keys to navigate, Home/End to jump to first/last slide, and Space to pause/resume autoplay.
   - Apply appropriate classes (`dyn-carousel`, `arrow`, `indicator`, etc.) and pass through `className` and other HTML props.
   - Call `onSlideChange` when the index changes (both controlled and uncontrolled).

5. **Accessibility** – Wrap the carousel in a `div` with `role="region"` and `aria-roledescription="carousel"`; set `aria-label` describing the content.  Each slide should be a `div` with `role="group"` and `aria-roledescription="slide"`; set `aria-hidden={currentIndex !== i}` to hide non‑active slides from screen readers.  Arrow buttons must have `aria-label="Previous slide"` and `aria-label="Next slide"`.  Dots should have `role="tab"` and `aria-selected` state.  When autoplay is enabled, add `aria-live="off"` to avoid constant announcements, but provide a control to pause.

6. **Responsive design** – Provide a `slidesToShow` prop (default 1) and compute slide width accordingly; optionally update the `slidesToShow` value based on breakpoints using CSS media queries or JavaScript.  Use CSS classes or inline styles to set `flex-basis` for slides.  Provide tokens for breakpoints.

7. **Tests** – Implement Jest/React Testing Library tests:
   - Verify that clicking arrows changes slides appropriately and loops when `infinite` is true.
   - Verify that clicking dots selects the correct slide.
   - Verify that autoplay advances slides and pauses on hover.
   - Verify keyboard navigation and accessibility attributes.
   - Verify that tokens apply correct sizes and colours in both light and dark modes.
   - Write snapshot tests for default and variant use cases.

8. **Storybook examples** – Create stories for:
   - Basic carousel with images.
   - Fade transition.
   - Autoplay and pause.
   - Multiple slides per view.
   - Dark mode and high contrast.
   - Custom arrow/dot styling.

9. **Documentation and workflow** – Add JSDoc comments describing each prop; update README with usage examples and a token reference table; commit changes incrementally on a feature branch and open a pull request referencing this guide.  Request design review for arrow and dot aesthetics and manual QA for accessibility.

## Validation Checklist

- [ ] All design tokens use the `--dyn-carousel-*` prefix with three‑level fallback for arrow size, dot size, gap, background, arrow colour, dot colours and transitions.
- [ ] Component implements props for `items`, `slidesToShow`, `infinite`, `autoplay`, `autoplayInterval`, `transition`, `showArrows`, `showIndicators`, `currentIndex` and `onSlideChange`.
- [ ] The React implementation handles controlled and uncontrolled modes, arrow and dot navigation, looping, autoplay (with pause on hover), keyboard navigation and responsive adjustments.
- [ ] Tokens support dark mode, high contrast and reduced motion; the carousel honours user preference for reduced motion by disabling animations.
- [ ] Accessibility: container uses `role="region"`/`aria-roledescription="carousel"`, slides are `role="group"`, arrows and dots have proper labels, `aria-live` usage does not overwhelm screen readers.
- [ ] Jest tests cover navigation, autoplay, keyboard interaction, controlled/uncontrolled operation, tokens and accessibility; code achieves ≥ 80 % coverage.
- [ ] Storybook includes examples for all variants and demonstrates dark mode and responsive behaviour.
- [ ] Component and TypeScript types exported correctly from `index.ts`.
