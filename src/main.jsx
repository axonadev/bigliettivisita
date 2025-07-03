import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Puoi mantenere questo per reset CSS o stili globali non MUI
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Il nostro tema personalizzato

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline applica un reset CSS di base e stili per lo sfondo basati sul tema */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
