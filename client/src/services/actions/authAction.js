import {
    register_success,
    register_failed,
    loader,
    stop_loader,
    verify_success,
    verify_failed,
    login_success,
    login_failed,
    loaduser_success,
    loaduser_failed,
    logout,
    loginOAuth_failed,
    loginOAuth_success
} from '../types'

import { toast } from 'react-toastify';
import { setAuthToken } from '../../utils/setAuthToken'

// API url
import { registerURL, verifyURL, loginURL, profileURL } from '../../API/api'

// axios
import axios from 'axios'



export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
      }
    try {
        dispatch({
            type: loader
        })
        const res = await axios.get(profileURL)
        dispatch({
            type: loaduser_success,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: loaduser_failed
        })
        toast("Something went wrong")
    }
}

// regiser user
export const register = ({ name, email, password }, history) => async dispatch => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ name, email, password })

    try {
        dispatch({
            type: loader
        })
        const res = await axios.post(registerURL, body, config)
        dispatch({
            type: register_success,
            payload: res.data,
        });
        toast(res.data.msg)
        if (res.status === 201) {
            history.push('/verify')
        }


    } catch (err) {
        dispatch({
            type: register_failed,
            payload: err
        })
        toast("Something went wrong")
    }
}

// verify user 
export const verify = ({ email, code }, history) => async dispatch => {
    let config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    let body = JSON.stringify({ email, code })

    try {
        dispatch({
            type: loader
        })
        const res = await axios.put(verifyURL, body, config)

        dispatch({
            type: stop_loader
        })
        toast(res.data.msg)
        if (res.status === 201) {
            dispatch({
                type: verify_success,
                payload: res.data,
            });
            localStorage.setItem('token', res.data.token)
            history.push('/profile')
            dispatch(loadUser());
        }


    } catch (err) {
        dispatch({
            type: verify_failed,
            payload: err
        })
        toast("Something went wrong")
    }
}


// login user
export const login = ({ email, password }, history) => async dispatch => {
    let config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    let body = JSON.stringify({ email, password })
    try {
        dispatch({
            type: loader
        })
        const res = await axios.post(loginURL, body, config)
        dispatch({
            type: stop_loader
        })
        toast(res.data.msg)
        if (res.status === 201) {
            dispatch({
                type: login_success,
                payload: res.data
            })
            localStorage.setItem('token', res.data.token)
            history.push('/profile')
            // dispatch(loadUser());
        }
    } catch (err) {
        dispatch({
            type: login_failed,
            payload: err
        })
        toast("Something went wrong")
    }
}

// login with Oauth
export const loginOAuth = (token) => async dispatch => {
    try {
        dispatch({
            type: loginOAuth_success
        })
        // dispatch(loadUser())
    } catch (err) {
        dispatch({
            type: loginOAuth_failed,
        })
    }
}

// logout
export const logoutUser = () => dispatch => {
    dispatch({
        type: logout
    })
    localStorage.removeItem('token')
    toast("Log out successfull")
}