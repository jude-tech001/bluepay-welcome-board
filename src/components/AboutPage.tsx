
import React from 'react';
import { ArrowLeft, Shield, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white">About BluePay Pro</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">BluePay Pro</h2>
          <p className="text-gray-600 mb-6">Version 1.0.0</p>
          
          <p className="text-gray-700 leading-relaxed mb-8">
            BluePay Pro is a comprehensive financial platform designed to make transactions, 
            airtime purchases, and data subscriptions seamless and rewarding.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Transactions</h3>
              <p className="text-gray-600">
                Your security is our priority. All transactions are encrypted and protected 
                with industry-standard security protocols.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Zap size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast & Reliable</h3>
              <p className="text-gray-600">
                Experience lightning-fast transactions and reliable service delivery, 
                ensuring you never miss a beat.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Growing Community</h3>
              <p className="text-gray-600">
                Join thousands of satisfied users who trust BluePay Pro for their daily financial needs.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Legal Information</h3>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Terms of Service</h4>
            <p className="text-gray-600">
              By using BluePay Pro, you agree to our terms of service which govern 
              your use of the platform.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Privacy Policy</h4>
            <p className="text-gray-600">
              We respect your privacy. Learn how we collect, use, and protect your personal information.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Contact Us</h4>
            <p className="text-gray-600 mb-4">
              For inquiries, please contact us at
            </p>
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <span className="text-gray-800 font-medium">https://bluepayearn.netlify.app/</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
