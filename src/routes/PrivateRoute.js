import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className='flex flex-col justify-center items-center h-56'>
            <progress className="progress w-56"></progress>
            <h2 className='text-2xl'>Loading...</h2>
        </div>

    }
    if (user?.uid) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace={true}></Navigate>
};

export default PrivateRoute;