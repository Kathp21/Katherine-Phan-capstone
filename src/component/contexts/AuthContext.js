// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';


const AuthContext = createContext({});

const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => { 

    const [ isLoggedIn, setIsLoggedIn ] = useState(!!localStorage.getItem('userId'))

    const login = () => {
        localStorage.setItem('userId', 'user_id_value_here')
        setIsLoggedIn(true)
    }

    const logout = async () => {
        localStorage.removeItem('userId')
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