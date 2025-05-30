
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
      <DialogContent className="sm:max-w-md mx-4 rounded-2xl p-6 bg-white border-0 shadow-xl">
        <DialogHeader className="text-center space-y-4">
          <DialogTitle className="text-2xl font-bold text-gray-900 text-center">
            WELCOME TO BLUEPAY
          </DialogTitle>
          <DialogDescription className="text-gray-700 leading-relaxed text-sm px-2 space-y-2">
            <div className="text-center">
              <span className="text-blue-600 font-medium block mb-2">{userEmail}</span>
              <p className="text-gray-600 text-sm leading-5">
                you have been given 200,000 to withdraw as a welcome bonus.you can also earn more money through referral click on close to continue 
                and kindly join our official group{' '}
                <button 
                  onClick={handleTelegramClick}
                  className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-700 transition-colors ml-1"
                >
                  Here
                </button>
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex gap-3 mt-6">
          <Button
            onClick={onClose}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl h-11 text-sm font-medium"
          >
            Close
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 text-sm font-medium"
          >
            Reset
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
