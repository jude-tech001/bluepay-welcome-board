
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface WatchPageProps {
  onBack: () => void;
}

const WatchPage: React.FC<WatchPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white">Watch</h1>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">YouTube Watch Space</h2>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/OOHonNE2mew?si=ifCBycPsrvh__Yh7"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Featured Video</h3>
            <p className="text-gray-600 text-sm">
              Watch this featured content on BluePay platform
            </p>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-xl">
          <h4 className="font-semibold text-blue-900 mb-2">Watch & Earn</h4>
          <p className="text-blue-700 text-sm">
            Watch videos to earn rewards and discover new content on BluePay.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
