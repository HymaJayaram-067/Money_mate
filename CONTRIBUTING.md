# Contributing to MoneyMate

Thank you for your interest in contributing to MoneyMate! This document provides guidelines and instructions for contributing.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce the problem
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, Node version, browser)

### Suggesting Features

1. Check if the feature has already been suggested
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Code Contributions

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Money_mate.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   ```bash
   # Backend tests
   cd backend
   node test-ai.js
   
   # Manual testing
   npm start
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Provide a clear description of your changes

## Development Guidelines

### Code Style

**JavaScript/React**
- Use ES6+ features
- Use functional components with hooks for React
- Use async/await for asynchronous operations
- Keep functions small and focused
- Use meaningful variable names

**Example:**
```javascript
// Good
const fetchExpenses = async () => {
  try {
    const response = await api.get('/expenses');
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
  }
};

// Avoid
function getExp() {
  api.get('/expenses').then(r => r.data);
}
```

### Project Structure

```
backend/
├── models/          # MongoDB schemas
├── routes/          # API endpoints
├── utils/           # Helper functions
└── server.js        # Main server file

frontend/
├── src/
│   ├── components/  # React components
│   ├── services/    # API calls
│   └── App.js       # Main component
```

### Adding New Features

#### Adding a New Category

1. Update `backend/models/Expense.js` enum
2. Add keywords in `backend/utils/aiHelper.js`
3. Update frontend category arrays

#### Adding a New API Endpoint

1. Create route in `backend/routes/`
2. Add function in appropriate route file
3. Update API service in `frontend/src/services/api.js`
4. Update relevant components

#### Adding a New Component

1. Create component in `frontend/src/components/`
2. Import and use in `App.js` or other components
3. Add necessary styling

### Testing

- Test all changes locally before submitting
- Verify both frontend and backend work together
- Check responsive design on different screen sizes
- Test error handling

### Documentation

- Update README.md for significant changes
- Add comments for complex logic
- Update API documentation if endpoints change

## Commit Message Guidelines

Use clear, descriptive commit messages:

- `Add: [description]` - New feature
- `Fix: [description]` - Bug fix
- `Update: [description]` - Updates to existing features
- `Docs: [description]` - Documentation changes
- `Style: [description]` - Code style changes
- `Refactor: [description]` - Code refactoring

## Areas for Contribution

### Beginner Friendly
- UI/UX improvements
- Documentation updates
- Bug fixes
- Adding test cases

### Intermediate
- New expense categories
- Additional charts/visualizations
- Export/import functionality
- Dark mode

### Advanced
- Real ML/AI integration
- Receipt OCR scanning
- Multi-user support
- Authentication system
- Investment tracking

## Getting Help

- Open an issue for questions
- Check existing issues and pull requests
- Review the README and documentation

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on the code, not the person

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to MoneyMate! 🎉
