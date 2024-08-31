import { Input } from '@/components/ui/input';
import { login } from '@/Redux/slices/authSlice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

function SignIn() {
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

 const handleChange = (e)=>{
  const {name, value} = e.target;
  setFormData((prevState)=>({
    ...prevState,
    [name]: value,
  }));
}


   const handlerSubmit = async(e)=>{
   e.preventDefault();
 // Send the form data to the server for authentication.
    await dispatch(login(formData))
    navigate('/admin')
  
 }

  return (
    <div className='flex items-center justify-center h-screen w-screen'>
       <div className='border rounded-md p-5'>
       <h1 className='text-center text-2xl text-red-700 font-bold mb-5'>Sign In</h1>
      <form onSubmit={handlerSubmit} className='space-y-6'>
        <Input  className='bg-transparent text-white' onChange={ handleChange}  type="text" name='email' placeholder="Username" />
        <Input  className='bg-transparent text-white'onChange={handleChange}  type="password" name='password' placeholder="Password" />
        <Input  className='bg-transparent text-white hover:bg-green-700 hover:text-white'type="submit" value="Login" />
      </form>
       </div>
    </div>
  )
}

export default SignIn