import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { AiOutlineSearch } from "react-icons/ai";

// components
import Product from "../Product/Product";
import Title from "../../Title/Title";
import Filter from "../../Filter/Filter";

const ProductList = ({ title }) => {
  const [data, setData] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
  ]);

  console.log(data[0]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Filter />
          </div>
          <div className="col-md-9">
            <div className="product-list">
              <div className="container">
                <Title title={title} />
                <div className="product-list-header">
                  <div className="button">
                    <a href="#">All</a>
                    <a href="#">Newly Posted</a>
                    <a href="#">Second Hand</a>
                    <a href="#">Recondition</a>
                    <a href="#">Bycycle</a>
                  </div>
                  <div className="search">
                    <input type="search" placeholder="Search" />
                    <div className="search-icon">
                      <AiOutlineSearch />
                    </div>
                  </div>
                </div>

                <div className="row">
                  {data.map((item, index) => (
                  
                      <div key={index} className="col-md-3">
                        <Product />
                      </div>
                    
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
