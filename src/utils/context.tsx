import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [infoLogin, setInfoLogin] = useState(null);

  const login = (data) => {
    setInfoLogin(data);
  };

  const logout = () => {
    setInfoLogin(null);
  };

  return (
    <AuthContext.Provider value={{ infoLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
