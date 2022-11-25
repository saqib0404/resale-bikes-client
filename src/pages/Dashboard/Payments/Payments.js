import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(process.env.REACT_APP_stripePk);

const Payments = () => {
    const booking = useLoaderData();
    const { price, item } = booking;
    return (
        <div>
            <h2 className='text-3xl ml-2 mt-2 mb-4'>Payment</h2>
            <h3 className='text-xl ml-2 my-2 mb-4'>Please pay <strong>${price}</strong> for {item}</h3>
            <h3 className='text-lg ml-2 my-2 mt-8'>Pay by your card</h3>
            <Elements stripe={stripePromise}>
                <CheckoutForm booking={booking} />
            </Elements>
        </div>
    );
};

export default Payments;