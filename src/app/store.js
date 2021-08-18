import {combineReducers, configureStore} from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import AuthReducer from './auth/authReducer'
import TransactionReducer from "./transaction/transactionReducer"


export default configureStore({
    reducer: combineReducers({auth: AuthReducer, transaction: TransactionReducer}),
    middleware: [thunkMiddleware]
})

