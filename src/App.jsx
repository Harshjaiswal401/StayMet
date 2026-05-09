import React, { useState } from 'react';
import FilterSidebar from './components/FilterSidebar';
import PropertyGrid from './components/PropertyGrid';
import ExpenseDashboard from './components/ExpenseDashboard';
import propertiesData from './data/dummyProperties.json';

function App() {
  const [activeTab, setActiveTab] = useState('Discovery');
  const [filters, setFilters] = useState({
    categories: [],
    roomType: '',
    budget: 20000,
    accessories: { ac: false, nonAc: false },
    washroom: '',
    meals: [],
    locality: '',
    lateNight: false,
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      roomType: '',
      budget: 20000,
      accessories: { ac: false, nonAc: false },
      washroom: '',
      meals: [],
      locality: '',
      lateNight: false,
    });
  };

  // Filter Logic
  const filteredProperties = propertiesData.filter((property) => {
    // 1. Category
    if (filters.categories.length > 0) {
      if (!filters.categories.includes(property.category)) return false;
    }
    // 2. Room Type
    if (filters.roomType && property.roomType !== filters.roomType) return false;
    
    // 3. Budget (Assuming property.price <= filters.budget)
    if (property.price > filters.budget) return false;

    // 4. Accessories
    if (filters.accessories.ac && !property.accessories.ac) return false;
    if (filters.accessories.nonAc && property.accessories.ac) return false; // if looking for non-ac, property must not be ac

    // 5. Washroom
    if (filters.washroom && property.washroom !== filters.washroom) return false;

    // 6. Meals
    if (filters.meals.length > 0 && !filters.meals.includes(property.meals)) return false;

    // 7. Locality
    if (filters.locality && !property.locality.toLowerCase().includes(filters.locality.toLowerCase())) return false;

    // 8. Late Night Allowance
    if (filters.lateNight && !property.lateNightAllowance) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary-600 font-bold text-xl tracking-tight cursor-pointer" onClick={() => setActiveTab('Discovery')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            StayMate
          </div>
          <div className="flex gap-4 text-sm font-medium text-gray-600">
            <button 
              onClick={() => setActiveTab('Discovery')}
              className={`transition-colors ${activeTab === 'Discovery' ? 'text-primary-600 border-b-2 border-primary-600 pb-1' : 'hover:text-primary-600'}`}>
              Discovery
            </button>
            <button 
              onClick={() => setActiveTab('AI Match')}
              className={`transition-colors ${activeTab === 'AI Match' ? 'text-primary-600 border-b-2 border-primary-600 pb-1' : 'hover:text-primary-600'}`}>
              AI Match
            </button>
            <button 
              onClick={() => setActiveTab('Finance')}
              className={`transition-colors ${activeTab === 'Finance' ? 'text-primary-600 border-b-2 border-primary-600 pb-1' : 'hover:text-primary-600'}`}>
              Finance
            </button>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      {activeTab === 'Finance' ? (
        <ExpenseDashboard />
      ) : activeTab === 'Discovery' ? (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-72 flex-shrink-0">
            <FilterSidebar 
              filters={filters} 
              onChange={handleFilterChange} 
              onClear={handleClearFilters} 
            />
          </aside>

          {/* Content */}
          <main className="flex-1">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Find Your Perfect Stay</h1>
                <p className="text-gray-500 text-sm mt-1">Showing {filteredProperties.length} properties</p>
              </div>
            </div>
            
            <PropertyGrid properties={filteredProperties} />
          </main>
        </div>
      ) : (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Match</h1>
          <p className="text-gray-500 max-w-lg">Our AI Matchmaking feature is coming soon! You'll be able to find the perfect roommate based on your lifestyle preferences.</p>
        </div>
      )}
    </div>
  );
}

export default App;
