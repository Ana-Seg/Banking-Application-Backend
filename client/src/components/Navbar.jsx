import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import logoNav from "../assets/bank.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const toggleNav = () => setNav(!nav);

    return (
        <div className='bg-blue-800 shadow-lg fixed top-0 z-50 opacity-95 w-full'>
            <div className='flex justify-between items-center  p-4 max-w-[1400px] mx-auto'>
            <a href="/" className='flex items-center'>
                <img src={logoNav} alt="logo" className='max-w-[50px]'/>
                <div className='text-black font-bold text-4xl'>BadBank</div>
            </a>
                <button onClick={toggleNav} className='text-white lg:hidden'>
                    {nav ? <AiOutlineClose /> : <AiOutlineMenu />}
                </button>

                <nav className={`absolute lg:static w-full lg:w-auto ${nav ? "flex" : "hidden"} lg:flex flex-col lg:flex-row items-center top-14 left-0 right-0 py-5 lg:py-0 z-20 bg-blue-800 lg:bg-transparent`}>
                    <div className="flex flex-col lg:flex-row lg:space-x-6 lg:items-center flex-grow">
                        <Link to="/register" className='text-white text-2xl'>Register</Link>
                        <Link to="/login" className='text-white text-2xl'>Login</Link>
                        <Link to="/adminLogin" className='text-black  text-sm'>@</Link>

                    </div>



                </nav>
            </div>
        </div>
    );
}

export default Navbar;




