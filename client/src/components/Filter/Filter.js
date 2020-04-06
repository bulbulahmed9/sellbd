import React from "react";

import "./Filter.css";

const Filter = () => {
  return (
    <div className="filter">
      <div className="area">
        <h3>
          Area <i style={{ transform: 'translateY(1px)' }} class="las la-map-marked"></i>
        </h3>
        <div className="division">
          <input type="text" placeholder="Division" />
          <div className="icon">
            <i class="las la-arrow-down"></i>
          </div>
        </div>
        <div className="city">
          <input type="text" placeholder="Area" />
          <div className="icon">
            <i class="las la-arrow-down"></i>
          </div>
        </div>
      </div>
      <div className="brand">
        <h3>
          Brand <i class="las la-motorcycle"></i>
        </h3>
        <div className="brand-btn">
          <button>Hero</button>
          <button>TVS</button>
          <button>Suzuki</button>
          <button>Runner</button>
        </div>
        <div className="brand-btn">
          <button>Hero</button>
          <button>TVS</button>
          <button>Suzuki</button>
          <button>Runner</button>
        </div>
      </div>
      <div className="price">
        <h3>Price <i class="las la-money-bill-wave"></i></h3>
        <div className="price-range">
          <button>0 - 80,000 BDT ৳</button>
          <button>80,000 - 250000 BDT</button>
          <button>2,50,000 BDT +</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
