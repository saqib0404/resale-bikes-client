import React from 'react';
import missing from '../../assets/missing.png';

const NotFoundPage = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h2 className='text-4xl text-center font-semibold text-blue-500'>Page Not Found..!</h2>
            <img src={missing} alt="" />
        </div>
    );
};

export default NotFoundPage;