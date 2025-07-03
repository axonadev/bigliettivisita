# Biglietti da Visita Digitali: Invio e Gestione

Piattaforma web per la creazione, gestione e invio di biglietti da visita digitali.

## Tech Stack

- **Frontend:** React con Vite
- **Router:** React Router
- **Stato Locale:** (Da definire, Context API o Zustand) - Attualmente si usano `useState` e `useCallback` nei componenti e hooks.
- **API:** Funzioni simulate `Leggi()`, `Scrivi()`, `Fai()` nel file `src/services/api.js`.

## Struttura del Progetto

```
/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/  # Componenti React riutilizzabili
│   │   ├── AdminDashboard.jsx
│   │   ├── CardList.jsx
│   │   ├── LinkWebsite.jsx
│   │   ├── RegistrationForm.jsx
│   │   ├── UploadCard.jsx
│   │   └── VisitCard.jsx
│   ├── hooks/       # Hooks React personalizzati
│   │   └── useFetch.js
│   │   # useSave.js (da implementare)
│   │   # useAction.js (da implementare)
│   │   # useFolderTree.js (da implementare)
│   ├── pages/       # Componenti di pagina (corrispondenti alle rotte)
│   │   └── Home.jsx
│   ├── services/    # Servizi, come le chiamate API simulate
│   │   └── api.js
│   ├── utils/       # Funzioni di utilità generiche (vuota per ora)
│   ├── App.jsx      # Componente principale con il setup del Router
│   ├── index.css    # Stili globali
│   └── main.jsx     # Punto di ingresso dell'applicazione React
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
└── README.md
└── vite.config.js
```

## Setup e Avvio

### Prerequisiti

- Node.js (versione 18.x o superiore consigliata)
- npm (generalmente incluso con Node.js)

### Installazione

1.  Clona il repository (o scarica i file se forniti in altro modo).
2.  Naviga nella directory del progetto:
    ```bash
    cd digital-business-cards
    ```
    (Se il progetto è stato creato in una cartella con questo nome. Altrimenti, usa il nome della cartella radice del progetto.)
3.  Installa le dipendenze:
    ```bash
    npm install
    ```

### Avvio del server di sviluppo

Per avviare l'applicazione in modalità sviluppo (con hot reload):

```bash
npm run dev
```

L'applicazione sarà generalmente disponibile all'indirizzo `http://localhost:5173/` (Vite potrebbe scegliere un'altra porta se la 5173 è occupata).

## Variabili d'Ambiente

Al momento, il progetto non richiede variabili d'ambiente specifiche poiché utilizza API simulate direttamente nel codice.
Se in futuro si integrassero API reali, si potrebbe creare un file `.env` nella root del progetto con la seguente struttura:

```env
VITE_API_BASE_URL=https://api.tuodominio.com/v1
```

E accedere a queste variabili nel codice tramite `import.meta.env.VITE_API_BASE_URL`.

## Funzioni API Simulate

Le funzioni `Leggi()`, `Scrivi()`, e `Fai()` si trovano in `src/services/api.js`. Queste funzioni simulano chiamate di rete con ritardi e restituiscono dati mock. Puoi ispezionare e modificare questo file per testare diversi scenari di risposta.

## Routing

Le rotte definite sono:

| Path                             | Componente Associato | Descrizione                               |
|----------------------------------|----------------------|-------------------------------------------|
| `/`                              | `<Home />`           | Home con CTA registrazione                |
| `/register`                      | `<RegistrationForm />`| Form registrazione cliente                |
| `/admin/:codcliente`             | `<AdminDashboard />` | Dashboard amministrativa cliente          |
| `/visit/:idcliente/:idbvisita`   | `<VisitCard />`      | Pagina pubblica biglietto da visita       |

## Prossimi Passi (Sviluppo)

1.  **Implementare gli hooks mancanti:**
    *   `useSave(endpoint)` per la funzione `Scrivi(endpoint, body)`
    *   `useAction(azione)` per la funzione `Fai(azione, params)`
    *   `useFolderTree(codcliente)` per `Fai("TreeFolder", {codcliente})` (opzionale)
2.  **Completare la logica dei componenti:**
    *   Integrare gli hooks `useSave` e `useAction` nei componenti corrispondenti.
    *   Gestire lo stato di caricamento e gli errori in modo più robusto.
    *   Implementare la logica di interazione utente (es. reindirizzamenti dopo la registrazione, aggiornamento UI dopo upload).
3.  **Scegliere e implementare una soluzione per lo stato globale (se necessario):**
    *   Valutare Context API o Zustand per la gestione dello stato che deve essere condiviso tra componenti non direttamente correlati (es. dati utente autenticato).
4.  **Styling:**
    *   Migliorare l'aspetto visivo dell'applicazione.
5.  **Test:**
    *   Scrivere test unitari e di integrazione.

Questo README fornisce una base. Sentiti libero di espanderlo man mano che il progetto cresce.
