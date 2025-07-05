import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Camera, User, HelpCircle, Info, LogOut, ChevronRight, Download, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AboutPage from './AboutPage';
import SupportPage from './SupportPage';
import AccountValidationPage from './AccountValidationPage';

interface ProfilePageProps {
  onBack: () => void;
  userEmail: string;
  userName: string;
  onProfileUpdate?: (profileImage: string) => void;
  onLogout?: () => void;
  onBalanceReset?: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack, userEmail, userName, onProfileUpdate, onLogout, onBalanceReset }) => {
  const [fullName, setFullName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState('main');
  const [bpcCode, setBpcCode] = useState('');
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [lastBalanceAddTime, setLastBalanceAddTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    const savedTime = localStorage.getItem(`last_balance_add_${userEmail}`);
    if (savedTime) {
      setLastBalanceAddTime(Number(savedTime));
    }
  }, [userEmail]);

  useEffect(() => {
    if (!lastBalanceAddTime) return;

    const updateTimer = () => {
      const now = Date.now();
      const timePassed = now - lastBalanceAddTime;
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (timePassed >= twentyFourHours) {
        setTimeRemaining(0);
      } else {
        setTimeRemaining(twentyFourHours - timePassed);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [lastBalanceAddTime]);

  const formatTimeRemaining = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const canAddBalance = () => {
    if (!lastBalanceAddTime) return true;
    
    const now = Date.now();
    const timePassed = now - lastBalanceAddTime;
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    return timePassed >= twentyFourHours;
  };

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
    setCurrentView('validate');
  };

  const handleDownloadApp = () => {
    window.open('https://median.co/share/brdmop#apk', '_blank');
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Fallback: reload the page to reset the app state
      window.location.reload();
    }
  };

  const handleResetBalance = () => {
    if (!canAddBalance()) {
      toast({
        title: "Balance Add Cooldown",
        description: `You can add balance again in ${formatTimeRemaining(timeRemaining)}`,
        variant: "destructive",
      });
      return;
    }

    const allowedBpcCode = 'BPCVerified2029747OQ';
    
    if (bpcCode === allowedBpcCode) {
      if (onBalanceReset) {
        onBalanceReset();
      }
      
      const now = Date.now();
      setLastBalanceAddTime(now);
      localStorage.setItem(`last_balance_add_${userEmail}`, now.toString());
      
      setIsResetDialogOpen(false);
      setBpcCode('');
      toast({
        title: "Balance Added Successfully",
        description: "₦200,000.00 has been added to your current balance",
      });
    } else {
      toast({
        title: "Invalid BPC Code",
        description: "Please enter the correct BPC code to add balance.",
        variant: "destructive",
      });
    }
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
    return <AboutPage onBack={() => setCurrentView('main')} />;
  }

  if (currentView === 'support') {
    return <SupportPage onBack={() => setCurrentView('main')} />;
  }

  if (currentView === 'validate') {
    return <AccountValidationPage onBack={() => setCurrentView('profile-info')} userEmail={userEmail} userName={userName} />;
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

          <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
            <DialogTrigger asChild>
              <button 
                className={`w-full rounded-xl p-4 flex items-center gap-4 shadow-sm ${
                  canAddBalance() ? 'bg-white' : 'bg-gray-100'
                }`}
                disabled={!canAddBalance()}
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  canAddBalance() ? 'bg-orange-100' : 'bg-gray-200'
                }`}>
                  <RotateCcw size={20} className={canAddBalance() ? 'text-orange-600' : 'text-gray-400'} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className={`font-semibold ${canAddBalance() ? 'text-gray-900' : 'text-gray-500'}`}>
                    Add Balance
                  </h3>
                  <p className={`text-sm ${canAddBalance() ? 'text-gray-500' : 'text-gray-400'}`}>
                    {canAddBalance() 
                      ? 'Add ₦200,000.00 to your current balance'
                      : `Available in ${formatTimeRemaining(timeRemaining)}`
                    }
                  </p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Balance</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Enter your BPC code to add ₦200,000.00 to your current balance
                </p>
                {!canAddBalance() && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-sm text-orange-700">
                      You can add balance again in: <span className="font-semibold">{formatTimeRemaining(timeRemaining)}</span>
                    </p>
                  </div>
                )}
                <Input
                  type="text"
                  placeholder="Enter BPC Code"
                  value={bpcCode}
                  onChange={(e) => setBpcCode(e.target.value)}
                  className="w-full"
                  disabled={!canAddBalance()}
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsResetDialogOpen(false);
                      setBpcCode('');
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleResetBalance}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={!canAddBalance()}
                  >
                    Add Balance
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <button
            onClick={handleDownloadApp}
            className="w-full bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm"
          >
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
              <Download size={20} className="text-green-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">Download App</h3>
              <p className="text-gray-500 text-sm">Get the mobile app for your device</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button 
            onClick={() => setCurrentView('support')}
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

        <div className="pt-4">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-50 rounded-xl p-4 flex items-center justify-center gap-2"
          >
            <LogOut size={20} className="text-red-600" />
            <span className="text-red-600 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
