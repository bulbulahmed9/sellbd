import React,{ useEffect } from 'react'
import ProductList from '../../components/product/ProductList'

import {getAd} from '../../services/actions/advertiseAction'
import {connect} from 'react-redux'

const Advertises = ({ getAd }) => {

    // useEffect(() => {
    //     getAd()
    // },[getAd])

    return (
        <div>
            <ProductList />
        </div>
    )
}

export default connect(null, {getAd})(Advertises)
