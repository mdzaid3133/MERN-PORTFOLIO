import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/Redux/store';
import { fetchSkillData } from '@/Redux/slices/skillSlice';


function Skills() {

   const  {skillData} = useSelector((store) => store.skill)

    const dispatch = useDispatch()

  useEffect(()=>{
     dispatch(fetchSkillData())

    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });
  },[])
  return (
    <div className=' my-component p-8 md:px-32'>
           <div className='flex  items-center justify-between'>
         <div className='bg-blue-500 h-1 w-full rounded-full'></div>
         <span data-aos="zoom-in" className='md:text-4xl text-2xl font-bold text-center whitespace-nowrap mx-5'>My<span className='text-blue-500 ml-3'>Skills</span></span>
          <div className='bg-blue-500 h-1 w-full rounded-full'></div>
       </div>
        <div className="mt-10">
            <div className='grid md:grid-cols-2 grid-cols-1   gap-10  w-fllu md:w-[80%] m-auto text-center'>
                 <div  data-aos="zoom-in" className='border p-3 border-gray-500 rounded-md bg-[#28262f]'>
                   <h2 className='text-2xl text-blue-500 mb-3 font-bold'>Frontend</h2>
                   <div className='flex flex-wrap gap-2 justify-center items-center'>
                     {skillData && skillData?.filter(item => item?.skillSection === 'frontend').map((item, index) => (
                         <div key={index}  data-aos="flip-left" className=' border border-gray-500 rounded-md  px-2 py-1 flex items-center justify-center'>
                          <img
                            src={item?.skillImage?.secure_url}
                            className='h-8'
                          />
                           <span className='ml-2'>{item?.skillName}</span>
                        </div>
                     ))}
                   </div>
                 </div>

                 <div data-aos="zoom-in" className='border p-3 border-gray-500 rounded-md bg-[#28262f]'>
                   <h2 className='text-2xl mb-2 text-blue-500 font-bold'>Backend</h2>
                   <div className='flex flex-wrap  justify-center items-center gap-2'>
                     {skillData && skillData?.filter(item => item?.skillSection === 'backend').map((item, index) => (
                         <div key={index} data-aos="flip-left" className=' border border-gray-500 rounded-md  px-2 py-1 flex items-center justify-center'>
                          <img
                            src={item?.skillImage?.secure_url}
                            className='h-8'
                          />
                           <span className='ml-2'>{item?.skillName}</span>
                        </div>
                     ))}
                   </div>
                 </div>


                 <div data-aos="zoom-in" className='border p-3 border-gray-500 rounded-md bg-[#28262f]'>
                   <h2 className='text-2xl mb-2 text-blue-500 font-bold'>Android</h2>
                   <div className='flex flex-wrap gap-2 justify-center items-center'>
                     {skillData && skillData?.filter(item => item?.skillSection === 'android').map((item, index) => (
                         <div key={index}  data-aos="flip-left" className=' border border-gray-500 rounded-md  px-2 py-1 flex items-center justify-center'>
                          <img
                            src={item?.skillImage?.secure_url}
                            className='h-8'
                          />
                           <span className='ml-2'>{item?.skillName}</span>
                        </div>
                     ))}
                   </div>
                 </div>


                 <div  data-aos="zoom-in" className='border p-3 border-gray-500 rounded-md bg-[#28262f]'>
                   <h2 className='text-2xl mb-2 text-blue-500 font-bold'>Other</h2>
                   <div className='flex flex-wrap gap-2 justify-center items-center'>
                     {skillData && skillData?.filter(item => item?.skillSection === 'other').map((item, index) => (
                         <div key={index}   data-aos="flip-left" className=' border border-gray-500 rounded-md  px-2 py-1 flex items-center justify-center'>
                          <img
                            src={item?.skillImage?.secure_url}
                            className='h-8'
                          />
                           <span className='ml-2'>{item?.skillName}</span>
                        </div>
                     ))}
                   </div>
                 </div>
                  
            </div>
        </div>
    </div>
  )
}

export default Skills