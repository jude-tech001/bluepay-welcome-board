
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      console.log('Signing up with:', { email, fullName, password });
    } else {
      console.log('Logging in with:', { email, password });
    }
    onLogin(email, fullName || 'User');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bluepay-50 to-bluepay-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto">
            <h1 className="text-4xl font-black text-bluepay-600 tracking-wider">
              BLUEPAY2025
            </h1>
          </div>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            {isSignUp ? 'Create Account' : 'Login'}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isSignUp ? 'Sign up to continue' : 'Login or create an account to continue'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="h-12 rounded-xl border-2 border-gray-200 focus:border-bluepay-500 transition-colors"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-2 border-gray-200 focus:border-bluepay-500 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 rounded-xl border-2 border-gray-200 focus:border-bluepay-500 transition-colors pr-12"
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
              className="w-full h-12 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-medium text-lg"
            >
              {isSignUp ? 'Sign Up' : 'Login'}
            </Button>
          </form>
          
          <div className="text-center space-y-4">
            {!isSignUp && (
              <a href="#" className="text-bluepay-600 hover:text-bluepay-700 font-medium">
                Forgot Password?
              </a>
            )}
            
            <div className="text-sm text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-bluepay-600 hover:text-bluepay-700 font-medium"
              >
                {isSignUp ? 'Login' : 'Sign Up'}
              </button>
            </div>
            
            <div className="text-orange-500 font-medium">
              New version2025!!
            </div>
          </div>
          
          <div className="text-right">
            <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
              Need Help?
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
