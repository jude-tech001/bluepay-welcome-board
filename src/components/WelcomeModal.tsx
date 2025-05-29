
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, userEmail }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4 rounded-2xl p-8">
        <DialogHeader className="text-center space-y-6">
          <DialogTitle className="text-3xl font-bold text-gray-900">
            Welcome
          </DialogTitle>
          <DialogDescription className="text-gray-700 leading-relaxed text-base">
            <span className="text-blue-600 font-medium">{userEmail}</span> you have
            been given 200,000 to withdraw every day. dont click on the reset
            button untill tomorrow, else you will be banned join group{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline">
              Here
            </a>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex gap-4 mt-8">
          <Button
            onClick={onClose}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl h-12 text-base font-medium"
          >
            Close
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 text-base font-medium"
          >
            Reset
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
