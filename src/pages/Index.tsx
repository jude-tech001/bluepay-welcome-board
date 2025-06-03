
import React, { useState, useEffect } from 'react';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState<string>('');

  // Prevent browser back button from going to login when logged in
  useEffect(() => {
    if (isLoggedIn) {
      // Add a dummy history entry to prevent going back to login
      window.history.pushState(null, '', window.location.href);
      
      const handlePopState = (event: PopStateEvent) => {
        // Prevent going back to login page
        window.history.pushState(null, '', window.location.href);
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isLoggedIn]);

  const handleLogin = (email: string, fullName: string) => {
    setUserEmail(email);
    setUserName(fullName);
    setIsLoggedIn(true);
    
    // Replace current history entry to prevent back navigation to login
    window.history.replaceState(null, '', window.location.href);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setUserName('');
    setProfileImage('');
    
    // Clear navigation history and allow normal navigation
    window.history.replaceState(null, '', window.location.href);
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
