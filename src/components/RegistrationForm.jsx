import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSave from '../hooks/useSave';
import { TextField, Button, Box, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';

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
  const [submissionError, setSubmissionError] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    setSubmissionSuccess('');
    console.log('Dati inviati per la registrazione:', formData);
    try {
      const result = await saveData(formData);
      if (result && result.success) {
        setSubmissionSuccess(`Registrazione completata! Codice Cliente: ${result.codcliente}. Sarai reindirizzato...`);
        console.log('Link amministrazione:', result.linkAmministrazione);
        setTimeout(() => {
          if (result.linkAmministrazione) {
            navigate(result.linkAmministrazione);
          }
        }, 2000); // Ritardo per mostrare il messaggio di successo
      } else {
        setSubmissionError(result.message || 'Errore durante la registrazione. Riprova.');
      }
    } catch (err) {
      setSubmissionError(err.message || 'Si è verificato un problema di connessione. Riprova.');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, margin: 'auto', mt: 5 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <HowToRegIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Registrazione Cliente
        </Typography>

        <TextField
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          disabled={loading}
        />
        <TextField
          label="Cognome"
          name="cognome"
          value={formData.cognome}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          disabled={loading}
        />
        <TextField
          label="Telefono"
          name="telefono"
          type="tel"
          value={formData.telefono}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          disabled={loading}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          disabled={loading}
        />

        <Box sx={{ position: 'relative', width: '100%', mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            size="large"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <HowToRegIcon />}
          >
            {loading ? 'Registrazione...' : 'Registrati'}
          </Button>
        </Box>

        {submissionError && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{submissionError}</Alert>}
        {submissionSuccess && <Alert severity="success" sx={{ mt: 2, width: '100%' }}>{submissionSuccess}</Alert>}
        {error && !submissionError && <Alert severity="warning" sx={{ mt: 2, width: '100%' }}>Hook error: {error.message}</Alert>}

      </Box>
    </Paper>
  );
}

export default RegistrationForm;
