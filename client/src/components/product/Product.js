import React from 'react'
import { Link } from 'react-router-dom'

import './product.css'
import { MdLocationOn } from "react-icons/md";

const Product = ({ ad }) => {
    return (
        <>
            <Link to={`/product-details/${ad._id}`} className="product">
                <div>
                    <img className="img-fluid" src={ad.images[0].url} alt="product" />
                    <h6> {ad.title} </h6>
                    <h6> Seller: {ad.user.name} </h6>
                </div>
                <div className="mb-3">
                    <span className="mr-3"> <MdLocationOn /> {`${ad.area},${ad.division}`} </span> <p> price: {ad.price} BDT </p>
                </div>
            </Link>
        </>
    )
}

export default Product
