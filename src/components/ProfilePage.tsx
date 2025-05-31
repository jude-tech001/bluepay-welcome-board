
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Camera, User, HelpCircle, Info, LogOut, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfilePageProps {
  onBack: () => void;
  userEmail: string;
  userName: string;
  onProfileUpdate?: (profileImage: string) => void;
  onSupportClick?: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack, userEmail, userName, onProfileUpdate, onSupportClick }) => {
  const [fullName, setFullName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState('main');
  const [validationStep, setValidationStep] = useState('form'); // form, loading, payment, validating, failed
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      if (profileImage && onProfileUpdate) {
        onProfileUpdate(profileImage);
      }
      toast({
        title: "Updated Successfully",
        description: "Your profile has been updated successfully.",
      });
    }, 2000);
  };

  const handleValidateAccount = () => {
    setCurrentView('validation');
    setValidationStep('form');
  };

  const handleValidationSubmit = () => {
    setValidationStep('loading');
    setTimeout(() => {
      setValidationStep('payment');
    }, 3000);
  };

  const handlePaymentConfirm = () => {
    setValidationStep('validating');
    setTimeout(() => {
      setValidationStep('failed');
    }, 7000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Updating profile...</p>
        </div>
      </div>
    );
  }

  if (currentView === 'about') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
          <button onClick={() => setCurrentView('main')} className="text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold text-white">About</h1>
        </div>

        <div className="p-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">BluePay Pro</h1>
            <p className="text-gray-600 text-lg mb-6">Version 1.0.0</p>
            
            <p className="text-gray-700 leading-relaxed mb-8 px-4">
              BluePay Pro is a comprehensive financial platform designed to make transactions, 
              airtime purchases, and data subscriptions seamless and rewarding.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-6 h-6 border-2 border-blue-600 rounded"></div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Transactions</h3>
                <p className="text-gray-600 text-sm">
                  Your security is our priority. All transactions are encrypted and protected 
                  with industry-standard security protocols.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-6 h-6 text-blue-600">⚡</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast & Reliable</h3>
                <p className="text-gray-600 text-sm">
                  Experience lightning-fast transactions and reliable service delivery, 
                  ensuring you never miss a beat.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-6 h-6 text-blue-600">👥</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Growing Community</h3>
                <p className="text-gray-600 text-sm">
                  Join thousands of satisfied users who trust BluePay Pro for their daily financial needs.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Legal Information</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Terms of Service</h4>
                <p className="text-gray-600 text-sm">
                  By using BluePay Pro, you agree to our terms of service which govern your use of the platform.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Privacy Policy</h4>
                <p className="text-gray-600 text-sm">
                  We respect your privacy. Learn how we collect, use, and protect your personal information.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Contact Us</h4>
                <p className="text-gray-600 text-sm">
                  For inquiries, please contact us at{' '}
                  <span className="text-blue-600">bluepay-pro.vercel.app</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'validation') {
    if (validationStep === 'form') {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
            <button onClick={() => setCurrentView('main')} className="text-white">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-semibold text-white">Account Validation</h1>
          </div>

          <div className="p-4">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Validate Your Account</h2>
              <p className="text-gray-600">
                Complete account validation to unlock higher transaction limits and premium features.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm mb-2">Validation Fee</label>
                <Input
                  type="text"
                  value="₦20700"
                  readOnly
                  className="h-14 rounded-xl border-2 border-gray-300 bg-gray-50 text-base"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">Full Name</label>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-14 rounded-xl border-2 border-gray-300 text-base"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 rounded-xl border-2 border-gray-300 text-base"
                />
              </div>

              <Button
                onClick={handleValidationSubmit}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-medium mt-8"
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (validationStep === 'loading') {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <div className="w-full h-full rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
            </div>
            <p className="text-gray-600">Preparing payment account...</p>
          </div>
        </div>
      );
    }

    if (validationStep === 'payment') {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
            <button onClick={() => setCurrentView('main')} className="text-white">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-semibold text-white">Account Validation</h1>
          </div>

          <div className="p-4">
            <div className="bg-green-100 rounded-xl p-4 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
              </div>
              <span className="font-medium text-gray-900">Account Validation Payment</span>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-blue-600 font-bold text-lg">BluePay</span>
              </div>
              <div className="text-right">
                <p className="text-gray-600 text-sm">Validation Fee</p>
                <p className="font-bold">Pay <span className="text-green-600">NGN 20,700</span></p>
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer NGN 20,700</h2>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-gray-600 rounded-sm"></div>
                  </div>
                  <span className="text-gray-700">BANK</span>
                </div>
                <span className="font-medium">Opay</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-gray-600 rounded-sm"></div>
                  </div>
                  <span className="text-gray-700">ACCOUNT</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">9046881405</span>
                  <button className="text-gray-400">📋</button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-gray-600 rounded-sm"></div>
                  </div>
                  <span className="text-gray-700">NAME</span>
                </div>
                <span className="font-medium">Ebuka Sabastine</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-gray-600 rounded-sm"></div>
                  </div>
                  <span className="text-gray-700">AMOUNT</span>
                </div>
                <span className="font-medium">NGN 20,700</span>
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-red-600 text-sm">Expires in 29:54</p>
            </div>

            <Button
              onClick={handlePaymentConfirm}
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg font-medium mb-4"
            >
              I've sent the money
            </Button>

            <button className="w-full text-gray-600 text-center py-2">
              🔄 Change Payment Method
            </button>
          </div>
        </div>
      );
    }

    if (validationStep === 'validating') {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <div className="w-full h-full rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
            </div>
            <p className="text-gray-600">Processing validation request...</p>
          </div>
        </div>
      );
    }

    if (validationStep === 'failed') {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm mx-4">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-4xl">×</span>
            </div>
            
            <h2 className="text-2xl font-bold text-orange-600 mb-4">
              Validation Failed!
            </h2>
            
            <p className="text-gray-700 mb-2">
              Account validation could not be completed at this time.
            </p>
            <p className="text-gray-700 mb-6">
              <span className="font-medium">Reason:</span> Payment verification timeout or insufficient funds.
            </p>

            <div className="mb-6">
              <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
                <span className="text-gray-800">••••••••••••</span>
                <button className="text-gray-600">👁</button>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setValidationStep('form')}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-base font-medium"
              >
                Try Again
              </Button>
              
              <Button
                onClick={() => setCurrentView('main')}
                variant="outline"
                className="w-full h-12 border-gray-300 text-gray-700 rounded-xl text-base font-medium"
              >
                Back to Profile
              </Button>
            </div>
          </div>
        </div>
      );
    }
  }

  if (currentView === 'profile-info') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
          <button onClick={() => setCurrentView('main')} className="text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold text-white">Profile Information</h1>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                <p className="text-lg font-medium text-gray-900">{fullName}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Email Address</label>
                <p className="text-lg font-medium text-gray-900">{email}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Account Level</label>
                <p className="text-lg font-medium text-gray-900">Standard</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Account Status</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Status</label>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-gray-900">Active</p>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                    Not Validated
                  </span>
                </div>
              </div>

              <Button
                onClick={handleValidateAccount}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              >
                Validate Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white">Profile</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-black flex items-center justify-center border-4 border-blue-500">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="h-full w-full rounded-full object-cover" />
              ) : (
                <span className="text-yellow-500 text-3xl font-bold">
                  {fullName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer">
              <Camera size={16} className="text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-gray-500 text-sm">Tap to change profile picture</p>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          <button
            onClick={() => setCurrentView('profile-info')}
            className="w-full bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm"
          >
            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
              <User size={20} className="text-purple-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">Profile Information</h3>
              <p className="text-gray-500 text-sm">View and edit your profile details</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button 
            onClick={onSupportClick}
            className="w-full bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm"
          >
            <div className="h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center">
              <HelpCircle size={20} className="text-teal-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">Help & Support</h3>
              <p className="text-gray-500 text-sm">Get help with using BluePay Pro</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button 
            onClick={() => setCurrentView('about')}
            className="w-full bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm"
          >
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Info size={20} className="text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">About</h3>
              <p className="text-gray-500 text-sm">Learn more about BluePay Pro</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Logout Button */}
        <div className="pt-4">
          <button className="w-full bg-red-50 rounded-xl p-4 flex items-center justify-center gap-2">
            <LogOut size={20} className="text-red-600" />
            <span className="text-red-600 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
