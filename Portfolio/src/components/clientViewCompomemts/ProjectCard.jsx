import { Link2Icon } from 'lucide-react'
import React from 'react'
import { Badge } from '../ui/badge'
import { FaGithub } from 'react-icons/fa'



function ProjectCard({project, index}) {
  //console.log('[roject-card] Project', project)

   const teckStackArray = project?.teckStack.split(',');
   
       //formate data
       const dateStr = project?.createDate;
       const date = new Date(dateStr);
   
       // Format as YYYY-MM-DD
       const formattedDate = date.toISOString().split('T')[0];

  return (
    <div 
      key={index +1}
     className='flex items-center flex-wrap-reverse justify-between md:py-10 p-2 md:gap-0 gap-8 border rounded-lg'>
        {/* //details section */}
        <div className='md:w-1/2 w-full md:px-5'>
         <div className='flex items-center justify-between mb-6'>
         <h2 className='md:text-5xl  text-4xl font-bold text-blue-500'>{index < 10 ? `0${index +1}` : index+1}</h2>
         <Badge variant="outline" className={`text-white`}>{project?.projectLiveURL === ""? 'No Live' : "Live"}</Badge>
         </div>
          <h3 className='text-xl font-bold mb-4'>{project?.projectName}</h3>
           <p className='mb-2'>{formattedDate}</p>
          <p className='text-sm font-thin mb-4'>{project?.projectDescription}</p>
          <ul className='flex flex-wrap gap-3 pb-2'>
            {
              teckStackArray.map((tech, i) => (
                <li key={i} className='text-sm md:text-sm border rounded-full px-2 '>{tech}</li>
              ))
            }
          </ul>
           <hr className='mt-3'/>
           {/* //links */}
           <div className={`flex items-center gap-5 mt-4`}>
            {
              project?.projectLiveURL &&
              <a href={project?.projectLiveURL} target='_blank'>
            <Link2Icon className={`w-10 h-10 bg-[rgba(145,142,142,0.3)] hover:bg-[rgba(86,85,85,0.3)] transition duration-100  cursor-pointer text-white rounded-full p-2`}/>        
            </a>
            }
           
           <a  href={project?.projectLink} target='_blank'>
           <FaGithub className='w-10 h-10 bg-[rgba(145,142,142,0.3)] hover:bg-[rgba(86,85,85,0.3)] transition duration-100  cursor-pointer text-white rounded-full p-2'/> 
           </a>
           </div>
        </div>

        {/* //image section */}
        <div className='rounded-lg overflow-hidden md:w-1/2 w-full md:px-5'>
          <img
           className='rounded-lg w-full md:h-[300px] h-[200px] overflow-hidden'
           src={project?.projectImage?.secure_url ? (project?.projectImage?.secure_url) : ('https://www.prokerala.com/movies/assets/img/no-poster-available.jpg')} />
        </div>
    </div>
  )
}

export default ProjectCard