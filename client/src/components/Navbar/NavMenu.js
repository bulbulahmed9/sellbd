import React, { Fragment } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink, withRouter } from "react-router-dom";
import { MdDirectionsBike } from "react-icons/md";
import "./NavMenu.scss";

const NavMenu = ({ background, location }) => {
  const { pathname } = location.pathname;

  return (
    <Fragment>
      <div className={`my-navbar ${background}`}>
        <Container>
          <Navbar expand="md" className="nav">
            <Navbar.Brand>
              <Link className="link" to="/">
                Bike Bazar BD <MdDirectionsBike />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto my-nav">
                <NavLink
                  className={`link ${pathname === "/all-ads" && "active"}`}
                  to="/all-ads"
                >
                  Our Showroom
                </NavLink>
                <NavLink
                  className={`link ${pathname === "/accessories" && "active"}`}
                  to="/accessories"
                >
                  Accessories
                </NavLink>
                <NavLink
                  className={`link ${pathname === "/accessories" && "active"}`}
                  to="/servicing"
                >
                  Servicing
                </NavLink>
                <NavLink
                  className={`link ${pathname === "/accessories" && "active"}`}
                  to="/insurance"
                >
                  Insurance
                </NavLink>
                <NavLink
                  className={`link ${pathname === "/accessories" && "active"}`}
                  to="/oil-pump"
                >
                  Oil Pump
                </NavLink>
              </Nav>
              <div className="nav-right">
                <NavLink
                  className={`sell ${pathname === "/post-ad" && "active"}`}
                  to="/post-ad"
                >
                  Sell Bike
                </NavLink>
                <NavLink className="login" to="login">
                  Login or Register
                </NavLink>
              </div>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </div>
    </Fragment>
  );
};

export default withRouter(NavMenu);
