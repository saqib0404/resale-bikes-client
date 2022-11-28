import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast';

const ResportToAdmin = () => {
    const [deleted, setDeleted] = useState(false);
    const { data: reports = [], refetch } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await fetch(`https://resell-bikes-server.vercel.app/reporteditems`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })

    const handleRemoveReport = id => {
        const proceed = window.confirm("Do you want to remove the report?")
        if (proceed) {
            fetch(`https://resell-bikes-server.vercel.app/reporteditems/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success('Report removed')
                        refetch();
                    }
                })
        }
    }

    const handleDeleteProduct = id => {
        const proceed = window.confirm("Do you want to Delete the product?")
        if (proceed) {
            fetch(`https://resell-bikes-server.vercel.app/deletereporteditem?id=${id}`, {
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
                        setDeleted(true)
                    }
                })
        }
    }

    return (
        <div>
            <h2 className='text-3xl mt-2 mb-4'>All Reported Products</h2>
            {
                reports.length < 1 ?
                    <h2 className='text-3xl font-semibold text-center mb-8 h-80'>No Reported Products</h2>
                    :
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-6 md:mx-10'>
                        {reports.map(report => <div key={report._id} className="card shadow-xl">
                            <figure><img className='rounded-xl' src={report.product?.image} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-2xl">{report.product?.bike_name}</h2>
                                <p className='text-sm py-0 my-0'>Reporter email: {report.email}</p>
                                <p className='text-sm py-0 my-0'>Reported By: {report.user}</p>
                                <p className='text-sm py-0 my-0'>Location: {report.product?.location}</p>
                                <p className='text-sm py-0 my-0'>Original Price: ${report.product?.original_price}</p>
                                <p className='text-sm py-0 my-0'>Resale Price: ${report.product?.resale_price}</p>
                                <div className='flex items-center'>
                                    {report.product.verified && <CheckCircleIcon className="h-6 w-6 text-blue-500" />}
                                    <p className='text-sm py-0 my-0'>Seller: {report.product?.seller}</p>
                                </div>
                                <p className='text-sm py-0 my-0'>Posted: {report.product?.time}</p>
                                <div><button onClick={() => handleRemoveReport(report._id)} className='btn-sm btn'>Remove report</button></div>
                                <div className="block w-full mt-5">
                                    <button
                                        onClick={() => handleDeleteProduct(report.product._id)}
                                        className="btn btn-error w-full"
                                        disabled={deleted && true}
                                    >Delete Product</button>
                                </div>
                            </div>
                        </div>)}
                    </div>
            }
        </div>
    );
};

export default ResportToAdmin;