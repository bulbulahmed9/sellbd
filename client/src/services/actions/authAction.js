import {
    register_success,
    register_failed,
    loader
} from '../types'

import { toast } from 'react-toastify';

// API url
import { registerURL } from '../../API/api'

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
            payload: res,
        });
        toast(res.data.msg)
        if(res.status === 201){
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
