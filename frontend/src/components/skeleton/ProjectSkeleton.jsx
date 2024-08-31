import React from 'react'

function ProjectSkeleton() {
  return (
    <div className="my-component p-8 md:px-32 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="bg-gray-500 h-1 w-full rounded-full"></div>
      <div className="md:text-4xl text-2xl font-bold text-center whitespace-nowrap mx-5">
        <div className="inline-block h-8 bg-gray-500 rounded w-24"></div>
      </div>
      <div className="bg-gray-500 h-1 w-full rounded-full"></div>
    </div>
    <div className="md:w-[70%] m-auto md:mt-24 mt-10 w-full md:px-10 px-5">
      <div className="bg-gray-500 h-96 rounded-md"></div>
    </div>
  </div>
  )
}

export default ProjectSkeleton