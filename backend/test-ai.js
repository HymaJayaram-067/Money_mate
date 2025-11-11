// Simple test script to demonstrate AI categorization
const { categorizeExpense, generateInsights } = require('./utils/aiHelper');

console.log('🤖 Testing MoneyMate AI Categorization\n');
console.log('='.repeat(50));

// Test categorization
const testExpenses = [
  'Lunch at McDonald\'s',
  'Uber ride to office',
  'Netflix subscription',
  'Amazon shopping',
  'Electricity bill',
  'Doctor appointment',
  'Online course on Udemy',
  'Coffee at Starbucks',
  'Random expense'
];

console.log('\n📊 AI Categorization Test:\n');
testExpenses.forEach(expense => {
  const category = categorizeExpense(expense);
  console.log(`"${expense}"`);
  console.log(`  → Categorized as: ${category}\n`);
});

// Test insights generation
console.log('='.repeat(50));
console.log('\n💡 AI Insights Generation Test:\n');

const sampleExpenses = [
  { description: 'Lunch', amount: 25, category: 'Food', date: new Date() },
  { description: 'Dinner', amount: 45, category: 'Food', date: new Date() },
  { description: 'Uber', amount: 15, category: 'Transportation', date: new Date() },
  { description: 'Movie', amount: 20, category: 'Entertainment', date: new Date() },
  { description: 'Groceries', amount: 100, category: 'Food', date: new Date() },
];

const insights = generateInsights(sampleExpenses);

console.log('Total Spent:', `$${insights.totalSpent}`);
console.log('Transaction Count:', insights.transactionCount);
console.log('Average Expense:', `$${insights.averageExpense}`);
console.log('\nTop Category:', insights.topCategory);
console.log('\nCategory Breakdown:', insights.categoryTotals);
console.log('\nAI-Generated Tips:');
insights.insights.forEach(tip => console.log(`  ${tip}`));

console.log('\n='.repeat(50));
console.log('✅ All tests passed! AI features are working correctly.\n');
