import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import AuthReducer from './auth/authReducer'
import TransactionReducer from "./transaction/transactionReducer"


export default configureStore({
    reducer: combineReducers({auth: AuthReducer, transaction:TransactionReducer}),
    middleware: [ thunkMiddleware ]
})

