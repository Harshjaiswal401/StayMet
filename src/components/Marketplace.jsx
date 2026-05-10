import React, { useState } from 'react';
import { ShoppingBag, Repeat, Plus, Search, Filter, Tag, Clock, ChevronRight, Package, Truck, Smartphone, Bike, Coffee, Star } from 'lucide-react';

const Marketplace = () => {
  const [activeMode, setActiveMode] = useState('all'); // all, buy, rent
  const [searchQuery, setSearchQuery] = useState('');

  const items = [
    {
      id: 1,
      title: "Ergonomic Study Chair",
      price: 1200,
      type: "buy",
      category: "Furniture",
      condition: "Like New",
      image: "https://images.unsplash.com/photo-1505797149-43b007664a3d?auto=format&fit=crop&w=500&q=80",
      seller: "Rahul V.",
      rating: 4.8
    },
    {
      id: 2,
      title: "Mini Fridge 80L",
      price: 350,
      type: "rent",
      period: "month",
      category: "Electronics",
      condition: "Excellent",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=80",
      seller: "Ananya S.",
      rating: 4.9
    },
    {
      id: 3,
      title: "Mountain Bike (21 Speed)",
      price: 100,
      type: "rent",
      period: "day",
      category: "Vehicles",
      condition: "Good",
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=500&q=80",
      seller: "Vikram K.",
      rating: 4.5
    },
    {
      id: 4,
      title: "Induction Cooktop",
      price: 800,
      type: "buy",
      category: "Electronics",
      condition: "Brand New",
      image: "https://images.unsplash.com/photo-1585659722982-7897d97dad3c?auto=format&fit=crop&w=500&q=80",
      seller: "Sneha P.",
      rating: 4.7
    }
  ];

  const filteredItems = items.filter(item => {
    const matchesMode = activeMode === 'all' || item.type === activeMode;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMode && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header Section */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 p-8 md:p-12 mb-10 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-none">
            Student <span className="text-primary-200">Marketplace</span>
          </h1>
          <p className="text-primary-100 text-lg font-medium mb-8">
            Buy, sell, or rent essentials from fellow students. Save money and reduce waste in your hostel community.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-primary-700 px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-black/10 active:scale-95">
              <Plus size={18} /> Post an Item
            </button>
            <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-white/30 transition-all active:scale-95">
              My Listings <ChevronRight size={18} />
            </button>
          </div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform scale-150 translate-x-1/4">
            <path fill="#FFFFFF" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-46.5C87.4,-33.9,90.1,-18.9,88.7,-4.3C87.3,10.3,81.8,24.5,74.1,37.1C66.4,49.7,56.5,60.7,44.3,68.9C32.1,77.1,17.6,82.5,2.6,78C-12.4,73.5,-27.8,59.1,-41.8,49.1C-55.8,39.1,-68.3,33.5,-76.6,23.5C-84.9,13.5,-89,0.9,-87.3,-12.3C-85.6,-25.5,-78.1,-39.3,-67.6,-50.2C-57.1,-61.1,-43.6,-69.1,-30.2,-76.7C-16.8,-84.3,-3.4,-91.5,10.7,-92.1C24.8,-92.7,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between">
        <div className="flex p-1.5 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 w-fit self-start">
          {[
            { id: 'all', label: 'Everything', icon: <Package size={16} /> },
            { id: 'buy', label: 'To Buy', icon: <Tag size={16} /> },
            { id: 'rent', label: 'To Rent', icon: <Repeat size={16} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveMode(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black transition-all ${
                activeMode === tab.id 
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 dark:shadow-none' 
                  : 'text-gray-500 hover:text-primary-600'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary-500 transition-all outline-none"
            />
          </div>
          <button className="p-3.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl text-gray-500 hover:text-primary-600 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredItems.map(item => (
          <div key={item.id} className="group bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-500 flex flex-col h-full relative animate-fade-in">
            {/* Image Section */}
            <div className="relative h-60 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md ${
                  item.type === 'buy' ? 'bg-green-500/90 text-white' : 'bg-blue-500/90 text-white'
                }`}>
                  {item.type === 'buy' ? 'For Sale' : 'For Rent'}
                </span>
                <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl text-[10px] font-black text-gray-800 dark:text-white shadow-sm flex items-center gap-1 border border-white/20">
                  <Star size={10} className="text-yellow-500 fill-yellow-500" /> {item.rating}
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-black text-gray-900 dark:text-white leading-tight group-hover:text-primary-600 transition-colors">{item.title}</h3>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-[10px] font-bold text-gray-500 uppercase">{item.category}</div>
                <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-[10px] font-bold text-gray-500 uppercase">{item.condition}</div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-800">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-black text-primary-600 tracking-tighter">
                      ₹{item.price.toLocaleString()}
                      {item.type === 'rent' && <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">/{item.period}</span>}
                    </div>
                  </div>
                  <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary-600 dark:hover:bg-primary-500 dark:hover:text-white transition-all active:scale-95 shadow-lg shadow-black/5">
                    {item.type === 'buy' ? 'Buy Now' : 'Rent Now'}
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-[10px] font-black text-primary-600">
                    {item.seller.charAt(0)}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.seller}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-gray-900 rounded-[2.5rem] border-2 border-dashed border-gray-100 dark:border-gray-800 animate-fade-in mt-10">
          <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <Search size={40} className="text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Nothing found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm font-medium">Try searching for something else or change the filter to see more items.</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
