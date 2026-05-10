import React, { useState } from 'react';
import { X, Sparkles, Check, AlertCircle, Info, Scale } from 'lucide-react';

const PropertyComparator = ({ isOpen, onClose, properties }) => {
  if (!isOpen) return null;

  const features = [
    { name: 'Monthly Rent', key: 'price', type: 'price' },
    { name: 'Meals Included', key: 'meals' },
    { name: 'Washroom Type', key: 'washroom' },
    { name: 'Security', key: 'security', type: 'boolean' },
    { name: 'AC / Non-AC', key: 'accessories', sub: 'ac', type: 'boolean' },
    { name: 'Late Entry', key: 'lateNightAllowance', type: 'boolean' }
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/20 animate-zoom-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-700 to-indigo-800 p-8 text-white relative">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-colors">
            <X size={20} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-xl">
              <Scale size={24} className="text-yellow-400" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">AI Decision Assistant</span>
          </div>
          <h2 className="text-3xl font-black">Property Comparison</h2>
          <p className="text-indigo-100 mt-1 font-medium opacity-90">Our AI analyzes your options to find the perfect value match.</p>
        </div>

        <div className="p-8 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left bg-gray-50 rounded-tl-3xl border-b border-gray-100">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">Features</span>
                </th>
                {properties.map((p, idx) => (
                  <th key={p.id} className={`p-4 min-w-[200px] border-b border-gray-100 ${idx === properties.length - 1 ? 'rounded-tr-3xl' : ''}`}>
                    <div className="text-center">
                      <img src={p.imageUrl} alt={p.title} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-3 shadow-md" />
                      <h4 className="font-black text-gray-900 text-sm leading-tight">{p.title}</h4>
                      <p className="text-[10px] font-bold text-primary-600 mt-1 uppercase tracking-tighter">{p.category}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, fIdx) => (
                <tr key={fIdx} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4 font-black text-xs text-gray-500 uppercase tracking-widest border-b border-gray-100">
                    {feature.name}
                  </td>
                  {properties.map((p) => {
                    let val = feature.sub ? p[feature.key][feature.sub] : p[feature.key];
                    
                    return (
                      <td key={p.id} className="p-6 text-center border-b border-gray-100">
                        {feature.type === 'price' ? (
                          <span className="font-black text-gray-900 text-lg">₹{val.toLocaleString()}</span>
                        ) : feature.type === 'boolean' ? (
                          val ? <Check className="mx-auto text-green-500" size={20} /> : <X className="mx-auto text-red-300" size={20} />
                        ) : (
                          <span className="font-bold text-gray-600 text-sm">{val}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {/* AI Verdict Row */}
              <tr className="bg-primary-50/50">
                <td className="p-6 font-black text-xs text-primary-700 uppercase tracking-widest rounded-bl-3xl">
                  AI Verdict
                </td>
                {properties.map((p, idx) => (
                  <td key={p.id} className={`p-6 ${idx === properties.length - 1 ? 'rounded-br-3xl' : ''}`}>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-primary-100">
                      {idx === 0 ? (
                        <p className="text-xs font-medium text-gray-700">Best for <span className="font-bold text-primary-600 underline">Luxury & Security</span>. Higher price but premium amenities.</p>
                      ) : idx === 1 ? (
                        <p className="text-xs font-medium text-gray-700">Best <span className="font-bold text-green-600 underline">Value for Money</span>. Balanced features for a lower cost.</p>
                      ) : (
                        <p className="text-xs font-medium text-gray-700">Best <span className="font-bold text-orange-600 underline">Budget Option</span>. Essential features at the lowest price point.</p>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Info size={16} className="text-primary-500" />
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">AI comparison is based on price, rating, and user reviews.</p>
          </div>
          <button onClick={onClose} className="px-8 py-3 bg-gray-900 text-white font-black rounded-2xl hover:bg-primary-600 transition-all shadow-xl">
            Close Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyComparator;
