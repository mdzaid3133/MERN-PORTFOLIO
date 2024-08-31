import React from 'react'

function SkillSkeleton() {
  return (
    <div className="my-component p-8 md:px-32 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="bg-gray-500 h-1 w-full rounded-full"></div>
        <div className="md:text-4xl text-2xl font-bold text-center whitespace-nowrap mx-5">
          <div className="inline-block h-8 bg-gray-500 rounded w-24"></div>
        </div>
        <div className="bg-gray-500 h-1 w-full rounded-full"></div>
      </div>
      <div className="mt-10">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 w-full md:w-[80%] m-auto text-center">
          {/* Skeletons for the Skill Cards */}
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="border p-3 border-gray-500 rounded-md bg-gray-500 h-32"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillSkeleton