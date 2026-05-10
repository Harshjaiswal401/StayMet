import React, { useState } from 'react';
import { Filter, X, Search, Moon } from 'lucide-react';

const FilterSidebar = ({ filters, onChange, onClear }) => {
  const [isOpen, setIsOpen] = useState(false); // For mobile responsiveness

  const handleBhkToggle = (bhkVal) => {
    const newBhk = filters.bhk.includes(bhkVal)
      ? filters.bhk.filter((b) => b !== bhkVal)
      : [...filters.bhk, bhkVal];
    onChange({ ...filters, bhk: newBhk });
  };

  const handleSharingToggle = (shareVal) => {
    const newSharing = filters.sharing.includes(shareVal)
      ? filters.sharing.filter((s) => s !== shareVal)
      : [...filters.sharing, shareVal];
    onChange({ ...filters, sharing: newSharing });
  };

  const handleMealsToggle = (meal) => {
    const newMeals = filters.meals.includes(meal)
      ? filters.meals.filter((m) => m !== meal)
      : [...filters.meals, meal];
    onChange({ ...filters, meals: newMeals });
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden w-full mb-4 flex items-center justify-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 py-2 rounded-lg shadow-sm font-medium transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Filter size={18} />
        {isOpen ? 'Hide Filters' : 'Show Filters'}
      </button>

      <div className={`bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex-col gap-6 transition-colors ${isOpen ? 'flex' : 'hidden md:flex'}`}>
        
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Filter size={20} className="text-primary-600" />
            Filters
          </h2>
          <button 
            onClick={onClear}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 font-medium transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Locality Search */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Locality</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search locality..."
              className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-gray-800 transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              value={filters.locality}
              onChange={(e) => onChange({ ...filters, locality: e.target.value })}
            />
          </div>
        </div>

        {/* Property Type (Hostel / PG) */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Property Type</label>
          <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors">
            {['All', 'Hostel', 'PG'].map((type) => (
              <button
                key={type}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${filters.propertyType === type ? 'bg-white dark:bg-gray-700 text-primary-700 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                onClick={() => onChange({ ...filters, propertyType: type, bhk: type !== 'PG' ? [] : filters.bhk })}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* BHK Options (Only visible if PG is selected) */}
        {filters.propertyType === 'PG' && (
          <div className="space-y-3 animate-fade-in">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">BHK Configuration</label>
            <div className="flex flex-wrap gap-2">
              {['1 BHK', '2 BHK', '3 BHK'].map((bhkVal) => (
                <label key={bhkVal} className={`flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg border transition-all ${filters.bhk.includes(bhkVal) ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary-300'}`}>
                  <input 
                    type="checkbox" 
                    className="w-3.5 h-3.5 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                    checked={filters.bhk.includes(bhkVal)}
                    onChange={() => handleBhkToggle(bhkVal)}
                  />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{bhkVal}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Sharing Capacity */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sharing Capacity</label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: '1', label: 'Single' },
              { id: '2', label: '2 Sharing' },
              { id: '3', label: '3 Sharing' }
            ].map((share) => (
              <label key={share.id} className={`flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg border transition-all ${filters.sharing.includes(share.id) ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary-300'}`}>
                <input 
                  type="checkbox" 
                  className="w-3.5 h-3.5 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                  checked={filters.sharing.includes(share.id)}
                  onChange={() => handleSharingToggle(share.id)}
                />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{share.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Max Budget</label>
            <span className="text-xs font-bold text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded-md">₹{filters.budget}</span>
          </div>
          <input 
            type="range" 
            min="2000" 
            max="30000" 
            step="500"
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
            value={filters.budget}
            onChange={(e) => onChange({ ...filters, budget: Number(e.target.value) })}
          />
          <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 font-medium">
            <span>₹2k</span>
            <span>₹30k</span>
          </div>
        </div>

        {/* Accessories */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Accessories</label>
          <div className="flex gap-3">
            <button 
              className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all ${filters.accessories.ac ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-400' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              onClick={() => onChange({ ...filters, accessories: { ...filters.accessories, ac: !filters.accessories.ac } })}
            >
              AC
            </button>
            <button 
              className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all ${filters.accessories.nonAc ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-400' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              onClick={() => onChange({ ...filters, accessories: { ...filters.accessories, nonAc: !filters.accessories.nonAc } })}
            >
              Non-AC
            </button>
          </div>
        </div>

        {/* Washroom */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Washroom</label>
          <div className="flex gap-4">
            {['Attached', 'Common'].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="washroom"
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 cursor-pointer transition-colors"
                  checked={filters.washroom === type}
                  onChange={() => onChange({ ...filters, washroom: type })}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Meals Timings */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Meals</label>
          <div className="space-y-2">
            {['3 times', '4 times', '5 times'].map((meal) => (
              <label key={meal} className="flex items-center gap-3 group cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500 transition-colors cursor-pointer"
                  checked={filters.meals.includes(meal)}
                  onChange={() => handleMealsToggle(meal)}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{meal} a day</span>
              </label>
            ))}
          </div>
        </div>

        {/* Late Night Allowance */}
        <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
          <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors group-hover:text-primary-600">
              <Moon size={16} className="text-indigo-500" />
              Late Night Allowance
            </span>
            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${filters.lateNight ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'}`}>
              <input 
                type="checkbox" 
                className="sr-only"
                checked={filters.lateNight}
                onChange={() => onChange({ ...filters, lateNight: !filters.lateNight })}
              />
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${filters.lateNight ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
          </label>
        </div>

      </div>
    </>
  );
};

export default FilterSidebar;
