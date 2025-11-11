import React, { useState } from 'react';
import { createExpense } from '../services/api';

const ExpenseForm = ({ onExpenseAdded }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    paymentMethod: 'Cash',
    notes: ''
  });

  const [loading, setLoading] = useState(false);

  const categories = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createExpense({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      setFormData({
        description: '',
        amount: '',
        category: '',
        paymentMethod: 'Cash',
        notes: ''
      });
      if (onExpenseAdded) onExpenseAdded();
    } catch (error) {
      console.error('Error creating expense:', error);
      alert('Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>💰 Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Description *</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="e.g., Lunch at restaurant"
          />
        </div>

        <div className="form-group">
          <label>Amount ($) *</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>

        <div className="form-group">
          <label>Category (AI auto-detects if left empty)</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">-- AI Auto-Categorize --</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Add any additional notes..."
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Adding...' : '✨ Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
