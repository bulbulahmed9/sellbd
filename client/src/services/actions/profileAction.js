import { phone_update_success, phone_update_failed, phone_update_loader } from '../types'
import { toast } from 'react-toastify'
import Axios from 'axios'
import { updatePhoneURL } from '../../API/api'


// update phone
export const updatePhone = (phone) => async dispatch => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({phone})

    try {
        dispatch({
            type: phone_update_loader
        })
        const res = await Axios.put(updatePhoneURL, body, config)
        dispatch({
            type: phone_update_success
        })
        toast(res.data.msg)
    } catch (err) {
        if(err){
            dispatch({
                type: phone_update_failed
            })
            toast("Phone Update Failed")
        }
    }
}