import React from 'react'
import {Link} from 'react-router-dom'

import bike from '../../Home/img/bike-1.jpeg'
import './Product.css'
import { MdLocationOn } from "react-icons/md";
import { MdChat } from "react-icons/md";

const Product = () => {
    return (
        <>
        <div className="product">
            <Link to="/product-details">
            <img className="img-fluid" src={bike} alt=""/>
            <h6>Lorem ipsum dolor sit amet.</h6>
            </Link>
            <span className="mr-3"> <MdLocationOn /> Dhaka</span> <span>Chat <MdChat /> </span>
            <p>$120000</p>
        </div>
        </>
    )
}

export default Product
