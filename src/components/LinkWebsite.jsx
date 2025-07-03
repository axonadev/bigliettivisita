import React, { useState, useEffect } from 'react';
import useSave from '../hooks/useSave';

function LinkWebsite({ codcliente, idbvisita, currentWebsite, onLinkSuccess }) {
  console.log('Props di LinkWebsite:', { codcliente, idbvisita, currentWebsite, onLinkSuccess });
  const [websiteUrl, setWebsiteUrl] = useState(currentWebsite || '');
  const { saveData, loading, error, response } = useSave('SalvaBiglietto'); // Usiamo SalvaBiglietto

  useEffect(() => {
    // Aggiorna l'URL del sito web se il currentWebsite prop cambia (es. dopo un refetch)
    setWebsiteUrl(currentWebsite || '');
  }, [currentWebsite]);

  const handleLink = async () => {
    if (!idbvisita) {
      alert("Seleziona prima un biglietto a cui associare il sito.");
      return;
    }
    // Permettiamo di salvare anche una stringa vuota per rimuovere il sito web
    // if (!websiteUrl) {
    //   alert("Inserisci un URL valido.");
    //   return;
    // }
    console.log(`Associazione sito web per biglietto ${idbvisita} (cliente ${codcliente}): ${websiteUrl}`);
    const payload = {
      codcliente,
      idbvisita,
      sitoWeb: websiteUrl // Invia l'URL, anche se vuoto per "rimuovere"
    };
    try {
      const result = await saveData(payload);
      if (result && result.success) {
        console.log('Sito associato con successo:', result.message);
        alert(result.message || 'Sito web associato con successo.');
        if (onLinkSuccess) onLinkSuccess();
      } else {
        alert(result.message || 'Errore durante l\'associazione del sito web.');
      }
    } catch (err) {
      alert(`Errore associazione sito: ${err.message || 'Si è verificato un problema.'}`);
    }
  };

  return (
    <div>
      <h4>{idbvisita ? `Associa/Modifica Sito Web per biglietto ID: ${idbvisita}` : 'Seleziona un biglietto per associare un sito'}</h4>
      {!idbvisita && <p style={{color: 'orange'}}>Salva prima un biglietto per poter associare un sito web.</p>}
      {idbvisita && (
        <>
          <input
            type="url"
            placeholder="https://tuosito.com (lascia vuoto per rimuovere)"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            style={{ width: '70%', marginRight: '10px' }}
            disabled={!idbvisita || loading}
          />
          <button onClick={handleLink} disabled={loading || !idbvisita}>
            {loading ? 'Salvataggio...' : 'Salva Sito Web'}
          </button>
          {error && <p style={{ color: 'red' }}>Errore: {error.message}</p>}
          {response && response.message && !response.success && <p style={{color: 'orange'}}>{response.message}</p>}
        </>
      )}
    </div>
  );
}

export default LinkWebsite;
