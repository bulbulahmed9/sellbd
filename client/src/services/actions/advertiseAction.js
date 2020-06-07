import { postAd_success, postAd_failed, postAd_loading, getAd_success, getAd_failed, getAd_loading, getRelatedAd_failed, getRelatedAd_success } from '../types'
import { toast } from 'react-toastify'
import Axios from 'axios'
import { postAdURL, adsURL, relatedAdsURL } from '../../API/api'
import { setAuthToken } from '../../utils/setAuthToken'
import FormData from 'form-data'


// post advertise

export const postAd = (data, history) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    let config = {
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
    }
    let form = new FormData();
    const { division, area, category, condition, title, description, price, isNegotiable, files } = data
    form.append("division", division)
    form.append("area", area)
    form.append("category", category)
    form.append("condition", condition)
    form.append("title", title)
    form.append("description", description)
    form.append("price", price)
    form.append("isNegotiable", isNegotiable)
    for (let i = 0; i < files.length; i++) {
        form.append("image", files[i].file)
    }

    try {
        dispatch({
            type: postAd_loading
        })
        const res = await Axios.post(postAdURL, form, config)
        dispatch({
            type: postAd_success
        })
        toast(res.data.msg)
        if (res.status === 201) {
            history.push("/profile")
        }
    } catch (err) {
        dispatch({
            type: postAd_failed,
        })
        toast("Something went wrong")
    }
}

// get advertises

export const getAd = (obj, ads, isFilter = false, page) => async dispatch => {
    if (isFilter) {
        ads.length = 0
        page = 0
    }
    let body = JSON.stringify(obj)
    let config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        dispatch({
            type: getAd_loading
        })
        let limit = 20;
        let newPage = page + 1;
        const res = await Axios.post(`${adsURL}?page=${newPage}&limit=${limit}`, body, config)
        if (res) {
            let newData = ads.concat(res.data.ads)
            dispatch({
                type: getAd_success,
                payload: newData,
                page: newPage
            })
        }

    } catch (err) {
        dispatch({
            type: getAd_failed
        })
    }
}

// get related ads 
export const relatedAds = (title) => async dispatch => {

    let obj = {
        title
    }

    let body = JSON.stringify(obj)
    console.log(body)
    let config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const res = await Axios.post(relatedAdsURL, body, config)
        dispatch({
            type: getRelatedAd_success,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: getRelatedAd_failed
        })
    }
}