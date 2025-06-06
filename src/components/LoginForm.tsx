
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

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
    window.open('https://wa.me/19127037327', '_blank');
  };

  const handleBack = () => {
    if (isSignUp) {
      setIsSignUp(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="mb-6">
            <div className="text-3xl font-black text-white tracking-wider mb-3">
              BLUEPAY
            </div>
            <h2 className="text-xl text-white mb-6">Create your account</h2>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white">Creating your account...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 text-white relative z-10">
        {isSignUp ? (
          <button onClick={handleBack} className="p-2">
            <ArrowLeft size={24} />
          </button>
        ) : (
          <div></div>
        )}
        <button 
          onClick={handleNeedHelp}
          className="text-white hover:text-gray-200 text-sm"
        >
          You Need Help?
        </button>
      </div>

      {/* Main Content - Made more compact */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 relative z-10 max-w-md mx-auto w-full">
        {/* Logo and Welcome - Reduced size */}
        <div className="text-center mb-6">
          <div className="text-3xl font-black text-white tracking-wider mb-2">
            BLUEPAY
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Welcome!
          </h1>
          
          <p className="text-white/90 text-sm leading-relaxed mb-6">
            Get your account ready and instantly start buying, selling airtime and data online and start paying all your bills in cheaper price.
          </p>
        </div>

        {/* Form - Made more compact with white background inside inputs */}
        <div className="w-full space-y-3">
          {error && (
            <div className="mb-3 p-2 bg-red-500/20 border border-red-400 rounded-lg">
              <p className="text-white text-xs">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-3">
            {isSignUp && (
              <Input
                type="text"
                placeholder="Your Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="h-12 rounded-lg border-2 border-blue-600 bg-white text-blue-900 placeholder:text-blue-400 text-base"
              />
            )}
            
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-lg border-2 border-blue-600 bg-white text-blue-900 placeholder:text-blue-400 text-base"
            />
            
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-lg border-2 border-blue-600 bg-white text-blue-900 placeholder:text-blue-400 text-base"
            />
            
            {isSignUp && (
              <p className="text-white/80 text-xs mt-3">
                Any further actions indicates that you agree with our terms & conditions!
              </p>
            )}
            
            <Button
              type="submit"
              className="w-full h-12 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-colors font-semibold text-base mt-4"
            >
              {isSignUp ? 'Create account' : 'Sign in'}
            </Button>
          </form>
          
          <div className="text-center mt-4">
            <div className="text-white/90 text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-white font-semibold underline hover:text-gray-200"
              >
                {isSignUp ? 'Sign in' : 'Create account'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full"></div>
        <div className="absolute top-1/3 -left-16 w-32 h-32 bg-blue-400/10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-700/20 rounded-full"></div>
        <div className="absolute bottom-1/3 left-5 w-16 h-16 bg-blue-300/15 rounded-full"></div>
      </div>
    </div>
  );
};

export default LoginForm;
