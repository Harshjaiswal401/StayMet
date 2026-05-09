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
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Finance Dashboard</h2>
        <p className="text-lg text-gray-500">Track rent, split utilities, and see who owes whom effortlessly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Rent & Add Expense */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Rent Tracker Widget */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-10"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-2">🏠</span> Rent Tracker
            </h3>
            
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-500 mb-1">Monthly Rent</p>
              <h4 className="text-4xl font-black text-gray-900">₹{rentAmount.toLocaleString()}</h4>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div>
                  <p className="text-sm font-semibold text-gray-500">Due Date</p>
                  <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="font-bold text-gray-900 bg-transparent border-none p-0 focus:ring-0 cursor-pointer" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Status</p>
                  <select 
                    value={paymentStatus} 
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className={`text-sm font-bold rounded-lg px-3 py-1 cursor-pointer appearance-none ${paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              {lateFee > 0 && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-start gap-3 animate-fade-in border border-red-100">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <p className="font-bold text-sm">Overdue Warning</p>
                    <p className="text-xs mt-0.5">Late fee of ₹100/day applied.</p>
                    <p className="font-black mt-2 text-lg">+ ₹{lateFee}</p>
                  </div>
                </div>
              )}
            </div>
            
            <button className={`w-full py-3 rounded-xl font-bold transition-all ${paymentStatus === 'Paid' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'}`}>
              {paymentStatus === 'Paid' ? 'Rent Settled' : 'Pay Total ₹' + (rentAmount + lateFee).toLocaleString()}
            </button>
          </div>

          {/* Add Expense Form */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-2">➕</span> Add Utility
            </h3>
            <form onSubmit={handleAddExpense} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select 
                  value={newExpense.category} 
                  onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all appearance-none"
                >
                  <option value="Electricity">Electricity</option>
                  <option value="Water">Water</option>
                  <option value="Gas">Gas</option>
                  <option value="Internet">Internet</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (₹)</label>
                <input 
                  type="number" 
                  required
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  placeholder="e.g. 1500"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Paid By</label>
                <select 
                  value={newExpense.paidBy} 
                  onChange={(e) => setNewExpense({...newExpense, paidBy: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all appearance-none"
                >
                  {Roommates.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-xl transition-all shadow-sm mt-2">
                Add Expense
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Splitter & History */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Who Owes Whom */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 bg-gradient-to-br from-white to-gray-50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="text-2xl mr-2">🤝</span> Settlement Plan
              </h3>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-500">Total Utilities</p>
                <p className="text-xl font-black text-blue-600">₹{totalExpenses.toLocaleString()}</p>
              </div>
            </div>

            {totalExpenses === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 font-medium">No expenses added yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold">
                  <span>ℹ️</span> Every roommate's share is ₹{perPersonShare.toFixed(2)}
                </div>
                
                {settlements.length === 0 ? (
                  <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center">
                    <span className="text-3xl mb-2 block">🎉</span>
                    <h4 className="text-green-800 font-bold text-lg">All Settled Up!</h4>
                    <p className="text-green-600 text-sm mt-1">No one owes anything.</p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {settlements.map((s, idx) => (
                      <li key={idx} className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center">
                            {s.from.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{s.from} <span className="text-gray-400 font-medium mx-1">owes</span> {s.to}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-gray-900">₹{s.amount}</p>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.from === 'You' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                            {s.from === 'You' ? 'Action Req' : 'Pending'}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Expense History List */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-2">📋</span> Recent Utilities
            </h3>
            
            {expenses.length === 0 ? (
              <p className="text-center text-gray-400 py-4 font-medium">No records found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-3 text-sm font-bold text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="pb-3 text-sm font-bold text-gray-400 uppercase tracking-wider">Category</th>
                      <th className="pb-3 text-sm font-bold text-gray-400 uppercase tracking-wider">Paid By</th>
                      <th className="pb-3 text-sm font-bold text-gray-400 uppercase tracking-wider text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {expenses.slice().reverse().map(exp => (
                      <tr key={exp.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 text-sm font-semibold text-gray-600">{exp.date}</td>
                        <td className="py-4">
                          <div className="flex items-center font-bold text-gray-900">
                            <span className="mr-2 text-lg">{categoryIcons[exp.category] || '📦'}</span>
                            {exp.category}
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold ${exp.paidBy === 'You' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}>
                            {exp.paidBy}
                          </span>
                        </td>
                        <td className="py-4 text-right font-black text-gray-900">
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
