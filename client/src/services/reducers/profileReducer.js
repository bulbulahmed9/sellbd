import { phone_update_success, phone_update_failed, phone_update_loader } from '../types'


const initialState = {
    loading: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case phone_update_loader:
            return {
                loading: true
            }
        case phone_update_success:
        case phone_update_failed:
            return {
                loading: false
            }
        default:
            return state
    }
}