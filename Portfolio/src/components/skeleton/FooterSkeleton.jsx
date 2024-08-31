import React from 'react'

function FooterSkeleton() {
  return (
    <footer className={`my-component flex flex-wrap items-center md:justify-between justify-center md:px-32 p-5 border-t-2 gap-5 animate-pulse ${'border-gray-800'}`}>
    <div className='bg-gray-500 h-4 w-2/3 rounded-md'></div>
    <div className='flex items-center gap-5'>
      {/* GitHub */}
      <div className='bg-gray-500 w-6 h-6 p-1 rounded-full'></div>
      {/* LinkedIn */}
      <div className='bg-gray-500 w-6 h-6 p-1 rounded-full'></div>
      {/* Instagram */}
      <div className='bg-gray-500 w-6 h-6 p-1 rounded-full'></div>
      {/* LeetCode */}
      <div className='bg-gray-500 w-6 h-6 p-1 rounded-full'></div>
    </div>
  </footer>
  )
}

export default FooterSkeleton