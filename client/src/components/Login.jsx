import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const { enqueueSnackbar } = useSnackbar();

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const changeInputHandler = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/login`,  loginData);
            const user = response.data.user;

            if (user) {
                const userData = {
                    email: user.email,
                    name: user.name,
                    balance: user.balance || 0,
                    transactionLogs: user.transactionLogs || [],
                    role: user.role || 'user',
                };
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                enqueueSnackbar('Login successful!', { variant: 'success' });
                if (user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/client');
                }
            } else {
                enqueueSnackbar('User data not found', { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar(error.response ? error.response.data.msg : 'An error occurred', { variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='p-4 max-w-[1200px] mx-auto mt-16 bg-gray-100 rounded-lg shadow-lg'>
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
                <h2 className='text-2xl font-bold mb-4'>Log In</h2>

                {isLoading ? (
                    <Spinner />
                ) : (
                    <form className='w-full max-w-md' onSubmit={submitHandler}>
                        <input
                            type="text"
                            placeholder='Email'
                            name="email"
                            value={loginData.email}
                            onChange={changeInputHandler}
                            className='shadow border rounded-md w-full py-2 px-3 text-gray-700 mb-4'
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            name="password"
                            value={loginData.password}
                            onChange={changeInputHandler}
                            className='shadow border rounded-md w-full py-2 px-3 text-gray-700 mb-4'
                        />

                        <button type='submit' className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md w-full">
                            Log In
                        </button>
                    </form>
                )}

                <p className='mt-4'>No account yet?</p>
                <Link to="/register" className='text-blue-600 hover:text-blue-800 text-xl'>Register</Link>
            </div>
        </div>
    );
};

export default Login;
