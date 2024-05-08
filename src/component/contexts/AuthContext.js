// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
// import axios from 'axios';

const AuthContext = createContext({});

const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => { 
    // const { REACT_APP_API_BASE_PATH_USER } = process.env

    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [user, setUser] = useState(null);
    // const [token, setToken] = useState(localStorage.getItem('token') || '');

    // const login = () => {
    //     localStorage.setItem('userId', 'user_id_value_here')
    //     setIsLoggedIn(true)
    // }

    // const login = async () => {
    //     try {
    //         // Make API call to fetch user data from backend
    //         const response = await axios.get(`${REACT_APP_API_BASE_PATH_USER}/current-user`); // Example endpoint '/api/user' to fetch user data
    //         const userData = response.data; // Assuming response contains user data

    //         if (!userData.id) {
    //             setError('User ID not found in the response.');
    //             return;
    //         }

    //         setUser(userData);
    //         localStorage.setItem('userId', userData.id);
    //         setIsLoggedIn(true);
    //     } catch (error) {
    //         console.error('Error fetching user data:', error);
    //         setError('Failed to fetch user data. Please try again.');
    //     }
    // }

    const login = (token, userData) => {
        localStorage.setItem('authToken', token)
        setUser(userData)
        setIsLoggedIn(true)
    }

    const logout = async () => {
        localStorage.removeItem('authToken')
        setIsLoggedIn(false)
    }
    
    // useEffect(() => {
    //     const token = localStorage.getItem('authToken');
    //     if (token) {
    //         setIsAuthenticated(true)
    //     }
    // }, []);

    // const login = (token) => {
    //     localStorage.setItem('authToken', token);
    //     setIsAuthenticated(true);
    // };

    // const logout = () => {
    //     localStorage.removeItem('authToken');
    //     setIsAuthenticated(false);
    // };


    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default useAuth;