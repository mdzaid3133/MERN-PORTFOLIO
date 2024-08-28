import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import DigitalClock from './DigitalClock';
import { Link } from 'react-scroll';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="my-component bg-[#1c1b21] text-white shadow-sm shadow-white">
      <div className="flex justify-between items-center p-5 md:px-32">
        <div className="text-2xl font-bold">
          <a href="/">
           <div className='border p-1 space-x-3 rounded-md'>
             <span>MD</span>
             <span className='bg-white text-[#1c1b21] rounded-md  px-1'>ZAID</span>
           </div>
          </a>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </button>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="home" smooth={true} duration={500}>
            <span className="font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2 cursor-pointer">
              Home
            </span>
          </Link>

          <Link to="about" smooth={true} duration={500}>
            <span className="font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2 cursor-pointer">
              About
            </span>
          </Link>

          <Link to="skills" smooth={true} duration={500}>
            <span className="font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2 cursor-pointer">
              Skills
            </span>
          </Link>

          <Link to="projects" smooth={true} duration={500}>
            <span className="font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2 cursor-pointer">
              Projects
            </span>
          </Link>

          <Link to="education" smooth={true} duration={500}>
            <span className="font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2 cursor-pointer">
              Education
            </span>
          </Link>

          <Link to="experience" smooth={true} duration={500}>
            <span className="font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2 cursor-pointer">
              Experience
            </span>
          </Link>

          <Link to="contact" smooth={true} duration={500}>
            <span className="font-semibold hover:text-blue-500 transition duration-200 hover:border-b-2 cursor-pointer">
              Contact
            </span>
          </Link>
        </nav>
        <div className="hidden md:flex">
          <DigitalClock />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className=" border  border-gray-600 fixed top-0 right-0 h-full w-3/4 md:hidden bg-[#28262f] text-white flex flex-col  px-4  space-y-4 py-16 text-center z-50 transition-all duration-300 ease-in">
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
