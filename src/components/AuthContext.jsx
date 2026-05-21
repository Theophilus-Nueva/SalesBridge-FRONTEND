import React, { createContext, useState, useContext } from 'react';
import { loginGuest } from '../services/api';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    try {
      const data = await loginGuest(email, password);
      setToken(data.access_token);
      
      // Store user metadata
      setUser({ email: email, name: "Guest" });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);