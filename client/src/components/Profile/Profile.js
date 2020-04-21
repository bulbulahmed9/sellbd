import React, {useEffect} from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  NavLink
} from "react-router-dom";
import { Container } from "react-bootstrap";

import axios from 'axios'

//style
import "./Profile.scss";

// Components
import Account from "./Account";
import Settings from "./Settings";
import MemberShip from "./MemberShip";

// connect redux
import {connect} from 'react-redux'
// action
import {loadUser} from '../../actions/authAction'

const Profile = ({ loadUser, user }) => {


  let { path, url } = useRouteMatch();


  useEffect(() => {
    axios.get('/user/post')
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
    loadUser()

  },[])

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
                  My Account {user && user.googleId}
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

const mapStateToProps = state => ({
  user: state.auth
})

export default connect(mapStateToProps, {loadUser})(Profile);
