import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from './BookingModal';

const Products = () => {
    const products = useLoaderData();
    const [bookingProduct, setBookingProduct] = useState(null);
    return (
        <div className='my-20'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-6 md:mx-10'>
                {products.map(product => <div key={product._id} className="cardshadow-xl">
                    <figure><img className='rounded-xl' src={product?.image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-2xl">{product?.bike_name}</h2>
                        <p className='text-sm py-0 my-0'>Location: {product?.location}</p>
                        <p className='text-sm py-0 my-0'>Original Price: ${product?.original_price}</p>
                        <p className='text-sm py-0 my-0'>Resale Price: ${product?.resale_price}</p>
                        <p className='text-sm py-0 my-0'>Seller: {product?.seller}</p>
                        <p className='text-sm py-0 my-0'>Used Years: {product?.used}</p>
                        <div className="card-actions mt-5">
                            <label htmlFor="booking-modal" onClick={() => setBookingProduct(product)} className="btn btn-primary">Book Now</label>
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
        </div>
    );
};

export default Products;