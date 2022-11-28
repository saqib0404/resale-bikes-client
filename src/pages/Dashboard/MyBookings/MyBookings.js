import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const { data: orders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await fetch(`https://resell-bikes-server.vercel.app/bookings?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })
    
    return (
        <div>
            <h2 className='text-3xl mt-2 mb-4'>My Orders</h2>
            {
                orders.length < 1 ?
                    <h2>No products Ordered</h2>
                    :
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    {/*  */}
                                    <th></th>
                                    <th></th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length < 1 ? <Loader></Loader> :
                                    orders.map((order, idx) => <tr key={idx}>
                                        <th>{idx + 1}</th>
                                        <td><img className='w-20' src={order.image} alt="" /></td>
                                        <td>{order.item}</td>
                                        <td>$ {order.price}</td>
                                        <td>
                                            {!order.paid ?
                                                <Link to={`/dashboard/payment/${order._id}`} className='btn btn-sm btn-accent'>Pay</Link>
                                                :
                                                <p className='text-primary font-bold'>Paid</p>
                                            }
                                        </td>
                                    </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
};

export default MyBookings;