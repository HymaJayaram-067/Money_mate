import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';
import BudgetManager from './components/BudgetManager';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleExpenseAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>💸 MoneyMate</h1>
        <p>AI-Powered Personal Finance Manager - Track, Budget, and Optimize Your Spending</p>
      </header>

      <div className="main-content">
        <ExpenseForm onExpenseAdded={handleExpenseAdded} />
        <Dashboard refresh={refreshKey} />
      </div>

      <div className="main-content">
        <ExpenseList refresh={refreshKey} />
        <BudgetManager refresh={refreshKey} />
      </div>
    </div>
  );
}

export default App;
