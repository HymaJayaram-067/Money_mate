# 🚀 Getting Started with MoneyMate

This guide will help you get MoneyMate up and running on your local machine in minutes!

## Prerequisites Check

Before you begin, make sure you have:

- ✅ **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- ✅ **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- ✅ **npm** (comes with Node.js) or **yarn**

### Verify Installation

Open your terminal and run:

```bash
node --version  # Should show v14 or higher
npm --version   # Should show 6 or higher
mongod --version # Should show MongoDB server version
```

## Quick Start (5 Minutes)

### Option 1: Automated Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/HymaJayaram-067/Money_mate.git
   cd Money_mate
   ```

2. **Run the quick start script**
   ```bash
   chmod +x start.sh
   ./start.sh
   ```

   This script will:
   - Check if Node.js is installed
   - Set up the backend
   - Set up the frontend
   - Start both servers
   - Open the app in your browser

3. **Access the app**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Option 2: Manual Setup

#### Step 1: Start MongoDB

```bash
# On macOS/Linux
sudo systemctl start mongod

# Or just run
mongod

# On Windows
# MongoDB should start automatically, or use:
net start MongoDB
```

#### Step 2: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# (Optional) Edit .env if needed
# nano .env

# Start the backend server
npm start
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server is running on port 5000
```

#### Step 3: Setup Frontend

Open a **new terminal window**:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React app
npm start
```

The app will automatically open at http://localhost:3000

## First Steps in the App

### 1. Add Your First Expense

1. In the "Add New Expense" card:
   - Description: "Coffee at Starbucks"
   - Amount: 5.50
   - Leave Category blank (AI will categorize it)
   - Payment Method: Credit Card
   - Click "✨ Add Expense"

2. Watch the AI automatically categorize it as "Food"!

### 2. Create a Budget

1. In the "Budget Tracker" card:
   - Click "+ Add Budget"
   - Category: Food
   - Budget Limit: 200
   - Period: Monthly
   - Click "Create Budget"

2. See the budget tracker show your progress!

### 3. View Insights

Check the "Spending Insights" dashboard to see:
- Total spending
- Number of transactions
- Average expense
- AI-generated tips

## Populate with Sample Data (Optional)

Want to see the app with realistic data?

```bash
cd backend
npm run seed
```

This will add 15 sample expenses and 5 budgets to test the app.

## Testing the AI Features

```bash
cd backend
npm run test:ai
```

This will demonstrate:
- AI categorization with various expense descriptions
- Insight generation
- Spending analysis

## Common Setup Issues

### MongoDB Not Running

**Error**: `MongoServerError: connect ECONNREFUSED`

**Solution**:
```bash
# Start MongoDB
sudo systemctl start mongod

# Or on macOS with Homebrew
brew services start mongodb-community
```

### Port Already in Use

**Error**: `Port 5000 is already in use`

**Solution**: Change the port in `backend/.env`:
```env
PORT=5001
```

**Error**: `Port 3000 is already in use`

**Solution**: When prompted, choose 'Y' to run on a different port, or:
```bash
PORT=3001 npm start
```

### Module Not Found

**Error**: `Cannot find module 'express'`

**Solution**: Install dependencies:
```bash
npm install
```

## Project Structure Overview

```
Money_mate/
├── backend/              # Node.js/Express API
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── utils/           # AI helpers
│   ├── server.js        # Main server
│   ├── seed-data.js     # Sample data
│   └── test-ai.js       # AI tests
│
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API calls
│   │   └── App.js       # Main app
│   └── public/
│
├── README.md            # Main documentation
├── DEPLOYMENT.md        # Deployment guide
├── API.md              # API documentation
└── start.sh            # Quick start script
```

## Next Steps

Now that you're set up, you can:

1. **Learn the Features**: Read [FEATURES.md](FEATURES.md)
2. **Explore the API**: Read [API.md](API.md)
3. **Deploy the App**: Read [DEPLOYMENT.md](DEPLOYMENT.md)
4. **Contribute**: Read [CONTRIBUTING.md](CONTRIBUTING.md)

## Development Tips

### Backend Development

```bash
cd backend

# Start with auto-reload (using nodemon)
npm run dev

# Run AI tests
npm run test:ai

# Seed sample data
npm run seed
```

### Frontend Development

```bash
cd frontend

# Start dev server
npm start

# Build for production
npm run build
```

### View Database

**Option 1**: Use MongoDB Compass (GUI)
- Download: https://www.mongodb.com/products/compass
- Connect to: `mongodb://localhost:27017`
- Database: `moneymate`

**Option 2**: Use MongoDB shell
```bash
mongo
use moneymate
db.expenses.find()
db.budgets.find()
```

## API Testing

You can test the API using:

**1. Browser** - Visit http://localhost:5000/api/health

**2. cURL**
```bash
# Health check
curl http://localhost:5000/api/health

# Get expenses
curl http://localhost:5000/api/expenses

# Create expense
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"description":"Test","amount":10,"category":"Food"}'
```

**3. Postman** - Import endpoints from [API.md](API.md)

## Stopping the Application

**Frontend**: Press `Ctrl + C` in the terminal

**Backend**: Press `Ctrl + C` in the terminal

**MongoDB** (if you want to stop it):
```bash
sudo systemctl stop mongod
```

## Getting Help

- **Issues**: Check [GitHub Issues](https://github.com/HymaJayaram-067/Money_mate/issues)
- **Documentation**: See [README.md](README.md)
- **API Reference**: See [API.md](API.md)
- **Security**: See [SECURITY.md](SECURITY.md)

## What's Next?

✅ You're all set! Start tracking your expenses and enjoy MoneyMate!

Some ideas to try:
- Add various types of expenses to see AI categorization
- Set budgets for different categories
- Check insights after adding multiple expenses
- Try different time periods in the dashboard
- Look at the category breakdown

Happy budgeting! 💰✨
