import React, { useState, useEffect, useRef } from 'react';

const EconomicInsightDashboard = () => {
  const [activeNav, setActiveNav] = useState('Insights');
  const [activeCategory, setActiveCategory] = useState('all');
  const [chatMessages, setChatMessages] = useState([
    {
      isUser: false,
      text: "Hi! I can help explain economic trends and their impact on your budget. Try asking \"Why did food prices rise?\" or \"When will inflation decrease?\""
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chartAnimated, setChartAnimated] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
  const [aiContent, setAiContent] = useState('default');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const chatMessagesRef = useRef(null);

  const categoryData = {
    all: ['65%', '45%', '25%', '35%'],
    food: ['45%', '60%', '35%', '20%'],
    electronics: ['85%', '30%', '15%', '25%'],
    clothing: ['35%', '40%', '45%', '30%']
  };

  useEffect(() => {
    const timer = setTimeout(() => setChartAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setChartAnimated(false);
    setTimeout(() => setChartAnimated(true), 100);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { isUser: true, text: userMessage }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let response = '';
      const lowerMsg = userMessage.toLowerCase();
      
      if (lowerMsg.includes('food') || lowerMsg.includes('prices')) {
        response = 'Food prices increased by 5.1% primarily due to higher transportation costs (+2.3%) and supply chain disruptions (+1.8%). Weather-related crop yields also contributed +1.0% to the increase.';
      } else if (lowerMsg.includes('electronics')) {
        response = 'Electronics saw the largest price increase (+8.2%) due to new tariffs on imported components (+5.4%) and semiconductor shortages (+2.8%). Consider domestic alternatives or timing purchases strategically.';
      } else if (lowerMsg.includes('when') || lowerMsg.includes('stabilize')) {
        response = 'Economic models suggest price stabilization may begin in Q3 2025, contingent on policy adjustments and supply chain recovery. Monitor monthly CPI reports for early indicators.';
      } else if (lowerMsg.includes('tariff')) {
        response = 'Tariffs directly increase import costs, which businesses typically pass to consumers. A 10% tariff generally results in 6-8% higher retail prices, depending on market competition and demand elasticity.';
      } else {
        response = 'I can help explain specific economic trends and their impacts. Try asking about particular sectors like food, electronics, or housing, or about timing and policy effects.';
      }
      
      setChatMessages(prev => [...prev, { isUser: false, text: response }]);
    }, 1500);
  };

  const handleRegenerateInsight = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setAiContent('regenerated');
      setIsRegenerating(false);
    }, 2000);
  };

  const handleTooltip = (e, text) => {
    if (text) {
      setTooltip({
        visible: true,
        text,
        x: e.clientX + 10,
        y: e.clientY - 10
      });
    } else {
      setTooltip({ visible: false, text: '', x: 0, y: 0 });
    }
  };

  const chartData = categoryData[activeCategory];

  return (
    <div>
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🌍</span>
              </div>
              <h1 className="text-3xl font-bold">Economic Insight Report</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all">
                📊 Export PDF
              </button>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all">
                📤 Share Insight
              </button>
            </div>
          </div>
          <div className="bg-gray-800 bg-opacity-60 rounded-lg p-4 backdrop-blur-sm border border-gray-600">
            <p className="text-lg font-medium mb-2 text-gray-100">North America • Q4 2024</p>
            <p className="text-gray-200 leading-relaxed">
              Recent tariff adjustments and currency fluctuations have resulted in a 6.8% increase in consumer prices, 
              with electronics and imported goods showing the most significant impact on household budgets.
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Key Economic Indicators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Inflation Rate */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:transform hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-red-500 text-sm">↗</span>
                  <span className="text-red-500 text-sm font-medium">+1.2%</span>
                </div>
              </div>
              <h3 className="text-gray-300 text-sm font-medium mb-1">Inflation Rate</h3>
              <div className="text-3xl font-bold text-white mb-2">6.8%</div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Above target range</p>
            </div>

            {/* Tariff Index */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:transform hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🚢</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-orange-500 text-sm">↗</span>
                  <span className="text-orange-500 text-sm font-medium">+8.5%</span>
                </div>
              </div>
              <h3 className="text-gray-300 text-sm font-medium mb-1">Tariff Index</h3>
              <div className="text-3xl font-bold text-white mb-2">127.3</div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Elevated levels</p>
            </div>

            {/* Exchange Rate Impact */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:transform hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💵</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-blue-500 text-sm">↘</span>
                  <span className="text-blue-500 text-sm font-medium">-2.1%</span>
                </div>
              </div>
              <h3 className="text-gray-300 text-sm font-medium mb-1">Exchange Rate Impact</h3>
              <div className="text-3xl font-bold text-white mb-2">-3.2%</div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Currency weakening</p>
            </div>

            {/* Monthly Basket Cost */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:transform hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🛍</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-green-500 text-sm">↗</span>
                  <span className="text-green-500 text-sm font-medium">+$127</span>
                </div>
              </div>
              <h3 className="text-gray-300 text-sm font-medium mb-1">Monthly Basket Cost</h3>
              <div className="text-3xl font-bold text-white mb-2">$1,994</div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">vs. baseline budget</p>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Price Change Contributors</h2>
            <div className="flex space-x-2">
              {['all', 'food', 'electronics', 'clothing'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {cat === 'all' ? 'All Categories' : cat === 'food' ? '🍎 Food' : cat === 'electronics' ? '📱 Electronics' : '👕 Clothing'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bar Chart */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Impact Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Tariffs', value: '+4.2%', color: 'red', percent: '65%' },
                    { label: 'Currency', value: '+1.8%', color: 'orange', percent: '28%' },
                    { label: 'Supply Chain', value: '+0.8%', color: 'yellow', percent: '12%' },
                    { label: 'Energy Costs', value: '+1.2%', color: 'blue', percent: '18%' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-24 text-sm text-gray-300">{item.label}</div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-600 rounded-full h-8 relative overflow-hidden">
                          <div
                            className={`bg-gradient-to-r from-${item.color}-500 to-${item.color}-400 h-full rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: chartAnimated ? chartData[idx] : '0%' }}
                          ></div>
                          <div className="absolute inset-0 flex items-center justify-end pr-3">
                            <span className="text-white text-sm font-medium">{item.value}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`w-16 text-right text-sm text-${item.color}-500 font-semibold`}>{item.percent}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pie Chart */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Category Impact</h3>
                <div className="relative">
                  <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
                    <path
                      d="M 150 150 L 150 50 A 100 100 0 0 1 221.21 78.79 Z"
                      fill="#ef4444"
                      className="hover:opacity-80 cursor-pointer"
                      onMouseEnter={(e) => handleTooltip(e, 'Electronics: +8.2% impact')}
                      onMouseLeave={() => handleTooltip(null, '')}
                    />
                    <path
                      d="M 150 150 L 221.21 78.79 A 100 100 0 0 1 221.21 221.21 Z"
                      fill="#f59e0b"
                      className="hover:opacity-80 cursor-pointer"
                      onMouseEnter={(e) => handleTooltip(e, 'Food: +5.1% impact')}
                      onMouseLeave={() => handleTooltip(null, '')}
                    />
                    <path
                      d="M 150 150 L 221.21 221.21 A 100 100 0 0 1 78.79 221.21 Z"
                      fill="#10b981"
                      className="hover:opacity-80 cursor-pointer"
                      onMouseEnter={(e) => handleTooltip(e, 'Clothing: +3.8% impact')}
                      onMouseLeave={() => handleTooltip(null, '')}
                    />
                    <path
                      d="M 150 150 L 78.79 221.21 A 100 100 0 0 1 150 50 Z"
                      fill="#6366f1"
                      className="hover:opacity-80 cursor-pointer"
                      onMouseEnter={(e) => handleTooltip(e, 'Other: +2.1% impact')}
                      onMouseLeave={() => handleTooltip(null, '')}
                    />
                    <circle cx="150" cy="150" r="40" fill="#374151"></circle>
                    <text x="150" y="145" textAnchor="middle" className="text-sm font-semibold fill-white">Total</text>
                    <text x="150" y="165" textAnchor="middle" className="text-lg font-bold fill-white">+6.8%</text>
                  </svg>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {[
                    { color: 'red', label: 'Electronics (40%)' },
                    { color: 'yellow', label: 'Food (30%)' },
                    { color: 'green', label: 'Clothing (20%)' },
                    { color: 'indigo', label: 'Other (10%)' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className={`w-4 h-4 bg-${item.color}-500 rounded`}></div>
                      <span className="text-sm text-gray-300">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Analysis */}
        <section className="mb-12">
          <div className="bg-gray-800 border border-gray-700 border-l-4 border-l-blue-500 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <h2 className="text-2xl font-semibold text-white">AI Economic Analysis</h2>
              </div>
              <button
                onClick={handleRegenerateInsight}
                disabled={isRegenerating}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-blue-400"
              >
                {isRegenerating ? '⏳ Generating...' : '🔄 Regenerate Insight'}
              </button>
            </div>
            
            <div className="prose prose-lg max-w-none">
              {aiContent === 'default' ? (
                <>
                  <p className="text-gray-200 leading-relaxed mb-4">
                    <span className="mr-2">📦</span>
                    <strong>Tariff Impact:</strong> Recent 15% tariff increases on imported electronics have directly contributed to a 4.2% rise in consumer prices, 
                    particularly affecting smartphones, laptops, and home appliances.
                  </p>
                  <p className="text-gray-200 leading-relaxed mb-4">
                    <span className="mr-2">💱</span>
                    <strong>Currency Effects:</strong> The 3.2% depreciation of the local currency against major trading partners has amplified import costs, 
                    adding an additional 1.8% to overall price increases across all categories.
                  </p>
                  <p className="text-gray-200 leading-relaxed mb-4">
                    <span className="mr-2">🏭</span>
                    <strong>Supply Chain Disruption:</strong> Ongoing logistics challenges and increased shipping costs have contributed 0.8% to price inflation, 
                    with the most significant impact on perishable goods and time-sensitive electronics.
                  </p>
                  <div className="bg-blue-900 bg-opacity-50 border border-blue-400 rounded-lg p-4 mt-6">
                    <p className="text-blue-200 font-medium">
                      💡 <strong>Key Insight:</strong> Electronics sector shows the highest sensitivity to policy changes, 
                      suggesting consumers should consider timing major purchases around policy announcements.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-200 leading-relaxed mb-4">
                    <span className="mr-2">📊</span>
                    <strong>Market Dynamics:</strong> The current inflationary environment is primarily driven by supply-side constraints, 
                    with tariff policies accounting for approximately 62% of the observed price increases across consumer goods.
                  </p>
                  <p className="text-gray-200 leading-relaxed mb-4">
                    <span className="mr-2">🌐</span>
                    <strong>Global Context:</strong> Compared to international markets, local inflation rates are 1.5 percentage points 
                    above the global average, indicating region-specific policy impacts beyond global economic trends.
                  </p>
                  <p className="text-gray-200 leading-relaxed mb-4">
                    <span className="mr-2">🔮</span>
                    <strong>Forward Outlook:</strong> Economic models suggest price pressures may persist through Q2 2025, 
                    with potential relief dependent on policy adjustments and supply chain normalization.
                  </p>
                  <div className="bg-blue-900 bg-opacity-50 border border-blue-400 rounded-lg p-4 mt-6">
                    <p className="text-blue-200 font-medium">
                      💡 <strong>Alternative Perspective:</strong> Focus on sectors with domestic production capacity 
                      may provide natural hedging against import-dependent price volatility.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Recommended Actions</h2>
          <div className="grid grid-cols-3 gap-6">
            {/* Buy Local Alternatives */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 hover:scale-102 hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Buy Local Alternatives</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Switch to domestic brands for electronics and food products to avoid tariff-related price increases.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <span className="text-sm font-semibold text-green-400">Potential Savings: 15-25%</span>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center gap-1 transition-colors">
                  Learn More <span>→</span>
                </button>
              </div>
            </div>

            {/* Strategic Purchase Timing */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 hover:scale-102 hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <span className="text-3xl">⏰</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Strategic Purchase Timing</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Monitor policy announcements and make major purchases before anticipated tariff increases.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <span className="text-sm font-semibold text-orange-400">Next Policy Review: Mar 2025</span>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center gap-1 transition-colors">
                  Set Alerts <span>→</span>
                </button>
              </div>
            </div>

            {/* Track Exchange Rates */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 hover:scale-102 hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Track Exchange Rates</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Monitor currency trends for optimal timing of international purchases and travel bookings.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <span className="text-sm font-semibold text-blue-400">Current Trend: Weakening</span>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center gap-1 transition-colors">
                  View Rates <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Global Comparison Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Global Comparison</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* World Map Visualization */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Regional Inflation Rates</h3>
              <div className="relative">
                <svg width="100%" height="300" viewBox="0 0 500 300" className="border rounded-lg bg-blue-50">
                  {/* North America */}
                  <rect
                    x="50" y="80" width="120" height="80"
                    fill="#ef4444" opacity="0.7" rx="8"
                    className="hover:opacity-90 cursor-pointer"
                    onMouseEnter={(e) => handleTooltip(e, 'North America: +6.8%')}
                    onMouseLeave={() => handleTooltip(null, '')}
                  />
                  <text x="110" y="125" textAnchor="middle" className="text-sm font-semibold fill-white">North America</text>
                  <text x="110" y="140" textAnchor="middle" className="text-xs fill-white">+6.8%</text>
                  
                  {/* Europe */}
                  <rect
                    x="200" y="70" width="100" height="70"
                    fill="#f59e0b" opacity="0.7" rx="8"
                    className="hover:opacity-90 cursor-pointer"
                    onMouseEnter={(e) => handleTooltip(e, 'Europe: +4.2%')}
                    onMouseLeave={() => handleTooltip(null, '')}
                  />
                  <text x="250" y="105" textAnchor="middle" className="text-sm font-semibold fill-white">Europe</text>
                  <text x="250" y="120" textAnchor="middle" className="text-xs fill-white">+4.2%</text>
                  
                  {/* Asia */}
                  <rect
                    x="320" y="90" width="130" height="90"
                    fill="#10b981" opacity="0.7" rx="8"
                    className="hover:opacity-90 cursor-pointer"
                    onMouseEnter={(e) => handleTooltip(e, 'Asia: +3.1%')}
                    onMouseLeave={() => handleTooltip(null, '')}
                  />
                  <text x="385" y="135" textAnchor="middle" className="text-sm font-semibold fill-white">Asia</text>
                  <text x="385" y="150" textAnchor="middle" className="text-xs fill-white">+3.1%</text>
                  
                  {/* South America */}
                  <rect
                    x="80" y="180" width="90" height="80"
                    fill="#f59e0b" opacity="0.7" rx="8"
                    className="hover:opacity-90 cursor-pointer"
                    onMouseEnter={(e) => handleTooltip(e, 'South America: +5.5%')}
                    onMouseLeave={() => handleTooltip(null, '')}
                  />
                  <text x="125" y="220" textAnchor="middle" className="text-sm font-semibold fill-white">S. America</text>
                  <text x="125" y="235" textAnchor="middle" className="text-xs fill-white">+5.5%</text>
                  
                  {/* Africa */}
                  <rect
                    x="220" y="160" width="80" height="100"
                    fill="#6366f1" opacity="0.7" rx="8"
                    className="hover:opacity-90 cursor-pointer"
                    onMouseEnter={(e) => handleTooltip(e, 'Africa: +7.9%')}
                    onMouseLeave={() => handleTooltip(null, '')}
                  />
                  <text x="260" y="210" textAnchor="middle" className="text-sm font-semibold fill-white">Africa</text>
                  <text x="260" y="225" textAnchor="middle" className="text-xs fill-white">+7.9%</text>
                </svg>
              </div>
              <div className="mt-4 flex justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-gray-300">Low (0-4%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-gray-300">Moderate (4-6%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-gray-300">High (6%+)</span>
                </div>
              </div>
            </div>

            {/* Trend Comparison Chart */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">12-Month Trend Comparison</h3>
              <div className="relative h-64">
                <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
                  {/* Grid */}
                  <defs>
                    <pattern id="comparison-grid" width="40" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#4b5563" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#comparison-grid)" />
                  
                  {/* Local trend line */}
                  <polyline
                    points="20,160 60,150 100,140 140,130 180,120 220,110 260,100 300,90 340,85 380,80"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  
                  {/* Global average line */}
                  <polyline
                    points="20,170 60,165 100,160 140,155 180,150 220,145 260,140 300,135 340,130 380,125"
                    fill="none"
                    stroke="#6b7280"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                    strokeLinecap="round"
                  />
                  
                  {/* Data points */}
                  <circle cx="380" cy="80" r="4" fill="#ef4444"/>
                  <circle cx="380" cy="125" r="4" fill="#6b7280"/>
                  
                  {/* Labels */}
                  <text x="20" y="15" className="text-xs fill-gray-300">8%</text>
                  <text x="20" y="55" className="text-xs fill-gray-300">6%</text>
                  <text x="20" y="95" className="text-xs fill-gray-300">4%</text>
                  <text x="20" y="135" className="text-xs fill-gray-300">2%</text>
                  <text x="20" y="175" className="text-xs fill-gray-300">0%</text>
                </svg>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-1 bg-red-500 rounded"></div>
                    <span className="text-sm text-gray-300">Local Rate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-1 bg-gray-500 rounded" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #6b7280 0, #6b7280 3px, transparent 3px, transparent 6px)' }}></div>
                    <span className="text-sm text-gray-300">Global Average</span>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Gap: +1.5% above global
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chat Section */}
        <section className="mb-12">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-xl">💬</span>
              </div>
              <h2 className="text-xl font-semibold text-white">Ask About Economic Trends</h2>
            </div>
            
            <div ref={chatMessagesRef} className="space-y-4 mb-4 max-h-64 overflow-y-auto">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 ${msg.isUser ? 'bg-blue-500' : 'bg-purple-500'} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-sm">{msg.isUser ? '👤' : '🤖'}</span>
                  </div>
                  <div className={`${msg.isUser ? 'bg-blue-600' : 'bg-gray-700'} rounded-lg p-3 max-w-md`}>
                    <p className="text-sm text-gray-100">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">🤖</span>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="text-sm text-gray-300 animate-pulse">Thinking...</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about economic trends..."
                className="flex-1 px-4 py-3 rounded-lg bg-gray-700 border-2 border-gray-600 text-white focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Send
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {['Why did electronics get expensive?', 'When will prices stabilize?', 'How do tariffs affect me?'].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setChatInput(q);
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded-full text-sm transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-3">Data Sources</h3>
              <ul className="space-y-1 text-sm">
                <li>• Federal Reserve Economic Data</li>
                <li>• Bureau of Labor Statistics</li>
                <li>• International Monetary Fund</li>
                <li>• World Trade Organization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Last Updated</h3>
              <p className="text-sm">December 15, 2024 at 3:42 PM EST</p>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm">Real-time data feed active</span>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Disclaimer</h3>
              <p className="text-sm">
                Economic projections are estimates based on current data and models. 
                Actual results may vary. Not financial advice.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed bg-black bg-opacity-90 text-white px-3 py-2 rounded-md text-xs pointer-events-none z-50"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default EconomicInsightDashboard;
