
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MessageCircle, Send } from 'lucide-react';

interface GroupPageProps {
  onBack: () => void;
}

const GroupPage: React.FC<GroupPageProps> = ({ onBack }) => {
  const handleTelegramJoin = () => {
    window.open('https://t.me/bluepay_official', '_blank');
  };

  const handleWhatsAppJoin = () => {
    window.open('https://chat.whatsapp.com/bluepay_group', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white">Join Our Community</h1>
      </div>

      <div className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-gray-900">Connect With Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleTelegramJoin}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center gap-3"
            >
              <Send size={20} />
              Join Telegram Channel
            </Button>
            
            <Button
              onClick={handleWhatsAppJoin}
              className="w-full h-12 bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center gap-3"
            >
              <MessageCircle size={20} />
              Join WhatsApp Group
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Why Join Our Community?</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Get latest updates and announcements</li>
              <li>• Connect with other BluePay users</li>
              <li>• Receive instant support</li>
              <li>• Access exclusive offers</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GroupPage;
