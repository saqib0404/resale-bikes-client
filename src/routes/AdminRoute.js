import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { useAdmin } from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className='flex flex-col justify-center items-center h-56'>
            <progress className="progress w-56"></progress>
            <h2 className='text-2xl'>Loading...</h2>
        </div>

    }
    if (user?.uid && isAdmin) {
        return children
    }
    return <Navigate to='/' state={{ from: location }} replace={true}></Navigate>

};

export default AdminRoute;