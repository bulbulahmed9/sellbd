import React from "react";
import "./Footer.css";

import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";


const Footer = () => {


  return (
    <div className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="footer-content">
                <div className="logo">bikebazar logo</div>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Sequi, sint.
                </p>
                <div className="icon-group">
                  <a href="#" className="icon">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="icon">
                    <FaTwitter />
                  </a>
                  <a href="#" className="icon">
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-content">
                <h3>Quick Links</h3>
                <a href="#">Home</a>
                <a href="#">About Us</a>
                <a href="#">Contact Us</a>
                <a href="#">lorem</a>
                <a href="#">lorem</a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-content">
                <h3>Contact Us</h3>
                <p>+8823546987</p>
                <p>email@bikebazar.com</p>
                <p>758, Mirpur, Dhaka</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-content">
                <h3>Terms & Conditions</h3>
                <a href="#">Terms</a>
                <a href="#">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>All rights reserved | Bike Bazar BD 2020</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
