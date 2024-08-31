import React, { useEffect, useState } from 'react';
import FormControls from './fomControls/index';
import { useDispatch } from 'react-redux';
import { fetchHomeData, updateHomeData } from '@/Redux/slices/homeSlice';
import { toast } from 'sonner';


function HomeAdminView() {
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(fetchHomeData());
      if(result?.payload?.status === true){
        toast.success('Data fetched successfully');
      }else{
        toast.error('Failed to fetch data');
      }
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
        homeImage: uploadedImage,
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

    const result = await dispatch(updateHomeData([updatedFormData, formData?._id]));
    if(result?.payload?.statue === true){
      toast.success('Data updated successfully');
    }else{
      toast.error('Failed to update data');
    }
  };

  const controls = [
    { label: 'Enter heading', type: 'text', placeholder: 'Enter heading text', name: 'heading' },
    { label: 'Enter position', type: 'text', placeholder: 'Enter position text', name: 'position' },
    { label: 'Enter github Link', type: 'text', placeholder: 'Enter github Link', name: 'gitHubLink' },
    { label: 'Enter linkdin link', type: 'text', placeholder: 'Enter linkdin link', name: 'linkdinLink' },
    { label: 'Enter LetCode Link', type: 'text', placeholder: 'Enter LetCode Link', name: 'letCodeLink' },
    { label: 'Enter instagram Link', type: 'text', placeholder: 'Enter instagram Link', name: 'instagramLink' },
    { label: 'Enter summary', type: 'textarea', placeholder: 'Enter summary text', name: 'summary' },
    { label: 'Upload image', type: 'file', name: 'homeImage' },
  ];

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-orange-600">Hero Section</h1>
      <div className="mt-8 border p-5 rounded-lg bg-gray-900">
        <FormControls controls={controls} formData={formData} setFormData={setFormData} setImagePreview={setImagePreview} imagePreview={imagePreview}  getImage={getImage} handleChange={handleChange} />
        <div className='flex justify-end items-center'>
          <button 
            onClick={handleUpdate}
            type="button" 
            className="bg-orange-400 p-3 rounded-full font-bold text-white float-right">
            Update Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeAdminView;
