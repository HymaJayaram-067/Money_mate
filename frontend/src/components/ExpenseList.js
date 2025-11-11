import React, { useState, useEffect } from 'react';
import { getExpenses, deleteExpense } from '../services/api';

const ExpenseList = ({ refresh }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, [refresh]);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await getExpenses();
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await deleteExpense(id);
        fetchExpenses();
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Failed to delete expense.');
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="card"><div className="loading">Loading expenses...</div></div>;
  }

  return (
    <div className="card">
      <h2>📝 Recent Expenses</h2>
      {expenses.length === 0 ? (
        <div className="empty-state">
          <p>No expenses yet. Start tracking your spending!</p>
        </div>
      ) : (
        <div className="expense-list">
          {expenses.map((expense) => (
            <div key={expense._id} className="expense-item">
              <div className="expense-info">
                <h3>{expense.description}</h3>
                <p>
                  <span className="category-badge">{expense.category}</span>
                  {formatDate(expense.date)} • {expense.paymentMethod}
                </p>
                {expense.notes && <p style={{ fontSize: '0.85rem', marginTop: '5px' }}>{expense.notes}</p>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="expense-amount">${expense.amount.toFixed(2)}</div>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDelete(expense._id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
