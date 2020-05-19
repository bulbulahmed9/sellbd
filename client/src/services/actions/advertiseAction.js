import { postAd_success, postAd_failed, postAd_loading } from '../types'
import {toast} from 'react-toastify'
import Axios from 'axios'
import { postAdURL } from '../../API/api'


// post advertise

export const postAd = (data, history) => async dispatch => {
    let config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    let body = JSON.stringify(data)
    try {
        dispatch({
            type: postAd_loading
        })
        const res = Axios.post(postAdURL, body, config)
        dispatch({
            type: postAd_success
        })
        toast(res.data.msg)
        if(res.status === 201){
            history.pushState("/profile")
        }

    } catch (err) {
        if (err) {
            dispatch({
                type: postAd_failed,
            })
            toast("Something went wrong")
        }
    }
}