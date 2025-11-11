#!/bin/bash

echo "🚀 MoneyMate Quick Start Script"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Check if MongoDB is running (optional)
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB doesn't appear to be running locally."
    echo "   You can either:"
    echo "   1. Start MongoDB: sudo systemctl start mongod"
    echo "   2. Use MongoDB Atlas (cloud) - Update backend/.env with your connection string"
    echo ""
fi

# Backend setup
echo ""
echo "📦 Setting up Backend..."
cd backend || exit

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Edit backend/.env if you need to change MongoDB connection."
fi

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "✅ Backend dependencies already installed"
fi

echo ""
echo "🖥️  Starting Backend Server..."
npm start &
BACKEND_PID=$!
sleep 5

# Frontend setup
echo ""
echo "📦 Setting up Frontend..."
cd ../frontend || exit

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "✅ Frontend dependencies already installed"
fi

echo ""
echo "🎨 Starting Frontend Development Server..."
echo ""
echo "================================"
echo "✨ MoneyMate is starting!"
echo "================================"
echo ""
echo "Backend API: http://localhost:5000"
echo "Frontend:    http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

npm start

# Cleanup on exit
trap "kill $BACKEND_PID 2>/dev/null" EXIT
