import React, { useState, useEffect } from "react";
import "./productList.css";
import { AiOutlineSearch } from "react-icons/ai";
import PropTypes from 'prop-types'

import { categoryForFilter } from '../../shared/staticData/data'


import { getAd } from '../../services/actions/advertiseAction'
import { connect } from 'react-redux'

// components
import Product from "./Product";
import BigLoader from '../loading/BigLoader'

const ProductList = ({ ads, getAdLoading, getAd }) => {


    const [data, setData] = useState({
        division: "",
        area: "",
        category: "",
        price: "",
        searchKeyword: ""
    })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const { division, area, category, price, searchKeyword } = data

    let newCategory;
    if(category === "All"){
        newCategory = ""
    } else{
        newCategory = category
    }

    useEffect(() => {
        getAd({ division, area, category: newCategory, price, searchKeyword })
    }, [division, area, category, price, searchKeyword, getAd])

    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <div className="filter">
                            <h3>Filter Result</h3>
                            <div className="area">
                                <h3>
                                    Division
                                </h3>
                                <div className="division">
                                    <input
                                        name="division"
                                        value={data.division}
                                        onChange={(e) => handleChange(e)}
                                        type="text"
                                        placeholder="Division" />
                                </div>
                                <h3>Area</h3>
                                <div className="city">
                                    <input
                                        type="text"
                                        placeholder="Area"
                                        name="area"
                                        value={data.area}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="category">
                                <h3>
                                    Category
                            </h3>
                                <select
                                    name="category"
                                    value={data.category}
                                    onChange={(e) => handleChange(e)}
                                >
                                    {categoryForFilter.map((item, index) => {
                                        return <option key={index} value={item}> {item} </option>
                                    })}
                                </select>
                            </div>
                            <div className="price">
                                <h3>Price</h3>
                                <div className="price-range">
                                    <input
                                        type="text"
                                        placeholder="Price"
                                        name="price"
                                        value={data.price}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="product-list">
                            <div className="container">
                                <div className="product-list-header">
                                    <div className="search">
                                        <input
                                            type="search"
                                            placeholder="Search"
                                            name="searchKeyword"
                                            value={data.searchKeyword}
                                            onChange={(e) => handleChange(e)}
                                        />
                                        <div className="search-icon">
                                            <AiOutlineSearch />
                                        </div>
                                    </div>
                                </div>
                                {
                                    getAdLoading ? <BigLoader /> :
                                        <div className="row">
                                            {ads.length > 0 ? ads.map((ad, index) => {
                                                return <div key={index} className="col-md-3">
                                                    <Product ad={ad} />
                                                </div>
                                            }) : <h3> No ads found </h3>}
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};


ProductList.prototypes = {
    ads: PropTypes.array.isRequired,
    getAdLoading: PropTypes.bool.isRequired,
}


const mapStateToProps = state => ({
    ads: state.ad.ads,
    getAdLoading: state.ad.getAdLoading
})

export default connect(mapStateToProps, { getAd })(ProductList);
