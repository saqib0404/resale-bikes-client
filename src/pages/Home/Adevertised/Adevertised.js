import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import BookingModal from '../../Products/BookingModal';

const Adevertised = () => {
    const [bookingProduct, setBookingProduct] = useState(null);
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/advertiserproducts`)
            const data = await res.json();
            return data;
        }
    })

    return (
        <div className='mt-8 mb-20'>
            {
                products.length > 0 &&
                <>
                    <h2 className='text-3xl font-semibold text-center mb-8'>Advertised Products</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-6 md:mx-10'>
                        {products.map(product => <div key={product._id} className="card shadow-xl">
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
                </>
            }
        </div>
    );
};

export default Adevertised;