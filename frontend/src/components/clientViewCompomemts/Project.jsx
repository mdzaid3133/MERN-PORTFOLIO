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
import ProjectCard from './ProjectCard'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectData } from '@/Redux/slices/projectSlice';
import store from '@/Redux/store';
import ProjectSkeleton from '../skeleton/ProjectSkeleton';


function Project() {

    const dispatch = useDispatch()

    const { projectsData,loading } = useSelector((store) => store.project)
    const {currentMode} = useSelector((store)=> store.mode)



    useEffect(() => {
        dispatch(fetchProjectData())

        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 100,
        });
    }, [])

     if(!loading){
        return <ProjectSkeleton/>
     }
    return (
        <div className='my-component p-8 md:px-32'>
            <div className='flex  items-center justify-between'>
                <div className='bg-blue-500 h-1 w-full rounded-full'></div>
                <span data-aos="zoom-in" className='md:text-4xl text-2xl font-bold text-center whitespace-nowrap mx-5'>My <span className='text-blue-500 ml-3'>Projects</span></span>
                <div className='bg-blue-500 h-1 w-full rounded-full'></div>
            </div>
            <div data-aos="zoom-in" className="md:w-[70%] m-auto md:mt-24 mt-10 w-full md:px-10 px-5">
                <Carousel>
                    <CarouselContent>
                        {projectsData && projectsData.map((project, index) => (
                            <CarouselItem key={index}>
                                <ProjectCard project={project} index={index} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="bg-blue-white" />
                    <CarouselNext className="bg-blue-white" />
                </Carousel>
            </div>

        </div>
    )
}

export default Project