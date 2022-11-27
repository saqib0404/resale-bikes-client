import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import Loader from '../../../../components/Loader/Loader';
import { AuthContext } from '../../../../contexts/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const { data: products = [],refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })

    const handleDelete = id => {
        const proceed = window.confirm("Do you want to delete this product?")
        if (proceed) {
            fetch(`http://localhost:5000/products/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success('Product Deleted')
                        refetch();
                    }
                })
        }
    }

    const handleAdvertise = id => {
        const proceed = window.confirm("Do you want to Advertise this product?")
        if (proceed) {
            fetch(`http://localhost:5000/products?id=${id}`, {
                method: "PATCH",
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success('Product Advertised');
                        refetch();
                    }
                })
        }
    }

    return (
        <div>
            <h2 className='text-3xl mt-2 mb-4'>My Products</h2>
            {
                products?.length < 1 ?
                    <h2>No Products Added</h2>
                    :
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    {/*  */}
                                    <th></th>
                                    <th></th>
                                    <th>Sales Status</th>
                                    <th>Price</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.length < 1 ? <Loader></Loader> :
                                    products?.map((product, idx) => <tr key={idx}>
                                        <th>{idx + 1}</th>
                                        <td><img className='w-20' src={product.image} alt="" /></td>
                                        <td>
                                            {product.paid ?
                                                <span className='text-primary font-bold'>Sold</span>
                                                :
                                                <span className='font-bold'>Available</span>
                                            }

                                        </td>
                                        <td>$ {product.resale_price}</td>
                                        <td>
                                            <button onClick={() => handleDelete(product._id)} className='btn btn-sm btn-error'>Delete</button>
                                        </td>
                                        <td>
                                            {!product.paid && !product.advertised ?
                                                <button onClick={() => handleAdvertise(product._id)} className='btn btn-sm btn-success'>Advertise</button>
                                                :
                                                <></>
                                            }
                                            {product.advertised && <span className='font-bold'>Advertised</span>}
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

export default MyProducts;