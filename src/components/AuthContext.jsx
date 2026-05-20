import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (roomNumber, password) => {
    if (roomNumber && password) {
      setUser({ roomNumber: roomNumber, bookingId: 1, name: "Theophilus Nueva" });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);