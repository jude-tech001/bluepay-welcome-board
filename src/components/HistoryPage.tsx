
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowUpRight, Calendar, Phone, Wifi, TrendingUp } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'withdrawal' | 'deposit' | 'airtime' | 'data';
  amount: number;
  description: string;
  date: string;
  status: 'success' | 'pending' | 'failed';
}

interface HistoryPageProps {
  onBack: () => void;
  transactions: Transaction[];
}

const HistoryPage: React.FC<HistoryPageProps> = ({ onBack, transactions }) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'airtime':
        return <Phone size={16} className="text-green-500" />;
      case 'data':
        return <Wifi size={16} className="text-blue-500" />;
      case 'withdrawal':
        return <TrendingUp size={16} className="text-red-500" />;
      default:
        return <ArrowUpRight size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white">Transaction History</h1>
      </div>

      <div className="p-4">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <Calendar size={80} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No transactions yet</h3>
            <p className="text-gray-500 text-center">
              Your transaction history will appear here once you make your first transaction.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h2>
            
            {transactions.map((transaction) => (
              <Card key={transaction.id} className="border-l-4 border-l-blue-600">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getTransactionIcon(transaction.type)}
                        <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{transaction.date}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'success' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">
                        -₦{transaction.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
