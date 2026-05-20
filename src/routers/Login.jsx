import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';  
import './Login.css';

export default function Login() {
  const [roomNumber, setRoomNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(roomNumber, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid Room Number or Password');
    }
  };

  return (
    <div className="login-container">
      <h2>Sales Bridge Guest Portal</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input 
          type="text" 
          placeholder="Room Number (e.g., 101)" 
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Password or PIN" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit" className="login-button">View My Tab</button>
      </form>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
};