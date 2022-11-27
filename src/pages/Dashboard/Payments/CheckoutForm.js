import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';

const CheckoutForm = ({ booking }) => {
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState('');
    const [transitionId, setTransitionId] = useState('');
    const { price, name, email, _id, productId } = booking;
    const [cardError, setCardError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
            });
    }, [price]);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
        } else {
            setCardError('');
        }
        setProcessing(true);
        setSuccess('');
        const { paymentIntent, cardConfirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name,
                        email
                    },
                },
            },
        );

        if (cardConfirmError) {
            setCardError(cardConfirmError.message);
            setProcessing(false);
            return;
        }
        if (paymentIntent?.status === "succeeded") {

            const payment = {
                price,
                email,
                productId,
                transitionId: paymentIntent?.id,
                bookingId: _id
            }
            fetch('http://localhost:5000/payments', {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccess('Congrats! Transition Completed Successfully')
                        setTransitionId(paymentIntent.id);
                        toast.success('Payment Successful')
                        setProcessing(false);
                        navigate('/dashboard')
                    }
                })
        }

    }

    return (
        <>
            <form className='flex flex-col w-11/12 px-5 pt-2' onSubmit={handleSubmit}>
                <CardElement
                    className='border-2 border-blue-400 border-dashed p-4'
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn btn-sm btn-primary'
                    type="submit"
                    disabled={!stripe || !clientSecret || processing || success}>
                    Pay
                </button>
            </form>
            <p className='text-red-600 px-5'>{cardError}</p>
            {
                success && <div>
                    <p className='text-lg text-success'>{success}</p>
                    <span>Transition id: <span className='font-bold'></span>{transitionId}</span>
                </div>
            }
        </>
    );
};

export default CheckoutForm;