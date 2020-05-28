import { getSingleAd_success, getSingleAd_failed, getSingleAd_loader } from '../types'


const initialState = {
    loading: false,
    ad: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case getSingleAd_loader:
            return {
                ...state,
                loading: true
            }
        case getSingleAd_success:
            return {
                ...state,
                loading: false,
                ad: action.payload
            }
        case getSingleAd_failed:
            return {
                ...state,
                loading: false,
                ad: null
            }
        default:
            return state
    }
}