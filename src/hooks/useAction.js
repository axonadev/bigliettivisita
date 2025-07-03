import { useState, useCallback } from 'react';
import { Fai } from '../services/api'; // Assicurati che il percorso sia corretto

/**
 * Hook personalizzato per eseguire azioni generiche simulate.
 * @param {string} actionName - Il nome dell'azione da eseguire.
 * @returns {object} - Oggetto contenente la funzione doAction, stato di caricamento, errore e dati di risposta.
 */
const useAction = (actionName) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const doAction = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const result = await Fai(actionName, params);
      setResponse(result.data);
      setLoading(false);
      return result.data; // Restituisce direttamente i dati della risposta
    } catch (err) {
      console.error(`Errore durante l'esecuzione dell'azione ${actionName}:`, err);
      setError(err);
      setLoading(false);
      throw err; // Rilancia l'errore
    }
  }, [actionName]); // La funzione dipende dal nome dell'azione

  return { doAction, loading, error, response };
};

export default useAction;
