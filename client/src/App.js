import React from 'react'
import {
  Switch,
  Route,
} from "react-router-dom";

// react toastify
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'

// app css
import './App.css'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import Navmenu from './components/Navmenu'
import Homepage from './screens/homepage/Homepage'
import Profile from './screens/profile/Profile';
import Advertises from './screens/all advertises/Advertises';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import advertise from './screens/single ads/advertise';
import SellForm from './screens/sell form/SellForm';
import ScrollTop from './utils/ScrollTop';
import Verify from './screens/verify user/Verify';

const App = () => {
  return (
    <div>
      <ScrollTop />
      <Navmenu />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/allads" component={Advertises} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/singleads" component={advertise} />
        <Route exact path="/sell" component={SellForm} />
        <Route exact path="/verify" component={Verify} />
      </Switch>
    </div>
  )
}

export default App