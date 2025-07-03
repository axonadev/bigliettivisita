import React, { useState } from 'react';
import useAction from '../hooks/useAction'; // Per InviaWhatsApp
import useSave from '../hooks/useSave';   // Per SalvaBiglietto (creazione)
import UploadCard from './UploadCard';
import LinkWebsite from './LinkWebsite';

// Rimuovo mockBiglietti perché i dati arrivano via props da AdminDashboard -> useFetch

function CardList({ codcliente, biglietti, onActionSuccess, isLoading, errorLoading /*, onSelectCardForExternalEdit*/ }) {
  console.log('Props di CardList:', { codcliente, biglietti, onActionSuccess, isLoading, errorLoading });
  const [numeroWhatsApp, setNumeroWhatsApp] = useState('');
  const [editingCardId, setEditingCardId] = useState(null);
  const [newCardName, setNewCardName] = useState('');

  const { doAction: inviaWhatsApp, loading: loadingWhatsApp, error: errorWhatsApp, response: responseWhatsApp } = useAction('InviaWhatsApp');
  const { saveData: salvaNuovoBiglietto, loading: loadingSalva, error: errorSalva, response: responseSalva } = useSave('SalvaBiglietto');


  const handleInviaWhatsApp = async (idbvisita) => {
    if (!numeroWhatsApp.trim()) {
      alert('Inserisci un numero WhatsApp valido.');
      return;
    }
    console.log(`Tentativo invio biglietto ${idbvisita} a ${numeroWhatsApp} (cliente ${codcliente})`);
    try {
      const params = { numero: numeroWhatsApp, idbvisita, idcliente: codcliente };
      const result = await inviaWhatsApp(params);
      if (result && result.success) {
        alert(result.message || `Biglietto ${idbvisita} inviato con successo a ${numeroWhatsApp}.`);
        setNumeroWhatsApp(''); // Pulisce l'input dopo l'invio
        if (onActionSuccess) onActionSuccess(); // Callback generica per azioni riuscite
      } else {
        alert(result.message || 'Errore durante l\'invio WhatsApp.');
      }
    } catch (err) {
      alert(`Errore invio WhatsApp: ${err.message || 'Si è verificato un problema.'}`);
    }
  };

  const handleCreaNuovoBiglietto = async () => {
    if (!newCardName.trim()) {
      alert("Inserisci un nome per il nuovo biglietto.");
      return;
    }
    console.log(`Creazione nuovo biglietto: "${newCardName}" per cliente ${codcliente}`);
    try {
      const payload = { codcliente, nome: newCardName };
      const result = await salvaNuovoBiglietto(payload);
      if (result && result.success) {
        alert(result.message || `Biglietto "${newCardName}" creato con ID: ${result.idbvisita}. Ora puoi modificare immagini e link.`);
        setNewCardName('');
        if (onActionSuccess) onActionSuccess(); // Per ricaricare la lista biglietti
        // Potremmo voler impostare editingCardId = result.idbvisita per aprire subito la modifica
        // setEditingCardId(result.idbvisita);
      } else {
        alert(result.message || 'Errore durante la creazione del biglietto.');
      }
    } catch (err) {
      alert(`Errore creazione biglietto: ${err.message || 'Si è verificato un problema.'}`);
    }
  };

  const handleStartEdit = (idbvisita) => {
    setEditingCardId(idbvisita);
    // if(onSelectCardForExternalEdit) onSelectCardForExternalEdit(idbvisita); // Per la gestione esterna (rimossa per ora)
  };

  const handleEditActionSuccess = () => {
    // Chiamato da UploadCard o LinkWebsite dopo un'azione riuscita DENTRO la modalità di modifica
    if (onActionSuccess) onActionSuccess(); // Fa il refetch della lista generale
    // Non chiudiamo necessariamente la modifica, l'utente potrebbe voler fare più operazioni
    // setEditingCardId(null); // Se si vuole chiudere dopo ogni singola azione di modifica
  }

  const handleStopEdit = () => {
    setEditingCardId(null);
    // if(onSelectCardForExternalEdit) onSelectCardForExternalEdit(null); // Per la gestione esterna
  }

  if (isLoading) return <p>Caricamento lista biglietti...</p>;
  if (errorLoading) return <p style={{color: 'red'}}>Errore nel caricamento della lista biglietti: {errorLoading.message}</p>;


  return (
    <div>
      <h4>Lista Biglietti da Visita</h4>
      <div style={{border: '1px solid #ddd', padding: '10px', marginBottom: '15px'}}>
        <h5>Crea Nuovo Biglietto</h5>
        <input
            type="text"
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
            placeholder="Nome nuovo biglietto"
            disabled={loadingSalva}
        />
        <button onClick={handleCreaNuovoBiglietto} disabled={loadingSalva}>
            {loadingSalva ? 'Creazione...' : 'Crea Nuovo Biglietto'}
        </button>
        {errorSalva && <p style={{color: 'red'}}>Errore creazione: {errorSalva.message}</p>}
        {responseSalva && responseSalva.message && !responseSalva.success && <p style={{color: 'orange'}}>{responseSalva.message}</p>}
      </div>

      {(!biglietti || biglietti.length === 0) && !isLoading && (
        <p>Nessun biglietto da visita trovato per questo cliente.</p>
      )}

      {biglietti && biglietti.length > 0 && (
        <>
          <input
            type="tel"
            placeholder="Numero WhatsApp per invio"
            value={numeroWhatsApp}
            onChange={(e) => setNumeroWhatsApp(e.target.value)}
            style={{ marginBottom: '10px', padding: '8px', display: 'block', width: 'calc(100% - 20px)' }}
            disabled={loadingWhatsApp}
          />
          {errorWhatsApp && <p style={{ color: 'red' }}>Errore Invio: {errorWhatsApp.message}</p>}
          {responseWhatsApp && responseWhatsApp.message && !responseWhatsApp.success && <p style={{color: 'orange'}}>{responseWhatsApp.message}</p>}
        </>
      )}

      {biglietti.map(card => (
        <div key={card.idbvisita} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', position: 'relative' }}>
          <h5>{card.nome} (ID: {card.idbvisita})</h5>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
            {card.fronteUrl && <img src={card.fronteUrl} alt={`Fronte ${card.nome}`} style={{ width: '100px', height:'auto', border: '1px solid #eee' }} />}
            {!card.fronteUrl && <div style={{width: '100px', height:'60px', border:'1px dashed #eee', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.8em', color:'#777'}}>No Fronte</div>}
            {card.retroUrl && <img src={card.retroUrl} alt={`Retro ${card.nome}`} style={{ width: '100px', height:'auto', border: '1px solid #eee' }} />}
            {!card.retroUrl && <div style={{width: '100px', height:'60px', border:'1px dashed #eee', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.8em', color:'#777'}}>No Retro</div>}
          </div>
          <p>Sito Web: {card.sitoWeb ? <a href={card.sitoWeb} target="_blank" rel="noopener noreferrer">{card.sitoWeb}</a> : 'Non associato'}</p>
          <p>Link pubblico: <code>{`/visit/${codcliente}/${card.idbvisita}`}</code></p>

          <button
            onClick={() => handleInviaWhatsApp(card.idbvisita)}
            disabled={loadingWhatsApp || !numeroWhatsApp.trim()}
            style={{marginRight: '5px'}}
          >
            {loadingWhatsApp ? 'Invio...' : 'Invia WhatsApp'}
          </button>
          <button onClick={() => editingCardId === card.idbvisita ? handleStopEdit() : handleStartEdit(card.idbvisita)} >
            {editingCardId === card.idbvisita ? 'Chiudi Modifica' : 'Modifica Immagini/Link'}
          </button>

          {editingCardId === card.idbvisita && (
            <div style={{ border: '1px dashed blue', padding: '15px', marginTop: '15px', backgroundColor: '#f0f8ff' }}>
              <p><strong>Modifica Biglietto: {card.nome}</strong></p>
              <UploadCard
                codcliente={codcliente}
                idbvisita={card.idbvisita}
                onUploadSuccess={handleEditActionSuccess}
              />
              <hr style={{margin: '15px 0'}}/>
              <LinkWebsite
                codcliente={codcliente}
                idbvisita={card.idbvisita}
                currentWebsite={card.sitoWeb || ''} // Assicura che sia una stringa
                onLinkSuccess={handleEditActionSuccess}
              />
              {/* Il bottone "Chiudi Modifica" è ora quello che fa toggle */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CardList;
