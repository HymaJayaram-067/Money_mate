# MoneyMate API Documentation

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### Health Check

#### GET /api/health
Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "message": "MoneyMate API is running"
}
```

---

## Expenses

### GET /api/expenses
Get all expenses (sorted by date, newest first).

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "description": "Lunch at restaurant",
    "amount": 25.50,
    "category": "Food",
    "date": "2025-01-15T12:00:00.000Z",
    "paymentMethod": "Credit Card",
    "notes": "Team lunch",
    "createdAt": "2025-01-15T12:05:00.000Z",
    "updatedAt": "2025-01-15T12:05:00.000Z"
  }
]
```

### POST /api/expenses
Create a new expense.

**Request Body:**
```json
{
  "description": "Lunch at restaurant",
  "amount": 25.50,
  "category": "Food",  // Optional - AI will auto-categorize
  "paymentMethod": "Credit Card",
  "notes": "Team lunch"  // Optional
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "description": "Lunch at restaurant",
  "amount": 25.50,
  "category": "Food",
  "date": "2025-01-15T12:00:00.000Z",
  "paymentMethod": "Credit Card",
  "notes": "Team lunch",
  "createdAt": "2025-01-15T12:00:00.000Z",
  "updatedAt": "2025-01-15T12:00:00.000Z"
}
```

### PUT /api/expenses/:id
Update an expense.

**Request Body:**
```json
{
  "amount": 30.00,
  "notes": "Updated amount"
}
```

**Response:** Updated expense object

### DELETE /api/expenses/:id
Delete an expense.

**Response:**
```json
{
  "message": "Expense deleted successfully"
}
```

---

## Budgets

### GET /api/budgets
Get all budgets.

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "category": "Food",
    "limit": 500,
    "period": "monthly",
    "alert": true,
    "alertThreshold": 80,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

### GET /api/budgets/status
Get budget status with spending comparison.

**Response:**
```json
[
  {
    "category": "Food",
    "limit": 500,
    "spent": 350.75,
    "remaining": 149.25,
    "percentUsed": "70.15",
    "period": "monthly",
    "alert": false,
    "alertThreshold": 80
  }
]
```

### POST /api/budgets
Create a new budget.

**Request Body:**
```json
{
  "category": "Food",
  "limit": 500,
  "period": "monthly",
  "alert": true,
  "alertThreshold": 80
}
```

**Response:** Created budget object

### PUT /api/budgets/:id
Update a budget.

### DELETE /api/budgets/:id
Delete a budget.

---

## Insights

### GET /api/insights?period=monthly
Get spending insights for a specific period.

**Query Parameters:**
- `period`: `daily` | `weekly` | `monthly` | `yearly`

**Response:**
```json
{
  "period": "monthly",
  "startDate": "2025-01-01T00:00:00.000Z",
  "endDate": "2025-01-31T23:59:59.999Z",
  "totalSpent": 1250.50,
  "transactionCount": 45,
  "averageExpense": "27.79",
  "topCategory": {
    "category": "Food",
    "amount": 450.25
  },
  "categoryTotals": {
    "Food": 450.25,
    "Transportation": 200.00,
    "Entertainment": 150.00,
    "Shopping": 300.25,
    "Bills": 150.00
  },
  "insights": [
    "💡 Food expenses are 36.0% of your total spending. Consider budgeting here.",
    "✅ Your spending is well distributed across categories!"
  ]
}
```

### GET /api/insights/categories
Get category-wise breakdown with transaction details.

**Response:**
```json
{
  "Food": {
    "total": 450.25,
    "count": 15,
    "transactions": [
      {
        "description": "Lunch",
        "amount": 25.50,
        "date": "2025-01-15T12:00:00.000Z"
      }
    ]
  }
}
```

### GET /api/insights/trends
Get monthly spending trends.

**Response:**
```json
[
  {
    "month": "Jan 2025",
    "amount": 1250.50
  },
  {
    "month": "Dec 2024",
    "amount": 980.25
  }
]
```

---

## Categories

Available expense categories:
- Food
- Transportation
- Entertainment
- Shopping
- Bills
- Healthcare
- Education
- Other

## Payment Methods

- Cash
- Credit Card
- Debit Card
- UPI
- Other

## Error Responses

All endpoints may return error responses:

```json
{
  "message": "Error description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## AI Features

### Smart Categorization

The AI automatically categorizes expenses based on keywords in the description:

Examples:
- "Lunch at McDonald's" → Food
- "Uber to office" → Transportation
- "Netflix subscription" → Entertainment
- "Amazon purchase" → Shopping
- "Electricity bill" → Bills

### Personalized Insights

The AI generates spending insights:
- Identifies high-spending categories
- Calculates spending percentages
- Provides actionable tips
- Tracks spending trends
