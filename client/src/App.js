import React, { useEffect } from 'react'
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import { connect } from 'react-redux'
import { loginOAuth } from './services/actions/authAction'
import Cookies from 'js-cookie'

// react toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

// app css
import './App.css'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import Navmenu from './components/navmenu/Navmenu'
import Homepage from './screens/homepage/Homepage'
import Profile from './screens/profile/Profile';
import Advertises from './screens/all advertises/Advertises';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import Advertise from './screens/productDetails/Advertise';
import SellForm from './screens/sell form/SellForm';
import ScrollTop from './utils/ScrollTop';
import Verify from './screens/verify user/Verify';
import ProtectedRoute from './utils/ProtectedRoute';
import Footer from './components/footer/Footer';
import NotFound from './components/notFound/NotFound';
import Policy from './components/policy/Policy';

const App = ({ loginOAuth, history }) => {

  // check cookies and extract token from cookies and set it to local storage
  // this is for only fb and google Oauth

  useEffect(() => {
    const token = Cookies.get('mycookie');
    if (token) {
      localStorage.setItem('token', token)
      Cookies.remove('mycookie');
      loginOAuth(token)
      //  push to profile
      history.push('/profile')
    }

  }, [loginOAuth])

  return (
    <div>
      <ScrollTop />
      <Navmenu />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route exact path="/allads" component={Advertises} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/product-details/:id" component={Advertise} />
        <ProtectedRoute exact path="/sell" component={SellForm} />
        <Route exact path="/verify" component={Verify} />
        <Route exact path="/policy" component={Policy} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  )
}

export default connect(null, { loginOAuth })(withRouter(App))