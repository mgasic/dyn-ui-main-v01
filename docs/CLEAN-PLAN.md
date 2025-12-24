# DYN UI - Design System
## Čist, Fokusirani Plan

---

## 🎯 JEDAN Cilj

**100% design token compliance.**

Nije ništa više. Nije ništa manje.

---

## 📊 Tri Broja

| Problem | Komponente | Sati |
|---------|-----------|------|
| 🔴 P0 - Kritično | 3 | 11 |
| 🟡 P1 - Važno | 5 | 18 |
| 🟢 P2 - Malo | Ostatak | Later |

---

## 🔴 P0 - HITNO (3 komponente, 11 sati)

### 1. DinFlex
- **Problem:** Globalni tokeni → curenja stilova
- **Rješenje:** Prebaci u `.dynFlex` scope
- **Sati:** 3

### 2. DinBadge
- **Problem:** Pogrešna imena tokena (`--badge-accent`)
- **Rješenje:** Koristi `--dyn-badge-primary-bg`
- **Sati:** 4

### 3. DinModal
- **Problem:** Hard-kodirane vrijednosti (`rgba(0,0,0,0.5)`, `500px`)
- **Rješenje:** Prebaci u tokene (`--dyn-overlay-bg`, `--dyn-modal-max-width`)
- **Sati:** 4

---

## 🟡 P1 - VAŽNO (5+ komponenti, 18 sati)

**Input familija - sve trebaju isti strukturirani tokeni:**
- DinInput
- DinCheckbox
- DinRadio
- DinToggle
- DinSelect

---

## ✅ Šta Trebalo Biti Gotovo

1. ✅ Svi tokeni koriste `--dyn-` prefiks
2. ✅ Trostruki fallback: `var(--component, var(--foundation, #hardcoded))`
3. ✅ Dark mode radi na svim komponentama
4. ✅ WCAG AA+ a11y
5. ✅ Jest testovi (80% coverage)
6. ✅ Storybook dokumentovano

---

## 🚀 Kako Početi

### 1. Kopiraj Template
```bash
cp TEMPLATE-* src/components/DinYourComponent/
```

### 2. Pretvori u Tvoju Komponentu
```bash
sed -i 's/ComponentTemplate/YourComponent/g' *
sed -i 's/componentTemplate/yourComponent/g' *
```

### 3. Unesi Logiku
- Uredi `.tsx` fajl
- Uredi `.module.css` - koristi tokene!
- Uredi `.stories.tsx` - sve varijante
- Uredi `.test.tsx` - 80% coverage

### 4. Testiraj
```bash
npm test              # Jest
npm run storybook     # Visual
npm run a11y-audit    # Accessibility
```

---

## 📋 Checklist Pre Merge-a

- [ ] Sve klase koriste pattern: `componentClassName`
- [ ] Svi tokeni: `--dyn-component-property-state`
- [ ] Fallback chain: `var(--dyn-component, var(--dyn-foundation, #hardcoded))`
- [ ] Dark mode test
- [ ] Jest test (80%)
- [ ] Storybook priče
- [ ] Axe-core audit (0 errors)

---

## 🎓 Token Template

```css
/* Foundation - Nikad ne referenciraj druge tokene */
:root {
  --dyn-color-primary: #007ACC;
  --dyn-spacing-3: 12px;
  --dyn-font-size-base: 14px;
}

/* Component - Samo Foundation i fallback */
:root {
  --dyn-button-bg: var(--dyn-color-primary, #007ACC);
  --dyn-button-padding: var(--dyn-spacing-3, 12px);
  --dyn-button-font-size: var(--dyn-font-size-base, 14px);
}

/* Theme - Samo override boja za dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-button-bg: var(--dyn-color-primary-dark, #1084D4);
  }
}
```

---

## 📝 Šta Trebalo Biti u Repo-u

### Templates (6 fajlova)
- ✅ `TEMPLATE-DinComponentTemplate.tsx`
- ✅ `TEMPLATE-DinComponentTemplate.types.ts`
- ✅ `TEMPLATE-DinComponentTemplate.module.css`
- ✅ `TEMPLATE-DinComponentTemplate.stories.tsx`
- ✅ `TEMPLATE-DinComponentTemplate.test.tsx`
- ✅ `COMPONENT-TEMPLATES-README.md`

### Dokumentacija (1 fajl)
- ✅ `IMPLEMENTATION-PLAN.md`

### Što Trebalo Biti Izbrisano
- ❌ Stari nepotrebni dokumenti
- ❌ Duplikati
- ❌ Zamršeni planovi

---

## ⏱️ Timeline

```
Nedelja 1-2:  P0 Refactor
Nedelja 3-4:  P1 Input
Nedelja 5:    QA
Nedelja 6:    Dokumentacija
= 6 nedelja
```

---

## 🎯 Success = Sve Komponente Koriste Tokene

Gotovo.
