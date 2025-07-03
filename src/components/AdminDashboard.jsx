import React, { useState } from 'react'; // Aggiunto useState
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import UploadCard from './UploadCard';
import LinkWebsite from './LinkWebsite';
import CardList from './CardList';

function AdminDashboard(props) {
  console.log('Props di AdminDashboard:', props);
  const { codcliente } = useParams();

  // Stato per tracciare il biglietto selezionato per l'editing di immagini/link
  // Questo non è l'ID del biglietto *in corso di modifica* dentro CardList,
  // ma quello le cui sezioni UploadCard e LinkWebsite (esterne a CardList) dovrebbero operare.
  // In questa versione, UploadCard e LinkWebsite sono pensate per essere *dentro* CardList
  // quando si modifica un biglietto specifico, o per un nuovo biglietto (UploadCard).
  // Per semplificare, la versione attuale di UploadCard e LinkWebsite nel CardList è più integrata.
  // Manteniamo una versione di UploadCard qui per la *creazione* di un *nuovo* biglietto,
  // che però richiede prima che il biglietto esista (abbia un ID).
  // Quindi, il flusso sarà: 1. Crea biglietto (solo nome) in CardList -> ottieni ID.
  // 2. CardList mostra il nuovo biglietto e permette "Modifica" che apre Upload/Link interni.

  // Questo UploadCard e LinkWebsite "globali" potrebbero essere usati per un biglietto "principale" o default.
  // Per ora, li lascio ma potrebbero essere ridondanti con la logica in CardList.
  // const [selectedCardIdForExternalEdit, setSelectedCardIdForExternalEdit] = useState(null);


  const { data: cliente, loading: loadingCliente, error: errorCliente } = useFetch('DatiCliente', { codcliente });
  const { data: biglietti, loading: loadingBiglietti, error: errorBiglietti, refetch: refetchBiglietti } = useFetch('ListaBiglietti', { codcliente });

  if (loadingCliente || loadingBiglietti) return <p>Caricamento dashboard...</p>;
  if (errorCliente) return <p>Errore caricamento dati cliente: {errorCliente ? errorCliente.message : 'Errore sconosciuto'}</p>;
  // Non blocchiamo per errorBiglietti, CardList può gestire una lista vuota o errore.

  return (
    <div>
      <h2>Dashboard Amministrativa</h2>
      <p>Codice Cliente: <strong>{codcliente}</strong></p>
      {cliente && (
        <div style={{border: '1px solid #eee', padding: '10px', marginBottom: '20px'}}>
          <h3>Dati Cliente</h3>
          <p>Nome: {cliente.nome} {cliente.cognome}</p>
          <p>Email: {cliente.email}</p>
          <p>Telefono: {cliente.telefono}</p>
        </div>
      )}
      {!cliente && !loadingCliente && <p>Dati cliente non disponibili.</p>}

      <hr />
      <h3>Gestione Biglietti</h3>

      {/*
        Rimuovo UploadCard e LinkWebsite da qui perché la logica di modifica è più sensata
        all'interno di ogni item della CardList, o dopo aver creato un nuovo biglietto in CardList.
        UploadCard qui avrebbe senso solo se avessimo un ID biglietto "nuovo" già prima di salvarlo,
        ma l'ID viene generato al salvataggio (simulato) del nome del biglietto.
      */}
      {/*
      <h4>Operazioni su un biglietto specifico (selezionato o nuovo)</h4>
      <p>ID Biglietto attualmente selezionato per modifica esterna: {selectedCardIdForExternalEdit || "Nessuno"}</p>
      <UploadCard
        codcliente={codcliente}
        idbvisita={selectedCardIdForExternalEdit} // Deve essere l'ID del biglietto da modificare
        onUploadSuccess={() => {
            refetchBiglietti();
            // setSelectedCardIdForExternalEdit(null); // opzionale: deseleziona dopo upload
        }}
      />
      <hr />
      <LinkWebsite
        codcliente={codcliente}
        idbvisita={selectedCardIdForExternalEdit} // Deve essere l'ID del biglietto
        // currentWebsite={biglietti?.find(b => b.idbvisita === selectedCardIdForExternalEdit)?.sitoWeb || ''}
        onLinkSuccess={() => {
            refetchBiglietti();
            // setSelectedCardIdForExternalEdit(null); // opzionale
        }}
      />
      <hr />
      */}

      <CardList
        codcliente={codcliente}
        biglietti={biglietti || []}
        onActionSuccess={refetchBiglietti} // refetchBiglietti farà ricaricare la lista
        isLoading={loadingBiglietti}
        errorLoading={errorBiglietti}
        // onSelectCardForExternalEdit={setSelectedCardIdForExternalEdit} // Passa la funzione per settare l'ID
      />

      {/* Sezione opzionale Esplora File/Folder */}
      {/* <button onClick={() => console.log('Logica per Fai("TreeFolder", { codcliente }) da implementare')}>Esplora File (Simulato)</button> */}
    </div>
  );
}

export default AdminDashboard;
