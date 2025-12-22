# 🔄 DESIGN TOKENI - REGENERISANJE SA STYLE DICTIONARY

## Situacija

**TVOJE PITANJE:** "Da li treba da se pokrene ponovno generisanje design tokena i kako?"

**ODGOVOR:** ✅ **DA**, trebalo bi, jer:

1. **Kreiram `responsive-tabs.json`** - novi token fajl u Structure Dictionary formatu
2. **Style Dictionary genera CSS** iz JSON fajlova
3. **CSS se trebao regenerisati** i ažurirati

---

## 📐 Šta je Style Dictionary?

Projektat koristi **Style Dictionary** - sistem koji:

```
JSON tokens (humans write)  →  Style Dictionary (machine processes)  →  CSS (browser reads)
     ↑                                    ↓                                  ↓
responsive-tabs.json          style-dictionary.config.js             responsive-tabs-generated.css
```

**Fajlovi u projektu:**
- `packages/design-tokens/style-dictionary.config.js` - Konfiguracija
- `packages/design-tokens/tokens/*.json` - Token definicije (tu je i novi `responsive-tabs.json`)
- `packages/design-tokens/build/` - Generisani CSS/JS (trebalo bi regenerisati)

---

## ✅ ŠTA JE URAĐENO

### Kreirano:
1. ✅ `packages/design-tokens/components/responsive-tabs.css` - Ručno napisan CSS (stari pristup)
2. ✅ `packages/design-tokens/tokens/responsive-tabs.json` - Novi token fajl (Style Dictionary format)
3. ✅ `packages/dyn-ui-react/src/components/DynResponsiveTabs/DynResponsiveTabs.module.css` - CSS sa fallback vrednostima

---

## 🔧 Kako Regenerisati Tokene (KORACI)

### OPCIJA 1: NPM Script (Preporučeno)

```bash
cd dyn-ui-main-v01
cd packages/design-tokens

# Pogledaj dostupne skripte
npm run

# Ako postoji build script
npm run build
```

**Šta će se desiti:**
- Style Dictionary pročita sve `tokens/*.json` fajlove
- Generisaće CSS/JS u `build/css/` i `build/js/`
- Kreira `build/css/tokens.css` sa svim varijablama

### OPCIJA 2: Style Dictionary CLI (Ako `build` ne postoji)

```bash
cd packages/design-tokens

# Instalacija (ako nije)
npm install style-dictionary

# Generisanje
npx style-dictionary build
```

### OPCIJA 3: Manual Check (Ako oba ne rade)

```bash
cd packages/design-tokens

# Proverite šta postoji
ls -la build/
ls -la build/css/

# Ako build folder ne postoji
mkdir -p build/css

# Onda pokrenite build
npx style-dictionary build
```

---

## 📊 Očekivani Rezultat

Ako se tokeni regenerišu uspešno, u `build/css/tokens.css` trebalo bi:

```css
:root {
  --dyn-responsive-tabs-color-background-inactive: #E0D78C;
  --dyn-responsive-tabs-color-background-active: #FFFEF7;
  --dyn-responsive-tabs-color-background-hover: #EDE8B0;
  --dyn-responsive-tabs-color-border: #9C905C;
  --dyn-responsive-tabs-color-text-inactive: #666666;
  --dyn-responsive-tabs-color-text-active: #333333;
  /* ... itd */
}
```

---

## 🔗 Kako to Koristi Komponenta?

### Trenutni Pristup (HYBRID - RADI SADA)

```css
/* DynResponsiveTabs.module.css - Koristi fallback */
background: var(--dyn-responsive-tabs-bg-inactive, #E0D78C);
                                                   ↑ fallback
```

✅ **RADI** - Boje se vide čak i bez regenerisanja!

### Idealni Pristup (Kada se Tokeni Regenerišu)

```css
/* Nakon regenerisanja - Koristi generirane CSS varijable */
background: var(--dyn-responsive-tabs-color-background-inactive);
```

✅ **BOLJE** - Direktno iz generisanog CSS-a

---

## 🚀 Kompletan Workflow (Preporučeni)

### Korak 1: Pull Latest Branch
```bash
cd dyn-ui-main-v01
git checkout feature/design-tokens-responsive-tabs
git pull origin feature/design-tokens-responsive-tabs
```

### Korak 2: Regenerisati Tokene
```bash
cd packages/design-tokens
npm install  # Ako je potrebno
npm run build  # Ili: npx style-dictionary build
```

### Korak 3: Provera
```bash
ls -la build/css/
cat build/css/tokens.css  # Trebao bi da vidi generirane varijable
```

### Korak 4: Pokrenuti Storybook
```bash
cd ../../
npm run storybook
```

### Korak 5: Testirati
- Otvorite DynResponsiveTabs > Default
- Trebalo bi da vidiš boje sa slike

---

## 📝 Šta Ako Build Ne Postoji?

Ako `npm run build` ne postoji, dodaj ga:

```bash
# Otvori: packages/design-tokens/package.json

# Onda dodaj:
"scripts": {
  "build": "style-dictionary build",
  "test": "vitest run --passWithNoTests"
}
```

Tada:
```bash
cd packages/design-tokens
npm install style-dictionary
npm run build
```

---

## 🎯 Status

| Fajl | Status | Opis |
|------|--------|-------|
| `responsive-tabs.json` | ✅ Kreiran | Token definicije u JSON |
| `responsive-tabs.css` (manual) | ✅ Postoji | Backup CSS (ručno napisan) |
| `build/css/tokens.css` (generated) | ⏳ TREBALO BI | Trebalo bi regenerisati |
| `DynResponsiveTabs.module.css` | ✅ Ažuriran | Fallback vrednosti dodate |

---

## 🔄 NEXT STEPS

1. **Osveži granu**
   ```bash
   git pull origin feature/design-tokens-responsive-tabs
   ```

2. **Regenerisati tokene** (ako postoji npm script)
   ```bash
   cd packages/design-tokens
   npm run build
   ```

3. **Testiraj u Storybook**
   ```bash
   npm run storybook
   ```

4. **Javi rezultate** - Radi li? Vidiš li boje?

---

## 📚 References

- **Style Dictionary Docs:** https://styledictionary.com/
- **Konfig Fajl:** `packages/design-tokens/style-dictionary.config.js`
- **Token Fajl:** `packages/design-tokens/tokens/responsive-tabs.json`
- **CSS Output:** `packages/design-tokens/build/css/tokens.css` (trebalo bi)

---

**Status:** 🟢 **READY FOR REGENERATION**

**Sledeći korak:** Pokrenite `npm run build` i javi šta se desi!
