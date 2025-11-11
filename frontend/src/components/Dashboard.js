import React, { useState, useEffect } from 'react';
import { getInsights } from '../services/api';

const Dashboard = ({ refresh }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('monthly');

  useEffect(() => {
    fetchInsights();
  }, [period, refresh]);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const response = await getInsights(period);
      setInsights(response.data);
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="card"><div className="loading">Loading insights...</div></div>;
  }

  if (!insights) {
    return <div className="card"><div className="empty-state">No data available</div></div>;
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>📊 Spending Insights</h2>
        <select 
          value={period} 
          onChange={(e) => setPeriod(e.target.value)}
          style={{ padding: '8px', borderRadius: '5px', border: '2px solid #e0e0e0' }}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Spent</h3>
          <p>${insights.totalSpent.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Transactions</h3>
          <p>{insights.transactionCount}</p>
        </div>
        <div className="stat-card">
          <h3>Average/Transaction</h3>
          <p>${insights.averageExpense}</p>
        </div>
        {insights.topCategory && (
          <div className="stat-card">
            <h3>Top Category</h3>
            <p style={{ fontSize: '1.2rem' }}>{insights.topCategory.category}</p>
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3 style={{ marginBottom: '15px' }}>💡 AI-Generated Insights</h3>
        <ul className="insights-list">
          {insights.insights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      </div>

      {insights.categoryTotals && Object.keys(insights.categoryTotals).length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ marginBottom: '15px' }}>📈 Category Breakdown</h3>
          {Object.entries(insights.categoryTotals)
            .sort((a, b) => b[1] - a[1])
            .map(([category, amount]) => (
              <div key={category} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span>{category}</span>
                  <span style={{ fontWeight: 'bold' }}>${amount.toFixed(2)}</span>
                </div>
                <div className="budget-progress">
                  <div 
                    className="budget-progress-bar"
                    style={{ 
                      width: `${(amount / insights.totalSpent) * 100}%` 
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
