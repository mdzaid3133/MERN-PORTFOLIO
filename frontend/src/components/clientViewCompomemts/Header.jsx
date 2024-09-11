import React, {useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import DigitalClock from './DigitalClock';
import { Link } from 'react-scroll';
import { toggleMode } from '@/Redux/slices/stateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaMoon } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";
import HeaderSkeleton from '../skeleton/HeaderSkeleton';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const {currentMode} = useSelector((store)=> store.mode)
  const {loading} = useSelector((store)=> store.home)
  const [activeTab, setActiveTab] = useState('Home')


  const handleTabChange = (tab) => {
    setActiveTab(tab);
    console.log(activeTab)
    setIsOpen(false);
  };

  const chnageMode = () => {
    dispatch(toggleMode());
  };


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

   if(!loading){
     return <HeaderSkeleton/>
   }
  return (
    <div className={`my-component ${currentMode === 'dark' ? ' bg-[#28262f] text-white' : 'bg-slate-200 text-gray-800'} shadow-md`}>
      <div className="flex justify-between items-center py-4 md:px-32 px-5 ">
        <div className="text-2xl font-bold">
          <a href="/">
           <div className={` ${currentMode === 'dark' ? ' border-white' : 'border-gray-800'} border p-1 space-x-3 rounded-md`}>
             <span>MD</span>
             <span className={`${currentMode === 'dark' ? ' bg-slate-200' : 'bg-gray-800'} ${currentMode === 'dark' ? ' text-gray-800' : 'text-white'} rounded-md  px-1 `}>ZAID</span>
           </div>
          </a>
        </div>
      
        <nav className={`hidden md:flex space-x-6 border p-2 px-6 rounded-full ${currentMode === 'dark' ? ' border-slate-400' : 'border-gray-800'}`}>
          <Link to="home"smooth={true} duration={500}>
            <span onClick={()=> handleTabChange('Home')}
            className={`font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2 cursor-pointer ${activeTab === 'Home' ? 'text-blue-500 border-b-2 border-blue-600' : ""}`}>
              Home
            </span>
          </Link>

          <Link to="about" smooth={true} duration={500}>
            <span onClick={()=> handleTabChange('About')} className={`font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2 cursor-pointer ${activeTab === 'About' ? 'text-blue-500 border-b-2 border-blue-600' : ""}`}>
              About
            </span>
          </Link>

          <Link to="skills" smooth={true} duration={500}>
            <span onClick={()=> handleTabChange('Skill')} className={`font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2 cursor-pointer ${activeTab === 'Skill' ? 'text-blue-500 border-b-2 border-blue-600' : ""}`}>
              Skills
            </span>
          </Link>

          <Link to="projects" smooth={true} duration={500}>
            <span onClick={()=> handleTabChange('Projects')} className={`font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2 cursor-pointer ${activeTab === 'Projects' ? 'text-blue-500 border-b-2 border-blue-600' : ""}`}>
              Projects
            </span>
          </Link>

          <Link to="education" smooth={true} duration={500}>
            <span onClick={()=> handleTabChange('Educations')} className={`font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2 cursor-pointer ${activeTab === 'Educations' ? 'text-blue-500 border-b-2 border-blue-600' : ""}`}>
              Education
            </span>
          </Link>

          <Link to="experience" smooth={true} duration={500}>
            <span onClick={()=> handleTabChange('Experences')} className={`font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2 cursor-pointer ${activeTab === 'Experiences' ? 'text-blue-500 border-b-2 border-blue-600' : ""}`}>
              Experience
            </span>
          </Link>

          <Link to="contact" smooth={true} duration={500}>
            <span onClick={()=> handleTabChange('Contact')} className={`font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2 cursor-pointer ${activeTab === 'Contact' ? 'text-blue-500 border-b-2 border-blue-600' : ""}`}>
              Contact
            </span>
          </Link>
        </nav>

         <div className='flex items-center gap-10'>
         <div>
        {
          currentMode === 'light'? (
            <IoSunnySharp 
             onClick={chnageMode}
            size={20} className='text-2xl cursor-pointer'/>
          ) : (
            <FaMoon 
             onClick={chnageMode}
            size={20} className='text-2xl cursor-pointer'/>
          )
        }
        </div>

        <div className="hidden md:flex">
          <DigitalClock />
        </div>
       

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes size={20} /> : <FaBars size={30} />}
          </button>
        </div>
         </div>

        
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`border  border-gray-800 fixed top-0 right-0 h-full w-3/4 md:hidden ${currentMode === 'dark' ? ' bg-[#28262f]' : 'bg-slate-100'} ${currentMode === 'dark' ? ' text-white' : 'text-gray-800'}  flex flex-col  px-4  space-y-4 py-16 text-center z-50 transition-all duration-300 ease-in`}>
          <button onClick={toggleMenu} className="absolute top-5 right-5">
            <FaTimes size={30} />
          </button>
          <Link to="home" smooth={true} duration={500} onClick={closeMenu}>
            <p className="border  px-5 py-2 rounded-full  font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2">
              Home
            </p>
          </Link>
          <Link to="about" smooth={true} duration={500} onClick={closeMenu}>
            <p className=" border  px-5 py-2 rounded-full  font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2">
              About
            </p>
          </Link>
          <Link to="skills" smooth={true} duration={500} onClick={closeMenu}>
            <p className=" border  px-5 py-2 rounded-full  font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2">
              Skills
            </p>
          </Link>
          <Link to="projects" smooth={true} duration={500} onClick={closeMenu}>
            <p className=" border  px-5 py-2 rounded-full  font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2">
              Projects
            </p>
          </Link>
          <Link to="education" smooth={true} duration={500} onClick={closeMenu}>
            <p className=" border  px-5 py-2 rounded-full  font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2">
              Education
            </p>
          </Link>
          <Link to="experience" smooth={true} duration={500} onClick={closeMenu}>
            <p className=" border  px-5 py-2 rounded-full  font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2">
              Experience
            </p>
          </Link>
          <Link to="contact" smooth={true} duration={500} onClick={closeMenu}>
            <p className=" border  px-5 py-2 rounded-full  font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2">
              Contact
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
