
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Gift, CheckCircle } from 'lucide-react';

interface NotificationPageProps {
  onBack: () => void;
}

const NotificationPage: React.FC<NotificationPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white">Notifications</h1>
      </div>

      <div className="p-4 space-y-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Gift size={20} className="text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Welcome Bonus Credit</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Congratulations! You have received your welcome bonus of ₦200,000.
                </p>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-xs text-green-600 font-medium">Credited</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Just now</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">+₦200,000</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <CheckCircle size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Account Created Successfully</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Your BluePay account has been created successfully. Welcome to BluePay!
                </p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationPage;
