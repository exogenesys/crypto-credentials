import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import AuthReducer from "./auth/authReducer";
import TransactionReducer from "./transaction/transactionReducer";
import UniversityReducer from "./university/universityReducer";
import InitReducer from "./init/initReducer";

export default configureStore({
  reducer: combineReducers({
    auth: AuthReducer,
    transaction: TransactionReducer,
    university: UniversityReducer,
    init: InitReducer,
  }),
  middleware: [thunkMiddleware],
});
