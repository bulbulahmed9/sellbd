import React, { useState, useEffect } from "react";
import "./productList.css";
import { AiOutlineSearch } from "react-icons/ai";
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import { categoryForFilter } from '../../shared/staticData/data'
import { getAd } from '../../services/actions/advertiseAction'
import { connect } from 'react-redux'

// components
import Product from "./Product";
import BigLoader from '../loading/BigLoader'

const ProductList = ({ ads, getAdLoading, getAd, page }) => {


    const [data, setData] = useState({
        division: "",
        area: "",
        category: "",
        price: "",
        searchKeyword: ""
    })
    const [isFilter, setIsFilter] = useState(false)

    const { division, area, category, price, searchKeyword } = data

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        setIsFilter(true)
        window.scroll(0, 0)
    }

    let newCategory;
    if (category === "All") {
        newCategory = ""
    } else {
        newCategory = category
    }

    let filterData = {
        division,
        area,
        category: newCategory,
        price,
        searchKeyword
    }

    useEffect(() => {
        getAd(filterData, ads, isFilter, page)
    }, [division, area, category, price, searchKeyword])

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
                                <InfiniteScroll
                                    dataLength={ads.length}
                                    next={() => getAd(filterData, ads, false, page)}
                                    hasMore={true}
                                    loader={getAdLoading && <BigLoader />}
                                >
                                    {/* {
                                    getAdLoading ? <BigLoader /> : */}
                                    <div className="row">
                                        {ads.length > 0 ? ads.map((ad, index) => {
                                            return <div key={index} className="col-md-3">
                                                <Product ad={ad} />
                                            </div>
                                        }) : <h3 style={{ textAlign: "center", width: "100%" }}> {getAdLoading === false && "No ads found"} </h3>}
                                    </div>
                                    {/* } */}
                                </InfiniteScroll>

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
    getAdLoading: state.ad.getAdLoading,
    page: state.ad.page
})

export default connect(mapStateToProps, { getAd })(ProductList);
