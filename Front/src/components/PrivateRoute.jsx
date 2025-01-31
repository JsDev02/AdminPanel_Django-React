import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [role, setRole] = useState(null); 

    useEffect(() => {
        const authStatus = localStorage.getItem('access_token');
        const userRole = localStorage.getItem('role');

        if (authStatus && userRole) {
            setIsAuthenticated(true);
            setRole(userRole);
        } else {
            setIsAuthenticated(false); 
        }
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    if (role === '1' && window.location.pathname !== '/admin-panel') {
        return <Navigate to="/admin-panel" />;
    }
    
    if (role === '0' && window.location.pathname !== '/user-panel') {
        return <Navigate to="/user-panel" />;
    }

    return children;
};

export default PrivateRoute;
