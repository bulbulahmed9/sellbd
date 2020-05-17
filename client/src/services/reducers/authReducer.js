import {
    register_success,
    register_failed,
    loader,
    stop_loader,
    verify_success,
    verify_failed,
    logout
} from '../types'

// initial state
const initialState = {
    token: localStorage.getItem('token'),
    isAuth: false,
    loading: false,
    registerRes: null,
    verifyRes: null,
    errors: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case loader:
            return {
                ...state,
                loading: true,
            }
        case stop_loader:
            return {
                ...state,
                loading: false,
            }
        case register_success:
            return {
                ...state,
                loading: false,
                registerRes: action.payload
            }
        case register_failed:
            return {
                ...state,
                token: null,
                isAuth: false,
                loading: false,
                registerRes: null,
                errors: action.payload
            }
        case verify_success:
            return {
                ...state,
                isAuth: true,
                loading: false,
                verifyRes: action.payload,
            }
        case verify_failed:
            return {
                ...state,
                token: null,
                isAuth: false,
                loading: false,
                verifyRes: null,
                errors: action.payload
            }
        case logout:
            return {
                token: null,
                isAuth: false,
                loading: false,
                registerRes: null,
                verifyRes: null,
                errors: null
            }
        default:
            return state
    }
}