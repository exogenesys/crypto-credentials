export const authActions = {
    CONNECT_START: "CONNECT_START",
    CONNECT_SUCCESS: "CONNECT_SUCCESS",
    DISCONNECT_START: "DISCONNECT_START",
    DISCONNECT_SUCCESS: "DISCONNECT_SUCCESS",
    CONNECT_SETUP: "CONNECT_SETUP",
    CONNECT_ERROR: "CONNECT_ERROR"
}


export const connectionStart = (payload) => {
    return {type: authActions.CONNECT_START, payload: payload}
}

export const connectionSuccess = (payload) => {
    return {
        type: authActions.CONNECT_SUCCESS,
        payload: payload
    }
}

export const disconnectStart = (payload) => {
    return {type: authActions.DISCONNECT_START, payload: payload}
}

export const disconnectSuccess = (payload) => {
    return {
        type: authActions.DISCONNECT_SUCCESS,
        payload: payload
    }
}

export const connectionSetup = (payload) => {
    return {
        type: authActions.CONNECT_SETUP,
        payload: payload
    }
}

export const connectionError = (payload) => {
    return {
        type: authActions.CONNECT_ERROR,
        payload: payload
    }
}
