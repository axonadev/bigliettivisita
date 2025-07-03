import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSave from '../hooks/useSave';

function RegistrationForm(props) {
  console.log('Props di RegistrationForm:', props);
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    telefono: '',
    email: '',
  });
  const { saveData, loading, error, response } = useSave('RegistraCliente');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dati inviati per la registrazione:', formData);
    try {
      const result = await saveData(formData);
      if (result && result.success) {
        alert(`Registrazione completata con successo! Il tuo codice cliente è: ${result.codcliente}. Sarai reindirizzato alla tua dashboard.`);
        // Potresti voler mostrare il link prima di reindirizzare o darlo da copiare
        console.log('Link amministrazione:', result.linkAmministrazione);
        if (result.linkAmministrazione) {
          navigate(result.linkAmministrazione);
        }
      } else {
        // L'errore dovrebbe essere gestito dal blocco catch se l'hook lo lancia,
        // o qui se l'hook restituisce un { success: false }
        alert(result.message || 'Errore durante la registrazione.');
      }
    } catch (err) {
      // L'errore è già loggato dall'hook useSave
      alert(`Errore durante la registrazione: ${err.message || 'Si è verificato un problema.'}`);
    }
  };

  return (
    <div>
      <h2>Registrazione Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="cognome">Cognome:</label>
          <input type="text" id="cognome" name="cognome" value={formData.cognome} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="telefono">Telefono:</label>
          <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registrazione in corso...' : 'Registrati'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>Errore: {error.message}</p>}
      {response && response.message && !response.success && <p style={{color: 'orange'}}>{response.message}</p>}
      {/* Il messaggio di successo è gestito nell'alert e reindirizzamento */}
    </div>
  );
}

export default RegistrationForm;
