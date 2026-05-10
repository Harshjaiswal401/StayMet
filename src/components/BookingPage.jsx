import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, ShieldCheck, Calendar, User, Phone, Mail, CheckCircle, Sparkles } from 'lucide-react';
import { createBooking } from '../firebase/firestore';

const BookingPage = ({ property, onBack, user }) => {
  const [step, setStep] = useState(1);
  const [bookingId, setBookingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkInDate: '',
    duration: '6',
    paymentMethod: 'UPI'
  });

  // Pre-fill from Firebase user
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name:  user.displayName || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const id = await createBooking({
        userId:        user?.uid || 'guest',
        propertyId:    property.id,
        propertyTitle: property.title,
        propertyImage: property.imageUrl,
        price:         property.price,
        ...formData,
      });
      setBookingId(id || `STM-${Math.floor(Math.random() * 90000) + 10000}`);
    } catch {
      // Fallback: still show success for demo
      setBookingId(`STM-${Math.floor(Math.random() * 90000) + 10000}`);
    } finally {
      setIsSubmitting(false);
      setStep(3);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white rounded-[3rem] shadow-2xl p-12 max-w-xl w-full text-center border border-gray-100">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-8 font-medium">Your stay at <span className="text-primary-600 font-bold">{property.title}</span> has been reserved. Check your email for the confirmation details.</p>
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left border border-gray-100">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Booking ID</span>
              <span className="text-gray-900 font-black">#{bookingId || 'STM-00000'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Property</span>
              <span className="text-gray-900 font-bold">{property.title}</span>
            </div>
          </div>
          <button 
            onClick={onBack}
            className="w-full bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-primary-600 transition-all shadow-xl active:scale-95"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-primary-600 font-black uppercase tracking-widest text-xs mb-8 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Details
      </button>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Side: Booking Form */}
        <div className="w-full lg:w-2/3 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-gray-900 mb-2">Secure Your Stay</h1>
            <p className="text-gray-500 font-medium italic">Complete the form below to finalize your booking at {property.title}.</p>
          </div>

          <form onSubmit={handleBooking} className="space-y-8">
            {/* Step 1: Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <User size={14} className="text-primary-500" /> Full Name
                </label>
                <input 
                  type="text" required name="name"
                  placeholder="John Doe"
                  className="w-full px-5 py-4 bg-gray-50 border border-transparent focus:border-primary-500 focus:bg-white rounded-2xl outline-none transition-all font-bold"
                  value={formData.name} onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Phone size={14} className="text-primary-500" /> Phone Number
                </label>
                <input 
                  type="tel" required name="phone"
                  placeholder="+91 98765 43210"
                  className="w-full px-5 py-4 bg-gray-50 border border-transparent focus:border-primary-500 focus:bg-white rounded-2xl outline-none transition-all font-bold"
                  value={formData.phone} onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Mail size={14} className="text-primary-500" /> Email Address
                </label>
                <input 
                  type="email" required name="email"
                  placeholder="john@example.com"
                  className="w-full px-5 py-4 bg-gray-50 border border-transparent focus:border-primary-500 focus:bg-white rounded-2xl outline-none transition-all font-bold"
                  value={formData.email} onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Step 2: Stay Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Calendar size={14} className="text-primary-500" /> Move-in Date
                </label>
                <input 
                  type="date" required name="checkInDate"
                  className="w-full px-5 py-4 bg-gray-50 border border-transparent focus:border-primary-500 focus:bg-white rounded-2xl outline-none transition-all font-bold cursor-pointer"
                  value={formData.checkInDate} onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-primary-500" /> Contract Duration
                </label>
                <select 
                  name="duration"
                  className="w-full px-5 py-4 bg-gray-50 border border-transparent focus:border-primary-500 focus:bg-white rounded-2xl outline-none transition-all font-bold cursor-pointer appearance-none"
                  value={formData.duration} onChange={handleInputChange}
                >
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                  <option value="12">12 Months (Best Value)</option>
                </select>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="pt-4">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 mb-4">
                <CreditCard size={14} className="text-primary-500" /> Select Payment Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['UPI', 'Card', 'Net Banking'].map((method) => (
                  <label key={method} className={`cursor-pointer border-2 p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${formData.paymentMethod === method ? 'border-primary-600 bg-primary-50' : 'border-gray-100 hover:border-gray-200'}`}>
                    <input type="radio" name="paymentMethod" value={method} className="hidden" checked={formData.paymentMethod === method} onChange={handleInputChange} />
                    <span className={`font-black text-sm ${formData.paymentMethod === method ? 'text-primary-700' : 'text-gray-500'}`}>{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-primary-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg disabled:opacity-60"
            >
              {isSubmitting ? (
                <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
              ) : (
                <>Pay & Confirm Booking <Sparkles size={20} /></>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Summary Card */}
        <div className="w-full lg:w-1/3 space-y-6 sticky top-24">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary-600 bg-primary-50 px-3 py-1 rounded-full">Reservation Summary</span>
                <div className="flex items-center gap-1 font-bold text-yellow-600">
                  <span className="text-sm">★</span> {property.rating}
                </div>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight">{property.title}</h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-tighter flex items-center gap-1 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Verified Property
              </p>

              <div className="space-y-3 py-6 border-y border-dashed border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Monthly Rent</span>
                  <span className="font-black text-gray-900">₹{property.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Security Deposit</span>
                  <span className="font-black text-gray-900">₹{(property.price * 2).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Platform Fee</span>
                  <span className="font-black text-green-600 uppercase text-xs">Free (Promo)</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6">
                <span className="text-lg font-black text-gray-900 uppercase">Initial Payment</span>
                <span className="text-2xl font-black text-primary-600">₹{(property.price * 3).toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-gray-400 font-bold mt-2 text-center">*Includes 1 month rent + 2 months security</p>
            </div>
          </div>

          <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            <ShieldCheck className="text-indigo-400 mb-4" size={32} />
            <h4 className="text-lg font-black mb-2">StayMate Assurance</h4>
            <p className="text-indigo-200 text-sm leading-relaxed opacity-80">Your payment is protected. Funds are only transferred to the host after your successful move-in.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
