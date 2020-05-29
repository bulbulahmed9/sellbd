import { getSingleAd_success, getSingleAd_failed, getSingleAd_loader } from '../types'
import axios from 'axios'
import { toast } from 'react-toastify'
import { singleAdURL } from '../../API/api'
import { relatedAds } from './advertiseAction'



export const getSingleAd = (id, history) => async dispatch => {
    try {
        dispatch({
            type: getSingleAd_loader
        })
        const res = await axios.get(`${singleAdURL}/${id}`)
        if (res.data.success === false) {
            history.push('/allads')
            toast(res.data.msg)
        } else {
            dispatch(relatedAds(res.data.title))
            dispatch({
                type: getSingleAd_success,
                payload: res.data
            })
        }


    } catch (err) {
        dispatch({
            type: getSingleAd_failed
        })
        toast("Something went wrong")
    }
}