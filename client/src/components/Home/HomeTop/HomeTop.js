import React, { Fragment, useState } from "react";
import { Container } from "react-bootstrap";

import { FaRegBuilding } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { GiModernCity } from "react-icons/gi";
import { useForm } from "react-hook-form";

// static data
import { cityList, areas } from "../../../StaticData/Data";

// sass
import "./homeTop.scss";
import NavMenu from "../../Navbar/NavMenu";

const HomeTop = () => {

  // Division area for input suggestion
  const [cityArea, setCityArea] = useState(null);

  // show area suggestion based on Division
  const setArea = e => {
    let val = e.target.value;
    const filterArea = areas.filter(area => {
      return area.city.match(val);
    });
    if (filterArea.length > 0) {
      setCityArea(filterArea[0].area);
    }
    if (filterArea.length > 1) {
      setCityArea(null);
    }
  };

  // react hook form
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    alert(data)
    console.log(data)
  };

  return (
    <Fragment>
      <div className="header-top">
        <NavMenu background="transparent" />
        <div className="overlay">
          <Container>
            <h1>
              Buy and sell bikes & accessories <br /> find all kind of bike
              solutions
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            </p>
              <form onSubmit={handleSubmit(onSubmit)}>
            <div className="filter-area">
              <div className="division-input">
                <input
                  className="division"
                  type="text"
                  placeholder="Division"
                  autoComplete="off"
                  name="division"
                  list="cities"
                  onChange={e => setArea(e)}
                  ref={register({ required: true })}
                />
                <datalist id="cities">
                  {cityList.map((city, index) => (
                    <option key={index} value={city} />
                  ))}
                </datalist>
                <div className="division-icon">
                  <FaRegBuilding />
                </div>
              </div>
              <div className="city-input">
                <input 
                className="city"
                 type="text"
                  placeholder="Area"
                  autoComplete="off"
                  name="area"
                  list="areas"
                  ref={register({ required: true })}
                  />
                  <datalist id="areas">
                  {cityArea !== null &&
                    cityArea.map((area, index) => (
                      <option key={index} value={area} />
                    ))}
                </datalist>
                <div className="city-icon">
                  <GiModernCity />
                </div>
              </div>
              <button type="submit" className="search">
                <AiOutlineSearch />
              </button>
            </div>
              </form>
          </Container>
        </div>
      </div>
    </Fragment>
  );
};

export default HomeTop;
