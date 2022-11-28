import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';

const ProductsCategory = () => {
    const [categories, setCategories] = useState();
    useEffect(() => {
        axios.get('https://resell-bikes-server.vercel.app/category').then(data => setCategories(data.data))
    }, [])

    // console.log(productsCategory);
    return (
        <div className='my-20'>
            <h2 className='text-4xl font-semibold text-center mb-4'>Second Hand Product Categories:</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-6 md:mx-10'>
                {
                    categories ? <>
                        {categories?.map(category => <div key={category.id} className="card shadow-xl">
                            <figure className='px-5 pt-5 rounded-lg'><img className='border rounded-lg' src={category.img} alt="" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{category.name}</h2>
                                <div className="card-actions justify-end">
                                    <Link to={`/category/${category.id}`}><button className="btn btn-primary">See all</button></Link>
                                </div>
                            </div>
                        </div>
                        )}
                    </>
                        :
                        <Loader></Loader>
                }

            </div>
        </div>
    );
};

export default ProductsCategory;