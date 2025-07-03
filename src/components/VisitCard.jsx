import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Card, CardContent, CardMedia, Typography, Button, Box, CircularProgress, Alert, Container, Grid, Paper, Link as MuiLink } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function VisitCard(props) {
  console.log('Props di VisitCard:', props);
  const { idcliente, idbvisita } = useParams();

  const { data: biglietto, loading, error } = useFetch('DettaglioBiglietto', { idcliente, idbvisita });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Caricamento biglietto da visita...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Alert severity="error" sx={{ mt: 4 }}>
          Errore nel caricamento del biglietto: {error.message || 'Si è verificato un problema.'}
        </Alert>
      </Container>
    );
  }

  if (!biglietto) {
     return (
      <Container maxWidth="sm">
        <Alert severity="warning" sx={{ mt: 4 }}>
          Biglietto da visita non trovato (ID Cliente: {idcliente}, ID Biglietto: {idbvisita}).
        </Alert>
         <Button component={RouterLink} to="/" startIcon={<HomeIcon />} sx={{mt:2}}>
            Torna alla Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{overflow: 'hidden'}}> {/* Per contenere l'ombra della CardMedia */}
        <Card>
          {/* Immagine Fronte come CardMedia se disponibile, altrimenti un placeholder o nulla */}
          {biglietto.fronteUrl && (
            <CardMedia
              component="img"
              alt={`Fronte - ${biglietto.nome}`}
              height="300" // Altezza fissa o aspect ratio
              image={biglietto.fronteUrl}
              sx={{ objectFit: 'contain', backgroundColor: '#f0f0f0' }} // contain per vedere tutta l'immagine
            />
          )}
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h4" component="div" color="primary">
              {biglietto.nome || "Biglietto da Visita"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
              ID Cliente: {idcliente} | ID Biglietto: {idbvisita}
            </Typography>

            {/* Immagine Retro se disponibile e diversa da Fronte */}
            {biglietto.retroUrl && biglietto.retroUrl !== biglietto.fronteUrl && (
              <Box sx={{ my: 3 }}>
                 <Typography variant="subtitle1" color="text.secondary" gutterBottom>Retro:</Typography>
                <img
                    src={biglietto.retroUrl}
                    alt={`Retro - ${biglietto.nome}`}
                    style={{
                        maxWidth: '80%',
                        maxHeight: '250px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        objectFit: 'contain',
                        backgroundColor: '#f9f9f9'
                    }}
                />
              </Box>
            )}

            {biglietto.sitoWeb && (
              <Button
                variant="contained"
                color="secondary"
                href={biglietto.sitoWeb}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<LanguageIcon />}
                sx={{ mt: 2, mb:2 }}
              >
                Visita il Sito Web
              </Button>
            )}
             {!biglietto.sitoWeb && (
                <Typography variant="body2" color="text.secondary" sx={{mt:2, mb:2}}>
                    Nessun sito web associato.
                </Typography>
            )}
          </CardContent>
        </Card>
      </Paper>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Button component={RouterLink} to="/" variant="outlined" startIcon={<HomeIcon />}>
          Torna alla Home
        </Button>
        {/* Link alla dashboard admin, potrebbe essere condizionale se sapessimo chi è l'utente loggato */}
        <Button component={RouterLink} to={`/admin/${idcliente}`} variant="outlined" color="primary" startIcon={<AdminPanelSettingsIcon />}>
          Dashboard Cliente (Admin)
        </Button>
      </Box>
    </Container>
  );
}

export default VisitCard;
