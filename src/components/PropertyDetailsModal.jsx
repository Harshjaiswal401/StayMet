import React, { useState } from 'react';
import { X, MapPin, Star, CheckCircle2, Phone, Calendar, Shield, Coffee, Wifi, Car, Tv, Wind, Utensils, Bath, Moon, Rotate3D, AlertTriangle } from 'lucide-react';

const PropertyDetailsModal = ({ property, onClose, onBook }) => {
  const [showUnverifiedWarning, setShowUnverifiedWarning] = useState(false);

  if (!property) return null;

  // Generate a realistic gallery of 6 images based on category
  const getGallery = (category, mainImg) => {
    const fallbackImages = {
      "Girls Hostel": [
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522771731478-44fb896bf54f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80"
      ],
      "Boys Hostel": [
        "https://images.unsplash.com/photo-1522771731478-44fb896bf54f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1620626011761-9963d7521476?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1e52409818?auto=format&fit=crop&w=800&q=80"
      ]
    };

    const type = category.toLowerCase().includes('girls') ? "Girls Hostel" : "Boys Hostel";
    const gallery = [...(fallbackImages[type] || fallbackImages["Girls Hostel"])];
    gallery[0] = mainImg;
    return gallery;
  };

  const images = property.images || getGallery(property.category, property.imageUrl);
  const [activeImage, setActiveImage] = useState(images[0]);

  const handleBookClick = () => {
    if (!property.verified) {
      setShowUnverifiedWarning(true);
    } else {
      onBook(property);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity" 
          onClick={onClose}
        ></div>
        
        {/* Modal Content */}
        <div className="relative bg-white dark:bg-gray-950 rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-zoom-in border border-transparent dark:border-gray-800">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur text-gray-800 dark:text-gray-100 p-2 rounded-full shadow-lg hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition-all border border-gray-100 dark:border-gray-700"
          >
            <X size={20} />
          </button>

          {/* Left Column: Image Gallery */}
          <div className="w-full md:w-3/5 bg-gray-50 dark:bg-gray-900 flex flex-col">
            <div className="flex-1 relative overflow-hidden group">
              <img 
                src={activeImage} 
                alt={property.title} 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-3xl font-black mb-1 tracking-tight flex items-center gap-3">
                  {property.title}
                  {/* Verified Badge on image */}
                  {property.verified ? (
                    <span className="inline-flex items-center gap-1.5 bg-blue-500/90 backdrop-blur text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 bg-orange-500/90 backdrop-blur text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                      <AlertTriangle size={11} />
                      Unverified
                    </span>
                  )}
                </h2>
                <p className="flex items-center gap-2 text-sm font-medium opacity-90 uppercase tracking-widest">
                  <MapPin size={16} className="text-primary-400" /> {property.locality}
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
              <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                {images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(img)}
                    className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all relative ${activeImage === img ? 'border-primary-600 shadow-lg scale-105 z-10' : 'border-transparent opacity-60 hover:opacity-100 dark:opacity-40'}`}
                  >
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    {idx === 2 && <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] text-white font-black uppercase tracking-tight">Washroom</span>}
                    {idx === 0 && <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] text-white font-black uppercase tracking-tight">Room</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="w-full md:w-2/5 p-6 md:p-10 overflow-y-auto bg-white dark:bg-gray-950 flex flex-col custom-scrollbar">
            <div className="flex justify-between items-start mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-[10px] font-black uppercase tracking-[0.1em] rounded-full">
                <Sparkles size={12} /> {property.category}
              </div>
              <div className="flex items-center gap-2">
                {/* Verified status pill in details */}
                {property.verified ? (
                  <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                    StayMate Verified
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <AlertTriangle size={11} /> Not Verified
                  </div>
                )}
                <div className="flex items-center gap-1.5 bg-yellow-400 text-white px-3 py-1 rounded-full shadow-sm">
                  <Star size={14} className="fill-current" />
                  <span className="font-black text-sm">{property.rating}</span>
                </div>
              </div>
            </div>

            {/* Unverified Warning Banner */}
            {!property.verified && (
              <div className="mb-6 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/40 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertTriangle size={16} className="text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-black text-orange-800 dark:text-orange-300 tracking-tight">Verification Pending</p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-medium mt-0.5 leading-relaxed">
                    We haven't physically verified this hostel yet. Details may vary. Payment is disabled until our team completes the verification.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">₹{property.price.toLocaleString()}</span>
              <span className="text-gray-400 dark:text-gray-500 font-bold text-sm lowercase tracking-wider">/ month</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <DetailTile icon={<Utensils size={18} />} label="Meals" value={property.meals || "Not Included"} />
              <DetailTile icon={<Bath size={18} />} label="Washroom" value={property.washroom || "Common"} color="blue" />
              <DetailTile icon={<CheckCircle2 size={18} />} label="Room" value={property.roomType} color="green" />
              <DetailTile icon={<Calendar size={18} />} label="Available" value={property.availableFrom || "Ready"} color="purple" />
            </div>

            <div className="space-y-8">
              {/* Accessories / Quick Features */}
              <div className="flex flex-wrap gap-3">
                {property.accessories?.ac && <FeatureBadge icon={<Wind size={14} />} label="Air Conditioned" />}
                {property.accessories?.wifi && <FeatureBadge icon={<Wifi size={14} />} label="High Speed WiFi" />}
                {property.accessories?.parking && <FeatureBadge icon={<Car size={14} />} label="Free Parking" />}
              </div>

              {/* 360 Virtual Tour Placeholder */}
              <div className="relative group/tour cursor-pointer overflow-hidden rounded-[2.5rem] bg-gray-900 aspect-video flex items-center justify-center border-4 border-gray-100 dark:border-gray-800 shadow-inner">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-40 group-hover/tour:scale-110 transition-transform duration-[2s]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/20 to-primary-900/60"></div>
                <div className="relative text-center p-6 z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30 group-hover/tour:scale-110 transition-transform">
                    <Rotate3D className="text-white animate-pulse" size={32} />
                  </div>
                  <h4 className="text-white font-black text-xl mb-1 tracking-tight">360° Virtual Tour</h4>
                  <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">Click to explore room in 3D</p>
                </div>
                <div className="absolute top-4 right-4 bg-primary-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">Live AR</div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                  <div className="w-1 h-4 bg-primary-600 rounded-full"></div>
                  Overview
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm font-medium">
                  {property.description}
                </p>
              </div>

              {/* Amenities Grid */}
              <div>
                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary-100 dark:hover:border-primary-800 hover:bg-white dark:hover:bg-gray-800 transition-all">
                      <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Security */}
              {(property.security || property.lateNightAllowance) && (
                <div className="bg-gray-900 dark:bg-black text-white p-5 rounded-[2rem] relative overflow-hidden border border-gray-800">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-bl-full"></div>
                  <h4 className="text-xs font-black uppercase tracking-widest mb-4 opacity-60">Security & Rules</h4>
                  <div className="space-y-3">
                    {property.security && (
                      <div className="flex items-center gap-3">
                        <Shield size={16} className="text-green-400" />
                        <span className="text-sm font-bold">24/7 Professional Guard Security</span>
                      </div>
                    )}
                    {property.lateNightAllowance && (
                      <div className="flex items-center gap-3">
                        <Moon size={16} className="text-indigo-400" />
                        <span className="text-sm font-bold">Flexible Late-Night Entry Policy</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Footer */}
            <div className="mt-auto pt-10 flex gap-4">
              <button 
                onClick={handleBookClick}
                className={`flex-1 font-black py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 group ${
                  property.verified 
                    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-100 dark:shadow-none' 
                    : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-2 border-orange-200 dark:border-orange-800 cursor-not-allowed shadow-none'
                }`}
              >
                {property.verified ? (
                  <>Book Stay <Sparkles size={18} className="group-hover:animate-pulse" /></>
                ) : (
                  <><AlertTriangle size={18} /> Payment Unavailable</>
                )}
              </button>
              <a 
                href={`tel:${property.phone}`}
                className="px-6 bg-gray-100 dark:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-2xl transition-all flex items-center justify-center group"
              >
                <Phone size={20} className="group-hover:rotate-12 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Unverified Warning Modal */}
      {showUnverifiedWarning && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowUnverifiedWarning(false)}></div>
          <div className="relative bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl max-w-md w-full p-8 animate-zoom-in border border-orange-100 dark:border-orange-900/50 overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full"></div>
            
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-orange-50 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <AlertTriangle size={48} className="text-orange-500" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-red-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center">
                  <X size={14} className="text-white font-black" />
                </div>
              </div>

              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                Hostel Not Verified
              </h2>
              <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-4">
                Payment Restricted
              </p>

              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/40 rounded-2xl p-5 mb-8 text-left">
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                  🏠 <span className="font-black text-gray-900 dark:text-white">{property.title}</span> has not been physically inspected by our team yet.
                </p>
                <ul className="mt-3 space-y-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">•</span>
                    Details shown may not be fully accurate
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">•</span>
                    Online payment is disabled for unverified hostels
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">•</span>
                    You can still call the hostel directly to inquire
                  </li>
                </ul>
              </div>

              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setShowUnverifiedWarning(false)}
                  className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-black py-4 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm uppercase tracking-widest"
                >
                  Go Back
                </button>
                <a 
                  href={`tel:${property.phone}`}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-black py-4 rounded-2xl transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary-100 dark:shadow-none"
                >
                  <Phone size={16} /> Call Hostel
                </a>
              </div>

              <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-4 font-bold uppercase tracking-widest">
                Verification usually takes 2-3 business days
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const DetailTile = ({ icon, label, value, color = "primary" }) => {
  const colors = {
    primary: "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400",
    blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    green: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    purple: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
  };
  return (
    <div className="flex items-center gap-3 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 p-3 rounded-2xl">
      <div className={`p-2 rounded-xl shadow-sm ${colors[color]}`}>{icon}</div>
      <div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-tight">{label}</p>
        <p className="font-bold text-gray-900 dark:text-gray-100 text-xs truncate max-w-[80px] tracking-tight">{value}</p>
      </div>
    </div>
  );
};

const FeatureBadge = ({ icon, label }) => (
  <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm text-xs font-bold text-gray-700 dark:text-gray-300 hover:border-primary-200 dark:hover:border-primary-800 transition-colors">
    <div className="text-primary-500">{icon}</div>
    {label}
  </div>
);

const Sparkles = ({ className, size }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" /><path d="M3 5h4" /><path d="M21 17v4" /><path d="M19 19h4" />
  </svg>
);

export default PropertyDetailsModal;
