import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { fetchGuestTransactions } from '../services/api';
import './Dashboard.css'; 

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGuestTransactions(token);
        setTransactions(data);
      } catch (err) {
        setError('Could not load transactions.');
      }
    };

    if (token) {
      loadData();
    }
  }, [token]);

  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user.name} (Booking {user.bookingId})</h2>
        <button onClick={logout} className="dashboard-logout-btn">Log Out</button>
      </div>
      
      <hr />
      <h3>Your Digital Folio</h3>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

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
}