import React, {  useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from './BookingModal';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const Products = () => {
    const { user } = useContext(AuthContext);
    const products = useLoaderData();
    const [bookingProduct, setBookingProduct] = useState(null);
    const categoryName = products[0]?.category_name;

    
    const handleReportToAdmin = product => {
        const procced = window.confirm('Do you want to report this product?')
        if (procced) {
            const report = {
                product,
                user: user?.displayName,
                email: user?.email
            }
            if (user?.uid) {
                fetch('https://resell-bikes-server.vercel.app/reporteditems', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(report)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            toast.success('Product Reported');
                        } else {
                            toast.error(data.message);
                        }
                    })
            } else {
                toast.error("Please Login to report any product")
            }
        }
    }

    return (
        <div className='mt-8 mb-20'>
            {
                products.length < 1 ?
                    <h2 className='text-3xl font-semibold text-center mb-8 h-80'>No Product Available</h2>
                    :
                    <>
                        <h2 className='text-3xl font-semibold text-center mb-8'>Second Hand {categoryName} </h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-6 md:mx-10'>
                            {products.map(product => <div key={product._id} className="card shadow-xl">
                                <figure><img className='rounded-xl' src={product?.image} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title text-2xl">{product?.bike_name}</h2>
                                    <p className='text-sm py-0 my-0'>Location: {product?.location}</p>
                                    <p className='text-sm py-0 my-0'>Original Price: ${product?.original_price}</p>
                                    <p className='text-sm py-0 my-0'>Resale Price: ${product?.resale_price}</p>
                                    <div className='flex items-center'>
                                        {product.verified && <CheckCircleIcon className="h-6 w-6 text-blue-500" />}
                                        <p className='text-sm py-0 my-0'>Seller: {product?.seller}</p>
                                    </div>
                                    <p className='text-sm py-0 my-0'>Posted: {product?.time}</p>
                                    <div><button onClick={() => handleReportToAdmin(product)} className='btn-sm btn'>Report to Admin</button></div>
                                    <div className="block w-full mt-5">
                                        <label htmlFor="booking-modal" onClick={() => setBookingProduct(product)} className="btn btn-info w-full">Book Now</label>
                                    </div>
                                </div>
                            </div>)}
                            {
                                bookingProduct &&
                                <BookingModal
                                    bookingProduct={bookingProduct}
                                    setBookingProduct={setBookingProduct}
                                ></BookingModal>
                            }
                        </div>
                    </>
            }

        </div>
    );
};

export default Products;