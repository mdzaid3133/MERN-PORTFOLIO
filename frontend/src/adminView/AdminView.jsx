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
import { FaBars, FaTimes } from 'react-icons/fa';

function AdminView() {
    const [currentSelectedTab, setCurrentSelectedTab] = useState('Home');
    const [isOpen, setIsOpen] = useState(false);
    const menuList = [
        {
            id: 'Home',
            lable: 'Home',
            component: <HomeAdminView />,

        },
        {
            id: 'About',
            lable: 'About',
            component: <AboutAdminView />,


        },
        {
            id: 'Skils',
            lable: 'Skils',
            component: <SkilAdminView />,


        },
        {
            id: 'Education',
            lable: 'Education',
            component: <EducationAdminVIew />,


        },
        {
            id: 'Projects',
            lable: 'Projects',
            component: <ProjectAdminView />,


        },
        {
            id: 'WorkExperience',
            lable: 'Work Experience',
            component: <WorkExprAdminView />,


        },
        {
            id: 'Contact',
            lable: 'Contact',
            component: <ContactAdminView />,


        },
        {
            id: 'Resume',
            lable: 'Resume',
            component: <ResumeAdminView />,


        },

    ];

    const handleLogout = async () => {
        localStorage.removeItem('role');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('data');
        window.location.href = '/login';
    }

    const toggleMenu = () => setIsOpen(!isOpen);

    const closeMenu = () => setIsOpen(false);
    return (
        <>
            <div>
                <div>
                <nav className='hidden md:flex p-5 bg-gray-800 text-white  gap-4 justify-center fixed top-0 w-full '>
                    {menuList
                        ?.map(item => (
                            <button
                                onClick={() => setCurrentSelectedTab(item.id)}
                                key={item.id}>{item.lable}</button>
                        ))}
                    <Button className='bg-red-700 rounded-full text-white cursor-pointer px-4 py-1 hover:bg-red-500'
                        onClick={handleLogout}>Logout</Button>
                </nav>

                <div className="md:hidden text-white float-end p-5">
                    <button onClick={toggleMenu}>
                        {isOpen ? <FaTimes size={20} /> : <FaBars size={30} />}
                    </button>
                </div>
                </div>

                {isOpen &&

                    <div className={` bg-gray-900 border  border-white fixed top-0 right-0 h-full w-3/4 md:hidde flex flex-col  px-4  space-y-4 py-16 text-center z-50 transition-all duration-300 ease-in`}>
                        <button
                            onClick={() => closeMenu()}
                            className="absolute top-5 right-5 text-white">
                            <FaTimes size={30} />
                        </button>
                        {
                            menuList
                                ?.map(item => (
                                    <button
                                        className='text-white border  p-2 rounded-full'
                                        onClick={() => setCurrentSelectedTab(item.id)}
                                        key={item.id}>{item.lable}</button>
                                ))}
                        <Button className='bg-red-700 rounded-full text-white cursor-pointer px-4 py-1 hover:bg-red-500'
                            onClick={handleLogout}>Logout</Button>


                    </div>}

                <div>
                </div>

                <div>
                    {
                        menuList.map(item => item.id === currentSelectedTab && item.component)

                    }
                </div>
            </div>
        </>
    )
}

export default AdminView