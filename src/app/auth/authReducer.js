import {authActions} from './actions'
import {updateObject} from '../util'

const initialState = {
    user: null,
    is_connected: false,
    connect_setup: false,
    connect_started: false,
    connect_inprogress: false,
    disconnecting: false,
    wallet: null,
    connection: null,
    walletProvider: "sollet.io",
    walletProviderUrl: "https://www.sollet.io",
    walletProviderHasAdapter: false,
}


export default function AuthReducer(state=initialState, action) {
    switch(action.type) {

        case authActions.CONNECT_SETUP: {
            console.log(action)
            let provider = ""
            let data = {
                walletProvider: provider,
                walletProviderUrl: provider,
                walletProviderHasAdapter: provider.adapter !== null,
                wallet: provider.adapter,
                connect_setup: true,
            }
            return updateObject(state, data)
        }

        case authActions.CONNECT_START: {
            return updateObject(state, {
                connect_inprogress: true,
                connect_started: true,

            })
        }

        case authActions.CONNECT_SUCCESS: {
            console.log("Connected To: ", action.payload)

            return updateObject(state, {
                connect_inprogress: false,
                connect_started: false,
                is_connected: true,
                wallet: action.payload.wallet,
                connection: action.payload.connection
            })
        }

        case authActions.DISCONNECT_START: {
            return updateObject(state,{
                is_connected: false,
                disconnecting: true,
            })
        }

        case authActions.DISCONNECT_SUCCESS: {
            return updateObject(state, {
                disconnecting: false,
                wallet: null,

            })
        }
        default: return state
    }
}