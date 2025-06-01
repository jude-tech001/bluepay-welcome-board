
import React, { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState<string>('');

  const handleLogin = (email: string, fullName: string) => {
    setUserEmail(email);
    setUserName(fullName);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setUserName('');
    setProfileImage('');
  };

  const handleProfileUpdate = (newProfileImage: string) => {
    setProfileImage(newProfileImage);
  };

  if (isLoggedIn) {
    return (
      <Dashboard 
        userEmail={userEmail} 
        userName={userName} 
        profileImage={profileImage}
        onLogout={handleLogout}
      />
    );
  }

  return <LoginForm onLogin={handleLogin} />;
};

export default Index;
