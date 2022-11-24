import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductsCategory = () => {
    const [productsCategory, setProductsCategory] = useState();
    axios.get('http://localhost:5000/productsCategory').then(data => setProductsCategory(data.data))

    // console.log(productsCategory);
    return (
        <div className='my-20'>
            <h2 className='text-4xl font-semibold text-center mb-4'>Second Hand Products Categories:</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4'>
                {productsCategory?.map(category => <div key={category.id} className="card shadow-xl">
                    <figure className='px-5 pt-5 rounded-lg'><img src={category.img} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{category.name}</h2>
                        <div className="card-actions justify-end">
                            <Link><button className="btn btn-primary">See all</button></Link>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default ProductsCategory;