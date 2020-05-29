import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Tabs, Tab } from 'react-bootstrap'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Moment from 'react-moment';
import { Carousel } from 'react-responsive-carousel'

import './advertise.css'
import BigLoader from '../../components/loading/BigLoader'
import { getSingleAd } from '../../services/actions/singAdAction'
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'
import { MdLocationOn } from "react-icons/md";

const Advertise = ({ match, getSingleAd, ad, loading, relatedAds, history }) => {

    let email;
    if(ad){
        if(ad.user.email){
            email = ad.user.email
        }else if(ad.user.faacebookEmail){
            email = ad.user.faacebookEmail
        } else if(ad.user.googleEmail){
            email = ad.user.googleEmail
        }
    }


    useEffect(() => {
        getSingleAd(match.params.id, history)
    }, [])

    return (
        loading ? <BigLoader /> :
            <div className="product-details">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Carousel>
                                {
                                    ad && ad.images.map((img, index) => {
                                        return <div key={index}> <img className="img-fluid" src={img.url} alt="bike" /> </div>
                                    })
                                }
                            </Carousel>
                        </div>
                        <div className="col-md-6">
                            <h3> {ad && ad.title} </h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
                                neque consectetur quaerat non nam illum? Lorem ipsum dolor sit
                                amet consectetur, adipisicing elit. Animi, veniam!
                            </p>
                            <h4> BDT {ad && ad.price} </h4>
                            {ad && ad.isNegotiable && <span>Negotiable</span>}
                            <div className="contact">
                                <a onClick={() => toast("Currently this features is not available")} href="#!">Chat</a>
                                <span>or</span>
                                <strong>
                                    {""}
                                    Call<i className="las la-phone-volume"></i> {ad && `0${ad.user.phone}`}
                                </strong>
                            </div>
                            <div className="location">
                                <p>
                                    <i className="las la-map-marker"></i>{ad && ad.area}, {ad && ad.division}
                                </p>
                                <p>
                                    <i className="las la-calendar-alt"></i> Posted on <Moment format="DD/MM/YYYY">{ad && ad.createdAt}</Moment>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="product-info">
                        <Tabs
                            defaultActiveKey="Basic"
                            transition={false}
                            id="noanim-tab-example"
                        >
                            <Tab eventKey="Basic" title="Basic">
                                <div className="tab-content">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <p>
                                                Title: <span> {ad && ad.title} </span>
                                            </p>
                                            <p>
                                                Category: <span> {ad && ad.category} </span>
                                            </p>
                                            <p>
                                                Condition: <span> {ad && ad.condition} </span>
                                            </p>
                                        </div>
                                        <div className="col-md-4">
                                        </div>
                                        <div className="col-md-4">
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="Key Facts" title="Key Facts">
                                <div className="tab-content">
                                    <div className="row">
                                        <div className="col-md-8">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam ipsa mollitia accusamus, minus fuga id dicta alias, sit necessitatibus cumque consectetur esse voluptatum suscipit repellendus, in quaerat maxime. Consequatur deleniti quos commo
                                        </div>
                                        <div className="col-md-4"></div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="Features" title="Features">
                                <div className="tab-content">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <h3>Coming Soon...</h3>
                                        </div>
                                        <div className="col-md-4">
                                        </div>
                                        <div className="col-md-4"></div>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                    <div className="seller-info">
                        <div className="row">
                            <div className="col-md-6">
                                <h3>Seller Information</h3>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5> Name: {ad && ad.user.name} </h5>
                                        <h5> Email: {email} </h5>
                                        <h5> Phone: {ad && `0${ad.user.phone}`} </h5>
                                        <h5> Location: {ad && ad.area},{ad && ad.division} </h5>
                                    </div>
                                    <div className="col-md-6">
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
                                <h3 className="mt-5">More Ads</h3>
                                <div className="row">
                                    {relatedAds && relatedAds.map((relatedAd, index) => {
                                        return <div key={index} className="col-md-2">
                                            <Link to={`/product-details/${relatedAd._id}`} className="product">
                                                <div>
                                                    <img className="img-fluid" src={relatedAd.images[0].url} alt="product" />
                                                    <h6> {relatedAd.title} </h6>
                                                    <h6> Seller: {relatedAd.user.name} </h6>
                                                </div>
                                                <div className="mb-3">
                                                    <span className="mr-3"> <MdLocationOn /> {`${relatedAd.area},${relatedAd.division}`} </span> <p> price: {relatedAd.price} BDT </p>
                                                </div>
                                            </Link>
                                        </div>
                                    })}
                                </div>

                    </div>
                </div>
            </div>


    )
}

Advertise.propTypes = {
    getSingleAd: PropTypes.func.isRequired,
    ad: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    relatedAds: PropTypes.array,
}

const mapStateToProps = state => ({
    ad: state.singleAd.ad,
    loading: state.singleAd.loading,
    relatedAds: state.ad.relatedAds
})

export default connect(mapStateToProps, { getSingleAd })(Advertise)
