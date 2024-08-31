import React from 'react';

function HomeSkeleton() {
  return (
    <>
      <div className="text-center md:text-left md:w-1/2 w-full animate-pulse">
        <div>
          <div className="mb-14 flex flex-col">
            <div className="h-6 bg-gray-500 rounded w-1/4"></div>
          </div>
          <div className="h-6 bg-gray-500 rounded w-1/2"></div>
          <div className="h-6 bg-gray-500 rounded w-1/3 mt-3"></div>
          <div className="h-4 bg-gray-500 rounded w-full mt-5"></div>
          <div className="mt-6 flex gap-3">
            <div className="h-8 w-20 bg-gray-500 rounded-full "></div>
            <div className="h-8 w-20 bg-gray-500 rounded-full"></div>
          </div>
        </div>
        <div className="flex gap-3 mt-8 justify-center md:justify-start">
          <div className="border border-gray-800 bg-gray-500 w-8 h-8 rounded-full"></div>
          <div className="border border-gray-800 bg-gray-500 w-8 h-8 rounded-full"></div>
          <div className="border border-gray-800 bg-gray-500 w-8 h-8 rounded-full"></div>
          <div className="border border-gray-800 bg-gray-500 w-8 h-8 rounded-full"></div>
        </div>
      </div>
      <div className="md:w-1/2 w-full flex justify-center animate-pulse">
        <div
          style={{
            borderRadius: '81% 19% 46% 54% / 32% 19% 81% 68%',
            backgroundColor: '#3b82f6',
          }}
          className="w-[400px] h-[400px] overflow-hidden"
        >
          <div className="w-full h-full bg-gray-500"></div>
        </div>
      </div>
    </>
  );
}

export default HomeSkeleton;
