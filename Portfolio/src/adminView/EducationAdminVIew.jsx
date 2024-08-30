import React, { useEffect, useState } from 'react'
import FormControls from './fomControls/index';
import { FaTrash } from 'react-icons/fa';
import store from '@/Redux/store';
import { addEducationData, deleteEducationData, fetchEducationtData } from '@/Redux/slices/educationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2 } from 'lucide-react';


function EducationAdminVIew() {
  const [formData, setFormData] = useState('');

  const dispatch = useDispatch();
  const { educationsData } = useSelector((store) => store.education);

  useEffect(() => {
    (async () => {
      const resutl = await dispatch(fetchEducationtData());
      setFormData(educationsData);
    })();
  }, []);

  console.log("objects loaded", educationsData)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleAdd = async () => {
    try {
      const addFormData = new FormData();
      for (const key in formData) {
        addFormData.append(key, formData[key]);
      }

      await dispatch(addEducationData(addFormData));
    } catch (error) {
      console.error('Error adding education data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteEducationData(id));
      await dispatch(fetchEducationtData());
    } catch (error) {
      console.error('Error deleting education data:', error);
    }
  };

  const controls = [

    {
      label: 'Enter duration',
      type: 'text',
      placeholder: 'Enter duration ',
      name: 'duration',

    },
    {
      label: 'Enter collage name',
      type: 'text',
      placeholder: 'Enter collage name',
      name: 'college',

    },

    {
      label: 'Enter marks ',
      type: 'text',
      placeholder: 'Enter marks',
      name: 'marks',

    },
  ]
  return (
    <div>
      <div className='p-10 '>
        <h1 className='text-2xl font-bold text-orange-600'> Education Section</h1>
        <div className="mt-10 flex flex-wrap gap-5">
          {educationsData &&
            educationsData?.map((education) => (
              <div key={education?._id} className="w-[300px] border rounded-lg overflow-hidden py-3 flex flex-col justify-between  shadow-md shadow-white">
                <h3 className='text-white  p-1'>{education?.duration}</h3>
                <h3 className='text-white  p-1'>{education?.college}</h3>
                <h3 className='text-white  p-1'>{education?.marks}
                </h3>
                <div className='flex justify-end px-3'>
                  <Trash2
                    onClick={() => handleDelete(education?._id)}
                    className='text-red-700 mt-2' />
                </div>
              </div>
            ))}
        </div>
        <div className='mt-8 border p-5 rounded-lg bg-gray-800'>
          <FormControls
            controls={controls}
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
          />
        </div>
        
        <div className='flex justify-end items-center mt-4'>
            <button type='button' className='bg-orange-400 p-3 rounded-full font-bold text-white'
              onClick={handleAdd}>Add Info</button>
          </div>
      </div>
    </div>
  )
}

export default EducationAdminVIew