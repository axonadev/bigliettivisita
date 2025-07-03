import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  console.log('Props di Home:', {}); // Esempio di console.log per props
  return (
    <div>
      <h1>Benvenuto nella Piattaforma di Biglietti da Visita Digitali</h1>
      <p>Crea, gestisci e invia i tuoi biglietti da visita digitali in modo semplice e veloce.</p>
      <Link to="/register">
        <button>Registrati Ora</button>
      </Link>
    </div>
  );
}

export default Home;
