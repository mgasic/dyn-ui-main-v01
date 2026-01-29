# 🚀 DYN-UI Quick Start & Testing Guide

Ovaj vodič opisuje kako pokrenuti kompletan sistem (Frontend + Backend) i izvršiti verifikaciju integracije.

## 1. Preduslovi
-   **Node.js**: v18 ili noviji
-   **pnpm**: v9+ (koristimo pnpm workspace)
-   **Visual Studio Code** (preporučeno)

## 2. Instalacija i Setup

Pokrenite sledeće komande redom iz root direktorijuma (`e:\PROGRAMING\AI_Projects\dyn-ui-main-v02`):

```bash
# 1. Instalacija svih zavisnosti
pnpm install

# 2. Setup baze podataka (Backend)
cd packages/dyn-ui-backend
npx pnpm prisma db push   # Kreira SQLite bazu i šemu
npx pnpm prisma db seed   # Puni bazu test podacima
```

## 3. Pokretanje Sistema

Potrebna su dva terminala za paralelno pokretanje.

**Terminal 1: Backend API**
```bash
# Iz root foldera ili packages/dyn-ui-backend
cd packages/dyn-ui-backend
npm run dev
# Očekivani ispis: ⚡️[server]: Server is running at http://localhost:3001
```

**Terminal 2: Frontend Storybook**
```bash
# Iz root foldera
npm run storybook
# Otvara Storybook na http://localhost:6006
```

---

## 4. Testiranje Integracije (Test Cases)

Kada su oba servera pokrenuta, idite u Storybook na sekciju **Integration/BackendDemo**.

### Test Case 1: Verifikacija Dugmeta (Dashboard)
1.  Otvorite story **Button From Backend**.
2.  **Akcija**: Posmatrajte komponentu.
3.  **Očekivani rezultat**: 
    *   Prikazuje se dugme sa tekstom "Create New Item".
    *   Stil dugmeta je `primary` i veličina `lg`.
    *   Ispod dugmeta se vidi JSON config: `{"kind": "primary", "size": "lg" ...}`.

### Test Case 2: Verifikacija Tabele (Dashboard)
1.  Otvorite story **Table From Backend**.
2.  **Akcija**: Posmatrajte tabelu.
3.  **Očekivani rezultat**:
    *   Prikazuje se tabela sa kolonama: ID, Name, Status.
    *   Paginacija pokazuje pageSize: 10.
    *   Podaci su učitani (mock podaci iz backend DataController-a).

### Test Case 3: Verifikacija Podešavanja (Settings)
1.  Otvorite story **Switch From Backend**.
2.  **Akcija**: Posmatrajte switch komponentu.
3.  **Očekivani rezultat**:
    *   Prikazuje se switch sa labelom "Enable Email Notifications".
    *   Switch je po defaultu uključen (ON).

### Troubleshooting
*   **Greška "Failed to fetch config"**: Proverite da li backend radi na portu 3001 (`curl http://localhost:3001/api/components/1`).
*   **Pogrešan izgled**: Proverite da li su design tokeni buildovani (`npm run tokens:build`).
