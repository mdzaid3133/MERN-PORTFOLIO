import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../Redux/store'
import { fetAboutData } from '@/Redux/slices/aboutSlice';
import menImage from '../../assets/men.png';
import AboutSkeleton from '../skeleton/AboutSkeleton';
import mongoDBImage from '../../assets/mongoDB.png';
import expressjs from '../../assets/expressjs.png';
import reactjs from '../../assets/reactjs.png';
import nodejs from '../../assets/nodejs.png';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


function About() {

  const dispatch = useDispatch()
  const { aboutData, loading } = useSelector((store) => store.about)


  useEffect(() => {
    (async () => {
      await dispatch(fetAboutData());
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


  const iconObject = [
    {
      image: mongoDBImage,
      title: 'MongoDB'
    },
    {
      image: expressjs,
      title: 'ExpressJs'
    },
    {
      image: reactjs,
      title: 'ReactJs'
    },
    {
      image: nodejs,
      title: 'NodeJs'
    }
  ];

  console.log(iconObject)

  if (!loading) {
    return <AboutSkeleton />
  }


  return (
    <div id='about' className=' my-component p-8 md:px-32'>
      <div className='flex  items-center justify-between'>
        <div className='bg-blue-500 h-1 w-full rounded-full'></div>
        <span data-aos="zoom-in" className='md:text-4xl text-2xl font-bold text-center whitespace-nowrap mx-5'>About<span className='text-blue-500 ml-3'>Me</span></span>
        <div className='bg-blue-500 h-1 w-full rounded-full'></div>
      </div>
      <div className='flex flex-wrap-reverse items-center justify-center md:gap-0 gap-8 md:py-20 py-10 '>
        <div className='hidden md:w-1/2 w-full md:flex justify-center'>
          <div style={{ borderRadius: "51% 49% 48% 52% / 32% 29% 71% 68% " }} data-aos="zoom-in" className='w-[400px] h-[400px] bg-blue-600 overflow-hidden shadow-white shadow-md '>
            <img src={aboutData?.aboutImage?.secure_url || menImage} className='w-[100%] h-[100%]' />
          </div>
        </div>
        <div className='md:w-1/2 w-full'>
          <h2 data-aos="fade-right" className='text-2xl text-center mb-6 text-blue-500 font-bold capitalize'>{aboutData?.title || 'Web Developer'}</h2>
          <p data-aos="fade-right" className='text-center'>{aboutData?.summary || 'I am a passionate and dedicated web developer who has recently graduated from a Utranchal university. I have a strong foundation in HTML, CSS, and JavaScript,I am also deeply passionate about Competitive Programming, which I find fascinating! 😍 Additionally, I have a keen interest in MERN Stack Development, which brings me great joy! 😁 I warmly welcome anyone interested to connect with me. 😊 and I am always eager to learn and improve my skills. My goal is to create high-quality and user-friendly websites that meet the needs of my clients.'}</p>

          <div  className='mt-20 flex gap-6 justify-center items-center'>

             {
              iconObject.map((icon,index)=>{
                return(
                  <div className='w-[60px] shadow-sm rounded-full'>
                  <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>
                  <img src={icon.image} />
                  </TooltipTrigger>
                  <TooltipContent>
                  <span>{icon.title}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              </div>
                )
              })
             } 
          
          
          </div>
        </div>
      </div>

    </div>
  )
}

export default About