import { useDispatch } from "react-redux";

export const authActions = {
    CONNECT_START: "CONNECT_START",
    CONNECT_SUCCESS: "CONNECT_SUCCESS",
    DISCONNECT_START: "DISCONNECT_START",
    DISCONNECT_SUCCESS: "DISCONNECT_SUCCESS"
}


export const connectionStart = (payload) => {
    return { type: authActions.CONNECT_START, payload: payload}
}

export const connectionSuccess = (payload) => {
    return {
        type: authActions.CONNECT_SUCCESS,
        payload: payload
    }
}

export const disconnectStart = (payload) => {
    return { type: authActions.DISCONNECT_START, payload: payload}
}

export const disconnectSuccess = (payload) => {
    return {
        type: authActions.DISCONNECT_SUCCESS,
        payload: payload
    }
}