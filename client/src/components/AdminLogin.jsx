import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/UserContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const changeInputHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/login`, loginData);
      localStorage.setItem('token', response.data.token);
      if (response.data.user.role === 'admin') {
        setUser(response.data.user);
        navigate('/admin');
      } else {
        setErrorMessage('You do not have access to the admin area.');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.msg);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
  };

  return (
    <div className='p-4 max-w-[1200px] mx-auto mt-16 bg-gray-100 rounded-lg shadow-lg'>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
        <h2 className='text-2xl font-bold mb-4'>Admin Log In</h2>
        {errorMessage && <p className='text-red-500 text-xs italic mb-2'>{errorMessage}</p>}

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

        <p className='mt-4'>No account yet?</p>
        <Link to="/Register" className='text-blue-600 hover:text-blue-800 text-xl'>Register</Link>
      </div>
    </div>
  );
};

export default AdminLogin;


