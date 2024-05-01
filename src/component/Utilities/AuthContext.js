// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

// export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => { 
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ auth, setAuth ] = useState({})

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
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;