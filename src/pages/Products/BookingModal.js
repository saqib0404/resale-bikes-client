import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const BookingModal = ({ bookingProduct, setBookingProduct }) => {
    const { user } = useContext(AuthContext);
    const { bike_name, resale_price, image, _id } = bookingProduct;
    const [userType, setUserType] = useState();
    useEffect(() => {
        fetch(`https://resell-bikes-server.vercel.app/users?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(res => res.json())
            .then(data => setUserType(data))
    }, [user])

    const handleBooking = e => {
        e.preventDefault();
        if (!user?.uid) {
            toast.error("Please login to book products.")
            return;
        }
        if (userType?.userType === "Seller" || userType?.userType === "Admin") {
            toast.error("Only Buyers can book products")
            return;
        }
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const item = form.item.value;
        const price = form.price.value;
        const newPrice = price.split(' ');
        const phone = form.phone.value;
        const location = form.location.value;


        const booking = {
            name,
            email,
            item,
            price: newPrice[1],
            phone,
            image,
            productId: _id,
            location
        }


        fetch('https://resell-bikes-server.vercel.app/bookings', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setBookingProduct(null)
                    toast.success('Booking Confirmed');
                } else {
                    toast.error(data.message);
                }
            })
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{ }</h3>
                    <form onSubmit={handleBooking}>
                        <input name='name' type="text" value={user?.displayName} disabled className="input input-bordered w-full my-2" required />
                        <input name='email' type="email" value={user?.email} disabled className="input input-bordered w-full my-2" required />
                        <input name='item' type="text" value={bike_name} disabled className="input input-bordered w-full my-2" required />
                        <input name='price' type="text" value={`$ ${resale_price}`} disabled className="input input-bordered w-full my-2" required />
                        {/* <input name='price' type="text" value={`Price: ${price}`} disabled className="input input-bordered w-full my-2" required /> */}
                        <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered w-full my-2" />
                        <input name='location' type="text" placeholder="Meeting Location" className="input input-bordered w-full my-2" />
                        <input type="submit" value="Submit" className='btn btn-accent w-full mt-4' />
                    </form>

                </div>
            </div>
        </>
    );
};

export default BookingModal;