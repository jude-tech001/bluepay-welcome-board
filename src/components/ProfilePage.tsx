
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
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack, userEmail, userName, onProfileUpdate }) => {
  const [fullName, setFullName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState('main');
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
    toast({
      title: "Account Validation",
      description: "Account validation feature coming soon.",
    });
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

          <button className="w-full bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center">
              <HelpCircle size={20} className="text-teal-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">Help & Support</h3>
              <p className="text-gray-500 text-sm">Get help with using BluePay Pro</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button className="w-full bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
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
