import React, { useState, useEffect } from 'react';
import { Moon, Sun, LogOut, User } from 'lucide-react';
import FilterSidebar from './components/FilterSidebar';
import PropertyGrid from './components/PropertyGrid';
import ExpenseDashboard from './components/ExpenseDashboard';
import RoommateForm from './components/RoommateForm';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import BookingPage from './components/BookingPage';
import AIChatbot from './components/AIChatbot';
import PropertyComparator from './components/PropertyComparator';
import AuthModal from './components/AuthModal';
import { useAuth } from './context/AuthContext';
import propertiesData from './data/dummyProperties.json';

function App() {
  const { user, profile, favorites, toggleFavorite, signOut, firebaseError } = useAuth();

  const [activeTab, setActiveTab]           = useState('Discovery');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isBooking, setIsBooking]           = useState(false);
  const [bookingProperty, setBookingProperty] = useState(null);
  const [compareList, setCompareList]       = useState([]);
  const [isComparing, setIsComparing]       = useState(false);
  const [showAuthModal, setShowAuthModal]   = useState(false);
  const [showUserMenu, setShowUserMenu]     = useState(false);

  // Dark mode
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Filters
  const [filters, setFilters] = useState({
    propertyType: 'All',
    bhk: [],
    sharing: [],
    roomType: '',
    budget: 20000,
    accessories: { ac: false, nonAc: false },
    washroom: '',
    meals: [],
    locality: '',
    lateNight: false,
  });

  const handleClearFilters = () => setFilters({
    propertyType: 'All', bhk: [], sharing: [], roomType: '',
    budget: 20000, accessories: { ac: false, nonAc: false },
    washroom: '', meals: [], locality: '', lateNight: false,
  });

  // ── Filter Logic ─────────────────────────────────────────────
  const filteredProperties = propertiesData.filter((property) => {
    if (filters.propertyType !== 'All') {
      const isHostel = property.category.toLowerCase().includes('hostel');
      const isPG     = property.category.toLowerCase().includes('pg');
      if (filters.propertyType === 'Hostel' && !isHostel) return false;
      if (filters.propertyType === 'PG'     && !isPG)     return false;
    }
    if (filters.propertyType === 'PG' && filters.bhk.length > 0) {
      const matchesBhk = filters.bhk.some(b =>
        (property.title + ' ' + property.category).toLowerCase().includes(b.toLowerCase())
      );
      if (!matchesBhk) return false;
    }
    if (filters.sharing.length > 0) {
      const roomTypeLower = property.roomType.toLowerCase();
      let caps = [];
      if (roomTypeLower.includes('single') || roomTypeLower.includes('non sharing')) caps.push('1');
      if (roomTypeLower.includes('double') || roomTypeLower.includes('sharing')) { caps.push('2'); caps.push('3'); }
      if (!filters.sharing.some(s => caps.includes(s))) return false;
    }
    if (property.price > filters.budget) return false;
    if (filters.accessories.ac    && !property.accessories.ac)  return false;
    if (filters.accessories.nonAc &&  property.accessories.ac)  return false;
    if (filters.washroom && property.washroom !== filters.washroom) return false;
    if (filters.meals.length > 0) {
      const matchMeal = filters.meals.some(m =>
        property.meals.toLowerCase().includes(m.toLowerCase().replace(' times', ''))
      );
      if (!matchMeal) return false;
    }
    if (filters.locality && !property.locality.toLowerCase().includes(filters.locality.toLowerCase())) return false;
    if (filters.lateNight && !property.lateNightAllowance) return false;
    return true;
  });

  // ── Favorite toggle — requires login ────────────────────────
  const handleToggleFavorite = (propId) => {
    if (!user) { setShowAuthModal(true); return; }
    toggleFavorite(propId);
  };

  // ── Compare ──────────────────────────────────────────────────
  const toggleCompare = (property) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === property.id);
      if (exists) return prev.filter(p => p.id !== property.id);
      if (prev.length >= 3) return prev;
      return [...prev, property];
    });
  };

  // ── User avatar initials ─────────────────────────────────────
  const initials = user
    ? (user.displayName || user.email || 'U').charAt(0).toUpperCase()
    : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-500 font-sans flex flex-col">
      {/* ── Navbar ────────────────────────────────────────────── */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo + Dark Toggle */}
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2 text-primary-600 font-bold text-xl tracking-tight cursor-pointer"
              onClick={() => setActiveTab('Discovery')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              StayMate
            </div>
            <button
              onClick={() => setDarkMode(d => !d)}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-all active:scale-90"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Nav Tabs */}
          <div className="hidden sm:flex gap-5 text-sm font-medium text-gray-600 dark:text-gray-400">
            {['Discovery', 'AI Match', 'Saved', 'Finance'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`transition-colors relative pb-1 ${
                  activeTab === tab
                    ? 'text-primary-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 after:rounded-full'
                    : 'hover:text-primary-600'
                }`}
              >
                {tab}
                {tab === 'Saved' && favorites.length > 0 && (
                  <span className="ml-1.5 bg-primary-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Auth Section */}
          <div className="relative">
            {user ? (
              <>
                <button
                  onClick={() => setShowUserMenu(m => !m)}
                  className="flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-2 rounded-2xl font-bold text-sm transition-all hover:bg-primary-100 dark:hover:bg-primary-900/50"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-black">
                      {initials}
                    </div>
                  )}
                  <span className="hidden sm:block max-w-[100px] truncate">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 top-12 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl p-2 min-w-[180px] animate-fade-in z-50">
                    <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 mb-1">
                      <p className="text-xs font-black text-gray-900 dark:text-white truncate">
                        {user.displayName || 'My Account'}
                      </p>
                      <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { setActiveTab('Saved'); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
                    >
                      <User size={14} /> Saved Properties ({favorites.length})
                    </button>
                    <button
                      onClick={() => { signOut(); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-primary-600 text-white font-black text-sm px-5 py-2.5 rounded-2xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 dark:shadow-none active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {firebaseError && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="rounded-2xl border border-red-200 bg-red-50 dark:border-red-700 dark:bg-red-950/80 p-4 text-sm text-red-900 dark:text-red-100">
            <strong className="font-bold">Firebase configuration missing:</strong>
            <p className="mt-1">
              {firebaseError} The app will still render, but authentication and Firestore features require valid Firebase keys.
            </p>
          </div>
        </div>
      )}

      {/* ── Main Content ──────────────────────────────────────── */}
      {isBooking ? (
        <BookingPage
          property={bookingProperty}
          onBack={() => setIsBooking(false)}
          user={user}
        />
      ) : activeTab === 'Finance' ? (
        <ExpenseDashboard />
      ) : activeTab === 'AI Match' ? (
        <div className="flex-1 w-full py-8">
          <RoommateForm />
        </div>
      ) : (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
          {activeTab === 'Discovery' && (
            <aside className="w-full md:w-72 flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onClear={handleClearFilters}
              />
            </aside>
          )}

          <main className="flex-1">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activeTab === 'Saved' ? 'Your Saved Stays' : 'Find Your Perfect Stay'}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  {activeTab === 'Saved'
                    ? `You have ${favorites.length} properties saved`
                    : `Showing ${filteredProperties.length} properties`}
                </p>
              </div>
              {compareList.length > 1 && (
                <button
                  onClick={() => setIsComparing(true)}
                  className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-primary-200 dark:shadow-none animate-bounce"
                >
                  Compare AI ({compareList.length})
                </button>
              )}
            </div>

            {/* Saved tab: show login prompt if not signed in */}
            {activeTab === 'Saved' && !user ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                <div className="w-20 h-20 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-6">
                  <User size={36} className="text-primary-400" />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Sign in to see Saved Stays</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-xs">
                  Create an account to save your favourite hostels and access them anytime.
                </p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-primary-600 text-white font-black px-8 py-4 rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-100 dark:shadow-none"
                >
                  Sign In / Register
                </button>
              </div>
            ) : (
              <PropertyGrid
                properties={
                  activeTab === 'Saved'
                    ? propertiesData.filter(p => favorites.includes(p.id))
                    : filteredProperties
                }
                onViewDetails={(prop) => setSelectedProperty(prop)}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                compareList={compareList.map(p => p.id)}
                onToggleCompare={toggleCompare}
              />
            )}
          </main>
        </div>
      )}

      {/* ── Modals ────────────────────────────────────────────── */}
      <PropertyDetailsModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onBook={(prop) => {
          if (!user) { setShowAuthModal(true); return; }
          setBookingProperty(prop);
          setIsBooking(true);
          setSelectedProperty(null);
        }}
      />

      <PropertyComparator
        isOpen={isComparing}
        onClose={() => setIsComparing(false)}
        properties={compareList}
      />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      {/* Close user menu on outside click */}
      {showUserMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
      )}

      <AIChatbot />
    </div>
  );
}

export default App;
