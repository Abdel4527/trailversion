import React from 'react';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';
import ChatWidget from '../Common/ChatWidget';

const AdminLayout = () => {

    const [isSidebarOpen, setIsSidebarOpen] =useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <div className='min-h-screen flex flex-col md:flex-row relative'>
            {/* mobile Sidebar */}
            <div className='flex md:hidden p-4 bg-gray-900 text-white z-20'>
                <button onClick={toggleSidebar}>
                    <FaBars size={24}/>

                </button>
                <h1 className='ml-4 text-xl font-medium'>Admin Panel</h1>

            </div>
            {/* overlay for mobile Sidebar */}

            {isSidebarOpen && <div className='fixed inset-0 bg-black opacity-50 z-10 md:hidden' onClick={toggleSidebar}></div>}
            
            {/* Sidebar */}
            <div 
                className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-20 md:translate-x-0 md:static md:block`}
            >

                {/* Sidebar content goes here */}
                <AdminSidebar/>
            </div>
            {/* Main content */}
            <div className="flex-grow p-6 overflow-auto">
                <Outlet/>
                {<ChatWidget />}

            </div>
        </div>
    );
};

export default AdminLayout;