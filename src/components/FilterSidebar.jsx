import React, { useState } from 'react';
import { Filter, X, Search, Moon } from 'lucide-react';

const FilterSidebar = ({ filters, onChange, onClear }) => {
  const [isOpen, setIsOpen] = useState(false); // For mobile responsiveness

  const handleCategoryToggle = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onChange({ ...filters, categories: newCategories });
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
        className="md:hidden w-full mb-4 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-2 rounded-lg shadow-sm font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Filter size={18} />
        {isOpen ? 'Hide Filters' : 'Show Filters'}
      </button>

      <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-col gap-6 ${isOpen ? 'flex' : 'hidden md:flex'}`}>
        
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Filter size={20} className="text-primary-600" />
            Filters
          </h2>
          <button 
            onClick={onClear}
            className="text-sm text-gray-500 hover:text-primary-600 font-medium transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Locality Search */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">Locality</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search locality..."
              className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
              value={filters.locality}
              onChange={(e) => onChange({ ...filters, locality: e.target.value })}
            />
          </div>
        </div>

        {/* Property Category */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">Property Category</label>
          <div className="space-y-2">
            {['PG - 1 BHK', 'PG - 2 BHK', 'Sharing - 2 capacity', 'Sharing - 3 capacity', 'Sharing - 4 capacity', 'Hostel'].map((cat) => (
              <label key={cat} className="flex items-center gap-3 group cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors cursor-pointer"
                  checked={filters.categories.includes(cat)}
                  onChange={() => handleCategoryToggle(cat)}
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Room Type */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">Room Type</label>
          <div className="flex gap-4">
            {['Sharing', 'Non-Sharing'].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="roomType"
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 cursor-pointer"
                  checked={filters.roomType === type}
                  onChange={() => onChange({ ...filters, roomType: type })}
                />
                <span className="text-sm text-gray-600">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-gray-700">Max Budget</label>
            <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-md">₹{filters.budget}</span>
          </div>
          <input 
            type="range" 
            min="2000" 
            max="30000" 
            step="500"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            value={filters.budget}
            onChange={(e) => onChange({ ...filters, budget: Number(e.target.value) })}
          />
          <div className="flex justify-between text-xs text-gray-400 font-medium">
            <span>₹2k</span>
            <span>₹30k</span>
          </div>
        </div>

        {/* Accessories */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">Accessories</label>
          <div className="flex gap-3">
            <button 
              className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all ${filters.accessories.ac ? 'bg-primary-50 border-primary-200 text-primary-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              onClick={() => onChange({ ...filters, accessories: { ...filters.accessories, ac: !filters.accessories.ac } })}
            >
              AC
            </button>
            <button 
              className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all ${filters.accessories.nonAc ? 'bg-primary-50 border-primary-200 text-primary-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              onClick={() => onChange({ ...filters, accessories: { ...filters.accessories, nonAc: !filters.accessories.nonAc } })}
            >
              Non-AC
            </button>
          </div>
        </div>

        {/* Washroom */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">Washroom</label>
          <div className="flex gap-4">
            {['Attached', 'Common'].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="washroom"
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 cursor-pointer"
                  checked={filters.washroom === type}
                  onChange={() => onChange({ ...filters, washroom: type })}
                />
                <span className="text-sm text-gray-600">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Meals Timings */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">Meals</label>
          <div className="space-y-2">
            {['3 times', '4 times', '5 times'].map((meal) => (
              <label key={meal} className="flex items-center gap-3 group cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors cursor-pointer"
                  checked={filters.meals.includes(meal)}
                  onChange={() => handleMealsToggle(meal)}
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{meal} a day</span>
              </label>
            ))}
          </div>
        </div>

        {/* Late Night Allowance */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Moon size={16} className="text-indigo-500" />
              Late Night Allowance
            </span>
            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${filters.lateNight ? 'bg-primary-500' : 'bg-gray-200'}`}>
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
