# 💸 MoneyMate - AI-Powered Personal Finance App

MoneyMate is a modern, full-stack personal finance management application built with React, Node.js, Express, and MongoDB. It helps you track expenses, manage budgets, and get AI-powered insights into your spending habits.

## ✨ Features

- **📊 Expense Tracking**: Easy-to-use interface for logging daily expenses
- **🤖 AI Smart Categorization**: Automatically categorizes expenses based on description
- **🎯 Budget Management**: Set and track budgets for different spending categories
- **💡 Personalized Insights**: Get AI-driven spending insights and recommendations
- **📈 Visual Analytics**: View spending trends and category breakdowns
- **⚡ Real-time Updates**: Instant feedback on budget status and spending patterns
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern UI with hooks and functional components
- **Axios**: HTTP client for API requests
- **Recharts**: Data visualization (optional)
- **CSS3**: Custom responsive styling

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for data persistence
- **Mongoose**: ODM for MongoDB

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/HymaJayaram-067/Money_mate.git
cd Money_mate
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your MongoDB connection string
# Default: MONGODB_URI=mongodb://localhost:27017/moneymate

# Start the backend server
npm start
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will open automatically at `http://localhost:3000`

## 📁 Project Structure

```
Money_mate/
├── backend/
│   ├── models/
│   │   ├── Expense.js       # Expense data model
│   │   └── Budget.js        # Budget data model
│   ├── routes/
│   │   ├── expenses.js      # Expense API endpoints
│   │   ├── budgets.js       # Budget API endpoints
│   │   └── insights.js      # Insights API endpoints
│   ├── utils/
│   │   └── aiHelper.js      # AI categorization logic
│   ├── server.js            # Express server setup
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── ExpenseForm.js      # Add expense form
    │   │   ├── ExpenseList.js      # Display expenses
    │   │   ├── Dashboard.js        # Insights dashboard
    │   │   └── BudgetManager.js    # Budget management
    │   ├── services/
    │   │   └── api.js              # API service layer
    │   ├── App.js                  # Main app component
    │   ├── index.js                # React entry point
    │   └── index.css               # Global styles
    └── package.json
```

## 🎯 Usage Guide

### Adding Expenses

1. Fill in the expense form with:
   - Description (e.g., "Lunch at restaurant")
   - Amount
   - Category (optional - AI will auto-categorize)
   - Payment method
   - Notes (optional)

2. Click "Add Expense" to save

### Managing Budgets

1. Click "+ Add Budget" in the Budget Tracker
2. Select a category and set a limit
3. Choose the time period (daily/weekly/monthly/yearly)
4. Monitor your spending against the budget
5. Get alerts when approaching budget limits

### Viewing Insights

- The Dashboard shows:
  - Total spending
  - Transaction count
  - Average expense
  - Top spending category
  - AI-generated spending tips
  - Category breakdown

## 🔌 API Endpoints

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Budgets
- `GET /api/budgets` - Get all budgets
- `GET /api/budgets/status` - Get budget status with spending
- `POST /api/budgets` - Create new budget
- `PUT /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget

### Insights
- `GET /api/insights?period=monthly` - Get spending insights
- `GET /api/insights/categories` - Get category breakdown
- `GET /api/insights/trends` - Get spending trends

## 🌐 Deployment

### Backend Deployment (e.g., Heroku, Railway)

1. Set environment variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=production
   ```

2. Deploy using your platform's CLI or dashboard

### Frontend Deployment (e.g., Vercel, Netlify)

1. Set environment variable:
   ```
   REACT_APP_API_URL=your_backend_url/api
   ```

2. Build the production version:
   ```bash
   npm run build
   ```

3. Deploy the `build` folder

### MongoDB Hosting

Use **MongoDB Atlas** (free tier available):
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

## 🎨 Customization

### Adding New Categories

Edit the category list in:
- `backend/models/Expense.js` - Update enum array
- `backend/utils/aiHelper.js` - Add keywords for AI categorization
- Frontend components - Update category arrays

### Styling

- Modify `frontend/src/index.css` for global styles
- Component-specific styles can be added inline or in separate CSS files

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running: `mongod` or check MongoDB service
- Verify connection string in `.env` file

**CORS Issues**
- Backend uses CORS middleware to allow frontend requests
- Update CORS settings in `backend/server.js` if needed

**Port Already in Use**
- Change port in `.env` (backend) or use different port
- Frontend: Set `PORT=3001` before `npm start`

## 📝 Development Tips

- Use `nodemon` for backend auto-reload: `npm run dev`
- React auto-reloads on file changes
- Check browser console and terminal for errors
- Use MongoDB Compass to view database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with React, Node.js, Express, and MongoDB
- AI categorization uses keyword-based matching
- Designed for learning and educational purposes

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Happy Budgeting! 💰**
