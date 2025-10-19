import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCount from './../utility/api';

export default function TariffTrackerDashboard() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
        setSearchMessage(`Found results for: ${searchQuery}`);
        setTimeout(() => setSearchMessage(''), 3000);
      }, 1000);
    }
  };

  const p_count = ''
  const metrics = [
    { icon: '📊', title: 'Tracked Products', value: <ProductCount/>, change: '+12% from last month', changeColor: 'text-green-400', bgColor: 'bg-blue-600' },
    { icon: '💰', title: 'Avg. Tariff Rate', value: '8.4%', change: '+0.3% this week', changeColor: 'text-red-400', bgColor: 'bg-green-600' },
    { icon: '⚠️', title: 'Price Alerts', value: '23', change: '5 critical', changeColor: 'text-yellow-400', bgColor: 'bg-yellow-600' },
    { icon: '🤖', title: 'AI Predictions', value: '94%', change: 'Accuracy rate', changeColor: 'text-green-400', bgColor: 'bg-purple-600' },
  ];

  const recentChanges = [
    { title: 'Steel Tariffs Increased', desc: 'US raises steel import tariffs to 25%', time: '2 hours ago • Manufacturing', color: 'red' },
    { title: 'EU Trade Deal Signed', desc: 'Textile tariffs reduced by 15%', time: '6 hours ago • Textiles', color: 'green' },
    { title: 'China Policy Update', desc: 'Electronics export restrictions announced', time: '1 day ago • Electronics', color: 'yellow' },
    { title: 'USMCA Review', desc: 'Agricultural tariffs under review', time: '2 days ago • Agriculture', color: 'blue' },
  ];

  const forecasts = [
    { category: '🍎 Food & Agriculture', current: '$1,245', predicted: '$1,274', change: '+2.3%', color: 'red', width: '23%' },
    { category: '📱 Electronics', current: '$892', predicted: '$929', change: '+4.1%', color: 'orange', width: '41%' },
    { category: '🏗️ Construction', current: '$2,156', predicted: '$2,195', change: '+1.8%', color: 'yellow', width: '18%' },
    { category: '👕 Textiles', current: '$456', predicted: '$451', change: '-1.2%', color: 'green', width: '12%' },
  ];

  const alerts = [
    { title: 'Steel Tariff Increase', desc: 'Rate increased to 25% (+5%)', time: '2 hours ago', color: 'red' },
    { title: 'Aluminum Price Spike', desc: '15% increase detected', time: '4 hours ago', color: 'yellow' },
    { title: 'New Trade Agreement', desc: 'EU-US textile tariffs reduced', time: '1 day ago', color: 'blue' },
  ];

  const products = [
    { name: 'Steel Products', code: '7208', rate: '25.0%', change: '+5.0%', changeColor: 'text-red-400', prediction: '↗ Increasing', predColor: 'text-orange-400', status: 'Critical', statusColor: 'bg-red-600' },
    { name: 'Aluminum Sheets', code: '7606', rate: '10.0%', change: '-2.0%', changeColor: 'text-green-400', prediction: '↘ Stable', predColor: 'text-green-400', status: 'Normal', statusColor: 'bg-green-600' },
    { name: 'Solar Panels', code: '8541', rate: '18.5%', change: '0.0%', changeColor: 'text-gray-400', prediction: '→ Monitoring', predColor: 'text-blue-400', status: 'Watch', statusColor: 'bg-yellow-600' },
    { name: 'Textiles', code: '5208', rate: '7.2%', change: '-1.5%', changeColor: 'text-green-400', prediction: '↘ Decreasing', predColor: 'text-green-400', status: 'Normal', statusColor: 'bg-green-600' },
  ];

  return (
    <div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, idx) => (
            <div key={idx} className="bg-gray-800 border border-gray-700 rounded-xl p-6 transition-all hover:transform hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center">
                <div className={`w-10 h-10 ${metric.bgColor} bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <span className="text-lg">{metric.icon}</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">{metric.title}</p>
                  <p className="text-2xl font-semibold text-white">{metric.value}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${metric.changeColor}`}>{metric.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Snapshot & Country Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Global Snapshot */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Global Snapshot</h3>
              <span className="text-xs text-gray-400">Updated 2 hours ago</span>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2 text-center">Global Tariff Severity</h4>
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="bg-red-500 h-8 rounded flex items-center justify-center text-xs text-white">NA</div>
                <div className="bg-yellow-500 h-8 rounded flex items-center justify-center text-xs text-white">EU</div>
                <div className="bg-orange-500 h-8 rounded flex items-center justify-center text-xs text-white">AS</div>
                <div className="bg-green-500 h-8 rounded flex items-center justify-center text-xs text-white">OC</div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Low (0-5%)</span>
                <span>Medium (5-15%)</span>
                <span>High (15%+)</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">12.3%</p>
                <p className="text-xs text-gray-400">Avg Global Tariff</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-400">6.8%</p>
                <p className="text-xs text-gray-400">Global Inflation</p>
              </div>
            </div>
          </div>

          {/* Your Country Summary */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Your Country Summary</h3>
              <div className="flex items-center">
                <span className="text-lg mr-2">🇺🇸</span>
                <span className="text-sm text-gray-400">United States</span>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Inflation Rate', value: '3.2%', badge: 'Moderate', badgeColor: 'bg-yellow-600', detail: '+0.1% MoM' },
                { label: 'Avg Import Tariff', value: '7.4%', badge: 'Below Global', badgeColor: 'bg-green-600', detail: '-4.9% vs Global' },
                { label: 'Cost of Living Index', value: '76.8', badge: 'Stable', badgeColor: 'bg-blue-600', detail: 'Base: 100' },
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400">{item.label}</p>
                      <p className="text-xl font-semibold text-white">{item.value}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs ${item.badgeColor} bg-opacity-20 text-${item.badgeColor.replace('bg-', '')}-400 px-2 py-1 rounded`}>
                        {item.badge}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Changes & AI Forecast */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Changes */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Recent Changes</h3>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {recentChanges.map((change, idx) => (
                <div key={idx} className={`flex items-start space-x-3 p-3 bg-${change.color}-600 bg-opacity-10 border-l-4 border-${change.color}-500 rounded-r-lg`}>
                  <div className={`w-2 h-2 bg-${change.color}-400 rounded-full mt-2 flex-shrink-0`}></div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">{change.title}</p>
                    <p className="text-xs text-gray-300">{change.desc}</p>
                    <p className="text-xs text-gray-400">{change.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Forecast Highlights */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">AI Forecast Highlights</h3>
              <span className="text-xs text-gray-400">Next Month Predictions</span>
            </div>
            <div className="space-y-4">
              {forecasts.map((forecast, idx) => (
                <div key={idx} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-white">{forecast.category}</span>
                    <span className={`text-xs bg-${forecast.color}-600 bg-opacity-20 text-${forecast.color}-400 px-2 py-1 rounded`}>
                      {forecast.change}
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className={`bg-${forecast.color}-500 h-2 rounded-full`} style={{ width: forecast.width }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Current: {forecast.current}</span>
                    <span>Predicted: {forecast.predicted}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Alerts & Data Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Alerts */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Alerts</h3>
            <div className="space-y-4">
              {alerts.map((alert, idx) => (
                <div key={idx} className={`flex items-start space-x-3 p-3 bg-${alert.color}-600 bg-opacity-10 border border-${alert.color}-600 border-opacity-20 rounded-lg`}>
                  <div className={`w-2 h-2 bg-${alert.color}-400 rounded-full mt-2`}></div>
                  <div>
                    <p className="text-sm font-medium text-white">{alert.title}</p>
                    <p className="text-xs text-gray-300">{alert.desc}</p>
                    <p className="text-xs text-gray-400">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium">View All Alerts</button>
          </div>

          {/* Top Tracked Products */}
          <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Top Tracked Products</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-1 text-sm w-48 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 text-sm disabled:opacity-70"
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
            {searchMessage && (
              <div className="text-sm text-blue-400 mb-4">{searchMessage}</div>
            )}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Product</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Current Rate</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Change</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Prediction</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {products.map((product, idx) => (
                    <tr key={idx} className="hover:bg-gray-700">
                      <td className="py-3 px-4">
                        <div className="font-medium text-white">{product.name}</div>
                        <div className="text-sm text-gray-400">HS Code: {product.code}</div>
                      </td>
                      <td className="py-3 px-4 text-white">{product.rate}</td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${product.changeColor}`}>{product.change}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={product.predColor}>{product.prediction}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`${product.statusColor} bg-opacity-20 text-${product.statusColor.replace('bg-', '')}-400 px-2 py-1 rounded-full text-xs`}>
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
