
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onLogin: (email: string, fullName: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
    window.open('https://wa.me/+2348127519989', '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="mb-8">
            <div className="bg-white rounded-lg p-4 inline-block mb-4">
              <img 
                src="/lovable-uploads/15a7c86b-9e29-4e98-940c-4fa28531e9e6.png" 
                alt="BluePay 2025" 
                className="h-20 mx-auto"
              />
            </div>
            <h2 className="text-xl text-gray-700 mb-8">Create your account</h2>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Creating your account...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Need Help at the top right */}
        <div className="text-right mb-1">
          <button 
            onClick={handleNeedHelp}
            className="text-orange-500 hover:text-orange-600 text-xs"
          >
            Need Help?
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="bg-white rounded-lg p-4 inline-block mb-2">
              <img 
                src="/lovable-uploads/15a7c86b-9e29-4e98-940c-4fa28531e9e6.png" 
                alt="BluePay 2025" 
                className="h-20 mx-auto"
              />
            </div>
          </div>
          <p className="text-gray-600 text-base">
            {isSignUp ? 'Create your account' : 'login or create an account to continue'}
          </p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="h-12 rounded-xl border border-gray-300 text-base"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Input
                type="email"
                placeholder={isSignUp ? "Email Address" : "Enter Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border border-gray-300 text-base"
              />
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={isSignUp ? "Password" : "Enter Password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 rounded-xl border border-gray-300 text-base pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full h-12 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors font-medium text-base mt-6"
            >
              {isSignUp ? 'Register' : 'Login'}
            </Button>
          </form>
          
          <div className="text-center mt-6">
            <div className="text-sm text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isSignUp ? 'Login' : 'Register'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
