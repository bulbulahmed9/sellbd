import React from 'react'

import bike from '../../img/bike-1.jpeg'
import { MdLocationOn } from "react-icons/md";
import { MdChat } from "react-icons/md";

import './HomeProduct.css'

const SingleProduct = () => {
    return (
        <>
        <div className="product">
            <img className="img-fluid" src={bike} alt="bike"/>
            <h6>Lorem ipsum dolor sit amet.</h6>
            <span className="mr-3"> <MdLocationOn /> Dhaka</span> <span>Chat <MdChat /> </span>
            <p>$120000</p>
        </div>
        </>
    )
}

export default SingleProduct
