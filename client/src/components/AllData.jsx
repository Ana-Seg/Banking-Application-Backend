import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';
import { Navigate } from 'react-router-dom';

const AllData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  if (!user || user.role !== 'admin') {
    enqueueSnackbar('You do not have access to this area.', { variant: 'error' });
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      enqueueSnackbar('No token found. Please log in.', { variant: 'error' });
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/users`,  {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        enqueueSnackbar('Failed to fetch users.', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [enqueueSnackbar]);

  return (
    <div className="bg-blue-800 px-4 py-8 max-w-7xl mx-auto mt-20">
      <p className='text-white text-4xl mb-2'>All Data: Users List</p>

        <table className="w-full text-left mt-16">
          <thead className="uppercase bg-gray-200">
            <tr>
              <th scope="col" className="py-3 px-5">#</th>
              <th scope="col" className="py-3 px-5">Id</th>
              <th scope="col" className="py-3 px-5">Name</th>
              <th scope="col" className="py-3 px-5">Email</th>
              <th scope="col" className="py-3 px-5">Password</th>
              <th scope="col" className="py-3 px-5">Balance</th>
              <th scope="col" className="py-3 px-5">Transaction Logs</th>
            </tr>
          </thead>
          <tbody>
  {users.map((user, index) => (
    <tr key={user._id} className="bg-white hover:bg-gray-300">
      <td className="py-3 px-5">{index + 1}</td>
      <td className="py-3 px-5">{user._id}</td>
      <td className="py-3 px-5">{user.name}</td>
      <td className="py-3 px-5">{user.email}</td>
      <td className="py-3 px-5">********</td>
      <td className="py-3 px-5">{user.balance}</td>
      <td className="py-3 px-5">
        {Array.isArray(user.transactionLogs) ? user.transactionLogs.join(' ') : 'No logs'}
      </td>
    </tr>
  ))}
</tbody>

        </table>

    </div>
  );
};

export default AllData;
