import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Tabs, Tab } from "react-bootstrap";

import "./ProductDetails.css";

import hero from "../../../StaticImage/hero.jpeg";

import Product from "../Product/Product";

const ProductDetails = () => {
  return (
    <div className="product-details">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Carousel>
              <div>
                <img src={hero} alt="hero" />
              </div>
              <div>
                <img src={hero} alt="hero" />
              </div>
              <div>
                <img src={hero} alt="hero" />
              </div>
              <div>
                <img src={hero} alt="hero" />
              </div>
              <div>
                <img src={hero} alt="hero" />
              </div>
            </Carousel>
          </div>
          <div className="col-md-6">
            <h3>Hero Maestro Edge 110cc 2015</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
              neque consectetur quaerat non nam illum? Lorem ipsum dolor sit
              amet consectetur, adipisicing elit. Animi, veniam!
            </p>
            <h4>BDT 2,25,000</h4>
            <div className="contact">
              <a href="#">Chat</a>
              <span>or</span>
              <strong>
                {" "}
                <i className="las la-phone-volume"></i> 01756895489
              </strong>
            </div>
            <div className="location">
              <p>
                <i className="las la-map-marker"></i> Dhanmondi, Dhaka
              </p>
              <p>
                <i className="las la-calendar-alt"></i> Posted on 12/2/2020
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
                      Brand: <span>Hero</span>
                    </p>
                    <p>
                      Year: <span>2015</span>
                    </p>
                    <p>
                      Model: <span>Maestro Edge</span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      Color: <span>Blue</span>
                    </p>
                    <p>
                      Body Type: <span>Commuter</span>
                    </p>
                    <p>
                      Trim: <span>110cc</span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      Fuel: <span>Petrol</span>
                    </p>
                    <p>
                      ID: <span>2015575655</span>
                    </p>
                    <p>
                      Registration: <span>RC-45789655545</span>
                    </p>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="Key Facts" title="Key Facts">
              <div className="tab-content">
                <div className="row">
                  <div className="col-md-4">
                    <p>
                      Brand: <span>Hero</span>
                    </p>
                    <p>
                      Year: <span>2015</span>
                    </p>
                    <p>
                      Model: <span>Maestro Edge</span>
                    </p>
                  </div>
                  <div className="col-md-4"></div>
                  <div className="col-md-4"></div>
                </div>
              </div>
            </Tab>
            {/* <Tab eventKey="contact" title="Contact" disabled>
              <Sonnet />
            </Tab> */}
            <Tab eventKey="Features" title="Features">
              <div className="tab-content">
                <div className="row">
                  <div className="col-md-4">
                    <p>
                      Brand: <span>Hero</span>
                    </p>
                    <p>
                      Year: <span>2015</span>
                    </p>
                    <p>
                      Model: <span>Maestro Edge</span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      Color: <span>Blue</span>
                    </p>
                    <p>
                      Body Type: <span>Commuter</span>
                    </p>
                    <p>
                      Trim: <span>110cc</span>
                    </p>
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
                  <p>
                    Brand: <span>Hero</span>
                  </p>
                  <p>
                    Year: <span>2015</span>
                  </p>
                  <p>
                    Model: <span>Maestro Edge</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    Brand: <span>Hero</span>
                  </p>
                  <p>
                    Year: <span>2015</span>
                  </p>
                  <p>
                    Model: <span>Maestro Edge</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h3>More Hero Bike?</h3>
              <div className="row">
                <div className="col-md-6">
                  <img className="img-fluid" src={hero} alt="hero bike" />
                </div>
                <div className="col-md-6">
                  <img className="img-fluid" src={hero} alt="hero bike" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="more-bike">
        <h3>You May Like</h3>
          <div className="row">
            <div className="col-md-3">
              <Product />
            </div>
            <div className="col-md-3">
              <Product />
            </div>
            <div className="col-md-3">
              <Product />
            </div>
            <div className="col-md-3">
              <Product />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
