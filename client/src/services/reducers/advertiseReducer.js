import { postAd_success, postAd_failed, postAd_loading } from '../types'

const initialState = {
    loading: false,
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
        default:
            return state
    }
}