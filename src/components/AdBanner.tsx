
import React from 'react';

const AdBanner = () => {
  return (
    <div className="w-full py-4 bg-gray-50 border-y border-gray-200 my-8">
      <div className="container mx-auto px-4">
        <div className="h-[90px] flex items-center justify-center bg-gray-100 rounded-lg">
          {/* Google AdSense code would go here */}
          <div className="text-sm text-gray-400">Advertisement</div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
