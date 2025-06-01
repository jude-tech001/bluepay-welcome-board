
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface AirtimePageProps {
  onBack: () => void;
  onPurchaseSuccess: (amount: number, type: 'airtime', description: string) => void;
  balance: number;
}

const AirtimePage: React.FC<AirtimePageProps> = ({ onBack, onPurchaseSuccess, balance }) => {
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [bpcCode, setBpcCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bpcError, setBpcError] = useState('');

  const networks = ['MTN', 'Airtel', 'Glo', '9Mobile'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBpcError('');
    
    if (bpcCode !== 'BPC-@37657-OQ') {
      setBpcError('Invalid BPC code');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      onPurchaseSuccess(Number(amount), 'airtime', `${selectedNetwork} Airtime - ${phoneNumber}`);
      
      setTimeout(() => {
        onBack();
      }, 3000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm mx-4">
          <div className="mb-4">
            <CheckCircle size={80} className="text-blue-600 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Airtime Purchase Successful</h2>
          <p className="text-gray-600 mb-6">
            Your ₦{Number(amount).toLocaleString()} {selectedNetwork} airtime has been purchased successfully.
          </p>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12">
            Ok, I got it
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Processing airtime purchase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white">Buy Airtime</h1>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Network</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
              <SelectTrigger className="h-14 rounded-xl border-2 border-blue-600 text-base">
                <SelectValue placeholder="Select Network" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300">
                {networks.map((network) => (
                  <SelectItem key={network} value={network} className="text-base">
                    {network}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-2">Phone Number</label>
            <Input
              type="text"
              placeholder="Enter 11-digit phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              maxLength={11}
              className="h-14 rounded-xl border-2 border-blue-600 text-base"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-2">Amount</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="h-14 rounded-xl border-2 border-blue-600 text-base"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-2">BPC CODE</label>
            <Input
              type="text"
              placeholder="Enter BPC code"
              value={bpcCode}
              onChange={(e) => setBpcCode(e.target.value)}
              required
              className="h-14 rounded-xl border-2 border-blue-600 text-base"
            />
            {bpcError && <p className="text-red-500 text-sm mt-1">{bpcError}</p>}
          </div>

          <div className="mt-6">
            <p className="text-lg font-medium text-gray-900 mb-4">
              Available Balance: ₦{balance.toLocaleString()}.00
            </p>
            
            <Button
              type="submit"
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-medium"
            >
              Purchase Airtime
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AirtimePage;
