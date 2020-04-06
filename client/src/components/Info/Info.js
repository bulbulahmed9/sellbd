import React from "react";
import "./Info.css";

const Info = () => {
  return (
    <div className="info">
      <div className="row">
        <div className="col-md-6 info-col">
          <div className="info-left"></div>
        </div>
        <div className="col-md-6 info-col">
          <div className="info-right">
            <div className="info-overlay">
              <div className="info-content">
                <h4>Take A Picture</h4>
                <h4>Update Informations</h4>
                <h5>Get Buyer!</h5>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi
                  quia ratione quam odit. Laudantium qui sit atque, quia non vel
                  blanditiis nostrum obcaecati expedita tempora reiciendis
                  voluptates asperiores suscipit deleniti?
                </p>
                <div className="info-btn">
                  <button> Sell Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
