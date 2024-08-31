import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import WorkCard from './WorkCard'
import { useDispatch, useSelector } from 'react-redux';
import store from '@/Redux/store';
import { fetchExperienceData } from '@/Redux/slices/experienceSlice';
import ExperenceSkeleton from '../skeleton/ExperenceSkeleton';

function WorkExp() {
    const dispatch = useDispatch()
    const { experiencesData,loading } = useSelector((store) => store.experiences)

    useEffect(() => {
        (async () => {
            await dispatch(fetchExperienceData());
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


     if(!loading){
         return <ExperenceSkeleton/>
     }
     
    return (
        <div className=' my-component p-8 md:px-32'>
            <div className='flex  items-center justify-between'>
                <div className='bg-blue-500 h-1 w-full rounded-full'></div>
                <span data-aos="zoom-in" className='md:text-4xl text-2xl font-bold text-center whitespace-nowrap mx-5'>My<span className='text-blue-500 ml-3'>Experience</span></span>
                <div className='bg-blue-500 h-1 w-full rounded-full'></div>
            </div>

            <div className=' relative md:w-[73%] m-auto md:mt-24 mt-10 w-full md:px-10 px-8'>
                <Carousel
                    opts={{
                        align: "start",
                        loop: false,
                    }}
                >
                    <CarouselContent>
                        {experiencesData && experiencesData.length > 0 ? (
                            experiencesData.map((experience, index) => (
                                <CarouselItem key={index}>
                                    <WorkCard experience={experience} index={index} />
                                </CarouselItem>
                            ))
                        ) : (
                            <div>No experiences available</div>
                        )}
                    </CarouselContent>
                    <CarouselPrevious className="bg-blue-white" />
                    <CarouselNext className="bg-blue-white" />
                </Carousel>



            </div>
        </div>
    )
}

export default WorkExp