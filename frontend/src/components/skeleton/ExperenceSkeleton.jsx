import React from 'react'

function ExperenceSkeleton() {
  return (
        <div className="my-component p-8 md:px-32 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="bg-gray-500 h-1 w-full rounded-full"></div>
            <div className="md:text-4xl text-2xl font-bold text-center whitespace-nowrap mx-5">
              <div className="inline-block h-8 bg-gray-500 rounded w-24"></div>
             
            </div>
            <div className="bg-gray-500 h-1 w-full rounded-full"></div>
          </div>
    
          {/* Experience Section Skeleton */}
    
          <div className="relative md:w-[73%] m-auto md:mt-24 mt-10 w-full md:px-10 px-8">
            <div className="space-y-6 py-4">
              {[1].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-500 h-28 rounded-md"
                ></div>
              ))}
            </div>
          </div>
        </div>
      );
}

export default ExperenceSkeleton