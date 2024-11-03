import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';

const Client = () => {
  const navigate = useNavigate();
  const { user, balance, transactionLogs, isLoading, updateBalance, addTransactionLog, logout } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isLoadingState, setIsLoadingState] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Spinner />
      </div>
    );
  }

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount.trim());
    if (!depositAmount || isNaN(amount) || amount <= 0) {
        enqueueSnackbar('Invalid deposit amount', { variant: 'error' });
        return;
    }

    setIsLoadingState(true);

    try {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        };
          const response = await axios.post(
           `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/transactions/deposit`,
            { amount },
            config
        );
        updateBalance(response.data.newBalance);
        addTransactionLog(`Deposited $${amount}`);
        setDepositAmount('');
        enqueueSnackbar(`Successfully deposited $${amount}`, { variant: 'success' });
    } catch (error) {
        console.error('Error making deposit:', error);
        enqueueSnackbar(error.response?.data?.msg || 'An unexpected error occurred. Please try again.', { variant: 'error' });
    } finally {
        setIsLoadingState(false);
    }
};
  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount.trim());
    if (!withdrawAmount || isNaN(amount) || amount <= 0) {
      enqueueSnackbar('Invalid withdraw amount', { variant: 'error' });
      return;
    }

    setIsLoadingState(true);

    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };

      const response = await axios.post(
       `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/transactions/withdraw`,
        { amount },
        config
      );

      updateBalance(response.data.newBalance);
      addTransactionLog(`Withdrew $${amount}`);
      setWithdrawAmount('');
      enqueueSnackbar(`Successfully withdrew $${amount}`, { variant: 'success' });
    } catch (error) {
      console.error('Error making withdrawal:', error);
      enqueueSnackbar(error.response?.data?.msg || 'An unexpected error occurred. Please try again.', { variant: 'error' });
    } finally {
      setIsLoadingState(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {user && (
        <>
           <h1 className="font-bold text-xl mt-4"> Hi, {user.name}, Your Current balance is: ${user.balance.toFixed(2)}</h1>
        </>
      )}

      <div className="w-full max-w-md">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mt-6">Deposit</h3>
          <input
            type="number"
            className="shadow border rounded-md w-full py-2 px-3 text-gray-700"
            placeholder="Amount to deposit"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value.trim())}
          />
          <button
            className={`bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md w-full mt-2 ${isLoadingState ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleDeposit}
            disabled={isLoadingState}
          >
            {isLoadingState ? 'Depositing...' : 'Deposit'}
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Withdraw</h3>
          <input
            type="number"
            className="shadow border rounded-md w-full py-2 px-3 text-gray-700"
            placeholder="Amount to withdraw"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value.trim())}
          />
          <button
            className={`bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md w-full mt-2 ${isLoadingState ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleWithdraw}
            disabled={isLoadingState}
          >
            {isLoadingState ? 'Withdrawing...' : 'Withdraw'}
          </button>
        </div>
      </div>
      <div className="w-full max-w-md mt-6">
        <h3 className="text-lg font-semibold mb-2">Pending Transactions</h3>
        <ul className="space-y-2">
          {transactionLogs.length > 0 ? (
            transactionLogs.map((log, index) => (
              <li key={index} className="text-gray-700">{log}</li>
            ))
          ) : (
            <li className="text-gray-500">No transaction logs found.</li>
          )}
        </ul>
        <p className="text-xl font-bold">Updated balance is: ${balance.toFixed(2)}</p>
      </div>

      <div className="w-full max-w-md mt-6">
        <button
          className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md w-full"
          onClick={() => {
            logout();
            navigate('/');
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Client;

