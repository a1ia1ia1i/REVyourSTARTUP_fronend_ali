import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userID, setUserID] = useState(localStorage.getItem('userID') || null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogin = (userID) => {
    const now = new Date().getTime();
    const timeout = 6 * 60 * 60 * 1000; // For example, 2 hours in milliseconds
  
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userID', userID);
    localStorage.setItem('expiry', now + timeout);
    setUserID(userID);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userID');
    setUserID(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // This could potentially check for token expiration if you decide to store tokens
    const storedUserID = localStorage.getItem('userID');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (storedUserID && storedIsLoggedIn) {
      setUserID(storedUserID);
      setIsLoggedIn(storedIsLoggedIn);
    }
  }, []);
  useEffect(() => {
    const expiryTime = parseInt(localStorage.getItem('expiry'), 10);
    const now = new Date().getTime();
  
    if (now > expiryTime) {
      handleLogout();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ userID, isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};