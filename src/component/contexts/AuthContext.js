// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

const AuthContext = createContext({});

const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => { 
    // const { REACT_APP_API_BASE_PATH_USER } = process.env

    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    // const [user, setUser] = useState(null);

    // const login = (token) => {
    //     localStorage.setItem('authToken', token)
    //     // console.log('User Data:', userData);
    //     // setUser(userData)
    //     setIsLoggedIn(true)
    // }

    // const logout = async () => {
    //     localStorage.removeItem('authToken')
    //     setIsLoggedIn(false)
    // }
    
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };



    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default useAuth;