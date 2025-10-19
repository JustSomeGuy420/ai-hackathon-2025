import React, { useState, useRef } from 'react';

export default function TariffSimulator() {
  const [activeNav, setActiveNav] = useState('simulator');
  const [currentRate, setCurrentRate] = useState(15);
  const [proposedRate, setProposedRate] = useState(25);
  const [productCategory, setProductCategory] = useState('electronics');
  const [country, setCountry] = useState('china');
  const [timeHorizon, setTimeHorizon] = useState('6');
  const [income, setIncome] = useState('medium');
  const [isSimulating, setIsSimulating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    monthlyCost: 127,
    annualCost: 1524,
    budgetShare: 2.1
  });
  const resultsRef = useRef(null);

  const handleSimulate = () => {
    setIsSimulating(true);
    
    setTimeout(() => {
      const tariffDiff = proposedRate - currentRate;
      const baseImpact = Math.abs(tariffDiff) * 8.5;
      
      const categoryMultipliers = {
        electronics: 1.2,
        food: 0.8,
        textiles: 0.9,
        steel: 1.5,
        automotive: 1.8,
        energy: 2.0
      };
      
      const incomeMultipliers = {
        low: 1.5,
        medium: 1.0,
        high: 0.7
      };
      
      const monthlyCost = Math.round(baseImpact * categoryMultipliers[productCategory] * incomeMultipliers[income]);
      const annualCost = monthlyCost * 12;
      const budgetShare = (monthlyCost / 5000 * 100).toFixed(1);
      
      setResults({ monthlyCost, annualCost, budgetShare });
      setIsSimulating(false);
      setShowResults(true);
      
      // Scroll to results after a brief delay
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 2000);
  };

  const generateChartPoints = () => {
    const basePrice = 100;
    const currentPoints = [];
    const proposedPoints = [];
    
    for (let i = 0; i < 6; i++) {
      const x = 50 + (i * 60);
      
      const currentPrice = basePrice + (i * 2);
      const currentY = 180 - (currentPrice * 0.8);
      currentPoints.push([x, currentY]);
      
      const proposedIncrease = Math.max(0, proposedRate - currentRate) * 2;
      const proposedPrice = basePrice + (i * (2 + proposedIncrease));
      const proposedY = 180 - (proposedPrice * 0.8);
      proposedPoints.push([x, proposedY]);
    }
    
    return { currentPoints, proposedPoints };
  };

  const { currentPoints, proposedPoints } = generateChartPoints();

  return (
    <div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Tariff Impact Simulator</h2>
          <p className="text-gray-400">Analyze how tariff changes affect product prices and household budgets</p>
        </div>

        {/* Input Panel */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-6">Simulation Parameters</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Product Category</label>
              <select 
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="electronics">📱 Electronics</option>
                <option value="food">🍎 Food & Agriculture</option>
                <option value="textiles">👕 Textiles</option>
                <option value="steel">🏗️ Steel & Metal</option>
                <option value="automotive">🚗 Automotive</option>
                <option value="energy">⚡ Energy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Import Country</label>
              <select 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="china">🇨🇳 China</option>
                <option value="mexico">🇲🇽 Mexico</option>
                <option value="canada">🇨🇦 Canada</option>
                <option value="germany">🇩🇪 Germany</option>
                <option value="japan">🇯🇵 Japan</option>
                <option value="south-korea">🇰🇷 South Korea</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Time Horizon</label>
              <select 
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">1 Year</option>
                <option value="24">2 Years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Household Income</label>
              <select 
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="low">&lt; $50k</option>
                <option value="medium">$50k - $100k</option>
                <option value="high">$100k+</option>
              </select>
            </div>
          </div>

          {/* Tariff Scenarios */}
          <div className="mt-8">
            <h4 className="text-md font-semibold text-white mb-4">Tariff Scenarios</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-white">Current Tariff Rate</label>
                  <span className="text-blue-400 font-semibold">{currentRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={currentRate}
                  onChange={(e) => setCurrentRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-white">Proposed Tariff Rate</label>
                  <span className="text-orange-400 font-semibold">{proposedRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={proposedRate}
                  onChange={(e) => setProposedRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Simulate Button */}
          <div className="mt-8 text-center">
            <button 
              onClick={handleSimulate}
              disabled={isSimulating}
              className="bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSimulating ? (
                <span className="flex items-center justify-center">
                  Running Simulation...
                  <div className="ml-2 w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </span>
              ) : (
                '🚀 Simulate Impact'
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div ref={resultsRef} className="space-y-8">
            {/* Results Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Price Trajectory Chart */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Price Trajectory</h3>
                <div className="bg-gray-700 rounded-lg p-4 h-64">
                  <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
                    <defs>
                      <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#4b5563" strokeWidth="0.5" opacity="0.3"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Y-axis labels */}
                    <text x="10" y="20" fill="#9ca3af" fontSize="10" textAnchor="middle">$200</text>
                    <text x="10" y="60" fill="#9ca3af" fontSize="10" textAnchor="middle">$150</text>
                    <text x="10" y="100" fill="#9ca3af" fontSize="10" textAnchor="middle">$100</text>
                    <text x="10" y="140" fill="#9ca3af" fontSize="10" textAnchor="middle">$50</text>
                    <text x="10" y="180" fill="#9ca3af" fontSize="10" textAnchor="middle">$0</text>
                    
                    {/* Current Scenario Line */}
                    <polyline 
                      points={currentPoints.map(p => p.join(',')).join(' ')}
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="3" 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-700"
                    />
                    
                    {/* Proposed Scenario Line */}
                    <polyline 
                      points={proposedPoints.map(p => p.join(',')).join(' ')}
                      fill="none" 
                      stroke="#ef4444" 
                      strokeWidth="3" 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="5,5"
                      className="transition-all duration-700"
                    />
                    
                    {/* Data Points - Current */}
                    {currentPoints.map((point, i) => (
                      <circle key={`current-${i}`} cx={point[0]} cy={point[1]} r="4" fill="#3b82f6" className="transition-all duration-500" />
                    ))}
                    
                    {/* Data Points - Proposed */}
                    {proposedPoints.map((point, i) => (
                      <circle key={`proposed-${i}`} cx={point[0]} cy={point[1]} r="4" fill="#ef4444" className="transition-all duration-500" />
                    ))}
                    
                    {/* X-axis labels */}
                    {['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'].map((label, i) => (
                      <text key={label} x={50 + i * 60} y="195" fill="#9ca3af" fontSize="10" textAnchor="middle">{label}</text>
                    ))}
                  </svg>
                </div>
                <div className="mt-4 flex justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-1 bg-blue-500 rounded mr-2"></div>
                    <span className="text-gray-300">Current Scenario</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-1 bg-red-500 rounded mr-2" style={{backgroundImage: 'repeating-linear-gradient(90deg, #ef4444 0, #ef4444 3px, transparent 3px, transparent 6px)'}}></div>
                    <span className="text-gray-300">Proposed Scenario</span>
                  </div>
                </div>
              </div>

              {/* Budget Impact */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Household Budget Impact</h3>
                <div className="space-y-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">Monthly Additional Cost</span>
                      <span className="text-red-400 font-semibold">+${results.monthlyCost}</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full transition-all duration-700" style={{width: '65%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">Annual Impact</span>
                      <span className="text-orange-400 font-semibold">+${results.annualCost}</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full transition-all duration-700" style={{width: '45%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">Budget Share Impact</span>
                      <span className="text-yellow-400 font-semibold">+{results.budgetShare}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full transition-all duration-700" style={{width: '30%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-600 bg-opacity-20 border border-blue-600 border-opacity-30 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-2">💡</span>
                    <div>
                      <p className="text-sm font-medium text-white">Impact Assessment</p>
                      <p className="text-xs text-blue-300">Moderate impact on household budget. Consider alternatives.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What-If Comparisons */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">What-If Scenario Comparison</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Conservative Scenario */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-center mb-4">
                    <h4 className="font-semibold text-green-400">Conservative (+5%)</h4>
                    <p className="text-xs text-gray-400">20% Tariff Rate</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-300">Price Increase</span>
                      <span className="text-green-400 text-xs">+8.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-300">Monthly Cost</span>
                      <span className="text-green-400 text-xs">+$67</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-300">Annual Impact</span>
                      <span className="text-green-400 text-xs">+$804</span>
                    </div>
                  </div>
                </div>

                {/* Current Scenario */}
                <div className="bg-gray-700 rounded-lg p-4 border-2 border-blue-500">
                  <div className="text-center mb-4">
                    <h4 className="font-semibold text-blue-400">Current (+10%)</h4>
                    <p className="text-xs text-gray-400">25% Tariff Rate</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-300">Price Increase</span>
                      <span className="text-blue-400 text-xs">+15.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-300">Monthly Cost</span>
                      <span className="text-blue-400 text-xs">+${results.monthlyCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-300">Annual Impact</span>
                      <span className="text-blue-400 text-xs">+${results.annualCost}</span>
                    </div>
                  </div>
                </div>

                {/* Aggressive Scenario */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-center mb-4">
                    <h4 className="font-semibold text-red-400">Aggressive (+20%)</h4>
                    <p className="text-xs text-gray-400">35% Tariff Rate</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-300">Price Increase</span>
                      <span className="text-red-400 text-xs">+28.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-300">Monthly Cost</span>
                      <span className="text-red-400 text-xs">+$231</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-300">Annual Impact</span>
                      <span className="text-red-400 text-xs">+$2,772</span>
                    </div>
                  </div>
                </div>

                {/* Extreme Scenario */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-center mb-4">
                    <h4 className="font-semibold text-purple-400">Extreme (+30%)</h4>
                    <p className="text-xs text-gray-400">45% Tariff Rate</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-300">Price Increase</span>
                      <span className="text-purple-400 text-xs">+38.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-300">Monthly Cost</span>
                      <span className="text-purple-400 text-xs">+$315</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-300">Annual Impact</span>
                      <span className="text-purple-400 text-xs">+$3,780</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">AI Recommendations</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-green-600 bg-opacity-20 border border-green-600 border-opacity-30 rounded-lg p-4 transition-transform hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-green-400 text-3xl mb-3">💰</span>
                    <div>
                      <h4 className="font-medium text-white mb-2">Switch to Domestic Brands</h4>
                      <p className="text-xs text-gray-300 mb-3">Consider Samsung (South Korea) instead of Chinese electronics to save 12% on average.</p>
                      <span className="text-xs bg-green-600 bg-opacity-30 text-green-300 px-2 py-1 rounded">Potential Savings: $152/month</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-600 bg-opacity-20 border border-blue-600 border-opacity-30 rounded-lg p-4 transition-transform hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-blue-400 text-3xl mb-3">📅</span>
                    <div>
                      <h4 className="font-medium text-white mb-2">Timing Strategy</h4>
                      <p className="text-xs text-gray-300 mb-3">Purchase electronics before March 2025 when tariffs are expected to increase further.</p>
                      <span className="text-xs bg-blue-600 bg-opacity-30 text-blue-300 px-2 py-1 rounded">Urgency: High</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-600 bg-opacity-20 border border-purple-600 border-opacity-30 rounded-lg p-4 transition-transform hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-purple-400 text-3xl mb-3">🔄</span>
                    <div>
                      <h4 className="font-medium text-white mb-2">Alternative Suppliers</h4>
                      <p className="text-xs text-gray-300 mb-3">Mexico and Canada offer similar products with lower tariff rates (5-8% vs 25%).</p>
                      <span className="text-xs bg-purple-600 bg-opacity-30 text-purple-300 px-2 py-1 rounded">Research Required</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-600 bg-opacity-20 border border-yellow-600 border-opacity-30 rounded-lg p-4 transition-transform hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-yellow-400 text-3xl mb-3">📊</span>
                    <div>
                      <h4 className="font-medium text-white mb-2">Budget Adjustment</h4>
                      <p className="text-xs text-gray-300 mb-3">Allocate an additional {results.budgetShare}% of household budget to electronics category.</p>
                      <span className="text-xs bg-yellow-600 bg-opacity-30 text-yellow-300 px-2 py-1 rounded">Budget Planning</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
