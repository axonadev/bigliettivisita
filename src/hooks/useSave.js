import { useState, useCallback } from 'react';
import { Scrivi } from '../services/api'; // Assicurati che il percorso sia corretto

/**
 * Hook personalizzato per effettuare chiamate API POST/PUT simulate (salvataggio dati).
 * @param {string} endpoint - L'endpoint da chiamare per il salvataggio.
 * @returns {object} - Oggetto contenente la funzione saveData, stato di caricamento, errore e dati di risposta.
 */
const useSave = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const saveData = useCallback(async (body) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const result = await Scrivi(endpoint, body);
      setResponse(result.data);
      setLoading(false);
      return result.data; // Restituisce direttamente i dati della risposta per un uso immediato
    } catch (err) {
      console.error(`Errore durante il salvataggio a ${endpoint}:`, err);
      setError(err);
      setLoading(false);
      throw err; // Rilancia l'errore per permettere al chiamante di gestirlo
    }
  }, [endpoint]); // La funzione dipende dall'endpoint

  return { saveData, loading, error, response };
};

export default useSave;
