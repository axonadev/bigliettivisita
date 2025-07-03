import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
// import UploadCard from './UploadCard'; // Rimosso, la logica è in CardList
// import LinkWebsite from './LinkWebsite'; // Rimosso, la logica è in CardList
import CardList from './CardList';
import { Container, Paper, Typography, Box, CircularProgress, Alert, Grid, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StyleIcon from '@mui/icons-material/Style'; // Icona per i biglietti

function AdminDashboard(props) {
  console.log('Props di AdminDashboard:', props);
  const { codcliente } = useParams();

  const { data: cliente, loading: loadingCliente, error: errorCliente } = useFetch('DatiCliente', { codcliente });
  const { data: biglietti, loading: loadingBiglietti, error: errorBiglietti, refetch: refetchBiglietti } = useFetch('ListaBiglietti', { codcliente });

  if (loadingCliente) { // Mostra caricamento solo per i dati cliente iniziali
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Caricamento dashboard...</Typography>
      </Box>
    );
  }

  if (errorCliente) {
    return (
      <Container maxWidth="sm">
        <Alert severity="error" sx={{ mt: 4 }}>
          Errore nel caricamento dei dati cliente: {errorCliente.message || 'Si è verificato un problema.'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2}}>
      <Typography variant="h3" component="h1" gutterBottom sx={{display: 'flex', alignItems: 'center'}}>
        <AccountCircleIcon fontSize="large" sx={{ mr: 1, color: 'primary.main' }} />
        Dashboard Cliente
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Codice Cliente: <strong>{codcliente}</strong>
      </Typography>

      {cliente && (
        <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: 'primary.lighter', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{color: 'primary.dark'}}>Dettagli Cliente</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Nome:</strong> {cliente.nome}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Cognome:</strong> {cliente.cognome}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Email:</strong> {cliente.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Telefono:</strong> {cliente.telefono}</Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
      {!cliente && !loadingCliente && ( // Se cliente è null ma non sta caricando (improbabile se non c'è errore)
         <Alert severity="info" sx={{ mb: 3 }}>Dati cliente non disponibili.</Alert>
      )}

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <StyleIcon fontSize="large" sx={{ mr: 1, color: 'secondary.main' }} />
        <Typography variant="h4" component="h2">
          Gestione Biglietti da Visita
        </Typography>
      </Box>

      <CardList
        codcliente={codcliente}
        biglietti={biglietti || []}
        onActionSuccess={refetchBiglietti}
        isLoading={loadingBiglietti} // Passa lo stato di caricamento dei biglietti
        errorLoading={errorBiglietti} // Passa l'eventuale errore di caricamento biglietti
      />

      {/*
        La sezione opzionale Esplora File/Folder potrebbe essere un altro componente Paper o Card.
        Esempio:
        <Paper elevation={2} sx={{p:2, mt:4}}>
            <Typography variant="h6">Esplora File</Typography>
            // Qui il componente per Fai("TreeFolder")
        </Paper>
      */}
    </Container>
  );
}

export default AdminDashboard;
