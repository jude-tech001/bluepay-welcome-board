
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

interface WithdrawalPageProps {
  onBack: () => void;
}

const WithdrawalPage: React.FC<WithdrawalPageProps> = ({ onBack }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');
  const [bpcCode, setBpcCode] = useState('');

  const nigerianBanks = [
    'Access Bank',
    'Ecobank Nigeria',
    'Fidelity Bank',
    'First Bank of Nigeria',
    'Guaranty Trust Bank',
    'Heritage Bank',
    'Keystone Bank',
    'Polaris Bank',
    'Providus Bank',
    'Stanbic IBTC Bank',
    'Standard Chartered Bank',
    'Sterling Bank',
    'Union Bank of Nigeria',
    'United Bank for Africa',
    'Unity Bank',
    'Wema Bank',
    'Zenith Bank',
    'Jaiz Bank',
    'SunTrust Bank',
    'Titan Trust Bank',
    'Globus Bank',
    'VFD Microfinance Bank',
    'Sparkle Microfinance Bank',
    'NPF Microfinance Bank',
    'LAPO Microfinance Bank',
    'AB Microfinance Bank',
    'Accion Microfinance Bank',
    'Advans La Fayette Microfinance Bank',
    'Amju Unique Microfinance Bank',
    'Bainescredit Microfinance Bank',
    'CEMCS Microfinance Bank',
    'Covenant Microfinance Bank',
    'Eyowo',
    'Fcmb Microfinance Bank',
    'Fina Trust Microfinance Bank',
    'Full Range Microfinance Bank',
    'Grooming Microfinance Bank',
    'Hackman Microfinance Bank',
    'Hasal Microfinance Bank',
    'Ibile Microfinance Bank',
    'Ikoyi Osun Microfinance Bank',
    'Imowo Microfinance Bank',
    'Infiniti Microfinance Bank',
    'Kredi Money Microfinance Bank',
    'Lagos Building Investment Company',
    'Mainstreet Microfinance Bank',
    'Mkobo Microfinance Bank',
    'OPay',
    'PalmPay',
    'Parallex Bank',
    'Parkway - ReadyCash',
    'Petra Microfinance Bank',
    'QuickFund Microfinance Bank',
    'Rephidim Microfinance Bank',
    'Safe Haven Microfinance Bank',
    'Seedvest Microfinance Bank',
    'Stellas Microfinance Bank',
    'TagPay',
    'Tangerine Money',
    'TCF Microfinance Bank',
    'Uhuru Microfinance Bank',
    'Unaab Microfinance Bank',
    'Unical Microfinance Bank',
    'Vine Microfinance Bank',
    'Xenith Microfinance Bank'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Withdrawal submitted:', {
      accountNumber,
      selectedBank,
      accountName,
      amount,
      bpcCode
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white">Transfer To Bank</h1>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Bank Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
              className="h-14 rounded-xl border-2 border-blue-600 text-base"
            />
          </div>

          <div>
            <Select value={selectedBank} onValueChange={setSelectedBank}>
              <SelectTrigger className="h-14 rounded-xl border-2 border-blue-600 text-base">
                <SelectValue placeholder="OPay" />
              </SelectTrigger>
              <SelectContent className="max-h-60 bg-white border border-gray-300">
                {nigerianBanks.map((bank) => (
                  <SelectItem key={bank} value={bank} className="text-base">
                    {bank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Input
              type="text"
              placeholder="Account Name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
              className="h-14 rounded-xl border-2 border-blue-600 text-base"
            />
          </div>

          <div>
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="h-14 rounded-xl border-2 border-blue-600 text-base"
            />
          </div>

          <div>
            <Input
              type="text"
              placeholder="BPC Code"
              value={bpcCode}
              onChange={(e) => setBpcCode(e.target.value)}
              required
              className="h-14 rounded-xl border-2 border-blue-600 text-base"
            />
          </div>

          <div className="mt-6">
            <p className="text-lg font-medium text-gray-900 mb-4">
              Available Balance: ₦200000.00
            </p>
            
            <Button
              type="submit"
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-medium"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawalPage;
