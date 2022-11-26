import React from 'react';
import Adevertised from '../Adevertised/Adevertised';
import Banner from '../Banner/Banner';
import Partners from '../Partners/Partners';
import ProductsCategory from '../ProductsCategory/ProductsCategory';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ProductsCategory></ProductsCategory>
            <Adevertised></Adevertised>
            <Partners></Partners>
        </div>
    );
};

export default Home;