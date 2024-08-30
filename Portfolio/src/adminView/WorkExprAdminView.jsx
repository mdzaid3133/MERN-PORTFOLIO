import React, { useEffect, useState } from 'react'
import FormControls from './fomControls/index';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import store from '@/Redux/store';
import { addExperenceData, deleteExperienceData, fetchExperienceData, updateExperienceData } from '@/Redux/slices/experienceSlice';

function WorkExprAdminView() {
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const dispatch = useDispatch();
  const { experiencesData } = useSelector((store) => store.experiences);

  useEffect(() => {
    (async () => {
      const result = await dispatch(fetchExperienceData());
      setFormData(experiencesData);
    })();
  }, []);

  console.log("objects loaded", experiencesData)
  console.log("formData", formData)


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
    console.log("uploading image", uploadedImage)

    if (uploadedImage) {
      setFormData((prevState) => ({
        ...prevState,
        expImage: uploadedImage,
      }));

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.onload = () => {
        setImagePreview(fileReader.result);
      };
    }
  };

  const addFormData = new FormData();
  for (const key in formData) {
    addFormData.append(key, formData[key]);
  }

  const handleAdd = async () => {
    try {
      await dispatch(addExperenceData(addFormData));
    } catch (error) {
      console.error('Error adding experience data:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await dispatch(updateExperienceData([addFormData, formData._id]));
    } catch (error) {
      console.error("Error updatin experience data : ", error);
    }
  }


  const handleEdit = async(experience)=>{
    setFormData(experience);
    setImagePreview(experience?.expImage?.secure_url);

    console.log("object created",experience);
  }

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteExperienceData(id));
      await dispatch(fetchExperienceData());
    } catch (error) {
      console.error('Error deleting experience data:', error);
    }
  };
  const controls = [

    {
      label: 'Enter position',
      type: 'text',
      placeholder: 'eg: full stack web developer ',
      name: 'expPosition',

    },
    {
      label: 'Enter joining data',
      type: 'month',
      placeholder: 'Enter starting data',
      name: 'expjoinData',

    },

    {
      label: 'Enter leaving data',
      type: 'month',
      placeholder: 'Enter leaving data',
      name: 'expleaveData',

    },
    {
      label: 'Enter place',
      type: 'text',
      placeholder: 'eg: kolkata- india',
      name: 'expworkplace',

    },
    {
      label: 'what did you do',
      type: 'textarea',
      placeholder: 'eg: design netflix payment system UI, etc,',
      name: 'expworkRole',

    },
    {
      label: 'Upload image',
      type: 'file',
      name: 'expImage',

    },
  ]
  return (
    <div>
      <div className='p-10 '>
        <h1 className='text-2xl font-bold text-orange-600'> Experience Section</h1>
        <div className="mt-10 flex flex-wrap gap-5">
          {experiencesData &&
            experiencesData?.map((experience) => (
              <div key={experience?._id} className="w-[300px] border rounded-lg overflow-hidden py-3 flex flex-col justify-between  shadow-md shadow-white">
                <h3 className='text-white  p-1'>{experience?.expPosition}</h3>
                <h3 className='text-white  p-1'>{experience?.expjoinData + ", " + experience?.expleaveData + ", " + experience?.expworkplace}</h3>
                <div className=" mt-4 border flex items-center justify-end  gap-3 p-3 font-bold text-sm">
                  <FaTrash
                    onClick={() => handleDelete(experience?._id)}
                    className='text-red-700 mt-2 cursor-pointer text-xl' />

                  <FaEdit onClick={() => handleEdit(experience)}
                    className="text-yellow-400 cursor-pointer text-xl" />
                </div>
              </div>
            ))}
        </div>
        <div className='mt-8 border p-5 rounded-lg bg-gray-800'>
          <FormControls
            controls={controls}
            formData={formData}
            setFormData={setFormData}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            handleChange={handleChange}
            getImage={getImage}
          />
        </div>

        <div className='mt-4 flex justify-end gap-4 items-center'>
        <button type='button' className='bg-orange-400 p-3 rounded-full font-bold text-white'
            onClick={handleAdd}>Add Info</button>

          <button type='button' className='bg-orange-400 p-3 rounded-full font-bold text-white'
            onClick={handleUpdate}>Update Info</button>
        </div>
      </div>
    </div>
  )
}

export default WorkExprAdminView