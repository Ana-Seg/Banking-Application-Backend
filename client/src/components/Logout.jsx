import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useSnackbar } from 'notistack';

const Logout = () => {
  const { user, setUser, setBalance, setTransactionLogs, setIsLoading } = useContext(UserContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        setUser(null);
        setBalance(0);
        setTransactionLogs([]);
        localStorage.removeItem('token');
        await new Promise(resolve => setTimeout(resolve, 1000));
        enqueueSnackbar('Successfully logged out!', { variant: 'success' });
        navigate('/');
      } catch (error) {
        console.error('Logout error:', error);
        enqueueSnackbar('An error occurred during logout. Please try again.', { variant: 'error' });
      }
    };

    logoutUser();
  }, [setUser, setBalance, setTransactionLogs, setIsLoading, navigate, enqueueSnackbar]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <p className="text-lg font-bold">Logging out...</p>
    </div>
  );
};

export default Logout;






