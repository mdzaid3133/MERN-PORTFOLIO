import React from 'react'
import { Element } from 'react-scroll'

import About from '@/components/clientViewCompomemts/About'
import Contact from '@/components/clientViewCompomemts/Contact'
import Education from '@/components/clientViewCompomemts/Education'
import Footer from '@/components/clientViewCompomemts/Footer'
import Header from '@/components/clientViewCompomemts/Header'
import Home from '@/components/clientViewCompomemts/Home'
import Project from '@/components/clientViewCompomemts/Project'
import Skills from '@/components/clientViewCompomemts/Skills'
import WorkExp from '@/components/clientViewCompomemts/WorkExp'

function ClientView() {
  return (
    <>
      <div className='relative'>
        <div className='fixed top-0 z-50 w-full'>
          <Header />
        </div>
        <div >
          <Element name="home" className='bg-[#1c1b21] text-white w-full md:pt-12 pt-16'>
            <Home />
          </Element>
        </div>

        <div >
          <Element name="about" className='bg-[#1c1b21] text-white w-full md:pt-12 pt-16'>
            <About />
          </Element>
        </div>


        <div >
          <Element name="skills" className='bg-[#1c1b21] text-white w-full md:pt-12 pt-16'>
            <Skills />
          </Element>
        </div>



        <div >
          <Element name="projects" className='bg-[#1c1b21] text-white w-full md:pt-12 pt-16'>
            <Project />
          </Element>
        </div>


        <div >
          <Element name="education" className='bg-[#1c1b21] text-white w-full md:pt-12 pt-16'>
            <Education />
          </Element>
        </div>


        <div >
          <Element name="experience" className='bg-[#1c1b21] text-white w-full md:pt-12 pt-16'>
            <WorkExp />
          </Element>
        </div>


        <div >
          <Element name="contact" className='bg-[#1c1b21] text-white w-full md:pt-12 pt-16'>
            <Contact />
          </Element>
        </div>


        <div className='bg-[#1c1b21] text-white'>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default ClientView
