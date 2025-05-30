
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Camera, Save, Star, Crown, Award } from 'lucide-react';
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
  const [userLevel, setUserLevel] = useState(1);
  const { toast } = useToast();

  const levels = [
    { level: 1, name: 'Bronze', icon: Award, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { level: 2, name: 'Silver', icon: Star, color: 'text-gray-600', bgColor: 'bg-gray-100' },
    { level: 3, name: 'Gold', icon: Crown, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  ];

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
    }, 3000);
  };

  const handleLevelUpgrade = () => {
    if (userLevel < 3) {
      setUserLevel(userLevel + 1);
      toast({
        title: "Level Upgraded!",
        description: `Congratulations! You've upgraded to ${levels[userLevel].name} level.`,
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

  const currentLevel = levels[userLevel - 1];
  const CurrentLevelIcon = currentLevel.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white">Profile</h1>
      </div>

      <div className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-gray-900">My Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profileImage || undefined} />
                  <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                    {fullName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
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
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="h-12 rounded-xl"
                />
              </div>
            </div>

            <Button
              onClick={handleSave}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2"
            >
              <Save size={20} />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* User Level Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-gray-900">User Level</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className={`p-3 rounded-full ${currentLevel.bgColor}`}>
                <CurrentLevelIcon size={24} className={currentLevel.color} />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900">Level {userLevel}</h3>
                <p className={`text-sm font-medium ${currentLevel.color}`}>{currentLevel.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {levels.map((level, index) => {
                const LevelIcon = level.icon;
                return (
                  <div
                    key={level.level}
                    className={`p-3 rounded-lg border-2 text-center ${
                      userLevel >= level.level
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <LevelIcon
                      size={20}
                      className={`mx-auto mb-1 ${
                        userLevel >= level.level ? level.color : 'text-gray-400'
                      }`}
                    />
                    <p className="text-xs font-medium">{level.name}</p>
                  </div>
                );
              })}
            </div>

            {userLevel < 3 && (
              <Button
                onClick={handleLevelUpgrade}
                className="w-full h-12 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl"
              >
                Upgrade Level
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
