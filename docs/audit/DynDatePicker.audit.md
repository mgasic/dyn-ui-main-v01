# DynDatePicker Component Audit

## 1. Analiza i Istraživanje Standarda

### Reference Komponente
Analizirane su sledeće moderne reference:
- **React Aria CalendarDate** (Adobe) - zlatni standard za accessibility
- **MUI DatePicker** - najpopularniji React UI framework
- **DayPicker** (react-day-picker) - lightweight rešenje

### Slika referentnog kalendara (od korisnika)
![Korisnička referenca](/C:/Users/mgasic/.gemini/antigravity/brain/7cd4dc9b-36ce-471e-b9c8-755854811ddd/uploaded_image_1768992577658.png)

### Ključne Karakteristike Modernih Datepicker-a
| Feature | React Aria | MUI | Naša Komponenta |
|---------|------------|-----|-----------------|
| Visual Calendar Grid | ✅ | ✅ | ❌ |
| Month/Year Navigation | ✅ | ✅ | ❌ |
| Keyboard Arrow Navigation | ✅ | ✅ | ⚠️ Delimično |
| `role="grid"` za kalendar | ✅ | ✅ | ❌ |
| `aria-activedescendant` | ✅ | ✅ | ❌ |
| Today Highlighting | ✅ | ✅ | ⚠️ Shortcut Only |
| Localization (i18n) | ✅ | ✅ | ⚠️ Hardcoded |
| Min/Max Date Enforcement | ✅ | ✅ | ⚠️ Props exist, not enforced |
| Range Selection | ✅ | ✅ | ❌ |
| Week Numbers | ✅ | ⚠️ | ❌ |

---

## 2. Code Audit (Problemi i Nedostaci)

### Kritični Nedostaci
- [ ] **NEMA VIZUELNOG KALENDARA**: Dropdown prikazuje samo "Today", "Clear" i help tekst - ne postoji grid sa danima.
- [ ] **Nema navigacije mesec/godina**: Korisnik ne može da prelista mesece.
- [ ] **Hardkodirani stringovi**: "Today", "Clear", "Accepted formats" nisu lokalizovani.

### Token Compliance
- [x] Većina stilova koristi tokene (`--dyn-date-picker-*`).
- [ ] **Hardkodovano**: `height: 2.5rem` u `.input` (linija 32).
- [ ] **Hardkodovano**: `min-height: 2.75rem` u responsive sekciji (linija 146).
- [ ] **Magic number**: `3rem` padding-right u `.input` (linija 33).
- [ ] **Breakpoint**: `767px` nije tokenizovan (linija 143).

### Accessibility
- [x] `role="combobox"` na input-u.
- [x] `aria-haspopup="dialog"` i `aria-expanded`.
- [ ] **Problem**: `role="dialog"` na dropdown-u je pogrešan - trebalo bi `role="grid"` za kalendar.
- [ ] **Nedostaje**: `aria-activedescendant` za fokusirani dan.
- [ ] **Nedostaje**: `aria-label` za svaki dan u kalendaru.

### Funkcionalnost
- [ ] **Min/Max**: Props `min` i `max` postoje ali se ne primenjuju prilikom validacije.
- [ ] **Week Start**: Nema propa za početak nedelje (ponedeljak vs nedelja).

---

## 3. Rangirani Predlozi

### Must Have (Visok prioritet)
1. **Vizuelni Kalendar Grid**: Implementirati 7-kolonski grid sa danima, kao na referentnoj slici.
2. **Navigacija Mesec/Godina**: Dodati strelice za prelazak na prethodni/sledeći mesec.
3. **Today Highlighting**: Označiti današnji dan u gridu.
4. **Selected Day Highlight**: Označiti selektovani dan.
5. **Keyboard Navigation**: Strelice za navigaciju unutar grida (Arrow keys, Page Up/Down).
6. **ARIA Grid Role**: `role="grid"` za kalendar, `role="gridcell"` za dane.

### Should Have (Srednji prioritet)
1. **Lokalizacija**: Props za `todayText`, `clearText`, `monthNames`, `dayNames`.
2. **Min/Max Enforcement**: Onemogućiti izbor datuma van min/max opsega.
3. **Week Start Day**: Prop `weekStartsOn` (0=Sun, 1=Mon).
4. **Token Fixes**: Zameniti hardkodovane vrednosti (height, padding, breakpoint).

### Optional (Nizak prioritet)
1. **Range Selection**: Mogućnost izbora opsega datuma.
2. **Week Numbers**: Prikaz broja nedelje.
3. **Multiple Months**: Prikaz 2+ meseca odjednom.
4. **Year Picker**: Direktan izbor godine.

---

## 4. Predlog Dizajna Kalendara

```
┌─────────────────────────────────────────┐
│  <  januar 2026.                    >   │  ← Navigacija
├─────────────────────────────────────────┤
│  po   ut   sr   če   pe   su   ne       │  ← Dan header
├─────────────────────────────────────────┤
│  29   30   31    1    2    3    4       │
│   5    6    7    8    9   10   11       │
│  12   13   14   15   16   17   18       │
│  19   20  [21]  22   23   24   25       │  ← [21] = selektovan
│  26   27   28   29   30   31    1       │
└─────────────────────────────────────────┘
```

---

## 5. Change History
| Datum | Autor | Opis promene |
|-------|-------|--------------|
| 2026-01-21 | AI Agent | Inicijalni audit i gap analiza |
