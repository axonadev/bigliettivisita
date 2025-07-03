import React, { useState } from 'react';
import useAction from '../hooks/useAction';

function UploadCard({ codcliente, onUploadSuccess, idbvisita }) {
  console.log('Props di UploadCard:', { codcliente, onUploadSuccess, idbvisita });
  const [fileFronte, setFileFronte] = useState(null);
  const [fileRetro, setFileRetro] = useState(null);
  const { doAction: uploadFile, loading, error, response } = useAction('UploadImmagine');

  const handleFileChange = (e, tipo) => {
    const file = e.target.files[0];
    if (tipo === 'fronte') {
      setFileFronte(file);
    } else {
      setFileRetro(file);
    }
    console.log(`File ${tipo} selezionato:`, file ? file.name : 'nessuno');
  };

  const handleUpload = async (tipo) => {
    const file = tipo === 'fronte' ? fileFronte : fileRetro;
    if (!file) {
      alert(`Seleziona un file per il ${tipo}.`);
      return;
    }
    if (!idbvisita) {
      alert("È necessario un ID biglietto per caricare le immagini. Crea prima il biglietto.");
      return;
    }

    console.log(`Upload immagine ${tipo} per ${idbvisita} (cliente: ${codcliente}):`, file.name);
    // In una vera app, qui si creerebbe un oggetto FormData per inviare il file.
    // Per la simulazione, passiamo solo i metadati.
    const params = {
      codcliente,
      idbvisita,
      tipo, // 'fronte' o 'retro'
      nomeFile: file.name,
      // fileData: file // Questo sarebbe il file stesso
    };

    try {
      const result = await uploadFile(params);
      if (result && result.success) {
        console.log(`Upload ${tipo} riuscito:`, result.urlImmagine);
        alert(`Immagine ${tipo} "${file.name}" caricata con successo. URL (simulato): ${result.urlImmagine}`);
        if (onUploadSuccess) onUploadSuccess(); // Per triggerare un refetch della lista biglietti
        if (tipo === 'fronte') setFileFronte(null); // Resetta input
        if (tipo === 'retro') setFileRetro(null);   // Resetta input
        document.getElementById(`fileFronte-${idbvisita || 'new'}`).value = null; // Resetta l'input file visivamente
        document.getElementById(`fileRetro-${idbvisita || 'new'}`).value = null;  // Resetta l'input file visivamente

      } else {
        alert(result.message || `Errore durante l'upload dell'immagine ${tipo}.`);
      }
    } catch (err) {
      alert(`Errore upload ${tipo}: ${err.message || 'Si è verificato un problema.'}`);
    }
  };

  return (
    <div>
      <h4>{idbvisita ? `Modifica immagini per biglietto ID: ${idbvisita}` : 'Carica Immagini Biglietto (Seleziona o crea un biglietto)'}</h4>
      {!idbvisita && <p style={{color: 'orange'}}>Salva prima un biglietto per poter caricare le immagini.</p>}
      <div>
        <label htmlFor={`fileFronte-${idbvisita || 'new'}`}>Immagine Fronte:</label>
        <input type="file" id={`fileFronte-${idbvisita || 'new'}`} onChange={(e) => handleFileChange(e, 'fronte')} disabled={!idbvisita || loading} />
        <button onClick={() => handleUpload('fronte')} disabled={!fileFronte || loading || !idbvisita}>
          {loading && fileFronte ? 'Caricamento...' : 'Carica Fronte'}
        </button>
      </div>
      <div>
        <label htmlFor={`fileRetro-${idbvisita || 'new'}`}>Immagine Retro:</label>
        <input type="file" id={`fileRetro-${idbvisita || 'new'}`} onChange={(e) => handleFileChange(e, 'retro')} disabled={!idbvisita || loading} />
        <button onClick={() => handleUpload('retro')} disabled={!fileRetro || loading || !idbvisita}>
          {loading && fileRetro ? 'Caricamento...' : 'Carica Retro'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>Errore Upload: {error.message}</p>}
      {response && response.message && !response.success && <p style={{color: 'orange'}}>{response.message}</p>}
    </div>
  );
}

export default UploadCard;
