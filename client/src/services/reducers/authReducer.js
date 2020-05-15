import {
    register_success,
    register_failed
} from '../types'

// initial state
const initialState = {
    token: localStorage.getItem('token'),
    isAuth: false,
    loading: true,
    user: null,
    errors: null
}

export default function(state = initialState, action){
    switch(action.type){
        case register_success:
            return {
                ...state,
                isAuth: true,
                loading: false,
                user: action.payload
            }
        case register_failed:
            return {
                ...state,
                token: null,
                isAuth: false,
                loading: false,
                user: null,
                errors: action.payload
            }
        default:
            return state    
    }
}