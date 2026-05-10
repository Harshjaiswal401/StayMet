import React, { useState } from 'react';
import { Droplet, Phone, MessageSquare, Clock, MapPin, CheckCircle2, AlertCircle, ShoppingCart, Info, PhoneCall } from 'lucide-react';

const WaterService = () => {
  const [selectedSize, setSelectedSize] = useState('20L');
  
  const suppliers = [
    {
      id: 1,
      name: "Bhopal Blue Water",
      locality: "MP Nagar Zone 1",
      price20L: 25,
      deliveryTime: "30-45 mins",
      rating: 4.9,
      contact: "9876543210",
      verified: true,
      status: "Online"
    },
    {
      id: 2,
      name: "PureDrop Suppliers",
      locality: "Indrapuri",
      price20L: 20,
      deliveryTime: "1 hour",
      rating: 4.7,
      contact: "9123456789",
      verified: true,
      status: "Busy"
    },
    {
      id: 3,
      name: "Aqua Fresh Agency",
      locality: "Ayodhya Bypass",
      price20L: 25,
      deliveryTime: "2 hours",
      rating: 4.5,
      contact: "8888877777",
      verified: false,
      status: "Online"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 p-10 md:p-14 text-white shadow-2xl shadow-blue-200 dark:shadow-none">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-none">
              Stay Hydrated, <br/><span className="text-blue-200">Stay Healthy.</span>
            </h1>
            <p className="text-blue-100 text-lg font-medium mb-8 max-w-lg">
              Get clean 20L water cans delivered to your hostel doorstep within minutes. Verified local suppliers at the best rates.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:scale-105 transition-all shadow-xl active:scale-95">
                <ShoppingCart size={20} /> Order Quick Can
              </button>
            </div>
          </div>
          
          {/* Water Background Pattern */}
          <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none">
            <Droplet size={300} strokeWidth={1} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-center text-center">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Droplet className="text-blue-600" size={32} />
          </div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Standard 20L Can</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-6">Verified purified water with security seal.</p>
          <div className="text-3xl font-black text-blue-600 mb-6">₹20 - ₹25 <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">/can</span></div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 flex items-center gap-3 text-left">
            <Info className="text-blue-500 flex-shrink-0" size={20} />
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
              Delivery charges may apply based on your floor and distance from supplier.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Local Water Suppliers</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Verified suppliers near your locality</p>
        </div>
        <div className="hidden sm:flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
           {['20L', '15L', '10L'].map(size => (
             <button 
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                selectedSize === size ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
             >
               {size}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {suppliers.map(supplier => (
          <div key={supplier.id} className="group bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-500 animate-fade-in relative overflow-hidden">
            {/* Status indicator */}
            <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-3xl text-[9px] font-black uppercase tracking-widest ${
              supplier.status === 'Online' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
            }`}>
              {supplier.status}
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 font-black text-xl">
                {supplier.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors tracking-tight">{supplier.name}</h3>
                <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                  <MapPin size={10} className="text-blue-500" /> {supplier.locality}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100/50 dark:border-gray-700/50">
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Delivery Time</div>
                <div className="flex items-center gap-2 text-sm font-black text-gray-900 dark:text-white">
                  <Clock size={14} className="text-blue-500" /> {supplier.deliveryTime}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100/50 dark:border-gray-700/50">
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Price ({selectedSize})</div>
                <div className="flex items-center gap-2 text-sm font-black text-blue-600">
                  ₹{supplier.price20L}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 text-white font-black py-4 rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 dark:shadow-none active:scale-95">
                <PhoneCall size={16} /> Call Now
              </button>
              <button className="p-4 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-gray-100 dark:border-gray-800 active:scale-95">
                <MessageSquare size={20} />
              </button>
            </div>

            {supplier.verified && (
              <div className="mt-4 flex items-center justify-center gap-2">
                 <CheckCircle2 size={12} className="text-blue-500" />
                 <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">FSSAI Certified Supplier</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaterService;
