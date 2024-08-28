import React, { useState } from 'react';

import { Button } from 'react-scroll';

const WorkCard = ({ experience }) => {
const [show, setShow] = useState(false)

  const handleShow = ()=>{
       setShow(!show)
  }
 
  const workArray = experience?.expworkRole?.split(',');
  console.log(experience.expjoinData
  )
  return (
<>
  <div className='relative'>
   <div className={`bg-[#1c1b21] absolute top-0 left-0 h-full rounded-lg z-50 transition-all ease-in-out duration-700 overflow-hidden ${show ? 'w-full border' : 'w-0'}`}>
    <pre className='p-2'>{experience?.expworkRole}</pre>
    <Button 
      variant="outline" className="absolute bottom-2 right-0 border border-gray-400 px-3 rounded-full mr-4 bg-inherit hover:bg-blue-500 hover:text-white transition duration-200 ease-in"
      onClick={handleShow}>Back</Button>
   </div>
    <div data-aos="flip-up"  className=" flex flex-wrap justify-center  md:justify-around gap-10 border rounded-lg text-center  px-2 py-5 ">
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
        { experience?.expJoinData + experience?.expLeaveData + experience?.expworkPlace || "Apr,2021 Jun, 2024, Bengluru,India"}
      </h3>
      <Button 
      
      variant="outline" className="border border-gray-400 px-3 rounded-full mr-4 bg-inherit hover:bg-blue-500 hover:text-white transition duration-200 ease-in"
      onClick={handleShow}>More</Button>
    </div>
   </div>
  </div>
</>
  );
};

export default WorkCard;
