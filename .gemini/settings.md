# DYN UI - Gemini Settings

## Project Context

**Naziv**: DYN UI Component Library  
**Tip**: React Component Library sa Design Token sistemom  
**Paketi**:
- `@dyn-ui/design-tokens` - Design tokeni
- `@dyn-ui/react` - React komponente

## Agent Behavior

### Language
- Korisnik preferira **srpski** jezik za komunikaciju
- Kod i komentari ostaju na **engleskom**

### Default Actions
- Pre rada na komponenti: učitaj `docs/DESIGN_TOKEN_SYSTEM.md`
- Pri modifikaciji CSS-a: proveri token usklađenost
- Pri kreiranju tokena: dodaj u JSON i regeneriši

### Skill to Load
Pri radu na komponentama automatski učitaj:
```
.agent/skills/component-compliance/SKILL.md
```

### Workflows to Use
Za kompletan component compliance:
```
/component-docs-compliance
```

Za pojedinačne faze:
```
/1-analysis
/2-code-audit
/3-proposal
/4-implementation
/5-testing
/6-audit-log
```

## Key Paths

| Resource | Path |
|----------|------|
| Rules | `.gemini/rules.md` |
| Skill | `.agent/skills/component-compliance/SKILL.md` |
| Workflows | `.agent/workflows/` |
| Docs | `docs/` |
| Token JSON | `packages/design-tokens/tokens/` |
| Components | `packages/dyn-ui-react/src/components/` |
