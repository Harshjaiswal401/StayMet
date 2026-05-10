import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Minus } from 'lucide-react';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hi! I'm StayMate AI. I can help you find the best hostels, explain rules, or even calculate your expenses. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      let botResponse = "That's a great question! Based on your interest, I recommend checking out our 'Top Rated' girls hostels in MP Nagar if you prioritize security.";
      
      if (userMsg.toLowerCase().includes('price') || userMsg.toLowerCase().includes('budget')) {
        botResponse = "I see you're looking for budget options. We have several PGs starting at ₹6,000. Would you like me to filter them for you?";
      } else if (userMsg.toLowerCase().includes('rule') || userMsg.toLowerCase().includes('contract')) {
        botResponse = "You can generate a custom AI House Rulebook in the 'AI Match' tab. It balances habits between roommates automatically!";
      }

      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-primary-600 text-white rounded-full shadow-2xl shadow-primary-200 dark:shadow-primary-900/50 flex items-center justify-center hover:scale-110 transition-all z-[100] group"
      >
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
        <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />
      </button>
    );
  }

  return (
    <div className={`fixed right-6 z-[100] transition-all duration-300 ${isMinimized ? 'bottom-6 w-72' : 'bottom-6 w-96'}`}>
      <div className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col max-h-[600px] transition-colors">
        {/* Header */}
        <div className="bg-primary-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-black text-sm tracking-tight">StayMate Assistant</h3>
              <p className="text-[10px] opacity-80 font-bold uppercase tracking-widest">Always Active</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <Minus size={18} />
            </button>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div ref={scrollRef} className="flex-1 p-6 space-y-4 overflow-y-auto min-h-[300px] bg-gray-50/50 dark:bg-gray-950/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary-600 text-white rounded-tr-none' 
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-gray-700'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex gap-2 transition-colors">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
              <button 
                type="submit"
                className="bg-primary-600 text-white p-3 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-100 dark:shadow-none"
              >
                <Send size={18} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChatbot;
