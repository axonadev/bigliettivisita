import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './components/AdminDashboard';
import VisitCard from './components/VisitCard';
import Home from './pages/Home'; // Creeremo questo componente successivamente

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Registrati</Link>
            </li>
            {/* Link di esempio per la dashboard, codcliente dovrà essere dinamico */}
            <li>
              <Link to="/admin/testclient">Admin Dashboard (Test)</Link>
            </li>
            {/* Link di esempio per la visit card, idcliente e idbvisita dovranno essere dinamici */}
            <li>
              <Link to="/visit/testclient/testcard">Visit Card (Test)</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/admin/:codcliente" element={<AdminDashboard />} />
          <Route path="/visit/:idcliente/:idbvisita" element={<VisitCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
