import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loader from '../../../../components/Loader/Loader';

const AllSellers = () => {
    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/specificusers?seller=Seller`, {
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
                                            <button className='btn btn-sm btn-error'>Delete</button>
                                        </td>
                                        <td>
                                            <button className='btn btn-sm btn-info'>Verify</button>
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