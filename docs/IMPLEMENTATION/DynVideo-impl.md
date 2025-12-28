# DynVideo – Implementation Guide

## Component Overview

`DynVideo` is a specialised component for embedding videos in your application.  It supports both local and remote sources, providing responsive sizing, optional controls, poster images, and design tokens to control its appearance.  The component maintains aspect ratio when responsive, allows fixed width and height when required, and exposes hooks for playback events.  Dark mode, high‑contrast accessibility and reduced‑motion preferences are respected through appropriate tokens.  Typical use cases include embedding tutorial videos, previews and promotional clips.

Key features:

* **Responsive and fixed variants** – choose between responsive mode (maintaining aspect ratio while filling the width of its container) and fixed dimensions via props【288744069544077†L609-L623】.
* **Poster and fallback** – specify a poster image displayed before playback starts or when video fails to load.
* **Native controls and custom overlay** – decide whether to show the browser’s native controls; optionally overlay a custom play button over the poster.
* **Playback options** – support `autoPlay`, `loop`, `muted`, `playsInline` and `controls` props.
* **Events** – expose `onPlay`, `onPause`, `onEnded` callbacks and a `onError` callback for handling load failures.
* **Design tokens** – control border radius, shadow, background colour, progress bar colours and overlay opacity via tokens.
* **Accessibility** – provide `aria-label` and caption track support; ensure keyboard control of playback.
* **Dark mode & high contrast** – adjust colours to maintain contrast; hide auto‑play animations for reduced‑motion users.

## Current State Analysis

The component checklist labels `DynVideo` as a Phase 3 specialised component with 60 % readiness and early planning status.  It has the token namespace `--dyn-video-*` and supports variants **responsive** and **fixed**【288744069544077†L609-L623】.  There is no implementation in the repository, nor a detailed specification.  This guide defines tokens, API, implementation and testing strategy for building the component.

## Implementation Instructions

### 1. File Structure

Create `packages/dyn-ui-react/src/components/DynVideo/` with:

```
DynVideo.tsx         – React component implementing the video wrapper
DynVideo.types.ts    – TypeScript interfaces and type definitions
DynVideo.module.css  – CSS module containing tokens and classes
DynVideo.stories.tsx – Storybook stories covering responsive and fixed modes
DynVideo.test.tsx    – Tests ensuring rendering and accessibility
index.ts             – Barrel file exporting component and types
```

### 2. Define Design Tokens

Add the following tokens in `DynVideo.module.css` with three‑level fallback:

| Token | Purpose | Example fallback |
|------|---------|------------------|
| `--dyn-video-radius` | Border radius of the video container | `var(--radius-md, 0.5rem)` |
| `--dyn-video-shadow` | Box shadow applied to the container | `var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.1))` |
| `--dyn-video-bg` | Background colour behind the video | `var(--dyn-color-surface, #000)` |
| `--dyn-video-overlay-bg` | Background colour of the overlay play button | `rgba(0, 0, 0, 0.5)` |
| `--dyn-video-control-color` | Colour of custom control icons/text | `var(--dyn-color-on-surface, #fff)` |
| `--dyn-video-progress-bg` | Colour of the progress bar background | `rgba(255, 255, 255, 0.2)` |
| `--dyn-video-progress-color` | Colour of the progress bar fill | `var(--dyn-color-primary, #3b82f6)` |
| `--dyn-video-caption-color` | Colour of caption text | `var(--dyn-color-on-surface, #fff)` |
| `--dyn-video-duration` | Default animation duration for fade in/out | `0.2s` |

Provide dark‑mode overrides to invert colours: e.g. `--dyn-video-bg` becomes `#000` and progress bar colours adapt.  Support reduced motion by disabling fade animations.

### 3. API Design (`DynVideo.types.ts`)

Define the props interface:

```ts
export type DynVideoVariant = 'responsive' | 'fixed';

export interface DynVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  /** URL of the video source. */
  src: string;
  /** Poster image shown before playback starts or when loading fails. */
  poster?: string;
  /** Variant controlling layout: 'responsive' (default) maintains aspect ratio, 'fixed' uses width/height props. */
  variant?: DynVideoVariant;
  /** Fixed width (used when variant is 'fixed'). */
  width?: number | string;
  /** Fixed height (used when variant is 'fixed'). */
  height?: number | string;
  /** Show native controls. Defaults to true. */
  controls?: boolean;
  /** Auto play the video when loaded. */
  autoPlay?: boolean;
  /** Loop the video. */
  loop?: boolean;
  /** Mute the audio. */
  muted?: boolean;
  /** Show a custom overlay play button instead of native controls. */
  overlayPlay?: boolean;
  /** Custom aria-label for the video. */
  ariaLabel?: string;
  /** Event fired when playback starts. */
  onPlay?: () => void;
  /** Event fired when playback pauses. */
  onPause?: () => void;
  /** Event fired when playback ends. */
  onEnded?: () => void;
  /** Event fired when the video fails to load. */
  onError?: (e: any) => void;
}
```

