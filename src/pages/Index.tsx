import React, { useState, useEffect } from 'react';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing login session on app load
  useEffect(() => {
    const checkExistingSession = () => {
      const savedLoginState = localStorage.getItem('userLoginState');
      if (savedLoginState) {
        try {
          const loginData = JSON.parse(savedLoginState);
          setUserEmail(loginData.email);
          setUserName(loginData.fullName);
          setProfileImage(loginData.profileImage || '');
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Error parsing saved login state:', error);
          localStorage.removeItem('userLoginState');
        }
      }
      setIsLoading(false);
    };

    checkExistingSession();
  }, []);

  // Check for referral code on app load
  useEffect(() => {
    const checkReferralCode = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const referralCode = urlParams.get('ref');
      
      if (referralCode) {
        // Store referral code for later processing
        localStorage.setItem('pending_referral_code', referralCode);
        
        // Update page title for referral
        document.title = 'Register on BluePay and start earning today - Sign up now!';
        
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };

    checkReferralCode();
  }, []);

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
    
    // Process referral if user came from a referral link
    const referralCode = localStorage.getItem('pending_referral_code');
    if (referralCode) {
      import('@/utils/referralService').then(({ trackReferral }) => {
        const success = trackReferral(referralCode, email);
        if (success) {
          console.log('Referral tracked successfully');
        }
      });
      localStorage.removeItem('pending_referral_code');
    }
    
    // Save login state to localStorage
    const loginData = {
      email,
      fullName,
      profileImage: profileImage
    };
    localStorage.setItem('userLoginState', JSON.stringify(loginData));
    
    // Replace current history entry to prevent back navigation to login
    window.history.replaceState(null, '', window.location.href);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setUserName('');
    setProfileImage('');
    
    // Remove login state from localStorage
    localStorage.removeItem('userLoginState');
    
    // Clear navigation history and allow normal navigation
    window.history.replaceState(null, '', window.location.href);
  };

  const handleProfileUpdate = (newProfileImage: string) => {
    setProfileImage(newProfileImage);
    
    // Update saved login state with new profile image
    if (isLoggedIn) {
      const loginData = {
        email: userEmail,
        fullName: userName,
        profileImage: newProfileImage
      };
      localStorage.setItem('userLoginState', JSON.stringify(loginData));
    }
  };

  // Show loading while checking for existing session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <Dashboard 
        userEmail={userEmail} 
        userName={userName} 
        profileImage={profileImage}
        onLogout={handleLogout}
        onProfileUpdate={handleProfileUpdate}
      />
    );
  }

  return <LoginForm onLogin={handleLogin} />;
};

export default Index;
