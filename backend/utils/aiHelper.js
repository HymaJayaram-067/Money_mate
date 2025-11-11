// Simple AI-based categorization logic
// In a production app, this could use ML models or external APIs

const categoryKeywords = {
  'Food': ['restaurant', 'cafe', 'coffee', 'food', 'grocery', 'lunch', 'dinner', 'breakfast', 'pizza', 'burger', 'meal'],
  'Transportation': ['uber', 'taxi', 'gas', 'fuel', 'parking', 'bus', 'train', 'metro', 'flight', 'car'],
  'Entertainment': ['movie', 'netflix', 'spotify', 'game', 'concert', 'theater', 'music', 'streaming'],
  'Shopping': ['amazon', 'shop', 'store', 'mall', 'clothing', 'shoes', 'electronics', 'furniture'],
  'Bills': ['electricity', 'water', 'internet', 'phone', 'rent', 'mortgage', 'insurance', 'subscription'],
  'Healthcare': ['hospital', 'doctor', 'medicine', 'pharmacy', 'clinic', 'dental', 'medical'],
  'Education': ['school', 'course', 'book', 'tuition', 'university', 'college', 'training'],
};

function categorizeExpense(description) {
  const lowerDesc = description.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => lowerDesc.includes(keyword))) {
      return category;
    }
  }
  
  return 'Other';
}

function generateInsights(expenses) {
  const categoryTotals = {};
  let totalSpent = 0;

  expenses.forEach(expense => {
    totalSpent += expense.amount;
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
  });

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  const averageExpense = expenses.length > 0 ? totalSpent / expenses.length : 0;

  return {
    totalSpent,
    categoryTotals,
    topCategory: topCategory ? { category: topCategory[0], amount: topCategory[1] } : null,
    averageExpense: averageExpense.toFixed(2),
    transactionCount: expenses.length,
    insights: generateSpendingTips(categoryTotals, totalSpent)
  };
}

function generateSpendingTips(categoryTotals, totalSpent) {
  const tips = [];
  
  for (const [category, amount] of Object.entries(categoryTotals)) {
    const percentage = (amount / totalSpent) * 100;
    
    if (percentage > 40) {
      tips.push(`💡 ${category} expenses are ${percentage.toFixed(1)}% of your total spending. Consider budgeting here.`);
    }
  }

  if (tips.length === 0) {
    tips.push('✅ Your spending is well distributed across categories!');
  }

  return tips;
}

module.exports = {
  categorizeExpense,
  generateInsights
};
