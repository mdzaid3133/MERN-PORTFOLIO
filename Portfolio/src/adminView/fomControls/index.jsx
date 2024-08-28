import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import store from '@/Redux/store';
import { useSelector } from 'react-redux';

const FormControls = ({ controls, formData, setFormData,handleChange,getImage,setImagePreview,imagePreview }) => {
    // console.log('homeImage', homeImage)
    // console.log("formData******", formData._id
    // );

  return (
    <form>
      {controls.map((control, index) => (
        <div key={index} className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor={control.name}>
            {control.label}
          </label>
          {control.type === 'textarea' ? (
            <textarea
              id={control.name}
              name={control.name}
              placeholder={control.placeholder}
              value={formData[control.name] || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-transparent leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : (
            <input
              id={control.name}
              name={control.name}
              type={control.type}
              placeholder={control.placeholder}
              value={control.type !== 'file' ? formData[control.name] || '' : undefined}
              onChange={control.type === "file"? getImage : handleChange}
              className=" bg-transparent text-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          )}
          {
            control.type === "file" && (
                <div className='w-[100px] h-[100px] rounded-full overflow-hidden mt-10 border border-black p-1 flex items-center justify-center bg-gray-800'>
                    <img src={imagePreview ? imagePreview : formData?.aboutImage?.secure_url} className='h-[10]'/>
                </div>
            )
          }

         
        </div>

      ))}
    </form>
  );
};

export default FormControls;

