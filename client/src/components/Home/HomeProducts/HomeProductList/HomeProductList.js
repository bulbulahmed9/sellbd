import React, { useState } from "react";
import "./HomeProductList.css";

// components
import Product from "../HomeProduct/HomeProduct";
import Button from "../../../Button/Button";

const ProductList = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8]);



  return (
    <>
      <div className="home-product-list">
        <div className="container">
          <div className="button">
            <button>All</button>
            <button>Newly Posted</button>
            <button>Second Hand</button>
            <button>Recondition</button>
            <button>Bycycle</button>
          </div>
          <div className="row">
            {data.map((index, item) => {
              return (
                <div key={index} className="col-md-3">
                  <Product />
                </div>
              );
            })}
          </div>
          <div className="discover-button">
            <Button title="Discover" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
