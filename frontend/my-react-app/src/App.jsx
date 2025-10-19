import { BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';
import { useState, useEffect } from "react";
import Landing from "./pages/landing";
import TariffTrackerDashboard from "./pages/dashboard";
import TariffSimulator from "./pages/simulator";
import EconomicInsightDashboard from "./pages/insights";
import SettingsPage from "./pages/settings";
import Navbar from "./components/navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    // localStorage.getItem("loggedIn") === "true"
    "true"
  );

  useEffect(() => {
    const updateAuth = () => {
      setIsLoggedIn(localStorage.getItem("loggedIn") === "true");
    };

    window.addEventListener("auth:updated", updateAuth);
    return () => window.removeEventListener("auth:updated", updateAuth);
  }, []);

  return (
    <BrowserRouter>
    {isLoggedIn && <Navbar />}
      {/* Routes */}
      <Routes>
        {/* Default route = landing/login page */}
        {/* <Route 
          path="/" 
          element={ isLoggedIn ? <Navigate to="/dashboard" replace /> : <Landing />} 
        /> */}
        <Route path="/" element={ <Landing />} />

          {/* Protected routes (only accessible if logged in) */}
          {/* <Route 
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
          /> */}

          <Route path="/dashboard" element={ <TariffTrackerDashboard /> }/>
          <Route path="/simulator" element={ <TariffSimulator /> } />
          <Route path="/insights" element={ <EconomicInsightDashboard /> } />
          <Route path="/settings" element={ <SettingsPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
