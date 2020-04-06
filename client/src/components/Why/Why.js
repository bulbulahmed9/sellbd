import React from "react";

import "./Why.css";

import Button from "../Button/Button";

const Why = () => {
  return (
    <div className="why">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="why-content-left">
              <h3>Why Sell At?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis odio autem facilis laboriosam quaerat mollitia
                aliquam, nostrum, fugiat, voluptatibus atque alias! Adipisci
                accusantium consequuntur quibusdam. Tempora reprehenderit
                distinctio laudantium architecto?
              </p>
              <Button title="Discover" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="why-content-right">
              <h3>Why Sell At?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis odio autem facilis laboriosam quaerat mollitia
                aliquam, nostrum, fugiat, voluptatibus atque alias! Adipisci
                accusantium consequuntur quibusdam. Tempora reprehenderit
                distinctio laudantium architecto?
              </p>
              <Button title="Discover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
