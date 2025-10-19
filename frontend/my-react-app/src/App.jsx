import { BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';
import Landing from "./pages/landing";
import TariffTrackerDashboard from "./pages/dashboard";
import TariffSimulator from "./pages/simulator";
import EconomicInsightDashboard from "./pages/insights";
import SettingsPage from "./pages/settings";

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <BrowserRouter>
      {/* Routes */}
      <Routes>
        {/* Default route = landing/login page */}
        <Route 
          path="/" 
          element={ isLoggedIn ? <Navigate to="/dashboard" replace /> : <Landing />} 
        />

        {/* Protected routes (only accessible if logged in) */}
        <Route 
          path="/dashboard"
          element={ isLoggedIn ? <TariffTrackerDashboard /> : <Navigate to="/" replace />}
        />
        <Route 
          path="/simulator" 
          element={ isLoggedIn ? <TariffSimulator /> : <Navigate to="/" replace /> } 
        />
        <Route 
          path="/insights" 
          element={ isLoggedIn ? <EconomicInsightDashboard /> : <Navigate to="/" replace /> } 
        />
        <Route 
          path="/settings" 
          element={ isLoggedIn ? <SettingsPage /> : <Navigate to="/" replace /> } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
