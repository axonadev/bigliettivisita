import React, { useState } from 'react';
import useAction from '../hooks/useAction';
import useSave from '../hooks/useSave';
import UploadCard from './UploadCard'; // Questo sarà aggiornato con MUI dopo
import LinkWebsite from './LinkWebsite'; // Questo sarà aggiornato con MUI dopo
import {
  Box, Typography, TextField, Button, Card, CardContent, CardActions,
  Grid, CircularProgress, Alert, Paper, IconButton, Link as MuiLink, Collapse, Divider
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image'; // Per placeholder immagini
import LanguageIcon from '@mui/icons-material/Language'; // Per sito web

function CardList({ codcliente, biglietti, onActionSuccess, isLoading, errorLoading }) {
  console.log('Props di CardList:', { codcliente, biglietti, onActionSuccess, isLoading, errorLoading });
  const [numeroWhatsApp, setNumeroWhatsApp] = useState('');
  const [editingCardId, setEditingCardId] = useState(null);
  const [newCardName, setNewCardName] = useState('');

  const { doAction: inviaWhatsApp, loading: loadingWhatsApp, error: errorWhatsApp, response: responseWhatsApp } = useAction('InviaWhatsApp');
  const { saveData: salvaNuovoBiglietto, loading: loadingSalva, error: errorSalva, response: responseSalva } = useSave('SalvaBiglietto');

  const [showWhatsAppAlert, setShowWhatsAppAlert] = useState({ show: false, message: '', severity: 'info' });
  const [showNewCardAlert, setShowNewCardAlert] = useState({ show: false, message: '', severity: 'info' });


  const handleInviaWhatsApp = async (idbvisita) => {
    if (!numeroWhatsApp.trim()) {
      setShowWhatsAppAlert({show: true, message: 'Inserisci un numero WhatsApp valido.', severity: 'warning'});
      return;
    }
    setShowWhatsAppAlert({show: false, message: '', severity: 'info'});
    try {
      const params = { numero: numeroWhatsApp, idbvisita, idcliente: codcliente };
      const result = await inviaWhatsApp(params);
      if (result && result.success) {
        setShowWhatsAppAlert({show: true, message: result.message || `Biglietto ${idbvisita} inviato con successo a ${numeroWhatsApp}.`, severity: 'success'});
        setNumeroWhatsApp('');
        if (onActionSuccess) onActionSuccess();
      } else {
        setShowWhatsAppAlert({show: true, message: result.message || 'Errore durante l\'invio WhatsApp.', severity: 'error'});
      }
    } catch (err) {
      setShowWhatsAppAlert({show: true, message: err.message || 'Si è verificato un problema.', severity: 'error'});
    }
    setTimeout(() => setShowWhatsAppAlert(prev => ({...prev, show: false})), 4000);
  };

  const handleCreaNuovoBiglietto = async () => {
    if (!newCardName.trim()) {
      setShowNewCardAlert({show: true, message: 'Inserisci un nome per il nuovo biglietto.', severity: 'warning'});
      return;
    }
    setShowNewCardAlert({show: false, message: '', severity: 'info'});
    try {
      const payload = { codcliente, nome: newCardName };
      const result = await salvaNuovoBiglietto(payload);
      if (result && result.success) {
        setShowNewCardAlert({show: true, message: result.message || `Biglietto "${newCardName}" creato con ID: ${result.idbvisita}.`, severity: 'success'});
        setNewCardName('');
        if (onActionSuccess) onActionSuccess();
      } else {
        setShowNewCardAlert({show: true, message: result.message || 'Errore durante la creazione del biglietto.', severity: 'error'});
      }
    } catch (err) {
      setShowNewCardAlert({show: true, message: err.message || 'Si è verificato un problema.', severity: 'error'});
    }
     setTimeout(() => setShowNewCardAlert(prev => ({...prev, show: false})), 4000);
  };

  const handleStartEdit = (idbvisita) => setEditingCardId(idbvisita);
  const handleStopEdit = () => setEditingCardId(null);
  const handleEditActionSuccess = () => {
    if (onActionSuccess) onActionSuccess();
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
        <Typography sx={{ml:2}}>Caricamento biglietti...</Typography>
      </Box>
    );
  }
  if (errorLoading) {
    return <Alert severity="error" sx={{m:2}}>Errore nel caricamento della lista biglietti: {errorLoading.message}</Alert>;
  }

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Crea Nuovo Biglietto</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Nome nuovo biglietto"
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
            disabled={loadingSalva}
            fullWidth
            size="small"
          />
          <Button
            variant="contained"
            onClick={handleCreaNuovoBiglietto}
            disabled={loadingSalva}
            startIcon={loadingSalva ? <CircularProgress size={20} color="inherit" /> : <AddCircleOutlineIcon />}
          >
            Crea
          </Button>
        </Box>
        {showNewCardAlert.show && <Alert severity={showNewCardAlert.severity} sx={{ mt: 2 }}>{showNewCardAlert.message}</Alert>}
        {errorSalva && !showNewCardAlert.show && <Alert severity="warning" sx={{ mt: 2 }}>Hook error (Salva): {errorSalva.message}</Alert>}
      </Paper>

      {(!biglietti || biglietti.length === 0) && (
        <Typography sx={{mt:2, textAlign:'center', color:'text.secondary'}}>Nessun biglietto da visita ancora creato.</Typography>
      )}

      {biglietti && biglietti.length > 0 && (
        <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Invia Biglietto via WhatsApp</Typography>
          <TextField
            label="Numero WhatsApp per invio (es. +393331234567)"
            value={numeroWhatsApp}
            onChange={(e) => setNumeroWhatsApp(e.target.value)}
            fullWidth
            size="small"
            disabled={loadingWhatsApp}
            sx={{ mb: 1 }}
          />
           {showWhatsAppAlert.show && <Alert severity={showWhatsAppAlert.severity} sx={{ mt: 1, mb:1 }}>{showWhatsAppAlert.message}</Alert>}
           {errorWhatsApp && !showWhatsAppAlert.show && <Alert severity="warning" sx={{ mt: 1 }}>Hook error (WhatsApp): {errorWhatsApp.message}</Alert>}
        </Paper>
      )}

      <Grid container spacing={3}>
        {biglietti.map(card => (
          <Grid item xs={12} sm={6} md={4} key={card.idbvisita}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {card.nome}
                </Typography>
                <Typography sx={{ mb: 0.5 }} color="text.secondary">
                  ID: {card.idbvisita}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, my: 1, justifyContent: 'center' }}>
                  {card.fronteUrl ? (
                    <img src={card.fronteUrl} alt="Fronte" style={{ width: '80px', height: '50px', objectFit: 'cover', border: '1px solid #ddd', borderRadius: '4px' }} />
                  ) : (
                    <Box sx={{ width: '80px', height: '50px', border: '1px dashed #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                      <ImageIcon color="action" />
                    </Box>
                  )}
                  {card.retroUrl ? (
                    <img src={card.retroUrl} alt="Retro" style={{ width: '80px', height: '50px', objectFit: 'cover', border: '1px solid #ddd', borderRadius: '4px' }} />
                  ) : (
                     <Box sx={{ width: '80px', height: '50px', border: '1px dashed #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                      <ImageIcon color="action" />
                    </Box>
                  )}
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 0.5}}>
                    <LanguageIcon fontSize="small" sx={{mr:0.5, color: 'text.secondary'}}/>
                    <Typography variant="body2" color="text.secondary">
                    Sito Web: {card.sitoWeb ? <MuiLink href={card.sitoWeb} target="_blank" rel="noopener noreferrer">{card.sitoWeb}</MuiLink> : 'Non associato'}
                    </Typography>
                </Box>
                <Typography variant="caption" display="block" sx={{wordBreak: 'break-all'}}>
                  Link: <code>{`/visit/${codcliente}/${card.idbvisita}`}</code>
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', p:2, borderTop: '1px solid #eee' }}>
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleInviaWhatsApp(card.idbvisita)}
                  disabled={loadingWhatsApp || !numeroWhatsApp.trim()}
                  startIcon={loadingWhatsApp ? <CircularProgress size={16} /> : <SendIcon />}
                >
                  Invia
                </Button>
                <IconButton onClick={() => editingCardId === card.idbvisita ? handleStopEdit() : handleStartEdit(card.idbvisita)} color="primary">
                  {editingCardId === card.idbvisita ? <CloseIcon /> : <EditIcon />}
                </IconButton>
              </CardActions>
              <Collapse in={editingCardId === card.idbvisita} timeout="auto" unmountOnExit>
                <Paper elevation={0} sx={{ p: 2, backgroundColor: (theme) => theme.palette.action.hover, borderTop: '1px solid #ddd' }}>
                  <Typography variant="subtitle1" gutterBottom><strong>Modifica: {card.nome}</strong></Typography>
                  <UploadCard
                    codcliente={codcliente}
                    idbvisita={card.idbvisita}
                    onUploadSuccess={handleEditActionSuccess}
                  />
                  <Divider sx={{ my: 2 }} />
                  <LinkWebsite
                    codcliente={codcliente}
                    idbvisita={card.idbvisita}
                    currentWebsite={card.sitoWeb || ''}
                    onLinkSuccess={handleEditActionSuccess}
                  />
                </Paper>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CardList;
