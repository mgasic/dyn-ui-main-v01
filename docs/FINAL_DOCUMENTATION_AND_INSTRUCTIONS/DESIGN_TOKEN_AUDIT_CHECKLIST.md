# 💎 Design Token Audit Checklist

Ovaj checklist služi za proveru `design-tokens` paketa i osiguranje da su "izvori istine" (JSON) ispravno transformisani u upotrebljive CSS varijable.

## 1. Nivo: Definicija (Source JSON)
*Proveravamo `tokens/*.json` fajlove.*

- [ ] **Semantic Naming**: Da li nazivi tokena opisuju *namenu*, a ne *izgled*? (npr. `action-fontSize` umesto `font-size-12`).
- [ ] **Referencing (Alias)**: Da li se u JSON-u koriste reference na osnovne (foundation) tokene?
    *   *Primer:* `"value": "{font.size.xs.value}"` u `table.json`.
- [ ] **No Raw Hardcoding**: Da li postoji bilo koja hex boja ili px vrednost u komponentnim JSON fajlovima koja bi trebala biti foundation token?

## 2. Nivo: Generisanje (Build Output)
*Proveravamo `dist/` i `styles/` generisane fajlove.*

- [ ] **Structure Alignment**: Da li generisani CSS prati strukturu JSON hijerarhije?
- [ ] **Global Availability**: Da li su foundation tokeni (`--dyn-font-size-*`) dostupni u globalnom `index.css` (Level 1)?
- [ ] **Component Specificity**: Da li generisani CSS za komponente (`table.css`) ispravno mapira foundation tokene na lokalne semantičke tokene?
    *   *Primer:* `--dyn-table-action-fontSize: var(--dyn-font-size-xs);`

## 3. Nivo: Referenciranje (Implementation)
*Proveravamo kako React komponente konzumiraju ove tokene.*

- [ ] **3-Level Fallback**: Da li komponenta u svom `.module.css` koristi lanac od 3 nivoa?
    *   `property: var(--dyn-comp-override, var(--dyn-comp-semantic, var(--dyn-global-fallback)));`
- [ ] **Consistency**: Da li se ista varijabla koristi za iste namene kroz različite komponente (npr. isti `--dyn-spacing-sm` za padding)?

## 4. Nivo: Verifikacija (DevTools / Runtime)
*Proveravamo u browseru.*

- [ ] **Token Traceability**: Da li u inspektoru možemo da pratimo varijablu od komponente nazad do foundation tokena?
- [ ] **Override Safety**: Da li definisanje Layer 3 varijable u inline stilu ispravno "gazi" celu granu bez pucanja layouta?

---

### Zašto je ovo važno?
Ovaj audit osigurava da promena jednogfoundation tokena (npr. primarne boje) ispravno "procuri" kroz sve komponente, dok istovremeno omogućava da tabela ima svoju specifičnu definiciju te iste boje koju možemo nezavisno menjati.
