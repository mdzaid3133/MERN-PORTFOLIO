import React, { useEffect, useState } from 'react'
import FormControls from './fomControls/index';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/Redux/store';
import { fetchContactData, updateContactData} from '@/Redux/slices/contactSlice';


function ContactAdminView() {
  const [formData, setFormData] =  useState('');
  const dispatch = useDispatch();
  const { contactData } = useSelector((store) => store.contact);

  useEffect(() => {
    (async () => {
     const result =  await dispatch(fetchContactData());
     console.log(result)
      setFormData(result?.payload?.data[0]);
    })();
  }, []);

   console.log("objects loaded",contactData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

   

  const  handleUpdate = async()=>{
    try {
      const addFormData = new FormData();
      for (const key in formData) {
        addFormData.append(key, formData[key]);
      }

    await dispatch(updateContactData([addFormData,contactData?._id]))
    await dispatch(fetchContactData())
    } catch (error) {
      console.error('Error updating contact data:', error);
    }
  };
   
  const controls = [
   
    {
      label: 'Enter username',
      type: 'text',
      placeholder: 'Enter username ',
      name: 'username',

    },
    {
      label: 'Enter email',
      type: 'email',
      placeholder: 'Enter email',
      name: 'email',

    },
    {
      label: 'Enter address',
      type: 'text',
      placeholder: 'Enter address',
      name: 'address',

    },
    {
      label: 'Enter phone number',
      type: 'number',
      placeholder: 'Enter phone number',
      name: 'phone',

    },
    {
      label: 'Enter age',
      type: 'number',
      placeholder: 'Enter age',
      name: 'age',

    },
    {
      label: 'Enter country',
      type: 'text',
      placeholder: 'Enter country',
      name: 'country',

    },
  ]
  
  
  return(
    <div>
     <div className='p-10 '>
     <h1 className='text-2xl font-bold text-orange-600'> Contact Section</h1>
      <div className='mt-8 border p-5 rounded-lg bg-gray-800'>
      <FormControls controls={controls} formData={formData} setFormData={setFormData} handleChange={handleChange}/>
      
      </div>
      <div className='mt-4 flex justify-end gap-4 items-center'>
      <button type='button' className='bg-orange-400 p-3 rounded-full font-bold text-white'
      onClick={handleUpdate}>Update Info</button>
      </div>
    </div>
    </div>
  )

}
export default ContactAdminView