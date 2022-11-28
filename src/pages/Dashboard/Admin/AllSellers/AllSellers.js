import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loader from '../../../../components/Loader/Loader';

const AllSellers = () => {
    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch(`https://resell-bikes-server.vercel.app/specificusers?seller=Seller`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })

    const handleDelete = id => {
        const proceed = window.confirm("Do you want to remove this Seller?")
        if (proceed) {
            fetch(`https://resell-bikes-server.vercel.app/users?sellerId=${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success('Seller removed')
                        refetch();
                    }
                })
        }
    }

    const handleVerify = email => {
        const proceed = window.confirm("Do you want to Verify this Seller?")
        if (proceed) {
            fetch(`https://resell-bikes-server.vercel.app/verifyuser?email=${email}`, {
                method: "PATCH",
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    toast.success('Seller Verified')
                    refetch();
                })
        }
    }

    return (
        <div>
            <h2 className='text-3xl mt-2 mb-4'>All Sellers</h2>
            {
                sellers?.length < 1 ?
                    <h2>No Sellers Available</h2>
                    :
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    {/*  */}
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {sellers?.length < 1 ? <Loader></Loader> :
                                    sellers?.map((seller, idx) => <tr key={idx}>
                                        <th>{idx + 1}</th>
                                        <td>{seller.name}</td>
                                        <td>{seller.email}</td>
                                        <td>
                                            <button onClick={() => handleDelete(seller._id)} className='btn btn-sm btn-error'>Delete</button>
                                        </td>
                                        <td>
                                            {seller.verified ? <span className='font-bold'>Verified</span>
                                                :
                                                <button onClick={() => handleVerify(seller.email)} className='btn btn-sm btn-info'>Verify</button>
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

export default AllSellers;