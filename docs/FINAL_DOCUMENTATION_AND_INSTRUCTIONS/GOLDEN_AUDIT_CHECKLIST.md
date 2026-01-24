# 🏆 Golden Component Audit Checklist

Za svaku "potvrđenu" komponentu, moramo sprovesti **5 nivoa provere** istim redosledom kako bismo garantovali 100% uskađenost.

## 1. Nivo: Arhitektura Tokena (CSS Layer)
*Proveravamo `.module.css` fajl.*

- [ ] **3-Level Fallback Pattern**: Da li svaka varijabla koristi `var(--comp-token, var(--global-token, fallback))`?
    *   *Primer:* `color: var(--dyn-btn-bg, var(--dyn-theme-primary, #3b82f6));`
- [ ] **Layer 2 (Component Tokens)**: Da li su definisani unutar `.root` ili specifične klase?
- [ ] **Layer 3 (Override Safety)**: Da li su varijable "prazne" (bez fiksnih vrednosti u `.module.css`) tako da ih korisnik može lako pregaziti?
- [ ] **Bez Hardkodovanih Vrednosti**: Da li su sve boje, spacing, radius i shadow vrednosti povučene iz tokena?

## 2. Nivo: Konvencije Imenovanja (React Layer)
*Proveravamo `.tsx` i `.module.css` fajlove.*

- [ ] **CamelCase Classes**: Da li se koriste camelCase imena umesto BEM-a? (nema `badge--solid`, nego `badgeSolid`).
- [ ] **Safe Class Access**: Da li se koristi `getStyleClass` ili `styles.className` umesto stringova?
- [ ] **Prop Destructuring**: Da li su svi props (naročito onKeyDown, onClick, aria-*) ispravno ekstrahovani i primenjeni?

## 3. Nivo: Pristupačnost (DOM Layer)
*Proveravamo rendered HTML u inspektoru.*

- [ ] **Semantic Roles**: Da li interaktivni elementi imaju `role="button"` ili odgovarajuću ulogu?
- [ ] **Aria Labels**: Da li `aria-label`, `aria-busy`, `aria-disabled` i `aria-live` reflektuju trenutno stanje?
- [ ] **SR-Only Content**: Da li se koristi `.dyn-sr-only` klasa za skriveni tekst (unutar `visuallyHidden` logike)?
- [ ] **Keyboard Nav**: Da li element prima fokus (`tabIndex={0}`) i reaguje na `Enter`/`Space`?

## 4. Nivo: Funkcionalna Ispravnost (Test Layer)
*Proveravamo `.test.tsx` fajlove.*

- [ ] **Unit Tests (100% Pass)**: Da li `npx vitest` prolazi bez grešaka?
- [ ] **Accessibility Tests**: Da li `testA11y` helper pokriva komponentu?
- [ ] **Classes Matching**: Da li testovi proveravaju prisustvo CSS modula klasa (kroz `classes.root` a ne fiksne stringove)?

## 5. Nivo: Vizuelni Integritet (UI Layer)
*Proveravamo u Storybook-u.*

- [ ] **Layer 3 Verification**: U browser inspektoru, da li se vidi da se Layer 3 tokeni (oni koje korisnik menja) ispravno primenjuju?
- [ ] **Themes (Dark/Light)**: Da li komponenta automatski menja boje pri promeni teme?
- [ ] **Responsive states**: Da li veličine (`sm`, `md`, `lg`) i utilitiji (npr. `hideOnMobile`) rade?

---

### Redosled izvršavanja provere:
1. **Kodna revizija (Level 1 & 2)** - Najbrže otkriva greške u tokenima.
2. **Automatski testovi (Level 4)** - Osigurava da refaktoring nije slomio logiku.
3. **Vizuelna i DOM inspekcija (Level 3 & 5)** - Finalna potvrda u realnom okruženju (Storybook).
