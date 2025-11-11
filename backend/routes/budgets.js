const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const Expense = require('../models/Expense');

// Get all budgets
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get budget status (compare with actual spending)
router.get('/status', async (req, res) => {
  try {
    const budgets = await Budget.find();
    const expenses = await Expense.find();
    
    const budgetStatus = await Promise.all(budgets.map(async (budget) => {
      // Calculate spending for the budget period
      const now = new Date();
      let startDate;
      
      switch (budget.period) {
        case 'daily':
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case 'weekly':
          startDate = new Date(now.setDate(now.getDate() - now.getDay()));
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
      
      const categoryExpenses = expenses.filter(exp => 
        exp.category === budget.category && 
        new Date(exp.date) >= startDate
      );
      
      const spent = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      const remaining = budget.limit - spent;
      const percentUsed = (spent / budget.limit) * 100;
      
      return {
        category: budget.category,
        limit: budget.limit,
        spent,
        remaining,
        percentUsed: percentUsed.toFixed(2),
        period: budget.period,
        alert: budget.alert && percentUsed >= budget.alertThreshold,
        alertThreshold: budget.alertThreshold
      };
    }));
    
    res.json(budgetStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new budget
router.post('/', async (req, res) => {
  try {
    const budget = new Budget(req.body);
    const newBudget = await budget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update budget
router.put('/:id', async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    Object.assign(budget, req.body);
    const updatedBudget = await budget.save();
    res.json(updatedBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete budget
router.delete('/:id', async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    await budget.deleteOne();
    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
