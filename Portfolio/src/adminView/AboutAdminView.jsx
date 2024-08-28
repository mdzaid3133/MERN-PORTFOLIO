import React, { useEffect, useState } from 'react'
import FormControls from './fomControls/index';
import { useDispatch } from 'react-redux';
import { fetAboutData, updateAboutData } from '@/Redux/slices/aboutSlice';

function AboutAdminView() {
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(fetAboutData());
      setFormData(result?.payload?.data[0]);
    };

    fetchData();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const getImage = (event) => {
    event.preventDefault();
    const uploadedImage = event.target.files[0];
     
    if (uploadedImage) {
      setFormData(prevState => ({
        ...prevState,
        aboutImage: uploadedImage,
      }));

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImagePreview(this.result);
      });
    }
  };

  const handleUpdate = async () => {
    const updatedFormData = new FormData();
    for (const key in formData) {
      updatedFormData.append(key, formData[key]);
    }
    await dispatch(updateAboutData([updatedFormData, formData?._id]));
  };

  const controls = [
    {
      label: 'Enter title',
      type: 'text',
      placeholder: 'Enter title text',
      name: 'title',

    },
   
    {
      label: 'Enter summary',
      type: 'textarea',
      placeholder: 'Enter summary text',
      name: 'summary',

    },
    {
      label: 'Upload image ',
      type: 'file',
      name: 'aboutImage',

    },
  ]
  return (
    <div>
     <div className='p-10 '>
     <h1 className='text-2xl font-bold text-orange-600'> About Section</h1>
      <div className='mt-8 border p-5 rounded-lg bg-gray-900'>
      <FormControls controls={controls} formData={formData} setFormData={setFormData} setImagePreview={setImagePreview} imagePreview={imagePreview}  getImage={getImage} handleChange={handleChange} />
      <button type='button' className='bg-orange-400 p-3 rounded-full font-bold text-white'
      onClick ={handleUpdate}>Add Info</button>
      </div>
    </div>
    </div>
  )
}

export default AboutAdminView