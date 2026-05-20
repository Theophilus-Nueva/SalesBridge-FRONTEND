import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import './Dashboard.css';

export default function Login() {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const mockData = [
      { id: 1, date: '2026-05-18', item: 'Hamburger', amount: 15.00 },
      { id: 2, date: '2026-05-19', item: 'Iced Tea', amount: 5.00 },
      { id: 3, date: '2026-05-19', item: 'Spa Massage', amount: 80.00 }
    ];
    setTransactions(mockData);
  }, [user]);

  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user.name} (Room {user.roomNumber})</h2>
        <button onClick={logout} className="dashboard-logout-btn">Log Out</button>
      </div>
      
      <hr />
      <h3>Your Digital Folio</h3>
      
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Item</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.date}</td>
              <td>{tx.item}</td>
              <td>${tx.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h3 className="dashboard-total">
        Current Total: ${total.toFixed(2)}
      </h3>
    </div>
  );
};