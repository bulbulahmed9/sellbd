import {
    register_success,
    register_failed
} from '../types'

// API url
import {registerURL} from '../../API/api'

// axios
import axios from 'axios'

// regiser user
export const register = ({ name, email, password }) => async dispatch => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({name, email, password})

    try {
        
        const res = await axios.post(registerURL, body, config)
        dispatch({
            type: register_success,
            payload: res.data
          });

    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            dispatch({
                type: register_failed,
                payload: errors
            })
        }
    }
}