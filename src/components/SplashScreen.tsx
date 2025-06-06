
import React from 'react';
import { Button } from '@/components/ui/button';

interface SplashScreenProps {
  onGetStarted: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-blue-600 flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 text-white relative z-10">
        <div className="text-2xl font-bold">BLUEPAY</div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 relative z-10">
        {/* Logo Section */}
        <div className="mb-12">
          <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
            <div className="text-4xl font-black text-blue-600 text-center tracking-wider">
              BLUEPAY
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white leading-tight mb-6">
            Get Your Account Ready And Instantly.
          </h1>
          
          <p className="text-white/90 text-lg leading-relaxed max-w-sm">
            Get your account ready and instantly start buying, selling airtime and data online and start paying all your bills in cheaper price.
          </p>
        </div>

        {/* Get Started Button */}
        <Button
          onClick={onGetStarted}
          className="bg-white text-blue-600 hover:bg-gray-50 px-12 py-4 rounded-full text-lg font-semibold transition-colors duration-200 shadow-lg"
        >
          Get Started
        </Button>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full"></div>
        <div className="absolute top-1/3 -left-16 w-32 h-32 bg-blue-400/10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-700/20 rounded-full"></div>
        <div className="absolute bottom-1/3 left-5 w-16 h-16 bg-blue-300/15 rounded-full"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
