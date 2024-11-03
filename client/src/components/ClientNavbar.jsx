import React, { useContext, useState } from 'react';
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

const ClientNavbar = () => {
  const { user } = useContext(UserContext);
  const [nav, setNav] = useState(false);
  const toggleNav = () => setNav(!nav);

  return (
    <nav className='bg-blue-800 opacity-95 px-4 py-3 flex justify-between items-center'>
      <div className='flex items-center text-xl'>
        <button onClick={toggleNav} className='text-white lg:hidden'>
      </button>
      </div>
      <div className='flex items-center text-xl gap-x-5 text-white'>
      <span className='text-white ml-2'>You Are Logged in as</span>
        <span className='font-semibold'>{user ? user.name : 'Guest'}</span>
        <div className='relative'>
          <button className='text-white group'>
            <FaUserCircle className='w-6 h-6 mt-1' />
            <div className='z-10 hidden absolute rounded-lg shadow-lg w-64 group-focus:block top-full right-0 bg-white text-black'>
              <ul className='py-4 text-md'>
                <li className='px-4 py-2 font-bold hover:bg-gray-200'>Contact Information</li>
                <li className='px-4 py-2 hover:bg-gray-200'>Email: {user.email}</li>
                <li className='px-4 py-2 hover:bg-gray-200'>Your Balance: ${user.balance.toFixed(2)}</li>
                <li className='px-4 py-2 hover:bg-gray-200'>Phone: (021) 345-6789</li>
              </ul>
            </div>
          </button>
        </div>
        <div className='text-white'>
          <FaBell className='w-6 h-6' />
        </div>
      </div>
    </nav>
  );
}

export default ClientNavbar;





