import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkStatus = async () => {
            if (!token) return;

            try {
                const response = await axios.get('http://localhost:3005/status', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data.user);
            } catch (error) {
                console.error('Error fetching user status:', error);
                setUser(null);
            }
        };

        checkStatus();
    }, [token]);

    const handleSetToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const handleLogout = async () => {
        try {
            // await axios.post('http://localhost:3005/logout', {}, {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // });
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
        }
    };

    return (
        <UserContext.Provider value={{ user, token, setToken: handleSetToken, logout: handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
