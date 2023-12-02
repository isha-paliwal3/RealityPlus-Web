// AuthContext.tsx

'use client' 

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  isLoggedIn: boolean;
  updateAuth: (newAuthStatus: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
  }, []);

  const updateAuth = (newAuthStatus: boolean) => {
    setIsLoggedIn(newAuthStatus);
    if (!newAuthStatus) {
      Cookies.remove('token');
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
