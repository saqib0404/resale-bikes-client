import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { useSeller } from '../hooks/useSeller';

const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    const location = useLocation();

    if (loading || isSellerLoading) {
        return <div className='flex flex-col justify-center items-center h-56'>
            <progress className="progress w-56"></progress>
            <h2 className='text-2xl'>Loading...</h2>
        </div>

    }
    if (user?.uid && isSeller) {
        return children
    }
    return <Navigate to='/' state={{ from: location }} replace={true}></Navigate>
};

export default SellerRoute;