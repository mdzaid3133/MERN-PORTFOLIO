import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AOS from 'aos'
import 'aos/dist/aos.css';
import { Button } from 'react-scroll';

const WorkCard = ({ experience }) => {
  const [show, setShow] = useState(false)
  const { currentMode } = useSelector((store) => store.mode)

  const handleShow = () => {
    setShow(!show)
  }

  const workArray = experience?.expworkRole?.split(',');


  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });
  }, [])

  return (
    <>
      <div className={`relative`}>
        <div
          className={`${currentMode === 'dark' ? 'bg-[#1c1b21] text-white' : ' text-gray-800 border-gray-800 bg-slate-200'} absolute top-0 left-0 h-full rounded-lg z-50 transition-all ease-in-out duration-700 overflow-hidden ${show ? 'w-full  border' : 'w-0'}`}
        >
          <pre
            className='p-2 text-xs sm:text-sm md:text-base whitespace-pre-wrap overflow-hidden max-h-full'
          >
            {experience?.expworkRole}
          </pre>
          <button
            style={{
              background: 'linear-gradient(to right, #DA22FF 0%, #9733EE  51%, #DA22FF  100%)'
            }}
            variant="outline"
            className="absolute bottom-2 right-0 border border-gray-400 px-2 sm:px-3 rounded-full mr-2 sm:mr-4 bg-inherit hover:scale-90 hover:text-white transition duration-200 ease-in"
            onClick={handleShow}
          >
            Back
          </button>
        </div>


        <div data-aos='slide-right'>
          <div className={`z-30 flex flex-wrap justify-center  md:justify-around gap-10 border rounded-lg text-center  px-2 py-5 ${currentMode === 'dark' ? 'text-white' : ' text-gray-800 border-gray-800'}`}>
            <div className="rounded-full overflow-hidden border w-28 :h-28 ">
              <img
                src={experience?.expImage?.secure_url} // Replace this with the correct icon path
                alt="logo"
                className=" w-28 h-28"
              />
            </div>


            <div>
              <h2 className=" text-xl md:text-3xl font-bold mb-2 text-blue-500 capitalize">{experience?.expPosition || "Web Development - Intern"} </h2>
              <h3 className="md:text-xl text-sm mb-4">
                {experience?.expJoinData + experience?.expLeaveData + experience?.expworkPlace || "Apr,2021 Jun, 2024, Bengluru,India"}
              </h3>
              <button
                style={{
                  background: 'linear-gradient(to right, #DA22FF 0%, #9733EE  51%, #DA22FF  100%)'
                }}
                variant="outline" className="border border-gray-400 px-3 rounded-full mr-4 bg-inherit hover:scale-90 hover:text-white transition duration-200 ease-in"
                onClick={handleShow}>More</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkCard;
