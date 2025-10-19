import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Read username from localStorage (fallback to "User")
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "User"
  );

  useEffect(() => {
    const updateName = () => {
      const stored = localStorage.getItem("username");
      // Fallback if null, empty, or string "undefined"
      setUsername(stored && stored !== "undefined" && stored.trim() !== "" ? stored : "User");
    };
    updateName();
    window.addEventListener("auth:updated", updateName);
    return () => window.removeEventListener("auth:updated", updateName);
  }, []);

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/simulator", label: "Simulator" },
    { path: "/insights", label: "Insights" },
    { path: "/settings", label: "Settings" },
  ];

  const handleLogout = () => {
    localStorage.setItem("loggedIn", false);
    localStorage.removeItem("username");
    window.dispatchEvent(new Event("auth:updated"));
    navigate("/"); // back to landing/login
  };

  return (
    <div className="bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold text-white">RECT | Real-Time Economic Conditions & Tariffs</h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm">Live</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-300">Welcome, {localStorage.getItem("username") || "User"}</span>

                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{username?.[0]?.toUpperCase() || "U"}</span>
                </div>

                {/* Logout */}
                <button onClick={handleLogout} className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navItems.map(({path, label}) => (
              <Link 
                to={path}
                key={path}
                className={`px-4 py-3 text-sm font-medium transition-all ${
                  location.pathname === path
                    ? 'text-white bg-blue-600 bg-opacity-20 border-b-2 border-blue-600'
                    : 'text-gray-300 hover:text-white hover:bg-blue-600 hover:bg-opacity-10'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};