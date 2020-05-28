import { postAd_success, postAd_failed, postAd_loading, getAd_success, getAd_failed, getAd_loading, getRelatedAd_success, getRelatedAd_failed } from '../types'

const initialState = {
    loading: false,
    getAdLoading: false,
    ads: [],
    page: 0,
    relatedAds: []
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
                ads: action.payload,
                page: action.page
            }
        case getAd_failed:
            return {
                ...state,
                getAdLoading: false,
                ads: []
            }
        case getRelatedAd_success:
            return {
                ...state,
                relatedAds: action.payload
            }
        case getRelatedAd_failed:
            return {
                ...state,
                relatedAds: []
            }
        default:
            return state
    }
}