import React, { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import AOS from 'aos'
import 'aos/dist/aos.css';
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { fetchContactData } from '@/Redux/slices/contactSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "sonner"
import ContactSkeleton from '../skeleton/ContactSkeleton';



function Contact() {

  const dispatch = useDispatch()
  const { contactData,loading } = useSelector((store) => store.contact);
  const { currentMode } = useSelector((store) => store.mode)
  const [formData, setFormData] = useState({
       user_name : null,
       user_email : null,
       message :null,
  })


  useEffect(() => {
    (async () => {
      await dispatch(fetchContactData());
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const form = useRef();


  const sendEmail = (e) => {
    e.preventDefault();
    if(formData.user_name === null || formData.user_email === null || formData.message === null){
      toast('All field are required!!!')
      return;
    }
    emailjs
      .sendForm('service_jey85xv', 'template_cikjrfn', form.current, {
        publicKey: 'kashfYlPRWRzbrpXM',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          toast.success('Sent email successfully');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };


  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });
  }, [])

  if(!loading){
    return <ContactSkeleton/>
  }
  return (
    <div className='my-component p-8 md:px-32'>
      <div className='flex  items-center justify-between'>
        <div className='bg-blue-500 h-1 w-full rounded-full'></div>
        <span data-aos="zoom-in" className='md:text-4xl text-2xl font-bold text-center whitespace-nowrap mx-5'>Contact <span className='text-blue-500'>Me</span></span>
        <div className='bg-blue-500 h-1 w-full rounded-full'></div>
      </div>

      <div className='md:w-[90%] m-auto md:mt-24 mt-10 w-full md:px-10 '>

        <div className='flex  flex-wrap md:justify-between justify-center items-center md:gap-0 gap-8'>
          {/* my Details */}
          <div data-aos="slide-right" className='my-component md:w-1/2 w-full flex justify-center md:justify-start '>
            <pre className='my-component text-sm md:text-base'>
              {`const myDetais = {
  name: "${contactData?.username}",
  email: "${contactData?.email}",
  mobile: "${contactData?.phone}",
  address: "${contactData?.address}",
  age: "${contactData?.age}",
  country: "${contactData?.country}"
}`}
            </pre>
          </div>

          {/* contact form */}
          <div data-aos="flip-left" className='flex md:justify-end justify-center'>
            <div className={`md:w-[400px] w-full rounded-lg border p-4 ${currentMode === 'dark' ? 'border-slate-200' : 'border-gray-800'}`}>
              <form ref={form} onSubmit={sendEmail} className={`${currentMode === 'dark' ? 'placeholder:text-white ' : 'placeholder:text-gray-800 '}`}>
                <Input onChange={handleChange} type="text" name="user_name" placeholder="Full Name" className="  bg-transparent  w-full mb-5 border border-gray-800" />
                <Input onChange={handleChange} type="email" name="user_email" placeholder="Email" className="  bg-transparent  w-full mb-5 border border-gray-800" />
                <Textarea onChange={handleChange} name="message" placeholder="Your Message" className="  bg-transparent  w-full mb-5 border border-gray-800" />
                <button
                  type="submit" value="Send"
                  style={{
                    background: 'linear-gradient(to right, #DA22FF 0%, #9733EE  51%, #DA22FF  100%)'
                  }}
                  className={`${currentMode === 'dark' ? 'border-slate-200' : 'border-gray-800 text-white'
                    } border rounded-full mr-4  transition-all duration-200 ease-in px-4 py-1 hover:scale-90`}
                >
                  Send
                </button>

              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact