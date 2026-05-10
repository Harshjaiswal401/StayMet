import React, { useState, useEffect } from 'react';

const Roommates = ['You', 'Alex', 'Jordan', 'Sam'];

const ExpenseDashboard = () => {
  // Rent State
  const [rentAmount, setRentAmount] = useState(15000);
  const [dueDate, setDueDate] = useState('2023-10-05'); // Dummy past date to show late fee
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [lateFee, setLateFee] = useState(0);

  // Utility State
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Electricity', amount: 1200, paidBy: 'Alex', date: '2023-10-12' },
    { id: 2, category: 'Internet', amount: 999, paidBy: 'You', date: '2023-10-15' }
  ]);
  const [newExpense, setNewExpense] = useState({ category: 'Electricity', amount: '', paidBy: 'You' });

  useEffect(() => {
    // Calculate Late Fee if overdue
    if (paymentStatus === 'Pending') {
      const today = new Date();
      const due = new Date(dueDate);
      if (today > due) {
        const diffTime = Math.abs(today - due);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        // 100 Rs per day late fee
        setLateFee(diffDays * 100);
      } else {
        setLateFee(0);
      }
    } else {
      setLateFee(0);
    }
  }, [dueDate, paymentStatus]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.amount) return;
    
    setExpenses([...expenses, { 
      id: Date.now(), 
      category: newExpense.category, 
      amount: parseFloat(newExpense.amount), 
      paidBy: newExpense.paidBy,
      date: new Date().toISOString().split('T')[0]
    }]);
    setNewExpense({ ...newExpense, amount: '' });
  };

  // Calculate Who owes Whom
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const perPersonShare = totalExpenses / Roommates.length;

  const paidAmounts = Roommates.reduce((acc, person) => {
    acc[person] = expenses.filter(e => e.paidBy === person).reduce((sum, curr) => sum + curr.amount, 0);
    return acc;
  }, {});

  const balances = Roommates.map(person => ({
    name: person,
    balance: paidAmounts[person] - perPersonShare
  })).sort((a, b) => a.balance - b.balance);

  // Simple settling logic
  const settlements = [];
  let i = 0;
  let j = balances.length - 1;

  while (i < j) {
    const debtor = balances[i];
    const creditor = balances[j];

    if (debtor.balance >= -0.01) { i++; continue; }
    if (creditor.balance <= 0.01) { j--; continue; }

    const amount = Math.min(Math.abs(debtor.balance), creditor.balance);
    
    if (amount > 0.01) {
      settlements.push({
        from: debtor.name,
        to: creditor.name,
        amount: amount.toFixed(2)
      });
    }

    balances[i].balance += amount;
    balances[j].balance -= amount;

    if (Math.abs(balances[i].balance) < 0.01) i++;
    if (Math.abs(balances[j].balance) < 0.01) j--;
  }

  const categoryIcons = {
    Electricity: '⚡',
    Water: '💧',
    Gas: '🔥',
    Internet: '🌐',
    Maintenance: '🔧'
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Finance Dashboard</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">Track rent, split utilities, and see who owes whom effortlessly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Rent & Add Expense */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Rent Tracker Widget */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full -z-10"></div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="text-2xl mr-2">🏠</span> Rent Tracker
            </h3>
            
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Monthly Rent</p>
              <h4 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">₹{rentAmount.toLocaleString()}</h4>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Due Date</p>
                  <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="font-bold text-gray-900 dark:text-gray-100 bg-transparent border-none p-0 focus:ring-0 cursor-pointer" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Status</p>
                  <select 
                    value={paymentStatus} 
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className={`text-sm font-bold rounded-lg px-3 py-1 cursor-pointer appearance-none ${paymentStatus === 'Paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              {lateFee > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-xl flex items-start gap-3 animate-fade-in border border-red-100 dark:border-red-900/30">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <p className="font-bold text-sm">Overdue Warning</p>
                    <p className="text-xs mt-0.5 opacity-80">Late fee of ₹100/day applied.</p>
                    <p className="font-black mt-2 text-lg">+ ₹{lateFee}</p>
                  </div>
                </div>
              )}
            </div>
            
            <button className={`w-full py-4 rounded-2xl font-black transition-all uppercase tracking-widest text-xs ${paymentStatus === 'Paid' ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100 dark:shadow-none'}`}>
              {paymentStatus === 'Paid' ? 'Rent Settled' : 'Pay Total ₹' + (rentAmount + lateFee).toLocaleString()}
            </button>
          </div>

          {/* Add Expense Form */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="text-2xl mr-2">➕</span> Add Utility
            </h3>
            <form onSubmit={handleAddExpense} className="space-y-5">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Category</label>
                <select 
                  value={newExpense.category} 
                  onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700 focus:outline-none transition-all appearance-none text-gray-900 dark:text-white font-bold"
                >
                  <option value="Electricity">Electricity</option>
                  <option value="Water">Water</option>
                  <option value="Gas">Gas</option>
                  <option value="Internet">Internet</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Amount (₹)</label>
                <input 
                  type="number" 
                  required
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  placeholder="e.g. 1500"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700 focus:outline-none transition-all text-gray-900 dark:text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Paid By</label>
                <select 
                  value={newExpense.paidBy} 
                  onChange={(e) => setNewExpense({...newExpense, paidBy: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700 focus:outline-none transition-all appearance-none text-gray-900 dark:text-white font-bold"
                >
                  {Roommates.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black py-4 rounded-2xl transition-all shadow-lg active:scale-95 uppercase tracking-widest text-xs mt-2">
                Add Expense
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Splitter & History */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Who Owes Whom */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center tracking-tight">
                <span className="text-2xl mr-2">🤝</span> Settlement Plan
              </h3>
              <div className="text-right">
                <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Total Utilities</p>
                <p className="text-2xl font-black text-blue-600">₹{totalExpenses.toLocaleString()}</p>
              </div>
            </div>

            {totalExpenses === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                <p className="text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest text-xs">No expenses added yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-4 py-3 rounded-xl text-sm font-bold border border-blue-100 dark:border-blue-800/50">
                  <span>ℹ️</span> Every roommate's share is ₹{perPersonShare.toFixed(2)}
                </div>
                
                {settlements.length === 0 ? (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-2xl p-8 text-center">
                    <span className="text-4xl mb-4 block animate-bounce">🎉</span>
                    <h4 className="text-green-800 dark:text-green-400 font-black text-xl tracking-tight">All Settled Up!</h4>
                    <p className="text-green-600 dark:text-green-500 text-sm mt-1 font-medium">No one owes anything.</p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {settlements.map((s, idx) => {
                      const isYouDebtor = s.from === 'You';
                      
                      const sendNudge = () => {
                        const messages = [
                          `Hey ${s.from}! 🍕 My wallet is currently on a diet and it's starving for that ₹${s.amount} for utilities. Help a friend out?`,
                          `Yo ${s.from}, I don't want to be *that* person, but my bank account is looking at me with judgmental eyes. Could you settle the ₹${s.amount}? kthxbye! 🚀`,
                          `Greetings ${s.from}, our shared kingdom requires its tribute of ₹${s.amount} for the magical electricity/internet powers. Please deposit at your earliest convenience! 🏰`,
                          `Hey! Quick nudge for the ₹${s.amount} utility split. Let's keep the good vibes (and the lights) on! ✨`
                        ];
                        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
                        const encodedMsg = encodeURIComponent(randomMsg);
                        window.open(`https://wa.me/?text=${encodedMsg}`, '_blank');
                      };

                      return (
                        <li key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all hover:bg-white dark:hover:bg-gray-800 group shadow-sm">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full font-black flex items-center justify-center text-lg ${isYouDebtor ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                              {s.from.charAt(0)}
                            </div>
                            <div>
                              <p className="font-black text-gray-900 dark:text-white">{s.from} <span className="text-gray-400 dark:text-gray-500 font-bold mx-1 lowercase">owes</span> {s.to}</p>
                              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest">Settlement Required</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-black text-gray-900 dark:text-white text-lg tracking-tighter">₹{s.amount}</p>
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${isYouDebtor ? 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400' : 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'}`}>
                                {isYouDebtor ? 'You Owe' : 'To Receive'}
                              </span>
                            </div>
                            {!isYouDebtor && (
                              <button 
                                onClick={sendNudge}
                                className="opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl shadow-lg shadow-green-100 dark:shadow-none flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"
                                title="Send AI Nudge"
                              >
                                <span>Nudge</span>
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.628 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.411z" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Expense History List */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="text-2xl mr-2">📋</span> Recent Utilities
            </h3>
            
            {expenses.length === 0 ? (
              <p className="text-center text-gray-400 dark:text-gray-500 py-8 font-bold uppercase tracking-widest text-xs">No records found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <th className="pb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Date</th>
                      <th className="pb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Category</th>
                      <th className="pb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Paid By</th>
                      <th className="pb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {expenses.slice().reverse().map(exp => (
                      <tr key={exp.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                        <td className="py-4 text-xs font-bold text-gray-500 dark:text-gray-400">{exp.date}</td>
                        <td className="py-4">
                          <div className="flex items-center font-black text-gray-900 dark:text-white text-sm">
                            <span className="mr-2 text-lg">{categoryIcons[exp.category] || '📦'}</span>
                            {exp.category}
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${exp.paidBy === 'You' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'}`}>
                            {exp.paidBy}
                          </span>
                        </td>
                        <td className="py-4 text-right font-black text-gray-900 dark:text-white text-base tracking-tighter">
                          ₹{exp.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExpenseDashboard;
