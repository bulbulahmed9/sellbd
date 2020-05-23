import React from 'react'
import {Link} from 'react-router-dom'

import demo from '../../shared/img/demo.svg'
import './product.css'
import { MdLocationOn } from "react-icons/md";
import { adsURL } from '../../API/api';

const Product = ({ ad }) => {
    return (
        <>
        <div className="product">
            <Link to="/product-details">
            <img className="img-fluid" src={ad.images[0].url} alt="product"/>
            <h6> {ad.title} </h6>
            </Link>
            <div className="mb-3">
            <span className="mr-3"> <MdLocationOn /> {`${ad.area},${ad.division}`} </span> <p> price: {ad.price} BDT </p>
            </div>
        </div>
        </>
    )
}

export default Product
