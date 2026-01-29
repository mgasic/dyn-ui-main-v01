# COMPONENT TEMPLATE FILES

## Kako koristiti ovaj folder

Ovaj folder sadrži **šablone za sve nove i refaktorovane komponente** u DYN UI sistemu.

---

## 📁 Struktura

Za svaku komponentu kreiraj folder:

```
src/components/DinComponentName/
├── DinComponentName.tsx              # React komponenta
├── DinComponentName.types.ts         # TypeScript tipovi
├── DinComponentName.module.css       # CSS sa design tokenima
├── DinComponentName.stories.tsx      # Storybook priče
├── DinComponentName.test.tsx         # Jest testovi
├── index.ts                          # Exports
└── README.md                         # Dokumentacija
```

---

## 📝 Korišćenje Šablona

### 1. Kopiraj Template Fajlove

```bash
cp -r templates/DinComponentTemplate src/components/DinYourComponent
```

### 2. Pretvori u Tvoju Komponentu

- Zamijeni `DinComponentTemplate` sa `DinYourComponent`
- Zamijeni `componentTemplate` sa `yourComponent`
- Unesi specifičnu logiku

### 3. Sledi Checklist

- ✅ Svi tokeni koriste `--dyn-` prefiks
- ✅ Trostruki fallback na svim tokenima
- ✅ Dark mode override implementiran
- ✅ Storybook priče za sve varijante
- ✅ Jest testovi (min 80% coverage)
- ✅ Accessibility testovi (axe-core)

---

## 🎯 Fajlovi u Ovom Folderu

1. **DinComponentTemplate.tsx** - React komponenta template
2. **DinComponentTemplate.types.ts** - TypeScript tipovi template
3. **DinComponentTemplate.module.css** - CSS template sa tokenima
4. **DinComponentTemplate.stories.tsx** - Storybook stories template
5. **DinComponentTemplate.test.tsx** - Jest testovi template
6. **README.md** - Dokumentacija template

---

## ⚡ Brzi Start

```bash
# 1. Kopiraj template
cp -r templates/DinComponentTemplate src/components/DinButton

# 2. Pretvori u Button
cd src/components/DinButton
sed -i 's/DinComponentTemplate/DinButton/g' *
sed -i 's/componentTemplate/button/g' *

# 3. Unesi logiku
# - Uredi DinButton.tsx
# - Uredi DinButton.module.css
# - Uredi DinButton.stories.tsx

# 4. Testiraj
npm test
npm run storybook
```

---

## 💡 Best Practices

1. **Token Naming:** `--dyn-[component]-[property]-[state]`
2. **Fallback Chain:** `var(--dyn-component, var(--dyn-foundation, #fallback))`
3. **Dark Mode:** `@media (prefers-color-scheme: dark) { :root { ... } }`
4. **Responsive:** `@media (max-width: 768px) { ... }`
5. **Accessibility:** Focus ring, ARIA labels, keyboard navigation

---

## 📚 Reference Komponente

Koristite ove kao reference za best practices:

- **DinButton** - Button varijante i stanja
- **DinInput** - Form handling
- **DinTable** - Kompleksna komponenta sa svim slojevima

---

## ✅ Checklist Pre Merge-a

- [ ] Svi fajlovi kreirani (TSX, CSS, Types, Stories, Tests)
- [ ] Naming konvencija je ispravna
- [ ] Tokeni su pravilno definirani
- [ ] Dark mode radi
- [ ] Jest testovi pass-uju
- [ ] Storybook priče su kompletan
- [ ] Axe-core audit nema greške
- [ ] README je napisan

---

**Sažetak:** Koristi ove šablone za konzistentnost. Slijedi checklist prije push-a.
