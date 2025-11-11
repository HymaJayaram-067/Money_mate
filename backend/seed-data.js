// Sample data seeder for testing MoneyMate
// Run this to populate the database with example data
// Usage: node seed-data.js

require('dotenv').config();
const mongoose = require('mongoose');
const Expense = require('./models/Expense');
const Budget = require('./models/Budget');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/moneymate';

// Sample expenses
const sampleExpenses = [
  {
    description: 'Lunch at Chipotle',
    amount: 12.50,
    category: 'Food',
    date: new Date('2025-01-15'),
    paymentMethod: 'Credit Card',
    notes: 'Quick lunch'
  },
  {
    description: 'Uber to office',
    amount: 15.00,
    category: 'Transportation',
    date: new Date('2025-01-16'),
    paymentMethod: 'UPI',
    notes: 'Morning commute'
  },
  {
    description: 'Netflix subscription',
    amount: 15.99,
    category: 'Entertainment',
    date: new Date('2025-01-10'),
    paymentMethod: 'Credit Card',
    notes: 'Monthly subscription'
  },
  {
    description: 'Groceries at Whole Foods',
    amount: 85.30,
    category: 'Food',
    date: new Date('2025-01-12'),
    paymentMethod: 'Debit Card',
    notes: 'Weekly groceries'
  },
  {
    description: 'Coffee at Starbucks',
    amount: 5.50,
    category: 'Food',
    date: new Date('2025-01-17'),
    paymentMethod: 'Cash',
    notes: 'Morning coffee'
  },
  {
    description: 'Gas station',
    amount: 45.00,
    category: 'Transportation',
    date: new Date('2025-01-14'),
    paymentMethod: 'Credit Card',
    notes: 'Fuel'
  },
  {
    description: 'Movie tickets',
    amount: 25.00,
    category: 'Entertainment',
    date: new Date('2025-01-13'),
    paymentMethod: 'Credit Card',
    notes: 'Weekend movie'
  },
  {
    description: 'Amazon purchase - books',
    amount: 35.99,
    category: 'Shopping',
    date: new Date('2025-01-11'),
    paymentMethod: 'Credit Card',
    notes: 'Programming books'
  },
  {
    description: 'Electricity bill',
    amount: 120.00,
    category: 'Bills',
    date: new Date('2025-01-05'),
    paymentMethod: 'Debit Card',
    notes: 'Monthly bill'
  },
  {
    description: 'Doctor appointment',
    amount: 50.00,
    category: 'Healthcare',
    date: new Date('2025-01-08'),
    paymentMethod: 'Credit Card',
    notes: 'Checkup'
  },
  {
    description: 'Online course - Udemy',
    amount: 29.99,
    category: 'Education',
    date: new Date('2025-01-09'),
    paymentMethod: 'Credit Card',
    notes: 'Web development course'
  },
  {
    description: 'Dinner at restaurant',
    amount: 65.00,
    category: 'Food',
    date: new Date('2025-01-18'),
    paymentMethod: 'Credit Card',
    notes: 'Date night'
  },
  {
    description: 'Gym membership',
    amount: 40.00,
    category: 'Healthcare',
    date: new Date('2025-01-01'),
    paymentMethod: 'Debit Card',
    notes: 'Monthly membership'
  },
  {
    description: 'Phone bill',
    amount: 55.00,
    category: 'Bills',
    date: new Date('2025-01-06'),
    paymentMethod: 'Debit Card',
    notes: 'Monthly phone bill'
  },
  {
    description: 'Concert tickets',
    amount: 75.00,
    category: 'Entertainment',
    date: new Date('2025-01-20'),
    paymentMethod: 'Credit Card',
    notes: 'Music concert'
  }
];

// Sample budgets
const sampleBudgets = [
  {
    category: 'Food',
    limit: 400,
    period: 'monthly',
    alert: true,
    alertThreshold: 80
  },
  {
    category: 'Transportation',
    limit: 200,
    period: 'monthly',
    alert: true,
    alertThreshold: 80
  },
  {
    category: 'Entertainment',
    limit: 150,
    period: 'monthly',
    alert: true,
    alertThreshold: 75
  },
  {
    category: 'Shopping',
    limit: 100,
    period: 'monthly',
    alert: true,
    alertThreshold: 80
  },
  {
    category: 'Bills',
    limit: 300,
    period: 'monthly',
    alert: false,
    alertThreshold: 90
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Expense.deleteMany({});
    await Budget.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Insert sample expenses
    console.log('💰 Inserting sample expenses...');
    const expenses = await Expense.insertMany(sampleExpenses);
    console.log(`✅ Inserted ${expenses.length} expenses\n`);

    // Insert sample budgets
    console.log('🎯 Inserting sample budgets...');
    const budgets = await Budget.insertMany(sampleBudgets);
    console.log(`✅ Inserted ${budgets.length} budgets\n`);

    // Display summary
    console.log('📊 Summary:');
    console.log('='.repeat(50));
    console.log(`Total Expenses: ${expenses.length}`);
    console.log(`Total Budgets: ${budgets.length}`);
    
    const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    console.log(`Total Amount Spent: $${totalAmount.toFixed(2)}`);
    
    console.log('\nCategory Breakdown:');
    const categoryTotals = {};
    expenses.forEach(exp => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });
    Object.entries(categoryTotals).forEach(([cat, amount]) => {
      console.log(`  ${cat}: $${amount.toFixed(2)}`);
    });

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nYou can now start the application and see the sample data.\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
  }
}

// Run the seeder
seedDatabase();
