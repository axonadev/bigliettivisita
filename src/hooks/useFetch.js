import { useState, useEffect, useCallback } from 'react';
import { Leggi } from '../services/api'; // Assicurati che il percorso sia corretto

/**
 * Hook personalizzato per effettuare chiamate API GET simulate.
 * @param {string} endpoint - L'endpoint da chiamare.
 * @param {object} initialParams - I parametri iniziali per la richiesta.
 * @param {boolean} autoFetch - Se true, esegue la fetch automaticamente al mount e al cambio di endpoint/params.
 * @returns {object} - Oggetto contenente dati, stato di caricamento, errore e funzione di refetch.
 */
const useFetch = (endpoint, initialParams = {}, autoFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchData = useCallback(async (currentParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await Leggi(endpoint, currentParams);
      setData(response.data);
    } catch (err) {
      console.error(`Errore durante la fetch da ${endpoint}:`, err);
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [endpoint]); // fetchData dipende solo da endpoint per la sua definizione logica

  useEffect(() => {
    if (autoFetch) {
      fetchData(params);
    }
  }, [fetchData, params, autoFetch]); // Esegui quando fetchData, params o autoFetch cambiano

  // Funzione per rieseguire la fetch con gli stessi parametri o nuovi parametri
  const refetch = useCallback((newParams) => {
    const paramsToUse = newParams || params;
    if (newParams) {
      setParams(newParams); // Aggiorna i parametri se vengono forniti nuovi parametri
    } else {
      fetchData(paramsToUse); // Altrimenti usa i parametri correnti
    }
  }, [fetchData, params]);


  // Funzione per aggiornare i parametri senza fare subito la fetch (se autoFetch è false)
  const updateParams = useCallback((newParams) => {
    setParams(prevParams => ({ ...prevParams, ...newParams }));
  }, []);

  return { data, loading, error, refetch, params, updateParams, setParams };
};

export default useFetch;
