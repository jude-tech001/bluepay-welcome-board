
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

  const handleJoinGroup = () => {
    window.open('https://t.me/bluepayuser_telegram_channel', '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full h-full sm:h-auto fixed inset-0 sm:relative sm:max-h-none rounded-none sm:rounded-2xl p-0 border-0 shadow-xl bg-white overflow-hidden">
        <div className="flex flex-col h-full justify-center px-6 py-8">
          <DialogHeader className="text-center space-y-6">
            <DialogTitle className="text-2xl font-bold text-gray-900 text-center">
              WELCOME TO BLUEPAY
            </DialogTitle>
            <DialogDescription className="text-gray-700 leading-relaxed text-base space-y-4">
              <div className="text-center flex flex-col items-center justify-center">
                <span className="text-blue-600 font-medium block mb-4 text-lg">{userEmail}</span>
                <div className="w-full max-w-sm">
                  <p className="text-gray-700 text-base leading-6 text-center">
                    You Have Been Given 200,000 to withdraw everyday. don't click on the reset button until tomorrow, else you will be banned join group{' '}
                    <button 
                      onClick={handleTelegramClick}
                      className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors ml-1"
                    >
                      Here
                    </button>
                  </p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex gap-3 mt-8">
            <Button
              onClick={onClose}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl h-11 text-sm font-medium"
            >
              CLOSED
            </Button>
            <Button
              onClick={handleJoinGroup}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 text-sm font-medium"
            >
              Join Group
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
