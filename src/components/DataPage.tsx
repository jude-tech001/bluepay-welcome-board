
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface DataPageProps {
  onBack: () => void;
  onPurchaseSuccess: (amount: number, type: 'data', description: string) => void;
  balance: number;
}

const DataPage: React.FC<DataPageProps> = ({ onBack, onPurchaseSuccess, balance }) => {
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedBundle, setSelectedBundle] = useState('');
  const [bpcCode, setBpcCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bpcError, setBpcError] = useState('');

  // Touch/swipe handling
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse drag handling for desktop
  const mouseStartX = useRef<number>(0);
  const mouseEndX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isRightSwipe = distance < -50;

    if (isRightSwipe) {
      onBack();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    mouseEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    const distance = mouseStartX.current - mouseEndX.current;
    const isRightDrag = distance < -100;

    if (isRightDrag) {
      onBack();
    }
  };

  // Add event listeners for mouse events
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      mouseEndX.current = e.clientX;
    };

    const handleGlobalMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      
      const distance = mouseStartX.current - mouseEndX.current;
      const isRightDrag = distance < -100;

      if (isRightDrag) {
        onBack();
      }
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [onBack]);

  const networks = ['MTN', 'Airtel', 'Glo', '9Mobile'];

  const dataBundles = [
    { name: '1GB (30 Days)', price: 500 },
    { name: '2GB (30 Days)', price: 1000 },
    { name: '5GB (30 Days)', price: 2000 },
    { name: '10GB (30 Days)', price: 3500 },
    { name: '20GB (30 Days)', price: 5000 },
  ];

  const selectedBundlePrice = dataBundles.find(bundle => bundle.name === selectedBundle)?.price || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBpcError('');
    
    if (bpcCode !== 'BPC-2008@Code205OT') {
      setBpcError('Invalid BPC code');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      onPurchaseSuccess(selectedBundlePrice, 'data', `${selectedNetwork} Data - ${selectedBundle}`);
      
      setTimeout(() => {
        onBack();
      }, 3000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div 
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm mx-4">
          <div className="mb-4">
            <CheckCircle size={80} className="text-blue-600 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Purchase Successful</h2>
          <p className="text-gray-600 mb-6">
            Your {selectedBundle} {selectedNetwork} data bundle has been purchased successfully.
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
      <div 
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Processing data purchase...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gray-50"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Header */}
      <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white">Buy Data Bundle</h1>
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
            <label className="block text-gray-700 text-sm mb-2">Data Bundle</label>
            <Select value={selectedBundle} onValueChange={setSelectedBundle}>
              <SelectTrigger className="h-14 rounded-xl border-2 border-blue-600 text-base">
                <SelectValue placeholder="Select Data Bundle" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300">
                {dataBundles.map((bundle) => (
                  <SelectItem key={bundle.name} value={bundle.name} className="text-base">
                    {bundle.name} - ₦{bundle.price.toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              disabled={!selectedBundle}
            >
              Purchase Data
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataPage;
