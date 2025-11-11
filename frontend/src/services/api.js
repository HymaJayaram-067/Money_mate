import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Expenses
export const getExpenses = () => api.get('/expenses');
export const createExpense = (expense) => api.post('/expenses', expense);
export const updateExpense = (id, expense) => api.put(`/expenses/${id}`, expense);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);

// Budgets
export const getBudgets = () => api.get('/budgets');
export const getBudgetStatus = () => api.get('/budgets/status');
export const createBudget = (budget) => api.post('/budgets', budget);
export const updateBudget = (id, budget) => api.put(`/budgets/${id}`, budget);
export const deleteBudget = (id) => api.delete(`/budgets/${id}`);

// Insights
export const getInsights = (period = 'monthly') => api.get(`/insights?period=${period}`);
export const getCategoryInsights = () => api.get('/insights/categories');
export const getTrends = () => api.get('/insights/trends');

export default api;
