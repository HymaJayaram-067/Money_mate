const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { generateInsights } = require('../utils/aiHelper');

// Get spending insights
router.get('/', async (req, res) => {
  try {
    const { period = 'monthly' } = req.query;
    const now = new Date();
    let startDate;

    switch (period) {
      case 'daily':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'weekly':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'monthly':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'yearly':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0);
    }

    const expenses = await Expense.find({
      date: { $gte: startDate }
    });

    const insights = generateInsights(expenses);
    res.json({
      period,
      startDate,
      endDate: new Date(),
      ...insights
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get category-wise breakdown
router.get('/categories', async (req, res) => {
  try {
    const expenses = await Expense.find();
    const categoryData = {};

    expenses.forEach(expense => {
      if (!categoryData[expense.category]) {
        categoryData[expense.category] = {
          total: 0,
          count: 0,
          transactions: []
        };
      }
      categoryData[expense.category].total += expense.amount;
      categoryData[expense.category].count += 1;
      categoryData[expense.category].transactions.push({
        description: expense.description,
        amount: expense.amount,
        date: expense.date
      });
    });

    res.json(categoryData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get spending trends (monthly comparison)
router.get('/trends', async (req, res) => {
  try {
    const expenses = await Expense.find();
    const monthlyData = {};

    expenses.forEach(expense => {
      const monthYear = new Date(expense.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = 0;
      }
      monthlyData[monthYear] += expense.amount;
    });

    const trends = Object.entries(monthlyData).map(([month, amount]) => ({
      month,
      amount
    }));

    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
