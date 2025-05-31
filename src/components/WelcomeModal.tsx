
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, userEmail }) => {
  const handleTelegramClick = () => {
    window.open('https://t.me/bluepayuser_telegram_channel', '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-sm mx-auto rounded-2xl p-0 bg-white border-0 shadow-xl">
        <div className="w-full p-6">
          <DialogHeader className="text-center space-y-4">
            <DialogTitle className="text-2xl font-bold text-gray-900 text-center">
              Welcome
            </DialogTitle>
            <DialogDescription className="text-gray-700 leading-relaxed text-sm">
              <div className="w-full text-center">
                <p className="text-gray-900 text-sm leading-5 text-center w-full">
                  {userEmail.split('@')[0]} You Have Been Given 200,000 to withdraw as a welcome bonus. make more money through referral and enjoy easy earnings using bluepay join group{' '}
                  <button 
                    onClick={handleTelegramClick}
                    className="inline text-blue-600 underline font-medium"
                  >
                    Here
                  </button>
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex gap-3 mt-6 w-full">
            <Button
              onClick={onClose}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl h-11 text-sm font-medium"
            >
              CLOSED
            </Button>
            <Button
              onClick={handleTelegramClick}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 text-sm font-medium"
            >
              JOIN GROUP
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
