import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../contexts/AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { isLoggedIn } = useAuth()

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute