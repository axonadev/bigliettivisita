import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Un tema di esempio per iniziare
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6', // Un blu pervinca
    },
    secondary: {
      main: '#19857b', // Un verde acqua
    },
    error: {
      main: red.A400, // Rosso da MUI colors
    },
    background: {
      default: '#f4f6f8', // Un grigio chiaro per lo sfondo
      paper: '#ffffff',   // Bianco per le superfici "Paper"
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
     h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Per non avere bottoni tutti in maiuscolo di default
          borderRadius: 8, // Bordi leggermente più arrotondati
        },
        containedPrimary: {
          color: '#fff', // Assicura che il testo sia bianco su primario contained
        }
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined', // Variante di default per i TextField
        margin: 'normal',    // Margine di default
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Bordi più arrotondati per le Card
          boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)', // Un'ombra più soffusa
        }
      }
    }
  }
});

export default theme;
