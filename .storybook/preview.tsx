import * as React from 'react';
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '../packages/dyn-ui-react/src/theme/ThemeProvider';
// Import design tokens baseline first
import '../packages/design-tokens/styles/foundations/index.css';
// Import component-specific tokens
import '../packages/design-tokens/styles/components/badge.css';
import '../packages/design-tokens/styles/components/avatar.css';
import '../packages/design-tokens/styles/components/responsive-tabs.css';
import '../packages/design-tokens/styles/components/table.css';
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
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      React.useEffect(() => {
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.className = `theme-${theme}`;
      }, [theme]);

      return (
        <ThemeProvider initialTheme={theme}>
          <div style={{
            minHeight: '100vh',
            backgroundColor: 'var(--dyn-semantic-background)',
            color: 'var(--dyn-semantic-text)',
            padding: '1rem'
          }}>
            <Story />
          </div>
        </ThemeProvider>

      );
    },
  ],
};

export default preview;
