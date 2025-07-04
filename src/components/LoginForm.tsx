
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginFormProps {
  onLogin: (email: string, fullName: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [retrievedPassword, setRetrievedPassword] = useState('');

  // Simple storage for registered users (in a real app, this would be a backend)
  const getRegisteredUsers = () => {
    const stored = localStorage.getItem('registeredUsers');
    return stored ? JSON.parse(stored) : [];
  };

  const saveRegisteredUser = (userEmail: string, userFullName: string, userPassword: string) => {
    const users = getRegisteredUsers();
    users.push({ email: userEmail, fullName: userFullName, password: userPassword });
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  const isUserRegistered = (userEmail: string) => {
    const users = getRegisteredUsers();
    return users.find((user: any) => user.email === userEmail);
  };

  const validateLogin = (userEmail: string, userPassword: string) => {
    const users = getRegisteredUsers();
    return users.find((user: any) => user.email === userEmail && user.password === userPassword);
  };

  const handleForgotPassword = () => {
    if (!forgotPasswordEmail) {
      setError('Please enter your email address');
      return;
    }

    const users = getRegisteredUsers();
    const user = users.find((user: any) => user.email === forgotPasswordEmail);
    
    if (!user) {
      setError('No account found with this email address');
      return;
    }

    setRetrievedPassword(user.password);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isSignUp) {
      // Check if user already exists
      if (isUserRegistered(email)) {
        setError('This email is already registered. Please login instead.');
        return;
      }

      setIsLoading(true);
      // Simulate account creation loading
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsLoading(false);
      
      // Save the new user
      saveRegisteredUser(email, fullName, password);
      console.log('New user registered:', { email, fullName });
      onLogin(email, fullName);
    } else {
      // Login validation
      const user = validateLogin(email, password);
      if (!user) {
        setError('Invalid email or password. Please sign up if you don\'t have an account.');
        return;
      }
      
      console.log('User logged in:', { email, fullName: user.fullName });
      onLogin(email, user.fullName);
    }
  };

  const handleNeedHelp = () => {
    window.open('https://wa.me/19127037327', '_blank');
  };

  const resetForgotPassword = () => {
    setShowForgotPassword(false);
    setForgotPasswordEmail('');
    setRetrievedPassword('');
    setError('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-3">
              BLUE PAY
            </div>
            <h2 className="text-xl text-gray-700 mb-6">Create your account</h2>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Creating your account...</p>
          </div>
        </div>
      </div>
    );
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="flex justify-end items-center p-4">
          <button 
            onClick={handleNeedHelp}
            className="text-orange-400 hover:text-orange-500 text-sm font-medium"
          >
            Need Help?
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 max-w-md mx-auto w-full">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-blue-600 mb-4">
              BLUE PAY
            </div>
            <h1 className="text-lg text-gray-600">
              Forgot Password
            </h1>
          </div>

          {/* Forgot Password Form */}
          <div className="w-full space-y-4">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {retrievedPassword && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm font-medium mb-2">Your password is:</p>
                <p className="text-green-800 font-mono bg-white p-2 rounded border text-center">
                  {retrievedPassword}
                </p>
              </div>
            )}
            
            <Input
              type="email"
              placeholder="Enter your registration email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              required
              className="h-14 rounded-3xl border-gray-200 bg-gray-100 text-gray-700 placeholder:text-gray-500 text-base px-6 focus:border-blue-400 focus:ring-blue-400"
            />
            
            <Button
              onClick={handleForgotPassword}
              className="w-full h-14 bg-black text-white rounded-3xl hover:bg-gray-800 transition-colors font-medium text-base mt-6"
            >
              Retrieve Password
            </Button>

            <div className="text-center mt-6">
              <button
                onClick={resetForgotPassword}
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-end items-center p-4">
        <button 
          onClick={handleNeedHelp}
          className="text-orange-400 hover:text-orange-500 text-sm font-medium"
        >
          Need Help?
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 max-w-md mx-auto w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-blue-600 mb-4">
            BLUE PAY
          </div>
          <h1 className="text-lg text-gray-600">
            {isSignUp ? 'Create your account' : 'login or create an account to continue'}
          </h1>
        </div>

        {/* Form */}
        <div className="w-full space-y-4">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="h-14 rounded-3xl border-gray-200 bg-gray-100 text-gray-700 placeholder:text-gray-500 text-base px-6 focus:border-blue-400 focus:ring-blue-400"
              />
            )}
            
            <Input
              type="email"
              placeholder={isSignUp ? "Email Address" : "Enter Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-14 rounded-3xl border-gray-200 bg-gray-100 text-gray-700 placeholder:text-gray-500 text-base px-6 focus:border-blue-400 focus:ring-blue-400"
            />
            
            <Input
              type="password"
              placeholder={isSignUp ? "Password" : "Enter Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-14 rounded-3xl border-gray-200 bg-gray-100 text-gray-700 placeholder:text-gray-500 text-base px-6 focus:border-blue-400 focus:ring-blue-400"
            />
            
            <Button
              type="submit"
              className="w-full h-14 bg-black text-white rounded-3xl hover:bg-gray-800 transition-colors font-medium text-base mt-6"
            >
              {isSignUp ? 'Register' : 'Login'}
            </Button>
          </form>
          
          <div className="text-center mt-6">
            <div className="text-gray-600 text-base">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                {isSignUp ? 'Login' : 'Register'}
              </button>
            </div>
          </div>

          {/* Forgot Password Link - Only show when in login mode and positioned below register/login toggle */}
          {!isSignUp && (
            <div className="text-center mt-4">
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-gray-600 text-sm hover:text-gray-800"
              >
                Forgot password?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
