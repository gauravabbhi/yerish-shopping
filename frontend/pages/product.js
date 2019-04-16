import React from "react";
import SingleProduct from '../components/SingleProduct';
import App from "../components/App";
import Items from "../components/Items";


const Product = ({query, pageContext}) => (
    <App pageContext={pageContext}>
        <SingleProduct id={query.id}/>
        <Items />
    </App>
);

export default Product;
