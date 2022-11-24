import React from 'react';
import Banner from '../Banner/Banner';
import Partners from '../Partners/Partners';
import ProductsCategory from '../ProductsCategory/ProductsCategory';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ProductsCategory></ProductsCategory>
            <Partners></Partners>
        </div>
    );
};

export default Home;