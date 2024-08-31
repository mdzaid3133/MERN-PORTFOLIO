import React from 'react'

function HeaderSkeleton() {
  return (
    <div className={`my-component shadow-sm`}>
    <div className="flex justify-between items-center p-5 md:px-32 animate-pulse">
      <div className="w-28 h-10 bg-gray-500 dark:bg-gray-600 rounded-md"></div>
    
      <nav className="hidden md:flex space-x-6">
        {Array(7).fill("").map((_, index) => (
          <div key={index} className="w-16 h-6 bg-gray-500 dark:bg-gray-600 rounded-md"></div>
        ))}
      </nav>

      <div className="flex items-center gap-5">
        <div className="w-10 h-10 bg-gray-500 dark:bg-gray-600 rounded-full"></div>

        <div className="md:hidden">
          <div className="w-8 h-8 bg-gray-500 dark:bg-gray-600 rounded-md"></div>
        </div>
      </div>
      
      <div className="hidden md:flex">
        <div className="w-24 h-6 bg-gray-500 dark:bg-gray-600 rounded-md"></div>
      </div>
    </div>
  </div>
  )
}

export default HeaderSkeleton