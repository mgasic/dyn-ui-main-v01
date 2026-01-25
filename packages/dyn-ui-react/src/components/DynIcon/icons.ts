import * as React from 'react';

// Built-in icon registry with common SVG icons
export const iconRegistry = {
  check: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: React.createElement('path', {
      d: 'M20 6L9 17l-5-5',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    })
  }),

  close: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('path', {
        key: '1',
        d: 'M18 6L6 18',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }),
      React.createElement('path', {
        key: '2',
        d: 'M6 6l12 12',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      })
    ]
  }),

  warning: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('path', {
        key: '1',
        d: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'
      }),
      React.createElement('line', {
        key: '2',
        x1: '12',
        y1: '9',
        x2: '12',
        y2: '13',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }),
      React.createElement('circle', { key: '3', cx: '12', cy: '17', r: '1' })
    ]
  }),

  info: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('circle', { key: '1', cx: '12', cy: '12', r: '10' }),
      React.createElement('path', {
        key: '2',
        d: 'M12 16v-4',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }),
      React.createElement('path', {
        key: '3',
        d: 'M12 8h.01',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      })
    ]
  }),

  ok: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('circle', { key: '1', cx: '12', cy: '12', r: '10' }),
      React.createElement('path', {
        key: '2',
        d: 'M9 12l2 2 4-4',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      })
    ]
  }),

  minus: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: React.createElement('line', {
      x1: '5',
      y1: '12',
      x2: '19',
      y2: '12',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    })
  }),

  plus: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('line', {
        key: '1',
        x1: '12',
        y1: '5',
        x2: '12',
        y2: '19',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }),
      React.createElement('line', {
        key: '2',
        x1: '5',
        y1: '12',
        x2: '19',
        y2: '12',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      })
    ]
  }),

  download: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('path', {
        key: '1',
        d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }),
      React.createElement('polyline', {
        key: '2',
        points: '7,10 12,15 17,10',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }),
      React.createElement('line', {
        key: '3',
        x1: '12',
        y1: '15',
        x2: '12',
        y2: '3',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      })
    ]
  }),

  settings: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('circle', { key: '1', cx: '12', cy: '12', r: '3' }),
      React.createElement('path', {
        key: '2',
        d: 'M12 1v6m0 6v6m11-7h-6m-6 0H1',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      })
    ]
  }),

  help: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('circle', { key: '1', cx: '12', cy: '12', r: '10' }),
      React.createElement('path', {
        key: '2',
        d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }),
      React.createElement('circle', { key: '3', cx: '12', cy: '17', r: '1' })
    ]
  }),

  menu: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('line', { key: '1', x1: '3', y1: '12', x2: '21', y2: '12', strokeLinecap: 'round' }),
      React.createElement('line', { key: '2', x1: '3', y1: '6', x2: '21', y2: '6', strokeLinecap: 'round' }),
      React.createElement('line', { key: '3', x1: '3', y1: '18', x2: '21', y2: '18', strokeLinecap: 'round' })
    ]
  }),

  heart: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: React.createElement('path', {
      d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.781.06-1.06a5.5 5.5 0 0 0 0-7.78z',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    })
  }),

  save: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('path', { key: '1', d: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('polyline', { key: '2', points: '17 21 17 13 7 13 7 21', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('polyline', { key: '3', points: '7 3 7 8 15 8', strokeLinecap: 'round', strokeLinejoin: 'round' })
    ]
  }),

  edit: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('path', { key: '1', d: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('path', { key: '2', d: 'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z', strokeLinecap: 'round', strokeLinejoin: 'round' })
    ]
  }),

  delete: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('polyline', { key: '1', points: '3 6 5 6 21 6', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('path', { key: '2', d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('line', { key: '3', x1: '10', y1: '11', x2: '10', y2: '17', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('line', { key: '4', x1: '14', y1: '11', x2: '14', y2: '17', strokeLinecap: 'round', strokeLinejoin: 'round' })
    ]
  }),

  share: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('path', { key: '1', d: 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('polyline', { key: '2', points: '16 6 12 2 8 6', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('line', { key: '3', x1: '12', y1: '2', x2: '12', y2: '15', strokeLinecap: 'round', strokeLinejoin: 'round' })
    ]
  }),

  desktop: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('rect', { key: '1', x: '2', y: '3', width: '20', height: '14', rx: '2', ry: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('line', { key: '2', x1: '8', y1: '21', x2: '16', y2: '21', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('line', { key: '3', x1: '12', y1: '17', x2: '12', y2: '21', strokeLinecap: 'round', strokeLinejoin: 'round' })
    ]
  }),

  bookmark: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: React.createElement('path', {
      d: 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    })
  }),

  calendar: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('rect', { key: '1', x: '3', y: '4', width: '18', height: '18', rx: '2', ry: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('line', { key: '2', x1: '16', y1: '2', x2: '16', y2: '6', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('line', { key: '3', x1: '8', y1: '2', x2: '8', y2: '6', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('line', { key: '4', x1: '3', y1: '10', x2: '21', y2: '10', strokeLinecap: 'round', strokeLinejoin: 'round' })
    ]
  }),

  search: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('circle', { key: '1', cx: '11', cy: '11', r: '8' }),
      React.createElement('line', { key: '2', x1: '21', y1: '21', x2: '16.65', y2: '16.65', strokeLinecap: 'round', strokeLinejoin: 'round' })
    ]
  }),

  notifications: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('path', { key: '1', d: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('path', { key: '2', d: 'M13.73 21a2 2 0 0 1-3.46 0', strokeLinecap: 'round', strokeLinejoin: 'round' })
    ]
  }),

  'chevron-down': React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: React.createElement('polyline', { points: '6 9 12 15 18 9', strokeLinecap: 'round', strokeLinejoin: 'round' })
  }),

  'chevron-up': React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: React.createElement('polyline', { points: '18 15 12 9 6 15', strokeLinecap: 'round', strokeLinejoin: 'round' })
  }),

  'chevron-left': React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: React.createElement('polyline', { points: '15 18 9 12 15 6', strokeLinecap: 'round', strokeLinejoin: 'round' })
  }),

  'chevron-right': React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: React.createElement('polyline', { points: '9 18 15 12 9 6', strokeLinecap: 'round', strokeLinejoin: 'round' })
  }),

  'more-horizontal': React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('circle', { key: '1', cx: '12', cy: '12', r: '1' }),
      React.createElement('circle', { key: '2', cx: '19', cy: '12', r: '1' }),
      React.createElement('circle', { key: '3', cx: '5', cy: '12', r: '1' })
    ]
  }),

  folder: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: React.createElement('path', {
      d: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    })
  }),

  file: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('path', { key: '1', d: 'M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('polyline', { key: '2', points: '13 2 13 9 20 9', strokeLinecap: 'round', strokeLinejoin: 'round' })
    ]
  }),

  loading: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: React.createElement('path', {
      d: 'M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    })
  }),

  star: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: React.createElement('path', {
      d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    })
  }),

  'arrow-right': React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('line', { key: '1', x1: '5', y1: '12', x2: '19', y2: '12', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('polyline', { key: '2', points: '12 5 19 12 12 19', strokeLinecap: 'round', strokeLinejoin: 'round' })
    ]
  }),
  'check-square': React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('polyline', { key: '1', points: '9 11 12 14 22 4', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('path', { key: '2', d: 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11', strokeLinecap: 'round', strokeLinejoin: 'round' })
    ]
  }),

  mail: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('path', { key: '1', d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('polyline', { key: '2', points: '22,6 12,13 2,6', strokeLinecap: 'round', strokeLinejoin: 'round' })
    ]
  }),

  user: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('path', { key: '1', d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('circle', { key: '2', cx: '12', cy: '7', r: '4', strokeLinecap: 'round', strokeLinejoin: 'round' })
    ]
  }),

  lock: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('rect', { key: '1', x: '3', y: '11', width: '18', height: '11', rx: '2', ry: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('path', { key: '2', d: 'M7 11V7a5 5 0 0 1 10 0v4', strokeLinecap: 'round', strokeLinejoin: 'round' })
    ]
  }),

  eye: React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('path', { key: '1', d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('circle', { key: '2', cx: '12', cy: '12', r: '3', strokeLinecap: 'round', strokeLinejoin: 'round' })
    ]
  }),

  'eye-off': React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    children: [
      React.createElement('path', { key: '1', d: 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24', strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('line', { key: '2', x1: '1', y1: '1', x2: '23', y2: '23', strokeLinecap: 'round', strokeLinejoin: 'round' })
    ]
  }),
};

export type IconName = keyof typeof iconRegistry;

export const getIcon = (name: string): React.ReactElement | null => {
  return iconRegistry[name as IconName] || null;
};