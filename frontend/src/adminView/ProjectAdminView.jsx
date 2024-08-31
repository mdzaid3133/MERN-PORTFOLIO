import React, { useEffect, useState } from 'react'
import FormControls from './fomControls/index';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from "react-icons/fa";
import store from '@/Redux/store';
import { toast } from 'sonner';
import { deleteProjectData, fetchProjectData, addProjectData, updateProjectData } from '@/Redux/slices/projectSlice';

function ProjectAdminView() {
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState();
  const dispatch = useDispatch();
  const { projectsData } = useSelector((store) => store.project);


  useEffect(() => {
    (async () => {
      const result = await dispatch(fetchProjectData());
      if(result?.payload?.status=== true){
        toast.success('Data fetched successfully');
      }else{
        toast.error('Failed to fetch data');
      }
    })();
  }, []);



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
        projectImage: uploadedImage,
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
     const result = await dispatch(addProjectData(addFormData));
     if(result?.payload?.status=== true){
      toast.success('Data added successfully');
    }else{
      toast.error('Failed to add data');
    }
    } catch (error) {
      console.error('Error adding skill data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await dispatch(deleteProjectData(id));
      if(result?.payload?.status=== true){
        toast.success('Data deleted successfully');
      }else{
        toast.error('Failed to delete data');
      }
      dispatch(fetchProjectData());
    } catch (error) {
      console.error('Error deleting project data:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const result = await dispatch(updateProjectData([addFormData, formData._id]));
      if(result?.payload?.status=== true){
        toast.success('Data updated successfully');
      }else{
        toast.error('Failed to update data');
      }
    } catch (error) {
      console.error("Error updatin project data : ", error);
    }
  }

  const handleEdit = async (project) => {
    setFormData(project);
    setImagePreview(project?.projectImage?.secure_url)
    const dateStr = project?.createDate;
    const date = new Date(dateStr);
    // Format as YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];

  }

  const controls = [

    {
      label: 'Enter project name',
      type: 'text',
      placeholder: 'Enter project name ',
      name: 'projectName',

    },
    {
      label: 'Enter description',
      type: 'textarea',
      placeholder: 'Enter description ',
      name: 'projectDescription',

    },
    {
      label: 'Enter create date ',
      type: 'date',
      placeholder: 'Enter  create date ',
      name: 'createDate',

    },
    {
      label: 'Enter teck stack ',
      type: 'textarea',
      placeholder: 'Enter teck stack ',
      name: 'teckStack',

    },

    {
      label: 'Enter project live URL ',
      type: 'text',
      placeholder: 'Enter project live URL',
      name: 'projectLiveURL',

    },
    {
      label: 'Enter project link ',
      type: 'text',
      placeholder: 'Enter project link',
      name: 'projectLink',

    },
    {
      label: 'Upload your imaeg ',
      type: 'file',
      name: 'projectImage',

    },
  ]
  return (
    <div>
      <div className='p-10 '>
        <h1 className='text-2xl font-bold text-orange-600'> Project Section</h1>
        <div className="mt-10 flex flex-wrap gap-5">
          {projectsData &&
            projectsData?.map((project) => (
              <div key={project?._id} className="w-[300px] border rounded-lg overflow-hidden py-3 flex flex-col justify-between  shadow-md shadow-white">
                <div className="flex justify-center items-center ">
                  <img
                    src={project.projectImage?.secure_url || 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'}
                    alt="project image"
                    className="w-52 round"
                  />
                </div>
                <h3 className="text-white text-center mt-4 border flex items-center justify-between gap-3 p-3 font-bold text-sm">
                  {project?.
                    projectName}
                  <FaTrash
                    onClick={() => handleDelete(project._id)}
                    className="text-red-700 cursor-pointer text-xl"
                  />

                  <FaEdit onClick={() => handleEdit(project)}
                    className="text-yellow-400 cursor-pointer text-xl" />
                </h3>
              </div>
            ))}
        </div>
        <div className='mt-8 border p-5 rounded-lg bg-gray-800'>
          <FormControls
            controls={controls}
            formData={formData}
            setFormData={setFormData}
            setImagePreview={setImagePreview}
            imagePreview={imagePreview}
            getImage={getImage}
            handleChange={handleChange}
          />

        </div>

        <div className='mt-4 flex justify-end gap-4'>
          <button type='button' className='bg-orange-400 p-3 rounded-full font-bold text-white'
            onClick={handleAdd}>Add Info</button>

          <button type='button' className='bg-orange-400 p-3 rounded-full font-bold text-white'
            onClick={handleUpdate}>Update Info</button>
        </div>
      </div>
    </div>
  )
}

export default ProjectAdminView