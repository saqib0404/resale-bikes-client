import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loader from '../../../../components/Loader/Loader';

const AllBuyers = () => {
    const { data: buyers = [], refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch(`https://resell-bikes-server.vercel.app/specificusers?buyer=Buyer`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })

    const handleDelete = id => {
        const proceed = window.confirm("Do you want to remove this Buyer?")
        if (proceed) {
            fetch(`https://resell-bikes-server.vercel.app/users?buyerId=${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success('Buyer removed')
                        refetch();
                    }
                })
        }
    }

    return (
        <div>
            <h2 className='text-3xl mt-2 mb-4'>All Buyers</h2>
            {
                buyers?.length < 1 ?
                    <h2>No Buyers Available</h2>
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
                                </tr>
                            </thead>
                            <tbody>
                                {buyers?.length < 1 ? <Loader></Loader> :
                                    buyers?.map((buyer, idx) => <tr key={idx}>
                                        <th>{idx + 1}</th>
                                        <td>{buyer.name}</td>
                                        <td>{buyer.email}</td>
                                        <td>
                                            <button onClick={() => handleDelete(buyer._id)} className='btn btn-sm btn-error'>Delete</button>
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

export default AllBuyers;