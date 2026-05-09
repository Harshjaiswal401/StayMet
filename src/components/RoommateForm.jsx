import React, { useState } from 'react';
import { Upload, User, FileText, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

const RoommateForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    idProofType: 'Aadhar',
    hygiene: 5,
    cleanliness: 5,
    lifestyle: 'balanced', // early, night, balanced
    understanding: 5
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getAICompatibility = async (userQualities) => {
    // Simulating external webhook/API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock calculation based on some logic
        const score = Math.floor(Math.random() * 30) + 70; // 70-99%
        let reason = "You both share an excellent mutual understanding and maintain high standards of cleanliness.";
        if (userQualities.lifestyle === 'night') {
          reason = "You both are night owls and prefer clean spaces, making late-night study sessions perfectly in sync!";
        } else if (userQualities.lifestyle === 'early') {
          reason = "As early birds, you'll both enjoy quiet mornings and a structured, hygienic living environment.";
        }
        resolve({
          compatibilityPercentage: score,
          aiReason: reason
        });
      }, 2000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);
    
    try {
      const aiResponse = await getAICompatibility(formData);
      setResult(aiResponse);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-start">
      {/* Form Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex-1 w-full animate-fade-in">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="text-indigo-500" />
            Find Your Ideal Roommate
          </h2>
          <p className="text-gray-500 text-sm mt-2">Let our AI match you with the perfect living partner based on your lifestyle.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text" name="name" required
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={formData.name} onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Proof Type</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText size={18} className="text-gray-400" />
                  </div>
                  <select
                    name="idProofType"
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none transition-all"
                    value={formData.idProofType} onChange={handleInputChange}
                  >
                    <option value="Aadhar">Aadhar Card</option>
                    <option value="PAN Card">PAN Card</option>
                    <option value="Voter ID">Voter ID</option>
                  </select>
                </div>
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload ID</label>
                <button type="button" className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-50 border border-gray-200 border-dashed rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition-colors">
                  <Upload size={18} />
                  Choose File
                </button>
              </div>
            </div>
          </div>

          {/* Qualities Section */}
          <div className="space-y-6 pt-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Your Lifestyle & Habits</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">Hygiene Level</label>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{formData.hygiene}/10</span>
                </div>
                <input 
                  type="range" name="hygiene" min="1" max="10" 
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  value={formData.hygiene} onChange={handleInputChange}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">Cleanliness Standard</label>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{formData.cleanliness}/10</span>
                </div>
                <input 
                  type="range" name="cleanliness" min="1" max="10" 
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  value={formData.cleanliness} onChange={handleInputChange}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">Mutual Understanding Flexibility</label>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{formData.understanding}/10</span>
                </div>
                <input 
                  type="range" name="understanding" min="1" max="10" 
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  value={formData.understanding} onChange={handleInputChange}
                />
              </div>

              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">Lifestyle Routine</label>
                <div className="grid grid-cols-3 gap-3">
                  {['early', 'balanced', 'night'].map((type) => (
                    <label key={type} className={`cursor-pointer text-center py-2 px-3 border rounded-xl text-sm font-medium transition-all ${formData.lifestyle === type ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                      <input 
                        type="radio" name="lifestyle" value={type} className="hidden"
                        checked={formData.lifestyle === type} onChange={handleInputChange}
                      />
                      {type === 'early' ? 'Early Bird' : type === 'night' ? 'Night Owl' : 'Flexible'}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || !formData.name}
            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-primary-600 hover:from-indigo-700 hover:to-primary-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <><Loader2 className="animate-spin" size={20} /> Finding Best Match...</>
            ) : (
              <><Sparkles size={20} /> Generate AI Match</>
            )}
          </button>
        </form>
      </div>

      {/* Results Section */}
      <div className="w-full md:w-80 flex-shrink-0">
        {result ? (
          <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 flex flex-col items-center text-center animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-primary-500"></div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-6">AI Match Results</h3>
            
            {/* Circular Progress Bar */}
            <div className="relative w-36 h-36 mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="100, 100" />
                <path className="text-indigo-500" strokeDasharray={`${result.compatibilityPercentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" style={{ transition: 'stroke-dasharray 1s ease-out' }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-gray-900">{result.compatibilityPercentage}%</span>
                <span className="text-[10px] uppercase font-bold text-indigo-500 tracking-wider">Match</span>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-xl p-4 w-full">
              <p className="text-sm text-indigo-900 font-medium leading-relaxed italic">
                "{result.aiReason}"
              </p>
            </div>
            
            <button className="w-full mt-6 bg-white border-2 border-indigo-100 text-indigo-600 hover:bg-indigo-50 font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
              <CheckCircle2 size={18} /> Connect Profile
            </button>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl border border-gray-200 border-dashed p-8 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
             <Sparkles size={48} className="text-gray-300 mb-4" />
             <h3 className="text-lg font-bold text-gray-600 mb-2">No Match Generated</h3>
             <p className="text-gray-400 text-sm">Fill out the form and let our AI find the perfect roommate based on your lifestyle habits.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoommateForm;
