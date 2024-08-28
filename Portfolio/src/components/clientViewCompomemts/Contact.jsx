import React, { useEffect,useRef } from 'react'
import emailjs from '@emailjs/browser';
import AOS from 'aos'
import 'aos/dist/aos.css';
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { fetchContactData } from '@/Redux/slices/contactSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function Contact() {

    const dispatch = useDispatch()
  const { contactData } = useSelector((store) => store.contact);


  useEffect(() => {
    (async () => {
      await dispatch(fetchContactData());
    })();
  }, []);

  const form = useRef();
  
    const sendEmail = (e) => {
      e.preventDefault();
  
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


    useEffect(()=>{
        AOS.init({
          offset: 200,
          duration: 600,
          easing: 'ease-in-sine',
          delay: 100,
        });
      },[])
    return (
        <div className='my-component p-8 md:px-32'>
            <div className='flex  items-center justify-between'>
                <div className='bg-blue-500 h-1 w-full rounded-full'></div>
                <span data-aos="zoom-in" className='md:text-4xl text-2xl font-bold text-center whitespace-nowrap mx-5'>Contact <span className='text-blue-500'>Me</span></span>
                <div className='bg-blue-500 h-1 w-full rounded-full'></div>
            </div>

            <div className='md:w-[90%] m-auto md:mt-24 mt-10 w-full md:px-10 '>

                <div  className='flex flex-wrap justify-between items-center md:gap-0 gap-8'>
                    {/* my Details */}
                    <div data-aos="slide-right" className='my-component md:w-1/2 w-full'>
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
                    <div data-aos="flip-left" className='md:w-1/2 w-full'>
                        <form ref={form} onSubmit={sendEmail}>
                            <Input type="text" name="user_name"  placeholder="Full Name" className="bg-transparent text-white w-full mb-5" />
                            <Input type="email" name="user_email" placeholder="Email" className="bg-transparent text-white w-full mb-5" />
                            <Textarea  name="message" placeholder="Your Message" className="bg-transparent text-white w-full mb-5" />
                            <Button type="submit" value="Send" className="text-white bg-blue-500 hover:bg-blue-600">Send</Button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Contact