// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => { 

    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
        setLoading(false)
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
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default useAuth;