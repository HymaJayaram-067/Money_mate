import React, { useState, useEffect } from 'react';
import { getBudgetStatus, createBudget, deleteBudget, updateBudget } from '../services/api';

const BudgetManager = ({ refresh }) => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [formData, setFormData] = useState({
    category: 'Food',
    limit: '',
    period: 'monthly',
    alert: true,
    alertThreshold: 80
  });

  const categories = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other'];

  useEffect(() => {
    fetchBudgets();
  }, [refresh]);

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const response = await getBudgetStatus();
      setBudgets(response.data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBudget) {
        // Update existing budget
        await updateBudget(editingBudget._id, {
          ...formData,
          limit: parseFloat(formData.limit)
        });
      } else {
        // Create new budget
        await createBudget({
          ...formData,
          limit: parseFloat(formData.limit)
        });
      }
      setFormData({
        category: 'Food',
        limit: '',
        period: 'monthly',
        alert: true,
        alertThreshold: 80
      });
      setShowForm(false);
      setEditingBudget(null);
      fetchBudgets();
    } catch (error) {
      console.error('Error saving budget:', error);
      alert(editingBudget ? 'Failed to update budget.' : 'Failed to create budget. Category might already exist.');
    }
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setFormData({
      category: budget.category,
      limit: budget.limit,
      period: budget.period,
      alert: budget.alert !== undefined ? budget.alert : true,
      alertThreshold: budget.alertThreshold || 80
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBudget(null);
    setFormData({
      category: 'Food',
      limit: '',
      period: 'monthly',
      alert: true,
      alertThreshold: 80
    });
  };

  const handleDelete = async (category) => {
    if (window.confirm(`Delete budget for ${category}?`)) {
      try {
        const budget = budgets.find(b => b.category === category);
        if (budget && budget._id) {
          await deleteBudget(budget._id);
          fetchBudgets();
        }
      } catch (error) {
        console.error('Error deleting budget:', error);
      }
    }
  };

  if (loading) {
    return <div className="card"><div className="loading">Loading budgets...</div></div>;
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>🎯 Budget Tracker</h2>
        <button 
          className="btn" 
          onClick={() => {
            if (showForm && !editingBudget) {
              handleCancel();
            } else if (!showForm) {
              setShowForm(true);
            } else {
              handleCancel();
            }
          }}
          style={{ padding: '8px 20px', fontSize: '0.9rem' }}
        >
          {showForm ? 'Cancel' : '+ Add Budget'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
          <h3 style={{ marginTop: '0', marginBottom: '15px' }}>{editingBudget ? 'Edit Budget' : 'Create Budget'}</h3>
          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              disabled={editingBudget !== null}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {editingBudget && <small style={{ color: '#666', fontSize: '0.85rem' }}>Category cannot be changed when editing</small>}
          </div>
          <div className="form-group">
            <label>Budget Limit ($)</label>
            <input
              type="number"
              value={formData.limit}
              onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label>Period</label>
            <select
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <button type="submit" className="btn">{editingBudget ? 'Update Budget' : 'Create Budget'}</button>
        </form>
      )}

      {budgets.length === 0 ? (
        <div className="empty-state">
          <p>No budgets set yet. Create one to start tracking!</p>
        </div>
      ) : (
        <div>
          {budgets.map((budget) => (
            <div key={budget.category} className="budget-item">
              <div className="budget-header">
                <h3>{budget.category}</h3>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>
                    {budget.period}
                  </span>
                  <button 
                    className="btn" 
                    onClick={() => handleEdit(budget)}
                    style={{ padding: '5px 12px', fontSize: '0.85rem', background: '#2196F3' }}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn" 
                    onClick={() => handleDelete(budget.category)}
                    style={{ padding: '5px 12px', fontSize: '0.85rem', background: '#f5576c' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Spent: ${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}</span>
                <span style={{ fontWeight: 'bold', color: budget.percentUsed >= budget.alertThreshold ? '#f5576c' : '#4caf50' }}>
                  {budget.percentUsed}%
                </span>
              </div>
              <div className="budget-progress">
                <div 
                  className={`budget-progress-bar ${budget.percentUsed >= budget.alertThreshold ? 'warning' : ''}`}
                  style={{ width: `${Math.min(budget.percentUsed, 100)}%` }}
                />
              </div>
              {budget.alert && (
                <div className="alert" style={{ marginTop: '10px' }}>
                  ⚠️ You've used {budget.percentUsed}% of your {budget.category} budget!
                </div>
              )}
              <div style={{ marginTop: '10px' }}>
                <span style={{ color: budget.remaining >= 0 ? '#4caf50' : '#f5576c', fontWeight: 'bold' }}>
                  {budget.remaining >= 0 ? `$${budget.remaining.toFixed(2)} remaining` : `$${Math.abs(budget.remaining).toFixed(2)} over budget`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BudgetManager;
