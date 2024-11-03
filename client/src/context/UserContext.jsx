import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0);
    const [transactionLogs, setTransactionLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const localData = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (localData) {
            try {
                const parsedUser = JSON.parse(localData);
                if (parsedUser) {
                    setUser(parsedUser);
                    setTransactionLogs([]);
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('user');
            }
        }

        if (token) {
            const fetchUserData = async () => {
                try {
                    const config = { headers: { Authorization: `Bearer ${token}` } };
                    const response = await axios.get( `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user`, config);
                    const fetchedUser = {
                        email: response.data.email,
                        name: response.data.name || '',
                        balance: response.data.balance || 0,
                        role: response.data.role || 'user',
                    };

                    setUser(fetchedUser);
                    setBalance(fetchedUser.balance);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    logout();
                } finally {
                    setIsLoading(false);
                }
            };
            fetchUserData();
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify({
                email: user.email,
                name: user.name,
                role: user.role,
            }));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const logout = () => {
        setUser(null);
        setBalance(0);
        setTransactionLogs([]);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const updateBalance = (newBalance) => {
        setBalance(newBalance);
    };

    const addTransactionLog = (log) => {
        setTransactionLogs((prevLogs) => [...prevLogs, log]);
    };

    const isAdmin = () => user?.role === 'admin';

    return (
        <UserContext.Provider value={{
            user,
            balance,
            transactionLogs,
            isLoading,
            logout,
            updateBalance,
            addTransactionLog,
            setUser,
            setBalance,
            setTransactionLogs,
            isAdmin,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;


