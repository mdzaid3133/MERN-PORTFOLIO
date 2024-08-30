import React, { useEffect, useState } from 'react'
import FormControls from './fomControls/index';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResumeData, updateResumeData } from '@/Redux/slices/resumeSlice';

function ResumeAdminView() {
  const [formData, setFormData] =  useState('');
  const [imagePreview, setImagePreview] = useState('');

  const dispatch = useDispatch();
  const { resumeData } = useSelector((store) => store.resume);

  useEffect(() => {
    (async () => {
      const result=  await dispatch(fetchResumeData());
      console.log('result', result);
      setFormData(result.payload.data[0]);
      setImagePreview(result.payload.data[0].resumeImage.secure_url);
    })();
  }, []);

  console.log("objects loaded",resumeData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getImage = (event) => {
    event.preventDefault();
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setFormData((prevState) => ({
        ...prevState,
        resumeImage: uploadedImage,
      }));

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.onload = () => {
        setImagePreview(fileReader.result);
      };
    }
  };

  
   

  const controls = [
    {
      label: 'Resume title',
      type: 'text',
      name: 'resumeTitle',

    },
   
    {
      label: 'Upload your resume',
      type: 'file',
      name: 'resumeImage',

    },

   
   
  ]

  const handelUpload = async () => {
   
    try {
      const  updateFormData  = new FormData()
      for (const key in formData) {
        updateFormData.append(key, formData[key])

        await dispatch(updateResumeData([updateFormData, formData._id]));
      }
    } catch (error) {
        console.error('Error updating resume data:', error);
    }
  };


  return (
    <div>
     <div className='p-10 '>
     <h1 className='text-2xl font-bold text-orange-600'> Upload Resume</h1>
      <div className='mt-8 border p-5 rounded-lg bg-gray-900'>
      <FormControls controls={controls} formData={formData} setFormData={setFormData} handleChange={handleChange} imagePreview={imagePreview} setImagePreview={setImagePreview} getImage={getImage}/>
      
      </div>

      <div  className='mt-4 flex justify-end gap-4 items-center'>
      <button type='button' className='bg-orange-400 p-3 rounded-full font-bold text-white'
       onClick={handelUpload}>Upload</button>
      </div>
    </div>
    </div>
  )
}

export default ResumeAdminView