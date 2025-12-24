# DYN UI - Strategija za Nove Komponente i Roadmap
## Verzija 1.0 - Decembar 2025

---

## 📍 Uvod

Ovaj dokument definiše nove komponente koje trebalo bi da se dodaju u DYN UI sistem kako bi se postiglo **potpuno enterprise-ready** rješenje. Fokus je na:

- 🎯 Često korišćene komponente koje nedostaju
- 🎯 Komponente koje omogućavaju kompleksnije upotrebne slučajeve
- 🎯 Standardizovan pristup kreiranju svake nove komponente
- 🎯 Prioritizacija i timeline

---

## 🗂️ MATRIKS POTREBNIH KOMPONENTI

### TIER 1: KRITIČNE (Trebalo bi odmah)

| Komponenta | Namjena | Prioritet | Kompleksnost | Procjena |
|-----------|---------|----------|--------------|----------|
| **DinCard** | Kontejner sa varijantama | CRITICAL | Medium | 8h |
| **DinAlert** | Notifikacije stanja (info, success, warning, error) | CRITICAL | Medium | 8h |
| **DinToast** | Transient notifikacije u uglu | HIGH | Medium | 10h |
| **DinSkeleton** | Loading placeholder | MEDIUM | Medium | 6h |
| **DinProgress** | Progress bar / indikator | MEDIUM | Low | 6h |
| **DinDivider** | Vizuelni separator | MEDIUM | Low | 2h |

### TIER 2: VAŽNE (Trebalo bi sada ili uskoro)

| Komponenta | Namjena | Prioritet | Kompleksnost | Procjena |
|-----------|---------|----------|--------------|----------|
| **DinDropdown** | Advansiran select sa filterom | HIGH | Medium-High | 12h |
| **DinDatePicker** | Kalendarni odabir datuma | HIGH | High | 20h |
| **DinTimePicker** | Odabir vremena | MEDIUM | Medium | 10h |
| **DinAvatar** | Korisničke slike | MEDIUM | Low | 4h |
| **DinRating** | Star rating sistem | MEDIUM | Medium | 6h |
| **DinUpload** | File upload komponenta | MEDIUM | High | 16h |
| **DinCode** | Code editor/display sa syntax highlighting | LOW | High | 18h |

### TIER 3: NICE-TO-HAVE (Budućnost)

| Komponenta | Namjena | Prioritet | Kompleksnost | Procjena |
|-----------|---------|----------|--------------|----------|
| **DinPagination** | (Već trebalo bi da postoji - provjera) | - | Low | 4h |
| **DinSearch** | Search bar sa sugestijama | LOW | Medium | 12h |
| **DinNotification** | Notification center | LOW | High | 24h |
| **DinCarousel** | Image carousel/slider | LOW | Medium-High | 16h |
| **DinCanvas** | Drawing canvas | VERY LOW | Very High | 30h |
| **DinChart** | Chart komponenta | VERY LOW | Very High | 40h |

---

## 📐 TEMPLATE ZA NOVU KOMPONENTU

Svaka nova komponenta trebala bi slijediti ovaj template:

```
src/components/Din[ComponentName]/
├── Din[ComponentName].tsx              # React komponenta
├── Din[ComponentName].types.ts         # TypeScript tipovi
├── Din[ComponentName].module.css       # CSS sa design tokenima
├── Din[ComponentName].stories.tsx      # Storybook priče
├── Din[ComponentName].test.tsx         # Jest testovi
└── IMPLEMENTATION_GUIDE.md             # Specifična dokumentacija
```

### DIN[COMPONENTNAME].TSX

