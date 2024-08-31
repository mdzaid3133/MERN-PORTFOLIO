import React, { useEffect, useState } from 'react'
import { FaGithub, FaInstagram, FaLinkedin, } from 'react-icons/fa';
import { fetchHomeData } from '@/Redux/slices/homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import FooterSkeleton from '../skeleton/FooterSkeleton';

function Footer() {

  const dispatch = useDispatch()
  const { homeData,loading } = useSelector((store) => store.home);
  const {currentMode} = useSelector((store)=> store.mode)


  useEffect(() => {
    (async () => {
      await dispatch(fetchHomeData());
    })();
  }, []);

  const [currectDate, setCurrentDate] = useState()

  useEffect(() => {
    const currentYear = new Date().getFullYear()
    setCurrentDate(currentYear)
  }, [currectDate])

   if(!loading){
    return <FooterSkeleton/>
   }
  return (
    <footer className={`my-component flex flex-wrap items-center md:justify-between justify-center md:px-32 p-5 border-t-2 gap-5 ${currentMode === 'dark' ? 'border-slate-200' : 'border-gray-800'}`}>
      <p className='text-center md:text-left text-sm'>Copyright © {currectDate} My Portfolio. All rights reserved by MD ZAID.</p>
      <div  className=' flex items-center gap-5 text-blue-500'>
        <a href={homeData?.gitHubLink} target="_blank" rel="noopener noreferrer" className='text-blue-500 bg-white w-6 h-6 p-1 rounded-full hover:bg-blue-500 hover:text-white transition duration-200 ease-in'>
          <FaGithub size={15} data-aos="fade-left" />
        </a>
        <a href={homeData?.linkdinLink} target="_blank" rel="noopener noreferrer" className='text-blue-500 bg-white w-6 h-6 p-1 rounded-full hover:bg-blue-500 hover:text-white transition duration-200 ease-in'>
          <FaLinkedin size={15} data-aos="fade-left" />
        </a>
        <a href={homeData?.instagramLink} target="_blank" rel="noopener noreferrer" className='text-blue-500 bg-white w-6 h-6 p-1 rounded-full hover:bg-blue-500 hover:text-white transition duration-200 ease-in'>
          <FaInstagram size={15} data-aos="fade-left" />
        </a>
        <a href={homeData?.letCodeLink} target="_blank" rel="noopener noreferrer" className='text-blue-500 bg-white w-6 h-6  rounded-full hover:bg-blue-500 hover:text-white transition duration-200 ease-in'>
          <img src='https://img.icons8.com/?size=100&id=9L16NypUzu38&format=png&color=000000' alt="LeetCode" className='w-6 h-6 p-1 rounded-full' />
        </a>
      </div>
    </footer>
  )
}

export default Footer