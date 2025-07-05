
import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface WithdrawalNotification {
  name: string;
  amount: string;
  email: string;
}

const WithdrawalNotifications: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const withdrawals: WithdrawalNotification[] = [
    { name: 'Chiamaka Ndukwe', amount: '₦124,500', email: 'chiamaka.ndukwe@gmail.com' },
    { name: 'Emmanuel Okafor', amount: '₦89,200', email: 'emmanuel.okafor@gmail.com' },
    { name: 'Fatima Abubakar', amount: '₦156,800', email: 'fatima.abubakar@gmail.com' },
    { name: 'David Adebayo', amount: '₦203,450', email: 'david.adebayo@gmail.com' },
    { name: 'Grace Okoro', amount: '₦98,750', email: 'grace.okoro@gmail.com' },
    { name: 'Ibrahim Hassan', amount: '₦175,300', email: 'ibrahim.hassan@gmail.com' },
    { name: 'Sarah Egwu', amount: '₦142,600', email: 'sarah.egwu@gmail.com' },
    { name: 'Michael Okonkwo', amount: '₦118,900', email: 'michael.okonkwo@gmail.com' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % withdrawals.length);
        setIsVisible(true);
      }, 300);
    }, 40000);

    return () => clearInterval(interval);
  }, [withdrawals.length]);

  const currentWithdrawal = withdrawals[currentIndex];

  return (
    <div className="fixed top-4 left-4 right-4 z-50">
      <div
        className={`bg-white text-gray-800 px-4 py-3 rounded-lg shadow-lg border border-gray-200 transition-all duration-300 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'
        }`}
      >
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {currentWithdrawal.name} just withdrew {currentWithdrawal.amount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalNotifications;