```tsx
/**
 * Din[ComponentName] - Opis komponente
 * 
 * @example
 * <Din[ComponentName] variant="primary" size="medium">
 *   Content
 * </Din[ComponentName]>
 * 
 * @component
 */

import React from 'react';
import classNames from 'classnames';
import styles from './Din[ComponentName].module.css';
import type { Din[ComponentName]Props } from './Din[ComponentName].types';

export const Din[ComponentName] = React.forwardRef<
  HTMLDivElement,
  Din[ComponentName]Props
>(
  (
    {
      variant = 'primary',
      size = 'medium',
      disabled = false,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={classNames(
          styles.component,
          styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
          styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
          {
            [styles.disabled]: disabled,
          },
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Din[ComponentName].displayName = 'Din[ComponentName]';
```

### DIN[COMPONENTNAME].TYPES.TS

```tsx
import { HTMLAttributes } from 'react';

export interface Din[ComponentName]Props extends HTMLAttributes<HTMLDivElement> {
  /**
   * Variant ili stil komponente
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  
  /**
   * Veličina komponente
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Disabled stanje
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Sadržaj komponente
   */
  children?: React.ReactNode;
}
```

### DIN[COMPONENTNAME].MODULE.CSS

```css
/**
 * Din[ComponentName] - Opis komponente
 * 
 * Varijante:
 * - variant: primary, secondary, tertiary
 * 
 * Veličine:
 * - size: small, medium, large
 * 
 * Stanja:
 * - default, hover, focus, active, disabled
 * 
 * Dark mode: Podržano
 * Responsive: Podržano
 */

/* ============================================
   COMPONENT TOKENS
   ============================================ */

:root {
  /* Base tokens */
  --dyn-[component]-bg: var(--dyn-color-white, #FFFFFF);
  --dyn-[component]-text: var(--dyn-color-gray-1000, #000000);
  --dyn-[component]-border: var(--dyn-color-gray-300, #D0D0D0);
  --dyn-[component]-padding: var(--dyn-spacing-3, 12px);
  --dyn-[component]-border-radius: var(--dyn-radius-md, 6px);
  --dyn-[component]-font-size: var(--dyn-font-size-base, 14px);
  
  /* Hover state */
  --dyn-[component]-bg-hover: var(--dyn-color-gray-100, #F5F5F5);
  
  /* Focus state */
  --dyn-[component]-focus-ring: var(--dyn-focus-ring);
  
  /* Disabled state */
  --dyn-[component]-disabled-opacity: var(--dyn-opacity-50, 0.5);
  
  /* Variants */
  --dyn-[component]-primary-bg: var(--dyn-color-primary-60, #007ACC);
  --dyn-[component]-primary-text: var(--dyn-color-white, #FFFFFF);
  --dyn-[component]-secondary-bg: var(--dyn-color-gray-200, #F0F0F0);
  --dyn-[component]-secondary-text: var(--dyn-color-gray-1000, #000000);
  
  /* Sizes */
  --dyn-[component]-small-padding: var(--dyn-spacing-2, 8px);
  --dyn-[component]-small-font-size: var(--dyn-font-size-sm, 12px);
  --dyn-[component]-large-padding: var(--dyn-spacing-4, 16px);
  --dyn-[component]-large-font-size: var(--dyn-font-size-lg, 16px);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-[component]-bg: var(--dyn-color-gray-900, #1A1A1A);
    --dyn-[component]-text: var(--dyn-color-gray-50, #F5F5F5);
    --dyn-[component]-border: var(--dyn-color-gray-700, #404040);
    --dyn-[component]-bg-hover: var(--dyn-color-gray-800, #2D2D2D);
  }
}

/* High contrast */
@media (prefers-contrast: more) {
  :root {
    --dyn-[component]-focus-ring: 3px solid var(--dyn-color-black, #000000);
    --dyn-[component]-border: var(--dyn-color-black, #000000);
  }
}

/* ============================================
   COMPONENT STYLES
   ============================================ */

.component {
  background-color: var(--dyn-[component]-bg, var(--dyn-color-white, #FFFFFF));
  color: var(--dyn-[component]-text, var(--dyn-color-gray-1000, #000000));
  border: 1px solid var(--dyn-[component]-border, var(--dyn-color-gray-300, #D0D0D0));
  padding: var(--dyn-[component]-padding, 12px);
  border-radius: var(--dyn-[component]-border-radius, 6px);
  font-size: var(--dyn-[component]-font-size, 14px);
  transition: background-color 150ms ease-in-out,
              border-color 150ms ease-in-out,
              box-shadow 150ms ease-in-out;
}

.component:hover {
  background-color: var(--dyn-[component]-bg-hover, #F5F5F5);
  border-color: var(--dyn-color-gray-400, #999999);
}

.component:focus {
  outline: var(--dyn-[component]-focus-ring, 2px solid #007ACC);
  outline-offset: 2px;
}

.component.disabled {
  opacity: var(--dyn-[component]-disabled-opacity, 0.5);
  cursor: not-allowed;
  pointer-events: none;
}

/* ============================================
   VARIANTS
   ============================================ */

.componentPrimary {
  --dyn-[component]-bg: var(--dyn-[component]-primary-bg);
  --dyn-[component]-text: var(--dyn-[component]-primary-text);
}

.componentSecondary {
  --dyn-[component]-bg: var(--dyn-[component]-secondary-bg);
  --dyn-[component]-text: var(--dyn-[component]-secondary-text);
}

/* ============================================
   SIZES
   ============================================ */

.componentSmall {
  --dyn-[component]-padding: var(--dyn-[component]-small-padding);
  --dyn-[component]-font-size: var(--dyn-[component]-small-font-size);
}

.componentLarge {
  --dyn-[component]-padding: var(--dyn-[component]-large-padding);
  --dyn-[component]-font-size: var(--dyn-[component]-large-font-size);
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 768px) {
  .component {
    /* Responsive adjustments */
  }
}
```

