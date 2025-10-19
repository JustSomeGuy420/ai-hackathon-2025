import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TariffTrackerDashboard from "./pages/dashboard";
import TariffSimulator from "./pages/simulator";
import EconomicInsightDashboard from "./pages/insights";
import SettingsPage from "./pages/settings";

function App() {

  return (
    <BrowserRouter>
      {/* Navigation */}
      {/* <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/simulator">Simulator</Link>
        <Link to="/insights">Insights</Link>
        <Link to="/settings">Settings</Link>
      </nav> */}

      {/* Routes */}
      <Routes>
        <Route path="/dashboard" element={<TariffTrackerDashboard />}/>
        <Route path="/simulator" element={<TariffSimulator />} />
        <Route path="/insights" element={<EconomicInsightDashboard />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
