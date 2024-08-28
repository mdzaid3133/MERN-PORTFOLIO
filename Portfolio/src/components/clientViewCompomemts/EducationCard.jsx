import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css';

function EducationCard({ education }) {
    useEffect(()=>{
        AOS.init({
          offset: 200,
          duration: 600,
          easing: 'ease-in-sine',
          delay: 100,
        });
      },[])
        return (
            <div data-aos="fade-up" className="relative p-6  border  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className=" rounded-full absolute md:left-[-4%] left-[-5%] top-1/2 transform -translate-y-1/2 h-full border-l-4 border-blue-600"></div>
                <div className="absolute md:left-[-5%] ml-[2px] 
                 left-[-7%]
                top-0 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
                <div className="md:pl-8 ">
                    <p className=" pb-3 text-sm text-white font-bold ">{education?.duration}</p>
                    <h3 className=" pb-3 md:text-2xl text-xl font-bold text-blue-500 capitalize">{education?.college}</h3>
                    <p className=" pb-3 text-sm text-white font-bold">{education?.marks}</p>
                </div>
            </div>
        );
}

export default EducationCard