import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css';
import EducationCard from './EducationCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEducationtData } from '@/Redux/slices/educationSlice';
import store from '@/Redux/store';
import EducationSkeleton from '../skeleton/EducationSkeleton';

const Education = () => {
     const dispatch = useDispatch()
     const {educationsData,loading} = useSelector((store)=> store.education)
    useEffect(()=>{
        dispatch(fetchEducationtData())
        AOS.init({
          offset: 200,
          duration: 600,
          easing: 'ease-in-sine',
          delay: 100,
        });
      },[])

      if(!loading){
        return <EducationSkeleton/>
      }

    return (
        <div className="my-component p-8 md:px-32">
            <div className='flex  items-center justify-between'>
                <div className='bg-blue-500 h-1 w-full rounded-full'></div>
                <span data-aos="zoom-in" className='md:text-4xl text-2xl font-bold text-center whitespace-nowrap mx-5'>My <span className='text-blue-500'>Education</span></span>
                <div className='bg-blue-500 h-1 w-full rounded-full'></div>
            </div>

            {/* Education Section */}

            <div className='md:w-[70%] m-auto md:mt-24 mt-10 w-full md:px-10'>
                <div  className="space-y-6 py-4 ">
                   {
                    educationsData && educationsData.map((education, index) => (
                        <EducationCard 
                           education={education}
                           
                        />
                    )) || <p>Loading...</p>
                   }
                   
                </div>
            </div>
        </div>
    );
};



export default Education;
