import React from 'react';
import './Banner.css';
import bike from '../../../assets/bike.png';

const Banner = () => {
    return (
        <section className='banner flex flex-col items-center justify-end'>
            <h2 className='text-6xl text-center font-semibold text-white mb-4 banner-title'>Drive the Fastest</h2>
            <img className='w-7/12 md:w-4/12 mb-8' src={bike} alt="" />
        </section>
    );
};

export default Banner;