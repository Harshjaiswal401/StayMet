import React from 'react';
import { MapPin, Utensils, Bath, Wind, CheckCircle2, Star } from 'lucide-react';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary-100 transition-all duration-300 group animate-fade-in flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
          <Star size={12} className="text-yellow-500 fill-yellow-500" />
          {property.rating}
        </div>
        <div className="absolute top-3 right-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
          {property.category}
        </div>
        {property.lateNightAllowance && (
          <div className="absolute bottom-3 right-3 bg-indigo-600/90 backdrop-blur-sm text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
            Late Entry
          </div>
        )}
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{property.title}</h3>
          <div className="text-right">
            <span className="text-xl font-bold text-primary-600">₹{property.price}</span>
            <span className="text-xs text-gray-500 block">/month</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
          <MapPin size={14} />
          <span className="truncate">{property.locality}</span>
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600 mb-6 mt-auto">
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 p-1.5 rounded text-gray-600"><CheckCircle2 size={14} /></div>
            <span className="truncate">{property.roomType}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 p-1.5 rounded text-gray-600"><Wind size={14} /></div>
            <span className="truncate">{property.accessories.ac ? 'AC Room' : 'Non-AC'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 p-1.5 rounded text-gray-600"><Bath size={14} /></div>
            <span className="truncate">{property.washroom}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 p-1.5 rounded text-gray-600"><Utensils size={14} /></div>
            <span className="truncate">{property.meals}</span>
          </div>
        </div>

        <button className="w-full bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white font-semibold py-2.5 rounded-xl transition-colors duration-200 mt-auto">
          View Details
        </button>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in bg-white rounded-2xl border border-gray-100 border-dashed h-full">
    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
      <Search size={40} className="text-gray-300" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">No properties found</h3>
    <p className="text-gray-500 max-w-sm mb-6">We couldn't find any accommodations matching your current filters. Try adjusting your preferences to see more results.</p>
  </div>
);

const PropertyGrid = ({ properties }) => {
  if (!properties || properties.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyGrid;
