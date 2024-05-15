// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
// import axios from 'axios';

const AuthContext = createContext({});

const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => { 
    // const { REACT_APP_API_BASE_PATH_USER } = process.env

    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    // const [user, setUser] = useState(null);

    const login = (token) => {
        localStorage.setItem('authToken', token)
        // console.log('User Data:', userData);
        // setUser(userData)
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
        <AuthContext.Provider value={{isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default useAuth;