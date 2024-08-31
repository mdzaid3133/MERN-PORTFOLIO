import React from 'react'

function ContactSkeleton() {
  return (
    <div className='my-component p-8 md:px-32'>
    <div className='flex items-center justify-between animate-pulse'>
      <div className='bg-gray-500 h-1 w-full rounded-full'></div>
      <span className='md:text-4xl text-2xl font-bold text-center whitespace-nowrap mx-5'>
        <div className='bg-gray-500 w-24 h-8 mx-auto rounded-md'></div>
      </span>
      <div className='bg-gray-500 h-1 w-full rounded-full'></div>
    </div>

    <div className='md:w-[90%] m-auto md:mt-24 mt-10 w-full md:px-10'>
      <div className='flex flex-wrap md:justify-between justify-center items-center md:gap-0 gap-8'>
        {/* My Details */}
        <div className='my-component md:w-1/2 w-full flex justify-center md:justify-start animate-pulse'>
          <div className='w-[300px] h-[180px] bg-gray-500 rounded-md'></div>
        </div>

        {/* Contact Form */}
        <div className='flex md:justify-end justify-center'>
          <div className={`w-[400px] rounded-lg border p-4 animate-pulse ${'border-gray-800'}`}>
            <div className='w-full mb-5 h-10 bg-gray-500 rounded-md'></div>
            <div className='w-full mb-5 h-10 bg-gray-500 rounded-md'></div>
            <div className='w-full mb-5 h-20 bg-gray-500 rounded-md'></div>
            <div className='h-10 w-32 bg-gray-500 rounded-full mx-auto'></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ContactSkeleton