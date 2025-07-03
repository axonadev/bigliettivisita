import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, Container, Paper, Grid } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import SendIcon from '@mui/icons-material/Send';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function Home() {
  console.log('Props di Home:', {});
  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          p: 4, // padding
          mt: 4, // marginTop
          textAlign: 'center',
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff', // Sfondo carta
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Biglietti da Visita Digitali
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 3 }}>
          La soluzione moderna per creare, gestire e condividere i tuoi biglietti da visita professionali.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          component={RouterLink}
          to="/register"
          startIcon={<HowToRegIcon />}
          sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }} // py: padding Y, px: padding X
        >
          Registrati Ora e Inizia!
        </Button>
      </Paper>

      <Box sx={{ mt: 6, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 'medium', mb:4 }}>
          Perché Sceglierci?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              icon: <CardMembershipIcon fontSize="large" color="primary" />,
              title: 'Design Moderno',
              description: 'Crea biglietti da visita accattivanti con le tue immagini e il tuo logo.'
            },
            {
              icon: <AdminPanelSettingsIcon fontSize="large" color="primary" />,
              title: 'Gestione Semplice',
              description: 'Un pannello di controllo intuitivo per amministrare tutti i tuoi biglietti.'
            },
            {
              icon: <SendIcon fontSize="large" color="primary" />,
              title: 'Condivisione Istantanea',
              description: 'Invia i tuoi biglietti digitali via WhatsApp o condividi il link univoco.'
            },
          ].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.title}>
              <Paper elevation={2} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6" component="h3" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center">
                  {item.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
