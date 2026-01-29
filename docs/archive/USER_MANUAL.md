# 📖 DYN-UI Korisničko Uputstvo (User Manual)

Ovaj dokument opisuje kako koristiti DYN-UI biblioteku komponenti u razvoju aplikacija.

## 1. Upotreba Komponenti

Svaka komponenta u DYN-UI dizajnirana je da se koristi kao standardna React komponenta, ali sa potpunom podrškom za definisane design tokene.

### 1.1 Osnovna Upotreba
Importujte komponentu iz `@dyn-ui/react` paketa.

```tsx
import { DynButton } from '@dyn-ui/react';

function App() {
  return (
    <DynButton kind="primary" size="md" onClick={() => alert('Clicked!')}>
      Pošalji Podatke
    </DynButton>
  );
}
```

### 1.2 Varijante (Variants)
Većina komponenti podržava `kind` ili `variant` prop koji kontroliše vizuelni stil.
*   `primary`: Za glavne akcije.
*   `secondary`: Za sporedne akcije.
*   `danger`: Za destruktivne akcije (brisanje).
*   `ghost`: Za akcije sa manje vizuelne težine.

---

## 2. Kompozicija Komponenti

DYN-UI komponente su napravljene da rade zajedno ("Atomic Design"). Evo primere složenijih obrazaca.

### 2.1 Kartica sa Akcijama (Card Pattern)
Kombinovanje `DynBox` (layout), `DynTypography` (tekst) i `DynButton` (akcija).

```tsx
/* Primer pseudo-koda */
<div className="card">
  <h3>Naslov Kartice</h3>
  <p>Opis sadržaja...</p>
  
  <div className="actions">
    <DynButton kind="secondary">Odustani</DynButton>
    <DynButton kind="primary">Sačuvaj</DynButton>
  </div>
</div>
```

### 2.2 Forma (Form Pattern)
Kombinovanje inputa, switch-eva i validacije.

```tsx
<form>
  <DynTextField label="Korisničko Ime" required />
  <DynSwitch label="Pretplati me na newsletter" defaultChecked />
  <DynButton type="submit">Registruj se</DynButton>
</form>
```

---

## 3. Deljenje i Ponovna Upotreba (Configuration Sharing)

Zahvaljujući backend integraciji, iste konfiguracije komponenti se mogu deliti između različitih klijenata (Web, Mobile - u budućnosti).

### 3.1 Backend-Driven Konfiguracija
Umesto hardkodiranja props-a, koristite `useComponentConfig`.

**Scenario:** Želite da promenite tekst dugmeta na svim klijentima bez deploy-a koda.

1.  **Frontend**:
    ```tsx
    const { config } = useComponentConfig('marketing-cta-button');
    return <DynButton {...config} />;
    ```
2.  **Backend (Database)**:
    Ažurirajte `configuration` JSON za komponentu 'marketing-cta-button'.
    ```json
    { "children": "Iskoristi Popust Odmah!", "kind": "primary" }
    ```
3.  **Rezultat**: Svi korisnici odmah vide novi tekst.

### 3.2 Predefinisanje UI Stranica
Kompletne stranice se mogu definisati na backendu. Frontend samo iterira kroz listu komponenti koje backend vrati i renderuje ih.

```tsx
// Frontend Page Renderer
const { components } = usePageConfig('dashboard');

return (
  <main>
    {components.map(comp => {
      // Dinamičko renderovanje na osnovu tipa
      const Component = componentMap[comp.componentType];
      return <Component key={comp.id} {...comp.configuration} />;
    })}
  </main>
);
```

---

## 4. Zaključak

DYN-UI sistem nudi fleksibilnost kroz:
1.  **Striktne Design Tokene**: Za vizuelnu konzistentnost.
2.  **Modularne Komponente**: Za lako slaganje (Lego princip).
3.  **Remote Konfiguraciju**: Za upravljanje sadržajem bez kodiranja.
