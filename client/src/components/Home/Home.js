import React, { Fragment } from 'react'
import HomeTop from './HomeTop/HomeTop'
import HomeProductList from './HomeProducts/HomeProductList/HomeProductList'
import Ad from '../Advertisement/Ad'
import Why from '../Why/Why'
import Info from '../Info/Info'

const Home = () => {

    return (
        <Fragment>
            <HomeTop />
            <HomeProductList />
            <Ad />
            <Why />
            <HomeProductList />
            <Info />
            <Ad />
        </Fragment>
    )
}

export default Home
