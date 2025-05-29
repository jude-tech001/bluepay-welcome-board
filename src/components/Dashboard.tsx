
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Eye, EyeOff, History, TrendingUp, CreditCard, Play, Phone, Wifi, HelpCircle, Users, User } from 'lucide-react';
import WelcomeModal from './WelcomeModal';

interface DashboardProps {
  userEmail: string;
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userEmail, userName }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  
  const balance = "₦200,000.00";
  const weeklyRewards = "₦200,000.00";
  
  const services = [
    { name: 'Buy BPC', icon: CreditCard, color: 'bg-orange-100 text-orange-600' },
    { name: 'Watch', icon: Play, color: 'bg-red-100 text-red-600' },
    { name: 'Airtime', icon: Phone, color: 'bg-green-100 text-green-600' },
    { name: 'Data', icon: Wifi, color: 'bg-blue-100 text-blue-600' },
    { name: 'Support', icon: HelpCircle, color: 'bg-purple-100 text-purple-600' },
    { name: 'Group', icon: Users, color: 'bg-teal-100 text-teal-600' },
    { name: 'Earn More', icon: TrendingUp, color: 'bg-green-100 text-green-600' },
    { name: 'Profile', icon: User, color: 'bg-gray-100 text-gray-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <WelcomeModal 
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        userEmail={userEmail}
      />
      
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 bg-bluepay-600">
            <AvatarFallback className="text-white font-semibold">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Hi, {userName}
            </h1>
            <p className="text-sm text-gray-600">{userEmail}</p>
          </div>
        </div>
        <div className="relative">
          <Bell className="h-6 w-6 text-gray-600" />
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-bluepay-600 to-bluepay-700 text-white overflow-hidden relative">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-bluepay-100 text-sm mb-2">Your Balance</p>
                <h2 className="text-3xl font-bold">
                  {showBalance ? balance : '••••••••'}
                </h2>
                <p className="text-bluepay-200 text-sm mt-2">
                  Weekly Rewards: {showBalance ? weeklyRewards : '••••••••'}
                </p>
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-white/80 hover:text-white transition-colors"
              >
                {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="flex gap-6 mt-6">
              <button className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                <History size={18} />
                <span className="text-sm font-medium">History</span>
              </button>
              <button className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                <TrendingUp size={18} />
                <span className="text-sm font-medium">Withdraw</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div className="grid grid-cols-4 gap-4">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <button
                key={index}
                className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${service.color}`}>
                  <IconComponent size={20} />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">
                  {service.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Important Information */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Important Information</h3>
          
          <Card className="bg-gradient-to-r from-gray-600 to-gray-700 text-white">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-4">How to Buy BPC Code</h4>
              <ul className="space-y-2 text-sm text-gray-200">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  Click "Buy BPC" from dashboard
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  Fill details and amount
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  Complete payment for BPC code
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  Use code for
                </li>
              </ul>
              
              <div className="flex gap-2 mt-4">
                <div className="h-2 w-2 bg-white/60 rounded-full"></div>
                <div className="h-2 w-2 bg-white rounded-full"></div>
                <div className="h-2 w-2 bg-white/60 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
