import * as React from 'react';
import type { Preview, StoryFn, StoryContext, Decorator } from '@storybook/react';
import { ThemeProvider } from '../packages/dyn-ui-react/src/theme/ThemeProvider';
// Import design tokens baseline first
import '@dyn-ui/design-tokens/styles/foundations/index.css';
// Import component-specific tokens - Comprehensive List
import '@dyn-ui/design-tokens/styles/components/avatar.css';
import '@dyn-ui/design-tokens/styles/components/badge.css';
import '@dyn-ui/design-tokens/styles/components/box.css';
import '@dyn-ui/design-tokens/styles/components/button.css';
import '@dyn-ui/design-tokens/styles/components/button-like.css';
import '@dyn-ui/design-tokens/styles/components/checkbox.css';
import '@dyn-ui/design-tokens/styles/components/container.css';
import '@dyn-ui/design-tokens/styles/components/data-display.css';
import '@dyn-ui/design-tokens/styles/components/date-picker.css';
import '@dyn-ui/design-tokens/styles/components/flex.css';
import '@dyn-ui/design-tokens/styles/components/icon.css';
import '@dyn-ui/design-tokens/styles/components/input-like.css';
import '@dyn-ui/design-tokens/styles/components/interactive-states.css';
import '@dyn-ui/design-tokens/styles/components/layout.css';
import '@dyn-ui/design-tokens/styles/components/list-view.css';
import '@dyn-ui/design-tokens/styles/components/responsive-tabs.css';
import '@dyn-ui/design-tokens/styles/components/sidebar.css';
import '@dyn-ui/design-tokens/styles/components/stack.css';
import '@dyn-ui/design-tokens/styles/components/stepper.css';
import '@dyn-ui/design-tokens/styles/components/table.css';
import '@dyn-ui/design-tokens/styles/components/table-like.css';
import '@dyn-ui/design-tokens/styles/components/theme-switcher.css';
import '@dyn-ui/design-tokens/styles/components/tree-view.css';
// Finally import global styles and themes
import '../packages/dyn-ui-react/src/styles/dyn-ui.css';
import '../packages/dyn-ui-react/src/styles/themes.css';

const themes = ['light', 'dark'];

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    ((Story, context) => {
      const theme = context.globals.theme || 'light';

      // Render ThemeProvider with key to force re-mount when theme changes
      // This ensures clean state and allows ThemeProvider to handle DOM attributes
      return (
        <ThemeProvider key={theme} initialTheme={theme}>
          <div style={{
            backgroundColor: 'var(--dyn-semantic-background)',
            color: 'var(--dyn-semantic-text)',
            fontFamily: 'var(--dyn-font-family-base)',
            padding: '1rem'
          }}>
            <Story />
          </div>
        </ThemeProvider>

      );

    }) as Decorator,
  ],
};

export default preview;
