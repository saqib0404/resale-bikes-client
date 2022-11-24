import React from 'react';
import yamaha from '../../../assets/yamaha.png';
import honda from '../../../assets/honda.png';
import lifan from '../../../assets/lifan.png';
import suzuki from '../../../assets/suzuki.png';
import bajaj from '../../../assets/bajaj.png';

const Partners = () => {
    return (
        <section className=' my-20'>
            <h2 className='text-center text-3xl font-semibold'>Second Hand Products From Companies We Allow</h2>
            <div className=' grid gap-4 grid-cols-3 md:grid-cols-5 w-11/12 ml-auto mt-8'>
                <img className='w-24 text-center' src={yamaha} alt="" />
                <img className='w-32' src={honda} alt="" />
                <img className='w-24' src={lifan} alt="" />
                <img className='w-24' src={suzuki} alt="" />
                <img className='w-24' src={bajaj} alt="" />
            </div>
        </section>
    );
};

export default Partners;