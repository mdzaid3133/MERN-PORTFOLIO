import React, { useEffect, useState } from 'react';
import FormControls from './fomControls/index';
import { useDispatch, useSelector } from 'react-redux';
import { addSkillData, deleteSkillData, fetchSkillData } from '@/Redux/slices/skillSlice';
import { FaTrash } from 'react-icons/fa';

function SkillAdminView() {
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const dispatch = useDispatch();
  const { skillData } = useSelector((store) => store.skill);

  useEffect(() => {
    (async () => {
      await dispatch(fetchSkillData());
      setFormData(skillData);
    })();
  }, []);



  const controls = [
    {
      label: 'Enter skill name',
      type: 'text',
      placeholder: 'Enter skills here',
      name: 'skillName',
    },
    {
      label: 'Enter skill section',
      type: 'text',
      placeholder: 'Enter skill section',
      name: 'skillSection',
    },
    {
      label: 'Upload image',
      type: 'file',
      name: 'skillImage',
    },
  ];

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
        skillImage: uploadedImage,
      }));

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.onload = () => {
        setImagePreview(fileReader.result);
      };
    }
  };

  const handleAdd = async () => {
    try {
      const addFormData = new FormData();
      for (const key in formData) {
        addFormData.append(key, formData[key]);
      }

      await dispatch(addSkillData(addFormData));
    } catch (error) {
      console.error('Error adding skill data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteSkillData(id));
      dispatch(fetchSkillData());
    } catch (error) {
      console.error('Error deleting skill data:', error);
    }
  };

  return (
    <div>
      <div className="p-10">
        <h1 className="text-2xl font-bold text-orange-600">Skill Section</h1>
        <div className="mt-10 flex flex-wrap gap-5">
          {skillData &&
            skillData?.map((skill) => (
              <div key={skill._id} className="w-[150px] border rounded-lg overflow-hidden py-3 flex flex-col justify-between  shadow-md shadow-white">
                <div className="flex justify-center items-center ">
                  <img
                    src={skill.skillImage?.secure_url || 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'}
                    alt="skill image"
                    className="w-14"
                  />
                </div>
                <h3 className="text-white text-center mt-4 border flex items-center justify-between px-3 font-bold text-xl">
                  {skill.skillName}
                  <FaTrash
                    onClick={() => handleDelete(skill._id)}
                    className="text-red-700 cursor-pointer"
                  />
                </h3>
              </div>
            ))}
        </div>
        <div className="mt-8 border p-5 rounded-lg bg-gray-900">
          <FormControls
            controls={controls}
            formData={formData}
            setFormData={setFormData}
            setImagePreview={setImagePreview}
            imagePreview={imagePreview}
            getImage={getImage}
            handleChange={handleChange}
          />
          <div className="flex justify-end items-center">
            <button
              onClick={handleAdd}
              type="button"
              className="bg-orange-400 p-3 rounded-full font-bold text-white float-right"
            >
              Add Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillAdminView;
