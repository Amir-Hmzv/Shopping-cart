import React, { createContext, useState } from 'react';

export const Protectedcontext = createContext({});

export const  ProtectedContext = ({ children }:any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Protectedcontext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </Protectedcontext.Provider>
  );
};