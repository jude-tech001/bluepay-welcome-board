
import React, { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  const handleLogin = (email: string, fullName: string) => {
    setUserEmail(email);
    setUserName(fullName);
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <Dashboard userEmail={userEmail} userName={userName} />;
  }

  return <LoginForm onLogin={handleLogin} />;
};

export default Index;