### 4. React Implementation (`DynVideo.tsx`)

1. Use `forwardRef<HTMLVideoElement, DynVideoProps>` to forward the ref to the `<video>` element.
2. Destructure props with defaults: `variant = 'responsive'`, `controls = true`, `overlayPlay = false`.
3. Compute container classes for responsive vs. fixed layout.  In responsive mode, wrap the `<video>` in a `<div className={styles.responsiveContainer}>` with `padding-top` set by aspect ratio; position the video absolutely to fill the container.  In fixed mode, apply width and height directly to the `<video>` element via style.
4. If `overlayPlay` is true and controls are hidden, render a play button overlay (`<button className={styles.playOverlay}>`) on top of the poster; clicking it calls `videoRef.current.play()`.
5. Pass through video attributes: `autoPlay`, `loop`, `muted`, `poster`, `controls`.  Forward event handlers (`onPlay`, `onPause`, `onEnded`, `onError`).
6. Add accessibility attributes: `role="region"` and `aria-label` on the wrapper; ensure captions (`<track>` elements) are passed down when provided.
7. Support dark mode and high contrast by using CSS variables defined in the module.  Apply a `data-dyn-theme` attribute if required by theming context.

### 5. CSS Module (`DynVideo.module.css`)

Define base and variant classes:

* `.container` – general wrapper: `position: relative; overflow: hidden; border-radius: var(--dyn-video-radius); box-shadow: var(--dyn-video-shadow); background: var(--dyn-video-bg);`  Provide dark‑mode override for `--dyn-video-bg` and adjust `--dyn-video-shadow` for high contrast.
* `.responsiveContainer` – maintain aspect ratio: `width: 100%; height: 0; padding-top: 56.25%;` (16:9 ratio by default).  Provide a CSS custom property `--dyn-video-aspect-ratio` to allow ratio overrides (e.g. 16:9 or 4:3) and compute `padding-top: calc(100% / (var(--dyn-video-aspect-ratio)))`.
* `.video` – the `<video>` element: `position: absolute; top: 0; left: 0; width: 100%; height: 100%;` for responsive mode; or apply width/height directly for fixed mode.
* `.playOverlay` – optional overlay button: `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--dyn-video-overlay-bg); color: var(--dyn-video-control-color); border: none; border-radius: 50%; width: 3rem; height: 3rem; display: flex; align-items: center; justify-content: center; cursor: pointer;`  On hover/focus, adjust background opacity for feedback.
* `.progress` – if you implement custom progress bar, style the background and fill using `--dyn-video-progress-bg` and `--dyn-video-progress-color`.
* `.caption` – optional caption container: use `--dyn-video-caption-color` for text.
* Provide dark‑mode overrides in `@media (prefers-color-scheme: dark) { ... }` to invert backgrounds and colours; add `@media (forced-colors: active)` to support Windows high‑contrast mode.
* Include `@media (prefers-reduced-motion: reduce)` to disable fade animations on the overlay.

### 6. Storybook Stories (`DynVideo.stories.tsx`)

Create stories demonstrating:

* Responsive video with default aspect ratio and custom aspect ratio.
* Fixed width/height video.
* Video with poster image and overlay play button.
* Auto‑play, loop and muted options.
* Custom control colours via token overrides.
* Dark mode and high‑contrast examples.
* Video with captions (`<track>` elements).

### 7. Unit Tests (`DynVideo.test.tsx`)

Use React Testing Library to ensure:

* The component renders a `<video>` element with correct props.
* Responsive variant uses a container with the appropriate padding‑top (aspect ratio) and absolutely positioned video.
* Fixed variant applies specified width and height.
* Overlay play button appears only when `overlayPlay` is true and `controls` is false.
* Event handlers (`onPlay`, `onPause`, `onEnded`, `onError`) are called appropriately.
* Accessibility attributes (`aria-label`, caption tracks) are passed correctly.
* Snapshot tests for dark mode and high‑contrast themes.

### 8. Exports (`index.ts`)

Export the component and types:

```ts
export { DynVideo } from './DynVideo';
export type { DynVideoProps, DynVideoVariant } from './DynVideo.types';
```

## Validation Checklist

- [ ] All `--dyn-video-*` tokens are defined with three‑level fallbacks and dark mode overrides.
- [ ] Responsive and fixed variants implemented with proper aspect ratio management.
- [ ] Poster, overlay play button and native controls behave correctly.
- [ ] Playback options (`autoPlay`, `loop`, `muted`) and events (`onPlay`, `onPause`, `onEnded`, `onError`) implemented.
- [ ] Accessibility: video has an `aria-label`, caption tracks are supported, keyboard controls work.
- [ ] Storybook stories cover responsive, fixed, overlay and control scenarios.
- [ ] Unit tests verify rendering, props, events and accessibility.
- [ ] Component and types exported correctly.
