import React from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  NavLink
} from "react-router-dom";
import { Container } from "react-bootstrap";

//style
import "./Profile.scss";

// Components
import Account from "./Account";
import Settings from "./Settings";
import MemberShip from "./MemberShip";

const Profile = () => {
  let { path, url } = useRouteMatch();

  return (
    <>
      <Container>
        <div className="dashboard">
            
          <div className="dashboard-link">
            <ul>
              <li>
                <NavLink
                  activeClassName="active"
                  className="link"
                  to={`${url}/account`}
                >
                  My Account
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="active"
                  className="link"
                  to={`${url}/membership`}
                >
                  Membership
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="active"
                  className="link"
                  to={`${url}/settings`}
                >
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <Switch>
              <Route exact path={`${path}/account`}>
                <Account />
              </Route>
              <Route exact path={`${path}/membership`}>
                <MemberShip />
              </Route>
              <Route exact path={`${path}/settings`}>
                <Settings />
              </Route>
              {/* redirect if route not exist */}
              <Redirect to="/profile/account" />
            </Switch>
          </div>
          
        </div>
      </Container>
    </>
  );
};

export default Profile;
