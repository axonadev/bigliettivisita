import React from 'react';
import { useParams, Link } from 'react-router-dom';
// import useFetch from '../hooks/useFetch';

function VisitCard(props) {
  console.log('Props di VisitCard:', props);
  const { idcliente, idbvisita } = useParams();

  // const { data: biglietto, loading, error } = useFetch('DettaglioBiglietto', { idcliente, idbvisita });

  // Mock data, in attesa dell'hook useFetch funzionante con questo endpoint
  const bigliettoMock = {
    nome: `Biglietto di Esempio ${idbvisita}`,
    fronteUrl: `https://via.placeholder.com/400x250/0088cc/ffffff?Text=Fronte-${idbvisita}`,
    retroUrl: `https://via.placeholder.com/400x250/cc8800/ffffff?Text=Retro-${idbvisita}`,
    sitoWeb: 'https://www.example.com',
  };
  const biglietto = bigliettoMock; // Usa il mock per ora
  const loading = false; // Simula caricamento finito
  const error = null; // Simula nessun errore


  if (loading) return <p>Caricamento biglietto da visita...</p>;
  if (error) return <p>Errore nel caricamento del biglietto: {error.message}</p>;
  if (!biglietto) return <p>Biglietto da visita non trovato.</p>;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>{biglietto.nome}</h2>
      <p>Cliente ID: {idcliente}, Biglietto ID: {idbvisita}</p>

      {biglietto.fronteUrl && (
        <div style={{ margin: '20px 0' }}>
          <img src={biglietto.fronteUrl} alt="Fronte del biglietto da visita" style={{ maxWidth: '100%', maxHeight: '300px', border: '1px solid #ddd' }} />
        </div>
      )}

      {biglietto.retroUrl && (
        <div style={{ margin: '20px 0' }}>
          <img src={biglietto.retroUrl} alt="Retro del biglietto da visita" style={{ maxWidth: '100%', maxHeight: '300px', border: '1px solid #ddd' }} />
        </div>
      )}

      {biglietto.sitoWeb && (
        <div style={{ margin: '20px 0' }}>
          <a href={biglietto.sitoWeb} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
            Visita il Sito Web
          </a>
        </div>
      )}

      <hr style={{margin: '30px 0'}}/>
      <Link to={`/admin/${idcliente}`}>Torna alla Dashboard (se autorizzato)</Link>
      <br />
      <Link to="/">Torna alla Home</Link>
    </div>
  );
}

export default VisitCard;
