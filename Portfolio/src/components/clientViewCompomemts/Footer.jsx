import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css';
import { FaGithub, FaInstagram, FaLinkedin, } from 'react-icons/fa';
import { fetchHomeData } from '@/Redux/slices/homeSlice';
import { useDispatch, useSelector } from 'react-redux';

function Footer() {

  const dispatch = useDispatch()
  const { homeData } = useSelector((store) => store.home);


  useEffect(() => {
    (async () => {
      await dispatch(fetchHomeData());
    })();
  }, []);


  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });
  }, [])
  const [currectDate, setCurrentDate] = useState()

  useEffect(() => {
    const currentYear = new Date().getFullYear()
    setCurrentDate(currentYear)
  }, [currectDate])
  return (
    <footer className=' my-component flex flex-wrap items-center md:justify-between justify-center md:px-32 p-5 border-t-2 gap-5'>
      <p className='text-center md:text-left text-sm'>Copyright © {currectDate} My Portfolio. All rights reserved by MD ZAID.</p>
      <div data-aos=" slide-right" className=' flex items-center gap-5 text-blue-500'>
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