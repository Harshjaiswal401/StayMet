import React, { useState } from 'react';
import { FileText, Shield, Zap, Coffee, Clock, Trash2, Volume2, Sparkles, X, Download, Share2 } from 'lucide-react';

const HouseRuleGenerator = ({ userProfile, matchProfile, isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [contract, setContract] = useState(null);

  const generateContract = () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      const rules = [
        {
          id: 1,
          icon: <Clock className="text-blue-500" />,
          title: "The Quiet Hour Protocol",
          rule: `Since ${userProfile.name} is a ${userProfile.lifestyle} and ${matchProfile.name} is a ${matchProfile.lifestyle}, main living area lights out by 11:30 PM. Use headphones after midnight.`,
          category: "Routine"
        },
        {
          id: 2,
          icon: <Trash2 className="text-green-500" />,
          title: "Hygiene Standard 1.0",
          rule: `With a combined hygiene score of ${(userProfile.hygiene + (matchProfile.ratings?.cleanliness || 50) / 10) / 2}, dishes must be cleared from the sink within 12 hours of use. Deep clean every Sunday morning.`,
          category: "Cleanliness"
        },
        {
          id: 3,
          icon: <Zap className="text-yellow-500" />,
          title: "Energy & Climate Pact",
          rule: "AC usage limited to 8 hours/day. Last person leaving the room is legally (and morally) responsible for checking all switches.",
          category: "Utilities"
        },
        {
          id: 4,
          icon: <Volume2 className="text-purple-500" />,
          title: "Guest & Social Policy",
          rule: `${matchProfile.name} (${matchProfile.social}) and ${userProfile.name} (${userProfile.socialPreference}) agree on a '24-hour heads up' policy for overnight guests. No loud parties on weeknights.`,
          category: "Social"
        }
      ];
      setContract(rules);
      setIsGenerating(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-gray-950 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20 dark:border-gray-800 animate-zoom-in transition-colors">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-10 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <Sparkles size={24} className="text-yellow-300" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">AI Legal Engine</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter">House Rules</h2>
          <p className="text-indigo-100 mt-2 font-medium opacity-90 max-w-md text-sm">Custom agreement generated specifically for your compatibility profile.</p>
        </div>

        <div className="p-10">
          {!contract && !isGenerating ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 rotate-6 transition-colors shadow-inner">
                <FileText size={48} className="text-indigo-500 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Draft Your Agreement</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-xs mx-auto text-sm font-medium">We'll analyze both of your preferences to create a fair and binding AI contract.</p>
              <button 
                onClick={generateContract}
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-10 py-5 rounded-2xl font-black hover:bg-indigo-600 dark:hover:bg-indigo-50 transition-all shadow-xl hover:shadow-indigo-200 dark:hover:shadow-none active:scale-95 flex items-center gap-3 mx-auto uppercase tracking-widest text-xs"
              >
                <Zap size={20} className="text-yellow-400 fill-yellow-400" />
                Generate Contract
              </button>
            </div>
          ) : isGenerating ? (
            <div className="text-center py-20">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-indigo-100 dark:border-indigo-900/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BotIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white animate-pulse tracking-tight">Drafting Rules...</h3>
              <p className="text-xs font-black text-gray-400 dark:text-gray-500 mt-3 uppercase tracking-widest">Analyzing combined hygiene & social sync</p>
            </div>
          ) : (
            <div className="space-y-6 animate-slide-up">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white text-xl tracking-tight">Official Pact</h4>
                  <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Status: Legally (AI) Binding</p>
                </div>
                <div className="flex gap-3">
                   <button className="p-3 bg-gray-50 dark:bg-gray-900 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-2xl transition-colors text-gray-400 hover:text-indigo-600">
                     <Download size={20} />
                   </button>
                   <button className="p-3 bg-gray-50 dark:bg-gray-900 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-2xl transition-colors text-gray-400 hover:text-indigo-600">
                     <Share2 size={20} />
                   </button>
                </div>
              </div>

              <div className="grid gap-5">
                {contract.map((item) => (
                  <div key={item.id} className="group bg-gray-50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 hover:shadow-2xl hover:shadow-indigo-100 dark:hover:shadow-none border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900 p-6 rounded-3xl transition-all duration-300">
                    <div className="flex gap-5">
                      <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">Rule #{item.id}</span>
                          <h5 className="font-black text-gray-900 dark:text-white tracking-tight">{item.title}</h5>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{item.rule}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-10 border-t border-dashed border-gray-200 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row items-center justify-between bg-indigo-50/50 dark:bg-indigo-900/10 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-900/30 gap-4">
                  <div className="flex items-center gap-4">
                    <Shield className="text-indigo-600 dark:text-indigo-400" size={24} />
                    <div>
                      <p className="text-[10px] font-black text-indigo-900 dark:text-indigo-300 uppercase tracking-widest">Verified Agreement</p>
                      <p className="text-xs text-indigo-600 dark:text-indigo-500 font-bold mt-0.5">StayMate AI Enforcement Service</p>
                    </div>
                  </div>
                  <button 
                    onClick={onClose}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl text-xs font-black hover:bg-indigo-700 transition-all uppercase tracking-widest"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BotIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

export default HouseRuleGenerator;
