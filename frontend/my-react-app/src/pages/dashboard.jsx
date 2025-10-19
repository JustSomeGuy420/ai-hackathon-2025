// src/pages/TariffTrackerDashboard.jsx
import React, { useState, useEffect } from "react";
import { getDashboardMetrics, getProducts, getAlerts } from "../api/api";
import ProductCount from "../utility/ProductCount";
import { getPercentChange, countCriticalAlerts } from "../utility/calculations";

export default function TariffTrackerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch backend data once
  useEffect(() => {
    async function fetchData() {
      try {
        const [metricsRes, productsRes, alertsRes] = await Promise.all([
          getDashboardMetrics(),
          getProducts(),
          getAlerts(),
        ]);
        setMetrics(metricsRes || []);
        setProducts(productsRes || []);
        setAlerts(alertsRes || []);
      } catch (err) {
        console.error("API fetch failed:", err);
      }
    }
    fetchData();
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchMessage(`Found results for: ${searchQuery}`);
      setTimeout(() => setSearchMessage(""), 3000);
    }, 800);
  };

  const percentChange = metrics.length >= 2
    ? getPercentChange(metrics[1].value, metrics[0].value)
    : 0;

  const criticalAlerts = countCriticalAlerts(alerts, 20);

  const defaultMetrics = [
    {
      icon: "📊",
      title: "Tracked Products",
      value: <ProductCount />,
      change: `${percentChange}% from last year`,
      color: percentChange >= 0 ? "text-green-400" : "text-red-400",
      bg: "bg-blue-600",
    },
    {
      icon: "⚠️",
      title: "Price Alerts",
      value: alerts.length,
      change: `${criticalAlerts} critical`,
      color: criticalAlerts > 0 ? "text-yellow-400" : "text-gray-400",
      bg: "bg-yellow-600",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* === Metrics === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {defaultMetrics.map((m, i) => (
          <div
            key={i}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:-translate-y-1 hover:shadow-lg transition"
          >
            <div className="flex items-center">
              <div
                className={`w-10 h-10 ${m.bg} bg-opacity-20 rounded-lg flex items-center justify-center`}
              >
                {m.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">{m.title}</p>
                <p className="text-2xl font-semibold text-white">{m.value}</p>
              </div>
            </div>
            <p className={`mt-3 text-sm ${m.color}`}>{m.change}</p>
          </div>
        ))}
      </div>

      {/* === Alerts === */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Alerts</h3>
        {alerts.length ? (
          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert, i) => (
              <div
                key={i}
                className="p-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg"
              >
                <p className="text-white text-sm font-medium">{alert.title || "Tariff Update"}</p>
                <p className="text-xs text-gray-400">{alert.desc || "Alert details unavailable"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No alerts available.</p>
        )}
      </section>

      {/* === Products Table === */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Tracked Products</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-1 text-sm"
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm disabled:opacity-70"
            >
              {isSearching ? "..." : "Search"}
            </button>
          </div>
        </div>

        {searchMessage && (
          <p className="text-blue-400 text-sm mb-3">{searchMessage}</p>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-300">
            <thead className="border-b border-gray-600">
              <tr>
                <th className="text-left py-2 px-3">Product</th>
                <th className="text-left py-2 px-3">Rate</th>
                <th className="text-left py-2 px-3">Change</th>
              </tr>
            </thead>
            <tbody>
              {products.length ? (
                products.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-700">
                    <td className="py-2 px-3">{p.name || "N/A"}</td>
                    <td className="py-2 px-3">{p.rate || "—"}</td>
                    <td className="py-2 px-3">{p.change || "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-3 text-center text-gray-500" colSpan="3">
                    No product data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
