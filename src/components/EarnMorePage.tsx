
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Copy, Share2, Users, Gift } from 'lucide-react';

interface EarnMorePageProps {
  onBack: () => void;
  userEmail: string;
}

const EarnMorePage: React.FC<EarnMorePageProps> = ({ onBack, userEmail }) => {
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  
  // Generate referral link using user email as identifier
  const referralCode = btoa(userEmail).slice(0, 8);
  const referralLink = `https://bluepay-registration-signup.vercel.app/?ref=${referralCode}`;

  // Load referral data from localStorage
  useEffect(() => {
    const savedReferrals = localStorage.getItem(`referrals_${referralCode}`);
    if (savedReferrals) {
      const referralData = JSON.parse(savedReferrals);
      setReferralCount(referralData.count || 0);
      setTotalEarnings(referralData.count * 10000 || 0);
    }
  }, [referralCode]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Register on BluePay and start earning today - Sign up now!',
          text: 'Register on BluePay and start earning today - Sign up now!',
          url: referralLink,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white">Earn More</h1>
      </div>

      <div className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-gray-900 flex items-center justify-center gap-2">
              <Gift className="text-blue-600" size={24} />
              Refer & Earn
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">₦10,000</h3>
              <p className="text-gray-600">For each successful referral</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">Your Referral Link</h4>
              <div className="bg-white p-3 rounded-lg border border-gray-200 mb-3">
                <p className="text-sm text-gray-600 break-all">{referralLink}</p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleCopyLink}
                  className="flex-1 h-10 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2"
                >
                  <Copy size={16} />
                  {copied ? 'Copied!' : 'Copy Link'}
                </Button>
                <Button
                  onClick={handleShare}
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
                >
                  <Share2 size={16} />
                  Share
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">How it works:</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                  <span>Share your referral link with friends</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                  <span>They sign up using your link</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
                  <span>You earn ₦10,000 for each successful signup</span>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardContent className="p-4 text-center">
                <Users className="mx-auto text-blue-600 mb-2" size={32} />
                <h4 className="font-semibold text-gray-900">{referralCount} Referrals</h4>
                <p className="text-sm text-gray-600">Total Earned: ₦{totalEarnings.toLocaleString()}</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EarnMorePage;
