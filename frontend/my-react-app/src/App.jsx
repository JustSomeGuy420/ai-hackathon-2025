import { BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';
import Landing from "./pages/landing";
import TariffTrackerDashboard from "./pages/dashboard";
import TariffSimulator from "./pages/simulator";
import EconomicInsightDashboard from "./pages/insights";
import SettingsPage from "./pages/settings";
import Navbar from "./components/navbar";
import useAuth from "./hooks/useAuth";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
    {isLoggedIn && <Navbar />}
      {/* Routes */}
      <Routes>
        {/* Default route = landing/login page */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Landing />} />

        {/* Protected routes (only accessible if logged in) */}
        <Route path="/dashboard" element={isLoggedIn ? <TariffTrackerDashboard /> : <Navigate to="/" />} />
        <Route path="/simulator" element={isLoggedIn ? <TariffSimulator /> : <Navigate to="/" />} />
        <Route path="/insights" element={isLoggedIn ? <EconomicInsightDashboard /> : <Navigate to="/" />} />
        <Route path="/settings" element={isLoggedIn ? <SettingsPage /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
