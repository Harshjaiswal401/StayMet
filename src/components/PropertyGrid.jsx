import React from 'react';
import { MapPin, Utensils, Bath, Wind, CheckCircle2, Star, Heart, Scale, Search } from 'lucide-react';

const PropertyCard = ({ property, onViewDetails, isFavorite, onToggleFavorite, isComparing, onToggleCompare }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-500 group animate-fade-in flex flex-col h-full relative">
      {/* Compare Checkbox */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(property);
          }}
          className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-lg ${
            isComparing 
              ? 'bg-primary-600 text-white scale-110' 
              : 'bg-white/80 dark:bg-gray-800/80 text-gray-400 hover:text-primary-600'
          }`}
          title="Compare with AI"
        >
          <Scale size={16} />
        </button>
      </div>

      {/* Heart Button */}
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-lg ${
            isFavorite 
              ? 'bg-red-500 text-white scale-110' 
              : 'bg-white/80 dark:bg-gray-800/80 text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
        </button>
      </div>

      <div className="relative h-56 overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Rating Badge */}
        <div className="absolute top-4 left-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-black text-gray-800 dark:text-gray-100 shadow-sm flex items-center gap-1 border border-gray-100 dark:border-gray-700">
          <Star size={10} className="text-yellow-500 fill-yellow-500" />
          {property.rating}
        </div>
        {/* Category Badge */}
        <div className="absolute bottom-4 left-4 bg-primary-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">
          {property.category}
        </div>
        {/* Verified / Unverified Badge */}
        {property.verified ? (
          <div className="absolute bottom-4 right-4 bg-blue-600/95 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            Verified
          </div>
        ) : (
          <div className="absolute bottom-4 right-4 bg-orange-500/95 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-current stroke-2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
            Unverified
          </div>
        )}
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white line-clamp-1 mb-1 tracking-tight">{property.title}</h3>
            <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest">
              <MapPin size={12} className="text-primary-500" />
              <span className="truncate max-w-[120px]">{property.locality.split(',')[0]}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-primary-600 tracking-tighter">₹{property.price.toLocaleString()}</span>
            <span className="text-[10px] text-gray-400 font-bold block uppercase">/month</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8 mt-auto">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl border border-gray-100/50 dark:border-gray-700/50 flex items-center gap-3 group/item hover:bg-white dark:hover:bg-gray-800 hover:border-primary-100 transition-all">
            <CheckCircle2 size={14} className="text-primary-500" />
            <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400 truncate">{property.roomType}</span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl border border-gray-100/50 dark:border-gray-700/50 flex items-center gap-3 group/item hover:bg-white dark:hover:bg-gray-800 hover:border-primary-100 transition-all">
            <Wind size={14} className="text-primary-500" />
            <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400 truncate">{property.accessories.ac ? 'AC Room' : 'Non-AC'}</span>
          </div>
        </div>

        <button 
          onClick={() => onViewDetails(property)}
          className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black py-4 rounded-2xl transition-all shadow-xl hover:shadow-primary-100 hover:bg-primary-600 dark:hover:bg-primary-500 dark:hover:text-white active:scale-[0.98] text-sm uppercase tracking-widest"
        >
          View details
        </button>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 border-dashed h-full">
    <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
      <Search size={40} className="text-gray-300 dark:text-gray-600" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">No properties found</h3>
    <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6 text-sm font-medium">We couldn't find any accommodations matching your current filters. Try adjusting your preferences to see more results.</p>
  </div>
);

const PropertyGrid = ({ properties, onViewDetails, favorites = [], onToggleFavorite, compareList = [], onToggleCompare }) => {
  if (!properties || properties.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {properties.map(property => (
        <PropertyCard 
          key={property.id} 
          property={property} 
          onViewDetails={onViewDetails} 
          isFavorite={favorites.includes(property.id)}
          onToggleFavorite={onToggleFavorite}
          isComparing={compareList.includes(property.id)}
          onToggleCompare={onToggleCompare}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;
