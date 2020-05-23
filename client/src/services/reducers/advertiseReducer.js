import { postAd_success, postAd_failed, postAd_loading, getAd_success, getAd_failed, getAd_loading } from '../types'

const initialState = {
    loading: false,
    getAdLoading: false,
    ads: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case postAd_loading:
            return {
                ...state,
                loading: true
            }
        case postAd_success:
            return {
                ...state,
                loading: false
            }
        case postAd_failed:
            return {
                ...state,
                loading: false
            }
        case getAd_loading:
            return {
                ...state,
                getAdLoading: true
            }
        case getAd_success:
            return {
                ...state,
                getAdLoading: false,
                ads: action.payload
            }
        case getAd_failed:
            return {
                ...state,
                getAdLoading: false,
                ads: []
            }
        default:
            return state
    }
}