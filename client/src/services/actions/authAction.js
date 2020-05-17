import {
    register_success,
    register_failed,
    loader,
    stop_loader,
    verify_success,
    verify_failed,
    logout
} from '../types'

import { toast } from 'react-toastify';

// API url
import { registerURL, verifyURL } from '../../API/api'

// axios
import axios from 'axios'

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
        if (err) {
            dispatch({
                type: register_failed,
                payload: err
            })
            toast("Something went wrong")
        }
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
        }


    } catch (err) {
        if (err) {
            dispatch({
                type: verify_failed,
                payload: err
            })
            toast("Something went wrong")
        }
    }
}

// logout
export const logoutUser = () => dispatch => {
    dispatch({
        type: logout
    })
    toast("Log out successfull")
}