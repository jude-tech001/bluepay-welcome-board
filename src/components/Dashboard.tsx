
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Eye, EyeOff, History, TrendingUp, CreditCard, Play, Phone, Wifi, HelpCircle, Users, User } from 'lucide-react';
import WelcomeModal from './WelcomeModal';
import TypingText from './TypingText';
import WithdrawalPage from './WithdrawalPage';
import GroupPage from './GroupPage';
import ProfilePage from './ProfilePage';
import EarnMorePage from './EarnMorePage';
import SupportPage from './SupportPage';
import HistoryPage from './HistoryPage';
import NotificationPage from './NotificationPage';

interface DashboardProps {
  userEmail: string;
  userName: string;
  profileImage?: string;
}

interface Transaction {
  id: string;
  type: 'withdrawal' | 'deposit';
  amount: number;
  description: string;
  date: string;
  status: 'success' | 'pending' | 'failed';
}

const Dashboard: React.FC<DashboardProps> = ({ userEmail, userName, profileImage }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [balance, setBalance] = useState(200000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const weeklyRewards = "₦200,000.00";
  
  const services = [
    { name: 'Buy BPC', icon: CreditCard, color: 'bg-orange-100 text-orange-600', page: 'buyBpc' },
    { name: 'Watch', icon: Play, color: 'bg-red-100 text-red-600', page: 'watch' },
    { name: 'Airtime', icon: Phone, color: 'bg-green-100 text-green-600', page: 'airtime' },
    { name: 'Data', icon: Wifi, color: 'bg-blue-100 text-blue-600', page: 'data' },
    { name: 'Support', icon: HelpCircle, color: 'bg-purple-100 text-purple-600', page: 'support' },
    { name: 'Group', icon: Users, color: 'bg-teal-100 text-teal-600', page: 'group' },
    { name: 'Earn More', icon: TrendingUp, color: 'bg-green-100 text-green-600', page: 'earnMore' },
    { name: 'Profile', icon: User, color: 'bg-gray-100 text-gray-600', page: 'profile' },
  ];

  const instructionSteps = [
    'Click "Buy BPC" from dashboard',
    'Fill details and amount',
    'Complete payment for BPC code',
    'Use code for airtime & withdrawals'
  ];

  const handleServiceClick = (servicePage: string) => {
    setCurrentPage(servicePage);
  };

  const handleWithdrawSuccess = (amount: number) => {
    const newBalance = balance - amount;
    setBalance(newBalance);
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'withdrawal',
      amount: amount,
      description: 'Bank Transfer',
      date: new Date().toLocaleString(),
      status: 'success'
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
  };

  // Render different pages based on current page
  if (currentPage === 'withdrawal') {
    return <WithdrawalPage onBack={() => setCurrentPage('dashboard')} onWithdrawSuccess={handleWithdrawSuccess} />;
  }
  
  if (currentPage === 'group') {
    return <GroupPage onBack={() => setCurrentPage('dashboard')} />;
  }
  
  if (currentPage === 'profile') {
    return <ProfilePage onBack={() => setCurrentPage('dashboard')} userEmail={userEmail} userName={userName} />;
  }
  
  if (currentPage === 'earnMore') {
    return <EarnMorePage onBack={() => setCurrentPage('dashboard')} userEmail={userEmail} />;
  }
  
  if (currentPage === 'support') {
    return <SupportPage onBack={() => setCurrentPage('dashboard')} />;
  }

  if (currentPage === 'history') {
    return <HistoryPage onBack={() => setCurrentPage('dashboard')} transactions={transactions} />;
  }

  if (currentPage === 'notifications') {
    return <NotificationPage onBack={() => setCurrentPage('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WelcomeModal 
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        userEmail={userEmail}
      />
      
      {/* Header */}
      <div className="bg-blue-600 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-white">
            {profileImage ? (
              <AvatarImage src={profileImage} />
            ) : null}
            <AvatarFallback className="text-blue-600 font-semibold text-sm">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-base font-semibold text-white">
              Hi, {userName}
            </h1>
            <button className="text-xs text-blue-200 hover:text-white">
              Need help?
            </button>
          </div>
        </div>
        <div className="relative">
          <button onClick={() => setCurrentPage('notifications')}>
            <Bell className="h-5 w-5 text-white" />
            <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></div>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white overflow-hidden relative">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-blue-100 text-xs mb-1">Your Balance</p>
                <h2 className="text-2xl font-bold">
                  {showBalance ? `₦${balance.toLocaleString()}.00` : '••••••••'}
                </h2>
                <p className="text-blue-200 text-xs mt-1">
                  Weekly Rewards: {showBalance ? weeklyRewards : '••••••••'}
                </p>
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-white/80 hover:text-white transition-colors"
              >
                {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <button 
                onClick={() => setCurrentPage('history')}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <History size={16} />
                <span className="text-sm font-medium">History</span>
              </button>
              <button 
                onClick={() => setCurrentPage('withdrawal')}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <TrendingUp size={16} />
                <span className="text-sm font-medium">Withdraw</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div className="grid grid-cols-4 gap-3">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <button
                key={index}
                onClick={() => handleServiceClick(service.page)}
                className="flex flex-col items-center gap-2 p-3 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${service.color}`}>
                  <IconComponent size={18} />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                  {service.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Important Information */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-gray-900">Important Information</h3>
          
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-4">
              <h4 className="text-base font-semibold mb-3">How to Buy BPC Code</h4>
              <div className="min-h-[80px]">
                <TypingText 
                  texts={instructionSteps}
                  typingSpeed={80}
                  pauseTime={1500}
                />
              </div>
              
              <div className="flex gap-2 mt-3">
                <div className="h-1.5 w-1.5 bg-white/60 rounded-full"></div>
                <div className="h-1.5 w-1.5 bg-white rounded-full"></div>
                <div className="h-1.5 w-1.5 bg-white/60 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
