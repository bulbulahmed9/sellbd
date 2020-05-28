import { combineReducers } from 'redux'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import advertiseReducer from './advertiseReducer'
import singleAdReducer from './singleAdReducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}

const rootReducer = combineReducers({
    auth: authReducer,
    profileReducer,
    ad: advertiseReducer,
    singleAd: singleAdReducer
})

export default persistReducer(persistConfig, rootReducer)