### DIN[COMPONENTNAME].STORIES.TSX

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Din[ComponentName] } from './Din[ComponentName]';

const meta: Meta<typeof Din[ComponentName]> = {
  title: 'Components/Din[ComponentName]',
  component: Din[ComponentName],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Variant ili stil komponente',
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
      description: 'Veličina komponente',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled stanje',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Primary [ComponentName]',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    children: 'Secondary [ComponentName]',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    children: 'Small [ComponentName]',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    children: 'Large [ComponentName]',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: true,
    children: 'Disabled [ComponentName]',
  },
};
```

### DIN[COMPONENTNAME].TEST.TSX

```tsx
import { render, screen } from '@testing-library/react';
import { Din[ComponentName] } from './Din[ComponentName]';

describe('Din[ComponentName]', () => {
  it('renders correctly', () => {
    render(<Din[ComponentName]>Test Content</Din[ComponentName]>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(
      <Din[ComponentName] variant="secondary">
        Test
      </Din[ComponentName]>
    );
    expect(container.querySelector('.variantSecondary')).toBeInTheDocument();
  });

  it('applies size class', () => {
    const { container } = render(
      <Din[ComponentName] size="large">
        Test
      </Din[ComponentName]>
    );
    expect(container.querySelector('.sizeLarge')).toBeInTheDocument();
  });

  it('applies disabled class when disabled', () => {
    const { container } = render(
      <Din[ComponentName] disabled>
        Test
      </Din[ComponentName]>
    );
    expect(container.querySelector('.disabled')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Din[ComponentName] ref={ref}>
        Test
      </Din[ComponentName]>
    );
    expect(ref.current).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Din[ComponentName] className="custom-class">
        Test
      </Din[ComponentName]>
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
```

---

## 🎯 DETALJNE PREDLOŽENE KOMPONENTE

### TIER 1: KRITIČNE

#### 1. DinCard
**Namjena:** Kontejner sa varijantama, koristi se za grupiranje sadržaja

**Varijante:**
- `elevated` - sa senkom (default)
- `outlined` - sa border-om
- `filled` - sa background-om

**Svojstva:**
- Interactive: boolean (hover efekti)
- Clickable: boolean
- Badge/Label: string (gornji ugao)

**Primjer:**
```tsx
<DinCard variant="elevated" interactive>
  <DinCard.Header>Naslov</DinCard.Header>
  <DinCard.Body>Sadržaj</DinCard.Body>
  <DinCard.Footer>Footer</DinCard.Footer>
</DinCard>
```

**Procjena:** 8 sati

---

#### 2. DinAlert
**Namjena:** Prikazivanje statusa/poruka sa različitim severiteta

**Varijante:**
- `info` (plava)
- `success` (zelena)
- `warning` (žuta)
- `error` (crvena)

**Svojstva:**
- icon: boolean
- closable: boolean
- onClose: () => void
- action: ReactNode

**Primjer:**
```tsx
<DinAlert variant="success" icon closable>
  Akcija je uspješno izvršena!
  <DinAlert.Action onClick={() => {}}>
    Undo
  </DinAlert.Action>
</DinAlert>
```

**Procjena:** 8 sati

---

#### 3. DinToast
**Namjena:** Transient notifikacije koje se pojavljuju i nestaju

**Varijante:**
- `info`, `success`, `warning`, `error`

**Svojstva:**
- duration: number (ms, default 3000)
- position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' (default 'top-right')
- action: ReactNode
- autoClose: boolean

**Primjer:**
```tsx
// U komponenti
const { toast } = useToast();

// Korištenje
toast.success('Uspjeh!', { duration: 4000 });
toast.error('Greška!', { action: <button>Retry</button> });
```

**Procjena:** 10 sati

---

#### 4. DinSkeleton
**Namjena:** Loading placeholder tokom učitavanja

**Varijante:**
- `text` (linija teksta)
- `circle` (kružna ikona)
- `rectangular` (pravougaona slika)
- `avatar` (avatar placeholder)

**Svojstva:**
- width: string
- height: string
- variant: 'text' | 'circle' | 'rectangular' | 'avatar'
- count: number (broj linija za text)

**Primjer:**
```tsx
<DinSkeleton variant="avatar" width="48px" height="48px" />
<DinSkeleton variant="text" width="100%" count={3} />
<DinSkeleton variant="rectangular" width="100%" height="200px" />
```

**Procjena:** 6 sati

---

#### 5. DinProgress
**Namjena:** Prikazivanje napretka

**Varijante:**
- `linear` (default)
- `circular`

**Svojstva:**
- value: number (0-100)
- variant: 'success' | 'info' | 'warning' | 'error'
- showLabel: boolean
- animated: boolean

**Primjer:**
```tsx
<DinProgress value={65} showLabel />
<DinProgress 
  variant="circular" 
  value={75} 
  animated
/>
```

**Procjena:** 6 sati

---

#### 6. DinDivider
**Namjena:** Vizuelni separator između elemenata

**Varijante:**
- `horizontal` (default)
- `vertical`

**Svojstva:**
- label: string (optional, prikazuje se naslov)
- orientation: 'horizontal' | 'vertical'

**Primjer:**
```tsx
<div>
  Sadržaj 1
  <DinDivider label="ili" />
  Sadržaj 2
</div>
```

**Procjena:** 2 sata

---

### TIER 2: VAŽNE

#### DinDropdown
- Advanced select sa filterom
- Multi-select opcija
- Group opcije
- Search through items
- 12 sati

#### DinDatePicker
- Kalendarni prikaz
- Range select
- Format customization
- Time picker integration
- 20 sati

#### DinAvatar
- Image/initials display
- Group avatars
- Status indicator
- Fallback ako nema slike
- 4 sata

#### DinRating
- Star rating (default 5 stars)
- Half stars
- Read-only mode
- Custom colors
- 6 sati

#### DinUpload
- Drag & drop
- Multiple files
- Progress bar
- File preview
- 16 sati

---

## 📅 PREDLOŽENI TIMELINE

### Q1 2026 - Faza 1
**Tijdan 1-4 (16 dana):** TIER 1 Komponente

| Nedelja | Aktivnost | Komponente |
|---------|-----------|-----------|
| 1 | Setup, template, dokumentacija | - |
| 2-3 | Razvoj | DinCard, DinAlert |
| 3-4 | Razvoj + QA | DinToast, DinSkeleton, DinProgress, DinDivider |

**Izlaz:** 6 novih komponenti, pune dokumentirane i testirane

### Q1 2026 - Faza 2
**Tjedan 5-8 (16 dana):** TIER 2 (prvi dio)

| Nedelja | Komponente |
|---------|-----------|
| 5-6 | DinAvatar, DinRating |
| 6-7 | DinDropdown (prvi dio) |
| 7-8 | QA i dokumentacija |

### Q2 2026 - Faza 3
**Naprednije:** DatePicker, Upload, itd.

---

## 🏗️ ARHITEKTURA ZA NOVE KOMPONENTE

### Build Process
```bash
# 1. Komponenta se kreira sa templateom
# 2. CSS sa design tokenima (generiše se sa Style Dictionary build)
# 3. Typescript - strict mode
# 4. Jest testovi - minimum 80% coverage
# 5. Storybook priče
# 6. Accessibility audit (axe-core)
```

### Dokumentacija Standardy
- README.md sa primjerima
- IMPLEMENTATION_GUIDE.md sa detalјima
- Tokenski katalog
- Migration guide (ako je breaking change)

### QA Checklist
```
- [ ] Light mode - sve varijante
- [ ] Dark mode - sve varijante
- [ ] High contrast mode
- [ ] Mobile responsive (320px, 768px, 1024px)
- [ ] Keyboard navigacija (Tab, Enter, Escape)
- [ ] Screen reader (ARIA labels)
- [ ] Axe-core audit - zero errors
- [ ] Jest coverage >= 80%
- [ ] Storybook stories su kompletan
- [ ] Design tokens su pravilno korišteni
```

---

## 💡 BEST PRACTICES ZA NOVE KOMPONENTE

### 1. Kopiraj Token Pattern od Dobrog Primjera
- DinButton - Button varijante
- DinInput - Form handling
- DinTable - Complex componenta

### 2. Koristi Existing Tokens
Ne kreiruj nove tokene ako već postoje:
- Boje - koristi `--dyn-color-*`
- Spacing - koristi `--dyn-spacing-*`
- Tipografija - koristi `--dyn-font-*`
- Border radius - koristi `--dyn-radius-*`

### 3. Implementiraj Sve Tri Sloja
```
Foundation → Component → Theme (Dark/Light/HC)
```

### 4. Testabilnost
```tsx
// Bitan element trebalo bi da ima data-testid
<button data-testid="component-action">
  Action
</button>

// Koristi u testima
const button = screen.getByTestId('component-action');
```

### 5. Accessibility First
```tsx
// Uvijek koristi ARIA gde trebalo
<div role="alert" aria-live="polite">
  {message}
</div>

// Labele za form inputs
<label htmlFor="unique-id">Label</label>
<input id="unique-id" />

// Focus management
<button
  onKeyDown={(e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  }}
>
  Close
</button>
```

---

## 📊 SAŽETAK

### Nove komponente su kritične za:
✅ Pokrivanje svih common use-case-eva
✅ Enterprise readiness
✅ Konkurentna standardu (Ant Design, Material UI)
✅ Developer satisfaction

### Timeline:
- **Q1 2026:** 6 TIER 1 komponenti
- **Q2 2026:** 5 TIER 2 komponenti
- **Q3 2026:** Advanced komponente

### Ukupna procjena:
- **TIER 1:** 36 sati (6-8 dana za dev tim od 2 osobe)
- **TIER 2:** 90+ sati (12-15 dana)
- **TIER 3:** 100+ sati (15+ dana)

Sljeđenjem ovog plana, DYN UI će biti **potpuno enterprise-ready** design sistem sa svim potrebnim komponentama za modernu web aplikaciju.
