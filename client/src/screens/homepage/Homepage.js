import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAd } from '../../services/actions/advertiseAction'
import './homepage.css'

// components
import Product from '../../components/product/Product'
import BigLoader from '../../components/loading/BigLoader'
import { Link } from 'react-router-dom'

const Homepage = ({ getAd, ads, getAdLoading }) => {

    // data for passing as argument in getAd function
    // initially it needs some argument , as i use it for getting data with filtering and pagination
    const [data, setData] = useState({
        filterObj: {},
        isFilter: true,
        page: 0
    })

    let { filterObj, isFilter, page } = data

    useEffect(() => {
        getAd(filterObj, ads, isFilter, page)
    }, [])

    return (
        <div>
            <div className="home"></div>
            <div className="container">
                <div className="home-content my-5">
                    {
                        getAdLoading ? <BigLoader /> :
                            <div className="row">
                                {ads.length > 0 ? ads.map((ad, index) => {
                                    return <div key={index} className="col-md-3">
                                        <Product ad={ad} />
                                    </div>
                                }) : <h3 style={{ textAlign: "center", width: "100%" }}> {getAdLoading === false && "No ads found"} </h3>}
                            </div>
                    }
                    <div className="text-center mt-3">
                        <Link className="see-more" to="/allads">See All Ads</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

Homepage.propTypes = {
    ads: PropTypes.array.isRequired,
    getAd: PropTypes.func.isRequired,
    getAdLoading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    ads: state.ad.ads,
    getAdLoading: state.ad.getAdLoading
})

export default connect(mapStateToProps, { getAd })(Homepage)
