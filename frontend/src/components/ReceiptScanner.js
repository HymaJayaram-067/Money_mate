import React, { useState } from 'react';
import { createExpense } from '../services/api';

const ReceiptScanner = ({ onExpenseAdded }) => {
  const [scanning, setScanning] = useState(false);
  const [receiptText, setReceiptText] = useState('');
  const [extractedData, setExtractedData] = useState(null);

  // Simulate AI receipt scanning (in production, this would use OCR API like Tesseract.js or cloud services)
  const simulateReceiptScan = (text) => {
    // Simple pattern matching to extract expense details from receipt text
    const lines = text.toLowerCase().split('\n').filter(line => line.trim());
    
    // Try to find amount (looking for $ or numbers with decimal)
    const amountPattern = /\$?\s*(\d+\.?\d{0,2})/;
    let amount = 0;
    let description = '';
    
    for (const line of lines) {
      const match = line.match(amountPattern);
      if (match && parseFloat(match[1]) > 0) {
        amount = parseFloat(match[1]);
        // Use the line as description, removing the amount
        description = line.replace(amountPattern, '').trim();
        break;
      }
    }

    // If no amount found, try to extract from common receipt patterns
    if (!amount && lines.length > 0) {
      const totalLine = lines.find(l => l.includes('total') || l.includes('amount'));
      if (totalLine) {
        const match = totalLine.match(amountPattern);
        if (match) {
          amount = parseFloat(match[1]);
          description = 'Receipt scan';
        }
      }
    }

    // Try to determine merchant/store name (usually first line)
    if (!description && lines.length > 0) {
      description = lines[0].trim();
    }

    return {
      description: description || 'Receipt scan',
      amount: amount || 0,
      date: new Date()
    };
  };

  const handleScanReceipt = () => {
    if (!receiptText.trim()) {
      alert('Please enter receipt text');
      return;
    }

    setScanning(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const data = simulateReceiptScan(receiptText);
      setExtractedData(data);
      setScanning(false);
    }, 1500);
  };

  const handleSaveExpense = async () => {
    if (!extractedData || extractedData.amount === 0) {
      alert('Please scan a valid receipt first');
      return;
    }

    try {
      await createExpense({
        ...extractedData,
        notes: 'Scanned from receipt'
      });
      setReceiptText('');
      setExtractedData(null);
      if (onExpenseAdded) onExpenseAdded();
      alert('Expense added successfully!');
    } catch (error) {
      console.error('Error saving expense:', error);
      alert('Failed to save expense. Please try again.');
    }
  };

  return (
    <div className="card">
      <h2>📸 AI Receipt Scanner</h2>
      <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '15px' }}>
        Paste or type receipt text below to extract expense details automatically
      </p>

      <div className="form-group">
        <label>Receipt Text</label>
        <textarea
          value={receiptText}
          onChange={(e) => setReceiptText(e.target.value)}
          rows="6"
          placeholder="Example:&#10;Starbucks Coffee&#10;Grande Latte - $5.50&#10;Total: $5.50&#10;Thank you!"
          style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
        />
      </div>

      <button 
        onClick={handleScanReceipt} 
        className="btn"
        disabled={scanning || !receiptText.trim()}
        style={{ marginRight: '10px' }}
      >
        {scanning ? '🔍 Scanning...' : '🔍 Scan Receipt'}
      </button>

      {extractedData && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          background: '#f0f8ff',
          borderRadius: '8px',
          border: '2px solid #667eea'
        }}>
          <h3 style={{ marginBottom: '10px', color: '#333' }}>✅ Extracted Data</h3>
          <div style={{ marginBottom: '10px' }}>
            <strong>Description:</strong> {extractedData.description}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Amount:</strong> ${extractedData.amount.toFixed(2)}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Date:</strong> {extractedData.date.toLocaleDateString()}
          </div>
          <button onClick={handleSaveExpense} className="btn">
            💾 Save as Expense
          </button>
        </div>
      )}

      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        background: '#fff3cd',
        borderRadius: '5px',
        fontSize: '0.85rem'
      }}>
        <strong>💡 Tip:</strong> For best results, paste receipt text in the format: 
        store name, item description, and amount. The AI will automatically extract details.
      </div>
    </div>
  );
};

export default ReceiptScanner;
