# 🧩 Component Development Guide

Ovaj vodič definiše standarde za implementaciju React komponenti u `dyn-ui` biblioteci.

## 🏗️ Implementacija (CSS Layer)
Sve komponente MORAJU koristiti `.module.css` i pratiti **3-Level Fallback Pattern**:

```css
/* button.module.css */
.root {
  color: var(--dyn-btn-color, var(--dyn-button-color-text, var(--dyn-theme-text-primary)));
}
```
1. **Zelena zona**: `var(--dyn-btn-color)` - Slobodan override za korisnika.
2. **Plava zona**: `var(--dyn-button-color-text)` - Semantički token iz `button.json`.
3. **Crvena zona**: `var(--dyn-theme-text-primary)` - Globalni foundation fallback.

## 🏷️ Konvencije Imenovanja
- **CamelCase**: Koristi `badgeSolid` umesto `badge--solid`.
- **Logic**: Sve varijacije (size, variant) treba da budu definisane kao zasebne klase koje setuju Layer 2 varijable.

## ♿ Pristupačnost (A11y)
- **Aria Attributes**: Koristi `aria-busy`, `aria-label`, `aria-disabled` proaktivno.
- **Keyboard**: Svaki interaktivni element mora biti dostižan putem `Tab` tastera.
- **SR-Only**: Koristi `.dynSrOnly` klasu za tekst koji je bitan samo za screen readere.

## 🧪 Testiranje
- Svaka komponenta mora imati `.test.tsx` fajl.
- Koristi `testA11y(render(<Component />))` helper za automatsku prozeru pristupačnosti.
