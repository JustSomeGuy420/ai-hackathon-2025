import { useState } from 'react';
import { Check } from 'lucide-react';

export default function InterestSelector() {
  const interests = [
    { name: 'Consumer Electronics & Tech Hardware', color: 'blue' },
    { name: 'Furniture, Appliances & Home Goods', color: 'purple' },
    { name: 'Automotive & Transportation Parts', color: 'yellow' },
    { name: 'Apparel & Footwear (Clothing & Shoes)', color: 'pink' },
    { name: 'Certain Food Products & Beverages', color: 'green' }
  ];

  const colorStyles = {
    blue: { border: 'border-blue-500', bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-500', shadow: 'shadow-blue-500/20' },
    orange: { border: 'border-orange-500', bg: 'bg-orange-500/10', text: 'text-orange-400', dot: 'bg-orange-500', shadow: 'shadow-orange-500/20' },
    purple: { border: 'border-purple-500', bg: 'bg-purple-500/10', text: 'text-purple-400', dot: 'bg-purple-500', shadow: 'shadow-purple-500/20' },
    red: { border: 'border-red-500', bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-500', shadow: 'shadow-red-500/20' },
    pink: { border: 'border-pink-500', bg: 'bg-pink-500/10', text: 'text-pink-400', dot: 'bg-pink-500', shadow: 'shadow-pink-500/20' },
    green: { border: 'border-green-500', bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-500', shadow: 'shadow-green-500/20' },
    yellow: { border: 'border-yellow-500', bg: 'bg-yellow-500/10', text: 'text-yellow-400', dot: 'bg-yellow-500', shadow: 'shadow-yellow-500/20' },
    cyan: { border: 'border-cyan-500', bg: 'bg-cyan-500/10', text: 'text-cyan-400', dot: 'bg-cyan-500', shadow: 'shadow-cyan-500/20' }
  };

  const [selected, setSelected] = useState([]);
  const [saved, setSaved] = useState(false);

  const toggleInterest = (interestObj) => {
    const interestName = interestObj.name;
    setSelected(prev => 
      prev.find(i => i.name === interestName)
        ? prev.filter(i => i.name !== interestName)
        : [...prev, interestObj]
    );
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    console.log('Saved interests:', selected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          <h1 className="text-3xl font-bold text-white mb-2">
            Select Your Interests
          </h1>
          <p className="text-slate-400 mb-8">
            Choose one or more categories that interest you
          </p>

          <div className="space-y-3 mb-8">
            {interests.map((interest) => {
              const isSelected = selected.find(i => i.name === interest.name);
              const colors = colorStyles[interest.color];
              
              return (
                <button
                  key={interest.name}
                  onClick={() => toggleInterest(interest)}
                  className={`w-full p-4 rounded-lg border transition-all text-left flex items-center justify-between ${
                    isSelected
                      ? `${colors.border} ${colors.bg} shadow-lg ${colors.shadow}`
                      : 'border-slate-600 bg-slate-700/30 hover:border-slate-500 hover:bg-slate-700/50'
                  }`}
                >
                  <span className={`font-medium ${
                    isSelected ? colors.text : 'text-slate-300'
                  }`}>
                    {interest.name}
                  </span>
                  {isSelected && (
                    <Check className={`w-5 h-5 ${colors.text}`} />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">
              {selected.length} {selected.length === 1 ? 'interest' : 'interests'} selected
            </div>
            <button
              onClick={handleSave}
              disabled={selected.length === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selected.length === 0
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40'
              }`}
            >
              Save Interests
            </button>
          </div>

          {saved && (
            <div className="mt-6 p-4 bg-green-900/30 border border-green-600 rounded-lg">
              <p className="text-green-400 font-medium">
                ✓ Your interests have been saved successfully!
              </p>
            </div>
          )}

          {selected.length > 0 && (
            <div className="mt-8 p-6 bg-slate-700/30 rounded-lg border border-slate-600">
              <h3 className="font-semibold text-white mb-3">Selected Interests:</h3>
              <ul className="space-y-2">
                {selected.map((interest) => {
                  const colors = colorStyles[interest.color];
                  return (
                    <li key={interest.name} className="text-slate-300 flex items-center">
                      <span className={`w-2 h-2 ${colors.dot} rounded-full mr-3`}></span>
                      {interest.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}