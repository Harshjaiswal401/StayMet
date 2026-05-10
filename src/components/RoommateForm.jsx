import React, { useState } from 'react';
import { Upload, User, FileText, CheckCircle2, Loader2, Sparkles, MessageCircle, AlertTriangle, ThumbsUp, ThumbsDown, Bot, Scale } from 'lucide-react';
import HouseRuleGenerator from './HouseRuleGenerator';

const RoommateForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    idProofType: 'Aadhar',
    hygiene: 5,
    cleanliness: 5,
    lifestyle: 'balanced', // early, night, balanced
    understanding: 5,
    hasOcd: false,
    socialPreference: 'ambivert', // introvert, extrovert, ambivert
    workStyle: 'hybrid', // wfh, office, hybrid
    budget: 'mid', // budget, mid, premium
    hobbies: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState([]); // Array of matches
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'hobbies') {
      const updatedHobbies = checked 
        ? [...formData.hobbies, value]
        : formData.hobbies.filter(h => h !== value);
      setFormData(prev => ({ ...prev, hobbies: updatedHobbies }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value 
      }));
    }
  };

  const getAICompatibility = async (userQualities) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const profilePool = [
          { name: "Rahul Verma", age: 22, occupation: "Student", interests: ["Coding", "Gym", "Music"], imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80", lifestyle: "balanced", social: "ambivert", trust: 95 },
          { name: "Ankit Sharma", age: 21, occupation: "Developer", interests: ["Gaming", "Coffee", "Anime"], imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", lifestyle: "night", social: "introvert", trust: 92 },
          { name: "Priya Singh", age: 23, occupation: "Analyst", interests: ["Yoga", "Reading", "Running"], imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", lifestyle: "early", social: "introvert", trust: 98 },
          { name: "Sneha Kapoor", age: 22, occupation: "Designer", interests: ["Art", "Painting", "Travel"], imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80", lifestyle: "balanced", social: "extrovert", trust: 94 },
          { name: "Vikram Malhotra", age: 24, occupation: "Chef", interests: ["Cooking", "Foodie", "Netflix"], imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80", lifestyle: "night", social: "ambivert", trust: 89 },
          { name: "Isha Reddy", age: 20, occupation: "Student", interests: ["Dance", "Movies", "Music"], imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80", lifestyle: "balanced", social: "extrovert", trust: 91 },
          { name: "Arjun Mehra", age: 23, occupation: "MBA Student", interests: ["Finance", "Cricket", "Reading"], imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80", lifestyle: "early", social: "ambivert", trust: 96 },
          { name: "Rohan Das", age: 25, occupation: "Freelancer", interests: ["Photography", "Nature", "Hiking"], imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80", lifestyle: "balanced", social: "introvert", trust: 93 },
          { name: "Megha Jain", age: 23, occupation: "Architect", interests: ["Sketching", "History", "Puzzles"], imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", lifestyle: "early", social: "introvert", trust: 97 },
          { name: "Karan Joshi", age: 24, occupation: "Marketing", interests: ["Parties", "Socializing", "Travel"], imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80", lifestyle: "night", social: "extrovert", trust: 88 }
        ];

        const calculatedMatches = profilePool.map(profile => {
          let score = 70 + Math.floor(Math.random() * 20);
          const pros = [];
          const cons = [];
          
          if (profile.lifestyle === userQualities.lifestyle) {
            score += 10;
            pros.push(`Shared ${profile.lifestyle} lifestyle!`);
          } else {
            cons.push(`Different daily routines (${profile.lifestyle} vs ${userQualities.lifestyle})`);
          }

          if (profile.social === userQualities.socialPreference) {
            score += 5;
            pros.push(`Both are ${profile.social}s.`);
          }

          if (userQualities.hasOcd && profile.trust > 95) {
            score += 5;
            pros.push("Matches your high standards for cleanliness.");
          }

          return {
            ...profile,
            compatibility: Math.min(score, 99),
            pros: pros.slice(0, 3),
            cons: cons.slice(0, 2),
            ratings: {
              cleanliness: 80 + Math.floor(Math.random() * 15),
              routine: 80 + Math.floor(Math.random() * 15),
              social: 80 + Math.floor(Math.random() * 15)
            }
          };
        }).sort((a, b) => b.compatibility - a.compatibility);

        resolve(calculatedMatches.slice(0, 3));
      }, 2000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResults([]);
    
    try {
      const aiResponse = await getAICompatibility(formData);
      setResults(aiResponse);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start px-4 pb-20">
      {/* Form Section */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 flex-1 w-full lg:w-5/12 animate-fade-in transition-colors">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2 tracking-tight">
            <Sparkles className="text-indigo-500" />
            AI Matchmaker
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 font-medium">Let our AI analyze your habits and find the perfect roommate.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] border-b border-gray-50 dark:border-gray-800 pb-2">Basic Details</h3>
            
            <div>
              <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text" name="name" required
                  placeholder="Enter your name"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all text-gray-900 dark:text-white font-bold"
                  value={formData.name} onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">ID Proof</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FileText size={18} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <select
                    name="idProofType"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 appearance-none transition-all text-gray-900 dark:text-white font-bold"
                    value={formData.idProofType} onChange={handleInputChange}
                  >
                    <option value="Aadhar">Aadhar Card</option>
                    <option value="PAN Card">PAN Card</option>
                  </select>
                </div>
              </div>
              
              <div className="flex-1">
                <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">Upload</label>
                <button type="button" className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 border-dashed border-2 rounded-2xl text-sm font-black text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">
                  <Upload size={18} />
                  Browse
                </button>
              </div>
            </div>
          </div>

          {/* Qualities Section */}
          <div className="space-y-6 pt-4">
            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] border-b border-gray-50 dark:border-gray-800 pb-2">Lifestyle & Habits</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest">Hygiene Level</label>
                  <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md">{formData.hygiene}/10</span>
                </div>
                <input 
                  type="range" name="hygiene" min="1" max="10" 
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500"
                  value={formData.hygiene} onChange={handleInputChange}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest">Cleanliness</label>
                  <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md">{formData.cleanliness}/10</span>
                </div>
                <input 
                  type="range" name="cleanliness" min="1" max="10" 
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500"
                  value={formData.cleanliness} onChange={handleInputChange}
                />
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-3xl border border-indigo-100 dark:border-indigo-800 transition-colors">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <input 
                    type="checkbox" name="hasOcd"
                    className="mt-1 w-5 h-5 rounded-lg border-indigo-300 dark:border-indigo-700 text-indigo-600 focus:ring-indigo-500 transition-colors cursor-pointer"
                    checked={formData.hasOcd} onChange={handleInputChange}
                  />
                  <div>
                    <span className="block text-sm font-black text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">I have strict cleanliness habits (OCD)</span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium leading-relaxed">Check this for specialized matching with equally disciplined roommates.</span>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-4">Daily Routine</label>
                <div className="grid grid-cols-3 gap-3">
                  {['early', 'balanced', 'night'].map((type) => (
                    <label key={type} className={`cursor-pointer text-center py-3 px-2 border-2 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${formData.lifestyle === type ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none scale-[1.02]' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-indigo-200 dark:hover:border-indigo-900'}`}>
                      <input 
                        type="radio" name="lifestyle" value={type} className="hidden"
                        checked={formData.lifestyle === type} onChange={handleInputChange}
                      />
                      {type === 'early' ? 'Early Bird' : type === 'night' ? 'Night Owl' : 'Flexible'}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-4">Social Preference</label>
                <div className="grid grid-cols-3 gap-3">
                  {['introvert', 'ambivert', 'extrovert'].map((type) => (
                    <label key={type} className={`cursor-pointer text-center py-3 px-2 border-2 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${formData.socialPreference === type ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none scale-[1.02]' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-indigo-200 dark:hover:border-indigo-900'}`}>
                      <input 
                        type="radio" name="socialPreference" value={type} className="hidden"
                        checked={formData.socialPreference === type} onChange={handleInputChange}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-4">Hobbies & Interests</label>
                <div className="flex flex-wrap gap-2">
                  {['Coding', 'Music', 'Gym', 'Gaming', 'Cooking', 'Reading', 'Travel'].map((hobby) => (
                    <label key={hobby} className={`cursor-pointer px-4 py-2 border-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${formData.hobbies.includes(hobby) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-indigo-200'}`}>
                      <input 
                        type="checkbox" name="hobbies" value={hobby} className="hidden"
                        checked={formData.hobbies.includes(hobby)} onChange={handleInputChange}
                      />
                      {hobby}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || !formData.name}
            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-primary-600 hover:from-indigo-700 hover:to-primary-700 text-white font-black py-4.5 rounded-2xl shadow-xl shadow-indigo-100 dark:shadow-none transition-all flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98] uppercase tracking-[0.1em] text-xs"
          >
            {isSubmitting ? (
              <><Loader2 className="animate-spin" size={20} /> Analyzing Profiles...</>
            ) : (
              <><Sparkles size={20} /> Find My Match</>
            )}
          </button>
        </form>
      </div>

      {/* Results Section */}
      <div className="w-full lg:w-7/12 flex-shrink-0">
        {results.length > 0 ? (
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2 tracking-tight">
                <Sparkles className="text-indigo-500" />
                AI Top Recommendations
              </h3>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{results.length} Matches Found</span>
            </div>

            {results.map((match, index) => (
              <div key={index} className={`bg-white dark:bg-gray-900 rounded-3xl shadow-xl border ${index === 0 ? 'border-indigo-200 dark:border-indigo-900 ring-4 ring-indigo-50 dark:ring-indigo-900/20' : 'border-gray-100 dark:border-gray-800'} p-6 lg:p-10 animate-fade-in relative overflow-hidden flex flex-col transition-all hover:shadow-2xl`}>
                {index === 0 && (
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-black px-6 py-2 rounded-bl-3xl uppercase tracking-widest shadow-lg z-10">
                    Perfect Match
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
                  {/* Circular Progress Bar */}
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-gray-100 dark:text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="100, 100" />
                      <path className="text-indigo-500" strokeDasharray={`${match.compatibility}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="url(#gradient-match)" strokeWidth="3" strokeLinecap="round" style={{ transition: 'stroke-dasharray 2s ease-out' }} />
                      <defs>
                        <linearGradient id="gradient-match" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">{match.compatibility}%</span>
                    </div>
                  </div>

                  {/* Profile Card */}
                  <div className="flex-1 w-full bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left transition-colors">
                    <div className="relative">
                      <img src={match.imageUrl} alt="Match" className="w-24 h-24 rounded-full object-cover shadow-xl border-4 border-white dark:border-gray-700" />
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full flex items-center justify-center">
                        <CheckCircle2 size={12} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 dark:text-white text-2xl leading-tight mb-1">{match.name}</h4>
                      <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">{match.occupation} • {match.age} Years</p>
                      <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
                        <div className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-md">
                          <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Trust Index: {match.trust}%</span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
                        {match.interests.map((interest, idx) => (
                          <span key={idx} className="text-[10px] font-black px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-full shadow-sm">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analysis */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <h5 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Match Logic</h5>
                    <ul className="space-y-2.5">
                      {match.pros.map((pro, idx) => (
                        <li key={idx} className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 size={12} className="text-green-500" />
                          </div>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-gray-500 dark:text-gray-400">Cleanliness Sync</span>
                        <span className="text-indigo-600 dark:text-indigo-400">{match.ratings.cleanliness}%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-full rounded-full" style={{ width: `${match.ratings.cleanliness}%` }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-gray-500 dark:text-gray-400">Social Synergy</span>
                        <span className="text-pink-600 dark:text-pink-400">{match.ratings.social}%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-pink-500 to-rose-400 h-full rounded-full" style={{ width: `${match.ratings.social}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <button className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-black py-4 rounded-2xl hover:bg-indigo-600 dark:hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg">
                    <MessageCircle size={16} /> Chat
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedMatch(match);
                      setIsRuleModalOpen(true);
                    }}
                    className="flex-1 bg-white dark:bg-gray-800 border-2 border-indigo-100 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs font-black py-4 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-indigo-100/50 uppercase tracking-widest"
                  >
                    <Scale size={16} /> Rulebook
                  </button>
                </div>
              </div>
            ))}

            {/* House Rule Generator Modal */}
            <HouseRuleGenerator 
              isOpen={isRuleModalOpen}
              onClose={() => setIsRuleModalOpen(false)}
              userProfile={formData}
              matchProfile={selectedMatch}
            />
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm p-12 flex flex-col items-center justify-center text-center h-full min-h-[600px] transition-colors">
             <div className="w-32 h-32 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-8 relative">
                <Bot size={56} className="text-indigo-400 animate-pulse" />
                <div className="absolute top-4 right-4 w-5 h-5 bg-green-400 border-4 border-white dark:border-gray-900 rounded-full animate-pulse"></div>
             </div>
             <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Matchmaker Idle</h3>
             <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm font-medium">
               Complete your profile details on the left. Our AI algorithm will then scan potential roommates to find your perfect lifestyle match.
             </p>
             <div className="mt-10 flex gap-2">
                {[1,2,3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-indigo-200 dark:bg-indigo-800 animate-bounce" style={{ animationDelay: `${i*0.2}s` }}></div>)}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoommateForm;
