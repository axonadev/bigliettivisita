import React, { useState, useRef } from 'react';
import useAction from '../hooks/useAction';
import { Box, Button, Typography, TextField, CircularProgress, Alert, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function UploadCard({ codcliente, onUploadSuccess, idbvisita }) {
  // console.log('Props di UploadCard:', { codcliente, onUploadSuccess, idbvisita });
  const [fileFronte, setFileFronte] = useState(null);
  const [fileRetro, setFileRetro] = useState(null);
  const { doAction: uploadFile, loading, error /*, response*/ } = useAction('UploadImmagine'); // response non usato direttamente qui
  const [uploadStatus, setUploadStatus] = useState({ type: '', message: '', severity: 'info', show: false });

  const fileInputFronteRef = useRef(null);
  const fileInputRetroRef = useRef(null);

  const handleFileChange = (e, tipo) => {
    const file = e.target.files[0];
    if (tipo === 'fronte') {
      setFileFronte(file);
    } else {
      setFileRetro(file);
    }
    setUploadStatus({ show: false, message: '', severity: 'info' }); // Nasconde alert precedenti
    // console.log(`File ${tipo} selezionato:`, file ? file.name : 'nessuno');
  };

  const handleUpload = async (tipo) => {
    const file = tipo === 'fronte' ? fileFronte : fileRetro;
    if (!file) {
      setUploadStatus({ type: tipo, message: `Seleziona un file per il ${tipo}.`, severity: 'warning', show: true });
      return;
    }
    if (!idbvisita) {
      setUploadStatus({ type: tipo, message: "ID biglietto non fornito. Impossibile caricare.", severity: 'error', show: true });
      return;
    }
    setUploadStatus({ show: false, message: '', severity: 'info' }); // Pulisce prima di un nuovo tentativo

    const params = { codcliente, idbvisita, tipo, nomeFile: file.name /*, fileData: file */ };
    try {
      const result = await uploadFile(params);
      if (result && result.success) {
        setUploadStatus({ type: tipo, message: result.message || `Immagine ${tipo} caricata.`, severity: 'success', show: true });
        if (onUploadSuccess) onUploadSuccess();
        if (tipo === 'fronte') {
          setFileFronte(null);
          if(fileInputFronteRef.current) fileInputFronteRef.current.value = null;
        } else {
          setFileRetro(null);
          if(fileInputRetroRef.current) fileInputRetroRef.current.value = null;
        }
      } else {
        setUploadStatus({ type: tipo, message: result.message || `Errore upload ${tipo}.`, severity: 'error', show: true });
      }
    } catch (err) {
      setUploadStatus({ type: tipo, message: err.message || `Errore grave upload ${tipo}.`, severity: 'error', show: true });
    }
    setTimeout(() => setUploadStatus(prev => ({ ...prev, show: false })), 4000);
  };

  const renderFileInput = (type, fileState, ref) => (
    <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Typography variant="subtitle2" gutterBottom sx={{textTransform: 'capitalize'}}>{type}:</Typography>
      <TextField
        type="file"
        id={`file-${type}-${idbvisita || 'new'}`}
        inputRef={ref}
        onChange={(e) => handleFileChange(e, type)}
        disabled={!idbvisita || loading}
        fullWidth
        size="small"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 1 }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleUpload(type)}
        disabled={!fileState || loading || !idbvisita}
        startIcon={loading && (type === 'fronte' ? fileFronte : fileRetro) ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
        size="small"
      >
        Carica {type}
      </Button>
      {uploadStatus.show && uploadStatus.type === type && (
        <Alert severity={uploadStatus.severity} sx={{ mt: 1, width: '100%' }}>{uploadStatus.message}</Alert>
      )}
    </Box>
  );

  return (
    <Box>
      <Typography variant="body1" gutterBottom>
        {idbvisita ? `Carica immagini per biglietto ID: ${idbvisita}` : 'Seleziona un biglietto per caricare le immagini.'}
      </Typography>
      {!idbvisita && <Alert severity="warning" sx={{mb:1}}>Salva prima un biglietto per poter caricare le immagini.</Alert>}

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {renderFileInput('fronte', fileFronte, fileInputFronteRef)}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderFileInput('retro', fileRetro, fileInputRetroRef)}
        </Grid>
      </Grid>

      {error && !uploadStatus.show && ( // Mostra errore hook generico solo se non c'è un errore specifico di upload
        <Alert severity="error" sx={{ mt: 1, width: '100%' }}>Errore Hook Upload: {error.message}</Alert>
      )}
    </Box>
  );
}

export default UploadCard;
