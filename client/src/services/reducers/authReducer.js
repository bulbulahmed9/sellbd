import {
    register_success,
    register_failed,
    loader,
    stop_loader,
    verify_success,
    verify_failed,
    login_success,
    login_failed,
    loaduser_success,
    loaduser_failed,
    loginOAuth_success,
    loginOAuth_failed,
    logout
} from '../types'

// initial state
const initialState = {
    isAuth: false,
    loading: false,
    registerRes: null,
    verifyRes: null,
    profile: null,
    loginRes: null,
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
                isAuth: false,
                loading: false,
                registerRes: null,
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
                isAuth: false,
                loading: false,
                verifyRes: null,
            }
        case login_success:
            return {
                ...state,
                isAuth: true,
                loading: false,
                loginRes: action.payload
            }
        case login_failed:
            return {
                ...state,
                isAuth: false,
                loading: false,
            }
        case loginOAuth_success:
            return {
                ...state,
                isAuth: true,
                loading: false
            }
        case loginOAuth_failed:
            return {
                ...state,
                isAuth: false,
                loading: false
            }
        case loaduser_success:
            return {
                ...state,
                loading: false,
                profile: action.payload
            }
        case loaduser_failed:
            return {
                ...state,
                loading: false,
                profile: null
            }
        case logout:
            return {
                isAuth: false,
                loading: false,
                registerRes: null,
                verifyRes: null,
            }
        default:
            return state
    }
}