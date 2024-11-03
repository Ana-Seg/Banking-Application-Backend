import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoNav from "../assets/bank.png";
import { FaHome } from 'react-icons/fa';

import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button onClick={toggleSidebar} className="lg:hidden text-white">
                {isOpen ? <AiOutlineClose  /> : <AiOutlineMenu />}
            </button>
            <div className={`${isOpen ? "block" : "hidden"} lg:block w-64 bg-blue-800 opacity-95 absolute  left-0 h-full px-4 py-2 transition-transform duration-300`}>


                <ul className="mt-3 text-white font-bold">
                    <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
                    <a href="/" className='flex items-center'>
                <img src={logoNav} alt="logo" className='max-w-[50px]'/>
                <div className='text-black font-bold text-4xl'>BadBank</div>
                  </a>
                    </li>
                    <hr />
                    <div className="my-4 mb-4">
                    <h1 className="text-xl text-white font-bold ml-8">Dashboard</h1>
                </div>
                </ul>
            </div>
            {isOpen && (
                <div className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden" onClick={toggleSidebar}></div>
            )}
        </div>
    );
};

export default Sidebar;

