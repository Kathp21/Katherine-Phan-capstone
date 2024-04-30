// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => { 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true)
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    // useEffect(() => {
    //     const verifyToken = async () => {
    //         const token = localStorage.getItem('authToken');
    //         if (token) {
    //             // Example API call to validate token
    //             try {
    //                 await axios.get(`${REACT_APP_API_BASE_PATH_USER}/verify-token`, { headers: { Authorization: `Bearer ${token}` } });
    //                 setIsAuthenticated(true);
    //             } catch (error) {
    //                 console.error('Token validation failed', error);
    //                 setIsAuthenticated(false);
    //             }
    //         }
    //         setIsLoading(false);
    //     };

    //     verifyToken();
    // }, []);

    // if (isLoading) {
    //     return <div>Loading...</div>; // Or some other loading indicator
    // }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
