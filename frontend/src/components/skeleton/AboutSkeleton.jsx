import React from 'react';

function AboutSkeleton() {
  return (
    <div>
      <div className="my-component p-8 md:px-32 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="bg-gray-500 h-1 w-full rounded-full"></div>
          <div className="md:text-4xl text-2xl font-bold text-center whitespace-nowrap mx-5">
            <div className="inline-block h-8 bg-gray-500 rounded w-24"></div>
          </div>
          <div className="bg-gray-500 h-1 w-full rounded-full"></div>
        </div>
        <div className="flex flex-wrap-reverse items-center justify-center md:gap-0 gap-8 md:py-20 py-10">
          <div className="md:w-1/2 w-full flex justify-center animate-pulse">
            <div
              style={{ borderRadius: '51% 49% 48% 52% / 32% 29% 71% 68%' }}
              className="w-[400px] h-[400px] overflow-hidden shadow-white shadow-md bg-gray-500"
            >
              <div className="w-full h-full bg-gray-500"></div>
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="mb-6  capitalize bg-gray-500 h-8 rounded-lg"></div>
            <div className="text-center bg-gray-500 h-20 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSkeleton;
