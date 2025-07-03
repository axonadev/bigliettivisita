# Layout Module

Questo modulo gestisce la struttura principale del layout dell'applicazione.

## Struttura

```
layout/
├── Layout.jsx              # Componente principale del layout
├── DesktopSideMenu.jsx     # Menu laterale per desktop
├── MainContent.jsx         # Container del contenuto principale
├── LayoutContext.jsx       # Context per condividere stato del layout
├── constants.js            # Costanti del layout
├── hooks.js               # Hook personalizzati per il layout
├── styles.js              # Stili e funzioni di styling
├── index.js               # Barrel export
└── README.md              # Documentazione
```

## Componenti

### Layout

Il componente principale che orchestra tutti gli altri componenti:

- Header fisso
- Menu laterale (desktop) / FAB (mobile)
- Contenuto principale scrollabile
- Footer

### DesktopSideMenu

Menu laterale per dispositivi desktop con:

- Pulsante toggle per aprire/chiudere
- Transizioni smooth
- Responsive width

### MainContent

Container per il contenuto principale:

- Scrollable
- Margin responsive basato sul menu laterale
- Semantic HTML (main element)

## Context

Il `LayoutContext` fornisce:

- `sideMenuOpen`: stato del menu laterale
- `setSideMenuOpen`: funzione per modificare lo stato
- `isMobile`: flag per dispositivi mobile
- `dimensions`: dimensioni dello schermo
- `sideMenuWidth`: larghezza corrente del menu

## Hook

### useSideMenuDimensions

Calcola automaticamente le dimensioni del menu laterale basandosi su:

- Stato aperto/chiuso
- Larghezza dello schermo
- Costanti configurabili

### useLayoutBreakpoints

Fornisce breakpoints responsive per:

- Mobile
- Tablet
- Desktop

## Costanti

Tutte le costanti del layout sono centralizzate in `constants.js`:

- Dimensioni header
- Dimensioni menu laterale
- Transizioni
- Z-index

## Utilizzo

```jsx
import Layout from "./layout";

function App() {
  return (
    <Layout>
      <YourContent />
    </Layout>
  );
}
```

## Caratteristiche

- ✅ Completamente responsive
- ✅ Menu laterale fisso durante scroll
- ✅ Transizioni smooth
- ✅ Context per condivisione stato
- ✅ Hook riutilizzabili
- ✅ Codice modulare e manutenibile
- ✅ Accessibilità (ARIA labels, semantic HTML)
- ✅ Performance ottimizzate (useMemo, useCallback)
