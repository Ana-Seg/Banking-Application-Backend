import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import UserContext from '../context/UserContext';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';

const AdminRegister = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const { enqueueSnackbar } = useSnackbar();

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const changeInputHandler = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (userData.password !== userData.password2) {
            enqueueSnackbar('Passwords do not match', { variant: 'error' });
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post( `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/admin/register`, userData, {
                headers: { 'Content-Type': 'application/json' }
            });

            const { token, user } = response.data;

            setUser(user);
            localStorage.setItem('token', token);
            enqueueSnackbar('Admin registration successful', { variant: 'success' });

            setTimeout(() => {
                navigate('/adminLogin');
            }, 2000);

        } catch (error) {
            enqueueSnackbar(error.response?.data.msg || 'An error occurred', { variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='p-4 max-w-[1200px] mx-auto mt-16 bg-gray-100 rounded-lg shadow-lg'>
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
                <h2 className='text-2xl font-bold mb-4'>Admin Register</h2>
                {isLoading && <Spinner />}
                <form className='w-full max-w-md' onSubmit={submitHandler}>
                    <input
                        type="text"
                        placeholder='Username'
                        name="name"
                        value={userData.name}
                        onChange={changeInputHandler}
                        className='shadow border rounded-md w-full py-2 px-3 text-gray-700 mb-4'
                        required
                    />
                    <input
                        type="email"
                        placeholder='Email'
                        name="email"
                        value={userData.email}
                        onChange={changeInputHandler}
                        className='shadow border rounded-md w-full py-2 px-3 text-gray-700 mb-4'
                        required
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        name="password"
                        value={userData.password}
                        onChange={changeInputHandler}
                        className='shadow border rounded-md w-full py-2 px-3 text-gray-700 mb-4'
                        required
                    />
                    <input
                        type="password"
                        placeholder='Confirm password'
                        name="password2"
                        value={userData.password2}
                        onChange={changeInputHandler}
                        className='shadow border rounded-md w-full py-2 px-3 text-gray-700 mb-4'
                        required
                    />
                    <button
                        type="submit"
                        className='bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md w-full'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className='mt-4'>Current User</p>
                <Link to="/login" className='text-blue-600 hover:text-blue-800 text-xl'>Sign In</Link>
            </div>
        </div>
    );
};

export default AdminRegister;
