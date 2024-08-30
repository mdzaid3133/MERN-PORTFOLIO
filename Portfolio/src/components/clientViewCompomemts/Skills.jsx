import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/Redux/store';
import { fetchSkillData } from '@/Redux/slices/skillSlice';
import SkillCard from './SkillCard';

function Skills() {

  const { skillData } = useSelector((store) => store.skill)
  const { currentMode } = useSelector((store) => store.mode)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSkillData())

    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });

  }, [])

  const uniqueSkillSections = [...new Set(skillData.map(skill => skill.skillSection))];

    console.log(uniqueSkillSections);
  return (
    <div className=' my-component p-8 md:px-32'>
      <div className='flex  items-center justify-between'>
        <div className='bg-blue-500 h-1 w-full rounded-full'></div>
        <span data-aos="zoom-in" className='md:text-4xl text-2xl font-bold text-center whitespace-nowrap mx-5'>My<span className='text-blue-500 ml-3'>Skills</span></span>
        <div className='bg-blue-500 h-1 w-full rounded-full'></div>
      </div>
      <div className={`mt-10`}>
        <div className={` grid md:grid-cols-2 grid-cols-1   gap-10  w-fllu md:w-[80%] m-auto text-center`}>
           {
             uniqueSkillSections&& uniqueSkillSections.map((section)=>{
              return (
                <SkillCard
                skills={skillData}
                  section={section}
                />
              )
             })
           }
              
        </div>
      </div>
    </div>
  )
}

export default Skills