import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const LOCAL_KEY = "userSettings";

  const defaultSettings = {
    country: 'US',
    region: 'CA',
    primaryCurrency: 'USD',
    showLocalCurrency: true,
    autoUpdateRates: true,
    policyUpdates: true,
    priceAlerts: true,
    weeklyReports: false,
    simulationReminders: false,
    emailFrequency: 'weekly',
    notificationEmail: '',
    dataCollection: true,
    personalization: true
  };

  // ✅ Load from localStorage if exists
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [activeNav, setActiveNav] = useState('Settings');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // ✅ Save to localStorage when settings change
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(settings));
  }, [settings]);

  const [simulations] = useState([
    { id: 1, name: 'Electronics Tariff 2024', date: 'Dec 10, 2024' },
    { id: 2, name: 'Food Import Analysis', date: 'Dec 8, 2024' },
    { id: 3, name: 'Automotive Scenario', date: 'Dec 5, 2024' }
  ]);

  const regionsByCountry = {
    US: [
      { value: 'CA', text: 'California' },
      { value: 'NY', text: 'New York' },
      { value: 'TX', text: 'Texas' },
      { value: 'FL', text: 'Florida' },
      { value: 'IL', text: 'Illinois' }
    ],
    CA: [
      { value: 'ON', text: 'Ontario' },
      { value: 'QC', text: 'Quebec' },
      { value: 'BC', text: 'British Columbia' },
      { value: 'AB', text: 'Alberta' }
    ],
    GB: [
      { value: 'ENG', text: 'England' },
      { value: 'SCT', text: 'Scotland' },
      { value: 'WLS', text: 'Wales' },
      { value: 'NIR', text: 'Northern Ireland' }
    ],
    DE: [
      { value: 'BY', text: 'Bavaria' },
      { value: 'NW', text: 'North Rhine-Westphalia' },
      { value: 'BW', text: 'Baden-Württemberg' },
      { value: 'NI', text: 'Lower Saxony' }
    ]
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleCountryChange = (country) => {
    const newRegion = regionsByCountry[country]?.[0]?.value || 'default';
    setSettings(prev => ({ ...prev, country, region: newRegion }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "my_settings.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleResetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      setSettings(defaultSettings);
      localStorage.removeItem(LOCAL_KEY);
    }
  };

  const handleDeleteSimulation = (name) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      alert('Simulation deleted (demo)');
    }
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <label className="relative inline-block w-12 h-6 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="opacity-0 w-0 h-0"
      />
      <span className={`absolute inset-0 rounded-full transition-colors ${checked ? 'bg-blue-500' : 'bg-gray-600'}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : ''}`} />
      </span>
    </label>
  );

  return (
    <div>
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all">
                <span className="text-xl">←</span>
              </button>
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚙️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-gray-200 text-sm">User Preferences</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-50"
            >
              {isSaving ? '⏳ Saving...' : '💾 Save All Changes'}
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="bg-emerald-900 border border-emerald-600 text-emerald-100 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-xl">✅</span>
              <span className="font-medium">Settings saved successfully!</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Country & Region */}
            <section className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Country & Region</h2>
                  <p className="text-gray-400 text-sm">Choose your location for localized data</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                  <select
                    value={settings.country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border-2 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="US">🇺🇸 United States</option>
                    <option value="CA">🇨🇦 Canada</option>
                    <option value="GB">🇬🇧 United Kingdom</option>
                    <option value="DE">🇩🇪 Germany</option>
                    <option value="FR">🇫🇷 France</option>
                    <option value="JP">🇯🇵 Japan</option>
                    <option value="AU">🇦🇺 Australia</option>
                    <option value="CN">🇨🇳 China</option>
                    <option value="IN">🇮🇳 India</option>
                    <option value="BR">🇧🇷 Brazil</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Region/State</label>
                  <select
                    value={settings.region}
                    onChange={(e) => updateSetting('region', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border-2 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none"
                  >
                    {(regionsByCountry[settings.country] || [{ value: 'default', text: 'Default Region' }]).map(region => (
                      <option key={region.value} value={region.value}>{region.text}</option>
                    ))}
                  </select>
                </div>
                
                <div className="bg-blue-900 bg-opacity-50 border border-blue-400 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-400 text-sm">💡</span>
                    <p className="text-blue-200 text-sm">
                      Your location helps us provide more accurate tariff impacts and local economic data.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Currency Settings */}
            <section className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💱</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Currency Preferences</h2>
                  <p className="text-gray-400 text-sm">Choose how prices are displayed</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-white">Primary Currency</h3>
                    <p className="text-sm text-gray-400">Main currency for price displays</p>
                  </div>
                  <select
                    value={settings.primaryCurrency}
                    onChange={(e) => updateSetting('primaryCurrency', e.target.value)}
                    className="px-3 py-2 rounded-lg bg-gray-600 border-2 border-gray-500 text-gray-100 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="CAD">CAD (C$)</option>
                    <option value="AUD">AUD (A$)</option>
                    <option value="CNY">CNY (¥)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-white">Show Local Currency</h3>
                    <p className="text-sm text-gray-400">Display prices in both USD and local currency</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.showLocalCurrency}
                    onChange={(checked) => updateSetting('showLocalCurrency', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-white">Auto-Update Exchange Rates</h3>
                    <p className="text-sm text-gray-400">Automatically fetch latest exchange rates</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.autoUpdateRates}
                    onChange={(checked) => updateSetting('autoUpdateRates', checked)}
                  />
                </div>
              </div>
            </section>

            {/* Notification Preferences */}
            <section className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔔</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Notification Preferences</h2>
                  <p className="text-gray-400 text-sm">Manage your alert settings</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  { key: 'policyUpdates', title: 'Policy Updates', desc: 'New tariff announcements and policy changes' },
                  { key: 'priceAlerts', title: 'Price Alerts', desc: 'Significant price changes in tracked products' },
                  { key: 'weeklyReports', title: 'Weekly Reports', desc: 'Summary of economic trends and insights' },
                  { key: 'simulationReminders', title: 'Simulation Reminders', desc: 'Reminders to update your saved simulations' }
                ].map(({ key, title, desc }) => (
                  <div key={key} className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:bg-gray-650 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-white">{title}</h3>
                        <p className="text-sm text-gray-400">{desc}</p>
                      </div>
                      <ToggleSwitch
                        checked={settings[key]}
                        onChange={(checked) => updateSetting(key, checked)}
                      />
                    </div>
                  </div>
                ))}
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white">Email Frequency</h3>
                    <select
                      value={settings.emailFrequency}
                      onChange={(e) => updateSetting('emailFrequency', e.target.value)}
                      className="px-3 py-2 rounded-lg bg-gray-600 border-2 border-gray-500 text-gray-100 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="immediate">Immediate</option>
                      <option value="daily">Daily Digest</option>
                      <option value="weekly">Weekly Summary</option>
                      <option value="monthly">Monthly Only</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                  <input
                    type="email"
                    value={settings.notificationEmail}
                    onChange={(e) => updateSetting('notificationEmail', e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2 rounded-lg bg-gray-600 border-2 border-gray-500 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Saved Simulations */}
            <section className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📊</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Saved Simulations</h2>
                    <p className="text-gray-400 text-xs">Manage your scenarios</p>
                  </div>
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">View All</button>
              </div>
              
              <div className="space-y-3">
                {simulations.map(sim => (
                  <div key={sim.id} className="bg-gray-700 border border-gray-600 rounded-lg p-3 hover:bg-gray-650 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-white text-sm">{sim.name}</h3>
                        <p className="text-xs text-gray-400">Created {sim.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-xs">Edit</button>
                        <button
                          onClick={() => handleDeleteSimulation(sim.name)}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-4 rounded-lg transition-colors text-sm">
                + Create New Simulation
              </button>
            </section>

            {/* Data & Privacy */}
            <section className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🔒</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Data & Privacy</h2>
                  <p className="text-gray-400 text-xs">Control your data</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white text-sm">Data Collection</h3>
                    <p className="text-xs text-gray-400">Allow usage analytics</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.dataCollection}
                    onChange={(checked) => updateSetting('dataCollection', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white text-sm">Personalization</h3>
                    <p className="text-xs text-gray-400">Personalized recommendations</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.personalization}
                    onChange={(checked) => updateSetting('personalization', checked)}
                  />
                </div>
                
                <button
                  onClick={handleExportData}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  📥 Export My Data
                </button>
                
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                      alert('All data has been cleared.');
                    }
                  }}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  🗑️ Clear All Data
                </button>
              </div>
            </section>

            {/* Danger Zone */}
            <section className="bg-red-950 border border-red-600 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">⚠️</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Danger Zone</h2>
                  <p className="text-red-200 text-xs">Irreversible actions</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleResetSettings}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                >
                  Reset All Settings
                </button>
                
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete your account? This will permanently remove all your data and cannot be undone.')) {
                      alert('Account deletion would be processed here. This is a demo.');
                    }
                  }}
                  className="w-full bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                >
                  Delete Account
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <p>© 2024 AI Tariff Impact Simulator. All rights reserved.</p>
            </div>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}