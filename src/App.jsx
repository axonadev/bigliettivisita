import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './components/AdminDashboard';
import VisitCard from './components/VisitCard';
import Home from './pages/Home';

import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import BusinessCardIcon from '@mui/icons-material/BusinessCenter'; // Esempio di icona

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <BusinessCardIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Biglietti da Visita Digitali
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">Home</Button>
          <Button color="inherit" component={RouterLink} to="/register">Registrati</Button>
          {/*
            I link di test per Admin e Visit Card potrebbero essere rimossi o
            gestiti diversamente in una versione di produzione.
            Li lascio per ora per facilitare i test durante lo sviluppo.
          */}
          <Button color="inherit" component={RouterLink} to="/admin/CLIENTE_TEST">Admin (Test)</Button>
          <Button color="inherit" component={RouterLink} to="/visit/CLIENTE_TEST/CARD_TEST">Visit (Test)</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, mb: 4 }}> {/* mt: marginTop, mb: marginBottom */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/admin/:codcliente" element={<AdminDashboard />} />
          <Route path="/visit/:idcliente/:idbvisita" element={<VisitCard />} />
        </Routes>
      </Container>

      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 'auto' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            {new Date().getFullYear()}{' '}
            Biglietti da Visita Digitali. Tutti i diritti riservati.
          </Typography>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
