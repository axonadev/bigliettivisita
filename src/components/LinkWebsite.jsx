import React, { useState, useEffect } from 'react';
import useSave from '../hooks/useSave';
import { Box, Button, Typography, TextField, CircularProgress, Alert } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';

function LinkWebsite({ codcliente, idbvisita, currentWebsite, onLinkSuccess }) {
  // console.log('Props di LinkWebsite:', { codcliente, idbvisita, currentWebsite, onLinkSuccess });
  const [websiteUrl, setWebsiteUrl] = useState(currentWebsite || '');
  const { saveData, loading, error /*, response*/ } = useSave('SalvaBiglietto'); // response non usato
  const [linkStatus, setLinkStatus] = useState({ message: '', severity: 'info', show: false });

  useEffect(() => {
    setWebsiteUrl(currentWebsite || '');
  }, [currentWebsite, idbvisita]); // Aggiunto idbvisita per resettare se cambia il biglietto in modifica

  const handleLink = async () => {
    if (!idbvisita) {
      setLinkStatus({ message: "ID biglietto non fornito.", severity: 'error', show: true });
      return;
    }
    setLinkStatus({ show: false, message: '', severity: 'info' }); // Pulisce alert precedenti

    const payload = { codcliente, idbvisita, sitoWeb: websiteUrl };
    try {
      const result = await saveData(payload);
      if (result && result.success) {
        setLinkStatus({ message: result.message || 'Sito web salvato con successo.', severity: 'success', show: true });
        if (onLinkSuccess) onLinkSuccess();
      } else {
        setLinkStatus({ message: result.message || 'Errore salvataggio sito web.', severity: 'error', show: true });
      }
    } catch (err) {
      setLinkStatus({ message: err.message || 'Errore grave salvataggio sito.', severity: 'error', show: true });
    }
    setTimeout(() => setLinkStatus(prev => ({ ...prev, show: false })), 4000);
  };

  const handleRemoveLink = async () => {
     if (!idbvisita) {
      setLinkStatus({ message: "ID biglietto non fornito.", severity: 'error', show: true });
      return;
    }
    setLinkStatus({ show: false, message: '', severity: 'info' });

    // Simula il salvataggio di un URL vuoto per rimuovere il link
    const payload = { codcliente, idbvisita, sitoWeb: "" };
    try {
      const result = await saveData(payload);
      if (result && result.success) {
        setLinkStatus({ message: result.message || 'Link al sito web rimosso.', severity: 'success', show: true });
        setWebsiteUrl(""); // Pulisce l'input field
        if (onLinkSuccess) onLinkSuccess();
      } else {
        setLinkStatus({ message: result.message || 'Errore rimozione link.', severity: 'error', show: true });
      }
    } catch (err) {
       setLinkStatus({ message: err.message || 'Errore grave rimozione link.', severity: 'error', show: true });
    }
    setTimeout(() => setLinkStatus(prev => ({ ...prev, show: false })), 4000);
  };


  return (
    <Box>
      <Typography variant="body1" gutterBottom>
        {idbvisita ? `Associa/Modifica Sito Web per biglietto ID: ${idbvisita}` : 'Seleziona un biglietto per associare un sito.'}
      </Typography>
      {!idbvisita && <Alert severity="warning" sx={{mb:1}}>Salva prima un biglietto per poter associare un sito web.</Alert>}

      {idbvisita && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField
            label="URL Sito Web"
            type="url"
            placeholder="https://esempio.com"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            disabled={!idbvisita || loading}
            fullWidth
            size="small"
          />
          <Box sx={{display: 'flex', gap: 1}}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLink}
              disabled={loading || !idbvisita}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LinkIcon />}
              size="small"
            >
              Salva URL
            </Button>
            {currentWebsite && ( // Mostra bottone rimuovi solo se c'è un sito corrente
                 <Button
                    variant="outlined"
                    color="warning"
                    onClick={handleRemoveLink}
                    disabled={loading || !idbvisita}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LinkOffIcon />}
                    size="small"
                >
                    Rimuovi URL
                </Button>
            )}
          </Box>
          {linkStatus.show && (
            <Alert severity={linkStatus.severity} sx={{ mt: 1, width: '100%' }}>{linkStatus.message}</Alert>
          )}
          {error && !linkStatus.show && (
             <Alert severity="error" sx={{ mt: 1, width: '100%' }}>Errore Hook Salva: {error.message}</Alert>
          )}
        </Box>
      )}
    </Box>
  );
}

export default LinkWebsite;
