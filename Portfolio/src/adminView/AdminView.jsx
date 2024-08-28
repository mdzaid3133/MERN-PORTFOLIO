import React, { useState } from 'react'
import HomeAdminView from './HomeAdminView';
import AboutAdminView from './AboutAdminView';
import SkilAdminView from './SkilAdminView';
import EducationAdminVIew from './EducationAdminVIew';
import ProjectAdminView from './ProjectAdminView';
import ContactAdminView from './ContactAdminView';
import WorkExprAdminView from './WorkExprAdminView';
import ResumeAdminView from './ResumeAdminVIew';
import { Button } from 'react-scroll';

function AdminView() {
    const [currentSelectedTab, setCurrentSelectedTab] = useState('Home');
    const menuList = [
        {
            id:'Home',
            lable: 'Home',
            component:<HomeAdminView/>,

        },
        {
            id:'About',
            lable: 'About',
            component:<AboutAdminView/>,


        },
        {
            id:'Skils',
            lable: 'Skils',
            component:<SkilAdminView/>,


        },
        {
            id:'Education',
            lable: 'Education',
            component:<EducationAdminVIew/>,


        },
        {
            id:'Projects',
            lable: 'Projects',
            component:<ProjectAdminView/>,


        },
        {
            id:'WorkExperience',
            lable: 'Work Experience',
            component:<WorkExprAdminView/>,


        },
        {
            id:'Contact',
            lable: 'Contact',
            component:<ContactAdminView/>,


        },
        {
            id:'Resume',
            lable: 'Resume',
            component:<ResumeAdminView/>,


        },
        
    ];

    const handleLogout = async()=>{
        localStorage.removeItem('role');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('data');
        window.location.href = '/login';
    }
  return (
    <div>
        <nav className='p-5 bg-gray-800 text-white flex gap-4 justify-center'>
             {menuList
             ?.map(item => (
                 <button 
                  onClick={()=>setCurrentSelectedTab(item.id)}
                 key={item.id}>{item.lable}</button>
             ))}
             <Button className='bg-red-700 rounded-full text-white cursor-pointer px-4 py-1 hover:bg-red-500'
             onClick={handleLogout}>Logout</Button>
        </nav>

         <div>
            {
                menuList.map(item => item.id === currentSelectedTab && item.component)
                
            }
         </div>
    </div>
  )
}

export default AdminView