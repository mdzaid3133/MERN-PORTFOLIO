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
import { useSelector } from 'react-redux'

function ClientView() {
  const { currentMode } = useSelector((store) => store.mode)
  console.log('clientView', currentMode)
  return (
    <>
      <div className='relative'>
        <div className='fixed top-0 z-50 w-full'>
          <Header />
        </div>
        <section className={`py-[4rem] md:py-[5rem] w-full   ${currentMode === 'dark' ? 'bg-[#1c1b21] text-white' : 'bg-slate-200 text-gray-800'
          }`}>
          <Element
            id='home'
            name='home'
            className={`w-full pt-[3rem]`}
          >

            <Home />
          </Element>
        </section>


        <section >
          <Element id='about' name="about" className={`${currentMode === 'dark' ? 'bg-[#1c1b21] text-white' : 'bg-slate-200 text-gray-800'
            } w-full md:pt-12 pt-16`}>
            <About />
          </Element>
        </section>


        <section >
          <Element name="skills" className={`${currentMode === 'dark' ? 'bg-[#1c1b21] text-white' : 'bg-slate-200 text-gray-800'
            } w-full md:pt-12 pt-16`}>
            <Skills />
          </Element>
        </section>



        <section >
          <Element name="projects" className={`${currentMode === 'dark' ? 'bg-[#1c1b21] text-white' : 'bg-slate-200 text-gray-800'
            } w-full md:pt-12 pt-16`}>
            <Project />
          </Element>
        </section>


        <section >
          <Element name="education" className={`${currentMode === 'dark' ? 'bg-[#1c1b21] text-white' : 'bg-slate-200 text-gray-800'
            } w-full md:pt-12 pt-16`}>
            <Education />
          </Element>
        </section>


        <section >
          <Element name="experience" className={`${currentMode === 'dark' ? 'bg-[#1c1b21] text-white' : 'bg-slate-200 text-gray-800'
            } w-full md:pt-12 pt-16`}>
            <WorkExp />
          </Element>
        </section>


        <section >
          <Element name="contact" className={`${currentMode === 'dark' ? 'bg-[#1c1b21] text-white' : 'bg-slate-200 text-gray-800'
            } w-full md:pt-12 pt-16`}>
            <Contact />
          </Element>
        </section>


        <section className={`${currentMode === 'dark' ? 'bg-[#1c1b21] text-white' : 'bg-slate-200 text-gray-800'
          } w-full`}>
          <Footer />
        </section>
      </div>
    </>
  )
}

export default ClientView
